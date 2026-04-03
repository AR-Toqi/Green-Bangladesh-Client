import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";
import { forgotPasswordAction } from "./_actions";

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--primary)_0%,_transparent_60%)] px-4">
      <ForgotPasswordForm action={forgotPasswordAction} />
    </div>
  );
}
