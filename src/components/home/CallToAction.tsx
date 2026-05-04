"use client";

import { motion } from "framer-motion";
import { TreePine, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const CallToAction = () => {
  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-[3rem] overflow-hidden bg-zinc-900 px-8 py-16 lg:p-24 text-center"
        >
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src="/images/planting.png" 
              alt="Background" 
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            <div className="absolute inset-0 bg-green-600/40 mix-blend-multiply" />
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl -ml-32 -mb-32" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-4xl lg:text-6xl font-black text-white tracking-tighter mb-8 leading-tight">
              Ready to grow a <br /> greener Bangladesh?
            </h2>
            <p className="text-green-50 text-lg mb-12 opacity-90">
              Join thousands of volunteers across the country. Your contribution today 
              is the shade of tomorrow. Start your first plantation report now.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/report-plantation">
                <Button className="bg-white hover:bg-zinc-100 text-green-700 rounded-full px-10 py-8 font-bold text-lg flex items-center gap-3 transition-all hover:scale-105 shadow-xl">
                  <TreePine size={24} />
                  Get Started
                </Button>
              </Link>
              <Link href="/leaderboard">
                <Button variant="ghost" className="text-white hover:bg-white/10 rounded-full px-8 py-8 font-bold text-lg">
                  View Leaderboard
                  <ArrowRight size={20} className="ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
