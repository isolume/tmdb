import type { HttpClient } from "../client";
import type {
  TMDBConfiguration,
  Country,
  JobGroup,
  Language,
  TimezoneGroup,
  PrimaryTranslationsResponse,
  GetConfigurationQuery,
  GetCountriesQuery,
  GetLanguagesQuery,
} from "../types";

export class ConfigurationService {
  constructor(private http: HttpClient) {}

  get(opts?: GetConfigurationQuery) {
    return this.http.get<TMDBConfiguration>("/configuration", opts);
  }

  countries(opts?: GetCountriesQuery) {
    return this.http.get<Country[]>("/configuration/countries", opts);
  }

  jobs() {
    return this.http.get<JobGroup[]>("/configuration/jobs");
  }

  languages() {
    return this.http.get<Language[]>("/configuration/languages");
  }

  primaryTranslations() {
    return this.http.get<PrimaryTranslationsResponse>("/configuration/primary_translations");
  }

  timezones() {
    return this.http.get<TimezoneGroup[]>("/configuration/timezones");
  }
}
