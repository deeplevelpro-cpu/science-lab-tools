import { describe, expect, it } from "vitest";

import {
  calculateMolality,
  convertSoluteAmountToMoles,
  convertSolventMassToKilograms,
} from "../molality";

describe("convertSoluteAmountToMoles", () => {
  it("keeps moles unchanged", () => {
    expect(convertSoluteAmountToMoles(2, "mol")).toBe(2);
  });

  it("converts millimoles to moles", () => {
    expect(convertSoluteAmountToMoles(250, "mmol")).toBe(
      0.25,
    );
  });

  it("rejects non-positive solute amounts", () => {
    expect(() =>
      convertSoluteAmountToMoles(0, "mol"),
    ).toThrow("Solute amount must be greater than zero.");
  });

  it("rejects non-finite solute amounts", () => {
    expect(() =>
      convertSoluteAmountToMoles(Number.NaN, "mol"),
    ).toThrow("Solute amount must be a finite number.");
  });
});

describe("convertSolventMassToKilograms", () => {
  it("keeps kilograms unchanged", () => {
    expect(convertSolventMassToKilograms(2, "kg")).toBe(2);
  });

  it("converts grams to kilograms", () => {
    expect(convertSolventMassToKilograms(500, "g")).toBe(
      0.5,
    );
  });

  it("converts milligrams to kilograms", () => {
    expect(
      convertSolventMassToKilograms(250_000, "mg"),
    ).toBe(0.25);
  });

  it("rejects non-positive solvent masses", () => {
    expect(() =>
      convertSolventMassToKilograms(-1, "kg"),
    ).toThrow("Solvent mass must be greater than zero.");
  });

  it("rejects non-finite solvent masses", () => {
    expect(() =>
      convertSolventMassToKilograms(
        Number.POSITIVE_INFINITY,
        "kg",
      ),
    ).toThrow("Solvent mass must be a finite number.");
  });
});

describe("calculateMolality", () => {
  it("calculates molality from moles and kilograms", () => {
    const result = calculateMolality({
      solveFor: "molality",
      soluteMoles: 2,
      solventMass: 4,
      soluteAmountUnit: "mol",
      solventMassUnit: "kg",
    });

    expect(result.value).toBe(0.5);
    expect(result.formattedValue).toBe("0.5 mol/kg");
    expect(result.details.molality).toBe(0.5);
    expect(result.details.formula).toBe(
      "m = n ÷ kg solvent",
    );
  });

  it("calculates molality with millimoles and grams", () => {
    const result = calculateMolality({
      solveFor: "molality",
      soluteMoles: 250,
      solventMass: 500,
      soluteAmountUnit: "mmol",
      solventMassUnit: "g",
    });

    expect(result.value).toBe(0.5);
    expect(result.details.soluteMoles).toBe(0.25);
    expect(result.details.solventMassInKilograms).toBe(0.5);
  });

  it("calculates solute moles", () => {
    const result = calculateMolality({
      solveFor: "soluteMoles",
      molality: 1.5,
      solventMass: 2,
      soluteAmountUnit: "mol",
      solventMassUnit: "kg",
    });

    expect(result.value).toBe(3);
    expect(result.formattedValue).toBe("3 mol");
    expect(result.details.soluteMoles).toBe(3);
    expect(result.details.formula).toBe(
      "n = m × kg solvent",
    );
  });

  it("calculates solvent mass in kilograms", () => {
    const result = calculateMolality({
      solveFor: "solventMass",
      molality: 2,
      soluteMoles: 500,
      soluteAmountUnit: "mmol",
      solventMassUnit: "g",
    });

    expect(result.value).toBe(0.25);
    expect(result.formattedValue).toBe("0.25 kg");
    expect(result.details.solventMassInKilograms).toBe(0.25);
    expect(result.details.formula).toBe(
      "kg solvent = n ÷ m",
    );
  });

  it("requires molality when solving for solute moles", () => {
    expect(() =>
      calculateMolality({
        solveFor: "soluteMoles",
        solventMass: 1,
        soluteAmountUnit: "mol",
        solventMassUnit: "kg",
      }),
    ).toThrow("Molality is required.");
  });

  it("requires solute amount when solving for molality", () => {
    expect(() =>
      calculateMolality({
        solveFor: "molality",
        solventMass: 1,
        soluteAmountUnit: "mol",
        solventMassUnit: "kg",
      }),
    ).toThrow("Solute amount is required.");
  });

  it("requires solvent mass when solving for molality", () => {
    expect(() =>
      calculateMolality({
        solveFor: "molality",
        soluteMoles: 1,
        soluteAmountUnit: "mol",
        solventMassUnit: "kg",
      }),
    ).toThrow("Solvent mass is required.");
  });

  it("rejects non-positive molality", () => {
    expect(() =>
      calculateMolality({
        solveFor: "soluteMoles",
        molality: 0,
        solventMass: 1,
        soluteAmountUnit: "mol",
        solventMassUnit: "kg",
      }),
    ).toThrow("Molality must be greater than zero.");
  });

  it("rejects a supplied solved molality value", () => {
    expect(() =>
      calculateMolality({
        solveFor: "molality",
        molality: 1,
        soluteMoles: 1,
        solventMass: 1,
        soluteAmountUnit: "mol",
        solventMassUnit: "kg",
      }),
    ).toThrow(
      "Molality must be omitted when solving for it.",
    );
  });

  it("rejects a supplied solved solute amount", () => {
    expect(() =>
      calculateMolality({
        solveFor: "soluteMoles",
        molality: 1,
        soluteMoles: 1,
        solventMass: 1,
        soluteAmountUnit: "mol",
        solventMassUnit: "kg",
      }),
    ).toThrow(
      "Solute amount must be omitted when solving for it.",
    );
  });

  it("rejects a supplied solved solvent mass", () => {
    expect(() =>
      calculateMolality({
        solveFor: "solventMass",
        molality: 1,
        soluteMoles: 1,
        solventMass: 1,
        soluteAmountUnit: "mol",
        solventMassUnit: "kg",
      }),
    ).toThrow(
      "Solvent mass must be omitted when solving for it.",
    );
  });
});
