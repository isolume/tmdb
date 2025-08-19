import { TMDB, TMDBError } from "@vo1x/tmdb";

/**
 * Error handling example demonstrating type-safe error management
 * Shows how to handle different types of errors with TypeScript
 */
async function main() {
  const tmdb = new TMDB({ apiKey: process.env.TMDB_TOKEN! });

  console.log("🔍 Testing TMDB Error Handling\n");

  // Example 1: Handling invalid movie ID (404 error)
  try {
    console.log("1. Testing invalid movie ID...");
    const invalidMovie = await tmdb.movies.get(999999999);
    console.log("   This shouldn't print - movie found:", invalidMovie.title);
  } catch (error) {
    if (error instanceof TMDBError) {
      // TypeScript knows this is a TMDBError with specific properties
      console.log(`   ❌ TMDBError: ${error.message}`);
      console.log(`   Status: ${error.status}`);
      console.log(`   TMDB Code: ${error.code ?? "N/A"}`);
    } else {
      console.log(`   ❌ Unexpected error:`, error);
    }
  }

  // Example 2: Handling rate limits (429 error)
  try {
    console.log("\n2. Testing multiple rapid requests (potential rate limit)...");
    // Make several requests quickly to potentially trigger rate limiting
    const promises = Array.from(
      { length: 5 },
      (_, i) => tmdb.movies.get(550 + i) // Fight Club and nearby IDs
    );

    const movies = await Promise.all(promises);
    console.log(`   ✅ All requests succeeded: ${movies.map((m) => m.title).join(", ")}`);
  } catch (error) {
    if (error instanceof TMDBError) {
      if (error.status === 429) {
        console.log(`   ⏱️ Rate limited: ${error.message}`);
        console.log(`   Tip: Implement exponential backoff in production`);
      } else {
        console.log(`   ❌ TMDB Error: ${error.message} (Status: ${error.status})`);
      }
    } else {
      console.log(`   ❌ Network or other error:`, error);
    }
  }

  // Example 3: Handling search with invalid parameters
  try {
    console.log("\n3. Testing search with invalid parameters...");
    // This might cause validation errors
    const searchResult = await tmdb.search.movies("", {
      page: -1, // Invalid page number
      include_adult: false,
    });
    console.log(`   ✅ Search succeeded: ${searchResult.total_results} results`);
  } catch (error) {
    if (error instanceof TMDBError) {
      console.log(`   ❌ Search failed: ${error.message}`);
      if (error.status === 422) {
        console.log(`   This is likely a validation error`);
      }
    } else {
      console.log(`   ❌ Unexpected error:`, error);
    }
  }

  // Example 4: Graceful error handling with fallbacks
  console.log("\n4. Demonstrating graceful fallbacks...");

  const movieIds = [550, 999999999, 13, 999999998, 11]; // Mix of valid and invalid IDs

  for (const id of movieIds) {
    try {
      const movie = await tmdb.movies.get(id);
      console.log(`   ✅ ${movie.title} (${movie.release_date})`);
    } catch (error) {
      if (error instanceof TMDBError && error.status === 404) {
        console.log(`   ⚠️ Movie ID ${id} not found - skipping`);
      } else {
        console.log(
          `   ❌ Failed to fetch movie ${id}:`,
          error instanceof Error ? error.message : error
        );
        // In production, you might want to break or implement retry logic here
      }
    }
  }

  // Example 5: Type-safe error information extraction
  console.log("\n5. Extracting detailed error information...");

  try {
    // Trigger an error with invalid API key format
    const badTmdb = new TMDB({ apiKey: "invalid_key" });
    await badTmdb.movies.get(550);
  } catch (error) {
    if (error instanceof TMDBError) {
      // TypeScript provides full type safety for error properties
      const errorInfo = {
        message: error.message,
        status: error.status,
        code: error.code,
        hasBody: !!error.body,
        bodyKeys: error.body ? Object.keys(error.body) : [],
      };

      console.log(`   Error details:`, JSON.stringify(errorInfo, null, 2));
    }
  }

  console.log("\n✅ Error handling examples completed!");
}

main().catch((error) => {
  console.error("Example failed:", error);
  process.exit(1);
});
