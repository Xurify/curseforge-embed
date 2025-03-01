import { CurseForgeProject } from "../types/curseforge";
import { CurseForgeEmbedSkeleton } from "./CurseForgeEmbedSkeleton";
import { CurseForgeEmbedError } from "./CurseForgeEmbedError";

interface CurseForgeEmbedProps {
  projectId: number | string;
  fallback?: React.ReactNode;
  size?: "default" | "small";
  revalidate?: number;
}

async function getProjectData(projectId: number | string, revalidate?: number): Promise<CurseForgeProject> {
  const url = new URL(`/api/curseforge/${projectId}`, process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000');
  if (revalidate) {
    url.searchParams.set('revalidate', revalidate.toString());
  }
  
  const response = await fetch(url, {
    next: { 
      revalidate: revalidate || 3600 
    }
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch project data: ${response.status}`);
  }
  
  return response.json();
}

export default async function CurseForgeEmbed({
  projectId,
  fallback,
  size = "default",
  revalidate,
}: CurseForgeEmbedProps) {
  try {
    const data = await getProjectData(projectId, revalidate);
    return <CurseForgeEmbedSkeleton data={data} size={size} />;
  } catch (error) {
    console.error('CurseForgeEmbed error:', error);
    return <CurseForgeEmbedError fallback={fallback} />;
  }
}
