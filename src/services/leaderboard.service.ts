import { TLeaderboardResponse } from "@/types/leaderboard";
import { cookies } from "next/headers";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined");
}

export const getLeaderboardApi = async (): Promise<TLeaderboardResponse> => {
  const cookieStore = await cookies();
  
  const response = await fetch(`${API_BASE_URL}/leaderboard`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
    next: { revalidate: 300 }, // revalidate every 5 minutes
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch leaderboard");
  }

  return response.json();
};
