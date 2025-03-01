export function CurseForgeEmbedLoading({
  size = "default",
}: {
  size?: "default" | "small";
}) {
  return (
    <div className="border border-[#E5E3E0] bg-white rounded-lg overflow-hidden shadow-sm animate-pulse">
      <div className={size === "small" ? "p-3" : "p-4"}>
        <div className="flex items-start gap-3">
          <div
            className={`bg-gray-200 ${size === "small" ? "w-12 h-12" : "w-16 h-16"} rounded-md`}
          />
          <div className="flex-grow">
            <div
              className={`bg-gray-200 h-5 rounded mb-2 ${size === "small" ? "w-24" : "w-40"}`}
            />
            {size === "default" && (
              <div className="bg-gray-200 h-4 rounded w-full mb-2" />
            )}
            <div className="flex gap-2 mt-2">
              <div className="bg-gray-200 h-4 rounded w-16" />
              <div className="bg-gray-200 h-4 rounded w-24" />
            </div>
          </div>
        </div>
      </div>
      <div className="h-1 w-full bg-gray-200" />
    </div>
  );
}
