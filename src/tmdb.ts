import { HttpClient } from "./core";
import { TMDBError } from "./core";

import { MoviesService } from "./modules/movies/service";
import { TvService } from "./modules/tv/service";
import { SearchService } from "./modules/search/service";
import { TrendingService } from "./modules/trending/service";
import { ConfigurationService } from "./modules/configuration/service";

import type {
  GetMovieOptions,
  GetMovieCreditsOptions,
  GetMovieImagesOptions,
  GetRecommendedMoviesOptions,
  GetSimilarMoviesOptions,
  Movie,
  MovieCredits,
  MovieImages,
  RecommendedMovies,
  SimilarMovies,
} from "./modules/movies/types";

import type {
  GetTvShowOptions,
  GetTvCreditsOptions,
  GetTvImagesOptions,
  GetRecommendedTvShowsOptions,
  GetSimilarTvShowsOptions,
  TvShow,
  TvCredits,
  TvImages,
  RecommendedTvShows,
  SimilarTvShows,
} from "./modules/tv/types";

import type {
  GetMovieSearchOptions,
  GetTvSearchOptions,
  GetPeopleSearchOptions,
  GetMultiSearchOptions,
  MovieSearchResults,
  TvSearchResults,
  PeopleSearchResults,
  MultiSearchResults,
} from "./modules/search/types";

import type { GetTrendingAllOptions, TrendingAll } from "./modules/trending/types";

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
      options?: GetRecommendedMoviesOptions
    ) => Promise<RecommendedMovies>;
    similar: (id: number, options?: GetSimilarMoviesOptions) => Promise<SimilarMovies>;
  };

  readonly tv: {
    get: (id: number, options?: GetTvShowOptions) => Promise<TvShow>;
    credits: (id: number, options?: GetTvCreditsOptions) => Promise<TvCredits>;
    images: (id: number, options?: GetTvImagesOptions) => Promise<TvImages>;
    recommendations: (
      id: number,
      options?: GetRecommendedTvShowsOptions
    ) => Promise<RecommendedTvShows>;
    similar: (id: number, options?: GetSimilarTvShowsOptions) => Promise<SimilarTvShows>;
  };

  readonly trending: {
    daily: (options?: GetTrendingAllOptions) => Promise<TrendingAll>;
    weekly: (options?: GetTrendingAllOptions) => Promise<TrendingAll>;
  };

  readonly configuration: {
    get: (options?: GetConfigurationOptions) => Promise<TMDBConfiguration>;
    countries: (options?: GetCountriesOptions) => Promise<Country[]>;
    jobs: () => Promise<JobGroup[]>;
    languages: () => Promise<Language[]>;
    timezones: () => Promise<TimezoneGroup[]>;
  };

  readonly search: {
    movies: (query: string, options?: GetMovieSearchOptions) => Promise<MovieSearchResults>;
    tv: (query: string, options?: GetTvSearchOptions) => Promise<TvSearchResults>;
    people: (query: string, options?: GetPeopleSearchOptions) => Promise<PeopleSearchResults>;
    multi: (query: string, options?: GetMultiSearchOptions) => Promise<MultiSearchResults>;
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
