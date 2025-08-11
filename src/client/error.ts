export interface TMDBErrorBody {
  status_code?: number;
  status_message?: string;
  success?: boolean;
}

export class TMDBError extends Error {
  status?: number;
  code?: number;
  constructor(message: string, opts?: { status?: number; code?: number }) {
    super(message);
    this.name = "TMDBError";
    this.status = opts?.status;
    this.code = opts?.code;
  }
}
