import { Loader2 } from "lucide-react";

export default function ProfileLoading() {
  return (
    <div className="min-h-screen bg-black text-zinc-100 pb-32">
      {/* ── Header Spacer ── */}
      <div className="pt-32 pb-8 px-6 container mx-auto max-w-5xl">
        <div className="h-16 md:h-20 w-64 bg-zinc-900 rounded-2xl animate-pulse mb-4"></div>
        <div className="h-6 w-3/4 max-w-2xl bg-zinc-900/50 rounded-lg animate-pulse"></div>
      </div>

      <main className="container mx-auto max-w-5xl px-6 space-y-12">
        {/* ── Main Profile Card Skeleton ── */}
        <section className="relative overflow-hidden rounded-[3rem] bg-zinc-950 border border-zinc-900 shadow-2xl p-8 md:p-12">
          <div className="flex flex-col md:flex-row gap-10 items-start md:items-center relative z-10">
            {/* Avatar Skeleton */}
            <div className="h-32 w-32 md:h-40 md:w-40 rounded-[2rem] bg-zinc-900 flex items-center justify-center animate-pulse shrink-0">
              <Loader2 className="animate-spin text-zinc-700" size={32} />
            </div>

            {/* User Info Skeleton */}
            <div className="flex-1 space-y-6 w-full">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-3 w-full max-w-sm">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-48 bg-zinc-900 rounded-xl animate-pulse"></div>
                    <div className="h-6 w-16 bg-zinc-900 rounded-full animate-pulse"></div>
                  </div>
                  <div className="h-5 w-56 bg-zinc-900/50 rounded-lg animate-pulse"></div>
                </div>

                <div className="h-12 w-36 bg-zinc-900 rounded-full animate-pulse"></div>
              </div>

              <div className="space-y-2">
                <div className="h-4 w-full max-w-2xl bg-zinc-900/50 rounded-md animate-pulse"></div>
                <div className="h-4 w-3/4 max-w-xl bg-zinc-900/50 rounded-md animate-pulse"></div>
              </div>

              <div className="pt-4 flex flex-col md:flex-row gap-6 mt-4 border-t border-zinc-900">
                <div className="h-5 w-32 bg-zinc-900/50 rounded-lg animate-pulse"></div>
                <div className="h-5 w-40 bg-zinc-900/50 rounded-lg animate-pulse"></div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Impact Section Skeleton ── */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-8 w-40 bg-zinc-900 rounded-xl animate-pulse"></div>
            <div className="h-px bg-zinc-900 flex-1" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="p-8 rounded-[2rem] bg-zinc-950 border border-zinc-900">
                <div className="h-12 w-12 rounded-xl bg-zinc-900 mb-6 animate-pulse"></div>
                <div className="h-4 w-28 bg-zinc-900 rounded-md mb-3 animate-pulse"></div>
                <div className="h-10 w-20 bg-zinc-900 rounded-xl mb-3 animate-pulse"></div>
                <div className="h-3 w-32 bg-zinc-900/50 rounded-sm animate-pulse"></div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
