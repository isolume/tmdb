import type { HttpClient } from "../../core";
import type {
  MovieSearchResults,
  TvSearchResults,
  PeopleSearchResults,
  MultiSearchResults,
  GetMovieSearchOptions,
  GetTvSearchOptions,
  GetPeopleSearchOptions,
  GetMultiSearchOptions,
} from "./types";

/**
 * Internal service for TMDB search endpoints.
 * Not exposed to consumers - use TMDB client's search methods instead.
 * @internal
 */
export class SearchService {
  constructor(private readonly http: HttpClient) {}

  async searchMovies(query: string, options?: GetMovieSearchOptions): Promise<MovieSearchResults> {
    this.validateQuery(query);
    return this.http.get<MovieSearchResults>("/search/movie", {
      query: query.trim(),
      ...options,
    });
  }

  async searchTv(query: string, options?: GetTvSearchOptions): Promise<TvSearchResults> {
    this.validateQuery(query);
    return this.http.get<TvSearchResults>("/search/tv", {
      query: query.trim(),
      ...options,
    });
  }

  async searchPeople(
    query: string,
    options?: GetPeopleSearchOptions
  ): Promise<PeopleSearchResults> {
    this.validateQuery(query);
    return this.http.get<PeopleSearchResults>("/search/person", {
      query: query.trim(),
      ...options,
    });
  }

  async searchMulti(query: string, options?: GetMultiSearchOptions): Promise<MultiSearchResults> {
    this.validateQuery(query);
    return this.http.get<MultiSearchResults>("/search/multi", {
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
