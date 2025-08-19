import type { paths } from "../../generated/tmdb";

type Prettify<T> = { [K in keyof T]: T[K] } & {};

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

type _CfgQuery = paths["/3/configuration"]["get"]["parameters"] extends { query: infer Q }
  ? Q
  : never;
type _CountriesQuery = { language?: string }; // spec misses this; keep override
type _LanguagesQuery = paths["/3/configuration/languages"]["get"]["parameters"] extends {
  query: infer Q;
}
  ? Q
  : never;
type _JobsQuery = paths["/3/configuration/jobs"]["get"]["parameters"] extends { query: infer Q }
  ? Q
  : never;
type _TimezonesQuery = paths["/3/configuration/timezones"]["get"]["parameters"] extends {
  query: infer Q;
}
  ? Q
  : never;

export type GetConfigurationOptions = Prettify<_CfgQuery>;
export type GetCountriesOptions = Prettify<_CountriesQuery>;
export type GetLanguagesOptions = Prettify<_LanguagesQuery>;
export type GetJobsOptions = Prettify<_JobsQuery>;
export type GetTimezonesOptions = Prettify<_TimezonesQuery>;
