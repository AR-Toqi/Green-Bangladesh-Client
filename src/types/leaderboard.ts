export type TLeaderboardItem = {
  _id: string;
  districtName: string;
  totalTreesPlanted: number;
  reportCount: number;
  lastPlantationAt?: string;
};

export type TLeaderboardResponse = {
  success: boolean;
  message: string;
  data: TLeaderboardItem[];
};
