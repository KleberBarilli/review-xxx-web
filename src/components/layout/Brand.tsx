"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

type BrandProps = {
  size?: "sm" | "md" | "lg";
  centered?: boolean;
  showTagline?: boolean;
  className?: string;
};

const sizes = {
  sm: 28,
  md: 44,
  lg: 64,
} as const;

export default function Brand({
  size = "md",
  centered = false,
  showTagline = false,
  className,
}: BrandProps) {
  const t = useTranslations("common");
  const h = sizes[size];

  return (
    <div
      className={cn(
        centered
          ? "flex flex-col items-center gap-2 text-center"
          : "inline-flex items-center gap-2",
        className,
      )}
    >
      <Link href="/" aria-label={t("brand")}>
        <Image src="/brand/logo.png" alt="" width={h} height={h} priority className="select-none" />
      </Link>

      {showTagline && <span className="text-foreground/60 text-xs">{t("tagline")}</span>}
    </div>
  );
}
