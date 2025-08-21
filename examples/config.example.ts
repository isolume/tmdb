import { TMDB, type TMDBConfiguration, type Country, type Language } from "@vo1x/tmdb";

/**
 * Configuration example showing how to work with TMDB configuration data
 * Demonstrates type safety when building image URLs and working with metadata
 */
async function main() {
  const tmdb = new TMDB({
    apiKey: process.env.TMDB_TOKEN!,
    language: "en-US",
  });

  // Get configuration with full type safety
  const config: TMDBConfiguration = await tmdb.configuration.get();
  console.log("🔧 TMDB Configuration loaded");

  // Type-safe image configuration
  if (config.images) {
    const { secureBaseUrl, posterSizes, backdropSizes } = config.images;
    console.log(`\n📸 Image Configuration:`);
    console.log(`  Base URL: ${secureBaseUrl}`);
    console.log(`  Poster sizes: ${posterSizes?.join(", ") ?? "None"}`);
    console.log(`  Backdrop sizes: ${backdropSizes?.join(", ") ?? "None"}`);

    // Helper function with type safety
    const buildImageUrl = (path: string, size: string = "w500"): string => {
      return `${secureBaseUrl}${size}${path}`;
    };

    // Example usage
    const samplePosterPath = "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg";
    console.log(`  Example poster URL: ${buildImageUrl(samplePosterPath)}`);
  }

  // Get available countries with typing
  const countries: Country[] = await tmdb.configuration.countries();
  console.log(`\n🌍 Available countries: ${countries.length}`);
  countries.slice(0, 5).forEach((country) => {
    // TypeScript knows Country has iso_3166_1 and english_name
    console.log(`  ${country.iso31661}: ${country.englishName}`);
  });

  // Get available languages with typing
  const languages: Language[] = await tmdb.configuration.languages();
  console.log(`\n🗣️ Available languages: ${languages.length}`);
  languages
    .filter(
      (lang) => lang.englishName?.includes("English") || lang.englishName?.includes("Spanish")
    )
    .forEach((language) => {
      // TypeScript knows Language structure
      console.log(`  ${language.iso6391}: ${language.englishName} (${language.name})`);
    });
}

main().catch((err) => {
  console.error("Error:", err);
});
