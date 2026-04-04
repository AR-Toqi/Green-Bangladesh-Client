import React from "react";
import { getAllPlantationsAdminApi } from "@/services/plantation.service";
import { getCurrentUserApi } from "@/services/user.service";
import { getAccessToken } from "@/lib/cookieUtils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import * as jwt from "jsonwebtoken";
import { PlantationTable } from "./_components/PlantationTable";
import { ShieldAlert, Info } from "lucide-react";

export default async function AdminPlantationsPage() {
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

    const { data: user } = await getCurrentUserApi({
      accessToken,
      refreshToken,
      sessionToken,
    }) as any;
    
    userRole = user?.role;
    
    // JWT FALLBACK: If API doesn't provide role clearly, decode the token
    if (!userRole && accessToken) {
      const decoded = jwt.decode(accessToken) as any;
      userRole = decoded?.role || decoded?.user?.role || (Array.isArray(decoded?.roles) ? decoded?.roles[0] : null);
    }
    
    if (userRole?.toLowerCase() !== "admin") {
      redirect("/"); 
    }
  } catch (error: any) {
    if (error.message === "NEXT_REDIRECT") throw error;
    redirect("/login");
  }

  // 2. Fetch Plantation Data
  let plantations: any[] = [];
  try {
    const response = await getAllPlantationsAdminApi({
      accessToken: accessToken!,
      refreshToken,
      sessionToken,
    });
    plantations = response.data || [];
  } catch (error) {
    console.error("Failed to fetch plantations for admin:", error);
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 flex items-center gap-3">
            Moderation Queue
            <span className="px-2 py-1 rounded bg-orange-500/10 text-orange-500 text-[10px] uppercase tracking-widest font-bold border border-orange-500/20">
              Admin Only
            </span>
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1">Review, verify, or remove plantation reports to maintain system integrity.</p>
        </div>
      </header>

      {/* Warning/Info Callout */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-800 dark:text-blue-400">
        <Info size={18} className="shrink-0 mt-0.5" />
        <p className="text-sm font-medium leading-relaxed">
           Deletions are permanent. Removing a report will automatically deduct the tree count from both the reporting user and their associated district leaderboard.
        </p>
      </div>

      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 shadow-sm">
        <PlantationTable plantations={plantations} />
      </div>
    </div>
  );
}
