import type { paths } from "../../generated/tmdb";
import type { CamelCase } from "../../shared/types";

type PersonByIdResponseApiResponse =
  paths["/3/person/{person_id}"]["get"]["responses"]["200"]["content"]["application/json"];
export type Person = CamelCase<PersonByIdResponseApiResponse>;

type PersonImagesResponseApiResponse =
  paths["/3/person/{person_id}/images"]["get"]["responses"]["200"]["content"]["application/json"];
export type PersonImagesResponse = CamelCase<PersonImagesResponseApiResponse>;

type PersonCombinedCreditsResponseApiResponse =
  paths["/3/person/{person_id}/combined_credits"]["get"]["responses"]["200"]["content"]["application/json"];
export type PersonCombinedCreditsResponse = CamelCase<PersonCombinedCreditsResponseApiResponse>;

export type PersonImage = NonNullable<PersonImagesResponse["profiles"]>[number];
export type CombinedCastCredit = NonNullable<PersonCombinedCreditsResponse["cast"]>[number];
export type CombinedCrewCredit = NonNullable<PersonCombinedCreditsResponse["crew"]>[number];

type GetPersonOptionsApiResponse = paths["/3/person/{person_id}"]["get"]["parameters"]["query"];
export type GetPersonOptions = CamelCase<GetPersonOptionsApiResponse>;

type GetPersonImagesOptionsApiResponse =
  paths["/3/person/{person_id}/images"]["get"]["parameters"]["query"];
export type GetPersonImagesOptions = CamelCase<GetPersonImagesOptionsApiResponse>;

type GetPersonCombinedCreditsOptionsApiResponse =
  paths["/3/person/{person_id}/combined_credits"]["get"]["parameters"]["query"];
export type GetPersonCombinedCreditsOptions = CamelCase<GetPersonCombinedCreditsOptionsApiResponse>;
