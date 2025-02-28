import { CurseForgeProject } from "../types/curseforge";
import { CurseForgeAPI } from "../lib/curseforge-api";
import Image from "next/image";

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
  let data: CurseForgeProject;

  try {
    data = await getProjectData(projectId, revalidate);
  } catch (error) {
    console.error('CurseForgeEmbed error:', error);
    return (
      fallback || (
        <div className="border border-red-200 bg-red-50 rounded-lg p-4 text-red-700">
          Failed to load CurseForge project
        </div>
      )
    );
  }

  return (
    <div className="border border-[#E5E3E0] bg-white rounded-lg overflow-hidden hover:border-[#F16436] transition-colors shadow-sm">
      <a
        href={data.urls.curseforge}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <div className={size === "small" ? "p-3" : "p-4"}>
          <div className="flex items-start gap-3">
            <div
              className={`relative flex-shrink-0 ${
                size === "small" ? "w-12 h-12" : "w-16 h-16"
              }`}
            >
              <Image
                src={data.thumbnail}
                alt={data.title}
                fill
                className="object-cover rounded-md"
              />
            </div>
            <div className="flex-grow min-w-0">
              <h2
                className={`font-bold text-[#141414] truncate hover:text-[#F16436] transition-colors ${
                  size === "small" ? "text-base" : "text-lg"
                }`}
              >
                {data.title}
              </h2>
              {size === "default" && (
                <p className="text-[#6D7072] text-sm mb-2">{data.summary}</p>
              )}
              <div
                className={`flex flex-wrap ${
                  size === "small" ? "gap-2 text-xs" : "gap-3 text-sm"
                } text-[#6D7072]`}
              >
                <span className="flex items-center gap-1.5">
                  <svg
                    className={`${
                      size === "small" ? "w-3.5 h-3.5" : "w-4 h-4"
                    } text-[#F16436]`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  {CurseForgeAPI.formatNumber(data.downloads.total)}
                </span>
                <span className="flex items-center gap-1.5">
                  <svg
                    className={`${
                      size === "small" ? "w-3.5 h-3.5" : "w-4 h-4"
                    } text-[#F16436]`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  {CurseForgeAPI.formatDate(data.download.uploaded_at)}
                </span>
              </div>
            </div>
          </div>
          {size === "default" && (
            <div className="mt-4 flex flex-wrap gap-2">
              {data.categories.map((category) => (
                <span
                  key={category}
                  className="px-3 py-1 bg-[#F9F7F5] text-[#6D7072] rounded-full text-xs font-medium hover:bg-[#F16436] hover:text-white transition-colors"
                >
                  {category}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="h-1 w-full bg-gradient-to-r from-[#F16436] to-[#F16436]/70" />
      </a>
    </div>
  );
}
