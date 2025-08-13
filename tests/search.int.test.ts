import { describe, it, expect } from "vitest";
import { TMDB } from "../src";
import { MultiSearchResult } from "../dist";

const KEY = process.env.TMDB_API_KEY;

(KEY ? describe : describe.skip)("SearchService (integration)", () => {
  const tmdb = new TMDB({
    apiKey: KEY!,
    language: "en-US",
  });

  it("searchMovies hits TMDB and returns results", async () => {
    const res = await tmdb.search.movie("inception", { page: 1, include_adult: false });
    expect(res.page).toBe(1);
    expect(Array.isArray(res.results)).toBe(true);
    expect(res.results[0]).toHaveProperty("id");
  });

  it("searchMulti returns mixed media types", async () => {
    const res = await tmdb.search.multi("batman");
    expect(Array.isArray(res.results)).toBe(true);
    expect(res.results.some((r: MultiSearchResult) => "media_type" in r)).toBe(true);
  });
});
