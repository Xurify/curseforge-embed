import { NextRequest } from "next/server";
import { CurseForgeAPI } from "@/app/lib/curseforge-api";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  const { projectId } = await params;

  const searchParams = request.nextUrl.searchParams;
  const revalidate = parseInt(
    searchParams.get("revalidate") || String(CurseForgeAPI.DEFAULT_REVALIDATE)
  );

  try {
    const baseUrl = "https://api.cfwidget.com";
    const externalResponse = await fetch(`${baseUrl}/${projectId}`, {
      next: {
        revalidate,
      },
    });

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
        "Cache-Control": `s-maxage=${revalidate}, stale-while-revalidate`,
      },
    });
  } catch (error) {
    console.error(`Error fetching CurseForge project ${projectId}:`, error);

    return Response.json(
      { error: "Failed to fetch CurseForge project" },
      { status: 500 }
    );
  }
}
