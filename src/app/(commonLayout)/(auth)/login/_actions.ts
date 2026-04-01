"use server";

import { loginUserApi } from "@/services/auth.service";
import { parseAndSetCookies } from "@/lib/cookieUtils";
import { TLogin } from "@/zod/auth.schema";
import * as jwt from "jsonwebtoken";

export const loginUserAction = async (data: TLogin) => {
  try {
    const res = await loginUserApi(data);

    if (res.success && res.data.accessToken) {
      if (res.setCookies && res.setCookies.length > 0) {
        await parseAndSetCookies(res.setCookies);
      }

      let role = "user";
      try {
        const decoded = jwt.decode(res.data.accessToken) as jwt.JwtPayload;
        if (decoded && decoded.role) {
          role = decoded.role.toLowerCase();
        } else if (decoded && decoded.user && decoded.user.role) {
          role = decoded.user.role.toLowerCase();
        }
      } catch (err) {
        console.error("Failed to decode token", err);
      }

      return { success: true, message: "Login successful!", role };
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
};
