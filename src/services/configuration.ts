import { HttpClient } from "../client";
import type {
  TMDBConfiguration,
  Country,
  JobGroup,
  Language,
  TimezoneGroup,
} from "./types";

export class ConfigurationService {
  constructor(private http: HttpClient) {}

  get(opts?: { language?: string }) {
    return this.http.get<TMDBConfiguration>("/configuration", opts);
  }

  countries(opts?: { language?: string }) {
    return this.http.get<Country[]>("/configuration/countries", opts);
  }

  jobs() {
    return this.http.get<JobGroup[]>("/configuration/jobs");
  }

  languages(opts?: { language?: string }) {
    return this.http.get<Language[]>("/configuration/languages", opts);
  }

  primaryTranslations() {
    return this.http.get<string[]>("/configuration/primary_translations");
  }

  timezones() {
    return this.http.get<TimezoneGroup[]>("/configuration/timezones");
  }
}
