import { TUpdateProfile, TUserProfileResponse, TUpdateProfileResponse, TUserProfile } from "@/types/user";
import { getAccessToken } from "@/lib/cookieUtils";
import { cookies } from "next/headers";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined");
}

const cleanBaseUrl = API_BASE_URL.endsWith("/") ? API_BASE_URL.slice(0, -1) : API_BASE_URL;

type TAuthTokens = {
  accessToken: string;
  refreshToken?: string;
  sessionToken?: string;
};

export const getCurrentUserApi = async (tokens?: TAuthTokens): Promise<TUserProfileResponse> => {
  let accessToken = tokens?.accessToken;
  let refreshToken = tokens?.refreshToken;
  let sessionToken = tokens?.sessionToken;

  if (!accessToken) {
    accessToken = await getAccessToken() || undefined;
    const cookieStore = await cookies();
    refreshToken = cookieStore.get("refreshToken")?.value;
    sessionToken = cookieStore.get("better-auth.session_token")?.value;
  }

  if (!accessToken) {
    throw new Error("Authentication required to fetch profile");
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "Authorization": accessToken,
    "Cookie": `accessToken=${accessToken}; refreshToken=${refreshToken || ""}; better-auth.session_token=${sessionToken || ""}`,
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

export const updateCurrentUserApi = async (data: TUpdateProfile, tokens?: TAuthTokens): Promise<TUpdateProfileResponse> => {
  let accessToken = tokens?.accessToken;
  let refreshToken = tokens?.refreshToken;
  let sessionToken = tokens?.sessionToken;

  if (!accessToken) {
    accessToken = await getAccessToken() || undefined;
    const cookieStore = await cookies();
    refreshToken = cookieStore.get("refreshToken")?.value;
    sessionToken = cookieStore.get("better-auth.session_token")?.value;
  }

  if (!accessToken) {
    throw new Error("Authentication required to update profile");
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "Authorization": accessToken,
    "Cookie": `accessToken=${accessToken}; refreshToken=${refreshToken || ""}; better-auth.session_token=${sessionToken || ""}`,
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

export const getAllUsersApi = async (tokens: TAuthTokens): Promise<{ success: boolean; data: TUserProfile[] }> => {
  const { accessToken, refreshToken, sessionToken } = tokens;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "Authorization": accessToken,
    "Cookie": `accessToken=${accessToken}; refreshToken=${refreshToken || ""}; better-auth.session_token=${sessionToken || ""}`,
  };

  const response = await fetch(`${cleanBaseUrl}/admin/users`, {
    method: "GET",
    headers,
    cache: "no-store",
  });

  if (!response.ok) {
    console.error("getAllUsersApi Failed:", response.status);
    return { success: false, data: [] };
  }

  return response.json();
};

export const updateUserRoleApi = async (id: string, role: string, tokens: TAuthTokens): Promise<TUserProfileResponse> => {
  const { accessToken, refreshToken, sessionToken } = tokens;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "Authorization": accessToken,
    "Cookie": `accessToken=${accessToken}; refreshToken=${refreshToken || ""}; better-auth.session_token=${sessionToken || ""}`,
  };

  const response = await fetch(`${cleanBaseUrl}/admin/users/${id}/role`, {
    method: "PATCH",
    headers,
    body: JSON.stringify({ role }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to update user role");
  }

  return response.json();
};

export const updateUserStatusApi = async (id: string, status: string, tokens: TAuthTokens): Promise<TUserProfileResponse> => {
  const { accessToken, refreshToken, sessionToken } = tokens;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "Authorization": accessToken,
    "Cookie": `accessToken=${accessToken}; refreshToken=${refreshToken || ""}; better-auth.session_token=${sessionToken || ""}`,
  };

  const response = await fetch(`${cleanBaseUrl}/admin/users/${id}/status`, {
    method: "PATCH",
    headers,
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to update user status");
  }

  return response.json();
};

export const getAdminsApi = async (tokens: TAuthTokens): Promise<{ success: boolean; data: TUserProfile[] }> => {
  const { accessToken, refreshToken, sessionToken } = tokens;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "Authorization": accessToken,
    "Cookie": `accessToken=${accessToken}; refreshToken=${refreshToken || ""}; better-auth.session_token=${sessionToken || ""}`,
  };

  const response = await fetch(`${cleanBaseUrl}/admin/admins`, {
    method: "GET",
    headers,
    cache: "no-store",
  });

  if (!response.ok) {
    console.error("getAdminsApi Failed:", response.status);
    return { success: false, data: [] };
  }

  return response.json();
};

export const deleteUserApi = async (id: string, tokens: TAuthTokens): Promise<{ success: boolean; message: string }> => {
  const { accessToken, refreshToken, sessionToken } = tokens;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "Authorization": accessToken,
    "Cookie": `accessToken=${accessToken}; refreshToken=${refreshToken || ""}; better-auth.session_token=${sessionToken || ""}`,
  };

  const response = await fetch(`${cleanBaseUrl}/admin/users/${id}`, {
    method: "DELETE",
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to delete user account");
  }

  return response.json();
};

export const deleteAdminApi = async (id: string, tokens: TAuthTokens): Promise<{ success: boolean; message: string }> => {
  const { accessToken, refreshToken, sessionToken } = tokens;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "Authorization": accessToken,
    "Cookie": `accessToken=${accessToken}; refreshToken=${refreshToken || ""}; better-auth.session_token=${sessionToken || ""}`,
  };

  const response = await fetch(`${cleanBaseUrl}/admin/admins/${id}`, {
    method: "DELETE",
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to delete administrator");
  }

  return response.json();
};

export const updateAdminProfileApi = async (data: Partial<TUserProfile>, tokens: TAuthTokens): Promise<TUserProfileResponse> => {
  const { accessToken, refreshToken, sessionToken } = tokens;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "Authorization": accessToken,
    "Cookie": `accessToken=${accessToken}; refreshToken=${refreshToken || ""}; better-auth.session_token=${sessionToken || ""}`,
  };

  const response = await fetch(`${cleanBaseUrl}/admin/profile`, {
    method: "PATCH",
    headers,
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to update admin profile");
  }

  return response.json();
};




