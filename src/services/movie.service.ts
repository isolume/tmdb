import { HttpClient } from "../client";
import type {
  Paged,
  Movie,
  MovieCredits,
  Images,
  GetMovieQuery,
  GetMovieCreditsQuery,
  GetMovieImagesQuery,
  GetMovieRecommendationsQuery,
  GetMovieSimilarQuery,
} from "../types";

export class MovieService {
  constructor(private http: HttpClient) {}

  getById(id: number, opts?: GetMovieQuery) {
    return this.http.get<Movie>(`/movie/${id}`, opts);
  }

  credits(id: number, opts?: GetMovieCreditsQuery) {
    return this.http.get<MovieCredits>(`/movie/${id}/credits`, opts);
  }

  images(id: number, opts?: GetMovieImagesQuery) {
    return this.http.get<Images>(`/movie/${id}/images`, opts);
  }

  recommendations(id: number, opts?: GetMovieRecommendationsQuery) {
    return this.http.get<Paged<Movie>>(`/movie/${id}/recommendations`, opts);
  }

  similar(id: number, opts?: GetMovieSimilarQuery) {
    return this.http.get<Paged<Movie>>(`/movie/${id}/similar`, opts);
  }
}
