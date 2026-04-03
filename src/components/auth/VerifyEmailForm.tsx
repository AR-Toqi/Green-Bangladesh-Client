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
import { Loader2, Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { verifyEmailSchema, TVerifyEmail } from "@/zod/auth.schema";

interface VerifyEmailFormProps {
  email: string;
  verifyAction: (data: TVerifyEmail) => Promise<{ success: boolean; message?: string }>;
}

export function VerifyEmailForm({ email, verifyAction }: VerifyEmailFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<TVerifyEmail>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      email: email || "",
      otp: "",
    },
  });

  const handleVerify = async (data: TVerifyEmail) => {
    setIsLoading(true);
    try {
      const result = await verifyAction(data);
      if (result.success) {
        toast.success(result.message || "Email verified successfully!");
        router.push("/");
      } else {
        toast.error(result.message || "Failed to verify email");
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
          <Mail className="h-8 w-8 text-green-500" />
        </div>
        <CardTitle className="text-3xl font-bold tracking-tight text-primary">
          Verify Email
        </CardTitle>
        <CardDescription className="text-muted-foreground pt-2">
          We've sent a one-time password to <span className="text-zinc-200 font-semibold">{email || "your email"}</span>.
          Please enter it below to verify your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleVerify)} className="space-y-4">
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">One-Time Password</FormLabel>
                  <FormControl>
                    <Input 
                      className="bg-zinc-800 text-gray-200 text-center text-2xl tracking-[0.5em] h-14 font-mono uppercase" 
                      placeholder="••••••" 
                      maxLength={6}
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
              Verify Account
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
