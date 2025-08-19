import { TMDB, type TrendingAll, type TrendingAllItem } from "@vo1x/tmdb";

/**
 * Trending content example showcasing discriminated unions
 * Shows how TypeScript helps differentiate between movie, TV, and person results
 */
async function main() {
  const tmdb = new TMDB({ apiKey: process.env.TMDB_TOKEN! });

  // Daily trending with full type safety
  const dailyTrending: TrendingAll = await tmdb.trending.daily({ language: "en-US" });
  console.log(`🔥 Trending Today: ${dailyTrending.total_results} items`);

  // TypeScript discriminated union in action
  dailyTrending.results?.slice(0, 5).forEach((item: TrendingAllItem, i: number) => {
    if (item.media_type === "movie") {
      // TypeScript knows this has movie-specific properties
      console.log(`  ${i + 1}. 🎬 "${item.title}" (${item.release_date}) ⭐ ${item.vote_average}`);
    } else if (item.media_type === "tv") {
      // TypeScript knows this has TV-specific properties - use type guards
      const tvName = "name" in item ? item.name : item.title;
      const tvDate = "first_air_date" in item ? item.first_air_date : "N/A";
      console.log(`  ${i + 1}. 📺 "${tvName}" (${tvDate}) ⭐ ${item.vote_average}`);
    } else if (item.media_type === "person") {
      // TypeScript knows this has person-specific properties
      const personName = "name" in item ? item.name : "Unknown";
      const department = "known_for_department" in item ? item.known_for_department : "N/A";
      console.log(`  ${i + 1}. 👤 ${personName} (${department})`);

      // Show what they're known for with type guard
      if ("known_for" in item && Array.isArray(item.known_for)) {
        item.known_for.slice(0, 2).forEach((work) => {
          const title = "title" in work ? work.title : "name" in work ? work.name : "Unknown";
          console.log(`       Known for: "${title}"`);
        });
      }
    }
  });

  // Weekly trending for comparison
  const weeklyTrending: TrendingAll = await tmdb.trending.weekly({ language: "en-US" });
  console.log(`\n📅 Trending This Week: ${weeklyTrending.total_results} items`);

  // Type-safe filtering and processing
  const topMovies = weeklyTrending.results
    ?.filter(
      (item): item is TrendingAllItem & { media_type: "movie" } => item.media_type === "movie"
    )
    .slice(0, 3);

  if (topMovies && topMovies.length > 0) {
    console.log(`\n🎬 Top Weekly Movies:`);
    topMovies.forEach((movie, i) => {
      // TypeScript knows these are definitely movies with movie properties
      console.log(
        `  ${i + 1}. "${movie.title}" (${movie.release_date}) ⭐ ${movie.vote_average}/10`
      );
      console.log(`     Overview: ${movie.overview?.substring(0, 100)}...`);
    });
  }
}

main().catch(console.error);
