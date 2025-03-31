import { ImageResponse } from "next/og";
import { ImageResponseOptions, NextRequest } from "next/server";
import { join } from "path";
import { readFile } from "fs/promises";
import sharp from "sharp";
import crypto from "crypto";
import { CurseForgeAPI } from "@/lib/api/curseforge";
import { CurseForgeProject } from "@/app/types/curseforge";
import DefaultVariant from "./variants/DefaultVariant";
import FullVariant from "./variants/FullVariant";
import CompactVariant from "./variants/CompactVariant";

export const runtime = "nodejs";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  const { searchParams } = new URL(request.url);
  const { projectId } = await params;
  
  const variant = searchParams.get("variant") as "default" | "full" | "compact" || "default";
  const theme = searchParams.get("theme") as "dark" | "light" || "dark";
  const showDownloads = searchParams.get("showDownloads") !== "false";
  const showVersion = searchParams.get("showVersion") !== "false";
  const showButton = searchParams.get("showButton") !== "false";
  const showPadding = searchParams.get("showPadding") === "true";

  const data = await CurseForgeAPI.getProject(Number(projectId));

  const contentHash = crypto
    .createHash('md5')
    .update(JSON.stringify({
      project: {
        downloads: data?.downloads,
        title: data?.title,
        icon: data?.thumbnail,
      },
      params: {
        variant,
        theme,
        showDownloads,
        showVersion,
        showButton,
        showPadding,
      }
    }))
    .digest('hex');

  const etag = `"${projectId}-${contentHash}"`;

  try {
    if (request.headers.get('if-none-match') === etag) {
      return new Response(null, {
        status: 304,
        headers: {
          'ETag': etag,
        },
      });
    }

    if (!data) {
      return new Response("Project not found", { 
        status: 404,
        headers: {
          "Cache-Control": "public, max-age=300, s-maxage=300",
          "ETag": etag,
        }
      });
    }

    const modName = data.title;
    const downloads = data.downloads.toString();
    const author = data.members.find(
      (member) => member.title === "Owner"
    )?.username || "Unknown";
    const latestVersion = CurseForgeAPI.getLatestVersion(data)?.version || "";

    let iconUrl = data.thumbnail || undefined;
    if (iconUrl?.toLowerCase().endsWith(".webp")) {
      const response = await fetch(iconUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch icon");
      }
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const pngBuffer = await sharp(buffer).png().toBuffer();

      iconUrl = `data:image/png;base64,${pngBuffer.toString("base64")}`;
    }

    const formattedDownloads = CurseForgeAPI.formatNumber(
      parseInt(downloads, 10)
    );
    //const cacheDuration = ModrinthAPI.getCacheDuration(parseInt(downloads, 10));

    const generateCompactDimensions = (project: CurseForgeProject) => {
      const height = 32;
      const fontSize = 14;
      const padding = 12;
      const iconSize = 24;
      let width = padding * 2 + project.title.length * (fontSize * 0.6);
      if (project.thumbnail) width += iconSize + 8;
      if (showDownloads)
        width +=
          CurseForgeAPI.formatNumber(project.downloads.total).length *
            (fontSize * 0.6) +
          16;
      if (showVersion && latestVersion)
        width += latestVersion.toString().length * (fontSize * 0.6) + 24;

      return { width, height };
    };

    const OPTIONS: Record<string, ImageResponseOptions> = {
      default: {
        width: 680,
        height: 160,
      },
      full: {
        width: showPadding ? 1200 : 900,
        height: showPadding ? 600 : 405,
      },
      compact: {
        width: generateCompactDimensions(data).width,
        height: generateCompactDimensions(data).height,
      },
    };

    const options = OPTIONS[variant];

    const colors = {
      light: {
        background: "#ffffff",
        background2: "#f9fafb",
        text: "#1f2937",
        secondaryText: "#585858",
        border: "#e5e7eb",
        button: "#10B981",
        buttonText: "#ffffff",
      },
      dark: {
        background: "#2D2D2D",
        background2: "#16181C",
        text: "#ffffff",
        secondaryText: "#9BA0A4",
        border: "#404040",
        button: "#10B981",
        buttonText: "#ffffff",
      },
    };

    const themeColors = theme === "dark" ? colors.dark : colors.light;

    const getVariant = () => {
      switch (variant) {
        case "default":
          return (
            <DefaultVariant
              iconUrl={iconUrl}
              modName={modName}
              author={author}
              downloads={formattedDownloads}
              theme={theme}
            />
          );
        case "full":
          return (
            <FullVariant
              iconUrl={iconUrl}
              project={data}
              themeColors={themeColors}
              showPadding={showPadding}
              showDownloads={showDownloads}
              showVersion={showVersion}
              showButton={showButton}
              versionNumber={latestVersion || ""}
            />
          );
        case "compact":
          return (
            <CompactVariant
              iconUrl={iconUrl}
              project={data}
              themeColors={themeColors}
              showDownloads={showDownloads}
              showVersion={showVersion}
              versionNumber={latestVersion || ""}
              width={generateCompactDimensions(data).width}
            />
          );
        default:
          return null;
      }
    };
    const component = getVariant();

    if (!component) {
      return new Response("Invalid variant", { status: 400 });
    }

    const jost400 = await readFile(
      join(process.cwd(), "public/assets/fonts/Jost-Regular.ttf")
    );
    const jost700 = await readFile(
      join(process.cwd(), "public/assets/fonts/Jost-Bold.ttf")
    );

    return new ImageResponse(component, {
      ...options,
      fonts: [
        {
          name: "Jost",
          data: jost400,
          weight: 400,
          style: "normal",
        },
        {
          name: "Jost",
          data: jost700,
          weight: 700,
          style: "normal",
        },
      ],
      headers: {
        "Cache-Control": `public, max-age=3600, stale-while-revalidate=7200`,
        "ETag": etag,
        "Vary": "Accept, Accept-Encoding",
      },
    });
  } catch (error) {
    console.error("Error generating badge", error);
    return new Response(`Failed to generate badge: ${error}`, { 
      status: 500,
      headers: {
        "Cache-Control": "public, max-age=300, s-maxage=300",
        "ETag": etag,
      }
    });
  }
}
