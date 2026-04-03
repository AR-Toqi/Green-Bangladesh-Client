import { VerifyEmailForm } from "@/components/auth/VerifyEmailForm";
import { verifyEmailAction } from "./_actions";

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedSearchParams = await searchParams;
  const emailParam = resolvedSearchParams?.email;
  const email = typeof emailParam === "string" ? emailParam : "";

  return (
    <div className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--primary)_0%,_transparent_60%)] px-4">
      <VerifyEmailForm 
        email={email} 
        verifyAction={verifyEmailAction} 
      />
    </div>
  );
}
