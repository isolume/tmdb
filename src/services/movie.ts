import { HttpClient } from "../client";
import type { Paged, Movie, Credits, ImagesResponse } from "./types";

export class MovieService {
  constructor(private http: HttpClient) {}

  getById(id: number, opts?: { append_to_response?: string; language?: string }) {
    return this.http.get<Movie>(`/movie/${id}`, opts);
  }

  credits(id: number, opts?: { language?: string }) {
    return this.http.get<Credits>(`/movie/${id}/credits`, opts);
  }

  images(id: number, opts?: { include_image_language?: string; language?: string }) {
    return this.http.get<ImagesResponse>(`/movie/${id}/images`, opts);
  }

  recommendations(id: number, opts?: { page?: number; language?: string }) {
    return this.http.get<Paged<Movie>>(`/movie/${id}/recommendations`, opts);
  }

  similar(id: number, opts?: { page?: number; language?: string }) {
    return this.http.get<Paged<Movie>>(`/movie/${id}/similar`, opts);
  }
}
