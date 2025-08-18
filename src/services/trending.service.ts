import type { HttpClient } from "../client";
import type { Paged, TrendingAllItem, GetTrendingAllQuery } from "../types";

export class TrendingService {
  constructor(private http: HttpClient) {}

  daily(opts?: GetTrendingAllQuery) {
    return this.http.get<Paged<TrendingAllItem>>(`/trending/all/day`, opts);
  }

  weekly(opts?: GetTrendingAllQuery) {
    return this.http.get<Paged<TrendingAllItem>>(`/trending/all/week`, opts);
  }
}
