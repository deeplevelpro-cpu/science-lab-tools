import type { CalculationResult } from "@/types/calculator";

import { formatCalculatedNumber } from "./number-format";

export type MolalityVariable =
  | "molality"
  | "soluteMoles"
  | "solventMass";

export type SoluteAmountUnit = "mol" | "mmol";
export type SolventMassUnit = "kg" | "g" | "mg";

export type MolalityInput = {
  solveFor: MolalityVariable;
  molality?: number;
  soluteMoles?: number;
  solventMass?: number;
  soluteAmountUnit: SoluteAmountUnit;
  solventMassUnit: SolventMassUnit;
};

export type MolalityDetails = {
  solveFor: MolalityVariable;
  molality: number;
  soluteMoles: number;
  solventMassInKilograms: number;
  soluteAmountUnit: SoluteAmountUnit;
  solventMassUnit: SolventMassUnit;
  formula: string;
};

function requirePositiveFinite(
  value: number | undefined,
  label: string,
): number {
  if (value === undefined) {
    throw new Error(`${label} is required.`);
  }

  if (!Number.isFinite(value)) {
    throw new Error(`${label} must be a finite number.`);
  }

  if (value <= 0) {
    throw new Error(`${label} must be greater than zero.`);
  }

  return value;
}

function requireSolvedVariableOmitted(
  value: number | undefined,
  label: string,
): void {
  if (value !== undefined) {
    throw new Error(
      `${label} must be omitted when solving for it.`,
    );
  }
}

export function convertSoluteAmountToMoles(
  amount: number,
  unit: SoluteAmountUnit,
): number {
  const positiveAmount = requirePositiveFinite(
    amount,
    "Solute amount",
  );

  if (unit === "mol") {
    return positiveAmount;
  }

  if (unit === "mmol") {
    return positiveAmount / 1000;
  }

  throw new Error("Unsupported solute amount unit.");
}

export function convertSolventMassToKilograms(
  mass: number,
  unit: SolventMassUnit,
): number {
  const positiveMass = requirePositiveFinite(
    mass,
    "Solvent mass",
  );

  if (unit === "kg") {
    return positiveMass;
  }

  if (unit === "g") {
    return positiveMass / 1000;
  }

  if (unit === "mg") {
    return positiveMass / 1_000_000;
  }

  throw new Error("Unsupported solvent mass unit.");
}

export function calculateMolality({
  solveFor,
  molality,
  soluteMoles,
  solventMass,
  soluteAmountUnit,
  solventMassUnit,
}: MolalityInput): CalculationResult<MolalityDetails> {
  let calculatedMolality: number;
  let calculatedSoluteMoles: number;
  let solventMassInKilograms: number;
  let value: number;
  let formattedValue: string;
  let formula: string;

  if (solveFor === "molality") {
    requireSolvedVariableOmitted(molality, "Molality");

    calculatedSoluteMoles = convertSoluteAmountToMoles(
      requirePositiveFinite(soluteMoles, "Solute amount"),
      soluteAmountUnit,
    );
    solventMassInKilograms =
      convertSolventMassToKilograms(
        requirePositiveFinite(solventMass, "Solvent mass"),
        solventMassUnit,
      );
    calculatedMolality =
      calculatedSoluteMoles / solventMassInKilograms;
    value = calculatedMolality;
    formattedValue = `${formatCalculatedNumber(value)} mol/kg`;
    formula = "m = n ÷ kg solvent";
  } else if (solveFor === "soluteMoles") {
    requireSolvedVariableOmitted(
      soluteMoles,
      "Solute amount",
    );

    calculatedMolality = requirePositiveFinite(
      molality,
      "Molality",
    );
    solventMassInKilograms =
      convertSolventMassToKilograms(
        requirePositiveFinite(solventMass, "Solvent mass"),
        solventMassUnit,
      );
    calculatedSoluteMoles =
      calculatedMolality * solventMassInKilograms;
    value = calculatedSoluteMoles;
    formattedValue = `${formatCalculatedNumber(value)} mol`;
    formula = "n = m × kg solvent";
  } else if (solveFor === "solventMass") {
    requireSolvedVariableOmitted(
      solventMass,
      "Solvent mass",
    );

    calculatedMolality = requirePositiveFinite(
      molality,
      "Molality",
    );
    calculatedSoluteMoles = convertSoluteAmountToMoles(
      requirePositiveFinite(soluteMoles, "Solute amount"),
      soluteAmountUnit,
    );
    solventMassInKilograms =
      calculatedSoluteMoles / calculatedMolality;
    value = solventMassInKilograms;
    formattedValue = `${formatCalculatedNumber(value)} kg`;
    formula = "kg solvent = n ÷ m";
  } else {
    throw new Error("Unsupported variable to solve.");
  }

  return {
    value,
    formattedValue,
    details: {
      solveFor,
      molality: calculatedMolality,
      soluteMoles: calculatedSoluteMoles,
      solventMassInKilograms,
      soluteAmountUnit,
      solventMassUnit,
      formula,
    },
  };
}
