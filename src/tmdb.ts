import { HttpClient } from "./core/http";
import { TMDBError } from "./core/errors";

import { MoviesService } from "./modules/movies/service";
import { TvService } from "./modules/tv/service";
import { SearchService } from "./modules/search/service";
import { TrendingService } from "./modules/trending/service";
import { ConfigurationService } from "./modules/configuration/service";

import type {
  GetMovieOptions,
  GetMovieCreditsOptions,
  GetMovieImagesOptions,
  GetMovieRecommendationsOptions,
  GetMovieSimilarOptions,
  Movie,
  MovieCredits,
  MovieImages,
  MovieRecommendationsResponse,
  MovieSimilarResponse,
} from "./modules/movies/types";

import type {
  GetTvOptions,
  GetTvCreditsOptions,
  GetTvImagesOptions,
  GetTvRecommendationsOptions,
  GetTvSimilarOptions,
  TvShow,
  TvCredits,
  TvImages,
  TvRecommendationsResponse,
  TvSimilarResponse,
} from "./modules/tv/types";

import type {
  MovieSearchOptions,
  TvSearchOptions,
  PersonSearchOptions,
  MultiSearchOptions,
  SearchMovieResponse,
  SearchTvResponse,
  SearchPersonResponse,
  MultiSearchResponse,
} from "./modules/search/types";

import type { GetTrendingAllOptions, TrendingAllResponse } from "./modules/trending/types";

import type {
  GetConfigurationOptions,
  GetCountriesOptions,
  TMDBConfiguration,
  Country,
  JobGroup,
  Language,
  TimezoneGroup,
} from "./modules/configuration/types";

import type { TMDBOptions } from "./shared/common";

export class TMDB {
  readonly movies: {
    get: (id: number, options?: GetMovieOptions) => Promise<Movie>;
    credits: (id: number, options?: GetMovieCreditsOptions) => Promise<MovieCredits>;
    images: (id: number, options?: GetMovieImagesOptions) => Promise<MovieImages>;
    recommendations: (
      id: number,
      options?: GetMovieRecommendationsOptions
    ) => Promise<MovieRecommendationsResponse>;
    similar: (id: number, options?: GetMovieSimilarOptions) => Promise<MovieSimilarResponse>;
  };

  readonly tv: {
    get: (id: number, options?: GetTvOptions) => Promise<TvShow>;
    credits: (id: number, options?: GetTvCreditsOptions) => Promise<TvCredits>;
    images: (id: number, options?: GetTvImagesOptions) => Promise<TvImages>;
    recommendations: (
      id: number,
      options?: GetTvRecommendationsOptions
    ) => Promise<TvRecommendationsResponse>;
    similar: (id: number, options?: GetTvSimilarOptions) => Promise<TvSimilarResponse>;
  };

  readonly trending: {
    daily: (options?: GetTrendingAllOptions) => Promise<TrendingAllResponse>;
    weekly: (options?: GetTrendingAllOptions) => Promise<TrendingAllResponse>;
  };

  readonly configuration: {
    get: (options?: GetConfigurationOptions) => Promise<TMDBConfiguration>;
    countries: (options?: GetCountriesOptions) => Promise<Country[]>;
    jobs: () => Promise<JobGroup[]>;
    languages: () => Promise<Language[]>;
    timezones: () => Promise<TimezoneGroup[]>;
  };

  readonly search: {
    movies: (query: string, options?: MovieSearchOptions) => Promise<SearchMovieResponse>;
    tv: (query: string, options?: TvSearchOptions) => Promise<SearchTvResponse>;
    people: (query: string, options?: PersonSearchOptions) => Promise<SearchPersonResponse>;
    multi: (query: string, options?: MultiSearchOptions) => Promise<MultiSearchResponse>;
  };

  private readonly http: HttpClient;

  constructor(opts: TMDBOptions) {
    if (!opts?.apiKey?.trim()) {
      throw new TMDBError("API key is required.", { status: 401 });
    }

    this.http = new HttpClient({
      apiKey: opts.apiKey,
      baseUrl: opts.baseUrl ?? "https://api.themoviedb.org/3",
      language: opts.language ?? "en-US",
      timeout: opts.timeout ?? 20_000,
    });

    const movies = new MoviesService(this.http);
    const tv = new TvService(this.http);
    const search = new SearchService(this.http);
    const trending = new TrendingService(this.http);
    const configuration = new ConfigurationService(this.http);

    this.movies = {
      get: (id, options) => movies.get(id, options),
      credits: (id, options) => movies.credits(id, options),
      images: (id, options) => movies.images(id, options),
      recommendations: (id, options) => movies.recommendations(id, options),
      similar: (id, options) => movies.similar(id, options),
    };

    this.tv = {
      get: (id, options) => tv.getById(id, options),
      credits: (id, options) => tv.credits(id, options),
      images: (id, options) => tv.images(id, options),
      recommendations: (id, options) => tv.recommendations(id, options),
      similar: (id, options) => tv.similar(id, options),
    };

    this.trending = {
      daily: (options) => trending.getDailyTrending(options),
      weekly: (options) => trending.getWeeklyTrending(options),
    };

    this.configuration = {
      get: (options) => configuration.getConfig(options),
      countries: (options) => configuration.countries(options),
      jobs: () => configuration.jobs(),
      languages: () => configuration.languages(),
      timezones: () => configuration.timezones(),
    };

    this.search = {
      movies: (q, options) => search.searchMovies(q, options),
      tv: (q, options) => search.searchTv(q, options),
      people: (q, options) => search.searchPeople(q, options),
      multi: (q, options) => search.searchMulti(q, options),
    };
  }
}
