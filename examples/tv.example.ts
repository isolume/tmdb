import { TMDB } from "@vo1x/tmdb";

async function main() {
  const tmdb = new TMDB({ apiKey: process.env.TMDB_TOKEN! });

  const seriesId = 1399; // Game of Thrones

  // TV details
  const tv = await tmdb.tv.getById(seriesId, {
    language: "en-US",
    append_to_response:
      "aggregate_credits,images,content_ratings,external_ids,recommendations,similar",
  });
  console.log("[TV]", tv.name, tv.id);

  // Credits
  const credits = await tmdb.tv.credits(seriesId, { language: "en-US" });
  console.log("[Cast count]", credits.cast.length);

  // Images
  const images = await tmdb.tv.images(seriesId, { include_image_language: "en,null" });
  console.log("[Backdrops]", images.backdrops.length);

  // Recommendations & Similar
  const recs = await tmdb.tv.recommendations(seriesId, { page: 1 });
  const sims = await tmdb.tv.similar(seriesId, { page: 1 });
  console.log("[Recs]", recs.total_results, "[Similar]", sims.total_results);
}

main().catch(console.error);
