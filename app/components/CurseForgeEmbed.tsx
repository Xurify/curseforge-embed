import { CurseForgeAPI } from "@/lib/api/curseforge";
import { CurseForgeProject } from "@/app/types/curseforge";
import { CurseForgeEmbedSkeleton } from "./CurseForgeEmbedSkeleton";
import { CurseForgeEmbedError } from "./CurseForgeEmbedError";

interface CurseForgeEmbedProps {
  projectId: number;
  fallback?: React.ReactNode;
  size?: "default" | "small";
  revalidate?: number;
}

export default async function CurseForgeEmbed({
  projectId,
  fallback,
  size = "default",
  revalidate,
}: CurseForgeEmbedProps) {
  let data: CurseForgeProject | null = null;
  try {
    data = await CurseForgeAPI.getProject(projectId, { revalidate });
  } catch (error) {
    console.error("CurseForgeEmbed error:", error);
    return <CurseForgeEmbedError fallback={fallback} />;
  }
  if (!data) {
    return <div>Failed to load embed</div>;
  }
  return <CurseForgeEmbedSkeleton data={data} size={size} />;
}
