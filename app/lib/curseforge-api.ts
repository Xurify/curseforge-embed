import { CurseForgeProject } from '../types/curseforge';

/**
 * CurseForge API wrapper
 * Based on the cfwidget.com API: https://api.cfwidget.com/
 */
export class CurseForgeAPI {
  public static DEFAULT_REVALIDATE = 3600;
  /**
   * Fetch a project by its ID
   * @param projectId The CurseForge project ID
   * @param options Optional fetch configuration
   * @returns Promise with the project data
   */

  static async getProject(projectId: number, options: { revalidate?: number } = {}): Promise<CurseForgeProject> {
    const { revalidate = CurseForgeAPI.DEFAULT_REVALIDATE } = options;

    const url = new URL(`/api/curseforge/${projectId}`, process.env.NEXT_PUBLIC_APP_URL);
      if (revalidate) {
        url.searchParams.set('revalidate', revalidate.toString());
      }
      
      const response = await fetch(url, {
        next: { 
          revalidate: revalidate || CurseForgeAPI.DEFAULT_REVALIDATE 
        }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch project data: ${response.status}`);
      }
      
      return response.json();
  }
  
  /**
   * Format a file size in bytes to a human-readable string
   * @param bytes File size in bytes
   * @returns Formatted file size string
   */
  static formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    
    return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
  }
  
  /**
   * Format a number with compact notation
   * @param num The number to format
   * @returns Formatted number string
   */
  static formatNumber(num: number): string {
    return new Intl.NumberFormat('en-US', { notation: 'compact' }).format(num);
  }
  
  /**
   * Format a date string to a readable format
   * @param dateString ISO date string
   * @returns Formatted date string
   */
  static formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
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
