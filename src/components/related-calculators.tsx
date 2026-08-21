
import Link from "next/link";

import type { CalculatorDefinition } from "@/content/calculators/registry";

type RelatedCalculatorsProps = {
  calculators: readonly CalculatorDefinition[];
};

export function RelatedCalculators({
  calculators,
}: RelatedCalculatorsProps) {

  if (!calculators.length) {
    return null;
  }

  return (
    <section
      className="article-section"
      aria-labelledby="related-calculators-heading"
    >
      <p className="eyebrow">
        Related science tools
      </p>

      <h2 id="related-calculators-heading">
        Continue with these calculators
      </h2>

      <div className="calculator-directory-grid">
        {calculators.map((calculator) => (
          <article
            key={calculator.slug}
            className="calculator-directory-card"
          >
            <div className="calculator-directory-card__top">
              <span>
                {calculator.category}
              </span>
            </div>

            <h3>
              <Link href={calculator.href}>
                {calculator.name}
              </Link>
            </h3>

            <p>
              {calculator.shortDescription}
            </p>

            <Link
              className="calculator-directory-card__link"
              href={calculator.href}
            >
              Open calculator
              <span aria-hidden="true">
                →
              </span>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
