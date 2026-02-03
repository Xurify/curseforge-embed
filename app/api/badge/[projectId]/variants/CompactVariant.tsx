import { CurseForgeProject } from "@/app/types/curseforge";
import { CurseForgeAPI } from "@/lib/api/curseforge";
import { truncate } from "@/lib/utils";

interface CompactVariantProps {
  iconUrl?: string;
  project: CurseForgeProject;
  showVersion: boolean;
  showDownloads: boolean;
  width: number;
  versionNumber: string;
}

export default function CompactVariant({
  iconUrl,
  project,
  showDownloads,
  showVersion,
  width,
  versionNumber,
}: CompactVariantProps) {
  return (
    <div
      tw="flex items-center h-8 bg-[#16181C] border border-[#2D2D35] rounded-lg px-3 font-sans"
      style={{ width }}
    >
      {project.thumbnail && (
        <img
          src={iconUrl}
          alt=""
          width={20}
          height={20}
          tw="rounded-md h-5 w-5 mr-2"
          style={{ objectFit: "contain" }}
        />
      )}
      <div tw="flex items-center gap-2 text-white text-[15px] font-bold">
        <span tw="truncate">{truncate(project.title, 20)}</span>
        {showDownloads && (
          <span tw="text-[#A1A1AA] font-medium ml-1">
            {CurseForgeAPI.formatNumber(project.downloads.total)}
          </span>
        )}
        {showVersion && versionNumber && (
          <span tw="text-[#A1A1AA] font-medium ml-1">v{versionNumber}</span>
        )}
      </div>
    </div>
  );
}
