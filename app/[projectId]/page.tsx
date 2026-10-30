import { notFound } from "next/navigation";
import { CurseForgeAPI } from "@/lib/api/curseforge";
import { CurseForgeEmbedError } from "@/app/components/CurseForgeEmbedError";
import { CurseForgeEmbedSkeleton } from "@/app/components/CurseForgeEmbedSkeleton";
import { CurseForgeProject } from "@/app/types/curseforge";

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

  let data: CurseForgeProject | null = null;
  try {
    data = await CurseForgeAPI.getProject(Number(projectId), {
      revalidate: Number(revalidate),
    });
  } catch (error) {
    console.error("Error fetching project data:", error);
    return <CurseForgeEmbedError />;
  }
  if (!data) {
    return notFound();
  }
  return <CurseForgeEmbedSkeleton data={data} size={size} />;
}
