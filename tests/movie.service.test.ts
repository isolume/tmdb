import { describe, it, expect, vi } from "vitest";
import { TMDB } from "../src";

function jsonResponse(data: unknown, init?: ResponseInit) {
  return new Response(JSON.stringify(data), { status: 200, headers: { "Content-Type": "application/json" }, ...init });
}

describe("MovieService", () => {
  it("getById returns a Movie", async () => {
    const sample = { id: 27205, title: "Inception", original_title: "Inception", overview: "" };
    vi.spyOn(globalThis, "fetch").mockResolvedValue(jsonResponse(sample));

    const tmdb = new TMDB({ apiKey: "ABC" });
    const m = await tmdb.movies.get(27205);

    expect(m.id).toBe(27205);
    expect(m.title).toBe("Inception");
  });

  it("recommendations returns paged results", async () => {
    const sample = { page: 1, total_pages: 3, total_results: 60, results: [{ id: 1, title: "Other" }] };
    vi.spyOn(globalThis, "fetch").mockResolvedValue(jsonResponse(sample));

    const tmdb = new TMDB({ apiKey: "ABC" });
    const res = await tmdb.movies.recommendations(27205, { page: 1 });

    expect(res.page).toBe(1);
    expect(Array.isArray(res.results)).toBe(true);
  });
});
