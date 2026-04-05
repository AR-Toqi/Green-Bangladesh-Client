import { TLogin, TRegister } from "@/zod/auth.schema";
import { TLoginResponse, TRegisterResponse } from "@/types/auth";
import { API_BASE_URL, getCleanBaseUrl } from "@/lib/api";

const cleanBaseUrl = getCleanBaseUrl(API_BASE_URL);

export const loginUserApi = async (data: TLogin): Promise<TLoginResponse & { setCookies: string[] }> => {
  const response = await fetch(`${cleanBaseUrl}/auth/login`, {
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
