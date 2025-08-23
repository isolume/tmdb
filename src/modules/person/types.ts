import type { paths } from "../../generated/tmdb";
import type { CamelCase } from "../../shared/types";

type PersonByIdResponseApiResponse =
  paths["/3/person/{person_id}"]["get"]["responses"]["200"]["content"]["application/json"];
export type Person = CamelCase<PersonByIdResponseApiResponse>;

type PersonImagesResponseApiResponse =
  paths["/3/person/{person_id}/images"]["get"]["responses"]["200"]["content"]["application/json"];
export type PersonImages = CamelCase<PersonImagesResponseApiResponse>;

type PersonCombinedCreditsResponseApiResponse =
  paths["/3/person/{person_id}/combined_credits"]["get"]["responses"]["200"]["content"]["application/json"];
export type PersonCombinedCredits = CamelCase<PersonCombinedCreditsResponseApiResponse>;

export type PersonImage = NonNullable<PersonImages["profiles"]>[number];
export type CombinedCastCredit = NonNullable<PersonCombinedCredits["cast"]>[number];
export type CombinedCrewCredit = NonNullable<PersonCombinedCredits["crew"]>[number];

type GetPersonOptionsApiResponse = paths["/3/person/{person_id}"]["get"]["parameters"]["query"];
export type GetPersonOptions = CamelCase<GetPersonOptionsApiResponse>;

type GetPersonCombinedCreditsOptionsApiResponse =
  paths["/3/person/{person_id}/combined_credits"]["get"]["parameters"]["query"];
export type GetPersonCombinedCreditsOptions = CamelCase<GetPersonCombinedCreditsOptionsApiResponse>;
