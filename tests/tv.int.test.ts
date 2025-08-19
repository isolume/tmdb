import { describe, it, expect } from "vitest";
import { TMDB } from "../src";

const KEY = process.env.TMDB_API_KEY;

(KEY ? describe : describe.skip)("TV (integration)", () => {
  const tmdb = new TMDB({ apiKey: KEY!, language: "en-US" });

  it("fetches real TV series data", async () => {
    const series = await tmdb.tv.get(1399); // Game of Thrones
    expect(series.id).toBe(1399);
    expect(typeof series.name).toBe("string");
  });
});
