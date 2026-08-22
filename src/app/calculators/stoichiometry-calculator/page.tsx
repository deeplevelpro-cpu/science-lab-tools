import type { Metadata } from "next";

import { RelatedCalculators } from "@/components/related-calculators";
import { getRelatedCalculators } from "@/content/calculators/get-related-calculators";
import { calculators } from "@/content/calculators/registry";
import Link from "next/link";

import { CalculatorTrustPanel } from "@/components/calculator-trust";
import { StoichiometryCalculator } from "@/components/calculators/stoichiometry-calculator";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";
import {
  createCalculatorBreadcrumbSchema,
  createCalculatorSchema,
} from "@/lib/seo/calculator-schema";

const pagePath = "/calculators/stoichiometry-calculator";
const pageUrl = absoluteUrl(pagePath);

const title =
  "Stoichiometry Calculator: Convert Moles and Grams";

const description =
  "Use this free stoichiometry calculator to convert between reactants and products using balanced-equation coefficients, moles, grams, and molar mass.";

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
    question: "What is stoichiometry?",
    answer:
      "Stoichiometry uses the coefficients in a balanced chemical equation to calculate quantitative relationships between reactants and products.",
  },
  {
    question:
      "Does a chemical equation need to be balanced before using this calculator?",
    answer:
      "Yes. The coefficients must come from a correctly balanced equation because they define the mole ratio used in the calculation.",
  },
  {
    question:
      "How do I convert grams to moles in a stoichiometry calculation?",
    answer:
      "Divide the substance mass in grams by its molar mass in grams per mole. The calculator performs this conversion when grams are selected.",
  },
  {
    question:
      "How do I convert the calculated moles into grams?",
    answer:
      "Multiply the calculated target moles by the target substance molar mass. Select grams as the target unit and enter the target molar mass.",
  },
  {
    question:
      "Where do stoichiometric coefficients come from?",
    answer:
      "They are the numbers placed before chemical formulas when an equation is balanced. An implied coefficient of one should be entered as 1.",
  },
  {
    question:
      "Can this calculator identify the limiting reactant?",
    answer:
      "This calculator converts one known substance into a target amount. A limiting-reactant calculation requires comparing the available amounts of two or more reactants.",
  },
];


const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

const calculatorSchema = createCalculatorSchema({
  name: title,
  description: description,
  slug: "stoichiometry-calculator",
  category: "Chemistry",
});

const breadcrumbSchema =
  createCalculatorBreadcrumbSchema({
    name: "Stoichiometry Calculator",
    slug: "stoichiometry-calculator",
    category: "Chemistry",
  });



const relatedCalculators = getRelatedCalculators(
  "stoichiometry-calculator",
  calculators,
);

