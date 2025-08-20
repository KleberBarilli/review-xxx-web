// app/(auth)/signup/page.tsx
import { getTranslations } from "next-intl/server";
import SignupForm from "@/components/auth/SignupForm";

export default async function SignupPage() {
  const t = await getTranslations("signup");

  return (
    <section className="relative">
      <div className="mx-auto max-w-6xl px-4 py-12 text-center sm:py-16">
        <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          {t("title")}
        </h1>
        <p className="text-foreground/80 mx-auto mt-3 max-w-md">{t("subtitle")}</p>

        <div className="border-foreground/10 bg-background/60 mx-auto mt-10 max-w-md rounded-2xl border p-6 shadow-sm backdrop-blur sm:p-8">
          <SignupForm />
        </div>
      </div>
    </section>
  );
}
