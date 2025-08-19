export interface TMDBErrorBody {
  status_code?: number;
  status_message?: string;
  success?: boolean;
}

/**
 * Custom error class for TMDB API errors.
 * Provides structured error information from TMDB responses.
 */
export class TMDBError extends Error {
  readonly status?: number;

  readonly code?: number;

  readonly body?: TMDBErrorBody;

  constructor(
    message: string,
    options?: {
      status?: number;
      code?: number;
      body?: TMDBErrorBody;
    }
  ) {
    super(message);
    this.name = "TMDBError";
    this.status = options?.status;
    this.code = options?.code;
    this.body = options?.body;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, TMDBError);
    }
  }

  get isRateLimit(): boolean {
    return this.status === 429;
  }

  get isAuthError(): boolean {
    return this.status === 401 || this.code === 7; // Invalid API key
  }

  get isNotFound(): boolean {
    return this.status === 404 || this.code === 34; // Resource not found
  }

  get friendlyMessage(): string {
    if (this.isRateLimit) {
      return "Rate limit exceeded. Please wait before making more requests.";
    }
    if (this.isAuthError) {
      return "Invalid API key. Please check your TMDB API credentials.";
    }
    if (this.isNotFound) {
      return "The requested content was not found.";
    }
    return this.message;
  }
}
