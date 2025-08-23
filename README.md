# @vo1x/tmdb

<div align="center">
  <h3>A TypeScript SDK for The Movie Database (TMDb) API v3</h3>
  <p>
    <strong>Type-safe • Modern • Lightweight</strong>
  </p>
  <p>
    <a href="https://www.npmjs.com/package/@vo1x/tmdb"><img src="https://img.shields.io/npm/v/@vo1x/tmdb?style=flat-square" alt="npm version"></a>
    <a href="https://www.npmjs.com/package/@vo1x/tmdb"><img src="https://img.shields.io/npm/dm/@vo1x/tmdb?style=flat-square" alt="npm downloads"></a>
    <img src="https://img.shields.io/badge/TypeScript-Ready-blue?style=flat-square" alt="TypeScript">
    <img src="https://img.shields.io/badge/Node.js-18+-green?style=flat-square" alt="Node.js">
    <a href="https://github.com/vo1x/tmdb/blob/main/LICENSE"><img src="https://img.shields.io/github/license/vo1x/tmdb?style=flat-square" alt="License"></a>
  </p>
  <p>
    <em>This product uses the TMDb API but is not endorsed or certified by TMDb.</em>
  </p>
</div>

---

## Features

- **Type-Safe**: Automatically generated types from the TMDb OpenAPI spec ensure your code is correct.
- **Modern**: Uses modern JavaScript (ES2022) and works in Node.js 18+ and browsers with native `fetch`.
- **Lightweight**: Minimal dependencies and tree-shakeable to keep your project lean.
- **Comprehensive**: Covers all major endpoints: movies, TV, search, trending, and configuration.
- **Clean Errors**: Provides structured, useful errors for easier debugging.

## Installation

```bash
# npm
npm install @vo1x/tmdb

# pnpm
pnpm add @vo1x/tmdb

# yarn
yarn add @vo1x/tmdb
```

## Quick Start

```typescript
import { TMDB } from "@vo1x/tmdb";

const tmdb = new TMDB({
  apiKey: process.env.TMDB_API_KEY!, // Get a key at [https://www.themoviedb.org/settings/api](https://www.themoviedb.org/settings/api)
});

// Get movie details
const movie = await tmdb.movies.get(550); // Fight Club
console.log(`${movie.title} (${movie.releaseDate}) - ${movie.voteAverage}/10`);

// Search for movies
const searchResults = await tmdb.search.movies("inception");
console.log(`Found ${searchResults.totalResults} movies.`);
```

## API Reference

### Movies

```typescript
// Get movie details
const movie = await tmdb.movies.get(550, { language: "en-US" });

// Get credits
const credits = await tmdb.movies.credits(550);

// Get images
const images = await tmdb.movies.images(550);

// Get recommendations and similar movies
const recommendations = await tmdb.movies.recommendations(550);
const similar = await tmdb.movies.similar(550);
```

### TV Shows

```typescript
// Get TV show details
const show = await tmdb.tv.get(1399); // Game of Thrones

// Get credits, images, recommendations, etc.
const credits = await tmdb.tv.credits(1399);
const images = await tmdb.tv.images(1399);
```

### Search

```typescript
// Search for movies, TV shows, or people
const movies = await tmdb.search.movies("batman", { page: 1, includeAdult: false });
const tvShows = await tmdb.search.tv("breaking bad");
const people = await tmdb.search.people("leonardo dicaprio");

// Search across all types
const results = await tmdb.search.multi("marvel");
```

### Trending

```typescript
// Get daily or weekly trending content
const dailyTrending = await tmdb.trending.daily();
const weeklyTrending = await tmdb.trending.weekly();
```

### Configuration

```typescript
// Get API configuration, countries, languages, etc.
const config = await tmdb.configuration.get();
const countries = await tmdb.configuration.countries();
```
### Person

```typescript
// Get person details
const person = await tmdb.person.get(287); // Christian Bale

// Get images and combined credits
const images = await tmdb.person.images(287);
const credits = await tmdb.person.combinedCredits(287);
```

## Error Handling

The SDK throws a `TMDBError` for API or network issues.

```typescript
import { TMDB, TMDBError } from "@vo1x/tmdb";

try {
  await tmdb.movies.get(999999999); // Invalid ID
} catch (error) {
  if (error instanceof TMDBError) {
    console.error(`Error ${error.status}: ${error.message}`);
    // error.code contains the TMDb-specific error code
  }
}
```

## Examples

The [`examples/`](./examples) directory contains more detailed examples for each module.

### Running Examples

```bash
# Run a specific example
pnpm example:movie

# Or run with your API key
TMDB_API_KEY=your_api_key pnpm example:movie
```

## Configuration Options

```typescript
const tmdb = new TMDB({
  apiKey: "your_api_key",     // Required
  baseUrl?: "custom_url",     // Optional
  language?: "en-US",         // Optional
});
```

## Contributing

Contributions are welcome. Feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
