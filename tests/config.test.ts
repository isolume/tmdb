import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { TMDB } from "../src";

function jsonResponse(data: unknown, init?: ResponseInit) {
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
    ...init,
  });
}

describe("ConfigurationService", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("get returns images configuration and change_keys", async () => {
    const sample = {
      images: {
        base_url: "http://image.tmdb.org/t/p/",
        secure_base_url: "https://image.tmdb.org/t/p/",
        backdrop_sizes: ["w300", "w780", "w1280", "original"],
        logo_sizes: ["w45", "w92", "w154", "w500", "original"],
        poster_sizes: ["w92", "w154", "w342", "w500", "w780", "original"],
        profile_sizes: ["w45", "w185", "h632", "original"],
        still_sizes: ["w92", "w185", "w300", "original"],
      },
      change_keys: ["adult", "air_date", "also_known_as"],
    };
    vi.spyOn(globalThis, "fetch").mockResolvedValue(jsonResponse(sample));

    const tmdb = new TMDB({ apiKey: "ABC" });
    const res = await tmdb.configuration.get();

    expect(res.images!.secure_base_url).toMatch(/^https:/);
    expect(Array.isArray(res.images!.poster_sizes)).toBe(true);
    expect(Array.isArray(res.change_keys)).toBe(true);
    expect(res.change_keys!.length).toBeGreaterThan(0);
  });

  it("countries returns an array and supports language parameter", async () => {
    const sample = [
      { iso_3166_1: "US", english_name: "United States", native_name: "United States" },
      { iso_3166_1: "FR", english_name: "France", native_name: "France" },
    ];
    const spy = vi.spyOn(globalThis, "fetch").mockResolvedValue(jsonResponse(sample));

    const tmdb = new TMDB({ apiKey: "ABC" });
    const res = await tmdb.configuration.countries({ language: "en-US" });

    expect(Array.isArray(res)).toBe(true);
    expect(res[0].iso_3166_1).toBe("US");
    expect(spy).toHaveBeenCalled();
    const url = (spy.mock.calls[0]?.[0] as string) ?? "";
    expect(url).toContain("/configuration/countries");
    expect(url).toContain("language=en-US");
  });

  it("jobs returns a list of job groups with departments", async () => {
    const sample = [
      { department: "Directing", jobs: ["Director", "Assistant Director"] },
      { department: "Writing", jobs: ["Writer", "Screenplay"] },
    ];
    vi.spyOn(globalThis, "fetch").mockResolvedValue(jsonResponse(sample));

    const tmdb = new TMDB({ apiKey: "ABC" });
    const res = await tmdb.configuration.jobs();

    expect(Array.isArray(res)).toBe(true);
    expect(res[0].department).toBe("Directing");
    expect(Array.isArray(res[0].jobs)).toBe(true);
    expect(res[0].jobs).toContain("Director");
  });

  it("languages returns an array of language objects", async () => {
    const sample = [
      { iso_639_1: "en", english_name: "English", name: "English" },
      { iso_639_1: "fr", english_name: "French", name: "Français" },
    ];
    const spy = vi.spyOn(globalThis, "fetch").mockResolvedValue(jsonResponse(sample));

    const tmdb = new TMDB({ apiKey: "ABC" });
    const res = await tmdb.configuration.languages();

    expect(Array.isArray(res)).toBe(true);
    expect(res[1].iso_639_1).toBe("fr");
    const url = (spy.mock.calls[0]?.[0] as string) ?? "";
    expect(url).toContain("/configuration/languages");
  });

  it("timezones returns country groups with zone arrays", async () => {
    const sample = [
      { iso_3166_1: "US", zones: ["America/New_York", "America/Los_Angeles"] },
      { iso_3166_1: "IN", zones: ["Asia/Kolkata"] },
    ];
    vi.spyOn(globalThis, "fetch").mockResolvedValue(jsonResponse(sample));

    const tmdb = new TMDB({ apiKey: "ABC" });
    const res = await tmdb.configuration.timezones();

    expect(Array.isArray(res)).toBe(true);
    expect(res[1].iso_3166_1).toBe("IN");
    expect(res[1].zones).toContain("Asia/Kolkata");
  });
});
