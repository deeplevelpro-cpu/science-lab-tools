import type { CalculationResult } from "@/types/calculator";

import {
  convertCubicMetersToVolume,
  convertKelvinToTemperature,
  convertTemperatureToKelvin,
  convertVolumeToCubicMeters,
  type GasVolumeUnit,
  type TemperatureUnit,
} from "./ideal-gas-law";
import { formatCalculatedNumber } from "./number-format";

export type CharlesLawVariable =
  | "initialVolume"
  | "initialTemperature"
  | "finalVolume"
  | "finalTemperature";

export type CharlesLawInput = {
  initialVolume?: number;
  initialVolumeUnit: GasVolumeUnit;
  initialTemperature?: number;
  initialTemperatureUnit: TemperatureUnit;
  finalVolume?: number;
  finalVolumeUnit: GasVolumeUnit;
  finalTemperature?: number;
  finalTemperatureUnit: TemperatureUnit;
  solveFor: CharlesLawVariable;
};

export type CharlesLawDetails = {
  initialVolume: number;
  initialVolumeInCubicMeters: number;
  initialVolumeUnit: GasVolumeUnit;
  initialTemperature: number;
  initialTemperatureInKelvin: number;
  initialTemperatureUnit: TemperatureUnit;
  finalVolume: number;
  finalVolumeInCubicMeters: number;
  finalVolumeUnit: GasVolumeUnit;
  finalTemperature: number;
  finalTemperatureInKelvin: number;
  finalTemperatureUnit: TemperatureUnit;
  solvedVariable: CharlesLawVariable;
  formula: string;
  initialVolumeTemperatureRatio: number;
  finalVolumeTemperatureRatio: number;
};

const variableLabels: Record<CharlesLawVariable, string> = {
  initialVolume: "Initial volume",
  initialTemperature: "Initial temperature",
  finalVolume: "Final volume",
  finalTemperature: "Final temperature",
};

function requireFiniteValue(
  value: number | undefined,
  variable: CharlesLawVariable,
): number {
  if (value === undefined || !Number.isFinite(value)) {
    throw new Error(
      `${variableLabels[variable]} must be a finite number.`,
    );
  }

  return value;
}

function requirePositiveVolume(
  value: number | undefined,
  variable: "initialVolume" | "finalVolume",
): number {
  const finiteValue = requireFiniteValue(value, variable);

  if (finiteValue <= 0) {
    throw new Error(
      `${variableLabels[variable]} must be greater than zero.`,
    );
  }

  return finiteValue;
}

function convertRequiredTemperatureToKelvin(
  value: number | undefined,
  variable: "initialTemperature" | "finalTemperature",
  unit: TemperatureUnit,
): number {
  const finiteValue = requireFiniteValue(value, variable);

  try {
    return convertTemperatureToKelvin(finiteValue, unit);
  } catch {
    throw new Error(
      `${variableLabels[variable]} must be above absolute zero.`,
    );
  }
}

function displayVolumeUnit(unit: GasVolumeUnit): string {
  return unit === "m3" ? "m³" : unit;
}

function displayTemperatureUnit(
  unit: TemperatureUnit,
): string {
  if (unit === "C") {
    return "°C";
  }

  if (unit === "F") {
    return "°F";
  }

  return "K";
}

