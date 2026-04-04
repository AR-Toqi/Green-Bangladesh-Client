import { getAdminsApi, getCurrentUserApi } from "@/services/user.service";
import { getAccessToken } from "@/lib/cookieUtils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import * as jwt from "jsonwebtoken";
import { AdminTable } from "./_components/AdminTable";
import { TUserProfile } from "@/types/user";

export default async function AdminAdminsPage() {
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

  // 2. Fetch Administrators Data
  let admins: TUserProfile[] = [];
  try {
    const adminsResponse = await getAdminsApi({
      accessToken: accessToken!,
      refreshToken,
      sessionToken,
    });
    admins = adminsResponse?.data || [];
  } catch (error) {
    console.error("Failed to fetch administrators:", error);
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="h-10 w-1 bg-green-500 rounded-full" />
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Administrator Management</h1>
        </div>
        <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl px-4">
          Manage your administrative team. You can revoke access for other administrators or update your own public administrative profile.
        </p>
      </header>

      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 shadow-sm">
        <AdminTable admins={admins} currentAdminEmail={currentAdminEmail} />
      </div>
    </div>
  );
}
