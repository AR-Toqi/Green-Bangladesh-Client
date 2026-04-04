"use client";

import React, { useState } from "react";
import { TDistrict } from "@/types/district";
import { EditDistrictModal } from "./EditDistrictModal";
import { Search, Edit2 } from "lucide-react";
import { Input } from "@/components/ui/input";

interface DistrictTableProps {
  districts: TDistrict[];
}

export function DistrictTable({ districts }: DistrictTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [editingDistrict, setEditingDistrict] = useState<TDistrict | null>(null);

  const filteredDistricts = (districts || []).filter((d) => {
    if (!d) return false;
    
    // Safely extract name and division strings
    const nameStr = typeof d.name === "string" ? d.name : (d.name as any)?.name || "";
    const divisionStr = typeof d.division === "string" ? d.division : (d.division as any)?.name || "";
    
    const search = searchTerm.toLowerCase();
    return (
      nameStr.toLowerCase().includes(search) ||
      divisionStr.toLowerCase().includes(search)
    );
  });


  return (
    <div className="space-y-6">
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 h-4 w-4" />
        <Input
          placeholder="Search districts or divisions..."
          className="pl-10 bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

      </div>

      <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
        <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800">
          <thead className="bg-zinc-50 dark:bg-zinc-900/50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">District</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">Division</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">Area (km²)</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">Est. Trees</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">Density</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">Zone</th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-zinc-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {filteredDistricts.map((district) => (
              <tr key={district._id || district.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/30 transition-colors group">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  {typeof district.name === "string" ? district.name : district.name.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-500">
                  {typeof district.division === "string" ? district.division : district.division.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-500">
                  {district.area?.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-500 font-mono">
                  {district.estimatedTrees?.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-500">
                  {Math.round(district.treesPerKm2 || 0).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                    district.zone === "GREEN" ? "bg-green-500/10 text-green-500 border-green-500/20" :
                    district.zone === "ORANGE" ? "bg-orange-500/10 text-orange-500 border-orange-500/20" :
                    "bg-red-500/10 text-red-500 border-red-500/20"
                  }`}>
                    {district.zone}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button 
                    onClick={() => setEditingDistrict(district)}
                    className="inline-flex items-center gap-2 text-green-600 hover:text-green-500 transition-colors opacity-0 group-hover:opacity-100 px-3 py-1.5 rounded-lg hover:bg-green-500/10"
                  >
                    <Edit2 size={14} />
                    Edit Metrics
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <EditDistrictModal
        district={editingDistrict}
        onClose={() => setEditingDistrict(null)}
      />
    </div>
  );
}
