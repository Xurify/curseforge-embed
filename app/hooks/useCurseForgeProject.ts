"use client";

import { useState, useEffect } from "react";
import { CurseForgeAPI } from "../lib/curseforge-api";
import { CurseForgeProject } from "../types/curseforge";

interface UseCurseForgeProjectOptions {
  revalidate?: number;
}

interface UseCurseForgeProjectResult {
  data: CurseForgeProject | null;
  error: Error | null;
  loading: boolean;
}

/**
 * React hook for fetching CurseForge project data in client components
 * @param projectId The CurseForge project ID
 * @param options Optional configuration
 * @returns Object containing data, error, and loading state
 */
export function useCurseForgeProject(
  projectId: number | string,
  options: UseCurseForgeProjectOptions = {}
): UseCurseForgeProjectResult {
  const [data, setData] = useState<CurseForgeProject | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const projectData = await CurseForgeAPI.getProject(Number(projectId), {
          revalidate: options.revalidate,
        });
        setData(projectData);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [projectId, options.revalidate]);

  return { data, error, loading };
}
