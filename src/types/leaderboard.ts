export type TLeaderboardItem = {
  id: string;
  name: string;
  totalPlanted: number;
  reportCount: number;
  avatar?: string;
  lastPlantationAt?: string;
};

import { TMeta } from "./district";

export type TLeaderboardResponse = {
  success: boolean;
  message: string;
  meta?: TMeta;
  data: TLeaderboardItem[];
};
