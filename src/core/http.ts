import type { TMDBOptions } from "../shared/common";
import { TMDBError, type TMDBErrorBody } from "./errors";

const DEFAULT_BASE_URL = "https://api.themoviedb.org/3";

/**
 * Internal HTTP client for TMDB API requests.
 * Handles authentication, error responses, and request formatting.
 *
 * @internal
 */
export class HttpClient {
  private readonly baseUrl: string;
  private readonly apiKey?: string;
  private readonly language?: string;
  private readonly region?: string;

  constructor(options: TMDBOptions) {
    this.baseUrl = options.baseUrl ?? DEFAULT_BASE_URL;
    this.apiKey = options.apiKey;
    this.language = options.language;
    this.region = options.region;
  }

  /**
   * Make a GET request to the TMDB API.
   *
   * @param path - API endpoint path (e.g., "/movie/550")
   * @param params - Query parameters to include in the request
   * @returns Promise resolving to the parsed JSON response
   * @throws {TMDBError} When the request fails or returns an error status
   */
  async get<T>(path: string, params?: Record<string, unknown>): Promise<T> {
    const queryParams = this.buildQueryParams(params);
    const url = this.baseUrl + path + this.buildQueryString(queryParams);

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "User-Agent": "tmdb-client/0.2.0",
        },
      });

      if (!response.ok) {
        await this.handleErrorResponse(response);
      }

      return await this.parseJsonResponse<T>(response);
    } catch (error) {
      // Re-throw TMDBError instances as-is
      if (error instanceof TMDBError) {
        throw error;
      }

      // Handle network errors, timeouts, etc.
      const message = error instanceof Error ? error.message : "Unknown error occurred";
      throw new TMDBError(`Network error: ${message}`, { status: 0 });
    }
  }

  /**
   * Build query parameters, merging request params with client defaults.
   */
  private buildQueryParams(params?: Record<string, unknown>): Record<string, unknown> {
    return {
      ...params,
      language: params?.language ?? this.language,
      region: params?.region ?? this.region,
      ...(this.apiKey ? { api_key: this.apiKey } : {}),
    };
  }

  /**
   * Convert parameters object to URL query string.
   * Handles arrays by joining with commas, filters out empty values.
   */
  private buildQueryString(params?: Record<string, unknown>): string {
    if (!params) return "";

    const searchParams = new URLSearchParams();

    for (const [key, value] of Object.entries(params)) {
      if (value === undefined || value === null || value === "") {
        continue;
      }

      if (Array.isArray(value)) {
        if (value.length > 0) {
          searchParams.set(key, value.join(","));
        }
        continue;
      }

      searchParams.set(key, String(value));
    }

    const queryString = searchParams.toString();
    return queryString ? `?${queryString}` : "";
  }

  /**
   * Handle error responses from TMDB API.
   * Attempts to parse TMDB error format and throws structured TMDBError.
   */
  private async handleErrorResponse(response: Response): Promise<never> {
    let errorBody: TMDBErrorBody | undefined;
    let message = `HTTP ${response.status}: ${response.statusText}`;

    try {
      const contentType = response.headers.get("content-type") || "";
      if (contentType.toLowerCase().includes("application/json")) {
        errorBody = (await response.json()) as TMDBErrorBody;

        if (errorBody.status_message) {
          message = errorBody.status_message;
        }
      }
    } catch {
      /* ignore JSON parse errors */
    }

    if (response.status === 401) {
      message = "Invalid API key. Please check your TMDB credentials.";
    } else if (response.status === 429) {
      message = "Rate limit exceeded. Please slow down your requests.";
    } else if (response.status >= 500) {
      message = "TMDB server error. Please try again later.";
    }

    throw new TMDBError(message, {
      status: response.status,
      code: errorBody?.status_code,
      body: errorBody,
    });
  }

  /**
   * Parse JSON response with proper error handling.
   */
  private async parseJsonResponse<T>(response: Response): Promise<T> {
    const contentType = response.headers.get("content-type") || "";

    if (!contentType.toLowerCase().includes("application/json")) {
      throw new TMDBError("Expected JSON response but received different content type", {
        status: response.status,
      });
    }

    try {
      return (await response.json()) as T;
    } catch {
      throw new TMDBError("Failed to parse JSON response from TMDB", { status: response.status });
    }
  }
}
