"use client";

import { motion } from "framer-motion";
import { Search, Shovel, BarChart3, ArrowRight } from "lucide-react";

const steps = [
  {
    title: "1. Explore the Map",
    description: "Browse our interactive Bangladesh map to identify districts with low tree density (Red zones) that need immediate attention.",
    icon: Search,
  },
  {
    title: "2. Plant a Sapling",
    description: "Take action by planting a tree in your local area. Every tree, whether in a backyard or a public park, makes a difference.",
    icon: Shovel,
  },
  {
    title: "3. Report & Track",
    description: "Login to report your plantation. Watch your district climb the leaderboard and track our collective impact in real-time.",
    icon: BarChart3,
  },
];

export const HowItWorks = () => {
  return (
    <section className="py-24 bg-zinc-950 border-y border-zinc-900">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative order-2 lg:order-1"
          >
            <div className="absolute -inset-4 bg-green-600/10 rounded-full blur-3xl" />
            <img 
              src="/images/planting.png" 
              alt="Planting a Tree" 
              className="relative rounded-[3rem] border border-zinc-800 shadow-2xl w-full max-w-lg mx-auto grayscale hover:grayscale-0 transition-all duration-700"
            />
          </motion.div>

          <div className="max-w-2xl order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-sm font-bold text-green-500 uppercase tracking-[0.2em] mb-4">Process</h2>
              <h3 className="text-5xl font-black text-white tracking-tight mb-6">How It Works</h3>
              <p className="text-zinc-400 text-lg leading-relaxed">
                Join our data-driven mission to reforest Bangladesh in three simple steps. 
                We combine community action with real-time data visualization.
              </p>
            </motion.div>
          </div>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-20 h-20 rounded-full bg-zinc-900 border-4 border-zinc-950 flex items-center justify-center mb-8 shadow-[0_0_20px_rgba(0,0,0,0.5)] group-hover:bg-green-600 transition-colors duration-500">
                  <step.icon size={32} className="text-green-500 group-hover:text-white transition-colors duration-500" />
                </div>
                <h4 className="text-xl font-bold text-white mb-4 group-hover:text-green-500 transition-colors">{step.title}</h4>
                <p className="text-zinc-500 leading-relaxed max-w-xs">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
