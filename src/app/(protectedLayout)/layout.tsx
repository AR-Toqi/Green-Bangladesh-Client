import React from "react";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      {/* 
        This is where we would put authentication checks 
        using better-auth middleware or server-side session checks.
      */}
      {children}
    </div>
  );
}
