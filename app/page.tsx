import CopyButton from "./components/CopyButton";

export const revalidate = 604800;
export const dynamic = "force-static";

const projectIds = {
  sodium: 394468,
  iris: 455508,
  elytraAssistant: 1181141,
};

const baseUrl = "https://curseforge-embed.vercel.app";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0C0C0E] text-gray-100 overflow-x-hidden">
      <section className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 pt-16 pb-24">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(235,98,43,0.25), transparent), radial-gradient(ellipse 60% 40% at 80% 60%, rgba(235,98,43,0.08), transparent)",
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1e_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1e_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <img
            src="/icon.png"
            alt=""
            className="w-14 h-14 mx-auto mb-6 opacity-90"
          />
          <h1 className="font-heading text-6xl sm:text-7xl md:text-8xl font-bold text-white tracking-tight mb-4">
            CurseForge
            <br />
            <span className="text-brand">Embeds</span>
          </h1>
          <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            A modern way to embed CurseForge projects on your website, powered
            by the{" "}
            <a
              href="https://cfwidget.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand hover:underline font-medium"
            >
              CurseForge API
            </a>
            .
          </p>
          <a
            href="https://www.curseforge.com/minecraft/mc-mods/sodium"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-xl border border-white/10 bg-[#161618] p-4 shadow-2xl shadow-brand/10 transition hover:border-brand/30 hover:shadow-brand/20"
          >
            <img
              src={`/${projectIds.sodium}.png`}
              alt="Sodium"
              width={340}
              height={80}
              className="rounded-lg"
            />
          </a>
        </div>
      </section>

      <section className="relative px-4 pb-24 -mt-8">
        <div className="container mx-auto max-w-6xl">
          <h2 className="font-heading text-4xl sm:text-5xl text-white mb-2 text-center">
            Pick a style
          </h2>
          <p className="text-gray-400 text-center mb-14 max-w-xl mx-auto">
            Three badge variants. One{" "}
            <code className="text-brand">&lt;img&gt;</code> tag.
          </p>

          <div className="flex flex-col md:flex-row gap-6 md:items-start">
            <div className="group rounded-2xl border border-white/10 bg-[#121214] p-4 min-h-[280px] flex flex-col transition hover:border-brand/30 hover:bg-[#161618] md:flex-1 md:max-w-[380px]">
              <h3 className="font-heading text-2xl text-white mb-1">Default</h3>
              <p className="text-sm text-gray-500 mb-3">
                Title, thumbnail, stats
              </p>
              <a
                href="https://www.curseforge.com/minecraft/mc-mods/sodium"
                target="_blank"
                rel="noopener noreferrer"
                className="block mb-3"
              >
                <img
                  src={`/${projectIds.sodium}.png`}
                  alt="Sodium"
                  width={340}
                  height={80}
                  className="rounded-lg"
                />
              </a>
              <div className="relative rounded-lg bg-[#121214] p-3 pr-14 overflow-x-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden mt-auto">
                <CopyButton
                  text={`<img src="${baseUrl}/${projectIds.sodium}.png" alt="CurseForge Project" width="340" height="80" />`}
                />
                <pre className="text-xs text-gray-400 font-mono whitespace-pre-wrap break-all">
                  <code>{`<img src="${baseUrl}/${projectIds.sodium}.png" alt="CurseForge Project" width="340" height="80" />`}</code>
                </pre>
              </div>
            </div>

            <div className="group rounded-2xl border border-white/10 bg-[#121214] p-6 transition hover:border-brand/30 hover:bg-[#161618] md:flex-1 md:max-w-[420px]">
              <h3 className="font-heading text-2xl text-white mb-1">Full</h3>
              <p className="text-sm text-gray-500 mb-4">
                Rich card with description
              </p>
              <a
                href="https://www.curseforge.com/minecraft/mc-mods/elytra-assistant"
                target="_blank"
                rel="noopener noreferrer"
                className="block mb-4"
              >
                <img
                  src={`/${projectIds.elytraAssistant}.png?variant=full`}
                  alt="Elytra Assistant"
                  width={600}
                  height={260}
                  className="rounded-lg w-full max-w-full h-auto"
                />
              </a>
              <div className="relative rounded-lg bg-[#121214] p-3 pr-14 overflow-x-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <CopyButton
                  text={`<img src="${baseUrl}/${projectIds.elytraAssistant}.png?variant=full" alt="CurseForge Project" width="600" height="260" />`}
                />
                <pre className="text-xs text-gray-400 font-mono whitespace-pre-wrap break-all">
                  <code>{`<img src="${baseUrl}/${projectIds.elytraAssistant}.png?variant=full" alt="CurseForge Project" width="600" height="260" />`}</code>
                </pre>
              </div>
            </div>

            <div className="group rounded-2xl border border-white/10 bg-[#121214] p-4 min-h-[280px] flex flex-col transition hover:border-brand/30 hover:bg-[#161618] md:flex-1 md:max-w-[380px]">
              <h3 className="font-heading text-2xl text-white mb-1">Compact</h3>
              <p className="text-sm text-gray-500 mb-3">
                One line, small footprint
              </p>
              <a
                href="https://www.curseforge.com/minecraft/mc-mods/sodium"
                target="_blank"
                rel="noopener noreferrer"
                className="block mb-3"
              >
                <img
                  src={`/${projectIds.sodium}.png?variant=compact&scale=2`}
                  alt="Sodium"
                  width={280}
                  height={48}
                  className="rounded h-12 w-auto"
                />
              </a>
              <div className="relative rounded-lg bg-[#121214] p-3 pr-14 overflow-x-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden mt-auto">
                <CopyButton
                  text={`<img src="${baseUrl}/${projectIds.sodium}.png?variant=compact&scale=2" alt="CurseForge Project" height="48" />`}
                />
                <pre className="text-xs text-gray-400 font-mono whitespace-pre-wrap break-all">
                  <code>{`<img src="${baseUrl}/${projectIds.sodium}.png?variant=compact&scale=2" alt="CurseForge Project" height="48" />`}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-4 pb-32">
        <div className="container mx-auto max-w-4xl">
          <h2 className="font-heading text-4xl text-white mb-2 text-center">
            URL options
          </h2>
          <p className="text-gray-400 text-center mb-10">
            Append query params to customize the badge.
          </p>

          <div className="rounded-2xl border border-white/10 bg-[#121214] overflow-hidden">
            <div className="grid sm:grid-cols-2 gap-px bg-white/10">
              {[
                {
                  param: "variant",
                  values: "default | compact | full",
                  desc: "Badge style",
                },
                {
                  param: "scale",
                  values: "1 | 2",
                  desc: "Compact only: 2 = 2× resolution (high-DPI)",
                },
                {
                  param: "theme",
                  values: "dark | light",
                  desc: "Color theme",
                },
                {
                  param: "showDownloads",
                  values: "true | false",
                  desc: "Download count",
                },
                {
                  param: "showVersion",
                  values: "true | false",
                  desc: "Version number",
                },
                {
                  param: "showButton",
                  values: "true | false",
                  desc: "Download button (full only)",
                },
                {
                  param: "showPadding",
                  values: "true | false",
                  desc: "Padding (full only)",
                },
              ].map(({ param, values, desc }) => (
                <div
                  key={param}
                  className="flex flex-col sm:flex-row sm:items-center gap-2 p-4 bg-[#0C0C0E]"
                >
                  <div className="flex items-baseline gap-2 min-w-0">
                    <code className="text-brand font-mono text-sm shrink-0">
                      ?{param}
                    </code>
                    <span className="text-gray-500 font-mono text-xs truncate">
                      {values}
                    </span>
                  </div>
                  <span className="text-gray-400 text-sm sm:ml-auto">
                    {desc}
                  </span>
                </div>
              ))}
              <div className="bg-[#0C0C0E]" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
