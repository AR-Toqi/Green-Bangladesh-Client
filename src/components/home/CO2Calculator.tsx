"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Cloud, Car, Smartphone, Zap, TreePine, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface CO2CalculatorProps {
  token?: string;
}

export const CO2Calculator = ({ token }: CO2CalculatorProps) => {
  const router = useRouter();
  const [treeCount, setTreeCount] = useState<number>(10);
  const [impact, setImpact] = useState({
    co2: 0,
    carKm: 0,
    phones: 0,
  });

  // Constants for calculation
  const CO2_PER_TREE_KG = 21.8;
  const KM_PER_KG_CO2 = 4.1; // km driven by avg car per kg of CO2
  const PHONES_PER_KG_CO2 = 120; // smartphone charges per kg of CO2

  useEffect(() => {
    const co2 = treeCount * CO2_PER_TREE_KG;
    setImpact({
      co2: Number(co2.toFixed(1)),
      carKm: Number((co2 * KM_PER_KG_CO2).toFixed(0)),
      phones: Number((co2 * PHONES_PER_KG_CO2).toFixed(0)),
    });
  }, [treeCount]);

  return (
    <section className="py-24 px-6 bg-black relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-green-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="text-center space-y-4 mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-green-500 text-[10px] font-black uppercase tracking-[0.2em]"
          >
            <Zap size={12} />
            Impact Calculator
          </motion.div>
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">
            Measure Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Green Power</span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto font-medium">
            See how your plantation efforts translate into real-world environmental benefits.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Input Side */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-10 rounded-[3rem] bg-zinc-950 border border-zinc-900 shadow-2xl relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[3rem]" />
              
              <label className="block text-xs font-black text-zinc-500 uppercase tracking-widest mb-6">
                How many trees will you plant?
              </label>
              
              <div className="space-y-8">
                <input
                  type="number"
                  value={treeCount}
                  onChange={(e) => setTreeCount(Math.max(1, parseInt(e.target.value) || 0))}
                  className="w-full bg-transparent text-8xl font-black text-white outline-none border-b-2 border-zinc-900 focus:border-green-500 transition-colors pb-4"
                />
                
                <input
                  type="range"
                  min="1"
                  max="1000"
                  value={treeCount}
                  onChange={(e) => setTreeCount(parseInt(e.target.value))}
                  className="w-full h-2 bg-zinc-900 rounded-lg appearance-none cursor-pointer accent-green-500"
                />
                
                <div className="flex justify-between text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
                  <span>1 Tree</span>
                  <span>1,000 Trees</span>
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (!token) {
                  toast.error("Please login first to see your impact!");
                  return;
                }
                router.push("/profile");
              }}
              className="w-full py-5 rounded-3xl bg-green-600 hover:bg-green-500 text-white font-black uppercase tracking-widest text-xs shadow-xl shadow-green-900/20 flex items-center justify-center gap-2 group transition-all"
            >
              See Your Impact
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <div className="flex items-center gap-4 p-6 rounded-3xl bg-zinc-900/30 border border-zinc-800/50">
              <div className="h-10 w-10 rounded-xl bg-green-500/10 text-green-500 flex items-center justify-center">
                <TreePine size={20} />
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed font-medium">
                Every tree you plant absorbs CO2 and provides oxygen for <span className="text-white">2 people per day</span>.
              </p>
            </div>
          </div>

          {/* Results Side */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* CO2 Card */}
            <div className="md:col-span-2 p-10 rounded-[3rem] bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 flex flex-col justify-between group overflow-hidden relative">
               <div className="absolute -right-10 -top-10 text-zinc-800/20 group-hover:text-green-500/10 transition-colors duration-700 rotate-12">
                <Cloud size={200} />
              </div>
              
              <div className="relative z-10">
                <div className="h-14 w-14 rounded-2xl bg-green-500/10 text-green-500 flex items-center justify-center mb-12">
                  <Cloud size={28} />
                </div>
                <h4 className="text-xs font-black text-zinc-500 uppercase tracking-[0.2em] mb-2">Annual CO2 Offset</h4>
                <div className="flex items-baseline gap-2">
                  <span className="text-7xl font-black text-white tracking-tighter">{impact.co2.toLocaleString()}</span>
                  <span className="text-2xl font-bold text-zinc-600">KG</span>
                </div>
              </div>
            </div>

            {/* Equivalents */}
            <div className="p-8 rounded-[2.5rem] bg-zinc-950 border border-zinc-900 hover:border-blue-500/30 transition-all duration-500">
              <div className="h-12 w-12 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-6">
                <Car size={24} />
              </div>
              <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Car Mileage</h4>
              <p className="text-3xl font-black text-white">{impact.carKm.toLocaleString()} <span className="text-sm font-bold text-zinc-600">KM</span></p>
              <p className="text-[10px] text-zinc-600 mt-2 italic">Equivalent driving distance</p>
            </div>

            <div className="p-8 rounded-[2.5rem] bg-zinc-950 border border-zinc-900 hover:border-purple-500/30 transition-all duration-500">
              <div className="h-12 w-12 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center mb-6">
                <Smartphone size={24} />
              </div>
              <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Phone Charges</h4>
              <p className="text-3xl font-black text-white">{impact.phones.toLocaleString()} <span className="text-sm font-bold text-zinc-600">QTY</span></p>
              <p className="text-[10px] text-zinc-600 mt-2 italic">Full smartphone charges</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
