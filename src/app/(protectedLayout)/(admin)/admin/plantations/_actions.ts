"use server";

import { deletePlantationApi } from "@/services/plantation.service";
import { getAccessToken } from "@/lib/cookieUtils";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function deletePlantationAction(id: string) {
  try {
    const accessToken = await getAccessToken();
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;
    const sessionToken = cookieStore.get("better-auth.session_token")?.value;

    if (!accessToken) {
      return { success: false, message: "Authentication required" };
    }

    const result = await deletePlantationApi(id, {
      accessToken,
      refreshToken,
      sessionToken,
    });

    if (result.success) {
      revalidatePath("/admin/plantations");
      // Also revalidate leaderboard and profile as they depend on plantation data
      revalidatePath("/leaderboard");
      revalidatePath("/profile");
      return { success: true, message: result.message || "Plantation report deleted successfully" };
    }

    return { success: false, message: "Failed to delete report" };
  } catch (error: any) {
    console.error("deletePlantationAction Error:", error);
    return { success: false, message: error.message || "An unexpected error occurred" };
  }
}
