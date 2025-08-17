import { HttpClient } from "../client";
import type {
  Paged,
  TvShow,
  TvCredits,
  TvImages,
  GetTvQuery,
  GetTvCreditsQuery,
  GetTvImagesQuery,
  GetTvRecommendationsQuery,
  GetTvSimilarQuery,
} from "../types";

export class TvService {
  constructor(private http: HttpClient) {}

  getById(id: number, opts?: GetTvQuery) {
    return this.http.get<TvShow>(`/tv/${id}`, opts);
  }

  credits(id: number, opts?: GetTvCreditsQuery) {
    return this.http.get<TvCredits>(`/tv/${id}/credits`, opts);
  }

  images(id: number, opts?: GetTvImagesQuery) {
    return this.http.get<TvImages>(`/tv/${id}/images`, opts);
  }

  recommendations(id: number, opts?: GetTvRecommendationsQuery) {
    return this.http.get<Paged<TvShow>>(`/tv/${id}/recommendations`, opts);
  }

  similar(id: number, opts?: GetTvSimilarQuery) {
    return this.http.get<Paged<TvShow>>(`/tv/${id}/similar`, opts);
  }
}
