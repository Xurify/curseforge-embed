import { NextRequest } from "next/server";
import { CurseForgeAPI } from "@/app/lib/curseforge-api";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  const { projectId } = await params;
  const CACHE_DURATION = 3600;

  try {
    const baseUrl = "https://api.cfwidget.com";
    const externalResponse = await fetch(`${baseUrl}/${projectId}`);

    if (!externalResponse.ok) {
      throw new Error(
        `Failed to fetch project data: ${externalResponse.status} ${externalResponse.statusText}`
      );
    }

    const fullData = await externalResponse.json();

    const filteredData = {
      id: fullData.id,
      title: fullData.title,
      summary: fullData.summary,
      description: fullData.description?.substring(0, 5000),
      game: fullData.game,
      type: fullData.type,
      urls: fullData.urls,
      thumbnail: fullData.thumbnail,
      created_at: fullData.created_at,
      downloads: fullData.downloads,
      license: fullData.license,
      categories: fullData.categories,
      members: fullData.members,
      download: fullData.download,
    };

    return Response.json(filteredData, {
      status: 200,
      headers: {
        "Cache-Control": `public, s-maxage=${CACHE_DURATION}, stale-while-revalidate=360, max-age=1800`,
      },
    });
  } catch (error) {
    console.error(`Error fetching CurseForge project ${projectId}:`, error);

    return Response.json(
      { error: "Failed to fetch CurseForge project" },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store, must-revalidate",
        },
      }
    );
  }
}
