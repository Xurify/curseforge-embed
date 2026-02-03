import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#F9F7F5] flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="font-heading text-6xl font-bold text-[#141414] mb-4">
          404
        </h1>
        <h2 className="font-heading text-2xl font-semibold text-[#141414] mb-4">
          Page Not Found
        </h2>
        <p className="text-[#6D7072] mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-[#EB622B] hover:bg-[#d45624] text-white font-semibold px-6 py-3 rounded-lg transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          Back to Home
        </Link>
      </div>
    </main>
  );
}
