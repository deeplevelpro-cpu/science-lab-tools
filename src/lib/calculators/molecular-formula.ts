import type { CalculationResult } from "@/types/calculator";

import {
  calculateMolecularWeight,
  type MolecularWeightElement,
} from "./molecular-weight";
import { formatCalculatedNumber } from "./number-format";

export type MolecularFormulaElement = {
  symbol: MolecularWeightElement["symbol"];
  empiricalCount: number;
  molecularCount: number;
};

export type MolecularFormulaDetails = {
  empiricalFormula: string;
  normalizedEmpiricalFormula: string;
  empiricalFormulaMass: number;
  targetMolarMass: number;
  multiplier: number;
  molecularFormula: string;
  calculatedMolarMass: number;
  percentDifference: number;
  elements: MolecularFormulaElement[];
  unit: "g/mol";
};

function validateTargetMolarMass(value: number): void {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new Error("Molar mass must be a finite number.");
  }

  if (value <= 0) {
    throw new Error("Molar mass must be greater than zero.");
  }
}

function orderElements(
  elements: MolecularWeightElement[],
): MolecularWeightElement[] {
  const hasCarbon = elements.some(
    (element) => element.symbol === "C",
  );

  return [...elements].sort((first, second) => {
    if (hasCarbon) {
      if (first.symbol === "C") return -1;
      if (second.symbol === "C") return 1;
      if (first.symbol === "H") return -1;
      if (second.symbol === "H") return 1;
    }

    return first.symbol.localeCompare(second.symbol);
  });
}

function formatFormula(
  elements: MolecularFormulaElement[],
): string {
  return elements
    .map(({ symbol, molecularCount }) =>
      molecularCount === 1
        ? symbol
        : `${symbol}${molecularCount}`,
    )
    .join("");
}

export function calculateMolecularFormula(
  empiricalFormula: string,
  targetMolarMass: number,
): CalculationResult<MolecularFormulaDetails> {
  validateTargetMolarMass(targetMolarMass);

  const empiricalResult =
    calculateMolecularWeight(empiricalFormula);
  const empiricalFormulaMass = empiricalResult.value;

  if (targetMolarMass < empiricalFormulaMass) {
    throw new Error(
      "Molar mass must be at least the empirical formula mass.",
    );
  }

  const rawMultiplier =
    targetMolarMass / empiricalFormulaMass;
  const multiplier = Math.round(rawMultiplier);

  if (!Number.isSafeInteger(multiplier)) {
    throw new Error(
      "Molar mass produces an unsupported molecular multiplier.",
    );
  }

  const multiplierDifference = Math.abs(
    rawMultiplier - multiplier,
  );

  if (multiplierDifference > 0.05) {
    throw new Error(
      "Molar mass must be a near-whole-number multiple of the empirical formula mass.",
    );
  }

  const elements = orderElements(
    empiricalResult.details.elements,
  ).map((element) => ({
    symbol: element.symbol,
    empiricalCount: element.count,
    molecularCount: element.count * multiplier,
  }));

  const molecularFormula = formatFormula(elements);
  const calculatedMolarMass =
    empiricalFormulaMass * multiplier;
  const percentDifference =
    (Math.abs(calculatedMolarMass - targetMolarMass) /
      targetMolarMass) *
    100;

  return {
    value: multiplier,
    formattedValue: formatCalculatedNumber(
      multiplier,
      0,
    ),
    details: {
      empiricalFormula,
      normalizedEmpiricalFormula:
        empiricalResult.details.normalizedFormula,
      empiricalFormulaMass,
      targetMolarMass,
      multiplier,
      molecularFormula,
      calculatedMolarMass,
      percentDifference,
      elements,
      unit: "g/mol",
    },
  };
}
