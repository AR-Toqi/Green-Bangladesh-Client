import { getLeaderboardApi } from "@/services/leaderboard.service";
import { LeaderboardTable } from "@/components/leaderboard/LeaderboardTable";
import { Award, Trees } from "lucide-react";

export const metadata = {
  title: "Leaderboard | Green Bangladesh",
  description: "Global district tree plantation rankings. See which districts are leading the green movement.",
};

export default async function LeaderboardPage() {
  const response = await getLeaderboardApi();
  const leaderboardData = response.data || [];

  return (
    <div className="min-h-screen bg-black font-sans box-border overflow-x-hidden">
      {/* ── Header Section ────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-green-500/10 via-transparent to-transparent -z-10 blur-3xl opacity-50" />
        
        <div className="container mx-auto max-w-7xl">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-900/30 border border-green-800 text-green-400 text-xs font-black uppercase tracking-[0.2em]">
              <Award size={14} />
              National Leaderboard
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-zinc-50 tracking-tight leading-[0.9]">
              Green <br />
              <span className="text-green-600">Champions</span>
            </h1>
            <p className="text-lg md:text-xl text-zinc-400 max-w-2xl leading-relaxed">
              Celebrating districts that are leading Bangladesh towards a greener future.
              Every report contributes towards your home district's environmental legacy.
            </p>
          </div>
        </div>
      </section>

      {/* ── Main Content ─────────────────────────────────────────── */}
      <main className="container mx-auto max-w-7xl px-6 pb-32">
        {leaderboardData.length > 0 ? (
          <LeaderboardTable data={leaderboardData} />
        ) : (
          <div className="text-center py-24 space-y-4">
             <div className="inline-flex p-6 rounded-full bg-zinc-900 text-zinc-400 animate-bounce">
                <Trees size={40} />
             </div>
             <h3 className="text-xl font-bold text-zinc-100">No plantation records found yet.</h3>
             <p className="text-zinc-500">Be the first to plant a tree and start your district's green journey!</p>
          </div>
        )}
      </main>
    </div>
  );
}
