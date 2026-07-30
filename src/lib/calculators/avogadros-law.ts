import type { CalculationResult } from "@/types/calculator";

import {
  convertCubicMetersToVolume,
  convertVolumeToCubicMeters,
  type GasVolumeUnit,
} from "./ideal-gas-law";
import { formatCalculatedNumber } from "./number-format";

export type AmountUnit = "mol" | "mmol";

export type AvogadrosLawVariable =
  | "initialVolume"
  | "initialAmount"
  | "finalVolume"
  | "finalAmount";

export type AvogadrosLawInput = {
  initialVolume?: number;
  initialVolumeUnit: GasVolumeUnit;
  initialAmount?: number;
  initialAmountUnit: AmountUnit;
  finalVolume?: number;
  finalVolumeUnit: GasVolumeUnit;
  finalAmount?: number;
  finalAmountUnit: AmountUnit;
  solveFor: AvogadrosLawVariable;
};

export type AvogadrosLawDetails = {
  initialVolume: number;
  initialVolumeInCubicMeters: number;
  initialVolumeUnit: GasVolumeUnit;
  initialAmount: number;
  initialAmountInMoles: number;
  initialAmountUnit: AmountUnit;
  finalVolume: number;
  finalVolumeInCubicMeters: number;
  finalVolumeUnit: GasVolumeUnit;
  finalAmount: number;
  finalAmountInMoles: number;
  finalAmountUnit: AmountUnit;
  solvedVariable: AvogadrosLawVariable;
  formula: string;
  initialVolumeAmountRatio: number;
  finalVolumeAmountRatio: number;
};

const amountToMoles: Record<AmountUnit, number> = {
  mol: 1,
  mmol: 0.001,
};

const variableLabels: Record<AvogadrosLawVariable, string> = {
  initialVolume: "Initial volume",
  initialAmount: "Initial amount",
  finalVolume: "Final volume",
  finalAmount: "Final amount",
};

