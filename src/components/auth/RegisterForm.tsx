"use client";

import { AuthForm } from "./AuthForm";
import { registerSchema } from "@/zod/auth.schema";
import { registerUserAction } from "@/app/(commonLayout)/(auth)/register/_actions";

export function RegisterForm() {
  return (
    <AuthForm
      type="register"
      schema={registerSchema}
      action={registerUserAction}
    />
  );
}
