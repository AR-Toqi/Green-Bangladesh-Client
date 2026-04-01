import { getAccessToken } from "@/lib/cookieUtils";
import React from "react";
import { logoutUserAction } from "./_actions";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = await getAccessToken();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="text-xl font-bold text-green-600">🌱 Green Bangladesh</Link>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/" className="transition-colors hover:text-green-600">Home</Link>
            <Link href="/districts" className="transition-colors hover:text-green-600">Districts</Link>
            <Link href="/leaderboard" className="transition-colors hover:text-green-600">Leaderboard</Link>
            {token ? (
              <>
                <Link href="/profile" className="transition-colors hover:text-green-600">Profile</Link>
                <form action={logoutUserAction}>
                  <Button variant="ghost" className="h-auto p-0 text-sm font-medium transition-colors hover:text-destructive hover:bg-transparent">
                    Logout
                  </Button>
                </form>
              </>
            ) : (
              <Link href="/login" className="transition-colors hover:text-green-600">Login</Link>
            )}
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built for a greener Bangladesh. © 2026
          </p>
        </div>
      </footer>
    </div>
  );
}
