import type { Movie } from "../modules/movies/types";

export type Genre = NonNullable<Movie["genres"]>[number];

export interface TMDBOptions {
  apiKey: string;
  language?: string;
  region?: string;
  baseUrl?: string;
  timeout?: number;
}
