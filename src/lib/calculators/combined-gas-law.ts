import type { CalculationResult } from "@/types/calculator";

import {
  convertCubicMetersToVolume,
  convertKelvinToTemperature,
  convertPascalsToPressure,
  convertPressureToPascals,
  convertTemperatureToKelvin,
  convertVolumeToCubicMeters,
  type GasVolumeUnit,
  type PressureUnit,
  type TemperatureUnit,
} from "./ideal-gas-law";

export type CombinedGasLawVariable =
  | "initialPressure"
  | "initialVolume"
  | "initialTemperature"
  | "finalPressure"
  | "finalVolume"
  | "finalTemperature";

export type CombinedGasLawInput = {
  initialPressure?: number;
  initialPressureUnit: PressureUnit;
  initialVolume?: number;
  initialVolumeUnit: GasVolumeUnit;
  initialTemperature?: number;
  initialTemperatureUnit: TemperatureUnit;
  finalPressure?: number;
  finalPressureUnit: PressureUnit;
  finalVolume?: number;
  finalVolumeUnit: GasVolumeUnit;
  finalTemperature?: number;
  finalTemperatureUnit: TemperatureUnit;
  solveFor: CombinedGasLawVariable;
};

export type CombinedGasLawDetails = {
  initialPressure: number;
  initialPressureInPascals: number;
  initialPressureUnit: PressureUnit;
  initialVolume: number;
  initialVolumeInCubicMeters: number;
  initialVolumeUnit: GasVolumeUnit;
  initialTemperature: number;
  initialTemperatureInKelvin: number;
  initialTemperatureUnit: TemperatureUnit;
  finalPressure: number;
  finalPressureInPascals: number;
  finalPressureUnit: PressureUnit;
  finalVolume: number;
  finalVolumeInCubicMeters: number;
  finalVolumeUnit: GasVolumeUnit;
  finalTemperature: number;
  finalTemperatureInKelvin: number;
  finalTemperatureUnit: TemperatureUnit;
  solvedVariable: CombinedGasLawVariable;
  formula: string;
  initialPressureVolumeTemperatureRatio: number;
  finalPressureVolumeTemperatureRatio: number;
};

function requireFiniteValue(
  value: number | undefined,
  label: string,
): number {
  if (value === undefined || !Number.isFinite(value)) {
    throw new Error(`${label} must be a finite number.`);
  }

  return value;
}

function requirePositiveValue(
  value: number | undefined,
  label: string,
): number {
  const checkedValue = requireFiniteValue(value, label);

  if (checkedValue <= 0) {
    throw new Error(`${label} must be greater than zero.`);
  }

  return checkedValue;
}

function convertRequiredTemperature(
  value: number | undefined,
  unit: TemperatureUnit,
  label: string,
): number {
  const checkedValue = requireFiniteValue(value, label);

  try {
    return convertTemperatureToKelvin(checkedValue, unit);
  } catch {
    throw new Error(`${label} must be above absolute zero.`);
  }
}

function formatCalculatedNumber(value: number): string {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 8,
  }).format(value);
}

function displayVolumeUnit(unit: GasVolumeUnit): string {
  return unit === "m3" ? "m³" : unit;
}

function displayTemperatureUnit(
  unit: TemperatureUnit,
): string {
  return unit === "K" ? "K" : `°${unit}`;
}

