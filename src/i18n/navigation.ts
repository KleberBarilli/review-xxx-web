import { createNavigation } from "next-intl/navigation";

export const locales = ["en", "pt"] as const;
export const localePrefix = "always";

export const { Link, usePathname, useRouter, redirect } = createNavigation({
  locales,
  localePrefix,
});
