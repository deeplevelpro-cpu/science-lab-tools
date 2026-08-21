import Link from "next/link";

import type { CalculatorDefinition } from "@/content/calculators/registry";

type CalculatorCardProps = {
  calculator: CalculatorDefinition;
};

export function CalculatorCard({
  calculator,
}: CalculatorCardProps) {
  return (
    <article className="calculator-directory-card">
      <div className="calculator-directory-card__top">
        <span>{calculator.category}</span>
        <span className="published-badge">
          Published
        </span>
      </div>

      <h3>
        <Link href={calculator.href}>
          {calculator.name}
        </Link>
      </h3>

      <p>{calculator.shortDescription}</p>

      <Link
        className="calculator-directory-card__link"
        href={calculator.href}
      >
        Open calculator
        <span aria-hidden="true">→</span>
      </Link>
    </article>
  );
}
