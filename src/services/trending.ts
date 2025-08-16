import type { HttpClient } from "../client";

import type { Paged, TrendingAllItem } from "./types";

export class TrendingService {
  constructor(private http: HttpClient) {}

  daily(opts?: { page?: number; language?: string }) {
    return this.http.get<Paged<TrendingAllItem>>(`/trending/all/day`, opts);
  }

  weekly(opts?: { page?: number; language?: string }) {
    return this.http.get<Paged<TrendingAllItem>>(`/trending/all/week`, opts);
  }
}
