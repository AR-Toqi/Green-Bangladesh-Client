"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, LockKeyhole } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { resetPasswordSchema, TResetPassword } from "@/zod/auth.schema";

interface ResetPasswordFormProps {
  email: string;
  action: (data: TResetPassword) => Promise<{ success: boolean; message?: string }>;
}

export function ResetPasswordForm({ email, action }: ResetPasswordFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<TResetPassword>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: email || "",
      otp: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: TResetPassword) => {
    setIsLoading(true);
    try {
      const result = await action(data);
      if (result.success) {
        toast.success(result.message || "Password reset successfully!");
        router.push("/login");
      } else {
        toast.error(result.message || "Failed to reset password");
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto border-none bg-zinc-900">
      <CardHeader className="space-y-1 text-center pb-4">
        <div className="mx-auto w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
          <LockKeyhole className="h-8 w-8 text-blue-500" />
        </div>
        <CardTitle className="text-3xl font-bold tracking-tight text-primary">
          Reset Password
        </CardTitle>
        <CardDescription className="text-muted-foreground pt-2">
          Enter the OTP sent to <span className="text-zinc-200 font-semibold">{email || "your email"}</span> and choose a new password.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>One-Time Password</FormLabel>
                  <FormControl>
                    <Input 
                      className="bg-zinc-800 text-gray-200 text-center tracking-widest font-mono uppercase" 
                      placeholder="Enter 6-digit OTP" 
                      maxLength={6}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input 
                      className="bg-zinc-800 text-gray-200" 
                      placeholder="••••••••" 
                      type="password"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input 
                      className="bg-zinc-800 text-gray-200" 
                      placeholder="••••••••" 
                      type="password"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button
              type="submit"
              className="w-full h-12 text-lg font-medium bg-blue-600 text-white transition-all hover:scale-[1.01] hover:bg-blue-700"
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
              Update Password
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
