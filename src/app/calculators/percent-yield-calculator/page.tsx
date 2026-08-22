import type { Metadata } from "next";

import { RelatedCalculators } from "@/components/related-calculators";
import { getRelatedCalculators } from "@/content/calculators/get-related-calculators";
import { calculators } from "@/content/calculators/registry";
import Link from "next/link";

import { CalculatorTrustPanel } from "@/components/calculator-trust";
import { PercentYieldCalculator } from "@/components/calculators/percent-yield-calculator";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";
import {
  createCalculatorBreadcrumbSchema,
  createCalculatorSchema,
} from "@/lib/seo/calculator-schema";

const pagePath = "/calculators/percent-yield-calculator";
const pageUrl = absoluteUrl(pagePath);

const title =
  "Percent Yield Calculator: Calculate Reaction Yield";

const description =
  "Calculate percent yield from actual and theoretical yield. Use the free chemistry calculator with formulas, worked examples, and clear guidance.";

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
    question: "What is percent yield?",
    answer:
      "Percent yield compares the amount of product actually obtained in an experiment with the maximum theoretical amount predicted by stoichiometry.",
  },
  {
    question: "What is the percent yield formula?",
    answer:
      "Percent yield equals actual yield divided by theoretical yield, multiplied by 100.",
  },
  {
    question:
      "What is the difference between actual and theoretical yield?",
    answer:
      "Actual yield is the measured amount of product obtained experimentally. Theoretical yield is the maximum amount that should form according to the balanced chemical equation.",
  },
  {
    question: "Can percent yield be greater than 100%?",
    answer:
      "A calculated yield can exceed 100%, but this usually indicates retained moisture, impurities, incomplete drying, contamination, or a measurement error.",
  },
  {
    question:
      "Do actual and theoretical yield need the same unit?",
    answer:
      "Yes. Both values must use the same unit, such as grams, moles, milligrams, or kilograms, so their ratio is valid.",
  },
  {
    question: "Why is percent yield usually below 100%?",
    answer:
      "Product loss, incomplete reactions, competing side reactions, transfer losses, purification steps, and measurement uncertainty can all reduce actual yield.",
  },
];