export function calculateCombinedGasLaw(
  input: CombinedGasLawInput,
): CalculationResult<CombinedGasLawDetails> {
  const {
    initialPressure,
    initialPressureUnit,
    initialVolume,
    initialVolumeUnit,
    initialTemperature,
    initialTemperatureUnit,
    finalPressure,
    finalPressureUnit,
    finalVolume,
    finalVolumeUnit,
    finalTemperature,
    finalTemperatureUnit,
    solveFor,
  } = input;

  let initialPressureInPascals =
    solveFor === "initialPressure"
      ? Number.NaN
      : convertPressureToPascals(
          requirePositiveValue(
            initialPressure,
            "Initial pressure",
          ),
          initialPressureUnit,
        );

  let initialVolumeInCubicMeters =
    solveFor === "initialVolume"
      ? Number.NaN
      : convertVolumeToCubicMeters(
          requirePositiveValue(
            initialVolume,
            "Initial volume",
          ),
          initialVolumeUnit,
        );

  let initialTemperatureInKelvin =
    solveFor === "initialTemperature"
      ? Number.NaN
      : convertRequiredTemperature(
          initialTemperature,
          initialTemperatureUnit,
          "Initial temperature",
        );

  let finalPressureInPascals =
    solveFor === "finalPressure"
      ? Number.NaN
      : convertPressureToPascals(
          requirePositiveValue(
            finalPressure,
            "Final pressure",
          ),
          finalPressureUnit,
        );

  let finalVolumeInCubicMeters =
    solveFor === "finalVolume"
      ? Number.NaN
      : convertVolumeToCubicMeters(
          requirePositiveValue(
            finalVolume,
            "Final volume",
          ),
          finalVolumeUnit,
        );

  let finalTemperatureInKelvin =
    solveFor === "finalTemperature"
      ? Number.NaN
      : convertRequiredTemperature(
          finalTemperature,
          finalTemperatureUnit,
          "Final temperature",
        );

  let formula: string;

  switch (solveFor) {
    case "initialPressure":
      formula = "P₁ = P₂V₂T₁ ÷ (V₁T₂)";
      initialPressureInPascals =
        (finalPressureInPascals *
          finalVolumeInCubicMeters *
          initialTemperatureInKelvin) /
        (initialVolumeInCubicMeters *
          finalTemperatureInKelvin);
      break;

    case "initialVolume":
      formula = "V₁ = P₂V₂T₁ ÷ (P₁T₂)";
      initialVolumeInCubicMeters =
        (finalPressureInPascals *
          finalVolumeInCubicMeters *
          initialTemperatureInKelvin) /
        (initialPressureInPascals *
          finalTemperatureInKelvin);
      break;

    case "initialTemperature":
      formula = "T₁ = P₁V₁T₂ ÷ (P₂V₂)";
      initialTemperatureInKelvin =
        (initialPressureInPascals *
          initialVolumeInCubicMeters *
          finalTemperatureInKelvin) /
        (finalPressureInPascals *
          finalVolumeInCubicMeters);
      break;

    case "finalPressure":
      formula = "P₂ = P₁V₁T₂ ÷ (V₂T₁)";
      finalPressureInPascals =
        (initialPressureInPascals *
          initialVolumeInCubicMeters *
          finalTemperatureInKelvin) /
        (finalVolumeInCubicMeters *
          initialTemperatureInKelvin);
      break;

    case "finalVolume":
      formula = "V₂ = P₁V₁T₂ ÷ (P₂T₁)";
      finalVolumeInCubicMeters =
        (initialPressureInPascals *
          initialVolumeInCubicMeters *
          finalTemperatureInKelvin) /
        (finalPressureInPascals *
          initialTemperatureInKelvin);
      break;

    case "finalTemperature":
      formula = "T₂ = P₂V₂T₁ ÷ (P₁V₁)";
      finalTemperatureInKelvin =
        (finalPressureInPascals *
          finalVolumeInCubicMeters *
          initialTemperatureInKelvin) /
        (initialPressureInPascals *
          initialVolumeInCubicMeters);
      break;
  }

  const calculatedInitialPressure =
    convertPascalsToPressure(
      initialPressureInPascals,
      initialPressureUnit,
    );
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
  const calculatedFinalPressure =
    convertPascalsToPressure(
      finalPressureInPascals,
      finalPressureUnit,
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
    initialPressure: calculatedInitialPressure,
    initialVolume: calculatedInitialVolume,
    initialTemperature: calculatedInitialTemperature,
    finalPressure: calculatedFinalPressure,
    finalVolume: calculatedFinalVolume,
    finalTemperature: calculatedFinalTemperature,
  }[solveFor];

  const solvedUnit = {
    initialPressure: initialPressureUnit,
    initialVolume: displayVolumeUnit(initialVolumeUnit),
    initialTemperature: displayTemperatureUnit(
      initialTemperatureUnit,
    ),
    finalPressure: finalPressureUnit,
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
      initialPressure: calculatedInitialPressure,
      initialPressureInPascals,
      initialPressureUnit,
      initialVolume: calculatedInitialVolume,
      initialVolumeInCubicMeters,
      initialVolumeUnit,
      initialTemperature: calculatedInitialTemperature,
      initialTemperatureInKelvin,
      initialTemperatureUnit,
      finalPressure: calculatedFinalPressure,
      finalPressureInPascals,
      finalPressureUnit,
      finalVolume: calculatedFinalVolume,
      finalVolumeInCubicMeters,
      finalVolumeUnit,
      finalTemperature: calculatedFinalTemperature,
      finalTemperatureInKelvin,
      finalTemperatureUnit,
      solvedVariable: solveFor,
      formula,
      initialPressureVolumeTemperatureRatio:
        (initialPressureInPascals *
          initialVolumeInCubicMeters) /
        initialTemperatureInKelvin,
      finalPressureVolumeTemperatureRatio:
        (finalPressureInPascals *
          finalVolumeInCubicMeters) /
        finalTemperatureInKelvin,
    },
  };
}
