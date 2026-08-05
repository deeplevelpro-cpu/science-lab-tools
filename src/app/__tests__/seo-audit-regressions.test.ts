import {
  execFileSync,
} from "node:child_process";
import {
  readFileSync,
} from "node:fs";

import {
  beforeAll,
  describe,
  expect,
  it,
} from "vitest";

type AuditPage = {
  route: string;
  title: string;
  description: string;
  internalLinks: number;
  hasRobots: boolean;
  issues: string[];
};

type AuditReport = {
  pages: AuditPage[];
};

let report: AuditReport;

beforeAll(() => {
  execFileSync(
    process.execPath,
    ["scripts/seo/audit-pages.mjs"],
    {
      stdio: "pipe",
    },
  );

  report = JSON.parse(
    readFileSync(
      "reports/seo-page-inventory.json",
      "utf8",
    ),
  ) as AuditReport;
});

function pageFor(route: string) {
  const page = report.pages.find(
    (candidate) =>
      candidate.route === route,
  );

  expect(page).toBeDefined();

  return page as AuditPage;
}

describe("SEO audit parser regressions", () => {
  it.each([
    "/calculators/empirical-formula-calculator",
    "/calculators/limiting-reactant-calculator",
    "/calculators/molality-calculator",
    "/calculators/percent-yield-calculator",
    "/calculators/stoichiometry-calculator",
  ])(
    "resolves shorthand metadata on %s",
    (route) => {
      const page = pageFor(route);

      expect(page.title).not.toBe("");
      expect(page.description).not.toBe("");
      expect(page.issues).not.toContain(
        "missing-title",
      );
      expect(page.issues).not.toContain(
        "missing-description",
      );
    },
  );

  it.each([
    [
      "/calculators/avogadros-law-calculator",
      "Avogadro's Law Calculator | Volume & Moles",
    ],
    [
      "/calculators/boyles-law-calculator",
      "Boyle's Law Calculator",
    ],
    [
      "/calculators/charles-law-calculator",
      "Charles's Law Calculator | Volume & Temperature",
    ],
    [
      "/calculators/daltons-law-calculator",
      "Dalton's Law Calculator | Total & Partial Pressure",
    ],
    [
      "/calculators/gay-lussacs-law-calculator",
      "Gay-Lussac's Law Calculator | Pressure & Temperature",
    ],
    [
      "/calculators/grahams-law-calculator",
      "Graham's Law Calculator | Rate, Time & Molar Mass",
    ],
  ])(
    "preserves apostrophes in metadata on %s",
    (route, expectedTitle) => {
      const page = pageFor(route);

      expect(page.title).toBe(expectedTitle);
      expect(page.description).toContain(
        "'s law",
      );
      expect(page.issues).not.toContain(
        "short-title",
      );
      expect(page.issues).not.toContain(
        "short-description",
      );
    },
  );

  it("keeps the molecular formula title within the audit limit", () => {
    const page = pageFor(
      "/calculators/molecular-formula-calculator",
    );

    expect(page.title).toBe(
      "Molecular Formula Calculator | Empirical to Molecular",
    );
    expect(page.issues).not.toContain(
      "long-title",
    );
  });

  it("counts links rendered by imported local components", () => {
    const page = pageFor("/calculators");

    expect(page.internalLinks).toBeGreaterThanOrEqual(2);
    expect(page.issues).not.toContain(
      "weak-internal-linking",
    );
  });

  it("inherits root robots metadata on every page", () => {
    expect(report.pages.length).toBeGreaterThan(0);

    for (const page of report.pages) {
      expect(page.hasRobots).toBe(true);
      expect(page.issues).not.toContain(
        "missing-robots-directive",
      );
    }
  });
});
