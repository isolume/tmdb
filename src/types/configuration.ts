import type { paths } from "./tmdb";

export type TMDBConfiguration =
  paths["/3/configuration"]["get"]["responses"]["200"]["content"]["application/json"];

export type Country =
  paths["/3/configuration/countries"]["get"]["responses"]["200"]["content"]["application/json"][number];

export type Language =
  paths["/3/configuration/languages"]["get"]["responses"]["200"]["content"]["application/json"][number];

export type JobGroup =
  paths["/3/configuration/jobs"]["get"]["responses"]["200"]["content"]["application/json"][number];

export type TimezoneGroup =
  paths["/3/configuration/timezones"]["get"]["responses"]["200"]["content"]["application/json"][number];

export type PrimaryTranslationsResponse =
  paths["/3/configuration/primary_translations"]["get"]["responses"]["200"]["content"]["application/json"];

export type GetConfigurationQuery = paths["/3/configuration"]["get"]["parameters"] extends {
  query: infer Q;
}
  ? Q
  : never;

// override, because spec missed it
export type GetCountriesQuery = { language?: string };

export type GetLanguagesQuery = paths["/3/configuration/languages"]["get"]["parameters"] extends {
  query: infer Q;
}
  ? Q
  : never;
