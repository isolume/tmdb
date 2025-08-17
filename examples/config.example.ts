import { TMDB } from "@vo1x/tmdb";
import type { TMDBConfiguration } from "@vo1x/tmdb";

// Create the client (user provides apiKey + optional defaults)
const tmdb = new TMDB({
  apiKey: "YOUR_TMDB_API_KEY", // 👈 replace with your real API key
  language: "en-US",
  region: "US",
});

async function main() {
  // Fetch TMDB configuration from /configuration endpoint
  const conf: TMDBConfiguration = await tmdb.config.get();

  console.log("Base URL:", conf.images.secure_base_url);
  console.log("Poster sizes:", conf.images.poster_sizes.join(", "));

  // Example: building a poster URL
  const posterPath = "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg"; // sample path
  const posterUrl = `${conf.images.secure_base_url}w500${posterPath}`;
  console.log("Poster URL:", posterUrl);
}

main().catch((err) => {
  console.error("Error:", err);
});
