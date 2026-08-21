import type { Metadata } from "next";

import { RelatedCalculators } from "@/components/related-calculators";
import { getRelatedCalculators } from "@/content/calculators/get-related-calculators";
import { calculators } from "@/content/calculators/registry";
import Link from "next/link";

import { CalculatorTrustPanel } from "@/components/calculator-trust";
import { LimitingReactantCalculator } from "@/components/calculators/limiting-reactant-calculator";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";
import { createCalculatorSchema } from "@/lib/seo/calculator-schema";

const pagePath = "/calculators/limiting-reactant-calculator";
const pageUrl = absoluteUrl(pagePath);

const title =
  "Limiting Reactant Calculator: Find Excess and Yield";

const description =
  "Use this free limiting reactant calculator to identify the limiting reagent, find excess reactant remaining, and calculate theoretical product yield.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: pagePath,
  },
  openGraph: {
    title,
    description,
    url: pageUrl,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
};

const faqItems = [
  {
    question: "What is a limiting reactant?",
    answer:
      "The limiting reactant is the substance consumed first in a chemical reaction. It determines the maximum amount of product that can form.",
  },
  {
    question:
      "How do you identify the limiting reactant?",
    answer:
      "Convert each reactant amount to moles, divide each amount by its balanced-equation coefficient, and compare the resulting reaction extents. The smallest value identifies the limiting reactant.",
  },
  {
    question:
      "Does the chemical equation need to be balanced?",
    answer:
      "Yes. Limiting-reactant calculations depend on the mole ratios represented by coefficients in a correctly balanced chemical equation.",
  },
  {
    question:
      "Can reactant amounts be entered in grams?",
    answer:
      "Yes. Enter the molar mass for every reactant supplied in grams so the calculator can convert mass to moles before comparing reactants.",
  },
  {
    question: "What is an excess reactant?",
    answer:
      "An excess reactant is present in more than the stoichiometric amount required. Some of it remains after the limiting reactant is consumed.",
  },
  {
    question:
      "Is calculated product yield the same as actual yield?",
    answer:
      "No. The calculator gives theoretical yield, which assumes complete reaction. Actual laboratory yield may be lower because of incomplete reactions, side reactions, or product loss.",
  },
];

const calculatorSchema = createCalculatorSchema({
  name: title,
  description: description,
  slug: "limiting-reactant-calculator",
  category: "Chemistry",
});

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: siteConfig.url,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Calculators",
      item: absoluteUrl("/calculators"),
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Limiting Reactant Calculator",
      item: pageUrl,
    },
  ],
};



const relatedCalculators = getRelatedCalculators(
  "limiting-reactant-calculator",
  calculators,
);

