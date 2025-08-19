import type { paths } from "../../generated/tmdb";
import type { Paged } from "../../shared/common";

type Prettify<T> = { [K in keyof T]: T[K] } & {};

/** @internal */
type _PersonByIdResponse =
  paths["/3/person/{person_id}"]["get"]["responses"]["200"]["content"]["application/json"];
/** @internal */
type _PersonImagesResponse =
  paths["/3/person/{person_id}/images"]["get"]["responses"]["200"]["content"]["application/json"];
/** @internal */
type _PersonCombinedCreditsResponse =
  paths["/3/person/{person_id}/combined_credits"]["get"]["responses"]["200"]["content"]["application/json"];

/** @internal */
type _PersonByIdQuery = paths["/3/person/{person_id}"]["get"]["parameters"]["query"];
/** @internal */
type _PersonImagesQuery = paths["/3/person/{person_id}/images"]["get"]["parameters"]["query"];
/** @internal */
type _PersonCombinedCreditsQuery =
  paths["/3/person/{person_id}/combined_credits"]["get"]["parameters"]["query"];

/** A person (actor, director, etc). */
export type Person = _PersonByIdResponse;

/** An image file from the person's images. */
export type PersonImage = NonNullable<_PersonImagesResponse["profiles"]>[number];

/** A cast credit in combined credits. */
export type CombinedCastCredit = NonNullable<_PersonCombinedCreditsResponse["cast"]>[number];
/** A crew credit in combined credits. */
export type CombinedCrewCredit = NonNullable<_PersonCombinedCreditsResponse["crew"]>[number];

/** Full response for a person's images. */
export type PersonImagesResponse = _PersonImagesResponse;
/** Full response for a person's combined credits (cast & crew). */
export interface PersonCombinedCreditsResponse
  extends Paged<CombinedCastCredit | CombinedCrewCredit> {}

/** Optional parameters for fetching a person by ID. */
export type GetPersonOptions = Prettify<_PersonByIdQuery>;
/** Optional parameters for fetching a person's images. */
export type GetPersonImagesOptions = Prettify<_PersonImagesQuery>;
/** Optional parameters for fetching a person's combined credits. */
export type GetPersonCombinedCreditsOptions = Prettify<_PersonCombinedCreditsQuery>;
