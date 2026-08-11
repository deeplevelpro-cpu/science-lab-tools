import { describe, expect, it } from "vitest";

import { GET, dynamic } from "../route";

describe("GET /api/health", () => {
  it("is excluded from static generation", () => {
    expect(dynamic).toBe("force-dynamic");
  });

  it("responds with a 200 status and no-store caching", async () => {
    const response = GET();

    expect(response.status).toBe(200);
    expect(response.headers.get("Cache-Control")).toBe(
      "no-store",
    );
    await expect(response.json()).resolves.toEqual({
      status: "ok",
    });
  });
});
