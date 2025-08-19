import type { HttpClient } from "../../core";
import type { TrendingAllResponse, GetTrendingAllOptions } from "./types";

/**
 * Internal service for TMDB trending endpoints.
 * Not exposed to users — use the TMDB factory instead.
 * @internal
 */
export class TrendingService {
  constructor(private http: HttpClient) {}

  async getDailyTrending(opts?: GetTrendingAllOptions): Promise<TrendingAllResponse> {
    return this.http.get<TrendingAllResponse>(`/trending/all/day`, opts);
  }

  async getWeeklyTrending(opts?: GetTrendingAllOptions): Promise<TrendingAllResponse> {
    return this.http.get<TrendingAllResponse>(`/trending/all/week`, opts);
  }
}
