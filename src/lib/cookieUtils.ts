"use server";

import { cookies } from "next/headers";

export const setAccessToken = async (token: string) => {
  const cookieStore = await cookies();
  cookieStore.set("accessToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });
};

export const getAccessToken = async () => {
  const cookieStore = await cookies();
  return cookieStore.get("accessToken")?.value;
};

export const deleteAccessToken = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
};
