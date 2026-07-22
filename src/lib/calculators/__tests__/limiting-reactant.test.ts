import { describe, expect, it } from "vitest";

import { calculateLimitingReactant } from "../limiting-reactant";

describe("calculateLimitingReactant", () => {
  it("identifies reactant A as limiting and calculates product", () => {
    const result = calculateLimitingReactant({
      reactantA: {
        name: "Hydrogen",
        amount: 2,
        unit: "moles",
        coefficient: 2,
      },
      reactantB: {
        name: "Oxygen",
        amount: 2,
        unit: "moles",
        coefficient: 1,
      },
      productCoefficient: 2,
      productUnit: "moles",
    });

    expect(result.details.limitingReactant).toBe("reactantA");
    expect(result.details.limitingReactantName).toBe("Hydrogen");
    expect(result.details.excessReactant).toBe("reactantB");
    expect(result.details.excessReactantName).toBe("Oxygen");
    expect(result.details.reactionExtent).toBeCloseTo(1);
    expect(result.details.excessMolesRemaining).toBeCloseTo(1);
    expect(result.details.productMoles).toBeCloseTo(2);
    expect(result.value).toBeCloseTo(2);
  });

  it("identifies reactant B as limiting", () => {
    const result = calculateLimitingReactant({
      reactantA: {
        name: "Hydrogen",
        amount: 6,
        unit: "moles",
        coefficient: 2,
      },
      reactantB: {
        name: "Oxygen",
        amount: 2,
        unit: "moles",
        coefficient: 1,
      },
      productCoefficient: 2,
      productUnit: "moles",
    });

    expect(result.details.limitingReactant).toBe("reactantB");
    expect(result.details.limitingReactantName).toBe("Oxygen");
    expect(result.details.excessReactant).toBe("reactantA");
    expect(result.details.excessMolesRemaining).toBeCloseTo(2);
    expect(result.details.productMoles).toBeCloseTo(4);
  });

  it("detects exact stoichiometric amounts", () => {
    const result = calculateLimitingReactant({
      reactantA: {
        name: "Hydrogen",
        amount: 4,
        unit: "grams",
        coefficient: 2,
        molarMass: 2,
      },
      reactantB: {
        name: "Oxygen",
        amount: 32,
        unit: "grams",
        coefficient: 1,
        molarMass: 32,
      },
      productCoefficient: 2,
      productUnit: "moles",
    });

    expect(result.details.reactantAMoles).toBeCloseTo(2);
    expect(result.details.reactantBMoles).toBeCloseTo(1);
    expect(result.details.limitingReactant).toBe("neither");
    expect(result.details.excessReactant).toBe("neither");
    expect(result.details.excessMolesRemaining).toBe(0);
    expect(result.value).toBeCloseTo(2);
  });

  it("converts a calculated product from moles to grams", () => {
    const result = calculateLimitingReactant({
      reactantA: {
        name: "Hydrogen",
        amount: 2,
        unit: "moles",
        coefficient: 2,
      },
      reactantB: {
        name: "Oxygen",
        amount: 1,
        unit: "moles",
        coefficient: 1,
      },
      productCoefficient: 2,
      productUnit: "grams",
      productMolarMass: 18.015,
    });

    expect(result.details.productMoles).toBeCloseTo(2);
    expect(result.details.productAmount).toBeCloseTo(36.03);
    expect(result.value).toBeCloseTo(36.03);
  });

  it("supports decimal coefficients and amounts", () => {
    const result = calculateLimitingReactant({
      reactantA: {
        name: "A",
        amount: 1.5,
        unit: "moles",
        coefficient: 0.5,
      },
      reactantB: {
        name: "B",
        amount: 2,
        unit: "moles",
        coefficient: 1,
      },
      productCoefficient: 1.5,
      productUnit: "moles",
    });

    expect(result.details.limitingReactant).toBe("reactantB");
    expect(result.details.reactionExtent).toBeCloseTo(2);
    expect(result.value).toBeCloseTo(3);
  });

  it.each([
    {
      label: "reactant A amount",
      input: {
        reactantA: {
          name: "A",
          amount: 0,
          unit: "moles" as const,
          coefficient: 1,
        },
        reactantB: {
          name: "B",
          amount: 1,
          unit: "moles" as const,
          coefficient: 1,
        },
        productCoefficient: 1,
        productUnit: "moles" as const,
      },
      message: "Reactant A amount must be greater than zero.",
    },
    {
      label: "reactant B coefficient",
      input: {
        reactantA: {
          name: "A",
          amount: 1,
          unit: "moles" as const,
          coefficient: 1,
        },
        reactantB: {
          name: "B",
          amount: 1,
          unit: "moles" as const,
          coefficient: -1,
        },
        productCoefficient: 1,
        productUnit: "moles" as const,
      },
      message:
        "Reactant B coefficient must be greater than zero.",
    },
    {
      label: "product coefficient",
      input: {
        reactantA: {
          name: "A",
          amount: 1,
          unit: "moles" as const,
          coefficient: 1,
        },
        reactantB: {
          name: "B",
          amount: 1,
          unit: "moles" as const,
          coefficient: 1,
        },
        productCoefficient: Number.NaN,
        productUnit: "moles" as const,
      },
      message: "Product coefficient must be a finite number.",
    },
  ])("rejects an invalid $label", ({ input, message }) => {
    expect(() => calculateLimitingReactant(input)).toThrow(
      message,
    );
  });

  it("requires a molar mass for a reactant entered in grams", () => {
    expect(() =>
      calculateLimitingReactant({
        reactantA: {
          name: "A",
          amount: 10,
          unit: "grams",
          coefficient: 1,
        },
        reactantB: {
          name: "B",
          amount: 1,
          unit: "moles",
          coefficient: 1,
        },
        productCoefficient: 1,
        productUnit: "moles",
      }),
    ).toThrow("Reactant A molar mass must be a finite number.");
  });

  it("requires a product molar mass for a grams result", () => {
    expect(() =>
      calculateLimitingReactant({
        reactantA: {
          name: "A",
          amount: 1,
          unit: "moles",
          coefficient: 1,
        },
        reactantB: {
          name: "B",
          amount: 1,
          unit: "moles",
          coefficient: 1,
        },
        productCoefficient: 1,
        productUnit: "grams",
      }),
    ).toThrow("Product molar mass must be a finite number.");
  });

  it.each([
    {
      reactantAName: " ",
      reactantBName: "B",
      message: "Reactant A name is required.",
    },
    {
      reactantAName: "A",
      reactantBName: "",
      message: "Reactant B name is required.",
    },
  ])(
    "requires usable reactant names",
    ({ reactantAName, reactantBName, message }) => {
      expect(() =>
        calculateLimitingReactant({
          reactantA: {
            name: reactantAName,
            amount: 1,
            unit: "moles",
            coefficient: 1,
          },
          reactantB: {
            name: reactantBName,
            amount: 1,
            unit: "moles",
            coefficient: 1,
          },
          productCoefficient: 1,
          productUnit: "moles",
        }),
      ).toThrow(message);
    },
  );
});
