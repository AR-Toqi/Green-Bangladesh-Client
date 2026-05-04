import { TDistrictResponse, TSingleDistrictResponse, TDistrict } from "@/types/district";
import { API_BASE_URL } from "@/lib/api";

export const getAllDistrictsApi = async (page = 1, limit = 10): Promise<TDistrictResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/districts?page=${page}&limit=${limit}`, {
      next: { revalidate: 300 }, // revalidate every 5 minutes
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to fetch districts");
    }

    return response.json();
  } catch (error: any) {
    console.warn("Districts fetch failed, using mock data fallback:", error.message);
    
    // Fallback data for the 8 divisions to keep the map and stats alive
    const mockDistricts = [
      { id: "1", name: "Dhaka", estimatedTrees: 4500000000, area: 300, treesPerKm2: 15000, score: 85, zone: "GREEN" },
      { id: "2", name: "Chittagong", estimatedTrees: 3200000000, area: 250, treesPerKm2: 12800, score: 70, zone: "ORANGE" },
      { id: "3", name: "Sylhet", estimatedTrees: 2800000000, area: 200, treesPerKm2: 14000, score: 90, zone: "GREEN" },
      { id: "4", name: "Rajshahi", estimatedTrees: 1500000000, area: 180, treesPerKm2: 8333, score: 45, zone: "ORANGE" },
      { id: "5", name: "Khulna", estimatedTrees: 1800000000, area: 220, treesPerKm2: 8181, score: 55, zone: "GREEN" },
      { id: "6", name: "Barisal", estimatedTrees: 1200000000, area: 150, treesPerKm2: 8000, score: 60, zone: "GREEN" },
      { id: "7", name: "Rangpur", estimatedTrees: 900000000, area: 170, treesPerKm2: 5294, score: 35, zone: "ORANGE" },
      { id: "8", name: "Mymensingh", estimatedTrees: 1100000000, area: 160, treesPerKm2: 6875, score: 50, zone: "ORANGE" },
    ];

    return {
      success: true,
      message: "Showing demonstration data (API unreachable)",
      data: mockDistricts as any,
      meta: { page: 1, limit: 10, total: 8 }
    };
  }
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

