import type { CalculatorDefinition } from "./registry";

export function getCategoryCalculators(
  calculators: readonly CalculatorDefinition[],
  category: CalculatorDefinition["category"],
) {
  return calculators.filter(
    (calculator) => calculator.category === category,
  );
}
