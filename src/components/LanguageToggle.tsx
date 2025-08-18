"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

export default function LanguageToggle() {
  const locale = (useLocale() as "en" | "pt") ?? "en";
  const router = useRouter();
  const pathname = usePathname();

  const next = locale === "en" ? "pt" : "en";
  const label = next === "pt" ? "Mudar para Português" : "Switch to English";
  const flag = next === "pt" ? "🇧🇷" : "🇺🇸";

  const switchLocale = () => {
    router.replace({ pathname }, { locale: next });
  };

  return (
    <button
      onClick={switchLocale}
      aria-label={label}
      title={label}
      className="border-foreground/10 hover:bg-foreground/5 inline-flex items-center gap-2 rounded-md border px-2.5 py-1.5 text-sm"
    >
      <span className="text-lg leading-none">{flag}</span>
      <span className="hidden font-medium sm:inline">{next.toUpperCase()}</span>
    </button>
  );
}
