export interface TMDBOptions {
  /** TMDb v3 API key. **/
  apiKey: string;

  /** Default language, e.g. "en-US". */
  language?: string;
  /** Default region, e.g. "US". */
  region?: string;

  /** Base URL override (tests/mocks). */
  baseUrl?: string;
}
