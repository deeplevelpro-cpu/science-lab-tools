import { describe, expect, it } from "vitest";

import { calculateMolecularFormula } from "../molecular-formula";

describe("calculateMolecularFormula", () => {
  it("calculates the molecular formula of glucose", () => {
    const result = calculateMolecularFormula(
      "CH2O",
      180.156,
    );

    expect(result.value).toBe(6);
    expect(result.formattedValue).toBe("6");
    expect(result.details.molecularFormula).toBe(
      "C6H12O6",
    );
    expect(result.details.calculatedMolarMass).toBeCloseTo(
      180.156,
      6,
    );
  });

  it("calculates dinitrogen tetroxide from NO2", () => {
    const result = calculateMolecularFormula(
      "NO2",
      92.01,
    );

    expect(result.details.multiplier).toBe(2);
    expect(result.details.molecularFormula).toBe("N2O4");
  });

  it("calculates hydrogen peroxide from HO", () => {
    const result = calculateMolecularFormula(
      "HO",
      34.014,
    );

    expect(result.details.molecularFormula).toBe("H2O2");
  });

  it("keeps the empirical formula when multiplier is one", () => {
    const result = calculateMolecularFormula(
      "NaCl",
      58.44,
    );

    expect(result.details.multiplier).toBe(1);
    expect(result.details.molecularFormula).toBe("ClNa");
  });

  it("uses conventional carbon and hydrogen ordering", () => {
    const result = calculateMolecularFormula(
      "H2CO",
      60.052,
    );

    expect(result.details.molecularFormula).toBe("C2H4O2");
  });

  it("accepts a realistic rounded molar mass", () => {
    const result = calculateMolecularFormula(
      "CH2O",
      180.2,
    );

    expect(result.details.multiplier).toBe(6);
    expect(result.details.percentDifference).toBeLessThan(
      0.1,
    );
  });

  it("returns element-level count details", () => {
    const result = calculateMolecularFormula(
      "CH2O",
      180.156,
    );

    expect(result.details.elements).toEqual([
      {
        symbol: "C",
        empiricalCount: 1,
        molecularCount: 6,
      },
      {
        symbol: "H",
        empiricalCount: 2,
        molecularCount: 12,
      },
      {
        symbol: "O",
        empiricalCount: 1,
        molecularCount: 6,
      },
    ]);
  });

  it("normalizes spaces in the empirical formula", () => {
    const result = calculateMolecularFormula(
      " C H2 O ",
      180.156,
    );

    expect(
      result.details.normalizedEmpiricalFormula,
    ).toBe("CH2O");
    expect(result.details.molecularFormula).toBe(
      "C6H12O6",
    );
  });

  it("rejects a non-finite molar mass", () => {
    expect(() =>
      calculateMolecularFormula("CH2O", Number.NaN),
    ).toThrow("Molar mass must be a finite number.");
  });

  it("rejects a non-positive molar mass", () => {
    expect(() =>
      calculateMolecularFormula("CH2O", 0),
    ).toThrow(
      "Molar mass must be greater than zero.",
    );
  });

  it("rejects a mass below the empirical formula mass", () => {
    expect(() =>
      calculateMolecularFormula("CH2O", 20),
    ).toThrow(
      "Molar mass must be at least the empirical formula mass.",
    );
  });

  it("rejects a non-whole-number multiplier", () => {
    expect(() =>
      calculateMolecularFormula("CH2O", 100),
    ).toThrow(
      "Molar mass must be a near-whole-number multiple of the empirical formula mass.",
    );
  });

  it("inherits chemical-formula validation", () => {
    expect(() =>
      calculateMolecularFormula("Xx2", 100),
    ).toThrow(
      "Unknown chemical element symbol: Xx.",
    );
  });
});
