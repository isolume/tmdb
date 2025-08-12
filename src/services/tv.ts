import { HttpClient } from "../client";
import type { ITVSeries, Credits, ImagesResponse, Paged } from "./types";

export class TvService {
  constructor(private http: HttpClient) {}

  getById(id: number, opts?: { append_to_response?: string; language?: string }) {
    return this.http.get<ITVSeries>(`/tv/${id}`, opts);
  }

  credits(id: number, opts?: { language?: string }) {
    return this.http.get<Credits>(`/tv/${id}/credits`, opts);
  }

  images(id: number, opts?: { include_image_language?: string; language?: string }) {
    return this.http.get<ImagesResponse>(`/tv/${id}/images`, opts);
  }

  recommendations(id: number, opts?: { page?: number; language?: string }) {
    return this.http.get<Paged<ITVSeries>>(`/tv/${id}/recommendations`, opts);
  }

  similar(id: number, opts?: { page?: number; language?: string }) {
    return this.http.get<Paged<ITVSeries>>(`/tv/${id}/similar`, opts);
  }
}
