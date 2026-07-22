import { readFileSync, readdirSync } from "node:fs";

import { describe, expect, it } from "vitest";

import { calculators } from "../../../content/calculators/registry";

const calculatorPages = readdirSync(
  "src/app/calculators",
  { withFileTypes: true },
)
  .filter((entry) => entry.isDirectory())
  .map(
    (entry) =>
      `src/app/calculators/${entry.name}/page.tsx`,
  )
  .filter((page) => {
    try {
      readFileSync(page, "utf8");
      return true;
    } catch {
      return false;
    }
  })
  .sort();

describe("calculator trust coverage", () => {
  it("covers all published calculator pages", () => {
    expect(calculatorPages).toHaveLength(61);
    expect(calculators).toHaveLength(61);
  });

  it("adds the trust import to every calculator page", () => {
    for (const page of calculatorPages) {
      const source = readFileSync(page, "utf8");

      expect(source).toContain(
        'from "@/components/calculator-trust"',
      );
    }
  });

  it("adds exactly one trust panel to every calculator page", () => {
    for (const page of calculatorPages) {
      const source = readFileSync(page, "utf8");

      const matches =
        source.match(/<CalculatorTrustPanel subject=/g) ?? [];

      expect(matches).toHaveLength(1);
    }
  });

  it("uses the registry category as the trust subject", () => {
    for (const calculator of calculators) {
      const page =
        `src/app/calculators/${calculator.slug}/page.tsx`;

      const source = readFileSync(page, "utf8");

      expect(source).toContain(
        `<CalculatorTrustPanel subject="${calculator.category.toLowerCase()}" />`,
      );
    }
  });

  it("keeps the expected subject distribution", () => {
    const distribution = calculators.reduce(
      (counts, calculator) => {
        const subject = calculator.category.toLowerCase();

        counts[subject] = (counts[subject] ?? 0) + 1;

        return counts;
      },
      {} as Record<string, number>,
    );

    expect(distribution).toEqual({
      laboratory: 10,
      chemistry: 6,
      physics: 45,
    });
  });
});
