import {
  TMDB,
  type MovieSearchResults,
  type TvSearchResults,
  type PeopleSearchResults,
  type MultiSearchResults,
} from "@vo1x/tmdb";

/**
 * A minimal example demonstrating the search functionality of the TMDB SDK.
 */
async function main() {
  const tmdb = new TMDB({
    apiKey: process.env.TMDB_TOKEN!,
    language: "en-US",
  });

  // Movie search
  const movieRes: MovieSearchResults = await tmdb.search.movies("batman");
  console.log(`Found ${movieRes.totalResults} movies.`);
  movieRes.results?.slice(0, 2).forEach((movie) => {
    console.log(`- [Movie] "${movie.title}" (${movie.releaseDate})`);
  });

  // TV search
  const tvRes: TvSearchResults = await tmdb.search.tv("batman");
  console.log(`\nFound ${tvRes.totalResults} TV shows.`);
  tvRes.results?.slice(0, 2).forEach((show) => {
    console.log(`- [TV] "${show.name}" (${show.firstAirDate})`);
  });

  // People search
  const peopleRes: PeopleSearchResults = await tmdb.search.people("christian bale");
  console.log(`\nFound ${peopleRes.totalResults} people.`);
  peopleRes.results?.slice(0, 2).forEach((person) => {
    console.log(`- [Person] ${person.name} (${person.knownForDepartment})`);
  });

  // Multi search
  const multiRes: MultiSearchResults = await tmdb.search.multi("batman");
  console.log(`\nFound ${multiRes.totalResults} mixed results.`);
  multiRes.results?.slice(0, 5).forEach((result) => {
    // Using the discriminated union 'mediaType' to determine the result's shape
    if (result.mediaType === "movie") {
      console.log(`- [Multi/Movie] "${result.title}"`);
    } else if (result.mediaType === "tv") {
      console.log(`- [Multi/TV] "${result.title}"`);
    }
  });
}

main().catch((err) => {
  console.error("TMDB search example failed:", err.message);
});
