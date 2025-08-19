import { describe, it, expect } from "vitest";
import { TMDB } from "../src";

const KEY = process.env.TMDB_API_KEY;

(KEY ? describe : describe.skip)("Trending (integration)", () => {
  const tmdb = new TMDB({ apiKey: KEY!, language: "en-US" });

  it("fetches daily trending (all)", async () => {
    const res = await tmdb.trending.daily({ language: "en-US" });
    expect(typeof res.page).toBe("number");
    expect(Array.isArray(res.results)).toBe(true);
    // At least one item should exist typically
    if (res.results && res.results.length > 0) {
      const item = res.results[0];
      expect(["movie", "tv", "person"]).toContain(item.media_type);
    }
  });

  it("fetches weekly trending (all)", async () => {
    const res = await tmdb.trending.weekly({ language: "en-US" });
    expect(typeof res.page).toBe("number");
    expect(Array.isArray(res.results)).toBe(true);
  });
});
