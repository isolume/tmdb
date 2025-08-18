import type { HttpClient } from "../client";
import type {
  SearchMovieResponse,
  SearchTvResponse,
  SearchPersonResponse,
  MultiSearchResponse,
  MovieSearchOptions,
  TvSearchOptions,
  PersonSearchOptions,
  MultiSearchOptions,
} from "../types/search";

/**
 * Internal service for TMDB search endpoints.
 * Not exposed to consumers - use TMDB client's search methods instead.
 * @internal
 */
export class SearchService {
  constructor(private readonly http: HttpClient) {}

  async searchMovies(query: string, options?: MovieSearchOptions): Promise<SearchMovieResponse> {
    this.validateQuery(query);
    return this.http.get<SearchMovieResponse>("/search/movie", {
      query: query.trim(),
      ...options,
    });
  }

  async searchTv(query: string, options?: TvSearchOptions): Promise<SearchTvResponse> {
    this.validateQuery(query);
    return this.http.get<SearchTvResponse>("/search/tv", {
      query: query.trim(),
      ...options,
    });
  }

  async searchPeople(query: string, options?: PersonSearchOptions): Promise<SearchPersonResponse> {
    this.validateQuery(query);
    return this.http.get<SearchPersonResponse>("/search/person", {
      query: query.trim(),
      ...options,
    });
  }

  async searchMulti(query: string, options?: MultiSearchOptions): Promise<MultiSearchResponse> {
    this.validateQuery(query);
    return this.http.get<MultiSearchResponse>("/search/multi", {
      query: query.trim(),
      ...options,
    });
  }

  private validateQuery(query: string): void {
    if (!query?.trim()) {
      throw new Error("Search query cannot be empty");
    }
  }
}
