import { TPlantationReport, TPlantationResponse } from "@/types/plantation";
import { getAccessToken } from "@/lib/cookieUtils";
import { checkAndRefreshToken } from "@/lib/tokenUtils";
import { cookies } from "next/headers";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined");
}

// Ensure no trailing slash in base URL
const cleanBaseUrl = API_BASE_URL.endsWith("/") ? API_BASE_URL.slice(0, -1) : API_BASE_URL;

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
