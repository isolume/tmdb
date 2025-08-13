import type { HttpClient } from "../client";
import type { Paged } from "./types";
import type { SearchMovie, SearchTv, SearchPerson, MultiSearchResult } from "./types";

export class SearchService {
  constructor(private http: HttpClient) {}

  movie(
    query: string,
    opts?: {
      page?: number;
      include_adult?: boolean;
      language?: string;
      region?: string;
      year?: number;
      primary_release_year?: number;
    }
  ) {
    return this.http.get<Paged<SearchMovie>>("/search/movie", { query, ...opts });
  }

  tv(
    query: string,
    opts?: {
      page?: number;
      include_adult?: boolean;
      language?: string;
      first_air_date_year?: number;
    }
  ) {
    return this.http.get<Paged<SearchTv>>("/search/tv", { query, ...opts });
  }

  people(
    query: string,
    opts?: { page?: number; include_adult?: boolean; language?: string; region?: string }
  ) {
    return this.http.get<Paged<SearchPerson>>("/search/person", { query, ...opts });
  }

  multi(
    query: string,
    opts?: { page?: number; include_adult?: boolean; language?: string; region?: string }
  ) {
    return this.http.get<Paged<MultiSearchResult>>("/search/multi", { query, ...opts });
  }
}
