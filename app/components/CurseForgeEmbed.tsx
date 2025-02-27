import { CurseForgeProject } from '../types/curseforge';
import Image from 'next/image';

interface CurseForgeEmbedProps {
  projectId: number | string;
  fallback?: React.ReactNode;
}

async function getCurseForgeData(projectId: number | string): Promise<CurseForgeProject> {
  const response = await fetch(`https://api.cfwidget.com/${projectId}`, {
    next: {
      revalidate: 3600 // Revalidate every hour
    }
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch project data');
  }
  return response.json();
}

export default async function CurseForgeEmbed({ projectId, fallback }: CurseForgeEmbedProps) {
  let data: CurseForgeProject;
  
  try {
    data = await getCurseForgeData(projectId);
  } catch (error) {
    return fallback || (
      <div className="border border-red-200 bg-red-50 rounded-lg p-4 text-red-700">
        Failed to load CurseForge project
      </div>
    );
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', { notation: 'compact' }).format(num);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="border border-[#E5E3E0] bg-white rounded-lg overflow-hidden hover:border-[#F16436] transition-colors shadow-sm">
      <a
        href={data.urls.curseforge}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <div className="p-4">
          <div className="flex items-start gap-4">
            <div className="relative w-16 h-16 flex-shrink-0">
              <Image
                src={data.thumbnail}
                alt={data.title}
                fill
                className="object-cover rounded-md"
              />
            </div>
            <div className="flex-grow min-w-0">
              <h2 className="font-bold text-[#141414] text-lg truncate hover:text-[#F16436] transition-colors">
                {data.title}
              </h2>
              <p className="text-[#6D7072] text-sm mb-2">{data.summary}</p>
              <div className="flex flex-wrap gap-3 text-sm text-[#6D7072]">
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-[#F16436]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  {formatNumber(data.downloads.total)} downloads
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-[#F16436]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Updated {formatDate(data.download.uploaded_at)}
                </span>
              </div>
            </div>
          </div>
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
        </div>
        <div className="h-1 w-full bg-gradient-to-r from-[#F16436] to-[#F16436]/70" />
      </a>
    </div>
  );
} 