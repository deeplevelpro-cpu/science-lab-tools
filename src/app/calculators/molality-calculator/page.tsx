import type { Metadata } from "next";

import { RelatedCalculators } from "@/components/related-calculators";
import { getRelatedCalculators } from "@/content/calculators/get-related-calculators";
import { calculators } from "@/content/calculators/registry";
import Link from "next/link";

import { CalculatorTrustPanel } from "@/components/calculator-trust";
import { MolalityCalculator } from "@/components/calculators/molality-calculator";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";
import { createCalculatorSchema } from "@/lib/seo/calculator-schema";

const pageTitle = "Molality Calculator | Moles & Solvent Mass";
const pageDescription =
  "Calculate molality from moles of solute and solvent mass. Solve for any variable with automatic mol, mmol, kilogram, gram, and milligram conversion.";

const canonicalPath = "/calculators/molality-calculator";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: canonicalPath,
  },
  openGraph: {
    title: `${pageTitle} | ${siteConfig.name}`,
    description: pageDescription,
    type: "website",
    url: absoluteUrl(canonicalPath),
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
    question: "What is molality?",
    answer:
      "Molality is the number of moles of solute per kilogram of solvent. Its standard unit is moles per kilogram, written as mol/kg.",
  },
  {
    question: "Does molality use solution mass or solvent mass?",
    answer:
      "Molality uses the mass of the solvent only. Do not use the total mass of the solution, which includes both the solute and solvent.",
  },
  {
    question: "What is the difference between molality and molarity?",
    answer:
      "Molality uses moles of solute per kilogram of solvent, while molarity uses moles of solute per liter of total solution.",
  },
  {
    question: "Does temperature affect molality?",
    answer:
      "Molality generally remains unchanged with temperature because it depends on mass rather than volume. Molarity can change when solution volume expands or contracts.",
  },
] as const;

const calculatorSchema = createCalculatorSchema({
  name: pageTitle,
  description: pageDescription,
  slug: "molality-calculator",
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



const relatedCalculators = getRelatedCalculators(
  "molality-calculator",
  calculators,
);

export default function MolalityCalculatorPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(calculatorSchema).replace(
            /</g,
            "\\u003c",
          ),
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
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <ol>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/calculators">Calculators</Link>
              </li>
              <li aria-current="page">Molality Calculator</li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">
              Chemistry concentration tool
            </p>
            <h1>Molality Calculator</h1>
            <p>
              Calculate molality, solute amount, or solvent mass
              from two known values with automatic unit conversion.
            </p>
          </div>
        </Container>
      </section>

      <section
        className="tool-section"
        aria-label="Molality calculator"
      >
        <Container>
          <MolalityCalculator />
        </Container>
      </section>

      <section className="article-section">
        <Container className="article-layout">
          <article className="article-content">
            <section aria-labelledby="formula-heading">
              <p className="eyebrow">Formula</p>
              <h2 id="formula-heading">
                How molality is calculated
              </h2>

              <div className="formula-card">
                <p>
                  Molality =
                  <span>
                    moles of solute ÷ kilograms of solvent
                  </span>
                </p>
              </div>

              <p>
                Molality measures the amount of dissolved solute
                relative to the mass of the solvent. The result is
                expressed in moles per kilogram of solvent.
              </p>

              <p>
                You can rearrange the same relationship to calculate
                solute moles or solvent mass:
              </p>

              <ul className="article-list">
                <li>
                  Solute moles = molality × solvent mass in kilograms
                </li>
                <li>
                  Solvent mass = solute moles ÷ molality
                </li>
              </ul>
            </section>

            <section aria-labelledby="example-heading">
              <p className="eyebrow">Worked example</p>
              <h2 id="example-heading">
                Molality calculation example
              </h2>

              <p>
                A mixture contains <strong>0.5 moles</strong> of
                solute dissolved in <strong>250 grams</strong> of
                solvent.
              </p>

              <ol className="calculation-steps">
                <li>
                  Convert solvent mass to kilograms: 250 g ÷ 1000 ={" "}
                  <strong>0.25 kg</strong>
                </li>
                <li>
                  Divide solute moles by solvent mass: 0.5 ÷ 0.25 ={" "}
                  <strong>2</strong>
                </li>
                <li>
                  Report the molality as{" "}
                  <strong>2 mol/kg</strong>
                </li>
              </ol>
            </section>

            <section aria-labelledby="units-heading">
              <p className="eyebrow">Unit guidance</p>
              <h2 id="units-heading">
                Units used in molality calculations
              </h2>

              <p>
                The standard molality formula requires solute amount
                in moles and solvent mass in kilograms. This
                calculator accepts common laboratory units and
                converts them automatically.
              </p>

              <ul className="article-list">
                <li>1 mole equals 1,000 millimoles.</li>
                <li>1 kilogram equals 1,000 grams.</li>
                <li>1 gram equals 1,000 milligrams.</li>
                <li>
                  The final molality unit is moles per kilogram of
                  solvent.
                </li>
              </ul>
            </section>

            <section aria-labelledby="comparison-heading">
              <p className="eyebrow">Concentration concepts</p>
              <h2 id="comparison-heading">
                Molality versus molarity
              </h2>

              <p>
                Molality is based on solvent mass, whereas molarity
                is based on total solution volume. Because mass
                generally does not change with temperature, molality
                is useful when temperature variation could affect
                volume-based concentration.
              </p>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/molarity-calculator"
                >
                  Molarity Calculator
                </Link>{" "}
                when your concentration data uses liters or
                milliliters of total solution.
              </p>
            </section>

            <section aria-labelledby="mistakes-heading">
              <p className="eyebrow">Chemistry guidance</p>
              <h2 id="mistakes-heading">
                Common molality mistakes
              </h2>

              <ul className="article-list">
                <li>
                  Using total solution mass instead of solvent mass.
                </li>
                <li>
                  Entering grams directly without converting them to
                  kilograms.
                </li>
                <li>
                  Confusing millimoles with moles.
                </li>
                <li>
                  Using solution volume, which belongs in a molarity
                  calculation.
                </li>
                <li>
                  Rounding converted values too early.
                </li>
              </ul>
            </section>

            <section aria-labelledby="related-heading">
              <p className="eyebrow">Related chemistry tools</p>
              <h2 id="related-heading">
                Continue with solution calculations
              </h2>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/dilution-calculator"
                >
                  Dilution Calculator
                </Link>{" "}
                to solve concentration and volume relationships when
                preparing a diluted solution.
              </p>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/mass-moles-calculator"
                >
                  Mass to Moles Calculator
                </Link>{" "}
                when you need to convert a solute mass into moles
                before calculating concentration.
              </p>
            </section>

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">Questions and answers</p>
              <h2 id="faq-heading">Molality FAQ</h2>

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
              <h2>Molality checklist</h2>
              <ul>
                <li>Use moles of solute</li>
                <li>Use solvent mass only</li>
                <li>Convert solvent mass to kilograms</li>
                <li>Divide moles by kilograms</li>
                <li>Report the result in mol/kg</li>
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
