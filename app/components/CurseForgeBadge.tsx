import { CurseForgeEmbedBadge } from "./CurseForgeEmbedBadge";
import { CurseForgeAPI } from "../lib/curseforge-api";

interface CurseForgeBadgeProps {
  projectId: string | number;
}

/**
 * Server Component wrapper for CurseForgeEmbedBadge
 */
export default async function CurseForgeBadge({
  projectId,
}: CurseForgeBadgeProps) {
  try {
    const data = await CurseForgeAPI.getProject(Number(projectId));
    return <CurseForgeEmbedBadge data={data} />;
  } catch (error) {
    console.error('CurseForgeBadge error:', error);
    return null;
  }
} 