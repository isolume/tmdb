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

export interface ITVSeries {
  id: number;
  name: string;
  original_name: string;
  overview: string;
  first_air_date?: string;
  last_air_date?: string;
  status?: string;
  tagline?: string;
  type?: string;
  homepage?: string;
  in_production?: boolean;
  languages?: string[];
  number_of_episodes?: number;
  number_of_seasons?: number;
  origin_country?: string[];
  original_language?: string;
  popularity?: number;
  vote_average?: number;
  vote_count?: number;
  poster_path?: string | null;
  backdrop_path?: string | null;
  genres?: { id: number; name: string }[];
  created_by?: {
    id: number;
    credit_id: string;
    name: string;
    gender: number;
    profile_path: string | null;
  }[];
  episode_run_time?: number[];
  last_episode_to_air?: EpisodeSummary;
  next_episode_to_air?: EpisodeSummary;
  networks?: {
    id: number;
    name: string;
    logo_path: string | null;
    origin_country: string;
  }[];
  production_companies?: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  production_countries?: {
    iso_3166_1: string;
    name: string;
  }[];
  seasons?: {
    air_date?: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string | null;
    season_number: number;
    vote_average: number;
  }[];
  spoken_languages?: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
}

export interface EpisodeSummary {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  air_date: string;
  episode_number: number;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string | null;
}

export interface SearchMovie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  release_date?: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
  vote_average?: number;
  vote_count?: number;
  genre_ids?: number[];
}

export interface SearchTv {
  id: number;
  name: string;
  original_name: string;
  overview: string;
  first_air_date?: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
  vote_average?: number;
  vote_count?: number;
  genre_ids?: number[];
}

export interface SearchPerson {
  id: number;
  name: string;
  profile_path?: string | null;
  known_for_department?: string;
  known_for?: Array<SearchMovie | SearchTv>;
}

export type MultiSearchResult =
  | (SearchMovie & { media_type: "movie" })
  | (SearchTv & { media_type: "tv" })
  | (SearchPerson & { media_type: "person" });

export type TrendingTimeWindow = "day" | "week";

export type TrendingAllItem =
  | (SearchMovie & {
      media_type: "movie";
      adult?: boolean;
      popularity?: number;
      video?: boolean;
    })
  | (SearchTv & {
      media_type: "tv";
      adult?: boolean;
      popularity?: number;
      origin_country?: string[];
    })
  | (SearchPerson & {
      media_type: "person";
      adult?: boolean;
      gender?: number;
      popularity?: number;
      known_for?: Array<SearchMovie | SearchTv>;
    });

export type TrendingAllResponse = Paged<TrendingAllItem>;




export interface TMDBConfiguration {
  images: {
    base_url: string;
    secure_base_url: string;
    backdrop_sizes: string[];
    logo_sizes: string[];
    poster_sizes: string[];
    profile_sizes: string[];
    still_sizes: string[];
  };
  change_keys: string[];
}

export interface Country {
  iso_3166_1: string;
  english_name: string;
  native_name?: string;
}

export interface JobGroup {
  department: string;
  jobs: string[];
}

export interface Language {
  iso_639_1: string;
  english_name: string;
  name: string; 
}

export interface TimezoneGroup {
  iso_3166_1: string;    
  zones: string[];      
}
