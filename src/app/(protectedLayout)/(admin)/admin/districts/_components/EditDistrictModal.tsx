"use client";

import React, { useState } from "react";
import { TDistrict } from "@/types/district";
import { updateDistrictAction } from "../_actions";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface EditDistrictModalProps {
  district: TDistrict | null;
  onClose: () => void;
}

export function EditDistrictModal({ district, onClose }: EditDistrictModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    area: district?.area || 0,
    estimatedTrees: district?.estimatedTrees || 0,
  });

  if (!district) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const result = await updateDistrictAction(district._id || district.id || "", formData);
      if (result.success) {
        toast.success(result.message);
        onClose();
      } else {
        toast.error(result.message);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to update district");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />
        
        {/* Modal */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl"
        >
          <div className="flex items-center justify-between border-b border-zinc-800 p-6">
            <div>
              <h2 className="text-xl font-bold text-white">Edit District Data</h2>
              <p className="text-sm text-zinc-400">Updating metrics for {typeof district.name === 'string' ? district.name : district.name.name}</p>
            </div>
            <button 
              onClick={onClose}
              className="rounded-full p-2 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="area" className="text-zinc-400">Total Area (km²)</Label>
                <Input
                  id="area"
                  type="number"
                  step="0.01"
                  required
                  className="bg-zinc-800 border-zinc-700 text-white focus:ring-green-500 h-11"
                  value={isNaN(formData.area) ? "" : formData.area}
                  onChange={(e) => setFormData({ ...formData, area: parseFloat(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="estimatedTrees" className="text-zinc-400">Estimated Total Trees</Label>
                <Input
                  id="estimatedTrees"
                  type="number"
                  required
                  className="bg-zinc-800 border-zinc-700 text-white focus:ring-green-500 h-11"
                  value={isNaN(formData.estimatedTrees) ? "" : formData.estimatedTrees}
                  onChange={(e) => setFormData({ ...formData, estimatedTrees: parseInt(e.target.value) })}
                />

              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800">
              <Button 
                type="button" 
                variant="ghost" 
                onClick={onClose}
                className="text-zinc-400 hover:text-white"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isLoading}
                className="bg-green-600 hover:bg-green-700 text-white min-w-[120px]"
              >
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Save Changes"}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
