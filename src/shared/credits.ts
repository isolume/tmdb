import type { MovieCredits } from "../modules/movies/types";
import type { TvCredits } from "../modules/tv/types";

/** A union of all cast members (movies + TV). */
export type CreditCastMember =
  | NonNullable<MovieCredits["cast"]>[number]
  | NonNullable<TvCredits["cast"]>[number];

/** A union of all crew members (movies + TV). */
export type CreditCrewMember =
  | NonNullable<MovieCredits["crew"]>[number]
  | NonNullable<TvCredits["crew"]>[number];
