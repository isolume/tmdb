# @vo1x/tmdb

<div align="center">
  <h3>🎬 Unofficial TypeScript SDK for The Movie Database (TMDb) API v3</h3>
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

## ✨ Features

- 🔒 **Fully Type-Safe** - Complete TypeScript support with auto-generated types
- 🚀 **Modern API** - Built with ES2022, supports Node.js 18+ and modern browsers
- 📦 **Lightweight** - Tree-shakeable, minimal dependencies
- 🔍 **Comprehensive** - Covers movies, TV shows, search, trending, and configuration
- 🛡️ **Error Handling** - Structured error responses with detailed information
- 📖 **Well Documented** - Extensive examples and clear API documentation
- ⚡ **High Performance** - Optimized for speed with intelligent caching

## 📦 Installation

```bash
# npm
npm install @vo1x/tmdb

# pnpm
pnpm add @vo1x/tmdb

# yarn
yarn add @vo1x/tmdb
```

## 🚀 Quick Start

```typescript
import { TMDB } from "@vo1x/tmdb";

const tmdb = new TMDB({
  apiKey: process.env.TMDB_API_KEY!, // Get your API key from https://www.themoviedb.org/settings/api
  language: "en-US",                  // Optional: default language for responses
});

// Get movie details with full type safety
const movie = await tmdb.movies.get(550); // Fight Club
console.log(`${movie.title} (${movie.release_date}) - ⭐ ${movie.vote_average}/10`);

// Search for movies
const searchResults = await tmdb.search.movies("inception");
console.log(`Found ${searchResults.total_results} movies`);

// Get trending content
const trending = await tmdb.trending.daily();
console.log("Today's trending:", trending.results?.slice(0, 5));
```

> 💡 **Need an API key?** Get your free TMDb API key at [themoviedb.org/settings/api](https://www.themoviedb.org/settings/api)

## 📚 API Reference

### Movies

```typescript
// Get movie details
const movie = await tmdb.movies.get(550, { language: "en-US" });

// Get movie credits (cast & crew)
const credits = await tmdb.movies.credits(550);

// Get movie images
const images = await tmdb.movies.images(550);

// Get recommendations
const recommendations = await tmdb.movies.recommendations(550);

// Get similar movies
const similar = await tmdb.movies.similar(550);
```

### TV Shows

```typescript
// Get TV show details
const show = await tmdb.tv.get(1399); // Game of Thrones

// Get TV credits
const credits = await tmdb.tv.credits(1399);

// Get TV images
const images = await tmdb.tv.images(1399);

// Get recommendations
const recommendations = await tmdb.tv.recommendations(1399);

// Get similar shows
const similar = await tmdb.tv.similar(1399);
```

### Search

```typescript
// Search movies
const movies = await tmdb.search.movies("batman", {
  page: 1,
  include_adult: false,
});

// Search TV shows
const tvShows = await tmdb.search.tv("breaking bad");

// Search people
const people = await tmdb.search.people("leonardo dicaprio");

// Multi search (movies, TV shows, and people)
const results = await tmdb.search.multi("marvel");
```

### Trending

```typescript
// Daily trending (all media types)
const dailyTrending = await tmdb.trending.daily();

// Weekly trending
const weeklyTrending = await tmdb.trending.weekly();
```

### Configuration

```typescript
// Get API configuration
const config = await tmdb.configuration.get();

// Get available countries
const countries = await tmdb.configuration.countries();

// Get available languages
const languages = await tmdb.configuration.languages();

// Get available jobs
const jobs = await tmdb.configuration.jobs();

// Get available timezones
const timezones = await tmdb.configuration.timezones();
```

## 🛡️ Error Handling

The SDK provides structured error handling with the `TMDBError` class:

```typescript
import { TMDB, TMDBError } from "@vo1x/tmdb";

try {
  const movie = await tmdb.movies.get(999999999); // Invalid ID
} catch (error) {
  if (error instanceof TMDBError) {
    console.log(`Error: ${error.message}`);
    console.log(`Status: ${error.status}`);
    console.log(`TMDb Code: ${error.code}`);
  }
}
```

## 📖 Examples

Check out the [`examples/`](./examples) directory for comprehensive usage examples:

- [`movie.example.ts`](./examples/movie.example.ts) - Movie details, credits, and images
- [`tv.example.ts`](./examples/tv.example.ts) - TV show information and credits
- [`search.example.ts`](./examples/search.example.ts) - Search functionality with type discrimination
- [`trending.example.ts`](./examples/trending.example.ts) - Trending content with filtering
- [`config.example.ts`](./examples/config.example.ts) - Configuration and image URL building
- [`error-handling.example.ts`](./examples/error-handling.example.ts) - Comprehensive error handling

### Running Examples

```bash
# Run a specific example
pnpm example:movie
pnpm example:search
pnpm example:trending

# Or run with your API key
TMDB_API_KEY=your_api_key pnpm example:movie
```

## 🔧 Configuration Options

```typescript
const tmdb = new TMDB({
  apiKey: "your_api_key",     // Required: Your TMDb API key
  baseUrl?: "custom_url",     // Optional: Custom API base URL
  language?: "en-US",         // Optional: Default language for responses
  timeout?: 10000,            // Optional: Request timeout in milliseconds
});
```

## 🌐 Supported Environments

- **Node.js**: 18.0.0 or higher
- **Browsers**: All modern browsers with native `fetch` support
- **TypeScript**: 4.7 or higher (optional but recommended)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚖️ Legal

This product uses the TMDb API but is not endorsed or certified by TMDb. TMDb is a trademark of The Movie Database.

---

<div align="center">
  <strong>Made with ❤️ by <a href="https://github.com/vo1x">vo1x</a></strong>
</div>
