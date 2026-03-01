'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("clarity_token");
    setIsLoggedIn(!!token);
  }, []);

  const isActive = (path: string) => pathname === path;

  const handleLogout = () => {
    localStorage.removeItem("clarity_token");
    setIsLoggedIn(false);
    router.push("/login");
  };

  const navLink =
    "relative text-sm font-medium transition-colors duration-200";

  const activeLink =
    "text-primary after:absolute after:-bottom-2 after:left-0 after:w-full after:h-[2px] after:bg-primary";

  const inactiveLink =
    "text-muted-foreground hover:text-foreground";

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/50">
      {/* subtle gradient glow */}
      <div className="absolute inset-0  pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* ================= LOGO ================= */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-indigo-600 flex items-center justify-center shadow-md group-hover:scale-105 transition">
            <span className="text-white font-bold text-lg">C</span>
          </div>

          <h1 className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition">
            CLARITY
          </h1>
        </Link>

        {/* ================= NAV ================= */}
        <nav className="flex items-center gap-8">

          {isLoggedIn ? (
            <>
              <Link
                href="/"
                className={`${navLink} ${isActive('/') ? activeLink : inactiveLink}`}
              >
                Home
              </Link>

              <Link
                href="/upload"
                className={`${navLink} ${isActive('/upload') ? activeLink : inactiveLink}`}
              >
                Upload
              </Link>

              <Link
                href="/history"
                className={`${navLink} ${isActive('/history') ? activeLink : inactiveLink}`}
              >
                History
              </Link>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg border border-border text-sm font-medium
                text-muted-foreground hover:text-red-600 hover:border-red-200
                hover:bg-red-50 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition"
              >
                Login
              </Link>

              <Link
                href="/signup"
                className="px-4 py-2 rounded-lg text-sm font-semibold
                bg-primary text-primary-foreground shadow-md
                hover:bg-primary/90 hover:shadow-lg transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}