// client/lib/api.ts
export const API_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5294";

const TOKEN_KEY = "access"; // you’re currently storing the token under "access"

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export async function apiFetch<T>(
  path: string,
  opts: { method?: HttpMethod; body?: any; headers?: HeadersInit } = {}
): Promise<T> {
  const token =
    typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null;

  const res = await fetch(`${API_URL}${path}`, {
    method: opts.method ?? "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...opts.headers,
    },
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  });

  if (res.status === 401) throw new Error("Unauthorized");
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Request failed");
  }
  const json = await res.json().catch(() => ({}));
  return (json?.data ?? json) as T;
}
