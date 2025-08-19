import { TMDB, type TvShow, type TvCredits, type TvImages } from "@vo1x/tmdb";

/**
 * TV Show example demonstrating type-safe access to TV series data
 * Shows the differences between TV and Movie data structures
 */
async function main() {
  const tmdb = new TMDB({ apiKey: process.env.TMDB_TOKEN! });

  const seriesId = 1399; // Game of Thrones

  // TV show details with full typing
  const tvShow: TvShow = await tmdb.tv.get(seriesId, {
    language: "en-US",
  });

  console.log(`📺 [TV Show] "${tvShow.name}" (${tvShow.first_air_date})`);
  console.log(`   Status: ${tvShow.status}`);
  console.log(`   Seasons: ${tvShow.number_of_seasons}, Episodes: ${tvShow.number_of_episodes}`);
  console.log(`   Rating: ⭐ ${tvShow.vote_average}/10 (${tvShow.vote_count} votes)`);
  console.log(`   Genres: ${tvShow.genres?.map((g) => g.name).join(", ") ?? "None"}`);
  console.log(`   Networks: ${tvShow.networks?.map((n) => n.name).join(", ") ?? "None"}`);

  // Show episode information if available
  if (tvShow.last_episode_to_air) {
    const lastEp = tvShow.last_episode_to_air;
    console.log(
      `   Last Episode: S${lastEp.season_number}E${lastEp.episode_number} "${lastEp.name}" (${lastEp.air_date})`
    );
  }

  // Credits with typed cast/crew
  const tvCredits: TvCredits = await tmdb.tv.credits(seriesId, { language: "en-US" });
  console.log(`\n👥 [Cast] ${tvCredits.cast?.length ?? 0} cast members`);
  tvCredits.cast?.slice(0, 5).forEach((actor, i) => {
    const episodeCount = "total_episode_count" in actor ? actor.total_episode_count : "N/A";
    console.log(`  ${i + 1}. ${actor.name} as ${actor.character} (${episodeCount} episodes)`);
  });

  // Show creators/executive producers
  console.log(`\n🎬 [Crew] Key crew members:`);
  tvCredits.crew
    ?.filter((person) => person.job === "Executive Producer" || person.job === "Creator")
    .slice(0, 3)
    .forEach((person) => {
      console.log(`  ${person.name} - ${person.job}`);
    });

  // Images and related content
  const images: TvImages = await tmdb.tv.images(seriesId, { include_image_language: "en,null" });
  console.log(
    `\n📸 [Images] Posters: ${images.posters?.length ?? 0}, Backdrops: ${images.backdrops?.length ?? 0}`
  );

  // Recommendations & Similar shows
  const recommendations = await tmdb.tv.recommendations(seriesId, { page: 1 });
  const similarShows = await tmdb.tv.similar(seriesId, { page: 1 });
  console.log(`\n🔗 [Related Content]`);
  console.log(`   Recommendations: ${recommendations.total_results}`);
  console.log(`   Similar shows: ${similarShows.total_results}`);

  // Show top recommendation
  const topRec = recommendations.results?.[0];
  if (topRec) {
    console.log(
      `   Top recommendation: "${topRec.name}" (${topRec.first_air_date}) ⭐ ${topRec.vote_average}`
    );
  }
}

main().catch(console.error);