export function calculateCharlesLaw({
  initialVolume,
  initialVolumeUnit,
  initialTemperature,
  initialTemperatureUnit,
  finalVolume,
  finalVolumeUnit,
  finalTemperature,
  finalTemperatureUnit,
  solveFor,
}: CharlesLawInput): CalculationResult<CharlesLawDetails> {
  let initialVolumeInCubicMeters: number;
  let initialTemperatureInKelvin: number;
  let finalVolumeInCubicMeters: number;
  let finalTemperatureInKelvin: number;
  let formula: string;

  switch (solveFor) {
    case "initialVolume": {
      initialTemperatureInKelvin =
        convertRequiredTemperatureToKelvin(
          initialTemperature,
          "initialTemperature",
          initialTemperatureUnit,
        );
      finalVolumeInCubicMeters =
        convertVolumeToCubicMeters(
          requirePositiveVolume(finalVolume, "finalVolume"),
          finalVolumeUnit,
        );
      finalTemperatureInKelvin =
        convertRequiredTemperatureToKelvin(
          finalTemperature,
          "finalTemperature",
          finalTemperatureUnit,
        );
      initialVolumeInCubicMeters =
        (finalVolumeInCubicMeters *
          initialTemperatureInKelvin) /
        finalTemperatureInKelvin;
      formula = "V₁ = V₂T₁ ÷ T₂";
      break;
    }

    case "initialTemperature": {
      initialVolumeInCubicMeters =
        convertVolumeToCubicMeters(
          requirePositiveVolume(
            initialVolume,
            "initialVolume",
          ),
          initialVolumeUnit,
        );
      finalVolumeInCubicMeters =
        convertVolumeToCubicMeters(
          requirePositiveVolume(finalVolume, "finalVolume"),
          finalVolumeUnit,
        );
      finalTemperatureInKelvin =
        convertRequiredTemperatureToKelvin(
          finalTemperature,
          "finalTemperature",
          finalTemperatureUnit,
        );
      initialTemperatureInKelvin =
        (initialVolumeInCubicMeters *
          finalTemperatureInKelvin) /
        finalVolumeInCubicMeters;
      formula = "T₁ = V₁T₂ ÷ V₂";
      break;
    }

    case "finalVolume": {
      initialVolumeInCubicMeters =
        convertVolumeToCubicMeters(
          requirePositiveVolume(
            initialVolume,
            "initialVolume",
          ),
          initialVolumeUnit,
        );
      initialTemperatureInKelvin =
        convertRequiredTemperatureToKelvin(
          initialTemperature,
          "initialTemperature",
          initialTemperatureUnit,
        );
      finalTemperatureInKelvin =
        convertRequiredTemperatureToKelvin(
          finalTemperature,
          "finalTemperature",
          finalTemperatureUnit,
        );
      finalVolumeInCubicMeters =
        (initialVolumeInCubicMeters *
          finalTemperatureInKelvin) /
        initialTemperatureInKelvin;
      formula = "V₂ = V₁T₂ ÷ T₁";
      break;
    }

    case "finalTemperature": {
      initialVolumeInCubicMeters =
        convertVolumeToCubicMeters(
          requirePositiveVolume(
            initialVolume,
            "initialVolume",
          ),
          initialVolumeUnit,
        );
      initialTemperatureInKelvin =
        convertRequiredTemperatureToKelvin(
          initialTemperature,
          "initialTemperature",
          initialTemperatureUnit,
        );
      finalVolumeInCubicMeters =
        convertVolumeToCubicMeters(
          requirePositiveVolume(finalVolume, "finalVolume"),
          finalVolumeUnit,
        );
      finalTemperatureInKelvin =
        (finalVolumeInCubicMeters *
          initialTemperatureInKelvin) /
        initialVolumeInCubicMeters;
      formula = "T₂ = V₂T₁ ÷ V₁";
      break;
    }
  }

  const calculatedInitialVolume =
    convertCubicMetersToVolume(
      initialVolumeInCubicMeters,
      initialVolumeUnit,
    );
  const calculatedInitialTemperature =
    convertKelvinToTemperature(
      initialTemperatureInKelvin,
      initialTemperatureUnit,
    );
  const calculatedFinalVolume =
    convertCubicMetersToVolume(
      finalVolumeInCubicMeters,
      finalVolumeUnit,
    );
  const calculatedFinalTemperature =
    convertKelvinToTemperature(
      finalTemperatureInKelvin,
      finalTemperatureUnit,
    );

  const solvedValue = {
    initialVolume: calculatedInitialVolume,
    initialTemperature: calculatedInitialTemperature,
    finalVolume: calculatedFinalVolume,
    finalTemperature: calculatedFinalTemperature,
  }[solveFor];

  const solvedUnit = {
    initialVolume: displayVolumeUnit(initialVolumeUnit),
    initialTemperature: displayTemperatureUnit(
      initialTemperatureUnit,
    ),
    finalVolume: displayVolumeUnit(finalVolumeUnit),
    finalTemperature: displayTemperatureUnit(
      finalTemperatureUnit,
    ),
  }[solveFor];

  return {
    value: solvedValue,
    formattedValue:
      `${formatCalculatedNumber(solvedValue)} ${solvedUnit}`,
    details: {
      initialVolume: calculatedInitialVolume,
      initialVolumeInCubicMeters,
      initialVolumeUnit,
      initialTemperature: calculatedInitialTemperature,
      initialTemperatureInKelvin,
      initialTemperatureUnit,
      finalVolume: calculatedFinalVolume,
      finalVolumeInCubicMeters,
      finalVolumeUnit,
      finalTemperature: calculatedFinalTemperature,
      finalTemperatureInKelvin,
      finalTemperatureUnit,
      solvedVariable: solveFor,
      formula,
      initialVolumeTemperatureRatio:
        initialVolumeInCubicMeters /
        initialTemperatureInKelvin,
      finalVolumeTemperatureRatio:
        finalVolumeInCubicMeters /
        finalTemperatureInKelvin,
    },
  };
}
