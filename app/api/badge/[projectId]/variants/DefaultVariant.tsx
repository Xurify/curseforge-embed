import { truncate } from "@/lib/utils/utils";
import { CurseForgeIcon } from "../icons/CurseForgeIcon";
import { CurseForgeAPI } from "@/lib/api/curseforge";

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
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        background: theme === "dark" ? "#2D2D2D" : "#F8F9F9",
        border: `3px solid ${theme === "dark" ? "#404040" : "#D9D9D9"}`,
        borderRadius: "8px",
        padding: "16px 24px",
        color: theme === "dark" ? "#E1E3E5" : "#242729",
        fontFamily: "Jost, sans-serif",
        boxShadow:
          theme === "dark"
            ? "0 1px 3px rgba(0,0,0,0.15)"
            : "0 1px 2px rgba(0,0,0,0.05)",
      }}
    >
      {/* Logo/Icon */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "110px",
          height: "110px",
          ...(!iconUrl && {
            background: "linear-gradient(180deg, #EB622B 0%, #D44A1A 100%)",
          }),
          borderRadius: "8px",
          marginRight: "16px",
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        {iconUrl ? (
          <img
            src={iconUrl}
            width="100%"
            height="100%"
            style={{
              objectFit: "contain",
              imageRendering: "crisp-edges",
            }}
            alt="Mod logo"
          />
        ) : (
          <div
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              color: "white",
            }}
          >
            {modName.substring(0, 1)}
          </div>
        )}
      </div>

      {/* Content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "100%",
          flex: 1,
          minWidth: 0,
          lineHeight: 1.4,
        }}
      >
        {/* Mod Name */}
        <div
          style={{
            fontSize: "36px",
            fontWeight: 700,
            color: theme === "dark" ? "#FFFFFF" : "#242729",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            marginBottom: "12px",
            letterSpacing: "-0.1px",
          }}
        >
          {truncate(modName, 20)}
        </div>

        {/* Stats Row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
            color: theme === "dark" ? "#9BA0A4" : "#6A737C",
            fontSize: "28px",
            fontWeight: 500,
          }}
        >
          {/* Downloads */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <svg
              width="32"
              height="32"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2px"
            >
              <path
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>{downloads}</span>
          </div>

          {/* Author */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <svg
              width="32"
              height="32"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2px"
            >
              <path
                d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>{truncate(author || "Unknown", 15)}</span>
          </div>
        </div>
      </div>

      <CurseForgeIcon />
    </div>
  );
}
