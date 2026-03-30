import React from "react";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r bg-zinc-950 p-6 text-zinc-50">
        <div className="mb-8 flex items-center justify-between">
          <span className="text-xl font-bold text-green-500">Admin Control</span>
        </div>
        <nav className="flex flex-col gap-4 text-sm font-medium">
          <a href="/admin" className="flex items-center gap-2 text-green-500">Analytics</a>
          <a href="/admin/districts" className="flex items-center gap-2 text-zinc-400 transition-colors hover:text-green-500">Manage Districts</a>
          <a href="/admin/users" className="flex items-center gap-2 text-zinc-400 transition-colors hover:text-green-500">Manage Users</a>
          <a href="/admin/plantations" className="flex items-center gap-2 text-zinc-400 transition-colors hover:text-green-500">Moderation</a>
          <a href="/" className="mt-auto pt-8 flex items-center gap-2 text-zinc-400 transition-colors hover:text-zinc-50">← Logout to Site</a>
        </nav>
      </aside>
      <main className="flex-1 p-8 bg-zinc-50 dark:bg-zinc-900 overflow-y-auto">{children}</main>
    </div>
  );
}
