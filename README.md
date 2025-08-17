# tmdb

> Unofficial TypeScript SDK for The Movie Database (TMDb) API v3.  
> Works in Node 18+ and modern browsers.  
> This product uses the TMDb API but is not endorsed or certified by TMDb.

## Install

```sh
npm install @vo1x/tmdb
# or
pnpm add @vo1x/tmdb
```

## Quick Start

```ts
import { TMDB } from "@vo1x/tmdb";

const tmdb = new TMDB({
  apiKey: process.env.TMDB_API_KEY!, // required
  language: "en-US"                  // optional default language
});

async function main() {
  // ----- Movies -----
  const movie = await tmdb.movie.getById(27205);
  console.log(movie.title); // "Inception"

  // ----- TV Series -----
  const series = await tmdb.tv.getById(1399); // Game of Thrones
  console.log(series.name);

  // ----- Search -----
  const searchResults = await tmdb.search.movie("batman", { language: "en-US" });
  console.log(searchResults.results.map(m => m.title));

  // ----- Trending -----
  const trending = await tmdb.trending.all("day");
  console.log(trending.results.slice(0, 3));

  // ----- Configuration -----
  const config = await tmdb.configuration.get();
  console.log(config.images.secure_base_url); // e.g. https://image.tmdb.org/t/p/
}
main();
```

## API

Currently supports:
- **Movies** — details, credits, images, recommendations, similar
- **TV Series** — details, credits, images, recommendations, similar
- **Search** — search for movies, TV series, and people
- **Trending** — get the trending movies, TV shows and people
- **Config** — fetch API configuration, countries, jobs, languages, translations, and timezones

## More Examples
See the [`examples/`](./examples) directory for:
- `movie.example.ts` — movie usage
- `tv.example.ts` — TV series usage
- `search.example.ts` — search API usage
- `trending.example.ts` — trending API usage
- `config.example.ts` — configuration API usage

## Requirements
- Node.js 18+ or modern browsers (global `fetch` available)
- TMDb v3 API key (get one at https://www.themoviedb.org/settings/api)

## License
MIT © vo1x
