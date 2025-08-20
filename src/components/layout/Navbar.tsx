"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import SearchGames from "../search/SearchGames";

export default function Navbar() {
  const n = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => pathname === href;
  const linkClass = (href: string) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors
     ${isActive(href) ? "text-primary" : "text-foreground/80 hover:text-primary"}`;

  return (
    <header className="border-foreground/10 bg-background/80 sticky top-0 z-50 w-full border-b backdrop-blur">
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="text-primary text-lg font-semibold">
          Review XXX
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          <Link href="/" className={linkClass("/")}>
            {n("home")}
          </Link>
          <Link href="/signIn" className={linkClass("/signIn")}>
            {n("signIn")}
          </Link>
          <Link href="/signUp" className={linkClass("/signUp")}>
            {n("signUp")}
          </Link>
          <Link href="/games" className={linkClass("/games")}>
            {n("games")}
          </Link>
          <SearchGames className="ml-2 w-40 lg:w-64" />
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="hover:bg-foreground/5 inline-flex h-10 w-10 items-center justify-center rounded-md md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label="Toggle menu"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor">
            <path
              d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </nav>

      <div
        id="mobile-menu"
        className={`md:hidden ${open ? "block" : "hidden"} border-foreground/10 bg-background border-t`}
      >
        <div className="mx-auto max-w-6xl px-4 py-2">
          <ul className="flex flex-col gap-1 py-2">
            <li>
              <Link href="/" className={linkClass("/") + " block"} onClick={() => setOpen(false)}>
                {n("home")}
              </Link>
            </li>
            <li>
              <Link
                href="/signIn"
                className={linkClass("/signIn") + " block"}
                onClick={() => setOpen(false)}
              >
                {n("signIn")}
              </Link>
            </li>
            <li>
              <Link
                href="/signUp"
                className={linkClass("/signUp") + " block"}
                onClick={() => setOpen(false)}
              >
                {n("signUp")}
              </Link>
            </li>
            <li>
              <Link
                href="/games"
                className={linkClass("/games") + " block"}
                onClick={() => setOpen(false)}
              >
                {n("games")}
              </Link>
            </li>
            <li className="mt-2">
              <SearchGames className="w-full" />
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
