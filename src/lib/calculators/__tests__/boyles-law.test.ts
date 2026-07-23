import { describe, expect, it } from "vitest";

import { calculateBoylesLaw } from "../boyles-law";

describe("calculateBoylesLaw", () => {
  it("calculates final pressure", () => {
    const result = calculateBoylesLaw({
      initialPressure: 1,
      initialPressureUnit: "atm",
      initialVolume: 2,
      initialVolumeUnit: "L",
      finalPressureUnit: "atm",
      finalVolume: 1,
      finalVolumeUnit: "L",
      solveFor: "finalPressure",
    });

    expect(result.value).toBeCloseTo(2, 10);
    expect(result.details.formula).toBe(
      "P₂ = P₁V₁ ÷ V₂",
    );
  });

  it("calculates final volume", () => {
    const result = calculateBoylesLaw({
      initialPressure: 2,
      initialPressureUnit: "atm",
      initialVolume: 3,
      initialVolumeUnit: "L",
      finalPressure: 1,
      finalPressureUnit: "atm",
      finalVolumeUnit: "L",
      solveFor: "finalVolume",
    });

    expect(result.value).toBeCloseTo(6, 10);
  });

  it("calculates initial pressure", () => {
    const result = calculateBoylesLaw({
      initialPressureUnit: "kPa",
      initialVolume: 4,
      initialVolumeUnit: "L",
      finalPressure: 200,
      finalPressureUnit: "kPa",
      finalVolume: 2,
      finalVolumeUnit: "L",
      solveFor: "initialPressure",
    });

    expect(result.value).toBeCloseTo(100, 10);
  });

  it("calculates initial volume", () => {
    const result = calculateBoylesLaw({
      initialPressure: 300,
      initialPressureUnit: "kPa",
      initialVolumeUnit: "L",
      finalPressure: 150,
      finalPressureUnit: "kPa",
      finalVolume: 8,
      finalVolumeUnit: "L",
      solveFor: "initialVolume",
    });

    expect(result.value).toBeCloseTo(4, 10);
  });

  it("converts mixed pressure units", () => {
    const result = calculateBoylesLaw({
      initialPressure: 101.325,
      initialPressureUnit: "kPa",
      initialVolume: 2,
      initialVolumeUnit: "L",
      finalPressure: 1,
      finalPressureUnit: "atm",
      finalVolumeUnit: "mL",
      solveFor: "finalVolume",
    });

    expect(result.value).toBeCloseTo(2000, 8);
  });

  it("converts mixed volume units", () => {
    const result = calculateBoylesLaw({
      initialPressure: 1,
      initialPressureUnit: "bar",
      initialVolume: 500,
      initialVolumeUnit: "mL",
      finalPressureUnit: "bar",
      finalVolume: 0.25,
      finalVolumeUnit: "L",
      solveFor: "finalPressure",
    });

    expect(result.value).toBeCloseTo(2, 10);
  });

  it("preserves the pressure-volume equality", () => {
    const result = calculateBoylesLaw({
      initialPressure: 760,
      initialPressureUnit: "mmHg",
      initialVolume: 1.5,
      initialVolumeUnit: "L",
      finalPressure: 2,
      finalPressureUnit: "atm",
      finalVolumeUnit: "L",
      solveFor: "finalVolume",
    });

    expect(
      result.details.initialPressureVolumeProduct,
    ).toBeCloseTo(
      result.details.finalPressureVolumeProduct,
      10,
    );
  });

  it("returns the selected output unit", () => {
    const result = calculateBoylesLaw({
      initialPressure: 100,
      initialPressureUnit: "kPa",
      initialVolume: 2,
      initialVolumeUnit: "L",
      finalPressureUnit: "Pa",
      finalVolume: 1,
      finalVolumeUnit: "L",
      solveFor: "finalPressure",
    });

    expect(result.value).toBeCloseTo(200000, 6);
    expect(result.formattedValue).toContain("Pa");
    expect(result.details.solvedVariable).toBe(
      "finalPressure",
    );
  });

  it("rejects a missing required value", () => {
    expect(() =>
      calculateBoylesLaw({
        initialPressure: 1,
        initialPressureUnit: "atm",
        initialVolumeUnit: "L",
        finalPressure: 2,
        finalPressureUnit: "atm",
        finalVolumeUnit: "L",
        solveFor: "finalVolume",
      }),
    ).toThrow("Initial volume must be a finite number.");
  });

  it("rejects zero values", () => {
    expect(() =>
      calculateBoylesLaw({
        initialPressure: 0,
        initialPressureUnit: "atm",
        initialVolume: 2,
        initialVolumeUnit: "L",
        finalPressureUnit: "atm",
        finalVolume: 1,
        finalVolumeUnit: "L",
        solveFor: "finalPressure",
      }),
    ).toThrow(
      "Initial pressure must be greater than zero.",
    );
  });

  it("rejects negative values", () => {
    expect(() =>
      calculateBoylesLaw({
        initialPressure: 1,
        initialPressureUnit: "atm",
        initialVolume: -2,
        initialVolumeUnit: "L",
        finalPressureUnit: "atm",
        finalVolume: 1,
        finalVolumeUnit: "L",
        solveFor: "finalPressure",
      }),
    ).toThrow(
      "Initial volume must be greater than zero.",
    );
  });

  it("rejects non-finite values", () => {
    expect(() =>
      calculateBoylesLaw({
        initialPressure: Number.NaN,
        initialPressureUnit: "atm",
        initialVolume: 2,
        initialVolumeUnit: "L",
        finalPressureUnit: "atm",
        finalVolume: 1,
        finalVolumeUnit: "L",
        solveFor: "finalPressure",
      }),
    ).toThrow(
      "Initial pressure must be a finite number.",
    );
  });
});
