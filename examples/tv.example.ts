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

  console.log(`📺 [TV Show] "${tvShow.name}" (${tvShow.firstAirDate})`);
  console.log(`   Status: ${tvShow.status}`);
  console.log(`   Seasons: ${tvShow.numberOfSeasons}, Episodes: ${tvShow.numberOfEpisodes}`);
  console.log(`   Rating: ⭐ ${tvShow.voteAverage}/10 (${tvShow.voteCount} votes)`);
  console.log(`   Genres: ${tvShow.genres?.map((g) => g.name).join(", ") ?? "None"}`);
  console.log(`   Networks: ${tvShow.networks?.map((n) => n.name).join(", ") ?? "None"}`);

  // Show episode information if available
  if (tvShow.lastEpisodeToAir) {
    const lastEp = tvShow.lastEpisodeToAir;
    console.log(
      `   Last Episode: S${lastEp.seasonNumber}E${lastEp.episodeNumber} "${lastEp.name}" (${lastEp.airDate})`
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
  const images: TvImages = await tmdb.tv.images(seriesId, { includeImageLanguage: "en,null" });
  console.log(
    `\n📸 [Images] Posters: ${images.posters?.length ?? 0}, Backdrops: ${images.backdrops?.length ?? 0}`
  );

  // Recommendations & Similar shows
  const recommendations = await tmdb.tv.recommendations(seriesId, { page: 1 });
  const similarShows = await tmdb.tv.similar(seriesId, { page: 1 });
  console.log(`\n🔗 [Related Content]`);
  console.log(`   Recommendations: ${recommendations.totalResults}`);
  console.log(`   Similar shows: ${similarShows.totalResults}`);

  // Show top recommendation
  const topRec = recommendations.results?.[0];
  if (topRec) {
    console.log(
      `   Top recommendation: "${topRec.name}" (${topRec.firstAirDate}) ⭐ ${topRec.voteAverage}`
    );
  }
}

main().catch(console.error);
