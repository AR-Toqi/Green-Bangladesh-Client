import { getAccessToken } from "@/lib/cookieUtils";
import { checkAndRefreshToken } from "@/lib/tokenUtils";
import { logoutUserAction } from "@/app/(commonLayout)/_actions";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TreePine, User } from "lucide-react";

export async function Navbar() {
  await checkAndRefreshToken();
  const token = await getAccessToken();

  return (
    <header className="px-6 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-xl font-bold text-green-600">🌱 Green Bangladesh</Link>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="transition-colors hover:text-green-600">Home</Link>
          <Link href="/districts" className="transition-colors hover:text-green-600">Districts</Link>
          <Link href="/leaderboard" className="transition-colors hover:text-green-600">Leaderboard</Link>
          <Link href="/report-plantation">
            <Button className="bg-green-600 hover:bg-green-700 text-white rounded-full px-5 h-9 font-bold text-xs flex items-center gap-2 transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-green-900/20">
              <TreePine size={14} />
              Plant a Tree
            </Button>
          </Link>
          {token ? (
            <Link href="/profile" className="flex items-center gap-2 group">
              <div className="h-8 w-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center border border-zinc-200 dark:border-zinc-700 group-hover:border-green-500/50 transition-colors overflow-hidden">
                <User size={16} className="text-zinc-500 group-hover:text-green-600 transition-colors" />
              </div>
              <span className="text-sm font-medium transition-colors group-hover:text-green-600">Profile</span>
            </Link>
          ) : (
            <Link href="/login" className="transition-colors hover:text-green-600">Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
}