export default function StoichiometryCalculatorPage() {
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
              Stoichiometry Calculator
            </span>
          </nav>

          <div className="calculator-page__intro">
            <p className="eyebrow">Chemistry calculator</p>

            <h1>Stoichiometry Calculator</h1>

            <p>
              Convert a known amount of a reactant or product
              into the required amount of another substance
              using coefficients from a balanced chemical
              equation.
            </p>
          </div>

          <StoichiometryCalculator />
        </Container>
      </section>

      <section className="article-section">
        <Container className="article-layout">
          <article className="article-content">
            <section aria-labelledby="formula-heading">
              <p className="eyebrow">Stoichiometry formula</p>

              <h2 id="formula-heading">
                How the stoichiometry calculation works
              </h2>

              <p>
                A balanced chemical equation provides a mole
                ratio between substances. First convert the
                known quantity to moles, apply the coefficient
                ratio, and then convert the target moles to
                grams when a mass result is required.
              </p>

              <div className="formula-card">
                <p>
                  Target moles = known moles ×
                  (target coefficient ÷ known coefficient)
                </p>
              </div>

              <p>
                When the known amount is entered in grams:
              </p>

              <div className="formula-card">
                <p>
                  Known moles = known mass ÷ known molar mass
                </p>
              </div>

              <p>
                When the target result is required in grams:
              </p>

              <div className="formula-card">
                <p>
                  Target mass = target moles × target molar mass
                </p>
              </div>
            </section>

            <section aria-labelledby="steps-heading">
              <p className="eyebrow">Calculation process</p>

              <h2 id="steps-heading">
                How to use the stoichiometry calculator
              </h2>

              <ol className="article-list">
                <li>
                  Balance the chemical equation before entering
                  any values.
                </li>
                <li>
                  Enter the available amount of the known
                  substance in moles or grams.
                </li>
                <li>
                  Enter the coefficient of the known substance.
                </li>
                <li>
                  Enter the coefficient of the target substance.
                </li>
                <li>
                  Supply molar masses when either quantity uses
                  grams.
                </li>
                <li>
                  Calculate and review the mole conversion and
                  target amount.
                </li>
              </ol>
            </section>

            <section aria-labelledby="example-heading">
              <p className="eyebrow">Worked example</p>

              <h2 id="example-heading">
                Hydrogen-to-water stoichiometry example
              </h2>

              <p>
                Consider the balanced equation:
              </p>

              <div className="formula-card">
                <p>2H₂ + O₂ → 2H₂O</p>
              </div>

              <p>
                Suppose 4.032 grams of hydrogen gas are
                available. The molar mass of H₂ is 2.016 g/mol,
                and the molar mass of H₂O is 18.015 g/mol.
              </p>

              <ol className="article-list">
                <li>
                  Hydrogen moles = 4.032 g ÷ 2.016 g/mol =
                  2 mol.
                </li>
                <li>
                  The H₂-to-H₂O coefficient ratio is 2 ÷ 2 =
                  1.
                </li>
                <li>
                  Water moles = 2 mol × 1 = 2 mol.
                </li>
                <li>
                  Water mass = 2 mol × 18.015 g/mol =
                  36.03 g.
                </li>
              </ol>

              <p>
                Therefore, 4.032 grams of hydrogen can
                theoretically produce 36.03 grams of water
                when oxygen is available in excess and the
                reaction proceeds completely.
              </p>
            </section>

            <section aria-labelledby="coefficients-heading">
              <p className="eyebrow">Balanced equations</p>

              <h2 id="coefficients-heading">
                Why stoichiometric coefficients matter
              </h2>

              <p>
                Coefficients describe the relative number of
                molecules or moles involved in a reaction. In
                the equation 2H₂ + O₂ → 2H₂O, two moles of
                hydrogen react with one mole of oxygen to
                produce two moles of water.
              </p>

              <p>
                Subscripts inside a chemical formula describe
                the composition of one molecule. They must not
                be used as substitutes for balanced-equation
                coefficients.
              </p>
            </section>

            <section aria-labelledby="mistakes-heading">
              <p className="eyebrow">Common mistakes</p>

              <h2 id="mistakes-heading">
                Stoichiometry calculation mistakes
              </h2>

              <ul className="article-list">
                <li>
                  Using coefficients from an unbalanced
                  chemical equation.
                </li>
                <li>
                  Confusing formula subscripts with equation
                  coefficients.
                </li>
                <li>
                  Applying a mass ratio directly instead of a
                  mole ratio.
                </li>
                <li>
                  Using an incorrect molar mass for a compound.
                </li>
                <li>
                  Reversing the known and target coefficients.
                </li>
                <li>
                  Rounding intermediate results too early.
                </li>
              </ul>
            </section>

            <section aria-labelledby="related-heading">
              <p className="eyebrow">
                Related chemistry tools
              </p>

              <h2 id="related-heading">
                Continue your chemistry calculations
              </h2>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/molecular-weight-calculator"
                >
                  Molecular Weight Calculator
                </Link>{" "}
                to calculate the molar mass of a chemical
                formula before completing a grams-based
                stoichiometry problem.
              </p>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/mass-moles-calculator"
                >
                  Mass to Moles Calculator
                </Link>{" "}
                for a direct conversion between mass and amount
                of substance.
              </p>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/limiting-reactant-calculator"
                >
                  Limiting Reactant Calculator
                </Link>{" "}
                to compare available reactants, identify the
                limiting reagent, and calculate theoretical yield.
              </p>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/molarity-calculator"
                >
                  Molarity Calculator
                </Link>{" "}
                when a reaction problem involves solution
                concentration and volume.
              </p>
            </section>

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">
                Questions and answers
              </p>

              <h2 id="faq-heading">
                Stoichiometry calculator FAQ
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

              <h2>Stoichiometry checklist</h2>

              <ul>
                <li>Balance the chemical equation</li>
                <li>Identify the known substance</li>
                <li>Convert the known amount to moles</li>
                <li>Apply the coefficient ratio</li>
                <li>Convert target moles when required</li>
                <li>Round only the final answer</li>
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
