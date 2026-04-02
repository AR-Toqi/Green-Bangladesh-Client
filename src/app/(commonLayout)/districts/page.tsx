import { DistrictListClient } from "@/components/districts/DistrictListClient";
import { ContactSection } from "@/components/districts/ContactSection";
import { getAllDistrictsApi } from "@/services/district.service";
import { Trees } from "lucide-react";

export const metadata = {
  title: "District Directory | Green Bangladesh",
  description: "Explore environmental statistics and tree density across all 64 districts of Bangladesh.",
};

export default async function DistrictsPage() {
  const response = await getAllDistrictsApi();
  const districts = response.data || [];

  return (
    <div className="min-h-screen bg-black font-sans box-border overflow-x-hidden">
      {/* ── Header Section ────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-green-500/10 via-transparent to-transparent -z-10 blur-3xl opacity-50" />
        
        <div className="container mx-auto max-w-7xl">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-900/30 border border-green-800 text-green-400 text-xs font-black uppercase tracking-[0.2em]">
              <Trees size={14} />
              Environmental Directory
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-zinc-50 tracking-tight leading-[0.9]">
              All <span className="text-green-600">64</span> <br />
              Districts
            </h1>
            <p className="text-lg md:text-xl text-zinc-400 max-w-2xl leading-relaxed">
              Detailed statistics and health reports for every corner of Bangladesh. 
              Search for your home district to see its current environmental score.
            </p>
          </div>
        </div>
      </section>

      {/* ── Main Content ─────────────────────────────────────────── */}
      <main className="container mx-auto max-w-7xl px-6 pb-32">
        <DistrictListClient districts={districts} />
      </main>

      {/* ── Contact Section ── */}
      <ContactSection />
    </div>
  );
}
