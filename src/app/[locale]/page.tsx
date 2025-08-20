import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/Button";
import UpComingGames from "@/components/home/UpcomingGames";

export default async function Home() {
  const tHome = await getTranslations("home");
  const tCommon = await getTranslations("common");

  return (
    <section className="relative">
      <div className="from-primary/10 pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b to-transparent" />
      <div className="mx-auto max-w-6xl px-4 py-12 text-center sm:py-16">
        <div className="border-foreground/10 bg-background/60 text-foreground/70 mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs backdrop-blur">
          <span className="bg-primary inline-block h-2 w-2 rounded-full" />
          {tCommon("brand")}
        </div>

        <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
          {tHome("title")}
        </h1>

        <p className="text-foreground/80 mx-auto mt-3 max-w-2xl text-pretty sm:text-lg">
          {tHome("description")}
        </p>

        <div className="border-foreground/10 bg-background/60 mx-auto mt-10 max-w-3xl rounded-2xl border p-5 shadow-sm backdrop-blur sm:p-6">
          <p className="text-foreground/70 text-sm">{tHome("soon")}</p>
        </div>

        <div className="mt-10 flex justify-center">
          <Button
            asChild
            variant="secondary"
            size="lg"
            className="rounded-2xl px-10 py-5 text-lg shadow-[0_2px_10px_rgba(0,0,0,.35)]"
          >
            <a
              href="/signup"
              className="inline-flex items-center gap-3 font-bold text-white"
              aria-label={`${tHome("cta")}`}
            >
              <span>{tHome("cta")}</span>
            </a>
          </Button>
        </div>
        <UpComingGames />
      </div>
    </section>
  );
}
