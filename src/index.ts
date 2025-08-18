import type { TMDBOptions } from "./client";
import { HttpClient } from "./client";
import {
  MovieService,
  TvService,
  SearchService,
  TrendingService,
  ConfigurationService,
} from "./services";

import type {
  MovieSearchOptions,
  TvSearchOptions,
  SearchMovieResponse,
  SearchTvResponse,
  PersonSearchOptions,
  SearchPersonResponse,
  MultiSearchOptions,
  MultiSearchResponse,
} from "./types";

/**
 * Main TMDB API client providing access to all TMDB endpoints.
 *
 * @example
 * ```typescript
 * const tmdb = new TMDB({ apiKey: 'your-api-key' });
 *
 * // Search for movies
 * const movies = await tmdb.search.movies('inception');
 *
 * // Get movie details
 * const movie = await tmdb.movie.details(550);
 *
 * // Get trending content
 * const trending = await tmdb.trending.all('week');
 * ```
 */
export class TMDB {
  readonly movie: MovieService;
  readonly tv: TvService;
  readonly search: {
    /**
     * Search for movies by title or keywords.
     *
     * @param query - Movie title or keywords to search for
     * @param options - Additional search parameters
     * @returns Promise resolving to paginated movie search results
     */
    movies: (query: string, options?: MovieSearchOptions) => Promise<SearchMovieResponse>;

    /**
     * Search for TV shows by title or keywords.
     *
     * @param query - TV show title or keywords to search for
     * @param options - Additional search parameters
     * @returns Promise resolving to paginated TV show search results
     */
    tv: (query: string, options?: TvSearchOptions) => Promise<SearchTvResponse>;

    /**
     * Search for people (actors, directors, crew members) by name.
     *
     * @param query - Person's name to search for
     * @param options - Additional search parameters
     * @returns Promise resolving to paginated person search results
     */
    people: (query: string, options?: PersonSearchOptions) => Promise<SearchPersonResponse>;

    /**
     * Search across movies, TV shows, and people simultaneously.
     *
     * @param query - General search term
     * @param options - Additional search parameters
     * @returns Promise resolving to paginated mixed search results
     */
    multi: (query: string, options?: MultiSearchOptions) => Promise<MultiSearchResponse>;
  };
  readonly trending: TrendingService;
  readonly config: ConfigurationService;

  constructor(options: TMDBOptions) {
    if (!options.apiKey) {
      throw new Error("TMDB: apiKey is required for v3.");
    }
    const http = new HttpClient(options);
    this.movie = new MovieService(http);
    this.tv = new TvService(http);

    const searchService = new SearchService(http);
    this.search = {
      movies: (query: string, options?: MovieSearchOptions) =>
        searchService.searchMovies(query, options),
      tv: (query: string, options?: TvSearchOptions) => searchService.searchTv(query, options),
      people: (query: string, options?: PersonSearchOptions) =>
        searchService.searchPeople(query, options),
      multi: (query: string, options?: MultiSearchOptions) =>
        searchService.searchMulti(query, options),
    };

    this.trending = new TrendingService(http);
    this.config = new ConfigurationService(http);
  }
}

export type { TMDBOptions } from "./client";
export { TMDBError } from "./client";

/** ✅ Only re-export the public types (no SDK internals) */
export type {
  Movie,
  MovieCredits,
  Images,
  ImageFile,
  Genre,
  TvShow,
  TvCredits,
  TvImages,
  EpisodeSummary,
  Person,
  SearchMovie,
  SearchTv,
  SearchPerson,
  MultiSearchResult,
  TrendingAllItem,
  TrendingMovieItem,
  TrendingTvItem,
  TrendingPersonItem,
  TrendingItem,
  TrendingResponse,
  TrendingTimeWindow,
  TMDBConfiguration,
  Country,
  Language,
  JobGroup,
  TimezoneGroup,
  PrimaryTranslationsResponse,
  CreditCastMember,
  CreditCrewMember,
  Paged,
} from "./types";
