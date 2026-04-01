"use server";

import { registerUserApi } from "@/services/auth.service";
import { parseAndSetCookies } from "@/lib/cookieUtils";
import { TRegister } from "@/zod/auth.schema";

export const registerUserAction = async (data: TRegister) => {
  try {
    const res = await registerUserApi(data);

    if (res.success) {
      if (res.setCookies && res.setCookies.length > 0) {
        await parseAndSetCookies(res.setCookies);
      }
      return {
        success: true,
        message: "Registration successful!",
      };
    } else {
      return {
        success: false,
        message: res.message || "Failed to register",
      };
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "An unexpected error occurred",
    };
  }
};
