"use server";

import { forgotPasswordApi } from "@/services/auth.service";
import { TForgotPassword } from "@/zod/auth.schema";

export const forgotPasswordAction = async (data: TForgotPassword) => {
  try {
    const res = await forgotPasswordApi(data);

    if (res.success) {
      return {
        success: true,
        message: "Password reset instructions sent to your email!",
      };
    } else {
      return {
        success: false,
        message: res.message || "Failed to send reset code",
      };
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "An unexpected error occurred",
    };
  }
};
