import { describe, expect, it } from "vitest";

import { calculateGayLussacsLaw } from "../gay-lussacs-law";

describe("calculateGayLussacsLaw", () => {
  it("calculates final pressure", () => {
    const result = calculateGayLussacsLaw({
      initialPressure: 1,
      initialPressureUnit: "atm",
      initialTemperature: 300,
      initialTemperatureUnit: "K",
      finalPressureUnit: "atm",
      finalTemperature: 600,
      finalTemperatureUnit: "K",
      solveFor: "finalPressure",
    });

    expect(result.value).toBeCloseTo(2, 10);
    expect(result.details.formula).toBe(
      "P₂ = P₁T₂ ÷ T₁",
    );
  });

  it("calculates initial pressure", () => {
    const result = calculateGayLussacsLaw({
      initialPressureUnit: "kPa",
      initialTemperature: 250,
      initialTemperatureUnit: "K",
      finalPressure: 300,
      finalPressureUnit: "kPa",
      finalTemperature: 500,
      finalTemperatureUnit: "K",
      solveFor: "initialPressure",
    });

    expect(result.value).toBeCloseTo(150, 10);
  });

  it("calculates final temperature", () => {
    const result = calculateGayLussacsLaw({
      initialPressure: 100,
      initialPressureUnit: "kPa",
      initialTemperature: 300,
      initialTemperatureUnit: "K",
      finalPressure: 200,
      finalPressureUnit: "kPa",
      finalTemperatureUnit: "K",
      solveFor: "finalTemperature",
    });

    expect(result.value).toBeCloseTo(600, 10);
  });

  it("calculates initial temperature", () => {
    const result = calculateGayLussacsLaw({
      initialPressure: 1,
      initialPressureUnit: "atm",
      initialTemperatureUnit: "K",
      finalPressure: 2,
      finalPressureUnit: "atm",
      finalTemperature: 600,
      finalTemperatureUnit: "K",
      solveFor: "initialTemperature",
    });

    expect(result.value).toBeCloseTo(300, 10);
  });

  it("converts Celsius temperatures through Kelvin", () => {
    const result = calculateGayLussacsLaw({
      initialPressure: 1,
      initialPressureUnit: "atm",
      initialTemperature: 0,
      initialTemperatureUnit: "C",
      finalPressureUnit: "atm",
      finalTemperature: 100,
      finalTemperatureUnit: "C",
      solveFor: "finalPressure",
    });

    expect(result.value).toBeCloseTo(
      373.15 / 273.15,
      10,
    );
  });

  it("converts Fahrenheit temperatures through Kelvin", () => {
    const result = calculateGayLussacsLaw({
      initialPressure: 1,
      initialPressureUnit: "bar",
      initialTemperature: 32,
      initialTemperatureUnit: "F",
      finalPressureUnit: "bar",
      finalTemperature: 212,
      finalTemperatureUnit: "F",
      solveFor: "finalPressure",
    });

    expect(result.value).toBeCloseTo(
      373.15 / 273.15,
      10,
    );
  });

  it("converts mixed pressure units", () => {
    const result = calculateGayLussacsLaw({
      initialPressure: 101.325,
      initialPressureUnit: "kPa",
      initialTemperature: 300,
      initialTemperatureUnit: "K",
      finalPressureUnit: "atm",
      finalTemperature: 600,
      finalTemperatureUnit: "K",
      solveFor: "finalPressure",
    });

    expect(result.value).toBeCloseTo(2, 8);
  });

  it("preserves the pressure-temperature ratio", () => {
    const result = calculateGayLussacsLaw({
      initialPressure: 760,
      initialPressureUnit: "mmHg",
      initialTemperature: 273.15,
      initialTemperatureUnit: "K",
      finalPressure: 2,
      finalPressureUnit: "atm",
      finalTemperatureUnit: "K",
      solveFor: "finalTemperature",
    });

    expect(
      result.details.initialPressureTemperatureRatio,
    ).toBeCloseTo(
      result.details.finalPressureTemperatureRatio,
      10,
    );
  });

  it("returns the selected output unit", () => {
    const result = calculateGayLussacsLaw({
      initialPressure: 100,
      initialPressureUnit: "kPa",
      initialTemperature: 300,
      initialTemperatureUnit: "K",
      finalPressure: 200,
      finalPressureUnit: "kPa",
      finalTemperatureUnit: "C",
      solveFor: "finalTemperature",
    });

    expect(result.value).toBeCloseTo(326.85, 8);
    expect(result.formattedValue).toContain("°C");
    expect(result.details.solvedVariable).toBe(
      "finalTemperature",
    );
  });

  it("rejects a missing required value", () => {
    expect(() =>
      calculateGayLussacsLaw({
        initialPressure: 1,
        initialPressureUnit: "atm",
        initialTemperatureUnit: "K",
        finalPressureUnit: "atm",
        finalTemperature: 600,
        finalTemperatureUnit: "K",
        solveFor: "finalPressure",
      }),
    ).toThrow(
      "Initial temperature must be a finite number.",
    );
  });

  it("rejects zero or negative pressure", () => {
    expect(() =>
      calculateGayLussacsLaw({
        initialPressure: 0,
        initialPressureUnit: "atm",
        initialTemperature: 300,
        initialTemperatureUnit: "K",
        finalPressureUnit: "atm",
        finalTemperature: 600,
        finalTemperatureUnit: "K",
        solveFor: "finalPressure",
      }),
    ).toThrow(
      "Initial pressure must be greater than zero.",
    );
  });

  it("rejects temperatures at or below absolute zero", () => {
    expect(() =>
      calculateGayLussacsLaw({
        initialPressure: 1,
        initialPressureUnit: "atm",
        initialTemperature: -273.15,
        initialTemperatureUnit: "C",
        finalPressureUnit: "atm",
        finalTemperature: 100,
        finalTemperatureUnit: "C",
        solveFor: "finalPressure",
      }),
    ).toThrow(
      "Initial temperature must be above absolute zero.",
    );
  });
});
