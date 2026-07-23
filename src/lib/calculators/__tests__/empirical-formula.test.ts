import { describe, expect, it } from "vitest";

import { calculateEmpiricalFormula } from "../empirical-formula";

describe("calculateEmpiricalFormula", () => {
  it("calculates CH2O from percentage composition", () => {
    const result = calculateEmpiricalFormula({
      basis: "percentage",
      elements: [
        { symbol: "C", amount: 40 },
        { symbol: "H", amount: 6.7 },
        { symbol: "O", amount: 53.3 },
      ],
    });

    expect(result.details.empiricalFormula).toBe("CH2O");
    expect(result.details.multiplier).toBe(1);
    expect(result.value).toBeCloseTo(30.026, 6);
  });

  it("calculates Fe2O3 from mass composition", () => {
    const result = calculateEmpiricalFormula({
      basis: "mass",
      elements: [
        { symbol: "Fe", amount: 11.169 },
        { symbol: "O", amount: 4.7997 },
      ],
    });

    expect(result.details.empiricalFormula).toBe("Fe2O3");
  });

  it("uses a multiplier for half-number ratios", () => {
    const result = calculateEmpiricalFormula({
      basis: "mass",
      elements: [
        { symbol: "C", amount: 24.022 },
        { symbol: "H", amount: 5.04 },
      ],
    });

    expect(result.details.empiricalFormula).toBe("C2H5");
    expect(result.details.multiplier).toBe(2);
  });

  it("uses a multiplier for third-number ratios", () => {
    const result = calculateEmpiricalFormula({
      basis: "mass",
      elements: [
        { symbol: "C", amount: 36.033 },
        { symbol: "H", amount: 4.032 },
      ],
    });

    expect(result.details.empiricalFormula).toBe("C3H4");
    expect(result.details.multiplier).toBe(3);
  });

  it("omits a subscript of one from the formula", () => {
    const result = calculateEmpiricalFormula({
      basis: "mass",
      elements: [
        { symbol: "Na", amount: 22.98976928 },
        { symbol: "Cl", amount: 35.45 },
      ],
    });

    expect(result.details.empiricalFormula).toBe("NaCl");
  });

  it("returns calculation details for every element", () => {
    const result = calculateEmpiricalFormula({
      basis: "mass",
      elements: [
        { symbol: "Mg", amount: 24.305 },
        { symbol: "O", amount: 15.999 },
      ],
    });

    expect(result.details.elements).toHaveLength(2);
    expect(result.details.elements[0]).toMatchObject({
      symbol: "Mg",
      subscript: 1,
      normalizedRatio: 1,
    });
    expect(result.details.formula).toContain(
      "moles = amount ÷ atomic mass",
    );
  });

  it("accepts percentage totals within rounding tolerance", () => {
    const result = calculateEmpiricalFormula({
      basis: "percentage",
      elements: [
        { symbol: "C", amount: 27.3 },
        { symbol: "O", amount: 72.6 },
      ],
    });

    expect(result.details.empiricalFormula).toBe("CO2");
  });

  it("rejects fewer than two elements", () => {
    expect(() =>
      calculateEmpiricalFormula({
        basis: "mass",
        elements: [{ symbol: "C", amount: 12.011 }],
      }),
    ).toThrow(
      "Enter at least two elements to calculate an empirical formula.",
    );
  });

  it("rejects duplicate elements", () => {
    expect(() =>
      calculateEmpiricalFormula({
        basis: "mass",
        elements: [
          { symbol: "C", amount: 12.011 },
          { symbol: "C", amount: 24.022 },
        ],
      }),
    ).toThrow(
      "Element C cannot be entered more than once.",
    );
  });

  it("rejects zero and negative amounts", () => {
    expect(() =>
      calculateEmpiricalFormula({
        basis: "mass",
        elements: [
          { symbol: "H", amount: 0 },
          { symbol: "O", amount: -1 },
        ],
      }),
    ).toThrow("Element 1 amount must be greater than zero.");
  });

  it("rejects non-finite amounts", () => {
    expect(() =>
      calculateEmpiricalFormula({
        basis: "mass",
        elements: [
          { symbol: "H", amount: Number.NaN },
          { symbol: "O", amount: 15.999 },
        ],
      }),
    ).toThrow("Element 1 amount must be a finite number.");
  });

  it("rejects percentage totals outside tolerance", () => {
    expect(() =>
      calculateEmpiricalFormula({
        basis: "percentage",
        elements: [
          { symbol: "C", amount: 40 },
          { symbol: "O", amount: 40 },
        ],
      }),
    ).toThrow(
      "Percentage composition must total approximately 100%.",
    );
  });

  it("rejects ratios that cannot become small whole numbers", () => {
    expect(() =>
      calculateEmpiricalFormula({
        basis: "mass",
        elements: [
          { symbol: "C", amount: 12.011 },
          { symbol: "H", amount: 1.42128 },
        ],
      }),
    ).toThrow(
      "The element ratios could not be converted to small whole numbers.",
    );
  });
});
