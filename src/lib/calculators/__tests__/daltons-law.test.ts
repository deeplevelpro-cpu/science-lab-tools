import { describe, expect, it } from "vitest";

import { calculateDaltonsLaw } from "../daltons-law";

describe("calculateDaltonsLaw", () => {
  it("calculates total pressure from partial pressures", () => {
    const result = calculateDaltonsLaw({
      partialPressures: [
        { value: 0.5, unit: "atm" },
        { value: 0.3, unit: "atm" },
        { value: 0.2, unit: "atm" },
      ],
      totalPressureUnit: "atm",
      outputUnit: "atm",
      solveFor: "totalPressure",
    });

    expect(result.value).toBeCloseTo(1, 10);
    expect(result.details.formula).toBe(
      "P_total = P₁ + P₂ + ⋯ + Pₙ",
    );
    expect(result.details.componentCount).toBe(3);
  });

  it("calculates a missing partial pressure", () => {
    const result = calculateDaltonsLaw({
      partialPressures: [
        { value: 300, unit: "mmHg" },
        { value: 200, unit: "mmHg" },
      ],
      totalPressure: 760,
      totalPressureUnit: "mmHg",
      outputUnit: "mmHg",
      solveFor: "missingPartialPressure",
    });

    expect(result.value).toBeCloseTo(260, 8);
    expect(result.details.solvedVariable).toBe(
      "missingPartialPressure",
    );
    expect(result.details.componentCount).toBe(3);
  });

  it("converts mixed pressure units", () => {
    const result = calculateDaltonsLaw({
      partialPressures: [
        { value: 1, unit: "atm" },
        { value: 101.325, unit: "kPa" },
      ],
      totalPressureUnit: "atm",
      outputUnit: "atm",
      solveFor: "totalPressure",
    });

    expect(result.value).toBeCloseTo(2, 10);
    expect(result.formattedValue).toContain("atm");
  });

  it("returns total pressure in a selected output unit", () => {
    const result = calculateDaltonsLaw({
      partialPressures: [
        { value: 50, unit: "kPa" },
        { value: 51.325, unit: "kPa" },
      ],
      totalPressureUnit: "kPa",
      outputUnit: "atm",
      solveFor: "totalPressure",
    });

    expect(result.value).toBeCloseTo(1, 10);
    expect(result.details.outputUnit).toBe("atm");
  });

  it("rejects fewer than two components for total pressure", () => {
    expect(() =>
      calculateDaltonsLaw({
        partialPressures: [
          { value: 1, unit: "atm" },
        ],
        totalPressureUnit: "atm",
        outputUnit: "atm",
        solveFor: "totalPressure",
      }),
    ).toThrow(
      "Enter at least two partial pressures.",
    );
  });

  it("rejects missing total pressure", () => {
    expect(() =>
      calculateDaltonsLaw({
        partialPressures: [
          { value: 0.4, unit: "atm" },
        ],
        totalPressureUnit: "atm",
        outputUnit: "atm",
        solveFor: "missingPartialPressure",
      }),
    ).toThrow(
      "Total pressure must be a finite number.",
    );
  });

  it("rejects zero or negative partial pressure", () => {
    expect(() =>
      calculateDaltonsLaw({
        partialPressures: [
          { value: 1, unit: "atm" },
          { value: 0, unit: "atm" },
        ],
        totalPressureUnit: "atm",
        outputUnit: "atm",
        solveFor: "totalPressure",
      }),
    ).toThrow(
      "Partial pressure 2 must be greater than zero.",
    );
  });

  it("rejects an impossible missing pressure calculation", () => {
    expect(() =>
      calculateDaltonsLaw({
        partialPressures: [
          { value: 0.7, unit: "atm" },
          { value: 0.4, unit: "atm" },
        ],
        totalPressure: 1,
        totalPressureUnit: "atm",
        outputUnit: "atm",
        solveFor: "missingPartialPressure",
      }),
    ).toThrow(
      "Total pressure must be greater than the sum of the known partial pressures.",
    );
  });

  it("does not mutate the supplied partial-pressure list", () => {
    const partialPressures = [
      { value: 0.4, unit: "atm" as const },
      { value: 0.6, unit: "atm" as const },
    ];

    calculateDaltonsLaw({
      partialPressures,
      totalPressureUnit: "atm",
      outputUnit: "atm",
      solveFor: "totalPressure",
    });

    expect(partialPressures).toEqual([
      { value: 0.4, unit: "atm" },
      { value: 0.6, unit: "atm" },
    ]);
  });
});
