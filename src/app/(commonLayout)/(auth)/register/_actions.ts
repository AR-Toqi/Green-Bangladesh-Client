"use server";

import { registerUserApi } from "@/services/auth.service";
import { TRegister } from "@/zod/auth.schema";

export const registerUserAction = async (data: TRegister) => {
  try {
    const res = await registerUserApi(data);

    if (res.success) {
      return {
        success: true,
        message: "Registration successful! Please login to continue.",
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
