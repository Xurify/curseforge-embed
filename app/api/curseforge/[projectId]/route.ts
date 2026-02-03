import { getProjectFromExternal } from "@/lib/api/curseforge";
import { NextRequest } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ projectId: string }> },
) {
  const { projectId } = await params;

  try {
    const data = await getProjectFromExternal(Number(projectId));

    if (!data) {
      return Response.json({ error: "Project not found" }, { status: 404 });
    }

    return Response.json(data, {
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
