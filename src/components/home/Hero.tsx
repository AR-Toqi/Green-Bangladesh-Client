"use client";

import { useQuery } from "@tanstack/react-query";
import { BangladeshMap } from "@/components/map/BangladeshMap";
import { getAllDistrictsApi } from "@/services/district.service";
import { ZONE_CONFIG, TDistrictResponse } from "@/types/district";
import { motion } from "framer-motion";
import { Trees, MapPin, Wind } from "lucide-react";

interface HeroProps {
  initialData: TDistrictResponse;
}

export const Hero = ({ initialData }: HeroProps) => {
  const { data: response } = useQuery({
    queryKey: ["districts"],
    queryFn: getAllDistrictsApi,
    initialData,
  });

  const districts = response?.data || [];
  const totalTrees = districts.reduce((acc, d) => acc + d.estimatedTrees, 0);

  return (
    <div className="min-h-screen bg-black font-sans selection:bg-green-900/30">
      <main className="container mx-auto px-6 py-12 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* ── Left Column: Content ────────────────────────────────── */}
          <div className="space-y-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-900/20 border border-green-800 text-green-400 text-xs font-bold uppercase tracking-widest leading-none">
                <Wind size={12} />
                Live Environmental Status
              </div>
              <h1 className="text-5xl lg:text-7xl font-black text-zinc-50 tracking-tighter leading-[1.1]">
                Greening <span className="text-green-600">Bangladesh</span>
              </h1>
              <p className="text-lg text-zinc-400 max-w-lg leading-relaxed">
                Visualizing the environmental tree density across 64 districts. 
                Our interactive map helps identify zones that need immediate reforestation efforts.
              </p>
            </motion.div>

            {/* ── Stats Grid ─────────────────────────────────────────── */}
            <div className="grid grid-cols-2 gap-4 max-w-md">
              <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 transition-all hover:bg-zinc-800/50">
                <div className="flex items-center gap-3 text-zinc-500 mb-2">
                  <Trees size={18} className="text-green-600" />
                  <span className="text-sm font-medium">Total Trees</span>
                </div>
                <div className="text-2xl font-bold text-zinc-100 uppercase">
                  {(totalTrees / 1000000000).toFixed(2)}B
                </div>
              </div>
              <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 transition-all hover:bg-zinc-800/50">
                <div className="flex items-center gap-3 text-zinc-500 mb-2">
                  <MapPin size={18} className="text-blue-600" />
                  <span className="text-sm font-medium">Districts</span>
                </div>
                <div className="text-2xl font-bold text-zinc-100 uppercase">
                  {districts.length || 64}
                </div>
              </div>
            </div>

            {/* ── Legend ──────────────────────────────────────────────── */}
            <div className="space-y-4 pt-6 border-t border-zinc-900">
              <h4 className="text-sm font-bold text-zinc-400 uppercase tracking-[0.2em] mb-4">Zone Legend</h4>
              <div className="flex flex-col gap-3">
                {Object.entries(ZONE_CONFIG).map(([key, config]) => (
                  <div key={key} className="flex items-start gap-4 group">
                    <div 
                      className="mt-1 h-3 w-3 rounded-full shrink-0 group-hover:scale-125 transition-transform" 
                      style={{ backgroundColor: config.color }} 
                    />
                    <div>
                      <div className="text-sm font-bold text-zinc-200">{config.label}</div>
                      <div className="text-xs text-zinc-500 italic">{config.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right Column: Map ───────────────────────────────────── */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex items-center justify-center p-4 lg:p-10 bg-zinc-900/20 rounded-[3rem] border border-zinc-800 shadow-inner overflow-hidden min-h-[600px]"
          >
            <BangladeshMap districtsData={districts} className="max-w-[500px]" />
          </motion.div>

        </div>
      </main>
    </div>
  );
};