export default function LimitingReactantCalculatorPage() {
  return (
    <main>
      {[calculatorSchema, faqSchema, breadcrumbSchema].map(
        (schema, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(schema).replace(
                /</g,
                "\\u003c",
              ),
            }}
          />
        ),
      )}

      <section className="calculator-page">
        <Container>
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/calculators">Calculators</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">
              Limiting Reactant Calculator
            </span>
          </nav>

          <div className="calculator-page__intro">
            <p className="eyebrow">Chemistry calculator</p>

            <h1>Limiting Reactant Calculator</h1>

            <p>
              Compare two reactants from a balanced chemical
              equation, identify the limiting reagent, calculate
              the excess amount remaining, and estimate
              theoretical product yield.
            </p>
          </div>

          <LimitingReactantCalculator />
        </Container>
      </section>

      <section className="article-section">
        <Container className="article-layout">
          <article className="article-content">
            <section aria-labelledby="formula-heading">
              <p className="eyebrow">
                Limiting reactant formula
              </p>

              <h2 id="formula-heading">
                How to calculate the limiting reactant
              </h2>

              <p>
                Every reactant must first be expressed in moles.
                Divide the available moles of each reactant by
                its coefficient in the balanced equation. The
                reactant with the smaller result has the smaller
                reaction extent and limits the reaction.
              </p>

              <div className="formula-card">
                <p>
                  Reaction extent = available moles ÷
                  stoichiometric coefficient
                </p>
              </div>

              <p>
                After finding the smallest reaction extent,
                calculate the theoretical amount of product:
              </p>

              <div className="formula-card">
                <p>
                  Product moles = smallest reaction extent ×
                  product coefficient
                </p>
              </div>

              <p>
                If product mass is required, multiply the
                calculated product moles by its molar mass.
              </p>
            </section>

            <section aria-labelledby="steps-heading">
              <p className="eyebrow">Calculation process</p>

              <h2 id="steps-heading">
                How to use the limiting reactant calculator
              </h2>

              <ol className="article-list">
                <li>
                  Write and balance the complete chemical
                  equation.
                </li>
                <li>
                  Enter the name, available amount, unit, and
                  coefficient for reactant A.
                </li>
                <li>
                  Enter the corresponding information for
                  reactant B.
                </li>
                <li>
                  Supply molar masses for amounts entered in
                  grams.
                </li>
                <li>
                  Enter the product coefficient and choose
                  moles or grams for the result.
                </li>
                <li>
                  Calculate and review the limiting reactant,
                  excess reactant, and theoretical yield.
                </li>
              </ol>
            </section>

            <section aria-labelledby="example-heading">
              <p className="eyebrow">Worked example</p>

              <h2 id="example-heading">
                Hydrogen and oxygen limiting-reactant example
              </h2>

              <p>Consider the balanced reaction:</p>

              <div className="formula-card">
                <p>2H₂ + O₂ → 2H₂O</p>
              </div>

              <p>
                Suppose 2 moles of hydrogen and 2 moles of
                oxygen are available.
              </p>

              <ol className="article-list">
                <li>
                  Hydrogen reaction extent = 2 mol ÷ 2 = 1.
                </li>
                <li>
                  Oxygen reaction extent = 2 mol ÷ 1 = 2.
                </li>
                <li>
                  Hydrogen has the smaller reaction extent, so
                  hydrogen is the limiting reactant.
                </li>
                <li>
                  Water produced = 1 × 2 = 2 moles.
                </li>
                <li>
                  Oxygen used = 1 × 1 = 1 mole, leaving 1 mole
                  of oxygen in excess.
                </li>
              </ol>
            </section>

            <section aria-labelledby="difference-heading">
              <p className="eyebrow">Key chemistry concept</p>

              <h2 id="difference-heading">
                Limiting reactant versus excess reactant
              </h2>

              <p>
                The limiting reactant is completely consumed
                first and controls the theoretical product
                yield. The excess reactant is supplied in a
                greater amount than the balanced equation
                requires and remains after the reaction.
              </p>

              <p>
                When both normalized reactant amounts are equal,
                the reactants are present in exact
                stoichiometric proportions. Neither reactant is
                left in excess under the ideal model.
              </p>
            </section>

            <section aria-labelledby="mistakes-heading">
              <p className="eyebrow">Common mistakes</p>

              <h2 id="mistakes-heading">
                Limiting-reactant calculation mistakes
              </h2>

              <ul className="article-list">
                <li>
                  Comparing masses directly instead of first
                  converting them to moles.
                </li>
                <li>
                  Using coefficients from an unbalanced
                  chemical equation.
                </li>
                <li>
                  Confusing formula subscripts with equation
                  coefficients.
                </li>
                <li>
                  Selecting the reactant with fewer moles
                  without considering the mole ratio.
                </li>
                <li>
                  Using an incorrect molar mass for a reactant
                  or product.
                </li>
                <li>
                  Treating theoretical yield as guaranteed
                  laboratory yield.
                </li>
              </ul>
            </section>

            <section aria-labelledby="related-heading">
              <p className="eyebrow">
                Related chemistry tools
              </p>

              <h2 id="related-heading">
                Continue your reaction calculations
              </h2>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/stoichiometry-calculator"
                >
                  Stoichiometry Calculator
                </Link>{" "}
                to convert a known reactant or product amount
                through a balanced-equation mole ratio.
              </p>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/molecular-weight-calculator"
                >
                  Molecular Weight Calculator
                </Link>{" "}
                to obtain the molar masses required for
                grams-based calculations.
              </p>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/mass-moles-calculator"
                >
                  Mass to Moles Calculator
                </Link>{" "}
                for direct conversions between mass, moles, and
                molar mass.
              </p>
            </section>

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">
                Questions and answers
              </p>

              <h2 id="faq-heading">
                Limiting reactant calculator FAQ
              </h2>

              <div className="faq-list">
                {faqItems.map((item) => (
                  <details key={item.question}>
                    <summary>{item.question}</summary>
                    <p>{item.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          </article>

          <aside className="article-sidebar">
            <div className="sidebar-card">
              <p className="sidebar-card__label">
                Quick reference
              </p>

              <h2>Limiting-reactant checklist</h2>

              <ul>
                <li>Balance the chemical equation</li>
                <li>Convert every reactant to moles</li>
                <li>Divide moles by each coefficient</li>
                <li>Select the smallest reaction extent</li>
                <li>Calculate theoretical product yield</li>
                <li>Find the excess amount remaining</li>
              </ul>
            </div>
          </aside>
        </Container>

        <Container>
          <CalculatorTrustPanel subject="chemistry" />
        </Container>
      </section>
    

      <RelatedCalculators
        calculators={relatedCalculators}
      />
</main>
  );
}
