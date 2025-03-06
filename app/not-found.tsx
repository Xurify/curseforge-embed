import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#F9F7F5] flex items-center justify-center p-4">
      <div className="text-center">
        {/* <div className="mb-8">
          <svg
            className="w-24 h-24 text-[#EB622B] mx-auto"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M21 16.5C21 16.88 20.79 17.21 20.47 17.38L12.57 21.82C12.41 21.94 12.21 22 12 22C11.79 22 11.59 21.94 11.43 21.82L3.53 17.38C3.21 17.21 3 16.88 3 16.5V7.5C3 7.12 3.21 6.79 3.53 6.62L11.43 2.18C11.59 2.06 11.79 2 12 2C12.21 2 12.41 2.06 12.57 2.18L20.47 6.62C20.79 6.79 21 7.12 21 7.5V16.5Z" />
          </svg>
        </div>
         */}
        <h1 className="text-6xl font-bold text-[#141414] mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-[#141414] mb-4">Page Not Found</h2>
        <p className="text-[#6D7072] mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. 
        </p>

        <Link 
          href="/"
          className="inline-flex items-center gap-2 bg-[#EB622B] text-white px-6 py-3 rounded-lg hover:bg-[#d45624] transition-colors"
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
  )
}