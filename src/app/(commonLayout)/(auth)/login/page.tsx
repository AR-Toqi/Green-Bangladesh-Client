import { LoginForm } from "@/components/auth/LoginForm";
import { getAccessToken } from "@/lib/cookieUtils";
import { redirect } from "next/navigation";
import * as jwt from "jsonwebtoken";

export default async function LoginPage() {
  const token = await getAccessToken();

  if (token) {
    try {
      const decoded = jwt.decode(token) as jwt.JwtPayload;
      if (decoded && decoded.role && typeof decoded.role === "string" && decoded.role.toLowerCase() === "admin") {
        redirect("/admin");
      }
    } catch (e) {
      // ignore
    }
    redirect("/");
  }

  return (
    <div className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--primary)_0%,_transparent_60%)] px-4">
      <LoginForm />
    </div>
  );
}
