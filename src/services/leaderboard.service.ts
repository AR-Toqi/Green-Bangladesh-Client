import { TLeaderboardResponse } from "@/types/leaderboard";
import { cookies } from "next/headers";
import { API_BASE_URL } from "@/lib/api";

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
