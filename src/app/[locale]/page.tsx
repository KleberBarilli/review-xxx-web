import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function Home() {
  const tHome = await getTranslations("home");
  const tCommon = await getTranslations("common");
  const tNav = await getTranslations("nav");

  return (
    <section className="relative">
      {/* faixa suave no topo */}
      <div className="from-primary/10 pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b to-transparent" />

      <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
        {/* badge/brand */}
        <div className="border-foreground/10 bg-background/60 text-foreground/70 mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs backdrop-blur">
          <span className="bg-primary inline-block h-2 w-2 rounded-full" />
          {tCommon("brand")}
        </div>

        {/* título + subtítulo */}
        <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
          {tHome("title")}
        </h1>
        <p className="text-foreground/80 mt-3 max-w-2xl text-pretty sm:text-lg">
          {tHome("subtitle")}
        </p>

        {/* ações */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href="/about"
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-5 py-2.5 text-sm font-medium transition-colors"
          >
            {tNav("about")}
          </Link>

          <Link
            href="/contact"
            className="border-foreground/15 text-foreground hover:bg-foreground/5 rounded-md border px-5 py-2.5 text-sm font-medium transition-colors"
          >
            {tNav("contact")}
          </Link>
        </div>

        {/* bloco destaque/”card” */}
        <div className="border-foreground/10 bg-background/60 mt-10 rounded-2xl border p-5 shadow-sm backdrop-blur sm:p-6">
          <p className="text-foreground/70 text-sm">
            {tHome("subtitle")} {/* reuse do subtítulo como pequeno parágrafo */}
          </p>
        </div>
      </div>
    </section>
  );
}
