import "@/app/globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Navbar from "@/components/Navbar";

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="min-h-screen">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Navbar />
          <div className="mx-auto max-w-5xl px-4 py-6">{children}</div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
