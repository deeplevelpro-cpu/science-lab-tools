import {
  existsSync,
  readFileSync,
  readdirSync,
} from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

const calculatorRoot = "src/app/calculators";
const sitemapSource = readFileSync(
  "src/app/sitemap.ts",
  "utf8",
);

const calculatorPageSlugs = readdirSync(
  calculatorRoot,
  { withFileTypes: true },
)
  .filter((entry) => entry.isDirectory())
  .filter((entry) =>
    existsSync(
      path.join(
        calculatorRoot,
        entry.name,
        "page.tsx",
      ),
    ),
  )
  .map((entry) => entry.name)
  .sort();

const sitemapCalculatorSlugs = [
  ...sitemapSource.matchAll(
    /\/calculators\/([a-z0-9-]+)/g,
  ),
]
  .map((match) => match[1])
  .filter(
    (slug, index, slugs) =>
      slugs.indexOf(slug) === index,
  )
  .sort();

describe("calculator sitemap parity", () => {
  it("includes every calculator detail page exactly once", () => {
    expect(calculatorPageSlugs).toHaveLength(73);
    expect(sitemapCalculatorSlugs).toEqual(
      calculatorPageSlugs,
    );
  });

  it("includes the combined gas law calculator", () => {
    expect(sitemapSource).toContain(
      "/calculators/combined-gas-law-calculator",
    );
  });
});
