"use server";

import { updateDistrictApi } from "@/services/district.service";
import { getAccessToken } from "@/lib/cookieUtils";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function updateDistrictAction(id: string, data: any) {
  try {
    const accessToken = await getAccessToken();
    const cookieStore = await cookies();

    if (!accessToken) {
      return { success: false, message: "Session expired. Please log in again." };
    }

    const refreshToken = cookieStore.get("refreshToken")?.value;
    const sessionToken = cookieStore.get("better-auth.session_token")?.value;

    const result = await updateDistrictApi(id, data, {
      accessToken,
      refreshToken,
      sessionToken,
    });

    // Revalidate the districts page and the main admin dashboard stats
    revalidatePath("/admin/districts");
    revalidatePath("/admin");
    revalidatePath("/districts");

    return {
      success: true,
      message: result.message || "District data updated successfully!",
    };
  } catch (error: any) {
    console.error("updateDistrictAction Error:", error);
    return {
      success: false,
      message: error.message || "Failed to update district data",
    };
  }
}

