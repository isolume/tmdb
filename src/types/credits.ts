import type { MovieCredits } from "./movie";
import type { TvCredits } from "./tv";

export type CreditCastMember =
  | NonNullable<MovieCredits["cast"]>[number]
  | NonNullable<TvCredits["cast"]>[number];

export type CreditCrewMember =
  | NonNullable<MovieCredits["crew"]>[number]
  | NonNullable<TvCredits["crew"]>[number];
