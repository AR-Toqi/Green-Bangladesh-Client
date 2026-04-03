"use server";

import { resetPasswordApi } from "@/services/auth.service";
import { TResetPassword } from "@/zod/auth.schema";

export const resetPasswordAction = async (data: TResetPassword) => {
  try {
    const res = await resetPasswordApi({
      email: data.email,
      otp: data.otp,
      newPassword: data.newPassword,
    });

    if (res.success) {
      return {
        success: true,
        message: "Password reset successfully! You can now log in.",
      };
    } else {
      return {
        success: false,
        message: res.message || "Failed to reset password",
      };
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "An unexpected error occurred",
    };
  }
};
