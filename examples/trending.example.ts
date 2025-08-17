import { TMDB } from "@vo1x/tmdb";
import type { Paged, TrendingAllItem } from "@vo1x/tmdb";

async function main() {
  const tmdb = new TMDB({ apiKey: process.env.TMDB_TOKEN! });

  // Trending today
  const trendingToday: Paged<TrendingAllItem> = await tmdb.trending.daily({ language: "en-US" });
  console.log("[Trending Today]", trendingToday.total_results, "results");

  trendingToday.results.slice(0, 5).forEach((item: TrendingAllItem, i: number) => {
    if (item.media_type === "movie") {
      console.log(
        `#${i + 1} Movie: ${item.title ?? "(untitled)"} (${item.release_date ?? "?"}) ★${item.vote_average ?? "N/A"}`
      );
    } else if (item.media_type === "tv") {
      console.log(
        `#${i + 1} TV: ${item.name ?? "(unnamed)"} (${item.first_air_date ?? "?"}) ★${item.vote_average ?? "N/A"}`
      );
    } else {
      console.log(
        `#${i + 1} Person: ${item.name ?? "(unknown)"} dept: ${item.known_for_department ?? "?"}`
      );
    }
  });

  // Trending this week
  const trendingWeek: Paged<TrendingAllItem> = await tmdb.trending.weekly({ language: "en-US" });
  console.log("[Trending This Week]", trendingWeek.total_results, "results");

  const topTv: TrendingAllItem | undefined = trendingWeek.results.find(
    (r: TrendingAllItem) => r.media_type === "tv"
  );
  if (topTv && topTv.media_type === "tv") {
    console.log("Top Weekly TV:", topTv.name ?? "(unnamed)", "★", topTv.vote_average ?? "N/A");
  }
}

main().catch(console.error);
