"use client";

import React, { useState, useTransition } from "react";
import { TUserProfile } from "@/types/user";
import { updateAdminProfileAction } from "../_actions";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";

interface EditAdminProfileModalProps {
  admin: TUserProfile | null;
  onClose: () => void;
}

export function EditAdminProfileModal({ admin, onClose }: EditAdminProfileModalProps) {
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({
    name: admin?.name || "",
    bio: admin?.profile?.bio || "",
    address: admin?.profile?.address || "",
  });

  if (!admin) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        const result = await updateAdminProfileAction(formData);
        if (result.success) {
          toast.success(result.message);
          onClose();
        } else {
          toast.error(result.message);
        }
      } catch (error: any) {
        toast.error(error.message || "Failed to update profile");
      }
    });
  };

  return (
    <Dialog open={!!admin} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-zinc-950 border-zinc-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-green-500">Edit Administrative Profile</DialogTitle>
          <DialogDescription className="text-zinc-400">
            Update your public administrative identity.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-zinc-400">Full Name</Label>
              <Input
                id="name"
                required
                className="bg-zinc-900 border-zinc-800 text-white focus:ring-green-500 h-11"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio" className="text-zinc-400">Bio</Label>
              <Textarea
                id="bio"
                placeholder="Briefly describe your role or background..."
                className="bg-zinc-900 border-zinc-800 text-white focus:ring-green-500 min-h-[100px] resize-none"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="text-zinc-400">Administrative Address</Label>
              <Input
                id="address"
                className="bg-zinc-900 border-zinc-800 text-white focus:ring-green-500 h-11"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              className="text-zinc-400 hover:text-white hover:bg-zinc-900"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="bg-green-600 hover:bg-green-500 text-white px-8 h-11 font-semibold"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Update Profile"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
