import "server-only";

const IGDB_BASE = "https://api.igdb.com/v4";

async function igdbFetch<T = unknown>(endpoint: string, query: string): Promise<T> {
  const token = process.env.IGDB_ACCESS_TOKEN;
  const clientId = process.env.IGDB_CLIENT_ID;
  if (!clientId) throw new Error("IGDB_CLIENT_ID not set");

  const res = await fetch(`${IGDB_BASE}/${endpoint}`, {
    method: "POST",
    headers: {
      "Client-ID": clientId,
      Authorization: `Bearer ${token}`,
      "Content-Type": "text/plain",
      Accept: "application/json",
    },
    body: query,
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`IGDB ${endpoint} ${res.status}: ${text}`);
  }
  return res.json() as Promise<T>;
}

export type IGDBGame = {
  id: number;
  name: string;
  slug?: string;
  url?: string;
  summary?: string;
  first_release_date?: number | null;
  cover?: { image_id: string } | null;
};

export function igdbImageUrl(imageId?: string, size: string = "t_cover_big"): string | null {
  return imageId ? `https://images.igdb.com/igdb/image/upload/${size}/${imageId}.jpg` : null;
}

export async function getGamesByIds(ids: number[]): Promise<IGDBGame[]> {
  if (!ids.length) return [];
  const q = `
    fields id,name,slug,url,summary,first_release_date,cover.image_id;
    where id = (${ids.join(",")});
    limit ${ids.length};
  `;
  return igdbFetch<IGDBGame[]>("games", q);
}
