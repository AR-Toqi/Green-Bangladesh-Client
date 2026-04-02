import { Award, Trees } from "lucide-react";

export default function LeaderboardLoading() {
  const skeletonRows = Array.from({ length: 8 });

  return (
    <div className="min-h-screen bg-black font-sans box-border overflow-x-hidden">
      {/* ── Header Skeleton ────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-green-500/10 via-transparent to-transparent -z-10 blur-3xl opacity-50" />
        
        <div className="container mx-auto max-w-7xl">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-900/20 border border-green-800/30 text-green-500/50 text-xs font-black uppercase tracking-[0.2em] animate-pulse">
              <Award size={14} />
              Loading Champions...
            </div>
            <div className="space-y-4">
              <div className="h-16 md:h-20 w-3/4 bg-zinc-900 rounded-3xl animate-pulse" />
              <div className="h-16 md:h-20 w-1/2 bg-zinc-900 rounded-3xl animate-pulse" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-full bg-zinc-900/50 rounded-full animate-pulse" />
              <div className="h-4 w-2/3 bg-zinc-900/50 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Main Content Skeleton ───────────────────────────────────── */}
      <main className="container mx-auto max-w-7xl px-6 pb-32 space-y-6">
        {/* Header Card Skeleton */}
        <div className="p-8 rounded-[2.5rem] bg-zinc-950 shadow-2xl animate-pulse flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 w-full md:w-2/3">
             <div className="h-8 w-1/2 bg-zinc-900 rounded-xl" />
             <div className="h-4 w-3/4 bg-zinc-900 rounded-full" />
          </div>
          <div className="h-14 w-32 bg-zinc-900 rounded-2xl" />
        </div>

        {/* Row Skeletons */}
        <div className="grid gap-4">
          {skeletonRows.map((_, i) => (
            <div 
              key={i} 
              className="p-6 rounded-3xl bg-zinc-950/50 border border-zinc-900/50 flex flex-col md:flex-row items-center gap-8 animate-pulse"
            >
               <div className="w-10 h-10 rounded-xl bg-zinc-900" />
               <div className="flex-grow space-y-4 w-full">
                  <div className="flex justify-between items-center">
                     <div className="h-6 w-1/4 bg-zinc-900 rounded-lg" />
                     <div className="h-8 w-24 bg-zinc-900 rounded-xl" />
                  </div>
                  <div className="h-1.5 w-full bg-zinc-900 rounded-full" />
               </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
