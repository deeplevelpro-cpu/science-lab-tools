import type { CalculationResult } from "@/types/calculator";

import { formatCalculatedNumber } from "./number-format";

export type PercentYieldInput = {
  actualYield: number;
  theoreticalYield: number;
};

export type PercentYieldDetails = {
  actualYield: number;
  theoreticalYield: number;
  yieldDifference: number;
  efficiencyRatio: number;
  formula: string;
};

export function calculatePercentYield({
  actualYield,
  theoreticalYield,
}: PercentYieldInput): CalculationResult<PercentYieldDetails> {
  if (!Number.isFinite(actualYield)) {
    throw new Error("Actual yield must be a finite number.");
  }

  if (!Number.isFinite(theoreticalYield)) {
    throw new Error(
      "Theoretical yield must be a finite number.",
    );
  }

  if (actualYield < 0) {
    throw new Error("Actual yield cannot be negative.");
  }

  if (theoreticalYield <= 0) {
    throw new Error(
      "Theoretical yield must be greater than zero.",
    );
  }

  const efficiencyRatio = actualYield / theoreticalYield;
  const percentYield = efficiencyRatio * 100;
  const yieldDifference = theoreticalYield - actualYield;

  return {
    value: percentYield,
    formattedValue: `${formatCalculatedNumber(percentYield)}%`,
    details: {
      actualYield,
      theoreticalYield,
      yieldDifference,
      efficiencyRatio,
      formula: "actual yield ÷ theoretical yield × 100",
    },
  };
}
