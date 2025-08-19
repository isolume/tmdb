import {
  TMDB,
  type MovieSearchResults,
  type TvSearchResults,
  type PeopleSearchResults,
  type MultiSearchResults,
  type MultiSearchResult,
} from "@vo1x/tmdb";

/**
 * Demonstrates search functionality with full TypeScript support
 * Shows how types help with different search result structures
 */
async function main() {
  const tmdb = new TMDB({
    apiKey: process.env.TMDB_TOKEN!,
    language: "en-US",
  });

  // Movie search with typed results
  const movieRes: MovieSearchResults = await tmdb.search.movies("batman", {
    page: 1,
    include_adult: false,
  });
  console.log(
    `\n🎬 [Movies] Found ${movieRes.total_results} results (page ${movieRes.page}/${movieRes.total_pages})`
  );

  movieRes.results?.slice(0, 3).forEach((movie, i) => {
    // TypeScript knows this is a MovieSearchResult with title, release_date, etc.
    console.log(`  ${i + 1}. "${movie.title}" (${movie.release_date}) ⭐ ${movie.vote_average}`);
  });

  // TV search - different result structure
  const tvRes: TvSearchResults = await tmdb.search.tv("batman", { page: 1 });
  console.log(`\n📺 [TV Shows] Found ${tvRes.total_results} results`);

  tvRes.results?.slice(0, 3).forEach((show, i) => {
    // TypeScript knows this has 'name' and 'first_air_date' (not title/release_date)
    console.log(`  ${i + 1}. "${show.name}" (${show.first_air_date}) ⭐ ${show.vote_average}`);
  });

  // People search
  const peopleRes: PeopleSearchResults = await tmdb.search.people("christian bale", { page: 1 });
  console.log(`\n👥 [People] Found ${peopleRes.total_results} results`);

  peopleRes.results?.slice(0, 3).forEach((person, i) => {
    // TypeScript knows about known_for_department and known_for array
    console.log(`  ${i + 1}. ${person.name} (${person.known_for_department})`);
    person.known_for?.slice(0, 2).forEach((work) => {
      const title = "title" in work ? work.title : "name" in work ? work.name : "Unknown";
      console.log(`     Known for: "${title}"`);
    });
  });

  // Multi search - demonstrates discriminated unions
  const multiRes: MultiSearchResults = await tmdb.search.multi("batman", {
    page: 1,
    include_adult: false,
  });
  console.log(`\n🔍 [Multi Search] Found ${multiRes.total_results} mixed results`);

  multiRes.results?.slice(0, 5).forEach((result: MultiSearchResult, i: number) => {
    // TypeScript discriminated union - knows the shape based on media_type
    if (result.media_type === "movie") {
      console.log(`  ${i + 1}. [MOVIE] "${result.title}" (${result.release_date})`);
    } else if (result.media_type === "tv") {
      console.log(
        `  ${i + 1}. [TV] "${"name" in result ? result.name : result.title}" (${"first_air_date" in result ? result.first_air_date : "N/A"})`
      );
    } else if (result.media_type === "person") {
      console.log(
        `  ${i + 1}. [PERSON] ${"name" in result ? result.name : "Unknown"} (${"known_for_department" in result ? result.known_for_department : "N/A"})`
      );
    }
  });
}

main().catch((err) => {
  console.error("TMDB search example failed:", err);
});
