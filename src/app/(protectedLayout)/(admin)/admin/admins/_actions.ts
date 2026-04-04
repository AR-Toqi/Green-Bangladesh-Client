"use server";

import { deleteAdminApi, updateAdminProfileApi } from "@/services/user.service";
import { getAccessToken } from "@/lib/cookieUtils";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function deleteAdminAction(userId: string) {
  try {
    const accessToken = await getAccessToken();
    const cookieStore = await cookies();
    
    if (!accessToken) {
      return { success: false, message: "Session expired. Please log in again." };
    }

    const refreshToken = cookieStore.get("refreshToken")?.value;
    const sessionToken = cookieStore.get("better-auth.session_token")?.value;

    const result = await deleteAdminApi(userId, {
      accessToken,
      refreshToken,
      sessionToken,
    });
    
    revalidatePath("/admin/admins");
    revalidatePath("/admin");
    
    return {
      success: true,
      message: result.message || "Administrator account removed successfully.",
    };
  } catch (error: any) {
    console.error("deleteAdminAction Error:", error);
    return {
      success: false,
      message: error.message || "Failed to remove administrator account",
    };
  }
}

export async function updateAdminProfileAction(data: any) {
  try {
    const accessToken = await getAccessToken();
    const cookieStore = await cookies();
    
    if (!accessToken) {
      return { success: false, message: "Session expired. Please log in again." };
    }

    const refreshToken = cookieStore.get("refreshToken")?.value;
    const sessionToken = cookieStore.get("better-auth.session_token")?.value;

    const result = await updateAdminProfileApi(data, {
      accessToken,
      refreshToken,
      sessionToken,
    });
    
    revalidatePath("/admin/admins");
    revalidatePath("/admin");
    
    return {
      success: true,
      message: result.message || "Administrative profile updated successfully!",
    };
  } catch (error: any) {
    console.error("updateAdminProfileAction Error:", error);
    return {
      success: false,
      message: error.message || "Failed to update administrative profile",
    };
  }
}