function requirePositiveValue(
  value: number | undefined,
  variable: AvogadrosLawVariable,
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

export function convertAmountToMoles(
  amount: number,
  unit: AmountUnit,
): number {
  return amount * amountToMoles[unit];
}

export function convertMolesToAmount(
  amountInMoles: number,
  unit: AmountUnit,
): number {
  return amountInMoles / amountToMoles[unit];
}

function displayVolumeUnit(unit: GasVolumeUnit): string {
  return unit === "m3" ? "m³" : unit;
}

export function calculateAvogadrosLaw({
  initialVolume,
  initialVolumeUnit,
  initialAmount,
  initialAmountUnit,
  finalVolume,
  finalVolumeUnit,
  finalAmount,
  finalAmountUnit,
  solveFor,
}: AvogadrosLawInput): CalculationResult<AvogadrosLawDetails> {
  let initialVolumeInCubicMeters: number;
  let initialAmountInMoles: number;
  let finalVolumeInCubicMeters: number;
  let finalAmountInMoles: number;
  let formula: string;

  switch (solveFor) {
    case "initialVolume": {
      initialAmountInMoles = convertAmountToMoles(
        requirePositiveValue(initialAmount, "initialAmount"),
        initialAmountUnit,
      );
      finalVolumeInCubicMeters = convertVolumeToCubicMeters(
        requirePositiveValue(finalVolume, "finalVolume"),
        finalVolumeUnit,
      );
      finalAmountInMoles = convertAmountToMoles(
        requirePositiveValue(finalAmount, "finalAmount"),
        finalAmountUnit,
      );
      initialVolumeInCubicMeters =
        (finalVolumeInCubicMeters * initialAmountInMoles) /
        finalAmountInMoles;
      formula = "V₁ = V₂n₁ ÷ n₂";
      break;
    }

    case "initialAmount": {
      initialVolumeInCubicMeters = convertVolumeToCubicMeters(
        requirePositiveValue(initialVolume, "initialVolume"),
        initialVolumeUnit,
      );
      finalVolumeInCubicMeters = convertVolumeToCubicMeters(
        requirePositiveValue(finalVolume, "finalVolume"),
        finalVolumeUnit,
      );
      finalAmountInMoles = convertAmountToMoles(
        requirePositiveValue(finalAmount, "finalAmount"),
        finalAmountUnit,
      );
      initialAmountInMoles =
        (initialVolumeInCubicMeters * finalAmountInMoles) /
        finalVolumeInCubicMeters;
      formula = "n₁ = V₁n₂ ÷ V₂";
      break;
    }

    case "finalVolume": {
      initialVolumeInCubicMeters = convertVolumeToCubicMeters(
        requirePositiveValue(initialVolume, "initialVolume"),
        initialVolumeUnit,
      );
      initialAmountInMoles = convertAmountToMoles(
        requirePositiveValue(initialAmount, "initialAmount"),
        initialAmountUnit,
      );
      finalAmountInMoles = convertAmountToMoles(
        requirePositiveValue(finalAmount, "finalAmount"),
        finalAmountUnit,
      );
      finalVolumeInCubicMeters =
        (initialVolumeInCubicMeters * finalAmountInMoles) /
        initialAmountInMoles;
      formula = "V₂ = V₁n₂ ÷ n₁";
      break;
    }

    case "finalAmount": {
      initialVolumeInCubicMeters = convertVolumeToCubicMeters(
        requirePositiveValue(initialVolume, "initialVolume"),
        initialVolumeUnit,
      );
      initialAmountInMoles = convertAmountToMoles(
        requirePositiveValue(initialAmount, "initialAmount"),
        initialAmountUnit,
      );
      finalVolumeInCubicMeters = convertVolumeToCubicMeters(
        requirePositiveValue(finalVolume, "finalVolume"),
        finalVolumeUnit,
      );
      finalAmountInMoles =
        (finalVolumeInCubicMeters * initialAmountInMoles) /
        initialVolumeInCubicMeters;
      formula = "n₂ = V₂n₁ ÷ V₁";
      break;
    }
  }

  const calculatedInitialVolume = convertCubicMetersToVolume(
    initialVolumeInCubicMeters,
    initialVolumeUnit,
  );
  const calculatedInitialAmount = convertMolesToAmount(
    initialAmountInMoles,
    initialAmountUnit,
  );
  const calculatedFinalVolume = convertCubicMetersToVolume(
    finalVolumeInCubicMeters,
    finalVolumeUnit,
  );
  const calculatedFinalAmount = convertMolesToAmount(
    finalAmountInMoles,
    finalAmountUnit,
  );

  const solvedValue = {
    initialVolume: calculatedInitialVolume,
    initialAmount: calculatedInitialAmount,
    finalVolume: calculatedFinalVolume,
    finalAmount: calculatedFinalAmount,
  }[solveFor];

  const solvedUnit = {
    initialVolume: displayVolumeUnit(initialVolumeUnit),
    initialAmount: initialAmountUnit,
    finalVolume: displayVolumeUnit(finalVolumeUnit),
    finalAmount: finalAmountUnit,
  }[solveFor];

  return {
    value: solvedValue,
    formattedValue:
      `${formatCalculatedNumber(solvedValue)} ${solvedUnit}`,
    details: {
      initialVolume: calculatedInitialVolume,
      initialVolumeInCubicMeters,
      initialVolumeUnit,
      initialAmount: calculatedInitialAmount,
      initialAmountInMoles,
      initialAmountUnit,
      finalVolume: calculatedFinalVolume,
      finalVolumeInCubicMeters,
      finalVolumeUnit,
      finalAmount: calculatedFinalAmount,
      finalAmountInMoles,
      finalAmountUnit,
      solvedVariable: solveFor,
      formula,
      initialVolumeAmountRatio:
        initialVolumeInCubicMeters / initialAmountInMoles,
      finalVolumeAmountRatio:
        finalVolumeInCubicMeters / finalAmountInMoles,
    },
  };
}
