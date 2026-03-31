"use client";

import { AuthForm } from "@/components/auth/AuthForm";
import { registerSchema, TRegister } from "@/zod/auth.schema";
import { registerUserAction } from "./_actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (data: TRegister) => {
    setLoading(true);
    try {
      const result = await registerUserAction(data);
      if (result.success) {
        toast.success(result.message || "Registered successfully!");
        router.push("/login");
      } else {
        toast.error(result.message || "Registration failed");
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
        type="register"
        schema={registerSchema}
        onSubmit={handleRegister}
        isLoading={loading}
      />
    </div>
  );
}
