import { getTranslations } from "next-intl/server";

export default async function Home() {
  const t = await getTranslations("home");
  return (
    <main>
      <h1 className="text-2xl font-semibold">{t("title")}</h1>
      <p className="mt-2 opacity-80">{t("subtitle")}</p>
    </main>
  );
}
