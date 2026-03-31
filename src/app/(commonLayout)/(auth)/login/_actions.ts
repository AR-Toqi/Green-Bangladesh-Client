"use server";

import { loginUserApi } from "@/services/auth.service";
import { setAccessToken } from "@/lib/cookieUtils";
import { TLogin } from "@/zod/auth.schema";
import { redirect } from "next/navigation";

export const loginUserAction = async (data: TLogin) => {
  let success = false;

  try {
    const res = await loginUserApi(data);

    if (res.success && res.data.accessToken) {
      await setAccessToken(res.data.accessToken);
      success = true;
    } else {
      return {
        success: false,
        message: res.message || "Failed to login",
      };
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "An unexpected error occurred",
    };
  }

  if (success) {
    redirect("/");
  }
};
