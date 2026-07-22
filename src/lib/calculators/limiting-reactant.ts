import type { CalculationResult } from "@/types/calculator";

import { formatCalculatedNumber } from "./number-format";

export type LimitingReactantUnit = "moles" | "grams";

export type LimitingReactantSubstance = {
  name: string;
  amount: number;
  unit: LimitingReactantUnit;
  coefficient: number;
  molarMass?: number;
};

export type LimitingReactantInput = {
  reactantA: LimitingReactantSubstance;
  reactantB: LimitingReactantSubstance;
  productCoefficient: number;
  productUnit: LimitingReactantUnit;
  productMolarMass?: number;
};

export type LimitingReactantIdentity =
  | "reactantA"
  | "reactantB"
  | "neither";

export type LimitingReactantDetails = {
  reactantAMoles: number;
  reactantBMoles: number;
  reactantAReactionExtent: number;
  reactantBReactionExtent: number;
  reactionExtent: number;
  limitingReactant: LimitingReactantIdentity;
  limitingReactantName: string;
  excessReactant: LimitingReactantIdentity;
  excessReactantName: string;
  excessMolesRemaining: number;
  productMoles: number;
  productAmount: number;
  productUnit: LimitingReactantUnit;
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

function requireName(value: string, label: string): string {
  const name = value.trim();

  if (name.length === 0) {
    throw new Error(`${label} is required.`);
  }

  return name;
}

function convertToMoles(
  substance: LimitingReactantSubstance,
  label: string,
): number {
  const amount = requirePositiveNumber(
    substance.amount,
    `${label} amount`,
  );

  if (substance.unit === "moles") {
    return amount;
  }

  const molarMass = requirePositiveNumber(
    substance.molarMass,
    `${label} molar mass`,
  );

  return amount / molarMass;
}

export function calculateLimitingReactant({
  reactantA,
  reactantB,
  productCoefficient,
  productUnit,
  productMolarMass,
}: LimitingReactantInput): CalculationResult<LimitingReactantDetails> {
  const reactantAName = requireName(
    reactantA.name,
    "Reactant A name",
  );
  const reactantBName = requireName(
    reactantB.name,
    "Reactant B name",
  );

  const reactantACoefficient = requirePositiveNumber(
    reactantA.coefficient,
    "Reactant A coefficient",
  );
  const reactantBCoefficient = requirePositiveNumber(
    reactantB.coefficient,
    "Reactant B coefficient",
  );
  const validatedProductCoefficient = requirePositiveNumber(
    productCoefficient,
    "Product coefficient",
  );

  const reactantAMoles = convertToMoles(
    reactantA,
    "Reactant A",
  );
  const reactantBMoles = convertToMoles(
    reactantB,
    "Reactant B",
  );

  const reactantAReactionExtent =
    reactantAMoles / reactantACoefficient;
  const reactantBReactionExtent =
    reactantBMoles / reactantBCoefficient;

  const tolerance =
    Number.EPSILON *
    Math.max(
      1,
      Math.abs(reactantAReactionExtent),
      Math.abs(reactantBReactionExtent),
    ) *
    16;

  const isStoichiometric =
    Math.abs(
      reactantAReactionExtent - reactantBReactionExtent,
    ) <= tolerance;

  let limitingReactant: LimitingReactantIdentity;
  let limitingReactantName: string;
  let excessReactant: LimitingReactantIdentity;
  let excessReactantName: string;
  let reactionExtent: number;
  let excessMolesRemaining: number;

  if (isStoichiometric) {
    limitingReactant = "neither";
    limitingReactantName = "Neither (stoichiometric amounts)";
    excessReactant = "neither";
    excessReactantName = "None";
    reactionExtent = Math.min(
      reactantAReactionExtent,
      reactantBReactionExtent,
    );
    excessMolesRemaining = 0;
  } else if (
    reactantAReactionExtent < reactantBReactionExtent
  ) {
    limitingReactant = "reactantA";
    limitingReactantName = reactantAName;
    excessReactant = "reactantB";
    excessReactantName = reactantBName;
    reactionExtent = reactantAReactionExtent;
    excessMolesRemaining =
      reactantBMoles -
      reactionExtent * reactantBCoefficient;
  } else {
    limitingReactant = "reactantB";
    limitingReactantName = reactantBName;
    excessReactant = "reactantA";
    excessReactantName = reactantAName;
    reactionExtent = reactantBReactionExtent;
    excessMolesRemaining =
      reactantAMoles -
      reactionExtent * reactantACoefficient;
  }

  const productMoles =
    reactionExtent * validatedProductCoefficient;

  const productAmount =
    productUnit === "grams"
      ? productMoles *
        requirePositiveNumber(
          productMolarMass,
          "Product molar mass",
        )
      : productMoles;

  if (
    !Number.isFinite(reactionExtent) ||
    !Number.isFinite(excessMolesRemaining) ||
    !Number.isFinite(productMoles) ||
    !Number.isFinite(productAmount)
  ) {
    throw new Error(
      "The limiting-reactant calculation could not be completed.",
    );
  }

  const normalizedExcessMoles =
    Math.abs(excessMolesRemaining) <= tolerance
      ? 0
      : excessMolesRemaining;

  return {
    value: productAmount,
    formattedValue: formatCalculatedNumber(productAmount),
    details: {
      reactantAMoles,
      reactantBMoles,
      reactantAReactionExtent,
      reactantBReactionExtent,
      reactionExtent,
      limitingReactant,
      limitingReactantName,
      excessReactant,
      excessReactantName,
      excessMolesRemaining: normalizedExcessMoles,
      productMoles,
      productAmount,
      productUnit,
      formula:
        "reaction extent = available moles ÷ coefficient; product moles = smallest reaction extent × product coefficient",
    },
  };
}
