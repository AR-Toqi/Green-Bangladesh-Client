"use server";

import { verifyEmailApi } from "@/services/auth.service";
import { TVerifyEmail } from "@/zod/auth.schema";

export const verifyEmailAction = async (data: TVerifyEmail) => {
  try {
    const res = await verifyEmailApi(data);

    if (res.success) {
      return {
        success: true,
        message: "Email verified successfully!",
      };
    } else {
      return {
        success: false,
        message: res.message || "Failed to verify email",
      };
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "An unexpected error occurred",
    };
  }
};
