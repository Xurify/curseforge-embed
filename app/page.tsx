import CurseForgeEmbed from "./components/CurseForgeEmbed";
import ClientCurseForgeEmbed from "./components/ClientCurseForgeEmbed";
import CurseForgeBadge from "./components/CurseForgeBadge";

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
          <svg
            className="w-8 h-8 text-[#F16436]"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M21 16.5C21 16.88 20.79 17.21 20.47 17.38L12.57 21.82C12.41 21.94 12.21 22 12 22C11.79 22 11.59 21.94 11.43 21.82L3.53 17.38C3.21 17.21 3 16.88 3 16.5V7.5C3 7.12 3.21 6.79 3.53 6.62L11.43 2.18C11.59 2.06 11.79 2 12 2C12.21 2 12.41 2.06 12.57 2.18L20.47 6.62C20.79 6.79 21 7.12 21 7.5V16.5Z" />
          </svg>
          CurseForge Embed
        </h1>
        <p className="text-[#6D7072] mb-8 max-w-3xl">
          A simple and easy way to embed CurseForge projects on your website.{" "}
          <br />
          Choose between embedding the project as a an image, iframe, or using
          the React component.
        </p>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-semibold mb-2 text-[#141414]">
              Project Badge
            </h2>
            <p className="text-[#6D7072] mb-6">
              A compact badge that shows key project information in a single
              line. Available as both a React component and a static image.
            </p>

            <div className="space-y-8">
              <div>
                <div className="grid gap-8 md:grid-cols-2">
                  <div>
                    <h4 className="text-base font-medium mb-2 text-[#141414] flex items-center gap-2">
                      <svg
                        className="w-5 h-5 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      React Component
                    </h4>
                    <div className="space-y-4">
                      <CurseForgeBadge
                        projectId={projectIds.jeiJustEnoughItems}
                      />
                      <CurseForgeBadge projectId={projectIds.waystones} />
                      <CurseForgeBadge projectId={projectIds.elytraAssistant} />
                    </div>
                  </div>

                  <div>
                    <h4 className="text-base font-medium mb-2 text-[#141414] flex items-center gap-2">
                      <svg
                        className="w-5 h-5 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4 4m0 0l4-4m-4 4V4"
                        />
                      </svg>
                      Static Image
                    </h4>
                    <div className="space-y-4">
                      <img
                        src={`/api/badge/${projectIds.jeiJustEnoughItems}?theme=dark`}
                        alt="JEI - Just Enough Items"
                        width="250"
                        height="70"
                      />
                      <img
                        src={`/api/badge/${projectIds.waystones}?theme=dark`}
                        alt="Waystones"
                        width="250"
                        height="70"
                      />
                      <img
                        src={`/api/badge/${projectIds.elytraAssistant}?theme=dark`}
                        alt="Elytra Assistant"
                        width="250"
                        height="70"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-8 bg-[#141414] text-white p-4 rounded-lg overflow-x-auto">
                  <pre className="text-sm">
                    <code>{`// React Component
import CurseForgeBadge from './components/CurseForgeBadge';

<CurseForgeBadge projectId="238222" />

// Static Image
<img 
  src="/api/badge/238222?theme=dark"
  alt="CurseForge Project"
  width="250"
  height="70"
/>`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2 text-[#141414]">
              Component Sizes
            </h2>
            <p className="text-[#6D7072] mb-6">
              The component comes in two sizes: default and small. Choose the
              one that fits your layout best.
            </p>

            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="text-xl font-medium mb-4 text-[#141414]">
                  Default Size
                </h3>
                <div className="max-w-2xl">
                  <CurseForgeEmbed projectId={projectIds.elytraAssistant} />
                </div>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-4 text-[#141414]">
                  Small Size
                </h3>
                <div className="max-w-xl">
                  <CurseForgeEmbed
                    projectId={projectIds.elytraAssistant}
                    size="small"
                  />
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2 text-[#141414]">
              Server vs Client Components
            </h2>
            <p className="text-[#6D7072] mb-6">
              Choose between server components (better for SEO and performance)
              or client components (better for interactivity). Both use the same
              API wrapper under the hood.
            </p>

            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="text-xl font-medium mb-4 text-[#141414] flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Server Component
                </h3>
                <div className="max-w-2xl">
                  <CurseForgeEmbed projectId={projectIds.jeiJustEnoughItems} />
                </div>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-4 text-[#141414] flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
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
            <h2 className="text-2xl font-semibold mb-2 text-[#141414]">
              API Wrapper
            </h2>
            <p className="text-[#6D7072] mb-6">
              The component uses a Next.js API route to wrap the CurseForge API,
              providing better security, caching, and error handling.
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
        </div>
      </div>
    </main>
  );
}
