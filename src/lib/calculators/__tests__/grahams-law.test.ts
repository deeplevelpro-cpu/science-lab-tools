import { describe, expect, it } from "vitest";

import {
  calculateGrahamsLaw,
  convertSecondsToTime,
  convertTimeToSeconds,
  type GrahamsLawRateInput,
  type GrahamsLawTimeInput,
} from "../grahams-law";

const rateInput: GrahamsLawRateInput = {
  mode: "rate",
  gas1Rate: 4,
  gas2Rate: 1,
  gas1MolarMass: 4,
  gas2MolarMass: 64,
  solveFor: "gas1Rate",
};

const timeInput: GrahamsLawTimeInput = {
  mode: "time",
  gas1Time: 1,
  gas1TimeUnit: "min",
  gas2Time: 4,
  gas2TimeUnit: "min",
  outputTimeUnit: "min",
  gas1MolarMass: 4,
  gas2MolarMass: 64,
  solveFor: "gas2Time",
};

describe("calculateGrahamsLaw rate mode", () => {
  it("solves for gas 1 rate", () => {
    const result = calculateGrahamsLaw({
      ...rateInput,
      gas1Rate: undefined,
      solveFor: "gas1Rate",
    });

    expect(result.value).toBeCloseTo(4);
    expect(result.formattedValue).toBe(
      "4 relative rate",
    );
    expect(result.details.formula).toBe(
      "r₁ = r₂√(M₂/M₁)",
    );
  });

  it("solves for gas 2 rate", () => {
    const result = calculateGrahamsLaw({
      ...rateInput,
      gas2Rate: undefined,
      solveFor: "gas2Rate",
    });

    expect(result.value).toBeCloseTo(1);
    expect(result.details.formula).toBe(
      "r₂ = r₁√(M₁/M₂)",
    );
  });

  it("solves for gas 1 molar mass", () => {
    const result = calculateGrahamsLaw({
      ...rateInput,
      gas1MolarMass: undefined,
      solveFor: "gas1MolarMass",
    });

    expect(result.value).toBeCloseTo(4);
    expect(result.formattedValue).toBe("4 g/mol");
  });

  it("solves for gas 2 molar mass", () => {
    const result = calculateGrahamsLaw({
      ...rateInput,
      gas2MolarMass: undefined,
      solveFor: "gas2MolarMass",
    });

    expect(result.value).toBeCloseTo(64);
  });

  it("preserves Graham's rate ratio", () => {
    const result = calculateGrahamsLaw({
      ...rateInput,
      gas1Rate: undefined,
      solveFor: "gas1Rate",
    });

    expect(result.details.rateRatio).toBeCloseTo(
      Math.sqrt(64 / 4),
    );
  });
});

describe("calculateGrahamsLaw time mode", () => {
  it("solves for gas 2 time with unit conversion", () => {
    const result = calculateGrahamsLaw({
      ...timeInput,
      gas2Time: undefined,
      solveFor: "gas2Time",
    });

    expect(result.value).toBeCloseTo(4);
    expect(result.formattedValue).toBe("4 min");
    expect(result.details.gas2TimeInSeconds).toBeCloseTo(
      240,
    );
  });

  it("solves for gas 1 time", () => {
    const result = calculateGrahamsLaw({
      ...timeInput,
      gas1Time: undefined,
      solveFor: "gas1Time",
    });

    expect(result.value).toBeCloseTo(1);
  });

  it("solves for molar mass from mixed time units", () => {
    const result = calculateGrahamsLaw({
      mode: "time",
      gas1Time: 30,
      gas1TimeUnit: "s",
      gas2Time: 2,
      gas2TimeUnit: "min",
      outputTimeUnit: "s",
      gas1MolarMass: 4,
      gas2MolarMass: undefined,
      solveFor: "gas2MolarMass",
    });

    expect(result.value).toBeCloseTo(64);
    expect(result.formattedValue).toBe("64 g/mol");
  });

  it("converts supported time units", () => {
    expect(convertTimeToSeconds(2, "min")).toBe(120);
    expect(convertTimeToSeconds(2, "h")).toBe(7200);
    expect(convertSecondsToTime(120, "min")).toBe(2);
    expect(convertSecondsToTime(7200, "h")).toBe(2);
  });
});

describe("calculateGrahamsLaw validation", () => {
  it("rejects a missing required value", () => {
    expect(() =>
      calculateGrahamsLaw({
        ...rateInput,
        gas2Rate: undefined,
        solveFor: "gas1Rate",
      }),
    ).toThrow("Gas 2 rate must be a finite number.");
  });

  it("rejects a non-finite value", () => {
    expect(() =>
      calculateGrahamsLaw({
        ...rateInput,
        gas1MolarMass: Number.NaN,
        gas1Rate: undefined,
        solveFor: "gas1Rate",
      }),
    ).toThrow(
      "Gas 1 molar mass must be a finite number.",
    );
  });

  it.each([0, -1])(
    "rejects non-positive molar mass: %s",
    (gas1MolarMass) => {
      expect(() =>
        calculateGrahamsLaw({
          ...rateInput,
          gas1MolarMass,
          gas1Rate: undefined,
          solveFor: "gas1Rate",
        }),
      ).toThrow(
        "Gas 1 molar mass must be greater than zero.",
      );
    },
  );

  it.each([0, -1])(
    "rejects non-positive time: %s",
    (gas1Time) => {
      expect(() =>
        calculateGrahamsLaw({
          ...timeInput,
          gas1Time,
          gas2Time: undefined,
          solveFor: "gas2Time",
        }),
      ).toThrow(
        "Gas 1 time must be greater than zero.",
      );
    },
  );
});
