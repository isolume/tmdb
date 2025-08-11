export interface Paged<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface Movie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  release_date?: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
  vote_average?: number;
  vote_count?: number;
  genres?: Genre[];
  runtime?: number;
}

export interface Credits {
  id: number;
  cast: Array<{ id: number; name: string; character?: string; profile_path?: string | null }>;
  crew: Array<{
    id: number;
    name: string;
    job?: string;
    department?: string;
    profile_path?: string | null;
  }>;
}

export interface ImagesResponse {
  id?: number;
  backdrops: Array<{ file_path: string; width: number; height: number }>;
  posters: Array<{ file_path: string; width: number; height: number }>;
}