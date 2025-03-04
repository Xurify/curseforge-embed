import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { CurseForgeAPI } from "../../../lib/curseforge-api";
import { truncate } from "../../../lib/utils/utils";
import { CurseForgeIcon } from "./icons/CurseForgeIcon";

export const runtime = "edge";

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
  const author = data.members.find(
    (member) => member.title === "Owner"
  )?.username;
  const logoUrl = data.thumbnail || "";

  const formattedDownloads = CurseForgeAPI.formatNumber(parseInt(downloads, 10));
  const cacheDuration = CurseForgeAPI.getCacheDuration(parseInt(downloads, 10));

  console.log('modName', modName)

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          background: theme === "dark" ? "#2D2D2D" : "#F8F9F9",
          border: `3px solid ${theme === "dark" ? "#404040" : "#D9D9D9"}`,
          borderRadius: "8px",
          padding: "16px 24px",
          color: theme === "dark" ? "#E1E3E5" : "#242729",
          fontFamily: '"Noto Sans", sans-serif',
          boxShadow:
            theme === "dark"
              ? "0 1px 3px rgba(0,0,0,0.15)"
              : "0 1px 2px rgba(0,0,0,0.05)",
        }}
      >
        {/* Logo/Icon */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "110px",
            height: "110px",
            background: "linear-gradient(180deg, #EB622B 0%, #D44A1A 100%)",
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
                imageRendering: "crisp-edges",
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
              fontWeight: 700,
              color: theme === "dark" ? "#FFFFFF" : "#242729",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              marginBottom: "12px",
              letterSpacing: "-0.1px",
            }}
          >
            {truncate(modName, 20)}
          </div>

          {/* Stats Row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "24px",
              color: theme === "dark" ? "#9BA0A4" : "#6A737C",
              fontSize: "28px",
              fontWeight: 500,
            }}
          >
            {/* Downloads */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <svg
                width="32"
                height="32"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2px"
              >
                <path
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>{formattedDownloads}</span>
            </div>

            {/* Author */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <svg
                width="32"
                height="32"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2px"
              >
                <path
                  d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>{truncate(author || "Unknown", 15)}</span>
            </div>
          </div>
        </div>

        <CurseForgeIcon />
        {/* <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="#F16436"
          style={{ flexShrink: 0, marginLeft: "auto" }}
        >
          <path d="M21 16.5C21 16.88 20.79 17.21 20.47 17.38L12.57 21.82C12.41 21.94 12.21 22 12 22C11.79 22 11.59 21.94 11.43 21.82L3.53 17.38C3.21 17.21 3 16.88 3 16.5V7.5C3 7.12 3.21 6.79 3.53 6.62L11.43 2.18C11.59 2.06 11.79 2 12 2C12.21 2 12.41 2.06 12.57 2.18L20.47 6.62C20.79 6.79 21 7.12 21 7.5V16.5Z" />
        </svg> */}
      </div>
    ),
    {
      width: 680,
      height: 160,
      fonts: [
        {
          name: "Noto Sans",
          data: await loadGoogleFont("Noto Sans", modName + downloads + author),
          style: "normal",
          weight: 700,
        },
      ],
      headers: {
        "Cache-Control": `public, immutable, no-transform, max-age=${cacheDuration}`,
      },
    }
  );
}
