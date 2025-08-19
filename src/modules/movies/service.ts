import type { HttpClient } from "../../core";
import type {
  Movie,
  MovieCredits,
  MovieImages,
  GetMovieOptions,
  GetMovieCreditsOptions,
  GetMovieImagesOptions,
  GetMovieRecommendationsOptions,
  GetMovieSimilarOptions,
  MovieRecommendationsResponse,
  MovieSimilarResponse,
} from "./types";

/**
 * Internal service for TMDB movie endpoints.
 * Not exposed to consumers — use the TMDB client facade instead.
 * @internal
 */
export class MoviesService {
  constructor(private readonly http: HttpClient) {}

  async get(id: number, options?: GetMovieOptions): Promise<Movie> {
    this.validateId(id);
    return this.http.get<Movie>(`/movie/${id}`, options);
  }

  async credits(id: number, options?: GetMovieCreditsOptions): Promise<MovieCredits> {
    this.validateId(id);
    return this.http.get<MovieCredits>(`/movie/${id}/credits`, options);
  }

  async images(id: number, options?: GetMovieImagesOptions): Promise<MovieImages> {
    this.validateId(id);
    return this.http.get<MovieImages>(`/movie/${id}/images`, options);
  }

  async recommendations(
    id: number,
    options?: GetMovieRecommendationsOptions
  ): Promise<MovieRecommendationsResponse> {
    this.validateId(id);
    return this.http.get<MovieRecommendationsResponse>(`/movie/${id}/recommendations`, options);
  }

  async similar(id: number, options?: GetMovieSimilarOptions): Promise<MovieSimilarResponse> {
    this.validateId(id);
    return this.http.get<MovieSimilarResponse>(`/movie/${id}/similar`, options);
  }

  /** Basic positive-integer guard for IDs. */
  private validateId(id: number): void {
    if (!Number.isInteger(id) || id <= 0) {
      throw new Error("Invalid TMDB movie id. Expected a positive integer.");
    }
  }
}
