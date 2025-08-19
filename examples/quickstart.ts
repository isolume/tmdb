import { TMDB } from "@vo1x/tmdb";

/**
 * Quickstart example - Basic usage of the TMDB SDK
 * This is the simplest example to get started with the library
 */
async function main() {
  // Initialize the TMDB client with your API key
  const tmdb = new TMDB({
    apiKey: process.env.TMDB_TOKEN!,
  });

  try {
    console.log("🎬 TMDB SDK Quickstart Example\n");

    // Get a popular movie
    const movie = await tmdb.movies.get(693134); // Dune: Part Two
    console.log(`📽️  Movie: ${movie.title} (${movie.release_date})`);
    console.log(`⭐ Rating: ${movie.vote_average}/10`);
    console.log(`📝 Overview: ${movie.overview}\n`);

    // Search for movies
    const searchResults = await tmdb.search.movies("Inception", { page: 1 });
    console.log(`🔍 Search results for "Inception":`);
    searchResults.results?.slice(0, 3).forEach((result, i) => {
      console.log(`   ${i + 1}. ${result.title} (${result.release_date})`);
    });
    console.log();

    // Get trending content
    const trending = await tmdb.trending.weekly();
    console.log(`🔥 Trending this week:`);
    trending.results?.slice(0, 5).forEach((item, i) => {
      if (item.media_type === "movie") {
        console.log(`   ${i + 1}. 🎬 ${item.title} - ${item.vote_average}/10`);
      } else if (item.media_type === "tv") {
        const tvName = "name" in item ? item.name : item.title;
        console.log(`   ${i + 1}. 📺 ${tvName} - ${item.vote_average}/10`);
      } else if (item.media_type === "person") {
        const personName = "name" in item ? item.name : "Unknown";
        console.log(`   ${i + 1}. 👤 ${personName}`);
      }
    });
    console.log();

    // Get configuration
    const config = await tmdb.configuration.get();
    console.log(`🔧 API Configuration loaded:`);
    console.log(`   Base URL: ${config.images?.secure_base_url}`);
    console.log(`   Poster sizes: ${config.images?.poster_sizes?.join(", ")}`);

    console.log("\n✅ Quickstart example completed successfully!");
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

// Run the example
main().catch(console.error);
