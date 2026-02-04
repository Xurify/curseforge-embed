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
  /** Scale factor for high-DPI (e.g. 2 for retina). Renders at 2x resolution. */
  scale?: number;
}

const BASE = {
  height: 32,
  paddingX: 12,
  iconSize: 16,
  gap: 8,
  fontSize: 15,
  borderRadius: 8,
} as const;

export default function CompactVariant({
  iconUrl,
  project,
  showDownloads,
  showVersion,
  width,
  versionNumber,
  scale = 1,
}: CompactVariantProps) {
  const s = scale;
  const h = BASE.height * s;
  const px = BASE.paddingX * s;
  const iconSize = BASE.iconSize * s;
  const gap = BASE.gap * s;
  const fontSize = BASE.fontSize * s;
  const radius = BASE.borderRadius * s;

  return (
    <div
      tw="flex items-center font-sans bg-[#16181C] border border-[#2D2D35]"
      style={{
        width: width * s,
        height: h,
        paddingLeft: px,
        paddingRight: px,
        borderRadius: radius,
      }}
    >
      {project.thumbnail && (
        <div
          tw="flex-shrink-0 rounded-md overflow-hidden"
          style={{
            width: iconSize,
            height: iconSize,
            marginRight: gap,
          }}
        >
          <img
            src={iconUrl}
            alt=""
            width={iconSize}
            height={iconSize}
            tw="rounded-md"
            style={{
              width: iconSize,
              height: iconSize,
              objectFit: "contain",
              display: "block",
            }}
          />
        </div>
      )}
      <div
        tw="flex items-center text-white font-bold"
        style={{ gap, fontSize }}
      >
        <span tw="truncate">{truncate(project.title, 20)}</span>
        {showDownloads && (
          <span tw="text-[#A1A1AA] font-medium" style={{ marginLeft: gap / 2 }}>
            {CurseForgeAPI.formatNumber(project.downloads.total)}
          </span>
        )}
        {showVersion && versionNumber && (
          <span tw="text-[#A1A1AA] font-medium" style={{ marginLeft: gap / 2 }}>
            v{versionNumber}
          </span>
        )}
      </div>
    </div>
  );
}
