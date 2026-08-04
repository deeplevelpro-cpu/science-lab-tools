import type { Metadata } from "next";
import Link from "next/link";

import { DilutionCalculator } from "@/components/calculators/dilution-calculator";
import { CalculatorTrustPanel } from "@/components/calculator-trust";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";

const pageTitle = "Dilution Calculator | Molarity & Volume";
const pageDescription =
  "Solve chemistry dilution problems using M₁V₁ = M₂V₂. Calculate initial or final concentration and volume with worked examples and clear guidance.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/calculators/dilution-calculator",
  },
  openGraph: {
    title: `${pageTitle} | ${siteConfig.name}`,
    description: pageDescription,
    type: "website",
    url: absoluteUrl("/calculators/dilution-calculator"),
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
    question: "What does M₁V₁ = M₂V₂ mean?",
    answer:
      "M₁ and V₁ are the initial concentration and volume. M₂ and V₂ are the final concentration and volume after dilution.",
  },
  {
    question: "Must the volume units be the same?",
    answer:
      "Yes. Initial and final volume must use the same unit, such as both milliliters or both liters.",
  },
  {
    question: "Does dilution change the amount of solute?",
    answer:
      "No. The dilution formula assumes that the amount of dissolved solute remains constant while additional solvent changes the total volume and concentration.",
  },
] as const;

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: pageTitle,
  description: pageDescription,
  url: absoluteUrl("/calculators/dilution-calculator"),
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

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

export default function DilutionCalculatorPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webApplicationSchema).replace(
            /</g,
            "\\u003c",
          ),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
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
              <li aria-current="page">Dilution Calculator</li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">Chemistry solution tool</p>
            <h1>Dilution Calculator</h1>
            <p>
              Solve for initial concentration, initial volume, final
              concentration, or final volume using the standard
              dilution equation.
            </p>
          </div>
        </Container>
      </section>

      <section
        className="tool-section"
        aria-label="Dilution calculator"
      >
        <Container>
          <DilutionCalculator />
        </Container>
      </section>

      <section className="article-section">
        <Container className="article-layout">
          <article className="article-content">
            <section aria-labelledby="formula-heading">
              <p className="eyebrow">Formula</p>
              <h2 id="formula-heading">
                The chemistry dilution equation
              </h2>

              <div className="formula-card">
                <p>
                  Dilution formula
                  <span>M₁V₁ = M₂V₂</span>
                </p>
              </div>

              <p>
                The equation expresses conservation of solute during
                dilution. Concentration decreases as total solution
                volume increases, while the amount of solute remains
                unchanged.
              </p>
            </section>

            <section aria-labelledby="example-heading">
              <p className="eyebrow">Worked example</p>
              <h2 id="example-heading">
                Calculate final concentration
              </h2>

              <p>
                A student dilutes <strong>50 mL</strong> of a{" "}
                <strong>2 M</strong> solution to a final volume of{" "}
                <strong>200 mL</strong>.
              </p>

              <ol className="calculation-steps">
                <li>
                  Start with: 2 × 50 = M₂ × 200
                </li>
                <li>
                  Multiply the initial values: 2 × 50 ={" "}
                  <strong>100</strong>
                </li>
                <li>
                  Divide by the final volume: 100 ÷ 200 ={" "}
                  <strong>0.5</strong>
                </li>
                <li>
                  The final concentration is{" "}
                  <strong>0.5 M</strong>
                </li>
              </ol>
            </section>

            <section aria-labelledby="units-heading">
              <p className="eyebrow">Unit guidance</p>
              <h2 id="units-heading">
                Keep corresponding units consistent
              </h2>

              <p>
                M₁ and M₂ must use the same concentration unit. V₁
                and V₂ must also use the same volume unit. For
                example, both volumes may be entered in milliliters;
                conversion to liters is unnecessary when the units
                match.
              </p>

              <p>
                Need to calculate concentration from moles and total
                solution volume?{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/molarity-calculator"
                >
                  Use the Molarity Calculator
                </Link>
                .
              </p>
            </section>

            <section aria-labelledby="mistakes-heading">
              <p className="eyebrow">Chemistry guidance</p>
              <h2 id="mistakes-heading">
                Common dilution mistakes
              </h2>

              <ul className="article-list">
                <li>Mixing liters and milliliters in one equation.</li>
                <li>
                  Using solvent volume instead of total final
                  solution volume.
                </li>
                <li>
                  Entering the unknown value in a field that should
                  remain blank.
                </li>
                <li>
                  Confusing initial and final concentration values.
                </li>
                <li>
                  Applying the formula when solute amount changes
                  during the process.
                </li>
              </ul>
            </section>

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">Questions and answers</p>
              <h2 id="faq-heading">Dilution FAQ</h2>

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
              <h2>Dilution checklist</h2>
              <ul>
                <li>Select the missing variable</li>
                <li>Enter the other three values</li>
                <li>Use matching concentration units</li>
                <li>Use matching volume units</li>
                <li>Confirm that solute amount stays constant</li>
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
