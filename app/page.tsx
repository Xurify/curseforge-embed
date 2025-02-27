import CurseForgeEmbed from './components/CurseForgeEmbed';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F9F7F5] p-4">
      <div className="container mx-auto">
        <div className="max-w-2xl">
          <CurseForgeEmbed projectId="1181141" />
        </div>
      </div>
    </main>
  );
}
