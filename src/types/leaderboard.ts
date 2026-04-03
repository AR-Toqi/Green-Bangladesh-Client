export type TLeaderboardItem = {
  id: string;
  name: string;
  totalPlanted: number;
  reportCount: number;
  avatar?: string;
  lastPlantationAt?: string;
};

export type TLeaderboardResponse = {
  success: boolean;
  message: string;
  data: TLeaderboardItem[];
};
