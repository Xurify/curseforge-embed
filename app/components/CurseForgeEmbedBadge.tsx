import Image from "next/image";
import { CurseForgeProject } from "../types/curseforge";
import { CurseForgeAPI } from "../lib/curseforge-api";

export function CurseForgeEmbedBadge({
  data,
}: {
  data: CurseForgeProject;
}) {
  return (
    <div className="h-[56px] bg-[#2D2D2D] rounded overflow-hidden">
      <a
        href={data.urls.curseforge}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
      >
        <div className="flex items-center h-full px-3 gap-3 hover:bg-[#373737] transition-colors">
          {/* Project Icon */}
          <div className="relative w-8 h-8 flex-shrink-0">
            <Image
              src={data.thumbnail}
              alt=""
              fill
              sizes="32px"
              className="object-cover rounded"
            />
          </div>

          {/* Project Info */}
          <div className="flex-1 min-w-0">
            <h2 className="text-white font-medium text-sm truncate">
              {data.title}
            </h2>
            <div className="flex items-center gap-3 text-xs text-[#9B9B9B]">
              {/* Downloads */}
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                {CurseForgeAPI.formatNumber(data.downloads.total)}
              </span>

              {/* Game Version */}
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
                  />
                </svg>
                {data.download.versions[0]}
              </span>

              {/* Last Updated */}
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

          {/* CurseForge Logo */}
          <div className="flex-shrink-0">
            <svg className="w-5 h-5 text-[#F16436]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21 16.5C21 16.88 20.79 17.21 20.47 17.38L12.57 21.82C12.41 21.94 12.21 22 12 22C11.79 22 11.59 21.94 11.43 21.82L3.53 17.38C3.21 17.21 3 16.88 3 16.5V7.5C3 7.12 3.21 6.79 3.53 6.62L11.43 2.18C11.59 2.06 11.79 2 12 2C12.21 2 12.41 2.06 12.57 2.18L20.47 6.62C20.79 6.79 21 7.12 21 7.5V16.5Z"/>
            </svg>
          </div>
        </div>
      </a>
    </div>
  );
} 