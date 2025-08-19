import type { paths } from "../../generated/tmdb";

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

export type GetConfigurationOptions = paths["/3/configuration"]["get"]["parameters"] extends {
  query: infer Q;
}
  ? Q
  : never;

export type GetCountriesOptions = { language?: string }; //missing in spec, manual addition

export type GetLanguagesOptions = paths["/3/configuration/languages"]["get"]["parameters"] extends {
  query: infer Q;
}
  ? Q
  : never;

export type GetJobsOptions = paths["/3/configuration/jobs"]["get"]["parameters"] extends {
  query: infer Q;
}
  ? Q
  : never;

export type GetTimezonesOptions = paths["/3/configuration/timezones"]["get"]["parameters"] extends {
  query: infer Q;
}
  ? Q
  : never;
