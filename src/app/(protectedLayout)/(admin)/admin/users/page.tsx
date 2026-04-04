import React from "react";
import { getAllUsersApi, getCurrentUserApi } from "@/services/user.service";
import { getPlantationsApi } from "@/services/plantation.service";
import { getAccessToken } from "@/lib/cookieUtils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import * as jwt from "jsonwebtoken";
import { UserTable } from "./_components/UserTable";

export default async function AdminUsersPage() {
  // 1. Role Protection: Ensure only admins can access this page
  let userRole;
  let accessToken: string | undefined;
  let refreshToken: string | undefined;
  let sessionToken: string | undefined;
  let currentAdminEmail: string | undefined;

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
    currentAdminEmail = user?.email || userResponse?.email;
    
    // JWT FALLBACK: If API doesn't provide role clearly, decode the token
    if (!userRole && accessToken) {
      const decoded = jwt.decode(accessToken) as any;
      userRole = decoded?.role || decoded?.user?.role || (Array.isArray(decoded?.roles) ? decoded?.roles[0] : null);
      if (!currentAdminEmail) currentAdminEmail = decoded?.email || decoded?.user?.email;
    }
    
    if (userRole?.toLowerCase() !== "admin") {
      redirect("/"); 
    }
  } catch (error: any) {
    if (error.message === "NEXT_REDIRECT") throw error;
    redirect("/login");
  }

  // 2. Fetch User Data & Plantations
  let users: any[] = [];
  let allPlantations: any[] = [];

  try {
    const plantationsRes = await getPlantationsApi();
    allPlantations = plantationsRes.data || [];
  } catch (error) {
    console.error("Failed to fetch plantations for admin dashboard:", error);
  }

  try {
    const usersResponse = await getAllUsersApi({
      accessToken: accessToken!,
      refreshToken,
      sessionToken,
    });
    // Filter to only show standard users
    users = (usersResponse?.data || []).filter((u: any) => u.role?.toUpperCase() === "USER");
  } catch (error) {

    console.error("Failed to fetch users for admin:", error);
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">User Management</h1>
        <p className="text-zinc-500 dark:text-zinc-400">Promote users to admins, adjust permissions, or manage account status.</p>
      </header>

      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 shadow-sm">
        <UserTable users={users} currentAdminEmail={currentAdminEmail} allPlantations={allPlantations} />
      </div>
    </div>
  );
}

