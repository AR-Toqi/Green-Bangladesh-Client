import { RegisterForm } from "@/components/auth/RegisterForm";
import { getAccessToken } from "@/lib/cookieUtils";
import { redirect } from "next/navigation";

export default async function RegisterPage() {
  const token = await getAccessToken();

  if (token) {
    redirect("/");
  }

  return (
    <div className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--primary)_0%,_transparent_60%)] px-4">
      <RegisterForm />
    </div>
  );
}
