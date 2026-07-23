import type { CalculationResult } from "@/types/calculator";

import { formatCalculatedNumber } from "./number-format";

export type IdealGasVariable =
  | "pressure"
  | "volume"
  | "moles"
  | "temperature";

export type PressureUnit =
  | "Pa"
  | "kPa"
  | "bar"
  | "atm"
  | "mmHg";

export type GasVolumeUnit = "m3" | "L" | "mL";

export type TemperatureUnit = "K" | "C" | "F";

export type IdealGasLawInput = {
  pressure?: number;
  pressureUnit: PressureUnit;
  volume?: number;
  volumeUnit: GasVolumeUnit;
  moles?: number;
  temperature?: number;
  temperatureUnit: TemperatureUnit;
  solveFor: IdealGasVariable;
};

export type IdealGasLawDetails = {
  pressure: number;
  pressureInPascals: number;
  pressureUnit: PressureUnit;
  volume: number;
  volumeInCubicMeters: number;
  volumeUnit: GasVolumeUnit;
  moles: number;
  temperature: number;
  temperatureInKelvin: number;
  temperatureUnit: TemperatureUnit;
  solvedVariable: IdealGasVariable;
  gasConstant: number;
  formula: string;
};

const GAS_CONSTANT = 8.31446261815324;

const pressureToPascals: Record<PressureUnit, number> = {
  Pa: 1,
  kPa: 1000,
  bar: 100000,
  atm: 101325,
  mmHg: 133.32236842105263,
};

const volumeToCubicMeters: Record<GasVolumeUnit, number> = {
  m3: 1,
  L: 0.001,
  mL: 0.000001,
};

const variableLabels: Record<IdealGasVariable, string> = {
  pressure: "Pressure",
  volume: "Volume",
  moles: "Amount in moles",
  temperature: "Temperature",
};

function requirePositiveValue(
  value: number | undefined,
  variable: IdealGasVariable,
): number {
  if (value === undefined || !Number.isFinite(value)) {
    throw new Error(
      `${variableLabels[variable]} must be a finite number.`,
    );
  }

  if (value <= 0) {
    throw new Error(
      `${variableLabels[variable]} must be greater than zero.`,
    );
  }

  return value;
}

function requireTemperatureValue(
  value: number | undefined,
): number {
  if (value === undefined || !Number.isFinite(value)) {
    throw new Error("Temperature must be a finite number.");
  }

  return value;
}

export function convertPressureToPascals(
  pressure: number,
  unit: PressureUnit,
): number {
  return (
    requirePositiveValue(pressure, "pressure") *
    pressureToPascals[unit]
  );
}

export function convertPascalsToPressure(
  pressureInPascals: number,
  unit: PressureUnit,
): number {
  return (
    requirePositiveValue(pressureInPascals, "pressure") /
    pressureToPascals[unit]
  );
}

export function convertVolumeToCubicMeters(
  volume: number,
  unit: GasVolumeUnit,
): number {
  return (
    requirePositiveValue(volume, "volume") *
    volumeToCubicMeters[unit]
  );
}

export function convertCubicMetersToVolume(
  volumeInCubicMeters: number,
  unit: GasVolumeUnit,
): number {
  return (
    requirePositiveValue(volumeInCubicMeters, "volume") /
    volumeToCubicMeters[unit]
  );
}

export function convertTemperatureToKelvin(
  temperature: number,
  unit: TemperatureUnit,
): number {
  if (!Number.isFinite(temperature)) {
    throw new Error("Temperature must be a finite number.");
  }

  let temperatureInKelvin: number;

  switch (unit) {
    case "K":
      temperatureInKelvin = temperature;
      break;
    case "C":
      temperatureInKelvin = temperature + 273.15;
      break;
    case "F":
      temperatureInKelvin =
        ((temperature - 32) * 5) / 9 + 273.15;
      break;
  }

  if (temperatureInKelvin <= 0) {
    throw new Error(
      "Temperature must be greater than absolute zero.",
    );
  }

  return temperatureInKelvin;
}

export function convertKelvinToTemperature(
  temperatureInKelvin: number,
  unit: TemperatureUnit,
): number {
  const kelvin = requirePositiveValue(
    temperatureInKelvin,
    "temperature",
  );

  switch (unit) {
    case "K":
      return kelvin;
    case "C":
      return kelvin - 273.15;
    case "F":
      return ((kelvin - 273.15) * 9) / 5 + 32;
  }
}

