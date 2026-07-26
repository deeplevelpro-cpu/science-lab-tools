import type { CalculationResult } from "@/types/calculator";

import {
  convertPascalsToPressure,
  convertPressureToPascals,
  type PressureUnit,
} from "./ideal-gas-law";

export type DaltonLawVariable =
  | "totalPressure"
  | "missingPartialPressure";

export type DaltonPressure = {
  value: number;
  unit: PressureUnit;
};

export type DaltonsLawInput = {
  partialPressures: DaltonPressure[];
  totalPressure?: number;
  totalPressureUnit: PressureUnit;
  outputUnit: PressureUnit;
  solveFor: DaltonLawVariable;
};

export type DaltonsLawDetails = {
  partialPressuresInPascals: number[];
  knownPartialPressureTotalInPascals: number;
  totalPressureInPascals: number;
  missingPartialPressureInPascals?: number;
  solvedVariable: DaltonLawVariable;
  outputUnit: PressureUnit;
  componentCount: number;
  formula: string;
};

function requirePositivePressure(
  pressure: DaltonPressure,
  index: number,
): number {
  if (!Number.isFinite(pressure.value)) {
    throw new Error(
      `Partial pressure ${index + 1} must be a finite number.`,
    );
  }

  if (pressure.value <= 0) {
    throw new Error(
      `Partial pressure ${index + 1} must be greater than zero.`,
    );
  }

  return convertPressureToPascals(
    pressure.value,
    pressure.unit,
  );
}

function requirePositiveTotalPressure(
  value: number | undefined,
): number {
  if (value === undefined || !Number.isFinite(value)) {
    throw new Error(
      "Total pressure must be a finite number.",
    );
  }

  if (value <= 0) {
    throw new Error(
      "Total pressure must be greater than zero.",
    );
  }

  return value;
}

function formatCalculatedNumber(value: number): string {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 8,
  }).format(value);
}

export function calculateDaltonsLaw(
  input: DaltonsLawInput,
): CalculationResult<DaltonsLawDetails> {
  const {
    partialPressures,
    totalPressure,
    totalPressureUnit,
    outputUnit,
    solveFor,
  } = input;

  if (!Array.isArray(partialPressures)) {
    throw new Error(
      "Partial pressures must be provided as a list.",
    );
  }

  const minimumComponents =
    solveFor === "totalPressure" ? 2 : 1;

  if (partialPressures.length < minimumComponents) {
    throw new Error(
      solveFor === "totalPressure"
        ? "Enter at least two partial pressures."
        : "Enter at least one known partial pressure.",
    );
  }

  const partialPressuresInPascals =
    partialPressures.map(requirePositivePressure);

  const knownPartialPressureTotalInPascals =
    partialPressuresInPascals.reduce(
      (total, pressure) => total + pressure,
      0,
    );

  let totalPressureInPascals: number;
  let missingPartialPressureInPascals:
    | number
    | undefined;
  let solvedValueInPascals: number;
  let formula: string;

  if (solveFor === "totalPressure") {
    totalPressureInPascals =
      knownPartialPressureTotalInPascals;
    solvedValueInPascals = totalPressureInPascals;
    formula = "P_total = P₁ + P₂ + ⋯ + Pₙ";
  } else {
    totalPressureInPascals =
      convertPressureToPascals(
        requirePositiveTotalPressure(totalPressure),
        totalPressureUnit,
      );

    missingPartialPressureInPascals =
      totalPressureInPascals -
      knownPartialPressureTotalInPascals;

    if (missingPartialPressureInPascals <= 0) {
      throw new Error(
        "Total pressure must be greater than the sum of the known partial pressures.",
      );
    }

    solvedValueInPascals =
      missingPartialPressureInPascals;
    formula =
      "P_missing = P_total - (P₁ + P₂ + ⋯ + Pₙ)";
  }

  const solvedValue = convertPascalsToPressure(
    solvedValueInPascals,
    outputUnit,
  );

  return {
    value: solvedValue,
    formattedValue:
      `${formatCalculatedNumber(solvedValue)} ${outputUnit}`,
    details: {
      partialPressuresInPascals,
      knownPartialPressureTotalInPascals,
      totalPressureInPascals,
      missingPartialPressureInPascals,
      solvedVariable: solveFor,
      outputUnit,
      componentCount:
        solveFor === "totalPressure"
          ? partialPressures.length
          : partialPressures.length + 1,
      formula,
    },
  };
}
