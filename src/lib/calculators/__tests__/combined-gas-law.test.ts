import { describe, expect, it } from "vitest";

import { calculateCombinedGasLaw } from "../combined-gas-law";

const baseInput = {
  initialPressure: 1,
  initialPressureUnit: "atm" as const,
  initialVolume: 2,
  initialVolumeUnit: "L" as const,
  initialTemperature: 300,
  initialTemperatureUnit: "K" as const,
  finalPressure: 2,
  finalPressureUnit: "atm" as const,
  finalVolume: 3,
  finalVolumeUnit: "L" as const,
  finalTemperature: 900,
  finalTemperatureUnit: "K" as const,
};

describe("calculateCombinedGasLaw", () => {
  it("calculates final pressure", () => {
    const result = calculateCombinedGasLaw({
      ...baseInput,
      finalPressure: undefined,
      solveFor: "finalPressure",
    });

    expect(result.value).toBeCloseTo(2, 10);
    expect(result.details.formula).toBe(
      "P₂ = P₁V₁T₂ ÷ (V₂T₁)",
    );
  });

  it("calculates initial pressure", () => {
    const result = calculateCombinedGasLaw({
      ...baseInput,
      initialPressure: undefined,
      solveFor: "initialPressure",
    });

    expect(result.value).toBeCloseTo(1, 10);
  });

  it("calculates final volume", () => {
    const result = calculateCombinedGasLaw({
      ...baseInput,
      finalVolume: undefined,
      solveFor: "finalVolume",
    });

    expect(result.value).toBeCloseTo(3, 10);
  });

  it("calculates initial volume", () => {
    const result = calculateCombinedGasLaw({
      ...baseInput,
      initialVolume: undefined,
      solveFor: "initialVolume",
    });

    expect(result.value).toBeCloseTo(2, 10);
  });

  it("calculates final temperature", () => {
    const result = calculateCombinedGasLaw({
      ...baseInput,
      finalTemperature: undefined,
      solveFor: "finalTemperature",
    });

    expect(result.value).toBeCloseTo(900, 10);
  });

  it("calculates initial temperature", () => {
    const result = calculateCombinedGasLaw({
      ...baseInput,
      initialTemperature: undefined,
      solveFor: "initialTemperature",
    });

    expect(result.value).toBeCloseTo(300, 10);
  });

  it("converts mixed pressure, volume and temperature units", () => {
    const result = calculateCombinedGasLaw({
      initialPressure: 101.325,
      initialPressureUnit: "kPa",
      initialVolume: 2000,
      initialVolumeUnit: "mL",
      initialTemperature: 26.85,
      initialTemperatureUnit: "C",
      finalPressure: 2,
      finalPressureUnit: "atm",
      finalVolume: 0.003,
      finalVolumeUnit: "m3",
      finalTemperatureUnit: "F",
      solveFor: "finalTemperature",
    });

    expect(result.value).toBeCloseTo(1160.33, 8);
    expect(result.formattedValue).toContain("°F");
  });

  it("preserves the combined-gas-law ratio", () => {
    const result = calculateCombinedGasLaw({
      ...baseInput,
      finalPressure: undefined,
      solveFor: "finalPressure",
    });

    expect(
      result.details
        .initialPressureVolumeTemperatureRatio,
    ).toBeCloseTo(
      result.details
        .finalPressureVolumeTemperatureRatio,
      10,
    );
  });

  it("returns the selected output unit and variable", () => {
    const result = calculateCombinedGasLaw({
      ...baseInput,
      finalVolume: undefined,
      finalVolumeUnit: "m3",
      solveFor: "finalVolume",
    });

    expect(result.value).toBeCloseTo(0.003, 12);
    expect(result.formattedValue).toContain("m³");
    expect(result.details.solvedVariable).toBe(
      "finalVolume",
    );
  });

  it("rejects a missing required value", () => {
    expect(() =>
      calculateCombinedGasLaw({
        ...baseInput,
        initialVolume: undefined,
        finalPressure: undefined,
        solveFor: "finalPressure",
      }),
    ).toThrow(
      "Initial volume must be a finite number.",
    );
  });

  it("rejects zero or negative pressure and volume", () => {
    expect(() =>
      calculateCombinedGasLaw({
        ...baseInput,
        initialPressure: 0,
        finalPressure: undefined,
        solveFor: "finalPressure",
      }),
    ).toThrow(
      "Initial pressure must be greater than zero.",
    );

    expect(() =>
      calculateCombinedGasLaw({
        ...baseInput,
        initialVolume: -1,
        finalPressure: undefined,
        solveFor: "finalPressure",
      }),
    ).toThrow(
      "Initial volume must be greater than zero.",
    );
  });

  it("rejects temperatures at or below absolute zero", () => {
    expect(() =>
      calculateCombinedGasLaw({
        ...baseInput,
        initialTemperature: -273.15,
        initialTemperatureUnit: "C",
        finalPressure: undefined,
        solveFor: "finalPressure",
      }),
    ).toThrow(
      "Initial temperature must be above absolute zero.",
    );
  });
});
