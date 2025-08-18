import type { HttpClient } from "../client";
import type {
  Paged,
  SearchMovie,
  SearchTv,
  SearchPerson,
  MultiSearchResult,
  SearchMovieQuery,
  SearchTvQuery,
  SearchPersonQuery,
  MultiSearchQuery,
} from "../types";

export class SearchService {
  constructor(private http: HttpClient) {}

  movie(query: string, opts?: Omit<SearchMovieQuery, "query">) {
    return this.http.get<Paged<SearchMovie>>("/search/movie", { query, ...opts });
  }

  tv(query: string, opts?: Omit<SearchTvQuery, "query">) {
    return this.http.get<Paged<SearchTv>>("/search/tv", { query, ...opts });
  }

  people(query: string, opts?: Omit<SearchPersonQuery, "query">) {
    return this.http.get<Paged<SearchPerson>>("/search/person", { query, ...opts });
  }

  multi(query: string, opts?: Omit<MultiSearchQuery, "query">) {
    return this.http.get<Paged<MultiSearchResult>>("/search/multi", { query, ...opts });
  }
}
