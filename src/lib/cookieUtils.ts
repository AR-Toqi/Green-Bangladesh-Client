"use server";

import { cookies } from "next/headers";

export const setAccessToken = async (token: string) => {
  const cookieStore = await cookies();
  cookieStore.set("accessToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24, // 1 day
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
  cookieStore.delete("refreshToken");
  cookieStore.delete("better-auth.session_token");
};

export const parseAndSetCookies = async (setCookieHeaders: string[]) => {
  const cookieStore = await cookies();

  setCookieHeaders.forEach((headerStr) => {
    // Example header from express: "accessToken=xyz; Path=/; HttpOnly; Secure; SameSite=None"
    const parts = headerStr.split(';').map(part => part.trim());
    const [nameValue, ...options] = parts;
    const [name, ...valueParts] = nameValue.split('=');
    const value = valueParts.join('=');

    let maxAge: number | undefined;
    let expires: Date | undefined;
    let path = '/';
    let secure = false;
    let httpOnly = false;
    let sameSite: "strict" | "lax" | "none" | undefined = undefined;

    options.forEach(option => {
      const [optName, optValue] = option.split('=');
      const optNameLower = optName.toLowerCase();

      if (optNameLower === 'max-age') maxAge = parseInt(optValue, 10);
      else if (optNameLower === 'expires') expires = new Date(optValue);
      else if (optNameLower === 'path') path = optValue;
      else if (optNameLower === 'secure') secure = true;
      else if (optNameLower === 'httponly') httpOnly = true;
      else if (optNameLower === 'samesite') {
        const val = optValue?.toLowerCase();
        if (val === 'strict' || val === 'lax' || val === 'none') sameSite = val;
      }
    });

    cookieStore.set(name, value, {
      maxAge,
      expires,
      path,
      secure,
      httpOnly,
      sameSite,
    });
  });
};
