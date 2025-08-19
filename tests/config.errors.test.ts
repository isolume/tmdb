import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { TMDB, TMDBError } from "../src";

function response(body: unknown, init?: ResponseInit) {
  const isString = typeof body === "string";
  return new Response(isString ? body : JSON.stringify(body), {
    status: 200,
    headers: { "Content-Type": "application/json" },
    ...init,
  });
}

describe("ConfigurationService (error cases)", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("throws TMDBError on 401 unauthorized (GET /configuration)", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      response(
        { status_message: "Invalid API key", status_code: 7, success: false },
        { status: 401 }
      )
    );

    const tmdb = new TMDB({ apiKey: "BAD" });

    await expect(tmdb.configuration.get()).rejects.toBeInstanceOf(TMDBError);
    await expect(tmdb.configuration.get()).rejects.toMatchObject({
      status: 401,
    });
  });

  it("throws TMDBError on 404 not found (GET /configuration/countries)", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      response(
        { status_message: "The resource you requested could not be found.", status_code: 34 },
        { status: 404 }
      )
    );

    const tmdb = new TMDB({ apiKey: "ABC" });

    await expect(tmdb.configuration.countries()).rejects.toBeInstanceOf(TMDBError);
    await expect(tmdb.configuration.countries()).rejects.toMatchObject({
      status: 404,
    });
  });

  it("throws TMDBError on 500 server error (GET /configuration/languages)", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      response({ status_message: "Internal error" }, { status: 500 })
    );

    const tmdb = new TMDB({ apiKey: "ABC" });

    await expect(tmdb.configuration.languages()).rejects.toBeInstanceOf(TMDBError);
    await expect(tmdb.configuration.languages()).rejects.toMatchObject({
      status: 500,
    });
  });

  it("propagates network failures (fetch rejects)", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new TypeError("Network failure"));

    const tmdb = new TMDB({ apiKey: "ABC" });

    await expect(tmdb.configuration.jobs()).rejects.toBeInstanceOf(TypeError);
    await expect(tmdb.configuration.jobs()).rejects.toThrow("Network failure");
  });

  it("handles invalid JSON payload (malformed JSON) for /configuration", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response("{not-valid-json", {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    );

    const tmdb = new TMDB({ apiKey: "ABC" });

    await expect(tmdb.configuration.get()).rejects.toBeInstanceOf(TMDBError);
    await expect(tmdb.configuration.get()).rejects.toMatchObject({
      message: expect.stringMatching(/parse|json/i),
    });
  });

  it("bubbles query param encoding issues (bad language) without crashing", async () => {
    const spy = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(
        response({ status_message: "Invalid parameter: language" }, { status: 422 })
      );

    const tmdb = new TMDB({ apiKey: "ABC" });
    await expect(tmdb.configuration.countries({ language: "en_US" })).rejects.toBeInstanceOf(
      TMDBError
    );

    expect(spy).toHaveBeenCalled();
    const url = (spy.mock.calls[0]?.[0] as string) ?? "";
    expect(url).toContain("/configuration/countries");
    expect(url).toContain("language=en_US");
  });
});
