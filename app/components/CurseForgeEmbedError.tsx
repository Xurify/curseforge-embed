export function CurseForgeEmbedError({
  fallback,
}: {
  fallback?: React.ReactNode;
}) {
  return (
    fallback || (
      <div className="border border-red-200 bg-red-50 rounded-lg p-4 text-red-700">
        Failed to load CurseForge project
      </div>
    )
  );
}

