"use client";
import { useTranslations } from "next-intl";

export function useErrorMessage() {
  const t = useTranslations("errors");

  return (code?: string | null, fallback?: string) => {
    const key = (code || "UNKNOWN").toUpperCase();
    const translated = t(key as any);
    if (!translated || translated === key) {
      return fallback ?? t("UNKNOWN" as any);
    }
    return translated;
  };
}
