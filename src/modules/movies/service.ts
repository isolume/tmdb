import type { HttpClient } from "../../core";
import { validateId } from "../../shared/validation";
import type {
  Movie,
  MovieCredits,
  MovieImages,
  GetMovieOptions,
  GetMovieCreditsOptions,
  GetMovieImagesOptions,
  GetRecommendedMoviesOptions,
  GetSimilarMoviesOptions,
  RecommendedMovies,
  SimilarMovies,
} from "./types";

/**
 * Internal service for TMDB movie endpoints.
 * Not exposed to consumers — use the TMDB client facade instead.
 * @internal
 */
export class MoviesService {
  constructor(private readonly http: HttpClient) {}

  async get(id: number, options?: GetMovieOptions): Promise<Movie> {
    validateId(id);
    return this.http.get<Movie>(`/movie/${id}`, options);
  }

  async credits(id: number, options?: GetMovieCreditsOptions): Promise<MovieCredits> {
    validateId(id);
    return this.http.get<MovieCredits>(`/movie/${id}/credits`, options);
  }

  async images(id: number, options?: GetMovieImagesOptions): Promise<MovieImages> {
    validateId(id);
    return this.http.get<MovieImages>(`/movie/${id}/images`, options);
  }

  async recommendations(
    id: number,
    options?: GetRecommendedMoviesOptions
  ): Promise<RecommendedMovies> {
    validateId(id);
    return this.http.get<RecommendedMovies>(`/movie/${id}/recommendations`, options);
  }

  async similar(id: number, options?: GetSimilarMoviesOptions): Promise<SimilarMovies> {
    validateId(id);
    return this.http.get<SimilarMovies>(`/movie/${id}/similar`, options);
  }
}
