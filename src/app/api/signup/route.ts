import { API_URL } from "@/constants/config";

export async function POST(request: Request) {
  const body = await request.json();

  const upstream = await fetch(`${API_URL}/users/signup`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });

  const text = await upstream.text();

  const res = new Response(text, {
    status: upstream.status,
    headers: {
      "content-type": upstream.headers.get("content-type") ?? "application/json",
    },
  });

  const setCookie = upstream.headers.get("set-cookie");
  if (setCookie) res.headers.set("set-cookie", setCookie);

  return res;
}
