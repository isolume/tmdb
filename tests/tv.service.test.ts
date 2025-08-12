import { describe, it, expect, vi } from "vitest";
import { TMDB } from "../src";

function jsonResponse(data: unknown, init?: ResponseInit) {
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
    ...init,
  });
}

describe("TvService", () => {
  it("getById returns a TVSeries", async () => {
    const sample = {
      id: 1399,
      name: "Game of Thrones",
      original_name: "Game of Thrones",
      overview: "",
    };
    vi.spyOn(globalThis, "fetch").mockResolvedValue(jsonResponse(sample));

    const tmdb = new TMDB({ apiKey: "ABC" });
    const series = await tmdb.tv.getById(1399);

    expect(series.id).toBe(1399);
    expect(series.name).toBe("Game of Thrones");
  });

  it("recommendations returns paged results", async () => {
    const sample = {
      page: 1,
      total_pages: 2,
      total_results: 40,
      results: [{ id: 1, name: "Other Show", original_name: "Other Show", overview: "" }],
    };
    vi.spyOn(globalThis, "fetch").mockResolvedValue(jsonResponse(sample));

    const tmdb = new TMDB({ apiKey: "ABC" });
    const res = await tmdb.tv.recommendations(1399, { page: 1 });

    expect(res.page).toBe(1);
    expect(Array.isArray(res.results)).toBe(true);
  });
});
