"use client";

import { motion } from "framer-motion";
import { Leaf, Wind, CloudRain, ShieldCheck, Heart, Sparkles } from "lucide-react";

const benefits = [
  {
    title: "Carbon Sequestration",
    description: "A single mature tree can absorb over 48 pounds of carbon dioxide per year, making them our best natural ally against global warming.",
    icon: Wind,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
  },
  {
    title: "Air Purification",
    description: "Trees act as giant filters, absorbing pollutant gases and filtering particulates like dust and smoke from the air.",
    icon: Sparkles,
    color: "text-green-400",
    bg: "bg-green-400/10",
  },
  {
    title: "Water Management",
    description: "Tree roots help prevent soil erosion and manage storm water, reducing the risk of flooding in urban and rural areas.",
    icon: CloudRain,
    color: "text-cyan-400",
    bg: "bg-cyan-400/10",
  },
  {
    title: "Biodiversity Hubs",
    description: "A single tree can provide a home for hundreds of species of insects, fungi, moss, mammals, and plants.",
    icon: Heart,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
  },
];

export const ImportanceOfPlantation = () => {
  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-sm font-bold text-green-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
              <Leaf size={16} />
              Environmental Impact
            </h2>
            <h3 className="text-4xl lg:text-6xl font-black text-white tracking-tight mb-6">
              Why Every Tree <span className="text-green-600">Matters</span>
            </h3>
            <p className="text-zinc-400 text-lg leading-relaxed mb-8">
              Tree plantation isn't just about planting a sapling; it's about building a sustainable future. 
              Each tree contributes to a complex ecosystem that supports life on Earth.
            </p>
            <div className="flex items-center gap-6">
              <div className="flex flex-col">
                <span className="text-3xl font-black text-white">20%</span>
                <span className="text-xs text-zinc-500 uppercase tracking-wider">More Oxygen</span>
              </div>
              <div className="w-px h-10 bg-zinc-800" />
              <div className="flex flex-col">
                <span className="text-3xl font-black text-white">15°C</span>
                <span className="text-xs text-zinc-500 uppercase tracking-wider">Cooler Cities</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-green-600/20 rounded-[3rem] blur-2xl" />
            <img 
              src="/images/tree.png" 
              alt="Majestic Tree" 
              className="relative rounded-[2.5rem] border border-zinc-800 shadow-2xl w-full object-cover aspect-[4/3]"
            />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="p-8 rounded-[2rem] bg-zinc-900/50 border border-zinc-800 hover:border-green-500/30 transition-all group"
            >
              <div className={`w-14 h-14 rounded-2xl ${benefit.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <benefit.icon className={benefit.color} size={28} />
              </div>
              <h4 className="text-xl font-bold text-white mb-3">{benefit.title}</h4>
              <p className="text-zinc-500 text-sm leading-relaxed group-hover:text-zinc-400 transition-colors">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
