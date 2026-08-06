import {
  readFileSync,
} from "node:fs";

import {
  describe,
  expect,
  it,
} from "vitest";

const canonicalOrigin =
  "https://www.sciencecalchub.org";

describe("production site URL contract", () => {
  it("uses the canonical WWW origin as the runtime fallback", () => {
    const siteSource = readFileSync(
      "src/config/site.ts",
      "utf8",
    );

    expect(siteSource).toContain(
      `const fallbackUrl = "${canonicalOrigin}";`,
    );
    expect(siteSource).not.toContain(
      'const fallbackUrl = "http://localhost:3000";',
    );
  });

  it("documents the canonical WWW origin in the environment example", () => {
    const environmentExample = readFileSync(
      ".env.example",
      "utf8",
    );

    expect(environmentExample).toContain(
      `NEXT_PUBLIC_SITE_URL=${canonicalOrigin}`,
    );
    expect(environmentExample).not.toContain(
      "NEXT_PUBLIC_SITE_URL=https://sciencecalchub.org\n",
    );
  });
});
