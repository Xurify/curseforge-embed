import { notFound } from "next/navigation";
import { CurseForgeAPI } from "@/lib/api/curseforge";
import { CurseForgeEmbedError } from "@/app/components/CurseForgeEmbedError";
import { CurseForgeEmbedSkeleton } from "@/app/components/CurseForgeEmbedSkeleton";

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
    if (!data) {
      return notFound();
    }
    return <CurseForgeEmbedSkeleton data={data} size={size} />;
  } catch (error) {
    console.error("Error fetching project data:", error);
    return <CurseForgeEmbedError />;
  }
}
