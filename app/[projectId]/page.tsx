import { notFound } from "next/navigation";
import { CurseForgeAPI } from "../lib/curseforge";
import { CurseForgeEmbedError } from "../components/CurseForgeEmbedError";
import { CurseForgeEmbedSkeleton } from "../components/CurseForgeEmbedSkeleton";

export default async function ProjectPage({
  params,
  searchParams,
}: {
  params: Promise<{ projectId: string }>;
  searchParams: Promise<{ revalidate: string; size?: "default" | "small" }>;
}) {
  const { projectId } = await params;
  const { revalidate, size } = await searchParams;

  if (!parseInt(projectId)) {
    return notFound();
  }

  try {
    const data = await CurseForgeAPI.getProject(Number(projectId), {
      revalidate: Number(revalidate),
    });
    return <CurseForgeEmbedSkeleton data={data} size={size} />;
  } catch (error) {
    console.error("Error fetching project data:", error);
    // TODO: Display or redirect to 404
    return <CurseForgeEmbedError />;
  }
}
