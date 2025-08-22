export type ApiErrorBody = { code?: string } | null | undefined;

export async function extractErrorCode(res: Response): Promise<string | null> {
  try {
    const data = (await res.clone().json()) as ApiErrorBody;
    const raw = (data?.code ?? "").toString().trim();
    return raw.length ? raw.toUpperCase() : null;
  } catch {
    return null;
  }
}

export function codeFromUnknown(err: unknown): string {
  return "E-0000";
}
