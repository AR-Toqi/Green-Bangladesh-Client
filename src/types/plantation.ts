export type TPlantationReport = {
  _id?: string;
  id?: string;
  treeCount: number;
  districtId: string;
  location: string;
  plantationDate: string;
  createdAt?: string;
  updatedAt?: string;
  date?: Date;
  user?: any;
  district?: any;
};

export type TPlantationResponse = {
  success: boolean;
  message: string;
  data: any;
};
