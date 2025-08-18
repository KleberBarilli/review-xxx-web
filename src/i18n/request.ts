import { getRequestConfig } from "next-intl/server";
import type { AbstractIntlMessages } from "next-intl";

export default getRequestConfig(async ({ locale }) => {
  if (!locale) {
    throw new Error("Locale is required");
  }
  const messages: AbstractIntlMessages = (await import(`@/messages/${locale}.json`)).default;

  return {
    locale,
    messages,
  };
});
