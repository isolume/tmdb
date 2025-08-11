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
  language: "en-US"                  // optional default
});

async function main() {
  // Get movie details
  const movie = await tmdb.movie.getById(27205);
  console.log(movie.title); // "Inception"

  // Get movie credits
  const credits = await tmdb.movie.credits(27205);
  console.log(credits.cast.map(c => c.name));

  // Get recommendations
  const recs = await tmdb.movie.recommendations(27205, { page: 1 });
  for (const r of recs.results) {
    console.log(r.title);
  }
}

main();
```

## API

Currently supports:
- Movies — details, credits, images, recommendations, similar

## Requirements
- Node.js 18+ or modern browsers (global fetch available)
- TMDb v3 API key (get one at https://www.themoviedb.org/settings/api)

## License
MIT © vo1x
