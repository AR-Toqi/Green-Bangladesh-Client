"use client";

import React, { useState, useTransition } from "react";
import { Search, Trash2, Calendar, MapPin, User, TreePine, Loader2, Link as LinkIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { deletePlantationAction } from "../_actions";
import { format } from "date-fns";

interface PlantationTableProps {
  plantations: any[];
}

export function PlantationTable({ plantations }: PlantationTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isPending, startTransition] = useTransition();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filteredPlantations = (plantations || []).filter((p) => {
    const userName = p.user?.name || "";
    const districtName = p.district?.name || "";
    const location = p.location || "";
    
    return (
      userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      districtName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this plantation report? This will permanently remove it and affect district/user stats.")) {
      return;
    }

    setDeletingId(id);
    startTransition(async () => {
      try {
        const result = await deletePlantationAction(id);
        if (result.success) {
          toast.success(result.message);
        } else {
          toast.error(result.message);
        }
      } catch (error: any) {
        toast.error(error.message || "Failed to delete report");
      } finally {
        setDeletingId(null);
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 h-4 w-4" />
        <Input
          placeholder="Search reports by user, district, or location..."
          className="pl-10 bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
        <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800">
          <thead className="bg-zinc-50 dark:bg-zinc-900/50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">Report Info</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">User</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">Area</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider text-center">Trees</th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-zinc-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {filteredPlantations.map((p) => (
              <tr key={p._id || p.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/30 transition-colors group">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 text-sm font-medium text-zinc-900 dark:text-zinc-100">
                      <Calendar size={14} className="text-zinc-400" />
                      {(() => {
                        const dateValue = p.plantationDate || p.createdAt || p.date;
                        return dateValue ? format(new Date(dateValue), "MMM dd, yyyy") : "N/A";
                      })()}
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] text-zinc-500">
                      <LinkIcon size={10} />
                      ID: {p._id || p.id}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                      <User size={14} className="text-zinc-400" />
                      {p.user?.name || "Unknown"}
                    </span>
                    <span className="text-[11px] text-zinc-500 ml-5">{p.user?.email || "No email"}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                      {p.district?.name || "Global"}
                    </span>
                    <span className="text-[11px] text-zinc-500 flex items-center gap-1">
                      <MapPin size={10} />
                      {p.location || "Coordinates Available"}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                   <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 font-bold text-xs ring-1 ring-green-600/20">
                    <TreePine size={12} />
                    {p.treeCount || p.numberOfTrees || 0}
                   </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={isPending}
                    onClick={() => handleDelete(p._id || p.id)}
                    className="h-8 gap-1.5 text-red-600 hover:text-red-500 hover:bg-red-500/10 transition-colors"
                  >
                    {deletingId === (p._id || p.id) ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : (
                      <Trash2 size={14} />
                    )}
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredPlantations.length === 0 && (
        <div className="text-center py-20 rounded-2xl border-2 border-dashed border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/20">
          <div className="inline-flex p-4 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-400 mb-4 scale-110">
            <TreePine size={32} />
          </div>
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">No plantation records found</h3>
          <p className="text-zinc-500 max-w-xs mx-auto mt-1">We couldn't find any reports matching your search criteria.</p>
        </div>
      )}
    </div>
  );
}