const calculatorSchema = createCalculatorSchema({
  name: title,
  description: description,
  slug: "percent-yield-calculator",
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

const breadcrumbSchema =
  createCalculatorBreadcrumbSchema({
    name: "Percent Yield Calculator",
    slug: "percent-yield-calculator",
    category: "Chemistry",
  });



const relatedCalculators = getRelatedCalculators(
  "percent-yield-calculator",
  calculators,
);

export default function PercentYieldCalculatorPage() {
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
              Percent Yield Calculator
            </span>
          </nav>

          <div className="calculator-page__intro">
            <p className="eyebrow">Chemistry calculator</p>

            <h1>Percent Yield Calculator</h1>

            <p>
              Calculate reaction percent yield from actual and
              theoretical yield, review the formula, and understand
              why an experimental result may fall below or rise
              above 100%.
            </p>
          </div>

          <PercentYieldCalculator />
        </Container>
      </section>

      <section className="article-section">
        <Container className="article-layout">
          <article className="article-content">
            <section aria-labelledby="formula-heading">
              <p className="eyebrow">Percent yield formula</p>

              <h2 id="formula-heading">
                How to calculate percent yield
              </h2>

              <p>
                Percent yield measures the efficiency of a chemical
                reaction by comparing the product collected in an
                experiment with the maximum product predicted by
                stoichiometry.
              </p>

              <div className="formula-card">
                <p>
                  Percent yield = (actual yield ÷ theoretical
                  yield) × 100
                </p>
              </div>

              <p>
                Actual and theoretical yield must be expressed in
                the same unit. Because one value is divided by the
                other, the units cancel and the final result is
                reported as a percentage.
              </p>
            </section>

            <section aria-labelledby="steps-heading">
              <p className="eyebrow">Calculation process</p>

              <h2 id="steps-heading">
                How to use the percent yield calculator
              </h2>

              <ol className="article-list">
                <li>
                  Determine the actual amount of product collected
                  during the experiment.
                </li>
                <li>
                  Calculate or obtain the theoretical yield from
                  the balanced chemical equation.
                </li>
                <li>
                  Confirm that both yield values use the same unit.
                </li>
                <li>
                  Enter the actual yield and theoretical yield.
                </li>
                <li>
                  Select calculate to obtain the percent yield.
                </li>
                <li>
                  Review the yield difference and efficiency ratio
                  shown with the result.
                </li>
              </ol>
            </section>

            <section aria-labelledby="example-heading">
              <p className="eyebrow">Worked example</p>

              <h2 id="example-heading">
                Percent yield calculation example
              </h2>

              <p>
                Suppose a reaction has a theoretical yield of 8.4
                grams, but the experiment produces 7.35 grams of
                purified product.
              </p>

              <div className="formula-card">
                <p>
                  Percent yield = (7.35 g ÷ 8.4 g) × 100
                  = 87.5%
                </p>
              </div>

              <p>
                The reaction produced 87.5% of the maximum amount
                predicted by the stoichiometric calculation. The
                difference between theoretical and actual yield is
                1.05 grams.
              </p>
            </section>

            <section aria-labelledby="meaning-heading">
              <p className="eyebrow">Interpreting results</p>

              <h2 id="meaning-heading">
                What does the percent yield mean?
              </h2>

              <p>
                A result close to 100% means the measured product
                amount is close to the theoretical maximum. A lower
                result indicates that some expected product was not
                recovered or formed.
              </p>

              <p>
                Percent yield does not independently prove product
                purity or reaction quality. A high apparent yield
                may include solvent, moisture, unreacted material,
                or other impurities.
              </p>

              <ul className="article-list">
                <li>
                  Below 100%: product loss or incomplete conversion
                  may have occurred.
                </li>
                <li>
                  Equal to 100%: actual yield matches the ideal
                  theoretical prediction.
                </li>
                <li>
                  Above 100%: inspect the sample and measurements
                  for moisture, impurities, or error.
                </li>
              </ul>
            </section>

            <section aria-labelledby="difference-heading">
              <p className="eyebrow">Important definitions</p>

              <h2 id="difference-heading">
                Actual yield versus theoretical yield
              </h2>

              <p>
                <strong>Actual yield</strong> is the amount of
                product physically recovered and measured after an
                experiment. It is determined using laboratory
                observations.
              </p>

              <p>
                <strong>Theoretical yield</strong> is the maximum
                product amount predicted from the limiting
                reactant, balanced-equation mole ratios, and ideal
                reaction assumptions.
              </p>

              <p>
                Theoretical yield should not be estimated from the
                final experimental result. It must be calculated
                independently from the available reactants.
              </p>
            </section>

            <section aria-labelledby="low-yield-heading">
              <p className="eyebrow">Laboratory interpretation</p>

              <h2 id="low-yield-heading">
                Why can percent yield be low?
              </h2>

              <ul className="article-list">
                <li>
                  The reaction may not proceed to completion.
                </li>
                <li>
                  Side reactions may consume some reactant.
                </li>
                <li>
                  Product may remain in the reaction vessel or
                  filtration equipment.
                </li>
                <li>
                  Material may be lost during transfer,
                  purification, drying, or weighing.
                </li>
                <li>
                  The reaction conditions may not be optimal.
                </li>
                <li>
                  Measurement uncertainty may affect reactant or
                  product quantities.
                </li>
              </ul>
            </section>

            <section aria-labelledby="above-heading">
              <p className="eyebrow">Results above 100%</p>

              <h2 id="above-heading">
                Can percent yield exceed 100 percent?
              </h2>

              <p>
                The calculator permits values above 100% because
                they can occur in real laboratory records. However,
                a pure dry product cannot exceed its valid
                theoretical maximum under the assumed reaction.
              </p>

              <p>
                An apparent yield above 100% often means the sample
                contains water, residual solvent, unreacted
                material, filter paper, or another contaminant. It
                may also indicate an incorrect theoretical-yield
                calculation or an instrument error.
              </p>
            </section>

            <section aria-labelledby="mistakes-heading">
              <p className="eyebrow">Common mistakes</p>

              <h2 id="mistakes-heading">
                Percent-yield calculation mistakes
              </h2>

              <ul className="article-list">
                <li>
                  Dividing theoretical yield by actual yield.
                </li>
                <li>
                  Entering values that use different units.
                </li>
                <li>
                  Using reactant mass as the actual product yield.
                </li>
                <li>
                  Calculating theoretical yield from an unbalanced
                  chemical equation.
                </li>
                <li>
                  Ignoring the limiting reactant when determining
                  theoretical yield.
                </li>
                <li>
                  Treating an apparent yield above 100% as proof of
                  exceptional reaction efficiency.
                </li>
              </ul>
            </section>

            <section aria-labelledby="related-heading">
              <p className="eyebrow">Related chemistry tools</p>

              <h2 id="related-heading">
                Continue your reaction calculations
              </h2>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/limiting-reactant-calculator"
                >
                  Limiting Reactant Calculator
                </Link>{" "}
                to identify which reactant controls the theoretical
                product yield.
              </p>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/stoichiometry-calculator"
                >
                  Stoichiometry Calculator
                </Link>{" "}
                to calculate reactant and product quantities from
                balanced-equation mole ratios.
              </p>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/mass-moles-calculator"
                >
                  Mass to Moles Calculator
                </Link>{" "}
                to convert between mass, moles, and molar mass.
              </p>
            </section>

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">Questions and answers</p>

              <h2 id="faq-heading">
                Percent yield calculator FAQ
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

              <h2>Percent-yield checklist</h2>

              <ul>
                <li>Find the actual product yield</li>
                <li>Calculate the theoretical yield</li>
                <li>Use the same unit for both values</li>
                <li>Divide actual by theoretical yield</li>
                <li>Multiply the ratio by 100</li>
                <li>Investigate results above 100%</li>
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
