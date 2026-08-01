import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

const source = readFileSync(
  "src/app/calculators/acceleration-due-to-gravity-calculator/page.tsx",
  "utf8",
);

describe("acceleration due to gravity page quality", () => {
  it("keeps complete metadata and structured data", () => {
    expect(source).toContain("export const metadata");
    expect(source).toContain("canonicalPath");
    expect(source).toContain('"@type": "WebApplication"');
    expect(source).toContain('"@type": "BreadcrumbList"');
    expect(source).toContain('"@type": "FAQPage"');
    expect(source).toContain('type="application/ld+json"');
  });

  it("documents the formula and variables", () => {
    expect(source).toContain("g = GM ÷ r²");
    expect(source).toContain("Gravitational acceleration formula");
    expect(source).toContain("gravitational constant");
    expect(source).toContain("mass");
    expect(source).toContain("radius");
  });

  it("provides a worked example and unit guidance", () => {
    expect(source).toContain("Worked example");
    expect(source).toContain("5.972 × 10²⁴ kg");
    expect(source).toContain("6.371 × 10⁶ m");
    expect(source).toContain("9.82 m/s²");
    expect(source).toContain("Use consistent SI units");
  });

  it("states assumptions and limitations", () => {
    expect(source).toContain("Assumptions and limitations");
    expect(source).toContain("spherically symmetric");
    expect(source).toContain("distance from the center");
    expect(source).toContain("rotation");
    expect(source).toContain("latitude");
    expect(source).toContain("altitude");
  });

  it("uses trustworthy scientific references", () => {
    expect(source).toContain(
      "physics.nist.gov/cgi-bin/cuu/Value?bg=",
    );
    expect(source).toContain(
      "science.nasa.gov/solar-system/planets/earth/facts/",
    );
    expect(source).toContain(
      "openstax.org/books/university-physics-volume-1/pages/13-2-gravitation-near-earths-surface",
    );
  });

  it("keeps related calculator links", () => {
    expect(source).toContain(
      "/calculators/free-fall-calculator",
    );
    expect(source).toContain(
      "/calculators/gravitational-potential-energy-calculator",
    );
    expect(source).toContain(
      "/calculators/weight-calculator",
    );
  });
});
