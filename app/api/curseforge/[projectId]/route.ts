import { NextRequest } from "next/server";
import { CurseForgeAPI } from "@/app/lib/curseforge-api";

const DEFAULT_REVALIDATE_SECONDS = 3600;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  const { projectId } = await params;

  const searchParams = request.nextUrl.searchParams;
  const revalidate = parseInt(
    searchParams.get("revalidate") || String(DEFAULT_REVALIDATE_SECONDS)
  );

  try {
    const fullData = await CurseForgeAPI.getProject(projectId, { revalidate });

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
