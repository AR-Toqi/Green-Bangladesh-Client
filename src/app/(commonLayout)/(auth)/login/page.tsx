"use client";

import { AuthForm } from "@/components/auth/AuthForm";
import { loginSchema, TLogin } from "@/zod/auth.schema";
import { loginUserAction } from "./_actions";
import { useState } from "react";
import { toast } from "sonner";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const handleLogin = async (data: TLogin) => {
    setLoading(true);
    try {
      const result = await loginUserAction(data);
      if (result && !result.success) {
        toast.error(result.message || "Login failed");
      } else {
        toast.success("Logged in successfully!");
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--primary)_0%,_transparent_60%)] px-4">
      <AuthForm
        type="login"
        schema={loginSchema}
        onSubmit={handleLogin}
        isLoading={loading}
      />
    </div>
  );
}
