import React from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-zinc-950">
      <AdminSidebar />
      <main className="flex-1 p-8 bg-zinc-50 dark:bg-zinc-900/50 overflow-y-auto rounded-tl-[2rem] border-t border-l border-zinc-800 my-2 mr-2">
        {children}
      </main>
    </div>
  );
}
