"use server";

import { deleteAccessToken } from "@/lib/cookieUtils";
import { redirect } from "next/navigation";

export const logoutUserAction = async () => {
  await deleteAccessToken();
  redirect("/login");
};
