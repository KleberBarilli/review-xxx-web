"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";

type Props = { className?: string };

export default function SearchGames({ className = "" }: Props) {
  const t = useTranslations("nav");
  const router = useRouter();
  const [q, setQ] = useState("");

  function submit(e?: React.FormEvent) {
    e?.preventDefault();
    const query = q.trim();
    router.push({ pathname: "/games", query: query ? { q: query } : {} });
  }

  return (
    <form
      onSubmit={submit}
      role="search"
      aria-label={t("search", { default: "Search" })}
      className={`relative ${className}`}
    >
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={t("search_placeholder", { default: "Search games..." })}
        className="border-foreground/10 bg-background/60 focus:border-primary/40 focus:ring-primary/30 w-full rounded-full border py-2 pr-10 pl-9 text-sm transition outline-none focus:ring-2"
      />
      <button
        type="submit"
        className="text-foreground/60 hover:text-primary absolute top-1/2 left-2 inline-flex h-5 w-5 -translate-y-1/2 items-center justify-center"
        aria-label={t("search", { default: "Search" })}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-5.2-5.2M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z"
          />
        </svg>
      </button>
      {q && (
        <button
          type="button"
          onClick={() => setQ("")}
          aria-label={t("clear", { default: "Clear" })}
          className="text-foreground/50 hover:text-foreground/80 absolute top-1/2 right-2 -translate-y-1/2 rounded-full p-1"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-4 w-4">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </form>
  );
}
