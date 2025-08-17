import { TMDB } from "@vo1x/tmdb";
import type { TMDBConfiguration } from "@vo1x/tmdb";

const tmdb = new TMDB({
  apiKey: "YOUR_TMDB_API_KEY",
  language: "en-US",
  region: "US",
});

async function main() {
  const conf: TMDBConfiguration = await tmdb.config.get();

  // Guard because the OpenAPI type marks images as optional
  if (!conf.images) {
    throw new Error("TMDB configuration did not include `images`.");
  }

  const { secure_base_url, poster_sizes } = conf.images;

  console.log("Base URL:", secure_base_url);
  console.log("Poster sizes:", (poster_sizes ?? []).join(", "));

  // Example: building a poster URL
  const posterPath = "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg"; // sample path
  const posterUrl = `${secure_base_url}w500${posterPath}`;
  console.log("Poster URL:", posterUrl);
}

main().catch((err) => {
  console.error("Error:", err);
});
