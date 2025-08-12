import type { TMDBOptions } from "./client";
import { HttpClient } from "./client";
import { MovieService, TvService } from "./services";

export class TMDB {
  readonly movie: MovieService;
  readonly tv: TvService;

  constructor(options: TMDBOptions) {
    if (!options.apiKey) {
      throw new Error("TMDB: apiKey is required for v3.");
    }
    const http = new HttpClient(options);
    this.movie = new MovieService(http);
    this.tv = new TvService(http);
  }
}

export type { TMDBOptions } from "./client";
export { TMDBError } from "./client";
export * from "./services";
