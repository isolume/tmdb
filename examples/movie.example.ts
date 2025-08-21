import { TMDB, type Movie, type MovieCredits, type MovieImages } from "@vo1x/tmdb";

/**
 * Movie details example showcasing comprehensive type safety
 * Demonstrates how TypeScript types help with movie data, credits, and images
 */
async function main() {
  const tmdb = new TMDB({ apiKey: process.env.TMDB_TOKEN! });

  // Movie details with full type safety
  const movie: Movie = await tmdb.movies.get(693134, {
    language: "en-US",
  });

  console.log(`[Movie] ${movie.title} (${movie.releaseDate}) - Rating: ${movie.voteAverage}/10`);
  console.log(`Budget: $${movie.budget?.toLocaleString() ?? "Unknown"}`);
  console.log(`Revenue: $${movie.revenue?.toLocaleString() ?? "Unknown"}`);
  console.log(`Genres: ${movie.genres?.map((g) => g.name).join(", ") ?? "None"}`);
  console.log(`Runtime: ${movie.runtime ?? "Unknown"} minutes`);

  // Credits with typed cast members
  const credits: MovieCredits = await tmdb.movies.credits(movie.id, { language: "en-US" });
  console.log(`\n[Cast] Top 3 actors:`);
  credits.cast?.slice(0, 3).forEach((actor, i) => {
    console.log(`  ${i + 1}. ${actor.name} as ${actor.character}`);
  });

  // Images with type-safe access
  const images: MovieImages = await tmdb.movies.images(movie.id, {
    includeImageLanguage: "en,null",
  });
  console.log(
    `\n[Images] Posters: ${images.posters?.length ?? 0}, Backdrops: ${images.backdrops?.length ?? 0}`
  );

  // Recommendations & Similar with proper typing
  const recs = await tmdb.movies.recommendations(movie.id, { page: 1 });
  const sims = await tmdb.movies.similar(movie.id, { page: 1 });
  console.log(`\n[Related] Recommendations: ${recs.totalResults}, Similar: ${sims.totalResults}`);

  // Show first recommendation with full type safety
  const firstRec = recs.results?.[0];
  if (firstRec) {
    console.log(`Top recommendation: "${firstRec.title}" (${firstRec.releaseDate})`);
  }
}

main().catch(console.error);
