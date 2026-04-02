"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import * as d3 from "d3-geo";
import { motion, AnimatePresence } from "framer-motion";
import {
  TDistrict,
  TDistrictFeatureCollection,
  TDistrictGeoProperties,
  ZONE_CONFIG,
} from "@/types/district";
import { MapTooltip } from "./MapTooltip";

interface BangladeshMapProps {
  districtsData?: TDistrict[];
  className?: string;
}

const normalizeMapName = (name: string) => {
  const mapping: Record<string, string> = {
    // GeoJSON Name : Backend API Name
    "Barisal": "Barishal",
    "Chittagong": "Chattogram",
    "Brahamanbaria": "Brahmanbaria",
    "Comilla": "Cumilla",
    "Nawabganj": "Chapai Nawabganj",
    "Maulvibazar": "Moulvibazar",
    "Netrakona": "Netrokona",
  };
  return mapping[name] || name;
};

export const BangladeshMap = ({ districtsData, className }: BangladeshMapProps) => {
  const [geoData, setGeoData] = useState<TDistrictFeatureCollection | null>(null);
  const [hoveredDistrict, setHoveredDistrict] = useState<{
    district: TDistrict | null;
    properties: TDistrictGeoProperties;
    x: number;
    y: number;
  } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 600, height: 800 });

  // ── Data Fetching ───────────────────────────────────────────────────
  useEffect(() => {
    fetch("/data/bangladesh-districts.json")
      .then((res) => res.json())
      .then((data) => setGeoData(data))
      .catch((err) => console.error("Failed to load map data:", err));
  }, []);

  // ── Responsive Handling ─────────────────────────────────────────────
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const { width } = containerRef.current.getBoundingClientRect();
        // Maintain aspect ratio for Bangladesh (roughly 3:4)
        setDimensions({
          width,
          height: width * 1.3,
        });
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // ── Map Projection & Paths ──────────────────────────────────────────
  const { paths, projection } = useMemo(() => {
    if (!geoData) return { paths: [], projection: null };

    const projection = d3.geoMercator().fitSize([dimensions.width, dimensions.height], geoData);
    const pathGenerator = d3.geoPath().projection(projection);

    const paths = geoData.features.map((feature) => {
      const normalizedName = normalizeMapName(feature.properties.ADM2_EN);

      // Find matching data from provided props or local cache (fallback to empty)
      const data = districtsData?.find(d => d.name === normalizedName) || null;

      return {
        path: pathGenerator(feature),
        properties: feature.properties,
        data,
        id: feature.id,
      };
    });

    return { paths, projection };
  }, [geoData, dimensions, districtsData]);

  // ── Interaction Handlers ───────────────────────────────────────────
  const handleMouseMove = (e: React.MouseEvent, pathData: {
    path: string | null;
    properties: TDistrictGeoProperties;
    data: TDistrict | null;
    id: string | number | undefined;
  }) => {
    setHoveredDistrict({
      district: pathData.data,
      properties: pathData.properties,
      x: e.clientX,
      y: e.clientY,
    });
  };

  if (!geoData) {
    return (
      <div className="flex h-[600px] w-full items-center justify-center rounded-2xl bg-zinc-50 dark:bg-zinc-900 animate-pulse">
        <p className="text-zinc-400 font-medium">Loading Environmental Map...</p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`relative w-full overflow-visible ${className}`}>
      <svg
        width={dimensions.width}
        height={dimensions.height}
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        className="drop-shadow-2xl overflow-visible"
      >
        <g>
          {paths.map((p, i) => {
            const zone = p.data?.zone || "RED";
            const config = ZONE_CONFIG[zone as keyof typeof ZONE_CONFIG];
            const isHovered = hoveredDistrict?.properties.ADM2_EN === p.properties.ADM2_EN;

            return (
              <motion.path
                key={p.properties.ADM2_EN}
                d={p.path || ""}
                initial={{ opacity: 0, scale: 0.95, strokeWidth: 0.5 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  fill: isHovered ? config.hoverColor : config.color,
                  stroke: isHovered ? "#fff" : "rgba(255,255,255,0.2)",
                  strokeWidth: isHovered ? 2 : 0.5,
                }}
                transition={{
                  duration: 0.4,
                  delay: i * 0.005,
                  fill: { duration: 0.2 }
                }}
                onMouseMove={(e) => handleMouseMove(e, p)}
                onMouseLeave={() => setHoveredDistrict(null)}
                className="cursor-pointer transition-all preserve-3d"
                style={{
                  filter: isHovered ? "brightness(1.1)" : "none",
                }}
              />
            );
          })}
        </g>
      </svg>

      <AnimatePresence>
        {hoveredDistrict && (
          <MapTooltip
            district={hoveredDistrict.district}
            properties={hoveredDistrict.properties}
            x={hoveredDistrict.x}
            y={hoveredDistrict.y}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
