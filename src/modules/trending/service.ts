import type { HttpClient } from "../../core";
import type { TrendingAll, GetTrendingAllOptions } from "./types";

/**
 * Internal service for TMDB trending endpoints.
 * Not exposed to users — use the TMDB factory instead.
 * @internal
 */
export class TrendingService {
  constructor(private http: HttpClient) {}

  async getDailyTrending(opts?: GetTrendingAllOptions): Promise<TrendingAll> {
    return this.http.get<TrendingAll>(`/trending/all/day`, opts);
  }

  async getWeeklyTrending(opts?: GetTrendingAllOptions): Promise<TrendingAll> {
    return this.http.get<TrendingAll>(`/trending/all/week`, opts);
  }
}
