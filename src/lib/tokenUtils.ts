"use server";

import { cookies } from "next/headers";
import * as jwt from "jsonwebtoken";
import { parseAndSetCookies } from "./cookieUtils";

export const checkAndRefreshToken = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;
  const sessionToken = cookieStore.get("better-auth.session_token")?.value;

  // We only intercept to refresh if we have an access token and refresh stuff
  if (accessToken) {
    const decoded = jwt.decode(accessToken) as jwt.JwtPayload;
    // Check if less than 60 seconds left before expiry
    if (decoded && decoded.exp && (decoded.exp * 1000) < Date.now() + 60000) {
      if (refreshToken && sessionToken) {
        // Time to refresh
        try {
          const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
          const res = await fetch(`${API_BASE_URL}/auth/get-new-token`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              // Note: the backend expects the tokens on the cookie string
              "Cookie": `refreshToken=${refreshToken}; better-auth.session_token=${sessionToken}`,
            },
          });

          if (res.ok) {
            const setCookies = res.headers.getSetCookie();
            if (setCookies && setCookies.length > 0) {
              await parseAndSetCookies(setCookies);
            }
          } else {
             // Refresh failed, probably clear cookies
             cookieStore.delete("accessToken");
             cookieStore.delete("refreshToken");
             cookieStore.delete("better-auth.session_token");
          }
        } catch (error) {
          console.error("Token refresh error", error);
        }
      }
    }
  }
};
