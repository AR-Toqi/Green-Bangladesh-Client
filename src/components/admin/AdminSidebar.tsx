"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  BarChart3, 
  MapPin, 
  Users, 
  ShieldCheck, 
  Leaf, 
  LogOut 
} from "lucide-react";
import { logoutUserAction } from "@/app/(commonLayout)/_actions";

export const AdminSidebar = () => {
  const pathname = usePathname();

  const navItems = [
    { name: "Analytics", href: "/admin", icon: BarChart3 },
    { name: "Manage Districts", href: "/admin/districts", icon: MapPin },
    { name: "Manage Users", href: "/admin/users", icon: Users },
    { name: "Manage Admins", href: "/admin/admins", icon: ShieldCheck },
    { name: "Moderation", href: "/admin/plantations", icon: Leaf },
  ];

  return (
    <aside className="w-64 border-r border-zinc-800 bg-zinc-950 p-6 text-zinc-50 flex flex-col h-screen sticky top-0">
      <div className="mb-10 flex items-center gap-3">
        <div className="h-8 w-8 rounded-lg bg-green-600 flex items-center justify-center">
          <Leaf size={20} className="text-white" />
        </div>
        <span className="text-xl font-black tracking-tight text-white">Admin Panel</span>
      </div>

      <nav className="flex flex-col gap-2 text-sm font-medium flex-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? "bg-green-600/10 text-green-500 shadow-[inset_0_0_20px_rgba(34,197,94,0.05)]"
                  : "text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900"
              }`}
            >
              <Icon 
                size={18} 
                className={`transition-colors ${isActive ? "text-green-500" : "text-zinc-500 group-hover:text-zinc-200"}`} 
              />
              {item.name}
              {isActive && (
                <div className="ml-auto h-1.5 w-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-8 border-t border-zinc-900">
        <form action={logoutUserAction}>
          <button
            type="submit"
            className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-zinc-500 transition-all hover:text-red-400 hover:bg-red-400/5 rounded-xl group"
          >
            <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
            Logout
          </button>
        </form>
      </div>
    </aside>
  );
};
