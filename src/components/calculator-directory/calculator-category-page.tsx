import { CalculatorCard } from "./calculator-card";
import { Container } from "@/components/ui/container";
import type { CalculatorCategory } from "@/content/calculators/categories";
import type { CalculatorDefinition } from "@/content/calculators/registry";

type CalculatorCategoryPageProps = {
  category: CalculatorCategory;
  calculators: readonly CalculatorDefinition[];
};

export function CalculatorCategoryPage({
  category,
  calculators,
}: CalculatorCategoryPageProps) {
  return (
    <main>
      <section className="directory-hero">
        <Container>
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <ol>
              <li>
                <a href="/calculators">Calculators</a>
              </li>
              <li aria-current="page">
                {category.name}
              </li>
            </ol>
          </nav>

          <div className="directory-hero__content">
            <p className="eyebrow">
              Science calculator collection
            </p>

            <h1>{category.name}</h1>

            <p>{category.description}</p>
          </div>
        </Container>
      </section>

      <section className="directory-section">
        <Container>
          <div className="section-heading">
            <p className="eyebrow">
              Available calculators
            </p>

            <h2>
              {calculators.length} {category.category} calculators
            </h2>
          </div>

          <div className="calculator-directory-grid">
            {calculators.map((calculator) => (
              <CalculatorCard
                key={calculator.slug}
                calculator={calculator}
              />
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
