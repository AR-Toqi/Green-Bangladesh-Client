import { TDistrictResponse, TSingleDistrictResponse, TDistrict } from "@/types/district";
import { API_BASE_URL } from "@/lib/api";

export const getAllDistrictsApi = async (): Promise<TDistrictResponse> => {
  const response = await fetch(`${API_BASE_URL}/districts`, {
    next: { revalidate: 300 }, // revalidate every 5 minutes
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch districts");
  }

  return response.json();
};

export const getDistrictByIdApi = async (id: string): Promise<TSingleDistrictResponse> => {
  const response = await fetch(`${API_BASE_URL}/districts/${id}`, {
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch district details");
  }

  return response.json();
};

export const updateDistrictApi = async (
  id: string, 
  data: Partial<TDistrict>, 
  tokens: { accessToken: string; refreshToken?: string; sessionToken?: string }
): Promise<TSingleDistrictResponse> => {
  const { accessToken, refreshToken, sessionToken } = tokens;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "Authorization": accessToken,
    "Cookie": `accessToken=${accessToken}; refreshToken=${refreshToken || ""}; better-auth.session_token=${sessionToken || ""}`,
  };

  const response = await fetch(`${API_BASE_URL}/admin/districts/${id}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to update district");
  }

  return response.json();
};

