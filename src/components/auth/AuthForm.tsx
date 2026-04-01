"use client";

import { useForm, FieldValues, Path } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type AuthValues = {
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

interface AuthFormProps<T extends FieldValues & AuthValues> {
  type: "login" | "register";
  schema: z.ZodType<T>;
  action: (data: T) => Promise<{ success: boolean; message?: string } | void>;
}

export function AuthForm<T extends FieldValues & AuthValues>({
  type,
  schema,
  action,
}: AuthFormProps<T>) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<T>({
    resolver: zodResolver(schema as any),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    } as any,
  });

  const handleFormSubmit = async (data: T) => {
    setIsLoading(true);
    try {
      const result = await action(data);
      if (result) {
        if (result.success) {
          toast.success(result.message || "Success!");
          if (type === "register") {
            router.push("/login");
          }
        } else {
          toast.error(result.message || "Action failed");
        }
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const isLogin = type === "login";

  return (
    <Card className="w-full max-w-md mx-auto border-none">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-3xl font-bold tracking-tight text-primary">
          {isLogin ? "Welcome Back" : "Join Us"}
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          {isLogin
            ? "Enter your credentials to access your account"
            : "Create an account to start contributing to a greener Bangladesh"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
            {!isLogin && (
              <FormField
                control={form.control}
                name={"name" as Path<T>}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name={"email" as Path<T>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="name@example.com" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={"password" as Path<T>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="••••••••" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {!isLogin && (
              <FormField
                control={form.control}
                name={"confirmPassword" as Path<T>}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input placeholder="••••••••" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <Button
              type="submit"
              className="w-full h-11 text-lg font-medium transition-all hover:scale-[1.01]"
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLogin ? "Sign In" : "Create Account"}
            </Button>
          </form>
        </Form>
        <div className="mt-6 text-center text-sm">
          <p className="text-muted-foreground">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <Link
              href={isLogin ? "/register" : "/login"}
              className="font-semibold text-primary underline-offset-4 hover:underline"
            >
              {isLogin ? "Sign Up" : "Log In"}
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
