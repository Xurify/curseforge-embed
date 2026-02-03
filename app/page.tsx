// import CurseForgeEmbed from "./components/CurseForgeEmbed";
// import ClientCurseForgeEmbed from "./components/ClientCurseForgeEmbed";
// import CurseForgeBadge from "./components/CurseForgeBadge";
// import ApiDocs from "./components/ApiDocs";

export const revalidate = 604800;
export const dynamic = "force-static";

const projectIds = {
  sodium: 394468,
  iris: 455508,
  elytraAssistant: 1181141,
  //jeiJustEnoughItems: 238222,
  //waystones: 245755,
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#1B1D1F] p-4 pb-16">
      <div className="container mx-auto">
        <div className="flex gap-4">
          <img src="/icon.png" alt="CurseForge Embed" className="w-10 h-10" />
          <h1 className="font-heading text-4xl font-bold mb-4 text-white flex items-center gap-3">
            CurseForge Embed
          </h1>
        </div>
        <p className="text-gray-400 mb-10 max-w-3xl text-lg leading-relaxed">
          A modern way to embed CurseForge projects on your website, powered by
          the{" "}
          <a
            href="https://cfwidget.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand hover:underline font-medium"
          >
            CurseForge API
          </a>
          . <br />
          Choose between server and client components, or use the compact badge
          format.
        </p>

        <div className="space-y-12">
          <section>
            <h2 className="font-heading text-3xl font-semibold mb-2 text-white">
              Project Badges
            </h2>
            <p className="text-gray-400 mb-6">
              Choose from three different badge styles: Default, Compact, and
              Full. Each style can be customized with various options.
            </p>

            <div className="space-y-8">
              {/* Default Variant */}
              <div>
                <h3 className="font-heading text-2xl font-medium mb-4 text-white">
                  Default Badge
                </h3>
                <div className="space-y-4">
                  <a
                    href="https://www.curseforge.com/minecraft/mc-mods/sodium"
                    className="inline-flex"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={`/${projectIds.sodium}.png`}
                      alt="Sodium"
                      width="340"
                      height="80"
                    />
                  </a>
                  <div className="bg-[#2D2F31] text-white p-4 rounded-lg overflow-x-auto">
                    <pre className="text-sm">
                      <code>{`<img src="https://curseforge-embed.vercel.app/394468.png" alt="CurseForge Project" width="340" height="80" />`}</code>
                    </pre>
                  </div>
                </div>
              </div>

              {/* Compact Variant */}
              <div>
                <h3 className="font-heading text-2xl font-medium mb-4 text-white">
                  Compact Badge
                </h3>
                <div className="space-y-4">
                  <a
                    href="https://www.curseforge.com/minecraft/mc-mods/sodium"
                    className="inline-flex"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={`/${projectIds.sodium}.png?variant=compact`}
                      alt="Sodium"
                      height="32"
                    />
                  </a>
                  <div className="bg-[#2D2F31] text-white p-4 rounded-lg overflow-x-auto">
                    <pre className="text-sm">
                      <code>{`<img src="https://curseforge-embed.vercel.app/394468.png?variant=compact" alt="CurseForge Project" height="32" />`}</code>
                    </pre>
                  </div>
                </div>
              </div>

              {/* Full Variant */}
              <div>
                <h3 className="font-heading text-2xl font-medium mb-4 text-white">
                  Full Badge
                </h3>
                <div className="space-y-4">
                  <a
                    href="https://www.curseforge.com/minecraft/mc-mods/elytra-assistant"
                    className="inline-flex"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={`/${projectIds.sodium}.png?variant=full`}
                      alt="Sodium"
                      width="600"
                      height="260"
                    />
                  </a>
                  <div className="bg-[#2D2F31] text-white p-4 rounded-lg overflow-x-auto">
                    <pre className="text-sm">
                      <code>{`<img src="https://curseforge-embed.vercel.app/394468.png?variant=full" alt="CurseForge Project" width="900" height="400" />`}</code>
                    </pre>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-[#2D2F31] text-white p-4 rounded-lg overflow-x-auto">
                <pre className="text-sm">
                  <code>{`<!-- Basic usage -->
<img 
  src="https://curseforge-embed.vercel.app/394468.png"
  alt="CurseForge Project"
  width="340"
  height="80"
/>

<!-- Optional URL parameters -->
?variant=default|compact|full    # Change badge style
?theme=dark|light               # Change color theme
?showDownloads=true|false      # Show/hide download count
?showVersion=true|false        # Show/hide version number
?showButton=true|false         # Show/hide download button (full variant only)
?showPadding=true|false        # Show/hide padding (full variant only)
`}</code>
                </pre>
              </div>
            </div>
          </section>
          {/* 
          <section>
            <h2 className="text-2xl font-semibold mb-2 text-white">
              Server vs Client Components
            </h2>
            <p className="text-gray-400 mb-6">
              Choose between server components (better for SEO and initial load)
              or client components (better for dynamic updates and loading
              states).
            </p>

            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="text-xl font-medium mb-4 text-white flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-brand"
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
                  <CurseForgeEmbed projectId={projectIds.iris} />
                </div>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-4 text-white flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-brand"
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
                  <ClientCurseForgeEmbed
                    projectId={projectIds.elytraAssistant}
                  />
                </div>
              </div>
            </div>
          </section> */}
        </div>
      </div>
    </main>
  );
}
