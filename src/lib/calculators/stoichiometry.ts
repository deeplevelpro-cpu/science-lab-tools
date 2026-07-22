import type { CalculationResult } from "@/types/calculator";

import { formatCalculatedNumber } from "./number-format";

export type StoichiometryUnit = "moles" | "grams";

export type StoichiometryInput = {
  knownAmount: number;
  knownUnit: StoichiometryUnit;
  knownCoefficient: number;
  targetCoefficient: number;
  knownMolarMass?: number;
  targetUnit: StoichiometryUnit;
  targetMolarMass?: number;
};

export type StoichiometryDetails = {
  knownMoles: number;
  targetMoles: number;
  targetAmount: number;
  knownUnit: StoichiometryUnit;
  targetUnit: StoichiometryUnit;
  moleRatio: number;
  formula: string;
};

function requirePositiveNumber(
  value: number | undefined,
  label: string,
): number {
  if (value === undefined || !Number.isFinite(value)) {
    throw new Error(`${label} must be a finite number.`);
  }

  if (value <= 0) {
    throw new Error(`${label} must be greater than zero.`);
  }

  return value;
}

export function calculateStoichiometry({
  knownAmount,
  knownUnit,
  knownCoefficient,
  targetCoefficient,
  knownMolarMass,
  targetUnit,
  targetMolarMass,
}: StoichiometryInput): CalculationResult<StoichiometryDetails> {
  const validatedKnownAmount = requirePositiveNumber(
    knownAmount,
    "Known amount",
  );

  const validatedKnownCoefficient = requirePositiveNumber(
    knownCoefficient,
    "Known substance coefficient",
  );

  const validatedTargetCoefficient = requirePositiveNumber(
    targetCoefficient,
    "Target substance coefficient",
  );

  const knownMoles =
    knownUnit === "grams"
      ? validatedKnownAmount /
        requirePositiveNumber(
          knownMolarMass,
          "Known substance molar mass",
        )
      : validatedKnownAmount;

  const moleRatio =
    validatedTargetCoefficient /
    validatedKnownCoefficient;

  const targetMoles = knownMoles * moleRatio;

  const targetAmount =
    targetUnit === "grams"
      ? targetMoles *
        requirePositiveNumber(
          targetMolarMass,
          "Target substance molar mass",
        )
      : targetMoles;

  if (
    !Number.isFinite(knownMoles) ||
    !Number.isFinite(targetMoles) ||
    !Number.isFinite(targetAmount)
  ) {
    throw new Error(
      "The stoichiometry calculation could not be completed.",
    );
  }

  return {
    value: targetAmount,
    formattedValue: formatCalculatedNumber(targetAmount),
    details: {
      knownMoles,
      targetMoles,
      targetAmount,
      knownUnit,
      targetUnit,
      moleRatio,
      formula:
        "target moles = known moles × (target coefficient ÷ known coefficient)",
    },
  };
}
