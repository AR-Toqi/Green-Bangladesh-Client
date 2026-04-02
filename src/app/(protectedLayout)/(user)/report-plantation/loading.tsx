import { Trees } from "lucide-react";

export default function ReportPlantationLoading() {
  return (
    <div className="min-h-screen bg-black font-sans box-border overflow-x-hidden">
      {/* ── Header Skeleton ────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-green-500/10 via-transparent to-transparent -z-10 blur-3xl opacity-50" />
        
        <div className="container mx-auto max-w-7xl">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-900/20 border border-green-800/30 text-green-500/50 text-xs font-black uppercase tracking-[0.2em] animate-pulse">
              <Trees size={14} />
              Loading Dashboard...
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

      {/* ── Form Skeleton ─────────────────────────────────────────── */}
      <main className="container mx-auto max-w-7xl px-6 pb-32">
         <div className="w-full max-w-2xl mx-auto p-12 rounded-[2.5rem] bg-zinc-900 shadow-2xl animate-pulse space-y-10">
            <div className="mx-auto w-16 h-16 rounded-3xl bg-zinc-800" />
            <div className="space-y-4">
               <div className="h-10 w-1/3 mx-auto bg-zinc-800 rounded-xl" />
               <div className="h-4 w-1/2 mx-auto bg-zinc-800 rounded-full" />
            </div>
            <div className="grid grid-cols-2 gap-8">
               <div className="h-14 bg-zinc-800 rounded-2xl" />
               <div className="h-14 bg-zinc-800 rounded-2xl" />
            </div>
            <div className="h-14 bg-zinc-800 rounded-2xl" />
            <div className="h-32 bg-zinc-800 rounded-2xl" />
            <div className="h-16 bg-zinc-800 rounded-2xl" />
         </div>
      </main>
    </div>
  );
}
