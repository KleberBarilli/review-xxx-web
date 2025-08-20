"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Link } from "@/i18n/navigation";
import { Icon } from "@iconify/react"; // ícone colorido oficial
import Brand from "../layout/Brand";

export default function SigninForm() {
  const t = useTranslations("signin");
  const [loading, setLoading] = React.useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    //todo api call
    setTimeout(() => setLoading(false), 600);
  }

  return (
    <>
      <div className="mb-6 flex justify-center">
        <Brand centered size="lg" showTagline className="select-none" />
      </div>
      <Button
        asChild
        variant="outline"
        size="lg"
        className="border-foreground/10 mb-6 w-full gap-2 rounded-xl border bg-white text-black shadow-sm hover:bg-white/90 focus-visible:ring-2 focus-visible:ring-black/20"
      >
        <a
          href="/api/auth/google"
          aria-label={t("withGoogleAria")}
          className="inline-flex items-center gap-2"
        >
          <Icon icon="logos:google-icon" width={18} height={18} aria-hidden className="shrink-0" />
          {t("withGoogle")}
        </a>
      </Button>

      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <span className="bg-foreground/10 h-px w-full" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-background text-foreground/60 px-2 text-xs">{t("or")}</span>
        </div>
      </div>

      <form onSubmit={onSubmit} className="grid gap-4 text-left">
        <div className="grid gap-1.5">
          <label htmlFor="identifier" className="text-sm font-medium">
            {t("identifier.label")}
          </label>
          <Input
            id="identifier"
            name="identifier"
            autoComplete="username"
            placeholder={t("identifier.placeholder")}
            required
          />
        </div>

        <div className="grid gap-1.5">
          <label htmlFor="password" className="text-sm font-medium">
            {t("password.label")}
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder={t("password.placeholder")}
            required
          />
        </div>

        <Button type="submit" size="lg" className="mt-2 w-full rounded-xl" disabled={loading}>
          {loading ? t("submitting") : t("submit")}
        </Button>
        <p className="text-foreground/60 mt-1 text-center text-xs">
          {t("noAccount")}{" "}
          <Link href="/signup" className="hover:text-foreground underline underline-offset-4">
            {t("signup")}
          </Link>
        </p>
      </form>
    </>
  );
}
