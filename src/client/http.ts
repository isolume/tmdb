import type { TMDBOptions } from "./types";
import { TMDBError, type TMDBErrorBody } from "./error";

const DEFAULT_BASE = "https://api.themoviedb.org/3";

export class HttpClient {
  private baseUrl: string;
  private apiKey?: string;
  private language?: string;
  private region?: string;

  constructor(opts: TMDBOptions) {
    this.baseUrl = opts.baseUrl ?? DEFAULT_BASE;
    this.apiKey = opts.apiKey;
    this.language = opts.language;
    this.region = opts.region;
  }

  private qs(params?: Record<string, unknown>): string {
    if (!params) return "";
    const sp = new URLSearchParams();
    for (const [k, v] of Object.entries(params)) {
      if (v === undefined || v === null || v === "") continue;
      if (Array.isArray(v)) {
        if (v.length) sp.set(k, v.join(","));
        continue;
      }
      sp.set(k, String(v));
    }
    const s = sp.toString();
    return s ? `?${s}` : "";
  }

  async get<T>(path: string, params?: Record<string, unknown>): Promise<T> {
    const query = {
      ...params,
      language: params?.language ?? this.language,
      region: params?.region ?? this.region,
      ...(this.apiKey ? { api_key: this.apiKey } : {}),
    };

    const url = this.baseUrl + path + this.qs(query);

    const res = await fetch(url, {
      method: "GET",
      headers: { Accept: "application/json" },
    });

    if (!res.ok) {
      let body: TMDBErrorBody | undefined;
      try {
        body = (await res.json()) as TMDBErrorBody;
      } catch {}
      const msg = body?.status_message || `TMDB request failed (${res.status})`;
      throw new TMDBError(msg, { status: res.status, code: body?.status_code });
    }

    return (await res.json()) as T;
  }
}
