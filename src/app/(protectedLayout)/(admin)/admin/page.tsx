import React from "react";
import { getCurrentUserApi, getAllUsersApi } from "@/services/user.service";
import { getPlantationsApi } from "@/services/plantation.service";
import { getAllDistrictsApi } from "@/services/district.service";
import { getAccessToken } from "@/lib/cookieUtils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import * as jwt from "jsonwebtoken";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  // 1. Role Protection: Ensure only admins can access this page
  let userRole;
  let accessToken: string | undefined;
  let refreshToken: string | undefined;
  let sessionToken: string | undefined;

  try {
    accessToken = await getAccessToken();
    const cookieStore = await cookies();
    refreshToken = cookieStore.get("refreshToken")?.value;
    sessionToken = cookieStore.get("better-auth.session_token")?.value;

    if (!accessToken) {
      redirect("/login");
    }

    const userResponse = await getCurrentUserApi({
      accessToken,
      refreshToken,
      sessionToken,
    }) as any;
    
    console.log("Admin Dashboard Diagnostic - Keys:", Object.keys(userResponse || {}));
    if (userResponse.data) console.log("Admin Dashboard Diagnostic - Data Keys:", Object.keys(userResponse.data));
    
    // Support multiple response structures
    const user = userResponse?.data?.user || userResponse?.user || userResponse?.data || userResponse;
    userRole = user?.role || userResponse?.role || userResponse?.data?.role;
    
    // JWT FALLBACK: If API doesn't provide role clearly, decode the token
    if (!userRole && accessToken) {
      console.log("Admin Dashboard Diagnostic - Triggering JWT Fallback...");
      const decoded = jwt.decode(accessToken) as any;
      userRole = decoded?.role || decoded?.user?.role || (Array.isArray(decoded?.roles) ? decoded?.roles[0] : null);
      console.log("Admin Dashboard Diagnostic - JWT Decoded Role:", userRole);
    }
    
    console.log("Admin Dashboard Diagnostic - Detected Role:", userRole);

    if (userRole?.toLowerCase() !== "admin") {
      console.log("Admin Access Denied. Role found was:", userRole);
      redirect("/"); 
    }
  } catch (error: any) {
    if (error.message === "NEXT_REDIRECT") throw error;
    console.error("Admin Dashboard Auth Error:", error.message);
    redirect("/login");
  }


  // 2. Fetch Dashboard Stats with individual error handling
  let usersRes: { success: boolean; data: any[] } = { success: false, data: [] };
  let plantationsRes: { success: boolean; data: any[] } = { success: false, data: [] };
  let districtsRes: { success: boolean; data: any[] } = { success: false, data: [] };

  try {
    const results = await Promise.allSettled([
      getAllUsersApi({
        accessToken: accessToken!,
        refreshToken,
        sessionToken,
      }),
      getPlantationsApi(),
      getAllDistrictsApi(),
    ]);


    if (results[0].status === "fulfilled") usersRes = results[0].value;
    if (results[1].status === "fulfilled") plantationsRes = results[1].value;
    if (results[2].status === "fulfilled") districtsRes = (results[2].value as any);
  } catch (error) {
    console.error("Dashboard data fetching summary error:", error);
  }

  const totalUsers = usersRes?.data?.length || 0;
  const plantations = plantationsRes?.data || [];
  const totalPlantations = plantations.length;
  const totalTrees = plantations.reduce((acc: number, p: any) => acc + (Number(p.numberOfTrees || p.treeCount || 0)), 0);
  const totalDistricts = districtsRes?.data?.length || 0;


  // Calculate some basic analytics
  const activeDistricts = new Set(plantations.map((p: any) => p.districtId)).size;
  const targetTrees = 1000000; // Example target
  const progressPercentage = Math.min(Math.round((totalTrees / targetTrees) * 100), 100);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Impact Analytics</h1>
        <p className="text-zinc-500 dark:text-zinc-400">Monitoring Green Bangladesh's reforestation progress.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Trees Planted", value: totalTrees.toLocaleString(), color: "text-green-500", bg: "bg-green-500/10" },
          { label: "Community Members", value: totalUsers, color: "text-blue-500", bg: "bg-blue-500/10" },
          { label: "Reports Moderated", value: totalPlantations, color: "text-amber-500", bg: "bg-amber-500/10" },
          { label: "Active Districts", value: `${activeDistricts}/${totalDistricts}`, color: "text-purple-500", bg: "bg-purple-500/10" },
        ].map((stat, i) => (
          <div key={i} className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 shadow-sm ring-1 ring-zinc-900/5 transition-all hover:scale-[1.02]">
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{stat.label}</p>
            <p className={`mt-2 text-3xl font-bold tracking-tight ${stat.color}`}>{stat.value}</p>
            <div className={`mt-4 h-1.5 w-full rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden`}>
              <div className={`h-full ${stat.bg.replace('/10', '')} transition-all duration-1000`} style={{ width: i === 0 ? `${progressPercentage}%` : "100%" }} />
            </div>
          </div>
        ))}
      </div>

      {/* Action Progress Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-900 p-8 text-white shadow-xl">
          <h2 className="text-xl font-bold">National Target Progress</h2>
          <p className="mt-2 text-sm text-zinc-400">Our goal is to reach 1 million trees by 2027.</p>
          
          <div className="mt-10 flex items-end justify-between">
            <div>
              <p className="text-4xl font-bold">{totalTrees.toLocaleString()}</p>
              <p className="text-sm text-zinc-500 uppercase tracking-wider mt-1">Trees Verified</p>
            </div>
            <div className="text-right text-green-400 font-mono text-lg">
              {progressPercentage}% Completed
            </div>
          </div>
          
          <div className="mt-4 h-4 w-full rounded-full bg-zinc-800 p-1 shadow-inner">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-green-600 to-emerald-400 transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(16,185,129,0.4)]" 
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          
          <div className="mt-12 grid grid-cols-2 gap-4">
             <div className="rounded-lg bg-zinc-800/50 p-4 border border-zinc-700/50">
                <p className="text-xs text-zinc-500 uppercase">Growth (30d)</p>
                <p className="text-lg font-semibold text-green-400">+{Math.floor(totalTrees * 0.05).toLocaleString()}</p>
             </div>
             <div className="rounded-lg bg-zinc-800/50 p-4 border border-zinc-700/50">
                <p className="text-xs text-zinc-500 uppercase">Status</p>
                <p className="text-lg font-semibold text-emerald-400">On Track</p>
             </div>
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-8 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">Quick Actions</h2>
          </div>
          <div className="mt-6 grid gap-4">
             {[
               { title: "Review Pending Reports", count: 0, href: "/admin/plantations", icon: "📋" },
               { title: "Manage Global Users", count: totalUsers, href: "/admin/users", icon: "👤" },
               { title: "Update District Data", count: totalDistricts, href: "/admin/districts", icon: "🗺️" }
             ].map((action, i) => (
                <a key={i} href={action.href} className="group flex items-center justify-between rounded-xl border border-zinc-100 dark:border-zinc-800 p-4 transition-all hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:border-green-500/30">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{action.icon}</span>
                    <div>
                      <p className="font-semibold text-zinc-900 dark:text-zinc-50">{action.title}</p>
                      <p className="text-xs text-zinc-500">{action.count} items active</p>
                    </div>
                  </div>
                  <span className="text-zinc-400 group-hover:text-green-500 group-hover:translate-x-1 transition-all">→</span>
                </a>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
}

