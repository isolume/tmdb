import { describe, it, expect } from "vitest";
import { TMDB } from "../src";

const KEY = process.env.TMDB_API_KEY;

(KEY ? describe : describe.skip)("Movie (integration)", () => {
  const tmdb = new TMDB({ apiKey: KEY!, language: "en-US" });

  it("fetches real movie data", async () => {
    const m = await tmdb.movies.get(27205);
    expect(m.id).toBe(27205);
    expect(typeof m.title).toBe("string");
  });
});
