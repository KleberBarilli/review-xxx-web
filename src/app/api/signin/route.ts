import { API_URL } from "@/constants/config";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const upstreamBody = body;

  const upstream = await fetch(`${API_URL}/users/signin`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(upstreamBody),
    cache: "no-store",
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
