import { getProjectData } from "../components/CurseForgeEmbed";
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

  try {
    const data = await getProjectData(projectId, Number(revalidate));
    return <CurseForgeEmbedSkeleton data={data} size={size} />;
  } catch (error) {
    // TODO: Display or redirect to 404
    return <CurseForgeEmbedError />;
  }
}
