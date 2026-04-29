"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TreePine, User, Menu, X } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";

interface MobileMenuProps {
  token: string | undefined;
}

export default function MobileMenu({ token }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const menuVariants: Variants = {
    closed: {
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    opened: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };

  const overlayVariants: Variants = {
    closed: { opacity: 0 },
    opened: { opacity: 1 },
  };

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleMenu}
        className="relative z-50 text-zinc-600 hover:text-green-600"
        aria-label="Toggle menu"
      >
        <Menu size={24} />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial="closed"
              animate="opened"
              exit="closed"
              variants={overlayVariants}
              onClick={closeMenu}
              className="fixed inset-0 z-40 bg-zinc-950/10"
            />

            {/* Menu Content */}
            <motion.div
              initial="closed"
              animate="opened"
              exit="closed"
              variants={menuVariants}
              className="fixed right-0 top-0 z-50 h-full w-[280px] bg-zinc-50 dark:bg-zinc-950 border-l border-zinc-200 dark:border-zinc-800 p-6 flex flex-col"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="text-lg font-bold text-green-600">Menu</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={closeMenu}
                  className="text-zinc-600 hover:text-green-600"
                >
                  <X size={24} />
                </Button>
              </div>

              <nav className="flex flex-col gap-1">
                <Link
                  href="/"
                  onClick={closeMenu}
                  className="text-lg font-medium transition-colors hover:text-green-600 py-3 px-2 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900"
                >
                  Home
                </Link>
                <Link
                  href="/districts"
                  onClick={closeMenu}
                  className="text-lg font-medium transition-colors hover:text-green-600 py-3 px-2 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900"
                >
                  Districts
                </Link>
                <Link
                  href="/leaderboard"
                  onClick={closeMenu}
                  className="text-lg font-medium transition-colors hover:text-green-600 py-3 px-2 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900"
                >
                  Leaderboard
                </Link>

                <div className="pt-4 flex flex-col gap-4">
                  <Link href="/report-plantation" onClick={closeMenu}>
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl py-6 font-bold flex items-center justify-center gap-2">
                      <TreePine size={18} />
                      Plant a Tree
                    </Button>
                  </Link>

                  {token ? (
                    <Link
                      href="/profile"
                      onClick={closeMenu}
                      className="flex items-center gap-3 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 hover:border-green-500/50 transition-all mt-2"
                    >
                      <div className="h-10 w-10 rounded-full bg-white dark:bg-zinc-800 flex items-center justify-center border border-zinc-200 dark:border-zinc-700 shadow-sm">
                        <User size={20} className="text-green-600" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold">Your Profile</span>
                        <span className="text-xs text-zinc-500">Manage account</span>
                      </div>
                    </Link>
                  ) : (
                    <Link href="/login" onClick={closeMenu} className="mt-2">
                      <Button variant="outline" className="w-full rounded-full py-6 font-bold border-zinc-200 hover:bg-zinc-50 hover:text-green-600">
                        Login / Sign Up
                      </Button>
                    </Link>
                  )}
                </div>
              </nav>

              <div className="mt-auto pt-8 border-t border-zinc-100 dark:border-zinc-800">
                <p className="text-xs text-center text-zinc-400">
                  🌱 Green Bangladesh v0.1.0
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
