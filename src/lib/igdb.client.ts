export const FEATURED_IDS = [317407, 115289, 347668, 222343, 52189] as const;

export type SimpleGame = {
  id: number;
  name: string;
  slug?: string;
  url?: string;
  summary?: string;
  firstReleaseDate?: number | null;
  cover: string | null;
};

export async function fetchGamesByIds(ids: number[]) {
  const url = `/api/games?ids=${ids.join(",")}`;
  const res = await fetch(url, { cache: "force-cache" });
  if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
  return res.json();
}

export async function fetchFeaturedGames(): Promise<SimpleGame[]> {
  return fetchGamesByIds([...FEATURED_IDS]);
}
