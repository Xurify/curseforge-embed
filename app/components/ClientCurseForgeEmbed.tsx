'use client';

import { useCurseForgeProject } from '../hooks/useCurseForgeProject';
import { CurseForgeEmbedSkeleton } from './CurseForgeEmbedSkeleton';
import { CurseForgeEmbedLoading } from './CurseForgeEmbedLoading';
import { CurseForgeEmbedError } from './CurseForgeEmbedError';

interface ClientCurseForgeEmbedProps {
  projectId: number | string;
  fallback?: React.ReactNode;
  size?: 'default' | 'small';
  revalidate?: number;
}

export default function ClientCurseForgeEmbed({
  projectId,
  fallback,
  size = 'default',
  revalidate,
}: ClientCurseForgeEmbedProps) {
  const { data, error, loading } = useCurseForgeProject(projectId, { revalidate });

  if (loading) {
    return <CurseForgeEmbedLoading size={size} />;
  }

  if (error || !data) {
    return <CurseForgeEmbedError fallback={fallback} />;
  }

  return <CurseForgeEmbedSkeleton data={data} size={size} />;
} 