import type { HttpClient } from "../../core";
import type {
  TMDBConfiguration,
  Country,
  JobGroup,
  Language,
  TimezoneGroup,
  GetConfigurationOptions,
  GetCountriesOptions,
} from "./types";

/**
 * Internal service for TMDB configuration endpoints.
 * Not exposed to users — use the TMDB factory instead.
 * @internal
 */
export class ConfigurationService {
  constructor(private http: HttpClient) {}

  async getConfig(opts?: GetConfigurationOptions): Promise<TMDBConfiguration> {
    return this.http.get<TMDBConfiguration>("/configuration", opts);
  }

  async countries(opts?: GetCountriesOptions): Promise<Country[]> {
    return this.http.get<Country[]>("/configuration/countries", opts);
  }

  async jobs(): Promise<JobGroup[]> {
    return this.http.get<JobGroup[]>("/configuration/jobs");
  }

  async languages(): Promise<Language[]> {
    return this.http.get<Language[]>("/configuration/languages");
  }

  async timezones(): Promise<TimezoneGroup[]> {
    return this.http.get<TimezoneGroup[]>("/configuration/timezones");
  }
}
