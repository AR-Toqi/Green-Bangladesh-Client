"use client";

import React, { useState, useTransition } from "react";
import { TUserProfile } from "@/types/user";
import { updateUserRoleAction, updateUserStatusAction, deleteUserAction } from "../_actions";
import { toast } from "sonner";
import { Search, UserCog, ShieldCheck, Ban, CheckCircle2, Loader2, Mail, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface UserTableProps {
  users: TUserProfile[];
  currentAdminEmail?: string;
  allPlantations?: any[];
}

export function UserTable({ users, currentAdminEmail, allPlantations = [] }: UserTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isPending, startTransition] = useTransition();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const getUserStats = (user: TUserProfile) => {
    // 1. Try to use direct summary fields from user object
    if (user.numberOfTrees || user.totalTrees) {
      return {
        trees: user.numberOfTrees || user.totalTrees || 0,
        reports: user.totalReports || user.plantations?.length || 0
      };
    }

    // 2. Fallback: Filter allPlantations for this specific user
    const userId = user._id || user.id;
    const userPlantations = allPlantations.filter(p => {
      // Handle various user object structures in plantation records
      const pUserId = p.userId || p.user?._id || p.user?.id || (typeof p.user === 'string' ? p.user : null);
      if (!pUserId || !userId) return false;
      return String(pUserId) === String(userId);
    });

    return {
      trees: userPlantations.reduce((acc, p) => acc + (p.treeCount || p.numberOfTrees || 0), 0),
      reports: userPlantations.length
    };
  };

  const filteredUsers = (users || []).filter((u) => {
    const name = u.name || "";
    const email = u.email || "";
    return (
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleRoleToggle = (userId: string, currentRole: string) => {
    const newRole = (currentRole?.toLowerCase() === "admin") ? "USER" : "ADMIN";
    setLoadingId(userId + "-role");

    startTransition(async () => {
      try {
        const result = await updateUserRoleAction(userId, newRole);
        if (result.success) {
          toast.success(result.message);
        } else {
          toast.error(result.message);
        }
      } catch (error: any) {
        toast.error(error.message || "Failed to update role");
      } finally {
        setLoadingId(null);
      }
    });
  };

  const handleStatusToggle = (userId: string, currentStatus: string) => {
    const newStatus = currentStatus === "ACTIVE" ? "BLOCKED" : "ACTIVE";
    setLoadingId(userId + "-status");
    startTransition(async () => {
      try {
        const result = await updateUserStatusAction(userId, newStatus);
        if (result.success) {
          toast.success(result.message);
        } else {
          toast.error(result.message);
        }
      } catch (error: any) {
        toast.error(error.message || "Failed to update status");
      } finally {
        setLoadingId(null);
      }
    });
  };

  const handleDelete = (userId: string, name: string) => {
    if (!confirm(`Are you sure you want to permanently delete the account for ${name}? This action cannot be undone.`)) {
      return;
    }

    setLoadingId(userId + "-delete");
    startTransition(async () => {
      try {
        const result = await deleteUserAction(userId);
        if (result.success) {
          toast.success(result.message);
        } else {
          toast.error(result.message);
        }
      } catch (error: any) {
        toast.error(error.message || "Failed to delete user account");
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
          placeholder="Search users by name or email..."
          className="pl-10 bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
        <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800">
          <thead className="bg-zinc-50 dark:bg-zinc-900/50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">User</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">Stats</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-zinc-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {filteredUsers.map((user) => (
              <tr key={user._id || user.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/30 transition-colors group">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{user.name}</span>
                    <span className="text-xs text-zinc-500 flex items-center gap-1">
                      <Mail size={12} />
                      {user.email}
                      {user.email === currentAdminEmail && <span className="text-green-500 font-bold ml-1">(You)</span>}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                    user.role?.toLowerCase() === "admin" 
                      ? "bg-purple-500/10 text-purple-500 border-purple-500/20" 
                      : "bg-zinc-500/10 text-zinc-500 border-zinc-500/20"
                  }`}>
                    {user.role?.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {(() => {
                    const stats = getUserStats(user);
                    return (
                      <div className="flex flex-col gap-0.5">
                        <span className="text-xs text-zinc-600 dark:text-zinc-400">
                          <strong className="text-green-600">{stats.trees}</strong> trees
                        </span>
                        <span className="text-[10px] text-zinc-400 uppercase tracking-tight">
                          {stats.reports} reports
                        </span>
                      </div>
                    );
                  })()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    user.status === "ACTIVE" 
                      ? "text-green-600 dark:text-green-400" 
                      : "text-red-600 dark:text-red-400"
                  }`}>
                    {user.status === "ACTIVE" ? <CheckCircle2 size={12} /> : <Ban size={12} />}
                    {user.status || "ACTIVE"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      disabled={isPending || user.email === currentAdminEmail}
                      onClick={() => handleRoleToggle(user._id || user.id!, user.role!)}
                      className="h-8 gap-1.5 text-zinc-600 dark:text-zinc-400 hover:text-purple-500 hover:bg-purple-500/10"
                    >
                      {loadingId === user._id + "-role" ? <Loader2 size={14} className="animate-spin" /> : <ShieldCheck size={14} />}
                      {user.role?.toLowerCase() === "admin" ? "Make User" : "Make Admin"}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      disabled={isPending || user.email === currentAdminEmail}
                      onClick={() => handleStatusToggle(user._id || user.id!, user.status!)}
                      className={`h-8 gap-1.5 ${
                        user.status === "ACTIVE" 
                          ? "text-red-600 hover:text-red-500 hover:bg-red-500/10" 
                          : "text-green-600 hover:text-green-500 hover:bg-green-500/10"
                      }`}
                    >
                      {loadingId === user._id + "-status" ? <Loader2 size={14} className="animate-spin" /> : (user.status === "ACTIVE" ? <Ban size={14} /> : <CheckCircle2 size={14} />)}
                      {user.status === "ACTIVE" ? "Block" : "Activate"}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      disabled={isPending || user.email === currentAdminEmail}
                      onClick={() => handleDelete(user._id || user.id!, user.name!)}
                      className="h-8 gap-1.5 text-red-600 hover:text-red-500 hover:bg-red-500/10"
                    >
                      {loadingId === user._id + "-delete" ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {filteredUsers.length === 0 && (
        <div className="text-center py-12 rounded-xl border border-dashed border-zinc-200 dark:border-zinc-800">
          <p className="text-zinc-500">No users found matching your search.</p>
        </div>
      )}
    </div>
  );
}
