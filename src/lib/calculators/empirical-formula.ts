import type { CalculationResult } from "@/types/calculator";

import {
  atomicMasses,
  type ElementSymbol,
} from "../chemistry/atomic-masses";
import { formatCalculatedNumber } from "./number-format";

export type EmpiricalFormulaBasis = "mass" | "percentage";

export type EmpiricalFormulaElementInput = {
  symbol: ElementSymbol;
  amount: number;
};

export type EmpiricalFormulaElementResult = {
  symbol: ElementSymbol;
  amount: number;
  atomicMass: number;
  moles: number;
  normalizedRatio: number;
  subscript: number;
};

export type EmpiricalFormulaInput = {
  basis: EmpiricalFormulaBasis;
  elements: EmpiricalFormulaElementInput[];
};

export type EmpiricalFormulaDetails = {
  basis: EmpiricalFormulaBasis;
  empiricalFormula: string;
  multiplier: number;
  molarMass: number;
  elements: EmpiricalFormulaElementResult[];
  formula: string;
};

const maximumElements = 12;
const maximumMultiplier = 12;
const ratioTolerance = 0.05;

function isElementSymbol(value: string): value is ElementSymbol {
  return Object.prototype.hasOwnProperty.call(
    atomicMasses,
    value,
  );
}

function validateAmount(value: number, label: string): number {
  if (!Number.isFinite(value)) {
    throw new Error(`${label} must be a finite number.`);
  }

  if (value <= 0) {
    throw new Error(`${label} must be greater than zero.`);
  }

  return value;
}

function findWholeNumberMultiplier(
  ratios: number[],
): number {
  for (
    let multiplier = 1;
    multiplier <= maximumMultiplier;
    multiplier += 1
  ) {
    const producesWholeNumbers = ratios.every((ratio) => {
      const scaledRatio = ratio * multiplier;

      return (
        Math.abs(scaledRatio - Math.round(scaledRatio)) <=
        ratioTolerance
      );
    });

    if (producesWholeNumbers) {
      return multiplier;
    }
  }

  throw new Error(
    "The element ratios could not be converted to small whole numbers. Check the entered composition values.",
  );
}

function formatFormula(
  elements: Array<{
    symbol: ElementSymbol;
    subscript: number;
  }>,
): string {
  return elements
    .map(({ symbol, subscript }) =>
      subscript === 1
        ? symbol
        : `${symbol}${subscript}`,
    )
    .join("");
}

export function calculateEmpiricalFormula({
  basis,
  elements,
}: EmpiricalFormulaInput): CalculationResult<EmpiricalFormulaDetails> {
  if (basis !== "mass" && basis !== "percentage") {
    throw new Error(
      "Composition basis must be mass or percentage.",
    );
  }

  if (!Array.isArray(elements) || elements.length < 2) {
    throw new Error(
      "Enter at least two elements to calculate an empirical formula.",
    );
  }

  if (elements.length > maximumElements) {
    throw new Error(
      `Enter no more than ${maximumElements} elements.`,
    );
  }

  const seenSymbols = new Set<ElementSymbol>();

  const moleEntries = elements.map((element, index) => {
    const label = `Element ${index + 1}`;

    if (!isElementSymbol(element.symbol)) {
      throw new Error(
        `${label} has an unknown chemical element symbol.`,
      );
    }

    if (seenSymbols.has(element.symbol)) {
      throw new Error(
        `Element ${element.symbol} cannot be entered more than once.`,
      );
    }

    seenSymbols.add(element.symbol);

    const amount = validateAmount(
      element.amount,
      `${label} amount`,
    );
    const atomicMass = atomicMasses[element.symbol];
    const moles = amount / atomicMass;

    return {
      symbol: element.symbol,
      amount,
      atomicMass,
      moles,
    };
  });

  if (basis === "percentage") {
    const percentageTotal = moleEntries.reduce(
      (total, element) => total + element.amount,
      0,
    );

    if (Math.abs(percentageTotal - 100) > 0.5) {
      throw new Error(
        "Percentage composition must total approximately 100%.",
      );
    }
  }

  const smallestMoleAmount = Math.min(
    ...moleEntries.map((element) => element.moles),
  );

  if (
    !Number.isFinite(smallestMoleAmount) ||
    smallestMoleAmount <= 0
  ) {
    throw new Error(
      "The empirical formula calculation could not be completed.",
    );
  }

  const normalizedRatios = moleEntries.map(
    (element) => element.moles / smallestMoleAmount,
  );

  const multiplier = findWholeNumberMultiplier(
    normalizedRatios,
  );

  const calculatedElements = moleEntries.map(
    (element, index) => {
      const subscript = Math.round(
        normalizedRatios[index] * multiplier,
      );

      if (!Number.isSafeInteger(subscript) || subscript <= 0) {
        throw new Error(
          "The empirical formula produced an invalid element subscript.",
        );
      }

      return {
        ...element,
        normalizedRatio: normalizedRatios[index],
        subscript,
      };
    },
  );

  const empiricalFormula = formatFormula(calculatedElements);
  const molarMass = calculatedElements.reduce(
    (total, element) =>
      total + element.atomicMass * element.subscript,
    0,
  );

  if (!Number.isFinite(molarMass) || molarMass <= 0) {
    throw new Error(
      "The empirical formula molar mass could not be calculated.",
    );
  }

  return {
    value: molarMass,
    formattedValue: formatCalculatedNumber(molarMass, 6),
    details: {
      basis,
      empiricalFormula,
      multiplier,
      molarMass,
      elements: calculatedElements,
      formula:
        "moles = amount ÷ atomic mass; ratio = moles ÷ smallest mole value",
    },
  };
}
