import { getAllDistrictsApi } from "@/services/district.service";
import { PlantationForm } from "@/components/plantation/PlantationForm";
import { Trees } from "lucide-react";
import { getAccessToken } from "@/lib/cookieUtils";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Report Plantation | Green Bangladesh",
  description: "Submit your tree plantation report and contribute to a greener Bangladesh.",
};

export default async function ReportPlantationPage() {
  const token = await getAccessToken();

  if (!token) {
    redirect("/login");
  }

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
              Contributor Dashboard
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-zinc-50 tracking-tight leading-[0.9]">
              Report <br />
              <span className="text-green-600">Plantation</span>
            </h1>
            <p className="text-lg md:text-xl text-zinc-400 max-w-2xl leading-relaxed">
              Your contribution matters. Fill out the form below to register your newly planted trees 
              and help your district climb the leaderboard.
            </p>
          </div>
        </div>
      </section>

      {/* ── Form Section ─────────────────────────────────────────── */}
      <main className="container mx-auto max-w-7xl px-6 pb-32">
        <PlantationForm districts={districts} />
      </main>
    </div>
  );
}
