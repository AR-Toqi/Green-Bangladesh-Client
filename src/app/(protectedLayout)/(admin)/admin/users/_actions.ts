"use server";

import { updateUserRoleApi, updateUserStatusApi, deleteUserApi } from "@/services/user.service";
import { getAccessToken } from "@/lib/cookieUtils";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function updateUserRoleAction(userId: string, role: string) {
  try {
    const accessToken = await getAccessToken();
    const cookieStore = await cookies();
    
    if (!accessToken) {
      return { success: false, message: "Session expired. Please log in again." };
    }

    const refreshToken = cookieStore.get("refreshToken")?.value;
    const sessionToken = cookieStore.get("better-auth.session_token")?.value;

    const result = await updateUserRoleApi(userId, role, {
      accessToken,
      refreshToken,
      sessionToken,
    });
    
    revalidatePath("/admin/users");
    revalidatePath("/admin");
    
    return {
      success: true,
      message: result.message || `User role updated to ${role} successfully!`,
    };
  } catch (error: any) {
    console.error("updateUserRoleAction Error Details:", error.message);
    return {
      success: false,
      message: error.message || "Failed to update user role",
    };
  }
}


export async function updateUserStatusAction(userId: string, status: string) {
  try {
    const accessToken = await getAccessToken();
    const cookieStore = await cookies();
    
    if (!accessToken) {
      return { success: false, message: "Session expired. Please log in again." };
    }

    const refreshToken = cookieStore.get("refreshToken")?.value;
    const sessionToken = cookieStore.get("better-auth.session_token")?.value;

    const result = await updateUserStatusApi(userId, status, {
      accessToken,
      refreshToken,
      sessionToken,
    });
    
    revalidatePath("/admin/users");
    revalidatePath("/admin");
    
    return {
      success: true,
      message: result.message || `User status updated to ${status} successfully!`,
    };
  } catch (error: any) {
    console.error("updateUserStatusAction Error Details:", error.message);
    return {
      success: false,
      message: error.message || "Failed to update user status",
    }
  }
}

export async function deleteUserAction(userId: string) {
  try {
    const accessToken = await getAccessToken();
    const cookieStore = await cookies();
    
    if (!accessToken) {
      return { success: false, message: "Session expired. Please log in again." };
    }

    const refreshToken = cookieStore.get("refreshToken")?.value;
    const sessionToken = cookieStore.get("better-auth.session_token")?.value;

    const result = await deleteUserApi(userId, {
      accessToken,
      refreshToken,
      sessionToken,
    });
    
    revalidatePath("/admin/users");
    revalidatePath("/admin");
    
    return {
      success: true,
      message: result.message || "User account deleted successfully!",
    };
  } catch (error: any) {
    console.error("deleteUserAction Error Details:", error.message);
    return {
      success: false,
      message: error.message || "Failed to delete user account",
    };
  }
}


