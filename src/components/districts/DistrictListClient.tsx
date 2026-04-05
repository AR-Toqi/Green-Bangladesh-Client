"use client";

import { useMemo, useState } from "react";
import { TDistrict, ZONE_CONFIG, TZone } from "@/types/district";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Trees, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";

interface DistrictListClientProps {
  districts: TDistrict[];
}

export const DistrictListClient = ({ districts }: DistrictListClientProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeZone, setActiveZone] = useState<TZone | "ALL">("ALL");

  const safeString = (val: any) => (typeof val === "object" ? val?.name : val) || "";

  const filteredDistricts = useMemo(() => {
    return districts.filter((d) => {
      const name = safeString(d.name).toLowerCase();
      const division = safeString(d.division).toLowerCase();
      const search = searchTerm.toLowerCase();
      
      const matchesSearch = name.includes(search) || division.includes(search);
      const matchesZone = activeZone === "ALL" || d.zone === activeZone;
      return matchesSearch && matchesZone;
    });
  }, [districts, searchTerm, activeZone]);

  return (
    <div className="space-y-12">
      {/* ── Filters Section ────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row gap-6 sticky top-24 z-30 p-6 rounded-3xl bg-zinc-950/70 backdrop-blur-2xl border border-zinc-800 shadow-2xl shadow-zinc-900/50">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-green-500 transition-colors" size={20} />
          <input
            type="text"
            placeholder="Search districts or divisions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-zinc-900 border-none outline-none ring-2 ring-transparent focus:ring-green-500/50 transition-all text-zinc-100 font-medium"
          />
        </div>
        
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
          <Filter className="text-zinc-400 mr-2 flex-shrink-0" size={18} />
          {(["ALL", "GREEN", "ORANGE", "RED"] as const).map((zone) => (
            <button
              key={zone}
              onClick={() => setActiveZone(zone)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                activeZone === zone
                  ? zone === "ALL" 
                    ? "bg-zinc-100 text-black" 
                    : `bg-[var(--zone-color)] text-white shadow-lg`
                  : "bg-zinc-900 text-zinc-500 hover:bg-zinc-800"
              }`}
              style={{ 
                // @ts-ignore
                "--zone-color": zone !== "ALL" ? ZONE_CONFIG[zone].color : "transparent"
              }}
            >
              {zone}
            </button>
          ))}
        </div>
      </div>

      {/* ── Districts Grid ─────────────────────────────────────────── */}
      {filteredDistricts.length === 0 ? (
        <div className="text-center py-24 space-y-4">
          <div className="inline-flex p-6 rounded-full bg-zinc-900 text-zinc-400 animate-bounce">
            <Search size={40} />
          </div>
          <h3 className="text-xl font-bold text-zinc-100">No districts found</h3>
          <p className="text-zinc-500">Try adjusting your search or filters to find what you're looking for.</p>
        </div>
      ) : (
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredDistricts.map((district, index) => (
              <motion.div
                key={district._id || `${district.name}-${index}`}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Link
                  href={`/districts/${district.id || district._id}`}
                  className="group relative block p-8 rounded-[2.5rem] bg-zinc-900 border border-zinc-800 hover:border-green-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-green-500/5 hover:-translate-y-2"
                >
                  {/* Status Indicator */}
                  <div 
                    className="absolute top-8 right-8 h-4 w-4 rounded-full ring-8 ring-zinc-900 shadow-lg"
                    style={{ backgroundColor: ZONE_CONFIG[district.zone].color }}
                  />

                  <div className="space-y-6">
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800 text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-3">
                        <MapPin size={10} />
                        {safeString(district.division)} Division
                      </div>
                      <h2 className="text-3xl font-black text-zinc-50 group-hover:text-green-600 transition-colors">
                        {safeString(district.name)}
                      </h2>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Estimated Trees</p>
                        <p className="text-xl font-bold text-zinc-200">
                          {(district.estimatedTrees / 1000000).toFixed(1)}M
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Env Score</p>
                        <p className="text-xl font-bold tracking-tighter" style={{ color: ZONE_CONFIG[district.zone].color }}>
                          {district.score.toFixed(1)}<span className="text-xs opacity-50 ml-1">/100</span>
                        </p>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-zinc-800 flex items-center justify-between transition-all">
                      <div className="flex items-center gap-2 text-zinc-400 text-xs font-medium">
                        <Trees size={14} className="text-green-600" />
                        <span>{district.treesPerKm2.toLocaleString()} trees/km²</span>
                      </div>
                      <div className="p-2 rounded-full bg-zinc-800 text-zinc-400 group-hover:bg-green-600 group-hover:text-white transition-all scale-90 group-hover:scale-100">
                        <ArrowRight size={16} />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
};
