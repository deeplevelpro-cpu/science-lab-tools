import type { Metadata } from "next";
import Link from "next/link";

import { PhCalculator } from "@/components/calculators/ph-calculator";
import { CalculatorTrustPanel } from "@/components/calculator-trust";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";
import { createCalculatorSchema } from "@/lib/seo/calculator-schema";

const pagePath = "/calculators/ph-calculator";
const pageTitle = "pH Calculator | Hydrogen Ion Concentration";
const pageDescription =
  "Calculate pH, pOH, hydrogen-ion concentration, and hydroxide-ion concentration. Includes formulas, worked examples, classifications, and acid-base guidance.";

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
    question: "What formula is used to calculate pH?",
    answer:
      "pH is calculated using pH = −log₁₀[H⁺], where [H⁺] is the hydrogen-ion concentration in moles per liter.",
  },
  {
    question: "How are pH and pOH related?",
    answer:
      "At 25 degrees Celsius, pH and pOH add to 14. Therefore, pH = 14 − pOH and pOH = 14 − pH.",
  },
  {
    question: "What pH value is neutral?",
    answer:
      "At 25 degrees Celsius, a solution with pH 7 is neutral. Values below 7 are acidic and values above 7 are basic.",
  },
  {
    question: "Can pH be below 0 or above 14?",
    answer:
      "Yes. Highly concentrated solutions can have pH values below 0 or above 14, although the 0 to 14 range is commonly used for typical dilute aqueous solutions.",
  },
] as const;

const calculatorSchema = createCalculatorSchema({
  name: pageTitle,
  description: pageDescription,
  slug: "ph-calculator",
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
      item: absoluteUrl("/"),
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
      name: pageTitle,
      item: absoluteUrl(pagePath),
    },
  ],
};

export default function PhCalculatorPage() {
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
              <li aria-current="page">pH Calculator</li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">
              Chemistry acid-base calculator
            </p>
            <h1>pH Calculator</h1>
            <p>
              Calculate pH, pOH, hydrogen-ion concentration,
              and hydroxide-ion concentration from any known
              acid-base measurement.
            </p>
          </div>
        </Container>
      </section>

      <section
        className="tool-section"
        aria-label="pH calculator"
      >
        <Container>
          <PhCalculator />
        </Container>
      </section>

      <section className="article-section">
        <Container className="article-layout">
          <article className="article-content">
            <section aria-labelledby="ph-formula-heading">
              <p className="eyebrow">Formula</p>
              <h2 id="ph-formula-heading">
                How pH is calculated
              </h2>

              <div className="formula-card">
                <p>
                  pH =
                  <span>−log₁₀[H⁺]</span>
                </p>
              </div>

              <p>
                The pH scale describes the concentration of
                hydrogen ions in an aqueous solution. Because
                the scale is logarithmic, a change of one pH
                unit represents a tenfold change in hydrogen-ion
                concentration.
              </p>
            </section>

            <section aria-labelledby="relationships-heading">
              <p className="eyebrow">Acid-base relationships</p>
              <h2 id="relationships-heading">
                pH, pOH, H⁺, and OH⁻ formulas
              </h2>

              <ul className="article-list">
                <li>
                  <strong>pH = −log₁₀[H⁺]</strong>
                </li>
                <li>
                  <strong>pOH = −log₁₀[OH⁻]</strong>
                </li>
                <li>
                  <strong>pH + pOH = 14</strong> at 25 °C
                </li>
                <li>
                  <strong>[H⁺] = 10⁻ᵖᴴ</strong>
                </li>
                <li>
                  <strong>[OH⁻] = 10⁻ᵖᴼᴴ</strong>
                </li>
                <li>
                  <strong>[H⁺][OH⁻] = 1 × 10⁻¹⁴</strong>
                  at 25 °C
                </li>
              </ul>
            </section>

            <section aria-labelledby="example-heading">
              <p className="eyebrow">Worked example</p>
              <h2 id="example-heading">
                Calculate pH from hydrogen-ion concentration
              </h2>

              <p>
                Suppose a solution has a hydrogen-ion
                concentration of{" "}
                <strong>1 × 10⁻⁵ mol/L</strong>.
              </p>

              <ol className="calculation-steps">
                <li>
                  Use the formula{" "}
                  <strong>pH = −log₁₀[H⁺]</strong>.
                </li>
                <li>
                  Substitute the concentration:{" "}
                  <strong>pH = −log₁₀(1 × 10⁻⁵)</strong>.
                </li>
                <li>
                  Calculate the logarithm:{" "}
                  <strong>pH = 5</strong>.
                </li>
                <li>
                  Since pH 5 is below 7, the solution is{" "}
                  <strong>acidic</strong>.
                </li>
              </ol>
            </section>

            <section aria-labelledby="scale-heading">
              <p className="eyebrow">pH scale</p>
              <h2 id="scale-heading">
                Acidic, neutral, and basic solutions
              </h2>

              <ul className="article-list">
                <li>
                  <strong>pH below 7:</strong> acidic solution
                </li>
                <li>
                  <strong>pH equal to 7:</strong> neutral solution
                </li>
                <li>
                  <strong>pH above 7:</strong> basic or alkaline
                  solution
                </li>
              </ul>

              <p>
                The neutral value of 7 and the pH plus pOH
                relationship of 14 apply specifically to aqueous
                solutions near 25 °C. Temperature changes the
                ionization constant of water.
              </p>
            </section>

            <section aria-labelledby="mistakes-heading">
              <p className="eyebrow">Chemistry guidance</p>
              <h2 id="mistakes-heading">
                Common pH calculation mistakes
              </h2>

              <ul className="article-list">
                <li>
                  Entering ion concentration as a negative value.
                </li>
                <li>
                  Forgetting the negative sign in the logarithm
                  formula.
                </li>
                <li>
                  Confusing hydrogen-ion concentration with
                  hydroxide-ion concentration.
                </li>
                <li>
                  Assuming every pH value must remain between
                  0 and 14.
                </li>
                <li>
                  Applying the pH plus pOH equals 14 relationship
                  without considering temperature.
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
                  href="/calculators/molarity-calculator"
                >
                  Molarity Calculator
                </Link>{" "}
                to calculate the molar concentration of a solution.
              </p>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/dilution-calculator"
                >
                  Dilution Calculator
                </Link>{" "}
                when preparing a lower-concentration solution from
                a stock solution.
              </p>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/mass-moles-calculator"
                >
                  Mass to Moles Calculator
                </Link>{" "}
                to convert between solute mass and amount in moles.
              </p>
            </section>

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">Questions and answers</p>
              <h2 id="faq-heading">pH calculator FAQ</h2>

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
              <h2>pH calculation checklist</h2>

              <ul>
                <li>Identify the known acid-base value</li>
                <li>Use concentration in mol/L</li>
                <li>Use base-10 logarithms</li>
                <li>Check the pH classification</li>
                <li>Consider solution temperature</li>
              </ul>
            </div>
          </aside>
        </Container>
        <Container>
          <CalculatorTrustPanel subject="chemistry" />
        </Container>
      </section>
    </main>
  );
}
