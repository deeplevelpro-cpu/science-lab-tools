
import type { CalculatorDefinition } from "./registry";

function keywordScore(
  a: readonly string[],
  b: readonly string[],
) {
  const first = new Set(a);

  return b.reduce(
    (score, keyword) =>
      first.has(keyword)
        ? score + 1
        : score,
    0,
  );
}

export function getRelatedCalculators(
  currentSlug: string,
  calculators: readonly CalculatorDefinition[],
  limit = 4,
) {
  const current = calculators.find(
    (calculator) =>
      calculator.slug === currentSlug,
  );

  if (!current) {
    return [];
  }

  return calculators
    .filter(
      (calculator) =>
        calculator.slug !== currentSlug,
    )
    .map((calculator) => ({
      calculator,
      score:
        (calculator.category === current.category
          ? 10
          : 0) +
        keywordScore(
          current.keywords,
          calculator.keywords,
        ),
    }))
    .sort(
      (a, b) =>
        b.score - a.score,
    )
    .slice(0, limit)
    .map(
      ({ calculator }) =>
        calculator,
    );
}
