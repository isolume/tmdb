import { describe, it, expect, vi } from "vitest";
import { HttpClient } from "../src/core";
import type { TMDBOptions } from "../src";

function jsonResponse(data: unknown, init?: ResponseInit) {
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
    ...init,
  });
}

describe("HttpClient", () => {
  it("appends api_key and default language/region", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue(jsonResponse({ ok: true }));
    const http = new HttpClient({ apiKey: "ABC", language: "en-US", region: "US" } as TMDBOptions);

    await http.get("/movie/1");

    const calledUrl = fetchSpy.mock.calls[0][0] as string;
    expect(calledUrl).toContain("api_key=ABC");
    expect(calledUrl).toContain("language=en-US");
    expect(calledUrl).toContain("region=US");
  });

  it("throws TMDBError on non-2xx with parsed message/code", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      jsonResponse(
        { status_message: "Invalid API key: You must be granted a valid key.", status_code: 7 },
        { status: 401 }
      )
    );
    const http = new HttpClient({ apiKey: "BAD" } as TMDBOptions);

    await expect(http.get("/movie/1")).rejects.toMatchObject({
      name: "TMDBError",
      status: 401,
      code: 7,
    });
  });
});
