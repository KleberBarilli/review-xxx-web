"use client";
import { useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";

export default function Navbar() {
  const t = useTranslations("nav");
  const router = useRouter();
  const pathname = usePathname();

  const changeLocale = (locale: "en" | "pt") => {
    router.replace({ pathname }, { locale });
  };

  return (
    <header className="flex items-center justify-between py-4">
      <Link href="/" className="text-lg font-semibold">
        {t("home")} {/* ou t de common.brand se preferir */}
      </Link>

      <nav className="flex items-center gap-4">
        <Link href="/">{t("home")}</Link>
        <Link href="/logs">{t("logs")}</Link>
        <Link href="/lists">{t("lists")}</Link>
        <Link href="/reviews">{t("reviews")}</Link>
        <Link href="/likes">{t("likes")}</Link>

        <div className="ml-4 flex items-center gap-2">
          <span className="text-sm opacity-70">{t("language")}:</span>
          <button
            onClick={() => changeLocale("en")}
            className="rounded px-2 py-1 hover:bg-white/10"
          >
            EN
          </button>
          <button
            onClick={() => changeLocale("pt")}
            className="rounded px-2 py-1 hover:bg-white/10"
          >
            PT
          </button>
        </div>
      </nav>
    </header>
  );
}
