import { CurseForgeAPI } from "@/lib/api/curseforge";
import { NextRequest } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ projectId: string }> },
) {
  const { projectId } = await params;

  try {
    const baseUrl = "https://api.cfwidget.com";
    const externalResponse = await fetch(`${baseUrl}/${projectId}`, {
      headers: {
        "User-Agent": "xurify/curseforge-embed/1.0.0 (contact@xurify.com)",
      },
    });

    if (externalResponse.status === 404) {
      return Response.json({ error: "Project not found" }, { status: 404 });
    }

    if (!externalResponse.ok) {
      throw new Error(
        `Failed to fetch external project data: ${externalResponse.status} ${externalResponse.statusText}`,
      );
    }

    const fullData = await externalResponse.json();

    const latestVersion =
      CurseForgeAPI.getLatestVersion(fullData)?.version || null;

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
      latestVersion: latestVersion,
    };

    return Response.json(filteredData, {
      status: 200,
      headers: {
        "Cache-Control": `public, max-age=3600, s-maxage=3600, stale-while-revalidate=7200`,
      },
    });
  } catch (error) {
    console.error(`Error fetching CurseForge project ${projectId}:`, error);

    return Response.json(
      { error: "Failed to fetch CurseForge project" },
      {
        status: 500,
        headers: {
          "Cache-Control": `public, max-age=300, s-maxage=300`,
        },
      },
    );
  }
}
