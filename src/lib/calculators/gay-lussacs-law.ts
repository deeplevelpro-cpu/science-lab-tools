import type { CalculationResult } from "@/types/calculator";

import {
  convertKelvinToTemperature,
  convertPascalsToPressure,
  convertPressureToPascals,
  convertTemperatureToKelvin,
  type PressureUnit,
  type TemperatureUnit,
} from "./ideal-gas-law";
import { formatCalculatedNumber } from "./number-format";

export type GayLussacsLawVariable =
  | "initialPressure"
  | "initialTemperature"
  | "finalPressure"
  | "finalTemperature";

export type GayLussacsLawInput = {
  initialPressure?: number;
  initialPressureUnit: PressureUnit;
  initialTemperature?: number;
  initialTemperatureUnit: TemperatureUnit;
  finalPressure?: number;
  finalPressureUnit: PressureUnit;
  finalTemperature?: number;
  finalTemperatureUnit: TemperatureUnit;
  solveFor: GayLussacsLawVariable;
};

export type GayLussacsLawDetails = {
  initialPressure: number;
  initialPressureInPascals: number;
  initialPressureUnit: PressureUnit;
  initialTemperature: number;
  initialTemperatureInKelvin: number;
  initialTemperatureUnit: TemperatureUnit;
  finalPressure: number;
  finalPressureInPascals: number;
  finalPressureUnit: PressureUnit;
  finalTemperature: number;
  finalTemperatureInKelvin: number;
  finalTemperatureUnit: TemperatureUnit;
  solvedVariable: GayLussacsLawVariable;
  formula: string;
  initialPressureTemperatureRatio: number;
  finalPressureTemperatureRatio: number;
};

const variableLabels: Record<
  GayLussacsLawVariable,
  string
> = {
  initialPressure: "Initial pressure",
  initialTemperature: "Initial temperature",
  finalPressure: "Final pressure",
  finalTemperature: "Final temperature",
};

function requireFiniteValue(
  value: number | undefined,
  variable: GayLussacsLawVariable,
): number {
  if (value === undefined || !Number.isFinite(value)) {
    throw new Error(
      `${variableLabels[variable]} must be a finite number.`,
    );
  }

  return value;
}

function requirePositivePressure(
  value: number | undefined,
  variable: "initialPressure" | "finalPressure",
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
  variable:
    | "initialTemperature"
    | "finalTemperature",
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

export function calculateGayLussacsLaw({
  initialPressure,
  initialPressureUnit,
  initialTemperature,
  initialTemperatureUnit,
  finalPressure,
  finalPressureUnit,
  finalTemperature,
  finalTemperatureUnit,
  solveFor,
}: GayLussacsLawInput): CalculationResult<GayLussacsLawDetails> {
  let initialPressureInPascals: number;
  let initialTemperatureInKelvin: number;
  let finalPressureInPascals: number;
  let finalTemperatureInKelvin: number;
  let formula: string;

  switch (solveFor) {
    case "initialPressure": {
      initialTemperatureInKelvin =
        convertRequiredTemperatureToKelvin(
          initialTemperature,
          "initialTemperature",
          initialTemperatureUnit,
        );
      finalPressureInPascals =
        convertPressureToPascals(
          requirePositivePressure(
            finalPressure,
            "finalPressure",
          ),
          finalPressureUnit,
        );
      finalTemperatureInKelvin =
        convertRequiredTemperatureToKelvin(
          finalTemperature,
          "finalTemperature",
          finalTemperatureUnit,
        );
      initialPressureInPascals =
        (finalPressureInPascals *
          initialTemperatureInKelvin) /
        finalTemperatureInKelvin;
      formula = "P₁ = P₂T₁ ÷ T₂";
      break;
    }

    case "initialTemperature": {
      initialPressureInPascals =
        convertPressureToPascals(
          requirePositivePressure(
            initialPressure,
            "initialPressure",
          ),
          initialPressureUnit,
        );
      finalPressureInPascals =
        convertPressureToPascals(
          requirePositivePressure(
            finalPressure,
            "finalPressure",
          ),
          finalPressureUnit,
        );
      finalTemperatureInKelvin =
        convertRequiredTemperatureToKelvin(
          finalTemperature,
          "finalTemperature",
          finalTemperatureUnit,
        );
      initialTemperatureInKelvin =
        (initialPressureInPascals *
          finalTemperatureInKelvin) /
        finalPressureInPascals;
      formula = "T₁ = P₁T₂ ÷ P₂";
      break;
    }

    case "finalPressure": {
      initialPressureInPascals =
        convertPressureToPascals(
          requirePositivePressure(
            initialPressure,
            "initialPressure",
          ),
          initialPressureUnit,
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
      finalPressureInPascals =
        (initialPressureInPascals *
          finalTemperatureInKelvin) /
        initialTemperatureInKelvin;
      formula = "P₂ = P₁T₂ ÷ T₁";
      break;
    }

    case "finalTemperature": {
      initialPressureInPascals =
        convertPressureToPascals(
          requirePositivePressure(
            initialPressure,
            "initialPressure",
          ),
          initialPressureUnit,
        );
      initialTemperatureInKelvin =
        convertRequiredTemperatureToKelvin(
          initialTemperature,
          "initialTemperature",
          initialTemperatureUnit,
        );
      finalPressureInPascals =
        convertPressureToPascals(
          requirePositivePressure(
            finalPressure,
            "finalPressure",
          ),
          finalPressureUnit,
        );
      finalTemperatureInKelvin =
        (finalPressureInPascals *
          initialTemperatureInKelvin) /
        initialPressureInPascals;
      formula = "T₂ = P₂T₁ ÷ P₁";
      break;
    }
  }

  const calculatedInitialPressure =
    convertPascalsToPressure(
      initialPressureInPascals,
      initialPressureUnit,
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
  const calculatedFinalTemperature =
    convertKelvinToTemperature(
      finalTemperatureInKelvin,
      finalTemperatureUnit,
    );

  const solvedValue = {
    initialPressure: calculatedInitialPressure,
    initialTemperature: calculatedInitialTemperature,
    finalPressure: calculatedFinalPressure,
    finalTemperature: calculatedFinalTemperature,
  }[solveFor];

  const solvedUnit = {
    initialPressure: initialPressureUnit,
    initialTemperature: displayTemperatureUnit(
      initialTemperatureUnit,
    ),
    finalPressure: finalPressureUnit,
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
      initialTemperature: calculatedInitialTemperature,
      initialTemperatureInKelvin,
      initialTemperatureUnit,
      finalPressure: calculatedFinalPressure,
      finalPressureInPascals,
      finalPressureUnit,
      finalTemperature: calculatedFinalTemperature,
      finalTemperatureInKelvin,
      finalTemperatureUnit,
      solvedVariable: solveFor,
      formula,
      initialPressureTemperatureRatio:
        initialPressureInPascals /
        initialTemperatureInKelvin,
      finalPressureTemperatureRatio:
        finalPressureInPascals /
        finalTemperatureInKelvin,
    },
  };
}
