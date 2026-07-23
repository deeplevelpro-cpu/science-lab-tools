import type { CalculationResult } from "@/types/calculator";

import {
  convertCubicMetersToVolume,
  convertPascalsToPressure,
  convertPressureToPascals,
  convertVolumeToCubicMeters,
  type GasVolumeUnit,
  type PressureUnit,
} from "./ideal-gas-law";
import { formatCalculatedNumber } from "./number-format";

export type BoylesLawVariable =
  | "initialPressure"
  | "initialVolume"
  | "finalPressure"
  | "finalVolume";

export type BoylesLawInput = {
  initialPressure?: number;
  initialPressureUnit: PressureUnit;
  initialVolume?: number;
  initialVolumeUnit: GasVolumeUnit;
  finalPressure?: number;
  finalPressureUnit: PressureUnit;
  finalVolume?: number;
  finalVolumeUnit: GasVolumeUnit;
  solveFor: BoylesLawVariable;
};

export type BoylesLawDetails = {
  initialPressure: number;
  initialPressureInPascals: number;
  initialPressureUnit: PressureUnit;
  initialVolume: number;
  initialVolumeInCubicMeters: number;
  initialVolumeUnit: GasVolumeUnit;
  finalPressure: number;
  finalPressureInPascals: number;
  finalPressureUnit: PressureUnit;
  finalVolume: number;
  finalVolumeInCubicMeters: number;
  finalVolumeUnit: GasVolumeUnit;
  solvedVariable: BoylesLawVariable;
  formula: string;
  initialPressureVolumeProduct: number;
  finalPressureVolumeProduct: number;
};

const variableLabels: Record<BoylesLawVariable, string> = {
  initialPressure: "Initial pressure",
  initialVolume: "Initial volume",
  finalPressure: "Final pressure",
  finalVolume: "Final volume",
};

function requirePositiveValue(
  value: number | undefined,
  variable: BoylesLawVariable,
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

function displayVolumeUnit(unit: GasVolumeUnit): string {
  return unit === "m3" ? "m³" : unit;
}

export function calculateBoylesLaw({
  initialPressure,
  initialPressureUnit,
  initialVolume,
  initialVolumeUnit,
  finalPressure,
  finalPressureUnit,
  finalVolume,
  finalVolumeUnit,
  solveFor,
}: BoylesLawInput): CalculationResult<BoylesLawDetails> {
  let initialPressureInPascals: number;
  let initialVolumeInCubicMeters: number;
  let finalPressureInPascals: number;
  let finalVolumeInCubicMeters: number;
  let formula: string;

  switch (solveFor) {
    case "initialPressure": {
      initialVolumeInCubicMeters =
        convertVolumeToCubicMeters(
          requirePositiveValue(
            initialVolume,
            "initialVolume",
          ),
          initialVolumeUnit,
        );
      finalPressureInPascals = convertPressureToPascals(
        requirePositiveValue(
          finalPressure,
          "finalPressure",
        ),
        finalPressureUnit,
      );
      finalVolumeInCubicMeters =
        convertVolumeToCubicMeters(
          requirePositiveValue(finalVolume, "finalVolume"),
          finalVolumeUnit,
        );
      initialPressureInPascals =
        (finalPressureInPascals *
          finalVolumeInCubicMeters) /
        initialVolumeInCubicMeters;
      formula = "P₁ = P₂V₂ ÷ V₁";
      break;
    }

    case "initialVolume": {
      initialPressureInPascals =
        convertPressureToPascals(
          requirePositiveValue(
            initialPressure,
            "initialPressure",
          ),
          initialPressureUnit,
        );
      finalPressureInPascals = convertPressureToPascals(
        requirePositiveValue(
          finalPressure,
          "finalPressure",
        ),
        finalPressureUnit,
      );
      finalVolumeInCubicMeters =
        convertVolumeToCubicMeters(
          requirePositiveValue(finalVolume, "finalVolume"),
          finalVolumeUnit,
        );
      initialVolumeInCubicMeters =
        (finalPressureInPascals *
          finalVolumeInCubicMeters) /
        initialPressureInPascals;
      formula = "V₁ = P₂V₂ ÷ P₁";
      break;
    }

    case "finalPressure": {
      initialPressureInPascals =
        convertPressureToPascals(
          requirePositiveValue(
            initialPressure,
            "initialPressure",
          ),
          initialPressureUnit,
        );
      initialVolumeInCubicMeters =
        convertVolumeToCubicMeters(
          requirePositiveValue(
            initialVolume,
            "initialVolume",
          ),
          initialVolumeUnit,
        );
      finalVolumeInCubicMeters =
        convertVolumeToCubicMeters(
          requirePositiveValue(finalVolume, "finalVolume"),
          finalVolumeUnit,
        );
      finalPressureInPascals =
        (initialPressureInPascals *
          initialVolumeInCubicMeters) /
        finalVolumeInCubicMeters;
      formula = "P₂ = P₁V₁ ÷ V₂";
      break;
    }

    case "finalVolume": {
      initialPressureInPascals =
        convertPressureToPascals(
          requirePositiveValue(
            initialPressure,
            "initialPressure",
          ),
          initialPressureUnit,
        );
      initialVolumeInCubicMeters =
        convertVolumeToCubicMeters(
          requirePositiveValue(
            initialVolume,
            "initialVolume",
          ),
          initialVolumeUnit,
        );
      finalPressureInPascals = convertPressureToPascals(
        requirePositiveValue(
          finalPressure,
          "finalPressure",
        ),
        finalPressureUnit,
      );
      finalVolumeInCubicMeters =
        (initialPressureInPascals *
          initialVolumeInCubicMeters) /
        finalPressureInPascals;
      formula = "V₂ = P₁V₁ ÷ P₂";
      break;
    }
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

  const solvedValue = {
    initialPressure: calculatedInitialPressure,
    initialVolume: calculatedInitialVolume,
    finalPressure: calculatedFinalPressure,
    finalVolume: calculatedFinalVolume,
  }[solveFor];

  const solvedUnit = {
    initialPressure: initialPressureUnit,
    initialVolume: displayVolumeUnit(initialVolumeUnit),
    finalPressure: finalPressureUnit,
    finalVolume: displayVolumeUnit(finalVolumeUnit),
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
      finalPressure: calculatedFinalPressure,
      finalPressureInPascals,
      finalPressureUnit,
      finalVolume: calculatedFinalVolume,
      finalVolumeInCubicMeters,
      finalVolumeUnit,
      solvedVariable: solveFor,
      formula,
      initialPressureVolumeProduct:
        initialPressureInPascals *
        initialVolumeInCubicMeters,
      finalPressureVolumeProduct:
        finalPressureInPascals *
        finalVolumeInCubicMeters,
    },
  };
}
