import { getDistrictByIdApi } from "@/services/district.service";
import { ZONE_CONFIG } from "@/types/district";
import { MapPin, Trees, Ruler, Activity, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";

interface DistrictDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: DistrictDetailPageProps) {
  const { id } = await params;
  const safeString = (val: any) => (typeof val === "object" ? val?.name : val) || "";
  try {
    const response = await getDistrictByIdApi(id);
    const district = response.data;
    const name = safeString(district.name);
    return {
      title: `${name} | Environmental Details - Green Bangladesh`,
      description: `Environmental statistics for ${name} district, ${safeString(district.division)}. Current score: ${district.score}/100.`,
    };
  } catch {
    return { title: "District Not Found" };
  }
}

export default async function DistrictDetailPage({ params }: DistrictDetailPageProps) {
  const { id } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  const href = token ? "/report-plantation" : "/login?redirect=/report-plantation";
  const safeString = (val: any) => (typeof val === "object" ? val?.name : val) || "";
  
  let district;
  try {
    const response = await getDistrictByIdApi(id);
    district = response.data;
  } catch (error) {
    return notFound();
  }

  if (!district) {
    return notFound();
  }

  const zoneStyle = ZONE_CONFIG[district.zone];

  return (
    <div className="min-h-screen bg-black font-sans selection:bg-green-900/30">
      {/* ── Navbar Spacer & Back Button ────────────────────────── */}
      <div className="pt-32 pb-8 px-6 container mx-auto max-w-7xl">
        <Link
          href="/districts"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-zinc-50 transition-colors font-bold uppercase tracking-widest text-[10px]"
        >
          <ArrowLeft size={14} />
          Back to Directory
        </Link>
      </div>

      <main className="container mx-auto max-w-7xl px-6 pb-32 space-y-16">

        {/* ── District Hero ────────────────────────────────────────── */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-bold uppercase tracking-widest">
              <MapPin size={12} />
              {safeString(district.division)} Division
            </div>
            <h1 className="text-7xl md:text-9xl font-black text-zinc-50 tracking-tighter leading-[0.8]">
              {safeString(district.name)}
            </h1>
            <p className="text-xl text-zinc-400 max-w-xl font-medium">
              Located in the {safeString(district.division)} division, {safeString(district.name)} covers an area of {district.area.toLocaleString()} km² and holds a critical place in our environmental ecosystem.
            </p>
          </div>

          <div className="flex flex-col items-start lg:items-end gap-4">
            <div
              className="text-[12rem] md:text-[18rem] font-black leading-none tracking-tighter opacity-10 absolute -right-20 bottom-0 select-none -z-10"
              style={{ color: zoneStyle.color }}
            >
              {district.score.toFixed(0)}
            </div>
            <div className="p-8 rounded-[3rem] bg-zinc-900 border border-zinc-800 w-full max-w-sm space-y-6 shadow-xl">
              <div className="flex justify-between items-center">
                <span className="text-zinc-400 text-xs font-bold uppercase tracking-widest">Environment Score</span>
                <div
                  className="h-3 w-3 rounded-full shadow-[0_0_15px_rgba(0,0,0,0.1)]"
                  style={{ backgroundColor: zoneStyle.color, boxShadow: `0 0 20px ${zoneStyle.color}` }}
                />
              </div>
              <div className="space-y-1">
                <div className="text-6xl font-black text-zinc-50 tracking-tight">
                  {district.score.toFixed(1)}<span className="text-lg opacity-30 text-zinc-400">/100</span>
                </div>
                <div className="text-sm font-bold uppercase tracking-widest" style={{ color: zoneStyle.color }}>
                  {zoneStyle.label}
                </div>
              </div>
              <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full transition-all duration-1000 ease-out"
                  style={{ width: `${district.score}%`, backgroundColor: zoneStyle.color }}
                />
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed italic">
                "{zoneStyle.description}"
              </p>
            </div>
          </div>
        </section>

        {/* ── Stats Detailed Grid ─────────────────────────────────── */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="group p-10 rounded-[3rem] bg-zinc-950 border border-zinc-900 hover:border-green-500/20 transition-all duration-500 hover:shadow-2xl hover:shadow-green-500/5">
            <div className="h-14 w-14 rounded-2xl bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-green-600 mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform">
              <Trees size={28} />
            </div>
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Estimated Trees</h4>
              <p className="text-4xl font-black text-zinc-100 tracking-tight">
                {(district.estimatedTrees / 1000000).toFixed(2)}M
              </p>
              <p className="text-xs text-zinc-500 italic pt-2 border-t border-zinc-50 dark:border-zinc-900">Total counted vegetation</p>
            </div>
          </div>

          <div className="group p-10 rounded-[3rem] bg-zinc-950 border border-zinc-900 hover:border-blue-500/20 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/5">
            <div className="h-14 w-14 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-500 mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform">
              <Ruler size={28} />
            </div>
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Land Area</h4>
              <p className="text-4xl font-black text-zinc-100 tracking-tight">
                {district.area.toLocaleString()} <span className="text-xl opacity-30">km²</span>
              </p>
              <p className="text-xs text-zinc-500 italic pt-2 border-t border-zinc-50 dark:border-zinc-900">Total geographical coverage</p>
            </div>
          </div>

          <div className="group p-10 rounded-[3rem] bg-zinc-950 border border-zinc-900 hover:border-orange-500/20 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/5">
            <div className="h-14 w-14 rounded-2xl bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center text-orange-500 mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform">
              <Activity size={28} />
            </div>
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Tree Density</h4>
              <p className="text-4xl font-black text-zinc-100 tracking-tight">
                {district.treesPerKm2.toLocaleString()} <span className="text-xl opacity-30 text-[10px]">trees/km²</span>
              </p>
              <p className="text-xs text-zinc-500 italic pt-2 border-t border-zinc-50 dark:border-zinc-900">Trees per square kilometer</p>
            </div>
          </div>
        </section>

        {/* ── Call to Action ───────────────────────────────────────── */}
        <section className="p-12 rounded-[4rem] bg-gradient-to-br from-green-600 to-green-800 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-green-500/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[100px] rounded-full -mr-48 -mt-48" />
          <div className="space-y-4 relative z-10">
            <h2 className="text-4xl font-black tracking-tight leading-none">Ready to improve the score of {safeString(district.name)}?</h2>
            <p className="text-green-100 font-medium max-w-lg">
              Start your plantation journey today and contribute to making {safeString(district.name)} a Green Zone again.
            </p>
          </div>
          <Link
            href={href}
            className="px-10 py-5 bg-white text-green-700 font-black uppercase tracking-widest text-xs rounded-full hover:scale-105 active:scale-95 transition-all shadow-xl shadow-black/10 relative z-10"
          >
            Plant a Tree
          </Link>
        </section>

      </main>
    </div>
  );
}
