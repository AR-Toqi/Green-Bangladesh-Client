export type TPlantationReport = {
  treeCount: number;
  districtId: string;
  location: string;
  plantationDate: string;
};

export type TPlantationResponse = {
  success: boolean;
  message: string;
  data: any;
};
