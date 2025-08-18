export { default } from "next-intl/middleware";

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
  locales: ["en", "pt"],
  defaultLocale: "en",
};
