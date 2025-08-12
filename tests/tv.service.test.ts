import { describe, it, expect, vi, beforeEach } from "vitest";
import { TvService } from "../src/services/tv";
import type { HttpClient } from "../src/client";
import type { ITVSeries, Paged } from "../src/services/types";

describe("TvService", () => {
  let http: HttpClient;
  let service: TvService;

  beforeEach(() => {
    http = {
      get: vi.fn(),
    } as unknown as HttpClient;

    service = new TvService(http);
  });

  it("calls getDetails with the correct path and passes opts through", async () => {
    const mockSeries: ITVSeries = {
      id: 1399,
      name: "Game of Thrones",
      original_name: "Game of Thrones",
      overview: "",
    };
    (http.get as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce(mockSeries);

    const result = await service.getById(1399, {
      language: "en-US",
      append_to_response: "aggregate_credits,images",
    });

    expect(http.get).toHaveBeenCalledWith("/tv/1399", {
      language: "en-US",
      append_to_response: "aggregate_credits,images",
    });
    expect(result).toEqual(mockSeries);
  });

  it("calls getDetails without opts", async () => {
    const mockSeries: ITVSeries = {
      id: 1668,
      name: "Friends",
      original_name: "Friends",
      overview: "",
    };
    (http.get as any).mockResolvedValueOnce(mockSeries);

    const result = await service.getById(1668);

    expect(http.get).toHaveBeenCalledWith("/tv/1668", undefined);
    expect(result).toEqual(mockSeries);
  });

  it("requests recommendations with optional paging and language", async () => {
    const page: Paged<ITVSeries> = {
      page: 2,
      total_pages: 10,
      total_results: 200,
      results: [],
    };
    (http.get as any).mockResolvedValueOnce(page);

    const result = await service.recommendations(1399, { page: 2, language: "en-US" });

    expect(http.get).toHaveBeenCalledWith("/tv/1399/recommendations", {
      page: 2,
      language: "en-US",
    });
    expect(result).toEqual(page);
  });

  it("requests similar shows", async () => {
    const page: Paged<ITVSeries> = {
      page: 1,
      total_pages: 1,
      total_results: 1,
      results: [{ id: 123, name: "Some Show", original_name: "Some Show", overview: "" }],
    };
    (http.get as any).mockResolvedValueOnce(page);

    const result = await service.similar(1399);

    expect(http.get).toHaveBeenCalledWith("/tv/1399/similar", undefined);
    expect(result).toEqual(page);
  });

  it("requests images with language options", async () => {
    const payload = { backdrops: [], posters: [], logos: [] };
    (http.get as any).mockResolvedValueOnce(payload);

    const result = await service.images(1399, {
      include_image_language: "en,null",
      language: "en-US",
    });

    expect(http.get).toHaveBeenCalledWith("/tv/1399/images", {
      include_image_language: "en,null",
      language: "en-US",
    });
    expect(result).toEqual(payload);
  });

  it("requests credits", async () => {
    const credits = { cast: [], crew: [] };
    (http.get as any).mockResolvedValueOnce(credits);

    const result = await service.credits(1399, { language: "en-US" });

    expect(http.get).toHaveBeenCalledWith("/tv/1399/credits", { language: "en-US" });
    expect(result).toEqual(credits);
  });
});
