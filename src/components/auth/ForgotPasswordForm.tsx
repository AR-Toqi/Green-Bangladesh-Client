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
import { Loader2, KeyRound } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { forgotPasswordSchema, TForgotPassword } from "@/zod/auth.schema";

interface ForgotPasswordFormProps {
  action: (data: TForgotPassword) => Promise<{ success: boolean; message?: string }>;
}

export function ForgotPasswordForm({ action }: ForgotPasswordFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<TForgotPassword>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: TForgotPassword) => {
    setIsLoading(true);
    try {
      const result = await action(data);
      if (result.success) {
        toast.success(result.message || "Reset instructions sent!");
        router.push(`/reset-password?email=${encodeURIComponent(data.email)}`);
      } else {
        toast.error(result.message || "Failed to send instructions");
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
        <div className="mx-auto w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
          <KeyRound className="h-8 w-8 text-green-500" />
        </div>
        <CardTitle className="text-3xl font-bold tracking-tight text-primary">
          Forgot Password
        </CardTitle>
        <CardDescription className="text-muted-foreground pt-2">
          Enter your registered email address and we'll send you an OTP to reset your password.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input 
                      className="bg-zinc-800 text-gray-200" 
                      placeholder="name@example.com" 
                      type="email"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button
              type="submit"
              className="w-full h-12 text-lg font-medium bg-green-600 text-white transition-all hover:scale-[1.01] hover:bg-green-700"
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
              Send Reset OTP
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
