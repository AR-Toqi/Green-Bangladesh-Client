import React from "react";
import Link from "next/link";
import { logoutUserAction } from "@/app/(commonLayout)/_actions";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r bg-zinc-950 p-6 text-zinc-50 flex flex-col">
        <div className="mb-8 flex items-center justify-between">
          <span className="text-xl font-bold text-green-500">Admin Control</span>
        </div>
        <nav className="flex flex-col gap-4 text-sm font-medium flex-1">
          <Link href="/admin" className="flex items-center gap-2 text-green-500">Analytics</Link>
          <Link href="/admin/districts" className="flex items-center gap-2 text-zinc-400 transition-colors hover:text-green-500">Manage Districts</Link>
          <Link href="/admin/users" className="flex items-center gap-2 text-zinc-400 transition-colors hover:text-green-500">Manage Users</Link>
          <Link href="/admin/plantations" className="flex items-center gap-2 text-zinc-400 transition-colors hover:text-green-500">Moderation</Link>
        </nav>
        <form action={logoutUserAction} className="mt-auto pt-8">
          <button
            type="submit"
            className="flex w-full items-center gap-2 text-sm font-medium text-zinc-400 transition-colors hover:text-red-400"
          >
            ← Logout
          </button>
        </form>
      </aside>
      <main className="flex-1 p-8 bg-zinc-50 dark:bg-zinc-900 overflow-y-auto">{children}</main>
    </div>
  );
}
