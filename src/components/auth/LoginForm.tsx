"use client";

import { AuthForm } from "./AuthForm";
import { loginSchema } from "@/zod/auth.schema";
import { loginUserAction } from "@/app/(commonLayout)/(auth)/login/_actions";

export function LoginForm() {
  return (
    <AuthForm
      type="login"
      schema={loginSchema}
      action={loginUserAction}
    />
  );
}
