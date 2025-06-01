import { CurseForgeProject } from "@/app/types/curseforge";

interface LatestVersion {
  fileName: string;
  version: string;
  uploadDate: string;
  downloadUrl: string;
  fileSize: number;
  minecraftVersions: string[];
}

/**
 * CurseForge API wrapper
 * Based on the cfwidget.com API: https://api.cfwidget.com/
 */
export class CurseForgeAPI {
  public static DEFAULT_REVALIDATE = 3600;
  /**
   * Get a project by ID
   * @param projectId The CurseForge project ID
   * @param options Optional fetch configuration
   * @returns Promise with the project data
   */

  static async getProject(
    projectId: number,
    options: { revalidate?: number } = {},
  ): Promise<CurseForgeProject | null> {
    const { revalidate = CurseForgeAPI.DEFAULT_REVALIDATE } = options;

    try {
      const url = new URL(
        `/api/curseforge/${projectId}`,
        process.env.NEXT_PUBLIC_APP_URL,
      );
      const response = await fetch(url, {
        next: {
          revalidate: revalidate || CurseForgeAPI.DEFAULT_REVALIDATE,
        },
      });

      if (!response.ok) {
        console.error(`Failed to fetch project data: ${response.status}`);
        return null;
      }

      return response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  /**
   * Format a file size in bytes to a human-readable string
   * @param bytes File size in bytes
   * @returns Formatted file size string
   */
  static formatFileSize(bytes: number): string {
    if (bytes === 0) return "0 Bytes";

    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));

    return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
  }

  /**
   * Format a number with compact notation
   * @param num The number to format
   * @returns Formatted number string
   */
  static formatNumber(num: number): string {
    return new Intl.NumberFormat("en-US", {
      notation: "compact",
      roundingMode: "floor",
    }).format(num);
  }

  /**
   * Format a date string to a readable format
   * @param dateString ISO date string
   * @returns Formatted date string
   */
  static formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  /**
   * Get the latest version of a project
   * @param CurseForgeProject
   * @returns The latest version of the project
   */
  static getLatestVersion(project: CurseForgeProject) {
    if (!project?.files?.length) {
      return null;
    }

    // First try to find files with actual version numbers
    const filesWithNumericVersions = project.files.filter(
      (file) => typeof file.version === "string" && file.version.match(/^\d/),
    );

    // If we found files with numeric versions, use those
    const filesToCheck =
      filesWithNumericVersions.length > 0
        ? filesWithNumericVersions
        : project.files;

    // Find the latest file by upload date
    let latestFile = filesToCheck.reduce((latest, current) => {
      const latestDate = new Date(latest.uploaded_at);
      const currentDate = new Date(current.uploaded_at);
      return currentDate > latestDate ? current : latest;
    }, filesToCheck[0]);

    // Extract the actual version from the filename if the version field isn't numeric
    let version = latestFile.version;
    if (!version.match(/^\d/)) {
      // Try to extract version from filename using regex
      const versionMatch = latestFile.name.match(/(\d+\.\d+\.\d+)/);
      if (versionMatch) {
        version = versionMatch[1];
      }
    }

    return {
      fileName: latestFile.name,
      version: version,
      uploadDate: latestFile.uploaded_at,
      downloadUrl: latestFile.url,
      fileSize: latestFile.filesize,
      minecraftVersions: latestFile.versions.filter((v) => v.match(/^\d/)),
    };
  }

  /**
   * Get the cache duration based on the number of downloads
   * @param downloads The number of downloads
   * @returns The cache duration in seconds
   */
  static getCacheDuration(downloads: number): number {
    if (downloads >= 1000000) {
      return 604800; // 1 week
    } else if (downloads >= 100000) {
      return 86400; // 1 day
    } else if (downloads >= 10000) {
      return 7200; // 2 hours
    } else if (downloads >= 1000) {
      return 3600; // 1 hour
    } else {
      return 3600; // 1 hour
    }
  }
}
