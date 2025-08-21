import type { paths } from "../../generated/tmdb";
import type { CamelCase } from "../../shared/types";

type TMDBConfigurationApiResponse =
  paths["/3/configuration"]["get"]["responses"]["200"]["content"]["application/json"];
export type TMDBConfiguration = CamelCase<TMDBConfigurationApiResponse>;

type CountryApiResponse =
  paths["/3/configuration/countries"]["get"]["responses"]["200"]["content"]["application/json"][number];
export type Country = CamelCase<CountryApiResponse>;

type LanguageApiResponse =
  paths["/3/configuration/languages"]["get"]["responses"]["200"]["content"]["application/json"][number];
export type Language = CamelCase<LanguageApiResponse>;

type JobGroupApiResponse =
  paths["/3/configuration/jobs"]["get"]["responses"]["200"]["content"]["application/json"][number];
export type JobGroup = CamelCase<JobGroupApiResponse>;

type TimezoneGroupApiResponse =
  paths["/3/configuration/timezones"]["get"]["responses"]["200"]["content"]["application/json"][number];
export type TimezoneGroup = CamelCase<TimezoneGroupApiResponse>;

export type GetCountriesOptions = { language?: string };
