"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { fetchFeaturedGames } from "@/lib/igdb.client";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";

export default function FeaturedGames() {
  const tCommon = useTranslations("common");
  const [data, setData] = useState<Awaited<ReturnType<typeof fetchFeaturedGames>>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setData(await fetchFeaturedGames());
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div className="text-muted-foreground text-sm">{tCommon("loading")}</div>;

  return (
    <section aria-labelledby="upcoming-heading" className="mx-auto max-w-5xl px-4 sm:px-6">
      <header className="mb-4 flex items-baseline justify-between">
        <h2 id="upcoming-heading" className="text-base font-semibold">
          {tCommon("upcomings")}
        </h2>
      </header>

      <div className="grid [grid-template-columns:repeat(auto-fit,minmax(160px,1fr))] justify-center gap-4">
        {data.map((g, i) => (
          <a
            key={g.id}
            href={g.url ?? "#"}
            target="_blank"
            rel="noreferrer"
            className="group border-foreground/10 bg-card rounded-xl border shadow-sm transition hover:shadow-md"
          >
            <div className="relative aspect-[2/3] overflow-hidden rounded-t-xl">
              {g.cover ? (
                <Image
                  src={g.cover}
                  alt={g.name}
                  fill
                  sizes="(min-width:1024px) 160px, (min-width:768px) 25vw, 45vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  priority={i < 4}
                />
              ) : (
                <div className="text-muted-foreground grid h-full w-full place-items-center text-xs">
                  No cover
                </div>
              )}
            </div>
            <div className="p-2">
              <div className="line-clamp-1 text-sm font-medium">{g.name}</div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
