import { CurseForgeProject } from "../types/curseforge";
import { CurseForgeAPI } from "../lib/curseforge";

export function CurseForgeEmbedImageSkeleton({
  data,
  size = "default",
}: {
  data: CurseForgeProject;
  size?: "default" | "small";
}) {
  return (
    <div
      style={{
        border: "1px solid #E5E3E0",
        backgroundColor: "white",
        borderRadius: "0.5rem",
        overflow: "hidden",
        boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        transition: "border-color 0.15s ease-in-out",
      }}
    >
      <a
        href={data.urls.curseforge}
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: "block", textDecoration: "none" }}
      >
        <div style={{ padding: size === "small" ? "0.75rem" : "1rem" }}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "0.75rem",
            }}
            className="flex-gap"
          >
            <div
              style={{
                position: "relative",
                flexShrink: 0,
                width: size === "small" ? "3rem" : "4rem",
                height: size === "small" ? "3rem" : "4rem",
              }}
            >
              <img
                src={data.thumbnail}
                alt={data.title}
                sizes={size === "small" ? "48px" : "64px"}
                style={{
                  objectFit: "cover",
                  borderRadius: "0.375rem",
                  width: size === "small" ? "48px" : "64px",
                  height: size === "small" ? "48px" : "64px",
                }}
              />
            </div>
            <div style={{ flexGrow: 1, minWidth: 0 }}>
              <h2
                style={{
                  fontWeight: "bold",
                  color: "#141414",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  fontSize: size === "small" ? "1rem" : "1.125rem",
                  transition: "color 0.15s ease-in-out",
                  marginTop: 0,
                  marginBottom: size === "small" ? "0.125rem" : "0.25rem",
                }}
                className="component-title"
              >
                {data.title}
              </h2>
              {size === "default" && (
                <p
                  style={{
                    color: "#6D7072",
                    fontSize: "0.875rem",
                    marginBottom: "0.5rem",
                    marginTop: 0,
                  }}
                  className="component-description"
                >
                  {data.summary}
                </p>
              )}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: size === "small" ? "0.5rem" : "0.75rem",
                  fontSize: size === "small" ? "0.75rem" : "0.875rem",
                  color: "#6D7072",
                }}
              >
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.375rem",
                  }}
                >
                  <svg
                    style={{
                      width: size === "small" ? "0.875rem" : "1rem",
                      height: size === "small" ? "0.875rem" : "1rem",
                      color: "#EB622B",
                    }}
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
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.375rem",
                  }}
                >
                  <svg
                    style={{
                      width: size === "small" ? "0.875rem" : "1rem",
                      height: size === "small" ? "0.875rem" : "1rem",
                      color: "#EB622B",
                    }}
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
            <div
              style={{
                marginTop: "1rem",
                display: "flex",
                flexWrap: "wrap",
                gap: "0.5rem",
              }}
            >
              {data.categories.map((category) => (
                <span
                  key={category}
                  style={{
                    paddingLeft: "0.75rem",
                    paddingRight: "0.75rem",
                    paddingTop: "0.25rem",
                    paddingBottom: "0.25rem",
                    backgroundColor: "#F9F7F5",
                    color: "#6D7072",
                    borderRadius: "9999px",
                    fontSize: "0.75rem",
                    fontWeight: "500",
                    transition:
                      "background-color 0.15s ease-in-out, color 0.15s ease-in-out",
                  }}
                >
                  {category}
                </span>
              ))}
            </div>
          )}
        </div>
        <div
          style={{
            height: "0.25rem",
            width: "100%",
            background:
              "linear-gradient(to right, #EB622B, rgba(241, 100, 54, 0.7))",
          }}
        />
      </a>
    </div>
  );
}
