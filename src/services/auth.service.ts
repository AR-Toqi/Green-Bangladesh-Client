import { TLogin, TRegister } from "@/zod/auth.schema";
import { TLoginResponse, TRegisterResponse } from "@/types/auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined");
}

export const loginUserApi = async (data: TLogin): Promise<TLoginResponse & { setCookies: string[] }> => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to login");
  }

  const result = await response.json();
  const setCookies = response.headers.getSetCookie();

  return { ...result, setCookies };
};

export const registerUserApi = async (data: TRegister): Promise<TRegisterResponse & { setCookies: string[] }> => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to register");
  }

  const result = await response.json();
  const setCookies = response.headers.getSetCookie();

  return { ...result, setCookies };
};

export const verifyEmailApi = async (data: { email: string; otp: string }) => {
  const response = await fetch(`${API_BASE_URL}/auth/verify-email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to verify email");
  }

  return response.json();
};

export const forgotPasswordApi = async (data: { email: string }) => {
  const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to send reset code");
  }

  return response.json();
};

export const resetPasswordApi = async (data: { email: string; otp: string; newPassword: string }) => {
  const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to reset password");
  }

  return response.json();
};
