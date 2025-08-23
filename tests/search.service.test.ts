import { describe, it, expect, vi, afterEach } from "vitest";
import { TMDB } from "../src";
import { MultiSearchResult } from "../src";

function jsonResponse(data: unknown, init?: ResponseInit) {
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
    ...init,
  });
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe("SearchService (unit)", () => {
  it("searchMovies returns paged movie results", async () => {
    const sample = {
      page: 1,
      total_pages: 3,
      total_results: 60,
      results: [
        {
          id: 27205,
          title: "Inception",
          original_title: "Inception",
          overview: "…",
          poster_path: "/poster.jpg",
          genre_ids: [28, 878],
        },
      ],
    };

    const spy = vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(jsonResponse(sample));

    const tmdb = new TMDB({ apiKey: "ABC" });
    const res = await tmdb.search.movies("inception", { page: 1, includeAdult: false });

    expect(res.page).toBe(1);
    expect(Array.isArray(res.results)).toBe(true);
    expect(res.results && res.results.length > 0 && res.results[0].title).toBe("Inception");

    const calledUrl = new URL(spy.mock.calls[0][0] as string);
    expect(calledUrl.pathname).toMatch(/\/search\/movie$/);
    expect(calledUrl.searchParams.get("query")).toBe("inception");
    expect(calledUrl.searchParams.get("page")).toBe("1");
    expect(calledUrl.searchParams.get("includeAdult")).toBe("false");
  });

  it("searchTv returns paged tv results", async () => {
    const sample = {
      page: 1,
      total_pages: 2,
      total_results: 2,
      results: [
        {
          id: 1399,
          name: "Game of Thrones",
          original_name: "Game of Thrones",
          overview: "…",
          poster_path: "/got.jpg",
          genre_ids: [18, 10765],
        },
      ],
    };
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(jsonResponse(sample));

    const tmdb = new TMDB({ apiKey: "ABC" });
    const res = await tmdb.search.tv("game of thrones", { firstAirDateYear: 2011 });

    expect(res.results && res.results.length > 0 && res.results[0].name).toBe("Game of Thrones");
  });

  it("searchPeople returns paged person results", async () => {
    const sample = {
      page: 1,
      total_pages: 1,
      total_results: 1,
      results: [
        {
          id: 287,
          name: "Brad Pitt",
          profile_path: "/pitt.jpg",
          known_for_department: "Acting",
          known_for: [],
        },
      ],
    };
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(jsonResponse(sample));

    const tmdb = new TMDB({ apiKey: "ABC" });
    const res = await tmdb.search.people("brad pitt");

    expect(res.results && res.results.length > 0 && res.results[0].name).toBe("Brad Pitt");
  });

  it("searchMulti returns mixed results", async () => {
    const sample = {
      page: 1,
      total_pages: 1,
      total_results: 3,
      results: [
        { id: 1, title: "A Movie", media_type: "movie", poster_path: null, genre_ids: [] },
        { id: 2, name: "A TV", media_type: "tv", poster_path: null, genre_ids: [] },
        { id: 3, name: "A Person", media_type: "person", profile_path: null },
      ],
    };
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(jsonResponse(sample));

    const tmdb = new TMDB({ apiKey: "ABC" });
    const res = await tmdb.search.multi("a");

    expect(res.results && res.results.length).toBe(3);
    const types = res.results ? res.results.map((r: MultiSearchResult) => r.mediaType) : [];
    expect(types).toContain("movie");
    expect(types).toContain("tv");
    expect(types).toContain("person");
  });

  it("encodes special characters in query", async () => {
    const sample = { page: 1, total_pages: 1, total_results: 0, results: [] };
    const spy = vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(jsonResponse(sample));

    const tmdb = new TMDB({ apiKey: "ABC" });
    await tmdb.search.movies("spider man: home-coming");

    const calledUrl = new URL(spy.mock.calls[0][0] as string);
    expect(calledUrl.searchParams.get("query")).toBe("spider man: home-coming");
  });

  it("propagates HTTP errors", async () => {
    const errorResponse = new Response("Bad Request", { status: 400 });
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(errorResponse);

    const tmdb = new TMDB({ apiKey: "ABC" });
    await expect(tmdb.search.movies("bad")).rejects.toThrow(); // your HttpClient should throw on !ok
  });
});
