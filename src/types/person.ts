import type { paths } from './tmdb';

export type Person =
  paths['/3/person/{person_id}']['get']['responses']['200']['content']['application/json'];
