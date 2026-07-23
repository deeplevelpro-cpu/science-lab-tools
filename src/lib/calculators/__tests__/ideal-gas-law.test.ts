import { describe, expect, it } from "vitest";

import {
  calculateIdealGasLaw,
  convertPressureToPascals,
  convertTemperatureToKelvin,
  convertVolumeToCubicMeters,
} from "../ideal-gas-law";

describe("Ideal Gas Law unit conversions", () => {
  it("converts atmospheres to pascals", () => {
    expect(convertPressureToPascals(1, "atm")).toBe(101325);
  });

  it("converts liters to cubic meters", () => {
    expect(convertVolumeToCubicMeters(22.414, "L")).toBeCloseTo(
      0.022414,
      12,
    );
  });

  it("converts Celsius and Fahrenheit to kelvin", () => {
    expect(convertTemperatureToKelvin(0, "C")).toBeCloseTo(
      273.15,
      10,
    );
    expect(convertTemperatureToKelvin(32, "F")).toBeCloseTo(
      273.15,
      10,
    );
  });
});

describe("calculateIdealGasLaw", () => {
  it("solves for pressure", () => {
    const result = calculateIdealGasLaw({
      volume: 22.414,
      volumeUnit: "L",
      moles: 1,
      temperature: 273.15,
      temperatureUnit: "K",
      pressureUnit: "atm",
      solveFor: "pressure",
    });

    expect(result.value).toBeCloseTo(1, 3);
    expect(result.details.formula).toBe("P = nRT ÷ V");
  });

  it("solves for volume", () => {
    const result = calculateIdealGasLaw({
      pressure: 1,
      pressureUnit: "atm",
      moles: 1,
      temperature: 273.15,
      temperatureUnit: "K",
      volumeUnit: "L",
      solveFor: "volume",
    });

    expect(result.value).toBeCloseTo(22.414, 3);
    expect(result.details.formula).toBe("V = nRT ÷ P");
  });

  it("solves for moles", () => {
    const result = calculateIdealGasLaw({
      pressure: 101.325,
      pressureUnit: "kPa",
      volume: 22.414,
      volumeUnit: "L",
      temperature: 0,
      temperatureUnit: "C",
      solveFor: "moles",
    });

    expect(result.value).toBeCloseTo(1, 3);
    expect(result.details.formula).toBe("n = PV ÷ RT");
  });

  it("solves for temperature", () => {
    const result = calculateIdealGasLaw({
      pressure: 1,
      pressureUnit: "atm",
      volume: 24.465,
      volumeUnit: "L",
      moles: 1,
      temperatureUnit: "C",
      solveFor: "temperature",
    });

    expect(result.details.temperatureInKelvin).toBeCloseTo(
      298.15,
      2,
    );
    expect(result.value).toBeCloseTo(25, 2);
    expect(result.details.formula).toBe("T = PV ÷ nR");
  });

  it("supports millimeters of mercury and milliliters", () => {
    const result = calculateIdealGasLaw({
      pressure: 760,
      pressureUnit: "mmHg",
      volume: 22414,
      volumeUnit: "mL",
      temperature: 32,
      temperatureUnit: "F",
      solveFor: "moles",
    });

    expect(result.value).toBeCloseTo(1, 3);
  });

  it("rejects zero and negative physical quantities", () => {
    expect(() =>
      calculateIdealGasLaw({
        pressure: 0,
        pressureUnit: "Pa",
        volume: 1,
        volumeUnit: "m3",
        temperature: 300,
        temperatureUnit: "K",
        solveFor: "moles",
      }),
    ).toThrow("Pressure must be greater than zero.");

    expect(() =>
      calculateIdealGasLaw({
        pressure: 1,
        pressureUnit: "atm",
        volume: 1,
        volumeUnit: "L",
        temperature: -273.15,
        temperatureUnit: "C",
        solveFor: "moles",
      }),
    ).toThrow(
      "Temperature must be greater than absolute zero.",
    );
  });

  it("rejects non-finite values", () => {
    expect(() =>
      calculateIdealGasLaw({
        volume: Number.NaN,
        volumeUnit: "L",
        moles: 1,
        temperature: 300,
        temperatureUnit: "K",
        pressureUnit: "atm",
        solveFor: "pressure",
      }),
    ).toThrow("Volume must be a finite number.");
  });
});
