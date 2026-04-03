import { TUser } from "./auth";

export type TUserProfile = TUser & {
  profile?: {
    _id?: string;
    bio?: string;
    address?: string;
    createdAt?: string;
    updatedAt?: string;
  };
  plantations?: any[];
  id?: string;
  totalTrees?: number;
  numberOfTrees?: number;
  totalReports?: number;
  [key: string]: any;
};

export type TUpdateProfile = {
  name?: string;
  bio?: string;
  address?: string;
};

export type TUserProfileResponse = {
  success: boolean;
  message: string;
  data: TUserProfile;
};

export type TUpdateProfileResponse = {
  success: boolean;
  message: string;
  data: TUserProfile;
};
