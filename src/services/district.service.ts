import { TDistrictResponse } from "@/types/district";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined");
}

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