export function calculateIdealGasLaw({
  pressure,
  pressureUnit,
  volume,
  volumeUnit,
  moles,
  temperature,
  temperatureUnit,
  solveFor,
}: IdealGasLawInput): CalculationResult<IdealGasLawDetails> {
  let pressureInPascals: number;
  let volumeInCubicMeters: number;
  let calculatedMoles: number;
  let temperatureInKelvin: number;
  let formula: string;

  switch (solveFor) {
    case "pressure": {
      volumeInCubicMeters = convertVolumeToCubicMeters(
        requirePositiveValue(volume, "volume"),
        volumeUnit,
      );
      calculatedMoles = requirePositiveValue(moles, "moles");
      temperatureInKelvin = convertTemperatureToKelvin(
        requireTemperatureValue(temperature),
        temperatureUnit,
      );
      pressureInPascals =
        (calculatedMoles *
          GAS_CONSTANT *
          temperatureInKelvin) /
        volumeInCubicMeters;
      formula = "P = nRT ÷ V";
      break;
    }

    case "volume": {
      pressureInPascals = convertPressureToPascals(
        requirePositiveValue(pressure, "pressure"),
        pressureUnit,
      );
      calculatedMoles = requirePositiveValue(moles, "moles");
      temperatureInKelvin = convertTemperatureToKelvin(
        requireTemperatureValue(temperature),
        temperatureUnit,
      );
      volumeInCubicMeters =
        (calculatedMoles *
          GAS_CONSTANT *
          temperatureInKelvin) /
        pressureInPascals;
      formula = "V = nRT ÷ P";
      break;
    }

    case "moles": {
      pressureInPascals = convertPressureToPascals(
        requirePositiveValue(pressure, "pressure"),
        pressureUnit,
      );
      volumeInCubicMeters = convertVolumeToCubicMeters(
        requirePositiveValue(volume, "volume"),
        volumeUnit,
      );
      temperatureInKelvin = convertTemperatureToKelvin(
        requireTemperatureValue(temperature),
        temperatureUnit,
      );
      calculatedMoles =
        (pressureInPascals * volumeInCubicMeters) /
        (GAS_CONSTANT * temperatureInKelvin);
      formula = "n = PV ÷ RT";
      break;
    }

    case "temperature": {
      pressureInPascals = convertPressureToPascals(
        requirePositiveValue(pressure, "pressure"),
        pressureUnit,
      );
      volumeInCubicMeters = convertVolumeToCubicMeters(
        requirePositiveValue(volume, "volume"),
        volumeUnit,
      );
      calculatedMoles = requirePositiveValue(moles, "moles");
      temperatureInKelvin =
        (pressureInPascals * volumeInCubicMeters) /
        (calculatedMoles * GAS_CONSTANT);
      formula = "T = PV ÷ nR";
      break;
    }
  }

  const calculatedPressure = convertPascalsToPressure(
    pressureInPascals,
    pressureUnit,
  );
  const calculatedVolume = convertCubicMetersToVolume(
    volumeInCubicMeters,
    volumeUnit,
  );
  const calculatedTemperature = convertKelvinToTemperature(
    temperatureInKelvin,
    temperatureUnit,
  );

  const solvedValue = {
    pressure: calculatedPressure,
    volume: calculatedVolume,
    moles: calculatedMoles,
    temperature: calculatedTemperature,
  }[solveFor];

  const solvedUnit = {
    pressure: pressureUnit,
    volume: volumeUnit === "m3" ? "m³" : volumeUnit,
    moles: "mol",
    temperature: {
      K: "K",
      C: "°C",
      F: "°F",
    }[temperatureUnit],
  }[solveFor];

  return {
    value: solvedValue,
    formattedValue:
      `${formatCalculatedNumber(solvedValue)} ${solvedUnit}`,
    details: {
      pressure: calculatedPressure,
      pressureInPascals,
      pressureUnit,
      volume: calculatedVolume,
      volumeInCubicMeters,
      volumeUnit,
      moles: calculatedMoles,
      temperature: calculatedTemperature,
      temperatureInKelvin,
      temperatureUnit,
      solvedVariable: solveFor,
      gasConstant: GAS_CONSTANT,
      formula,
    },
  };
}
