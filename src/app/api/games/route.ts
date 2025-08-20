import { NextResponse } from "next/server";
import { getGamesByIds, igdbImageUrl } from "@/lib/igdb";

export const revalidate = 60 * 60 * 24; // 86400s

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const raw = searchParams.get("ids") ?? "1942,1,3,4,5";
  const ids = [
    ...new Set(
      raw
        .split(",")
        .map((s) => Number(s.trim()))
        .filter(Boolean),
    ),
  ].slice(0, 50);

  const games = await getGamesByIds(ids);

  const order = new Map(ids.map((id, i) => [id, i]));
  const data = [...games]
    .sort((a, b) => order.get(a.id)! - order.get(b.id)!)
    .map((g) => ({
      id: g.id,
      name: g.name,
      slug: g.slug,
      url: g.url,
      summary: g.summary,
      firstReleaseDate: g.first_release_date,
      cover: igdbImageUrl(g.cover?.image_id, "t_cover_big"),
    }));

  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
