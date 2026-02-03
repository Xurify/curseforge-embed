import { truncate } from "@/lib/utils";
import { CurseForgeIcon } from "../icons/CurseForgeIcon";

interface DefaultVariantProps {
  iconUrl?: string;
  modName: string;
  author: string;
  downloads: string;
  theme: "dark" | "light";
}

export default function DefaultVariant({
  iconUrl,
  modName,
  author,
  downloads,
  theme,
}: DefaultVariantProps) {
  const isDark = theme === "dark";
  const iconColor = isDark ? "#9ca3af" : "#6B7280";

  return (
    <div
      tw={`flex items-center w-full h-full gap-6 ${
        isDark ? "bg-[#1a1c20] border-[#2D2D35]" : "bg-white border-[#E5E7EB]"
      } border-2 rounded-2xl p-6 font-sans shadow-xl`}
    >
      <div
        tw={`flex items-center justify-center w-[110px] h-[110px] rounded-2xl overflow-hidden flex-shrink-0 p-2 ${
          !iconUrl ? "bg-[#EB622B]" : "bg-[#26292e]"
        }`}
      >
        {iconUrl ? (
          <img
            src={iconUrl}
            tw="w-full h-full object-contain rounded-xl"
            style={{ objectFit: "contain" }}
            alt="Mod logo"
          />
        ) : (
          <div tw="text-4xl font-bold text-white">
            {modName.substring(0, 1)}
          </div>
        )}
      </div>

      <div tw="flex flex-col justify-center h-full flex-1 min-w-0">
        <div
          tw={`text-4xl font-bold ${
            isDark ? "text-white" : "text-[#1F2937]"
          } truncate mb-2 tracking-tight`}
        >
          {truncate(modName, 20)}
        </div>

        <div
          tw={`flex items-center gap-6 ${
            isDark ? "text-[#9ca3af]" : "text-[#6B7280]"
          } text-2xl font-medium`}
        >
          <div tw="flex items-center gap-2">
            <svg
              width="28"
              height="28"
              fill="none"
              stroke={isDark ? "#EB622B" : iconColor}
              viewBox="0 0 24 24"
              strokeWidth="2.5"
            >
              <path
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span style={isDark ? { color: "white", fontWeight: "bold" } : {}}>
              {downloads}
            </span>
          </div>

          <div tw="flex items-center gap-2">
            <span tw={isDark ? "text-[#9ca3af]" : ""}>by</span>
            <span
              style={isDark ? { color: "#EB622B", fontWeight: "bold" } : {}}
            >
              {truncate(author || "Unknown", 15)}
            </span>
          </div>
        </div>
      </div>

      <div
        tw="ml-auto flex-shrink-0 flex items-center"
        style={{ width: 40, height: 25 }}
      >
        <CurseForgeIcon />
      </div>
    </div>
  );
}
