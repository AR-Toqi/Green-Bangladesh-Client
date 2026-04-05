import { TPlantationReport, TPlantationResponse } from "@/types/plantation";
import { getAccessToken } from "@/lib/cookieUtils";
import { checkAndRefreshToken } from "@/lib/tokenUtils";
import { cookies } from "next/headers";
import { API_BASE_URL, getCleanBaseUrl } from "@/lib/api";

const cleanBaseUrl = getCleanBaseUrl(API_BASE_URL);

export const createPlantationApi = async (data: TPlantationReport): Promise<TPlantationResponse> => {
  // 1. Refresh token if needed
  await checkAndRefreshToken();
  
  // 2. Get tokens from cookies
  const token = await getAccessToken();
  const cookieStore = await cookies();
  
  if (!token) {
    throw new Error("Session expired. Please log in again.");
  }

  // 3. Prepare headers - combining full session cookies ONLY
  // This backend does not use Authorization: Bearer token format
  const refreshToken = cookieStore.get("refreshToken")?.value;
  const sessionToken = cookieStore.get("better-auth.session_token")?.value;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "Authorization": token, // The backend expects just the token without 'Bearer '
    "Cookie": `accessToken=${token}; refreshToken=${refreshToken || ""}; better-auth.session_token=${sessionToken || ""}`,
  };

  const response = await fetch(`${cleanBaseUrl}/plantations`, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    
    // Detailed error logging for diagnostics
    if (response.status === 401 || response.status === 403) {
        throw new Error(`Unauthorized (Status ${response.status}): ${errorData.message || "Token might be invalid or role is insufficient"}`);
    }
    
    // If it's a validation error, try to extract the specific fields
    let det = "";
    if (errorData.errorSources) {
        det = JSON.stringify(errorData.errorSources);
    } else if (errorData.errors) {
        det = JSON.stringify(errorData.errors);
    }

    throw new Error(`${errorData.message || 'API Error'} ${det ? `Details: ${det}` : `(Status ${response.status})`}`);
  }

  return response.json();
};

export const getPlantationsApi = async () => {
  try {
    const token = await getAccessToken();
    const cookieStore = await cookies();
    
    const refreshToken = cookieStore.get("refreshToken")?.value;
    const sessionToken = cookieStore.get("better-auth.session_token")?.value;

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    
    if (token) {
      headers["Authorization"] = token;
      headers["Cookie"] = `accessToken=${token}; refreshToken=${refreshToken || ""}; better-auth.session_token=${sessionToken || ""}`;
    }

    const response = await fetch(`${cleanBaseUrl}/plantations`, {
      method: "GET",
      headers,
      cache: "no-store",
    });

    if (!response.ok) {
        console.log("getPlantationsApi error status:", response.status);
        return { data: [] };
    }
    return response.json();
  } catch (error) {
    console.error("getPlantationsApi throw:", error);
    return { data: [] };
  }
};

export const getAllPlantationsAdminApi = async (tokens: { accessToken: string; refreshToken?: string; sessionToken?: string }): Promise<{ success: boolean; data: any[] }> => {
  const { accessToken, refreshToken, sessionToken } = tokens;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "Authorization": accessToken,
    "Cookie": `accessToken=${accessToken}; refreshToken=${refreshToken || ""}; better-auth.session_token=${sessionToken || ""}`,
  };

  const response = await fetch(`${cleanBaseUrl}/admin/plantations`, {
    method: "GET",
    headers,
    cache: "no-store",
  });

  if (!response.ok) {
    console.error("getAllPlantationsAdminApi Failed:", response.status);
    return { success: false, data: [] };
  }

  return response.json();
};

export const deletePlantationApi = async (id: string, tokens: { accessToken: string; refreshToken?: string; sessionToken?: string }): Promise<{ success: boolean; message: string }> => {
  const { accessToken, refreshToken, sessionToken } = tokens;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "Authorization": accessToken,
    "Cookie": `accessToken=${accessToken}; refreshToken=${refreshToken || ""}; better-auth.session_token=${sessionToken || ""}`,
  };

  const response = await fetch(`${cleanBaseUrl}/admin/plantations/${id}`, {
    method: "DELETE",
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to delete plantation report");
  }

  return response.json();
};
