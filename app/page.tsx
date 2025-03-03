import CurseForgeEmbed from './components/CurseForgeEmbed';
import ClientCurseForgeEmbed from './components/ClientCurseForgeEmbed';

export default function Home() {
  // TODO: Remove later - Example project IDs from CurseForge
  const projectIds = {
    elytraAssistant: 1181141,
    jeiJustEnoughItems: 238222,
    waystones: 245755,
  };

  return (
    <main className="min-h-screen bg-[#F9F7F5] p-4 pb-16">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-[#141414] flex items-center gap-2">
          <svg className="w-8 h-8 text-[#F16436]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 16.5C21 16.88 20.79 17.21 20.47 17.38L12.57 21.82C12.41 21.94 12.21 22 12 22C11.79 22 11.59 21.94 11.43 21.82L3.53 17.38C3.21 17.21 3 16.88 3 16.5V7.5C3 7.12 3.21 6.79 3.53 6.62L11.43 2.18C11.59 2.06 11.79 2 12 2C12.21 2 12.41 2.06 12.57 2.18L20.47 6.62C20.79 6.79 21 7.12 21 7.5V16.5Z"/>
          </svg>
          CurseForge Embed
        </h1>
        <p className="text-[#6D7072] mb-8 max-w-3xl">
          A simple and easy way to embed CurseForge projects on your website. <br />
          Choose between embedding the project as a an image, iframe, or using the React component.
        </p>
        
        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-semibold mb-2 text-[#141414]">Component Sizes</h2>
            <p className="text-[#6D7072] mb-6">
              The component comes in two sizes: default and small. Choose the one that fits your layout best.
            </p>
            
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="text-xl font-medium mb-4 text-[#141414]">Default Size</h3>
                <div className="max-w-2xl">
                  <CurseForgeEmbed projectId={projectIds.elytraAssistant} />
                </div>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-4 text-[#141414]">Small Size</h3>
                <div className="max-w-xl">
                  <CurseForgeEmbed projectId={projectIds.elytraAssistant} size="small" />
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2 text-[#141414]">Server vs Client Components</h2>
            <p className="text-[#6D7072] mb-6">
              Choose between server components (better for SEO and performance) or client components (better for interactivity).
              Both use the same API wrapper under the hood.
            </p>
            
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="text-xl font-medium mb-4 text-[#141414] flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Server Component
                </h3>
                <div className="max-w-2xl">
                  <CurseForgeEmbed projectId={projectIds.jeiJustEnoughItems} />
                </div>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-4 text-[#141414] flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Client Component
                </h3>
                <div className="max-w-2xl">
                  <ClientCurseForgeEmbed projectId={projectIds.waystones} />
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2 text-[#141414]">API Wrapper</h2>
            <p className="text-[#6D7072] mb-6">
              The component uses a Next.js API route to wrap the CurseForge API, providing better security, caching, and error handling.
            </p>
            
            <div className="bg-[#141414] text-white p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm">
                <code>{`// Server-side usage
import CurseForgeEmbed from './components/CurseForgeEmbed';

<CurseForgeEmbed projectId="238222" />

// Client-side usage
import ClientCurseForgeEmbed from './components/ClientCurseForgeEmbed';

<ClientCurseForgeEmbed projectId="245755" />

// Or use the hook directly
import { useCurseForgeProject } from './hooks/useCurseForgeProject';

function MyComponent() {
  const { data, error, loading } = useCurseForgeProject("1181141");
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  
  return <h1>{data.title}</h1>;
}`}</code>
              </pre>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2 text-[#141414]">Server-Generated Images</h2>
            <p className="text-[#6D7072] mb-6">
              Generate static images of your CurseForge embeds for use in places where JavaScript isn't available or desired.
            </p>
            
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="text-xl font-medium mb-4 text-[#141414]">Default Size (PNG)</h3>
                <div className="border border-gray-200 rounded-lg overflow-hidden max-w-2xl">
                  <img
                    src="/api/generate-image/238222?size=default&format=png"
                    alt="API-generated component (default size)"
                    className="w-full"
                  />
                </div>
                <p className="mt-2 text-sm text-[#6D7072]">
                  URL: <code>/api/generate-image/238222?size=default&format=png</code>
                </p>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-4 text-[#141414]">Small Size (JPEG)</h3>
                <div className="border border-gray-200 rounded-lg overflow-hidden max-w-xl">
                  <img
                    src="/api/generate-image/238222?size=small&format=jpeg"
                    alt="API-generated component (small size)"
                    className="w-full"
                  />
                </div>
                <p className="mt-2 text-sm text-[#6D7072]">
                  URL: <code>/api/generate-image/238222?size=small&format=jpeg</code>
                </p>
              </div>
            </div>

            <div className="mt-8 bg-[#141414] text-white p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm">
                <code>{`// Direct image usage in HTML
<img 
  src="/api/generate-image/238222?size=default&format=png"
  alt="CurseForge Project"
/>

// Programmatic usage
const response = await fetch(
  '/api/generate-image/238222?size=default&format=png'
);
const imageBlob = await response.blob();

// With additional options
const url = new URL('/api/generate-image/238222', window.location.origin);
url.searchParams.set('size', 'small');
url.searchParams.set('format', 'jpeg');
const response = await fetch(url);`}</code>
              </pre>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
