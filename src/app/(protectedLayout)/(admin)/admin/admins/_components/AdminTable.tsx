"use client";

import React, { useState, useTransition } from "react";
import { TUserProfile } from "@/types/user";
import { deleteAdminAction } from "../_actions";
import { toast } from "sonner";
import { Search, UserMinus, ShieldAlert, Loader2, Mail, Edit } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EditAdminProfileModal } from "./EditAdminProfileModal";

interface AdminTableProps {
  admins: TUserProfile[];
  currentAdminEmail?: string;
}

export function AdminTable({ admins, currentAdminEmail }: AdminTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isPending, startTransition] = useTransition();
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [editingProfile, setEditingProfile] = useState<TUserProfile | null>(null);

  const filteredAdmins = (admins || []).filter((a) => {
    const name = a.name || "";
    const email = a.email || "";
    return (
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleDelete = (userId: string, name: string) => {
    if (!confirm(`Are you sure you want to remove ${name} from administrators? This is a soft delete.`)) {
      return;
    }

    setLoadingId(userId);
    startTransition(async () => {
      try {
        const result = await deleteAdminAction(userId);
        if (result.success) {
          toast.success(result.message);
        } else {
          toast.error(result.message);
        }
      } catch (error: any) {
        toast.error(error.message || "Failed to remove administrator");
      } finally {
        setLoadingId(null);
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 h-4 w-4" />
        <Input
          placeholder="Search administrators..."
          className="pl-10 bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
        <table className="min-w-full divide-y divide-zinc-200 dark:border-zinc-800">
          <thead className="bg-zinc-50 dark:bg-zinc-900/50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">Administrator</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">Join Date</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">Permissions</th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-zinc-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {filteredAdmins.map((admin) => (
              <tr key={admin._id || admin.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/30 transition-colors group">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                      {admin.name}
                      {admin.email === currentAdminEmail && (
                        <span className="px-1.5 py-0.5 text-[10px] bg-green-500/10 text-green-500 border border-green-500/20 rounded font-bold uppercase tracking-tighter">You</span>
                      )}
                    </span>
                    <span className="text-xs text-zinc-500 flex items-center gap-1">
                      <Mail size={12} />
                      {admin.email}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-500">
                  {admin.profile?.createdAt ? new Date(admin.profile.createdAt).toLocaleDateString() : "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-500/10 text-purple-500 border border-purple-500/20">
                    <ShieldAlert size={12} />
                    FULL_ADMIN
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end gap-2">
                    {admin.email === currentAdminEmail ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingProfile(admin)}
                        className="h-8 gap-1.5 text-zinc-600 dark:text-zinc-400 hover:text-green-500 hover:bg-green-500/10"
                      >
                        <Edit size={14} />
                        Edit Profile
                      </Button>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        disabled={isPending}
                        onClick={() => handleDelete(admin._id || admin.id!, admin.name!)}
                        className="h-8 gap-1.5 text-red-600 hover:text-red-500 hover:bg-red-500/10"
                      >
                        {loadingId === admin._id || loadingId === admin.id ? <Loader2 size={14} className="animate-spin" /> : <UserMinus size={14} />}
                        Revoke Access
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredAdmins.length === 0 && (
        <div className="text-center py-12 rounded-xl border border-dashed border-zinc-200 dark:border-zinc-800">
          <p className="text-zinc-500">No administrators found matching your search.</p>
        </div>
      )}

      {editingProfile && (
        <EditAdminProfileModal
          admin={editingProfile}
          onClose={() => setEditingProfile(null)}
        />
      )}
    </div>
  );
}
