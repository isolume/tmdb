import { TMDBError } from "../core";

export function validateId(id: number): void {
  if (!Number.isInteger(id) || id <= 0) {
    throw new TMDBError("Invalid TMDB movie id. Expected a positive integer.");
  }
}

export function validateQuery(query: string): void {
  if (!query?.trim()) {
    throw new TMDBError("Search query cannot be empty");
  }
}
