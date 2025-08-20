"use client";

import { useTransition } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/DropdownMenu";
import { ChevronDown, Check, Loader2 } from "lucide-react";
import { FlagUS, FlagBR } from "@/components/icons/flags";

type AppLocale = "en" | "pt";
const LABELS: Record<AppLocale, string> = {
  en: "English (US)",
  pt: "Português (BR)",
};
const FLAGS = { en: FlagUS, pt: FlagBR };

export default function FooterLanguageToggle() {
  const current = (useLocale() as AppLocale) ?? "en";
  const router = useRouter();
  const pathname = usePathname();
  const [pending, startTransition] = useTransition();

  const changeLocale = (code: AppLocale) => {
    if (code === current) return;
    startTransition(() => router.replace({ pathname }, { locale: code }));
  };

  const Flag = FLAGS[current];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          disabled={pending}
          className="text-muted-foreground hover:text-foreground h-8 gap-2"
          aria-label={current === "pt" ? "Alterar idioma" : "Change language"}
          title={current === "pt" ? "Alterar idioma" : "Change language"}
        >
          {pending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Flag className="h-3.5 w-5 rounded-[2px]" />
          )}
          <span className="hidden sm:inline">{LABELS[current]}</span>
          <ChevronDown className="h-4 w-4 opacity-60" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" sideOffset={6} className="w-48">
        <DropdownMenuLabel>{current === "pt" ? "Idioma" : "Language"}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {(["en", "pt"] as AppLocale[]).map((code) => {
          const ItemFlag = FLAGS[code];
          return (
            <DropdownMenuItem
              key={code}
              onClick={() => changeLocale(code)}
              className="cursor-pointer"
            >
              <ItemFlag className="mr-2 h-4 w-6 rounded-[2px]" />
              <span className="flex-1">{LABELS[code]}</span>
              {code === current && <Check className="h-4 w-4 opacity-60" />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
