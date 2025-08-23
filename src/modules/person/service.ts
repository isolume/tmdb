import type { HttpClient } from "../../core";
import { validateId } from "../../shared/validation";
import type {
  Person,
  PersonImages,
  PersonCombinedCredits,
  GetPersonOptions,
  GetPersonCombinedCreditsOptions,
} from "./types";

/**
 * Internal service for TMDB person endpoints.
 * @internal
 */
export class PersonService {
  constructor(private readonly http: HttpClient) {}

  async get(id: number, options?: GetPersonOptions): Promise<Person> {
    validateId(id);
    return this.http.get<Person>(`/person/${id}`, options);
  }

  async images(id: number): Promise<PersonImages> {
    validateId(id);
    return this.http.get<PersonImages>(`/person/${id}/images`);
  }

  async combinedCredits(
    id: number,
    options?: GetPersonCombinedCreditsOptions
  ): Promise<PersonCombinedCredits> {
    validateId(id);
    return this.http.get<PersonCombinedCredits>(`/person/${id}/combined_credits`, options);
  }
}
