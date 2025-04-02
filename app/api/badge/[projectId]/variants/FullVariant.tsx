import { CurseForgeProject } from "@/app/types/curseforge";
import { CurseForgeAPI } from "@/lib/api/curseforge";
import { truncate } from "@/lib/utils/utils";

interface FullVariantProps {
  iconUrl?: string;
  project: CurseForgeProject;
  versionNumber: string;
  themeColors: {
    background: string;
    background2: string;
    text: string;
    secondaryText: string;
    border: string;
    button: string;
    buttonText: string;
  };
  showPadding: boolean;
  showDownloads: boolean;
  showVersion: boolean;
  showButton: boolean;
}

export const FullVariant = ({
  iconUrl,
  project,
  themeColors,
  showPadding,
  showDownloads,
  showVersion,
  showButton,
  versionNumber,
}: FullVariantProps) => {
  const author = project.members.find(
    (member) => member.title === "Owner",
  )?.username;
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: showPadding ? themeColors.background2 : "transparent",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "100%",
          width: "900px",
          backgroundColor: themeColors.background,
          border: `3px solid ${themeColors.border}`,
          borderRadius: "12px",
          padding: "32px",
          boxShadow: showPadding ? "0 4px 8px rgba(0, 0, 0, 0.2)" : "none",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", gap: "24px" }}>
          {/* Logo */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "110px",
              height: "110px",
              ...(!iconUrl && {
                background: "linear-gradient(180deg, #EB622B 0%, #b6491e 100%)",
              }),
              borderRadius: "8px",
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            {iconUrl ? (
              <img
                src={iconUrl || "/placeholder.svg"}
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
                  fontSize: "48px",
                  fontWeight: "bold",
                  color: themeColors.text,
                }}
              >
                {project.title.substring(0, 1)}
              </div>
            )}
          </div>

          {/* Title and Author */}
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <h1
              style={{
                fontSize: "48px",
                fontWeight: "bold",
                color: themeColors.text,
                textWrap: "balance",
                margin: 0,
              }}
            >
              {truncate(project.title, 22)}
            </h1>
            <p
              style={{
                fontSize: "24px",
                color: themeColors.secondaryText,
                margin: 0,
              }}
            >
              by {truncate(author || "", 50)}
            </p>
          </div>
        </div>

        {/* Description */}
        <p
          style={{
            fontSize: "24px",
            color: themeColors.text,
            marginTop: "24px",
            marginBottom: "24px",
            lineHeight: 1.5,
          }}
        >
          {project.summary}
        </p>

        {/* Stats */}
        <div
          style={{
            display: "flex",
            gap: "24px",
            color: themeColors.secondaryText,
            fontSize: "20px",
          }}
        >
          {showDownloads && (
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <span>Downloads:</span>
              <span>{CurseForgeAPI.formatNumber(project.downloads.total)}</span>
            </div>
          )}
          {showVersion && versionNumber && (
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <span>Latest:</span>
              <span>{versionNumber || "N/A"}</span>
            </div>
          )}
        </div>

        {/* Button */}
        {showButton && (
          <div
            style={{
              marginTop: showDownloads || showVersion ? "24px" : "0px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                backgroundColor: themeColors.button,
                color: "white",
                padding: "12px 24px",
                borderRadius: "8px",
                fontSize: "20px",
                fontWeight: "500",
                width: "100%",
              }}
            >
              View on CurseForge
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
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
  );
};

export default FullVariant;
