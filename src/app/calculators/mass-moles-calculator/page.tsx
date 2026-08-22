import type { Metadata } from "next";

import { RelatedCalculators } from "@/components/related-calculators";
import { getRelatedCalculators } from "@/content/calculators/get-related-calculators";
import { calculators } from "@/content/calculators/registry";
import Link from "next/link";

import { MassMolesCalculator } from "@/components/calculators/mass-moles-calculator";
import { CalculatorTrustPanel } from "@/components/calculator-trust";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";
import { createCalculatorSchema } from "@/lib/seo/calculator-schema";
import { createFAQSchema } from "@/lib/seo/faq-schema";

const pageTitle = "Mass to Moles Calculator";
const pageDescription =
  "Convert between mass, moles, and molar mass using the formula m = n × M. Calculate grams, amount of substance, or molar mass with clear working steps.";

const pagePath =
  "/calculators/mass-moles-calculator";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: pagePath,
  },
  openGraph: {
    title: `${pageTitle} | ${siteConfig.name}`,
    description: pageDescription,
    type: "website",
    url: absoluteUrl(pagePath),
  },
  twitter: {
    card: "summary_large_image",
    title: `${pageTitle} | ${siteConfig.name}`,
    description: pageDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const faqItems = [
  {
    question: "How do you convert grams to moles?",
    answer:
      "Divide the mass in grams by the molar mass in grams per mole. The formula is n = m ÷ M.",
  },
  {
    question: "How do you calculate mass from moles?",
    answer:
      "Multiply the amount in moles by the molar mass. The formula is m = n × M.",
  },
  {
    question: "What units should molar mass use?",
    answer:
      "Molar mass should normally be entered in grams per mole, written as g/mol.",
  },
  {
    question: "Can this calculator find molar mass?",
    answer:
      "Yes. Divide mass in grams by the number of moles using the formula M = m ÷ n.",
  },
] as const;

const calculatorSchema = createCalculatorSchema({
  name: pageTitle,
  description: pageDescription,
  slug: "mass-moles-calculator",
  category: "Chemistry",
});

const faqSchema = createFAQSchema(faqItems);

const relatedCalculators = getRelatedCalculators(
  "mass-moles-calculator",
  calculators,
);

export default function MassMolesCalculatorPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            calculatorSchema,
          ).replace(/</g, "\\u003c"),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(
            /</g,
            "\\u003c",
          ),
        }}
      />

      <section className="tool-page-hero">
        <Container>
          <nav
            className="breadcrumbs"
            aria-label="Breadcrumb"
          >
            <ol>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/calculators">
                  Calculators
                </Link>
              </li>
              <li aria-current="page">
                Mass to Moles Calculator
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">
              Chemistry calculation tool
            </p>

            <h1>Mass to Moles Calculator</h1>

            <p>
              Calculate mass, moles, or molar mass
              from two known chemistry values with
              clear units and working steps.
            </p>
          </div>
        </Container>
      </section>

      <section
        className="tool-section"
        aria-label="Mass to moles calculator"
      >
        <Container>
          <MassMolesCalculator />
        </Container>
      </section>

      <section className="article-section">
        <Container className="article-layout">
          <article className="article-content">
            <section aria-labelledby="formula-heading">
              <p className="eyebrow">Formula</p>

              <h2 id="formula-heading">
                Mass, moles, and molar mass formula
              </h2>

              <div className="formula-card">
                <p>
                  Mass =
                  <span>
                    moles × molar mass
                  </span>
                </p>
              </div>

              <p>
                The relationship is written as{" "}
                <strong>m = n × M</strong>, where{" "}
                <strong>m</strong> is mass in grams,{" "}
                <strong>n</strong> is amount in moles,
                and <strong>M</strong> is molar mass in
                grams per mole.
              </p>

              <ul className="article-list">
                <li>
                  Moles: <strong>n = m ÷ M</strong>
                </li>
                <li>
                  Mass: <strong>m = n × M</strong>
                </li>
                <li>
                  Molar mass:{" "}
                  <strong>M = m ÷ n</strong>
                </li>
              </ul>
            </section>

            <section aria-labelledby="example-heading">
              <p className="eyebrow">
                Worked example
              </p>

              <h2 id="example-heading">
                Convert grams of water to moles
              </h2>

              <p>
                A water sample has a mass of{" "}
                <strong>36.03 grams</strong>. The molar
                mass of water is{" "}
                <strong>18.015 g/mol</strong>.
              </p>

              <ol className="calculation-steps">
                <li>
                  Use the formula: n = m ÷ M
                </li>
                <li>
                  Substitute the values: 36.03 ÷ 18.015
                </li>
                <li>
                  Calculate the result:{" "}
                  <strong>2 mol</strong>
                </li>
              </ol>

              <p>
                The sample therefore contains{" "}
                <strong>2 moles of water</strong>.
              </p>
            </section>

            <section aria-labelledby="units-heading">
              <p className="eyebrow">
                Chemistry units
              </p>

              <h2 id="units-heading">
                Use compatible mass and molar-mass
                units
              </h2>

              <p>
                This calculator expects mass in grams
                and molar mass in grams per mole. Using
                matching units ensures that grams
                cancel correctly when calculating
                moles.
              </p>

              <ul className="article-list">
                <li>Mass: grams (g)</li>
                <li>Amount of substance: moles (mol)</li>
                <li>Molar mass: grams per mole (g/mol)</li>
              </ul>
            </section>

            <section aria-labelledby="mistakes-heading">
              <p className="eyebrow">
                Common mistakes
              </p>

              <h2 id="mistakes-heading">
                Mass-to-moles calculation mistakes
              </h2>

              <ul className="article-list">
                <li>
                  Multiplying instead of dividing when
                  converting grams to moles.
                </li>
                <li>
                  Entering molecular mass without
                  checking the chemical formula.
                </li>
                <li>
                  Mixing kilograms with molar mass in
                  grams per mole.
                </li>
                <li>
                  Rounding molar mass too early.
                </li>
                <li>
                  Forgetting to include units in the
                  final result.
                </li>
              </ul>
            </section>

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">
                Questions and answers
              </p>

              <h2 id="faq-heading">
                Mass to moles FAQ
              </h2>

              <div className="faq-list">
                {faqItems.map((item) => (
                  <details key={item.question}>
                    <summary>
                      {item.question}
                    </summary>
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

              <h2>Mass and moles checklist</h2>

              <ul>
                <li>Confirm the chemical formula</li>
                <li>Calculate the correct molar mass</li>
                <li>Use grams and g/mol</li>
                <li>Select the missing variable</li>
                <li>Round only the final answer</li>
              </ul>
            </div>

            <div className="sidebar-card">
              <p className="sidebar-card__label">
                Related calculator
              </p>

              <h2>Calculate solution molarity</h2>

              <p>
                Use the calculated number of moles with
                solution volume to determine molarity.
              </p>

              <Link href="/calculators/molarity-calculator">
                Open Molarity Calculator
              </Link>
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
