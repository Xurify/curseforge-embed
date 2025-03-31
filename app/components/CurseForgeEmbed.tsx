import { CurseForgeAPI } from "@/lib/api/curseforge";
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
  try {
    const data = await CurseForgeAPI.getProject(projectId, { revalidate });
    if (!data) {
      return <div>Failed to load embed</div>;
    }
    return <CurseForgeEmbedSkeleton data={data} size={size} />;
  } catch (error) {
    console.error("CurseForgeEmbed error:", error);
    return <CurseForgeEmbedError fallback={fallback} />;
  }
}
