import { describe, expect, it } from "vitest";

import {
  calculateAvogadrosLaw,
  convertAmountToMoles,
  convertMolesToAmount,
  type AvogadrosLawInput,
} from "../avogadros-law";

const baseInput: AvogadrosLawInput = {
  initialVolume: 2,
  initialVolumeUnit: "L",
  initialAmount: 1,
  initialAmountUnit: "mol",
  finalVolume: 6,
  finalVolumeUnit: "L",
  finalAmount: 3,
  finalAmountUnit: "mol",
  solveFor: "finalVolume",
};

describe("calculateAvogadrosLaw", () => {
  it("solves for final volume", () => {
    const result = calculateAvogadrosLaw({
      ...baseInput,
      finalVolume: undefined,
      solveFor: "finalVolume",
    });

    expect(result.value).toBeCloseTo(6);
    expect(result.formattedValue).toBe("6 L");
    expect(result.details.formula).toBe("V₂ = V₁n₂ ÷ n₁");
  });

  it("solves for initial volume", () => {
    const result = calculateAvogadrosLaw({
      ...baseInput,
      initialVolume: undefined,
      solveFor: "initialVolume",
    });

    expect(result.value).toBeCloseTo(2);
    expect(result.details.formula).toBe("V₁ = V₂n₁ ÷ n₂");
  });

  it("solves for final amount", () => {
    const result = calculateAvogadrosLaw({
      ...baseInput,
      finalAmount: undefined,
      solveFor: "finalAmount",
    });

    expect(result.value).toBeCloseTo(3);
    expect(result.formattedValue).toBe("3 mol");
    expect(result.details.formula).toBe("n₂ = V₂n₁ ÷ V₁");
  });

  it("solves for initial amount", () => {
    const result = calculateAvogadrosLaw({
      ...baseInput,
      initialAmount: undefined,
      solveFor: "initialAmount",
    });

    expect(result.value).toBeCloseTo(1);
    expect(result.details.formula).toBe("n₁ = V₁n₂ ÷ V₂");
  });

  it("converts mixed volume and amount units", () => {
    const result = calculateAvogadrosLaw({
      initialVolume: 500,
      initialVolumeUnit: "mL",
      initialAmount: 250,
      initialAmountUnit: "mmol",
      finalVolume: undefined,
      finalVolumeUnit: "m3",
      finalAmount: 1,
      finalAmountUnit: "mol",
      solveFor: "finalVolume",
    });

    expect(result.value).toBeCloseTo(0.002);
    expect(result.formattedValue).toBe("0.002 m³");
    expect(result.details.finalVolumeInCubicMeters).toBeCloseTo(
      0.002,
    );
    expect(result.details.finalAmountInMoles).toBeCloseTo(1);
  });

  it("preserves the volume-to-amount ratio", () => {
    const result = calculateAvogadrosLaw({
      ...baseInput,
      finalVolume: undefined,
      solveFor: "finalVolume",
    });

    expect(
      result.details.initialVolumeAmountRatio,
    ).toBeCloseTo(result.details.finalVolumeAmountRatio);
  });

  it("converts mol and mmol in both directions", () => {
    expect(convertAmountToMoles(2500, "mmol")).toBeCloseTo(2.5);
    expect(convertAmountToMoles(2.5, "mol")).toBeCloseTo(2.5);
    expect(convertMolesToAmount(2.5, "mmol")).toBeCloseTo(2500);
    expect(convertMolesToAmount(2.5, "mol")).toBeCloseTo(2.5);
  });

  it("rejects a missing required value", () => {
    expect(() =>
      calculateAvogadrosLaw({
        ...baseInput,
        initialVolume: undefined,
        solveFor: "finalVolume",
      }),
    ).toThrow("Initial volume must be a finite number.");
  });

  it("rejects non-finite required values", () => {
    expect(() =>
      calculateAvogadrosLaw({
        ...baseInput,
        initialAmount: Number.NaN,
        solveFor: "finalVolume",
      }),
    ).toThrow("Initial amount must be a finite number.");
  });

  it.each([0, -1])(
    "rejects non-positive required amounts: %s",
    (initialAmount) => {
      expect(() =>
        calculateAvogadrosLaw({
          ...baseInput,
          initialAmount,
          solveFor: "finalVolume",
        }),
      ).toThrow(
        "Initial amount must be greater than zero.",
      );
    },
  );

  it.each([0, -1])(
    "rejects non-positive required volumes: %s",
    (initialVolume) => {
      expect(() =>
        calculateAvogadrosLaw({
          ...baseInput,
          initialVolume,
          solveFor: "finalVolume",
        }),
      ).toThrow(
        "Initial volume must be greater than zero.",
      );
    },
  );
});
