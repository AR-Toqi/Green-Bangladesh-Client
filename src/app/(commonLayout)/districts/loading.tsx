import { Trees } from "lucide-react";

export default function DistrictsLoading() {
    return (
        <div className="min-h-screen bg-black font-sans box-border overflow-x-hidden">
            {/* ── Header Skeleton ────────────────────────────────────────── */}
            <section className="relative pt-32 pb-20 px-6 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-green-500/10 via-transparent to-transparent -z-10 blur-3xl opacity-50" />

                <div className="container mx-auto max-w-7xl">
                    <div className="max-w-3xl space-y-6">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-900/20 border border-green-800/30 text-green-500/50 text-xs font-black uppercase tracking-[0.2em] animate-pulse">
                            <Trees size={14} />
                            Loading Directory...
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
            <main className="container mx-auto max-w-7xl px-6 pb-32">
                <div className="space-y-12">
                    {/* ── Filters Skeleton ──────────────────────────────────────── */}
                    <div className="flex flex-col md:flex-row gap-6 p-6 rounded-3xl bg-zinc-950/70 border border-zinc-900 shadow-2xl animate-pulse">
                        <div className="relative flex-1 h-14 bg-zinc-900 rounded-2xl" />
                        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
                            <div className="h-10 w-32 bg-zinc-900 rounded-xl" />
                            <div className="h-10 w-24 bg-zinc-900 rounded-xl" />
                            <div className="h-10 w-24 bg-zinc-900 rounded-xl" />
                            <div className="h-10 w-24 bg-zinc-900 rounded-xl" />
                        </div>
                    </div>

                    {/* ── Grid Skeleton ─────────────────────────────────────────── */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                        {[...Array(6)].map((_, i) => (
                            <div
                                key={i}
                                className="p-8 rounded-[2.5rem] bg-zinc-900/50 border border-zinc-800/50 space-y-6 animate-pulse"
                            >
                                <div className="flex justify-between items-start">
                                    <div className="h-6 w-24 bg-zinc-800 rounded-full" />
                                    <div className="h-4 w-4 rounded-full bg-zinc-800" />
                                </div>

                                <div className="h-10 w-3/4 bg-zinc-800 rounded-xl" />

                                <div className="grid grid-cols-2 gap-6 pt-4">
                                    <div className="space-y-2">
                                        <div className="h-3 w-12 bg-zinc-800 rounded-full" />
                                        <div className="h-6 w-16 bg-zinc-800 rounded-xl" />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="h-3 w-12 bg-zinc-800 rounded-full" />
                                        <div className="h-6 w-16 bg-zinc-800 rounded-xl" />
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-zinc-800/50 flex items-center justify-between">
                                    <div className="h-4 w-32 bg-zinc-800 rounded-full" />
                                    <div className="h-8 w-8 rounded-full bg-zinc-800" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
