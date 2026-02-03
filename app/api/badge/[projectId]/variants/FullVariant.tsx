import { CurseForgeProject } from "@/app/types/curseforge";
import { CurseForgeAPI } from "@/lib/api/curseforge";
import { truncate } from "@/lib/utils";

interface FullVariantProps {
  iconUrl?: string;
  project: CurseForgeProject;
  versionNumber: string;
  showPadding: boolean;
  showDownloads: boolean;
  showVersion: boolean;
  showButton: boolean;
}

export default function FullVariant({
  iconUrl,
  project,
  showPadding,
  showDownloads,
  showVersion,
  showButton,
  versionNumber,
}: FullVariantProps) {
  const author =
    project.members.find((m) => m.title === "Owner")?.username || "Unknown";
  const category = project.categories?.[0] || project.type || "mod";

  return (
    <div
      tw={`flex w-full h-full ${
        showPadding ? "p-12 bg-[#111214]" : "bg-transparent"
      }`}
    >
      <div tw="flex flex-col w-full h-full bg-[#1a1c20] rounded-3xl overflow-hidden border-2 border-[#2D2D35] justify-center">
        <div tw="flex flex-col py-14 px-10 gap-6">
          <div tw="flex items-center gap-6">
            <div
              tw={`flex items-center justify-center w-[140px] h-[140px] rounded-2xl overflow-hidden flex-shrink-0 ${
                !iconUrl ? "bg-[#EB622B]" : "bg-[#26292e]"
              }`}
            >
              {iconUrl ? (
                <img
                  src={iconUrl}
                  width="140"
                  height="140"
                  tw="w-full h-full rounded-2xl"
                  style={{ objectFit: "cover" }}
                  alt=""
                />
              ) : (
                <div tw="text-6xl font-bold text-white">
                  {project.title.substring(0, 1)}
                </div>
              )}
            </div>

            <div tw="flex flex-col flex-1">
              <h1 tw="text-5xl font-bold text-white m-0 mb-2">
                {truncate(project.title, 24)}
              </h1>
              <div tw="flex items-center text-2xl">
                <span tw="text-[#9ca3af]">by</span>
                <span tw="text-[#EB622B] ml-2 font-semibold">
                  {truncate(author, 20)}
                </span>
                <span tw="text-[#4b5563] mx-3">•</span>
                <span tw="text-[#9ca3af] capitalize">
                  {category.replace(/-/g, " ")}
                </span>
              </div>
            </div>
          </div>

          <p
            tw="text-2xl text-[#d1d5db] leading-relaxed m-0"
            style={{ height: 80, lineHeight: "1.6", overflow: "hidden" }}
          >
            {truncate(project.summary || project.description || "", 155)}
          </p>

          <div tw="flex items-center gap-4" style={{ minHeight: 52 }}>
            {showDownloads && (
              <div tw="flex items-center bg-[#26292e] rounded-xl px-5 py-3">
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="#EB622B"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                >
                  <path
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span tw="text-xl text-white font-bold ml-3">
                  {CurseForgeAPI.formatNumber(project.downloads.total)}
                </span>
                <span tw="text-lg text-[#6b7280] ml-2">downloads</span>
              </div>
            )}
            {showVersion && versionNumber && (
              <div tw="flex items-center bg-[#26292e] rounded-xl px-5 py-3">
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="#EB622B"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                >
                  <path
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span tw="text-xl text-white font-bold ml-3">
                  {versionNumber}
                </span>
              </div>
            )}
          </div>

          {showButton && (
            <div tw="flex w-full">
              <div
                tw="flex items-center justify-center gap-3 px-8 rounded-2xl text-xl font-bold text-white w-full bg-[#EB622B]"
                style={{ height: 56 }}
              >
                <svg width="28" height="28" viewBox="0 0 114 73" fill="white">
                  <path d="M86.9804 22.9535C86.9804 22.9535 110.238 19.2696 113.911 8.52538H78.2827V0H0L9.64353 11.2401V22.7565C9.64353 22.7565 33.9764 21.4856 43.3888 28.655C56.2728 40.6503 28.898 56.8651 28.898 56.8651L24.2038 72.4678C31.5443 65.4472 45.5345 56.365 71.1848 56.8028C61.4236 59.9015 51.6085 64.7416 43.9674 72.4678H95.8198L90.937 56.8651C90.937 56.8651 53.3556 34.6059 86.9804 22.9549V22.9535Z" />
                </svg>
                View on CurseForge
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
