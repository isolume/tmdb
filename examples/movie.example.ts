import { TMDB } from "@vo1x/tmdb";

async function main() {
  const tmdb = new TMDB({ apiKey: process.env.TMDB_TOKEN! });

  // Movie details
  const movie = await tmdb.movie.getById(693134, {
    language: "en-US",
    append_to_response: "credits,images,recommendations,similar",
  });
  console.log("[Movie]", movie.title, movie.id);

  // Credits
  const credits = await tmdb.movie.credits(movie.id, { language: "en-US" });
  console.log("[Top billed]", credits.cast[0]?.name);

  // Images
  const images = await tmdb.movie.images(movie.id, { include_image_language: "en,null" });
  console.log("[Posters]", images.posters.length);

  // Recommendations & Similar
  const recs = await tmdb.movie.recommendations(movie.id, { page: 1 });
  const sims = await tmdb.movie.similar(movie.id, { page: 1 });
  console.log("[Recs]", recs.total_results, "[Similar]", sims.total_results);
}

main().catch(console.error);
