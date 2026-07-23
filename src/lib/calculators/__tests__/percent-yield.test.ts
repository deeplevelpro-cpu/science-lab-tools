import { describe, expect, it } from "vitest";

import { calculatePercentYield } from "../percent-yield";

describe("calculatePercentYield", () => {
  it("calculates percent yield below 100 percent", () => {
    const result = calculatePercentYield({
      actualYield: 8,
      theoreticalYield: 10,
    });

    expect(result.value).toBe(80);
    expect(result.formattedValue).toBe("80%");
    expect(result.details.efficiencyRatio).toBe(0.8);
    expect(result.details.yieldDifference).toBe(2);
  });

  it("returns 100 percent when both yields are equal", () => {
    const result = calculatePercentYield({
      actualYield: 25,
      theoreticalYield: 25,
    });

    expect(result.value).toBe(100);
    expect(result.formattedValue).toBe("100%");
    expect(result.details.yieldDifference).toBe(0);
  });

  it("allows a result above 100 percent", () => {
    const result = calculatePercentYield({
      actualYield: 10.5,
      theoreticalYield: 10,
    });

    expect(result.value).toBe(105);
    expect(result.details.yieldDifference).toBe(-0.5);
  });

  it("returns zero when actual yield is zero", () => {
    const result = calculatePercentYield({
      actualYield: 0,
      theoreticalYield: 12,
    });

    expect(result.value).toBe(0);
    expect(result.formattedValue).toBe("0%");
  });

  it("supports decimal laboratory measurements", () => {
    const result = calculatePercentYield({
      actualYield: 7.35,
      theoreticalYield: 8.4,
    });

    expect(result.value).toBeCloseTo(87.5);
    expect(result.formattedValue).toBe("87.5%");
  });

  it("preserves the supplied values in calculation details", () => {
    const result = calculatePercentYield({
      actualYield: 4.2,
      theoreticalYield: 5.6,
    });

    expect(result.details.actualYield).toBe(4.2);
    expect(result.details.theoreticalYield).toBe(5.6);
    expect(result.details.formula).toBe(
      "actual yield ÷ theoretical yield × 100",
    );
  });

  it("rejects a negative actual yield", () => {
    expect(() =>
      calculatePercentYield({
        actualYield: -1,
        theoreticalYield: 10,
      }),
    ).toThrow("Actual yield cannot be negative.");
  });

  it("rejects a theoretical yield of zero", () => {
    expect(() =>
      calculatePercentYield({
        actualYield: 5,
        theoreticalYield: 0,
      }),
    ).toThrow(
      "Theoretical yield must be greater than zero.",
    );
  });

  it("rejects a negative theoretical yield", () => {
    expect(() =>
      calculatePercentYield({
        actualYield: 5,
        theoreticalYield: -10,
      }),
    ).toThrow(
      "Theoretical yield must be greater than zero.",
    );
  });

  it("rejects a non-finite actual yield", () => {
    expect(() =>
      calculatePercentYield({
        actualYield: Number.NaN,
        theoreticalYield: 10,
      }),
    ).toThrow("Actual yield must be a finite number.");
  });

  it("rejects a non-finite theoretical yield", () => {
    expect(() =>
      calculatePercentYield({
        actualYield: 5,
        theoreticalYield: Number.POSITIVE_INFINITY,
      }),
    ).toThrow(
      "Theoretical yield must be a finite number.",
    );
  });
});
