import type { HttpClient } from "../../core";
import { validateQuery } from "../../shared/validation";
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
    validateQuery(query);
    return this.http.get<MovieSearchResults>("/search/movie", {
      query: query.trim(),
      ...options,
    });
  }

  async searchTv(query: string, options?: GetTvSearchOptions): Promise<TvSearchResults> {
    validateQuery(query);
    return this.http.get<TvSearchResults>("/search/tv", {
      query: query.trim(),
      ...options,
    });
  }

  async searchPeople(
    query: string,
    options?: GetPeopleSearchOptions
  ): Promise<PeopleSearchResults> {
    validateQuery(query);
    return this.http.get<PeopleSearchResults>("/search/person", {
      query: query.trim(),
      ...options,
    });
  }

  async searchMulti(query: string, options?: GetMultiSearchOptions): Promise<MultiSearchResults> {
    validateQuery(query);
    return this.http.get<MultiSearchResults>("/search/multi", {
      query: query.trim(),
      ...options,
    });
  }
}
