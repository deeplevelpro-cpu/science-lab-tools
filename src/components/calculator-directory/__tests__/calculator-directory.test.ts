import { describe, expect, it } from "vitest";

import { calculators } from "../../../content/calculators/registry";

function searchCalculators(
  query: string,
  category: "All" | "Laboratory" | "Chemistry" | "Physics",
) {
  const normalizedQuery = query.trim().toLowerCase();

  return calculators.filter((calculator) => {
    const matchesCategory =
      category === "All" ||
      calculator.category === category;

    const searchableText = [
      calculator.name,
      calculator.shortDescription,
      calculator.category,
      ...calculator.keywords,
    ]
      .join(" ")
      .toLowerCase();

    return (
      matchesCategory &&
      (!normalizedQuery ||
        searchableText.includes(normalizedQuery))
    );
  });
}

describe("calculator directory data behavior", () => {
  it("contains all published calculators", () => {
    expect(calculators).toHaveLength(62);
  });

  it("finds Molecular Weight Calculator by name", () => {
    const results = searchCalculators(
      "Molecular Weight",
      "All",
    );

    expect(results).toHaveLength(1);
    expect(results[0]?.name).toBe(
      "Molecular Weight Calculator",
    );
  });

  it("filters Chemistry calculators", () => {
    const results = searchCalculators("", "Chemistry");

    expect(results).toHaveLength(7);
    expect(
      results.every(
        (calculator) =>
          calculator.category === "Chemistry",
      ),
    ).toBe(true);
  });

  it("finds calculators through registry keywords", () => {
    const results = searchCalculators(
      "molar mass calculator",
      "All",
    );

    expect(
      results.some(
        (calculator) =>
          calculator.slug ===
          "molecular-weight-calculator",
      ),
    ).toBe(true);
  });

  it("returns an empty list for an unknown query", () => {
    expect(
      searchCalculators(
        "no-such-science-calculator-xyz",
        "All",
      ),
    ).toHaveLength(0);
  });

  it("sorts calculator names alphabetically", () => {
    const ascending = [...calculators].sort(
      (a, b) => a.name.localeCompare(b.name),
    );

    const descending = [...calculators].sort(
      (a, b) => b.name.localeCompare(a.name),
    );

    expect(ascending[0]?.name).toBe(
      "Acceleration Calculator",
    );
    expect(descending[0]?.name).toBe(
      "Work Calculator",
    );
  });
});
