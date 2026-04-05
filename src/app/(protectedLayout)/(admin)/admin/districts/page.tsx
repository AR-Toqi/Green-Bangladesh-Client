import React from "react";
import { getAllDistrictsApi } from "@/services/district.service";
import { getCurrentUserApi } from "@/services/user.service";
import { getAccessToken } from "@/lib/cookieUtils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import * as jwt from "jsonwebtoken";
import { DistrictTable } from "./_components/DistrictTable";

export const dynamic = "force-dynamic";

export default async function AdminDistrictsPage() {
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
    
    // Support multiple response structures
    const user = userResponse?.data?.user || userResponse?.user || userResponse?.data || userResponse;
    userRole = user?.role || userResponse?.role || userResponse?.data?.role;
    
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


  // 2. Fetch District Data
  let districts: any[] = [];

  try {
    const districtsResponse = await getAllDistrictsApi();
    districts = districtsResponse?.data || [];
  } catch (error) {
    console.error("Failed to fetch districts for admin:", error);
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">District Management</h1>
        <p className="text-zinc-500 dark:text-zinc-400">Update environmental metrics and tree density data for all 64 districts.</p>
      </header>

      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 shadow-sm">
        <DistrictTable districts={districts} />
      </div>
    </div>
  );
}

