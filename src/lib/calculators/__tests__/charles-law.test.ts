import { describe, expect, it } from "vitest";

import { calculateCharlesLaw } from "../charles-law";

describe("calculateCharlesLaw", () => {
  it("calculates final volume", () => {
    const result = calculateCharlesLaw({
      initialVolume: 2,
      initialVolumeUnit: "L",
      initialTemperature: 300,
      initialTemperatureUnit: "K",
      finalVolumeUnit: "L",
      finalTemperature: 450,
      finalTemperatureUnit: "K",
      solveFor: "finalVolume",
    });

    expect(result.value).toBeCloseTo(3, 10);
    expect(result.details.formula).toBe(
      "V₂ = V₁T₂ ÷ T₁",
    );
  });

  it("calculates initial volume", () => {
    const result = calculateCharlesLaw({
      initialVolumeUnit: "L",
      initialTemperature: 250,
      initialTemperatureUnit: "K",
      finalVolume: 6,
      finalVolumeUnit: "L",
      finalTemperature: 500,
      finalTemperatureUnit: "K",
      solveFor: "initialVolume",
    });

    expect(result.value).toBeCloseTo(3, 10);
  });

  it("calculates final temperature", () => {
    const result = calculateCharlesLaw({
      initialVolume: 2,
      initialVolumeUnit: "L",
      initialTemperature: 300,
      initialTemperatureUnit: "K",
      finalVolume: 4,
      finalVolumeUnit: "L",
      finalTemperatureUnit: "K",
      solveFor: "finalTemperature",
    });

    expect(result.value).toBeCloseTo(600, 10);
  });

  it("calculates initial temperature", () => {
    const result = calculateCharlesLaw({
      initialVolume: 1.5,
      initialVolumeUnit: "L",
      initialTemperatureUnit: "K",
      finalVolume: 3,
      finalVolumeUnit: "L",
      finalTemperature: 600,
      finalTemperatureUnit: "K",
      solveFor: "initialTemperature",
    });

    expect(result.value).toBeCloseTo(300, 10);
  });

  it("converts Celsius temperatures through Kelvin", () => {
    const result = calculateCharlesLaw({
      initialVolume: 2,
      initialVolumeUnit: "L",
      initialTemperature: 0,
      initialTemperatureUnit: "C",
      finalVolumeUnit: "L",
      finalTemperature: 100,
      finalTemperatureUnit: "C",
      solveFor: "finalVolume",
    });

    expect(result.value).toBeCloseTo(
      (2 * 373.15) / 273.15,
      10,
    );
  });

  it("converts Fahrenheit temperatures through Kelvin", () => {
    const result = calculateCharlesLaw({
      initialVolume: 1,
      initialVolumeUnit: "L",
      initialTemperature: 32,
      initialTemperatureUnit: "F",
      finalVolumeUnit: "L",
      finalTemperature: 212,
      finalTemperatureUnit: "F",
      solveFor: "finalVolume",
    });

    expect(result.value).toBeCloseTo(
      373.15 / 273.15,
      10,
    );
  });

  it("converts mixed volume units", () => {
    const result = calculateCharlesLaw({
      initialVolume: 500,
      initialVolumeUnit: "mL",
      initialTemperature: 250,
      initialTemperatureUnit: "K",
      finalVolumeUnit: "L",
      finalTemperature: 500,
      finalTemperatureUnit: "K",
      solveFor: "finalVolume",
    });

    expect(result.value).toBeCloseTo(1, 10);
  });

  it("preserves the volume-temperature ratio", () => {
    const result = calculateCharlesLaw({
      initialVolume: 1.25,
      initialVolumeUnit: "L",
      initialTemperature: 275,
      initialTemperatureUnit: "K",
      finalVolume: 2.5,
      finalVolumeUnit: "L",
      finalTemperatureUnit: "K",
      solveFor: "finalTemperature",
    });

    expect(
      result.details.initialVolumeTemperatureRatio,
    ).toBeCloseTo(
      result.details.finalVolumeTemperatureRatio,
      12,
    );
  });

  it("returns the selected output unit", () => {
    const result = calculateCharlesLaw({
      initialVolume: 1,
      initialVolumeUnit: "L",
      initialTemperature: 273.15,
      initialTemperatureUnit: "K",
      finalVolume: 2,
      finalVolumeUnit: "L",
      finalTemperatureUnit: "C",
      solveFor: "finalTemperature",
    });

    expect(result.value).toBeCloseTo(273.15, 8);
    expect(result.formattedValue).toContain("°C");
    expect(result.details.solvedVariable).toBe(
      "finalTemperature",
    );
  });

  it("rejects a missing required value", () => {
    expect(() =>
      calculateCharlesLaw({
        initialVolume: 1,
        initialVolumeUnit: "L",
        initialTemperatureUnit: "K",
        finalVolumeUnit: "L",
        finalTemperature: 400,
        finalTemperatureUnit: "K",
        solveFor: "finalVolume",
      }),
    ).toThrow(
      "Initial temperature must be a finite number.",
    );
  });

  it("rejects zero or negative volume", () => {
    expect(() =>
      calculateCharlesLaw({
        initialVolume: 0,
        initialVolumeUnit: "L",
        initialTemperature: 300,
        initialTemperatureUnit: "K",
        finalVolumeUnit: "L",
        finalTemperature: 400,
        finalTemperatureUnit: "K",
        solveFor: "finalVolume",
      }),
    ).toThrow(
      "Initial volume must be greater than zero.",
    );
  });

  it("rejects temperatures at or below absolute zero", () => {
    expect(() =>
      calculateCharlesLaw({
        initialVolume: 1,
        initialVolumeUnit: "L",
        initialTemperature: -273.15,
        initialTemperatureUnit: "C",
        finalVolumeUnit: "L",
        finalTemperature: 100,
        finalTemperatureUnit: "C",
        solveFor: "finalVolume",
      }),
    ).toThrow(
      "Initial temperature must be above absolute zero.",
    );
  });
});
