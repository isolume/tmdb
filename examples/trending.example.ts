import { TMDB } from "@vo1x/tmdb";

async function main() {
  const tmdb = new TMDB({ apiKey: process.env.TMDB_TOKEN! });

  // --- Trending today
  const trendingToday = await tmdb.trending.daily({ language: "en-US", page: 1 });
  console.log("[Trending Today]", trendingToday.total_results, "results");

  trendingToday.results.slice(0, 5).forEach((item, i) => {
    if (item.media_type === "movie") {
      console.log(`#${i + 1} Movie: ${item.title} (${item.release_date}) ★${item.vote_average}`);
    } else if (item.media_type === "tv") {
      console.log(`#${i + 1} TV: ${item.name} (${item.first_air_date}) ★${item.vote_average}`);
    } else {
      console.log(`#${i + 1} Person: ${item.name} dept: ${item.known_for_department}`);
    }
  });

  // --- Trending this week
  const trendingWeek = await tmdb.trending.weekly({ language: "en-US", page: 1 });
  console.log("[Trending This Week]", trendingWeek.total_results, "results");

  const topTv = trendingWeek.results.find((r) => r.media_type === "tv");
  if (topTv && topTv.media_type === "tv") {
    console.log("Top Weekly TV:", topTv.name, "★", topTv.vote_average);
  }
}

main().catch(console.error);
