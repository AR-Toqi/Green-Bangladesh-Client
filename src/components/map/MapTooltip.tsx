"use client";

import { motion } from "framer-motion";
import { TDistrict, TDistrictGeoProperties, ZONE_CONFIG } from "@/types/district";

interface MapTooltipProps {
  district: TDistrict | null;
  properties: TDistrictGeoProperties | null;
  x: number;
  y: number;
}

export const MapTooltip = ({ district, properties, x, y }: MapTooltipProps) => {
  if (!properties) return null;

  const districtData = district || {
    name: properties.ADM2_EN,
    zone: "RED",
    score: 0,
    area: 0,
    estimatedTrees: 0,
    treesPerKm2: 0,
  };

  const config = ZONE_CONFIG[districtData.zone as keyof typeof ZONE_CONFIG] || ZONE_CONFIG.RED;

  const safeString = (val: any) => (typeof val === "object" ? val?.name : val) || "";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      style={{
        position: "fixed",
        left: x + 15,
        top: y + 15,
        pointerEvents: "none",
        zIndex: 50,
      }}
      className="rounded-lg border border-zinc-200 bg-white p-3 shadow-xl dark:border-zinc-800 dark:bg-zinc-950 min-w-[200px]"
    >
      <div className="flex items-center justify-between gap-4 mb-2">
        <h3 className="font-bold text-zinc-900 dark:text-zinc-50 uppercase tracking-wider text-sm">
          {safeString(districtData.name)}
        </h3>
        <span
          className="h-2.5 w-2.5 rounded-full ring-4 ring-white dark:ring-zinc-950"
          style={{ backgroundColor: config.color }}
        />
      </div>

      <div className="space-y-1.5 text-xs">
        <div className="flex justify-between">
          <span className="text-zinc-500">Zone</span>
          <span className="font-medium" style={{ color: config.color }}>
            {config.label}
          </span>
        </div>
        <div className="flex justify-between pt-1 border-t border-zinc-100 dark:border-zinc-900">
          <span className="text-zinc-500">Density</span>
          <span className="font-semibold text-zinc-800 dark:text-zinc-200">
            {districtData.treesPerKm2.toLocaleString()} <span className="text-[10px] font-normal opacity-70">trees/km²</span>
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-zinc-500">Total Trees</span>
          <span className="text-zinc-800 dark:text-zinc-200 font-medium">
            {(districtData.estimatedTrees / 1000000).toFixed(1)}M
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-zinc-500">Area</span>
          <span className="text-zinc-800 dark:text-zinc-200 font-medium">
            {districtData.area.toLocaleString()} km²
          </span>
        </div>
        
        <div className="mt-2 h-1.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${districtData.score}%` }}
            className="h-full"
            style={{ backgroundColor: config.color }}
          />
        </div>
        <p className="text-[10px] text-zinc-400 italic">
          Environmental Score: {districtData.score?.toFixed(1)}/100
        </p>
      </div>
    </motion.div>
  );
};
