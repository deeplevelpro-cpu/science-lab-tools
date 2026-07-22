import { describe, expect, it } from "vitest";

import { calculateStoichiometry } from "../stoichiometry";

describe("calculateStoichiometry", () => {
  it("calculates target moles from a balanced-equation mole ratio", () => {
    const result = calculateStoichiometry({
      knownAmount: 2,
      knownUnit: "moles",
      knownCoefficient: 2,
      targetCoefficient: 1,
      targetUnit: "moles",
    });

    expect(result.value).toBeCloseTo(1);
    expect(result.details.knownMoles).toBeCloseTo(2);
    expect(result.details.targetMoles).toBeCloseTo(1);
    expect(result.details.moleRatio).toBeCloseTo(0.5);
  });

  it("converts a known mass to moles before applying the ratio", () => {
    const result = calculateStoichiometry({
      knownAmount: 4,
      knownUnit: "grams",
      knownMolarMass: 2,
      knownCoefficient: 2,
      targetCoefficient: 1,
      targetUnit: "moles",
    });

    expect(result.details.knownMoles).toBeCloseTo(2);
    expect(result.value).toBeCloseTo(1);
  });

  it("converts calculated target moles to grams", () => {
    const result = calculateStoichiometry({
      knownAmount: 2,
      knownUnit: "moles",
      knownCoefficient: 2,
      targetCoefficient: 2,
      targetUnit: "grams",
      targetMolarMass: 18.015,
    });

    expect(result.details.targetMoles).toBeCloseTo(2);
    expect(result.value).toBeCloseTo(36.03);
  });

  it("supports a complete grams-to-grams calculation", () => {
    const result = calculateStoichiometry({
      knownAmount: 4,
      knownUnit: "grams",
      knownMolarMass: 2,
      knownCoefficient: 2,
      targetCoefficient: 2,
      targetUnit: "grams",
      targetMolarMass: 18,
    });

    expect(result.details.knownMoles).toBeCloseTo(2);
    expect(result.details.targetMoles).toBeCloseTo(2);
    expect(result.value).toBeCloseTo(36);
  });

  it.each([
    {
      label: "known amount",
      input: {
        knownAmount: 0,
        knownUnit: "moles" as const,
        knownCoefficient: 1,
        targetCoefficient: 1,
        targetUnit: "moles" as const,
      },
      message: "Known amount must be greater than zero.",
    },
    {
      label: "known coefficient",
      input: {
        knownAmount: 1,
        knownUnit: "moles" as const,
        knownCoefficient: 0,
        targetCoefficient: 1,
        targetUnit: "moles" as const,
      },
      message:
        "Known substance coefficient must be greater than zero.",
    },
    {
      label: "target coefficient",
      input: {
        knownAmount: 1,
        knownUnit: "moles" as const,
        knownCoefficient: 1,
        targetCoefficient: -1,
        targetUnit: "moles" as const,
      },
      message:
        "Target substance coefficient must be greater than zero.",
    },
  ])("rejects an invalid $label", ({ input, message }) => {
    expect(() => calculateStoichiometry(input)).toThrow(message);
  });

  it("requires known molar mass for a grams input", () => {
    expect(() =>
      calculateStoichiometry({
        knownAmount: 10,
        knownUnit: "grams",
        knownCoefficient: 1,
        targetCoefficient: 1,
        targetUnit: "moles",
      }),
    ).toThrow(
      "Known substance molar mass must be a finite number.",
    );
  });

  it("requires target molar mass for a grams result", () => {
    expect(() =>
      calculateStoichiometry({
        knownAmount: 1,
        knownUnit: "moles",
        knownCoefficient: 1,
        targetCoefficient: 1,
        targetUnit: "grams",
      }),
    ).toThrow(
      "Target substance molar mass must be a finite number.",
    );
  });
});
