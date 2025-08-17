import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { TMDB } from "../src";
import { TrendingAllItem } from "../src";

function jsonResponse(data: unknown, init?: ResponseInit) {
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
    ...init,
  });
}

describe("TrendingService", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("daily returns a paged mixed-media response", async () => {
    const sample = {
      page: 1,
      total_pages: 10,
      total_results: 200,
      results: [
        { media_type: "movie", id: 10, title: "A Movie", original_title: "A Movie", overview: "" },
        { media_type: "tv", id: 20, name: "A Show", original_name: "A Show", overview: "" },
        { media_type: "person", id: 30, name: "A Person", known_for_department: "Acting" },
      ],
    };
    vi.spyOn(globalThis, "fetch").mockResolvedValue(jsonResponse(sample));

    const tmdb = new TMDB({ apiKey: "ABC" });
    const res = await tmdb.trending.daily({ language: "en-US" });

    expect(res.page).toBe(1);
    expect(res.total_results).toBe(200);
    expect(Array.isArray(res.results)).toBe(true);
    expect(res.results[0].media_type).toBe("movie");
    expect(res.results[1].media_type).toBe("tv");
    expect(res.results[2].media_type).toBe("person");
  });

  it("weekly returns a paged response and supports pagination", async () => {
    const sample = {
      page: 2,
      total_pages: 3,
      total_results: 60,
      results: [
        {
          media_type: "movie",
          id: 101,
          title: "Another Movie",
          original_title: "Another Movie",
          overview: "",
        },
      ],
    };
    vi.spyOn(globalThis, "fetch").mockResolvedValue(jsonResponse(sample));

    const tmdb = new TMDB({ apiKey: "ABC" });
    const res = await tmdb.trending.weekly({ language: "en-US" });

    expect(res.page).toBe(2);
    expect(res.total_pages).toBe(3);
    expect(res.results.length).toBe(1);
    expect(res.results[0].media_type).toBe("movie");
    expect(res.results[0].id).toBe(101);
  });

  it("handles person results with known_for array", async () => {
    const sample = {
      page: 1,
      total_pages: 1,
      total_results: 1,
      results: [
        {
          media_type: "person",
          id: 300,
          name: "Famous Actor",
          known_for_department: "Acting",
          // Allow SearchMovie | SearchTv shapes here
          known_for: [
            { id: 1, title: "Known Movie", original_title: "Known Movie", overview: "" },
            { id: 2, name: "Known Show", original_name: "Known Show", overview: "" },
          ],
        },
      ],
    };
    vi.spyOn(globalThis, "fetch").mockResolvedValue(jsonResponse(sample));

    const tmdb = new TMDB({ apiKey: "ABC" });
    const res = await tmdb.trending.daily({});

    expect(res.results[0].media_type).toBe("person");
    const person = res.results[0];
    if (person.media_type === "person" && "name" in person) {
      expect((person as any).name).toBe("Famous Actor");
      expect(Array.isArray((person as any).known_for)).toBe(true);
    }
  });
});
