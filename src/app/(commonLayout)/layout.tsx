import React from "react";

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-green-600">🌱 Green Bangladesh</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <a href="/" className="transition-colors hover:text-green-600">Home</a>
            <a href="/districts" className="transition-colors hover:text-green-600">Districts</a>
            <a href="/leaderboard" className="transition-colors hover:text-green-600">Leaderboard</a>
            <a href="/login" className="transition-colors hover:text-green-600">Login</a>
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
