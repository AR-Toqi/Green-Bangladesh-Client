"use client";

import { motion } from "framer-motion";
import { TreePine, Home, ArrowRight, Award, MapPin } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* ── Background Glow ── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-xl w-full text-center space-y-10"
      >
        {/* ── 404 Icon ── */}
        <div className="relative inline-block">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 10 }}
            className="h-32 w-32 md:h-40 md:w-40 rounded-[3rem] bg-zinc-950 border border-zinc-800 flex items-center justify-center text-green-500 shadow-2xl relative z-10"
          >
            <TreePine size={64} className="md:size-80" />
          </motion.div>
          <div className="absolute -top-4 -right-4 h-12 w-12 rounded-2xl bg-orange-500 text-white flex items-center justify-center font-black text-xl shadow-lg border-2 border-black rotate-12 z-20">
            ?
          </div>
        </div>

        {/* ── Content ── */}
        <div className="space-y-4">
          <h1 className="text-6xl md:text-8xl font-black text-zinc-50 tracking-tighter leading-none">
            Lost in <br />
            <span className="text-green-600">The Woods?</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 font-medium max-w-md mx-auto">
            The path you are looking for has been reforested or never existed. Let's get you back on track.
          </p>
        </div>

        {/* ── Actions ── */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/">
            <Button className="bg-green-600 hover:bg-green-700 text-white rounded-full px-10 py-7 font-black text-base flex items-center gap-3 transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-green-900/20 group">
              <Home size={20} />
              Return Home
              <ArrowRight size={18} className="ml-1 opacity-50 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* ── Shortcut Quick Links ── */}
        <div className="pt-12 border-t border-zinc-900 grid grid-cols-2 gap-4 max-w-sm mx-auto">
          <Link href="/leaderboard" className="flex items-center gap-3 p-4 rounded-2xl bg-zinc-950 border border-zinc-900 hover:border-green-500/30 transition-all text-zinc-400 hover:text-zinc-50 group">
            <Award size={18} className="group-hover:text-green-500" />
            <span className="text-xs font-bold uppercase tracking-widest">Leaderboard</span>
          </Link>
          <Link href="/districts" className="flex items-center gap-3 p-4 rounded-2xl bg-zinc-950 border border-zinc-900 hover:border-green-500/30 transition-all text-zinc-400 hover:text-zinc-50 group">
            <MapPin size={18} className="group-hover:text-green-500" />
            <span className="text-xs font-bold uppercase tracking-widest">Districts</span>
          </Link>
        </div>
      </motion.div>

      {/* ── Footer Branding ── */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[10px] font-bold text-zinc-600 uppercase tracking-[0.3em] whitespace-nowrap">
        Green Bangladesh • 404 Error
      </div>
    </div>
  );
}
