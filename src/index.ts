import type { TMDBOptions } from "./client";
import { HttpClient } from "./client";
import {
  MovieService,
  TvService,
  SearchService,
  TrendingService,
  ConfigurationService,
} from "./services";

export class TMDB {
  readonly movie: MovieService;
  readonly tv: TvService;
  readonly search: SearchService;
  readonly trending: TrendingService;
  readonly config: ConfigurationService;

  constructor(options: TMDBOptions) {
    if (!options.apiKey) {
      throw new Error("TMDB: apiKey is required for v3.");
    }
    const http = new HttpClient(options);
    this.movie = new MovieService(http);
    this.tv = new TvService(http);
    this.search = new SearchService(http);
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
  Paged
} from "./types";
