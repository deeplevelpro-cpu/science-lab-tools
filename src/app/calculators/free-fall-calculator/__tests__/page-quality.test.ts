import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

const source = readFileSync(
  "src/app/calculators/free-fall-calculator/page.tsx",
  "utf8",
);

describe("free fall page quality", () => {
  it("keeps complete metadata and structured data", () => {
    expect(source).toContain(
      'const pageTitle = "Free Fall Calculator"',
    );
    expect(source).toContain("breadcrumbSchema");
    expect(source).toContain('"@type": "FAQPage"');
    expect(source).toContain(
      'type="application/ld+json"',
    );
  });

  it("documents all supported equations and variables", () => {
    expect(source).toContain("h = ½gt²");
    expect(source).toContain("v = gt");
    expect(source).toContain("t = √(2h ÷ g)");
    expect(source).toContain("v = √(2gh)");
    expect(source).toContain(
      "Free-fall formulas from rest",
    );
  });

  it("provides worked examples and unit guidance", () => {
    expect(source).toContain(
      "Fall time and velocity from a 20 m height",
    );
    expect(source).toContain(
      "Distance and velocity after 2 seconds",
    );
    expect(source).toContain(
      "Use consistent SI units",
    );
    expect(source).toContain("2.019 seconds");
    expect(source).toContain("19.613 m/s");
  });

  it("states assumptions and limitations", () => {
    expect(source).toContain(
      "Assumptions and limitations",
    );
    expect(source).toContain(
      "released from rest",
    );
    expect(source).toContain(
      "Air resistance, buoyancy, wind",
    );
    expect(source).toContain(
      "ideal model",
    );
  });

  it("uses trustworthy scientific references", () => {
    expect(source).toContain(
      "physics.nist.gov/cgi-bin/cuu/Value?gn=",
    );
    expect(source).toContain(
      "openstax.org/books/university-physics-volume-1/pages/3-5-free-fall",
    );
    expect(source).toContain(
      "www1.grc.nasa.gov/beginners-guide-to-aeronautics/free-fall-without-air-resistance/",
    );
  });

  it("renders five matching FAQ items", () => {
    const questions = [
      "What equations does the free fall calculator use?",
      "What gravity value should I use for Earth?",
      "Does this calculator include air resistance?",
      "Why must I enter either height or time, but not both?",
      "Can I calculate free fall on the Moon?",
    ];

    for (const question of questions) {
      expect(source).toContain(question);
    }

    expect(source).toContain(
      "faqItems.map((item)",
    );
  });

  it("links to related physics calculators", () => {
    expect(source).toContain(
      "/calculators/acceleration-due-to-gravity-calculator",
    );
    expect(source).toContain(
      "/calculators/kinematic-equations-calculator",
    );
    expect(source).toContain(
      "/calculators/projectile-motion-calculator",
    );
  });
});
