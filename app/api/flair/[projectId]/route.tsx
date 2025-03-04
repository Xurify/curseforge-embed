// app/api/og/[projectId]/route.tsx
import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { CurseForgeAPI } from "../../../lib/curseforge-api";
import { CurseForgeProject } from "../../../types/curseforge";

export const config = {
  runtime: "edge",
};

async function loadGoogleFont(font: string, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${font}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url)).text();
  const resource = css.match(
    /src: url\((.+)\) format\('(opentype|truetype)'\)/
  );

  if (resource) {
    const response = await fetch(resource[1]);
    if (response.status == 200) {
      return await response.arrayBuffer();
    }
  }

  throw new Error("failed to load font data");
}

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  } else {
    return num.toString();
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  const { searchParams } = new URL(request.url);

  const { projectId } = await params;
  
  const data = await CurseForgeAPI.getProject(Number(projectId));

  if (!data) {
    return new Response("Project not found", { status: 404 });
  }
  
  const theme = searchParams.get("theme") || "dark";

  const modName = data.title;
  const downloads = data.downloads.total.toString();
  const loader = Object.keys(data.versions || {}).find((v: string) => v.includes("Fabric") || v.includes("Forge")) || "Unknown";
  const logoUrl = data.thumbnail || "";

  const formattedDownloads = formatNumber(parseInt(downloads, 10));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          background: theme === "dark" ? "#212121" : "#F8F9F9",
          border: `1px solid ${theme === "dark" ? "#333333" : "#E3E6E8"}`,
          borderRadius: "8px",
          padding: "16px",
          color: theme === "dark" ? "#E1E3E5" : "#242729",
          fontFamily: '"Noto Sans", sans-serif',
          boxShadow: theme === "dark" ? "0 1px 3px rgba(0,0,0,0.2)" : "0 1px 2px rgba(0,0,0,0.05)",
        }}
      >
        {/* Logo/Icon */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "120px",
            height: "120px",
            background: "linear-gradient(180deg, #80B1E8 0%, #5E8FBF 100%)",
            borderRadius: "8px",
            marginRight: "16px",
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          {logoUrl ? (
            <img
              src={logoUrl}
              width="100%"
              height="100%"
              style={{ 
                objectFit: "contain",
                imageRendering: "crisp-edges"
              }}
              alt="Mod logo"
            />
          ) : (
            <div
              style={{
                fontSize: "32px",
                fontWeight: "bold",
                color: "white",
              }}
            >
              {modName.substring(0, 1)}
            </div>
          )}
        </div>

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
            flex: 1,
            minWidth: 0,
            lineHeight: 1.4,
          }}
        >
          {/* Mod Name */}
          <div
            style={{
              fontSize: "36px",
              fontWeight: 800,
              color: theme === "dark" ? "#FFFFFF" : "#242729",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              marginBottom: "16px",
              letterSpacing: "-0.1px",
            }}
          >
            {modName}
          </div>

          {/* Stats Row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "32px",
              color: theme === "dark" ? "#9BA0A4" : "#6A737C",
              fontSize: "28px",
            }}
          >
            {/* Downloads */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ strokeWidth: "2px" }}>
                <path 
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
              <span>{formattedDownloads}</span>
            </div>

            {/* Mod Loader */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ strokeWidth: "2px" }}>
                <path 
                  d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
              <span>{loader}</span>
            </div>
          </div>
        </div>

        {/* CurseForge Logo */}
        <svg width="32" height="32" viewBox="0 0 24 24" fill="#F16436" style={{ flexShrink: 0 }}>
          <path d="M21 16.5C21 16.88 20.79 17.21 20.47 17.38L12.57 21.82C12.41 21.94 12.21 22 12 22C11.79 22 11.59 21.94 11.43 21.82L3.53 17.38C3.21 17.21 3 16.88 3 16.5V7.5C3 7.12 3.21 6.79 3.53 6.62L11.43 2.18C11.59 2.06 11.79 2 12 2C12.21 2 12.41 2.06 12.57 2.18L20.47 6.62C20.79 6.79 21 7.12 21 7.5V16.5Z" />
        </svg>
      </div>
    ),
    {
      width: 800,
      height: 200,
      // Use the system font that matches the original closely
      fonts: [
        {
          name: "Noto Sans",
          data: await loadGoogleFont("Noto Sans", modName + downloads + loader),
          style: "normal",
          weight: 800,
        },
      ],
    }
  );
}