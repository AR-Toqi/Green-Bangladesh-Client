import { checkAndRefreshToken } from "@/lib/tokenUtils";
import { getAccessToken } from "@/lib/cookieUtils";
import { cookies } from "next/headers";
import { TUpdateProfile, TUserProfileResponse, TUpdateProfileResponse } from "@/types/user";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined");
}

const cleanBaseUrl = API_BASE_URL.endsWith("/") ? API_BASE_URL.slice(0, -1) : API_BASE_URL;

export const getCurrentUserApi = async (): Promise<TUserProfileResponse> => {
  await checkAndRefreshToken();
  const token = await getAccessToken();
  const cookieStore = await cookies();

  if (!token) {
    throw new Error("Session expired. Please log in again.");
  }

  const refreshToken = cookieStore.get("refreshToken")?.value;
  const sessionToken = cookieStore.get("better-auth.session_token")?.value;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "Authorization": token,
    "Cookie": `accessToken=${token}; refreshToken=${refreshToken || ""}; better-auth.session_token=${sessionToken || ""}`,
  };

  const response = await fetch(`${cleanBaseUrl}/users/me`, {
    method: "GET",
    headers,
    cache: "no-store",
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to fetch user profile");
  }

  return response.json();
};

export const updateCurrentUserApi = async (data: TUpdateProfile): Promise<TUpdateProfileResponse> => {
  await checkAndRefreshToken();
  const token = await getAccessToken();
  const cookieStore = await cookies();

  if (!token) {
    throw new Error("Session expired. Please log in again.");
  }

  const refreshToken = cookieStore.get("refreshToken")?.value;
  const sessionToken = cookieStore.get("better-auth.session_token")?.value;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "Authorization": token,
    "Cookie": `accessToken=${token}; refreshToken=${refreshToken || ""}; better-auth.session_token=${sessionToken || ""}`,
  };

  const response = await fetch(`${cleanBaseUrl}/users/me`, {
    method: "PATCH",
    headers,
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to update profile");
  }

  return response.json();
};
