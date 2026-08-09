import type { Metadata } from "next";
import Link from "next/link";

import { CalculatorTrustPanel } from "@/components/calculator-trust";
import { DaltonsLawCalculator } from "@/components/calculators/daltons-law-calculator";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";

const pagePath = "/calculators/daltons-law-calculator";

export const metadata: Metadata = {
  title: "Dalton's Law Calculator | Total & Partial Pressure",
  description:
    "Calculate total pressure or a missing partial pressure with Dalton's law. Add gas pressures in Pa, kPa, bar, atm, or mmHg with automatic unit conversion.",
  alternates: {
    canonical: pagePath,
  },
  openGraph: {
    title: "Dalton's Law Calculator",
    description:
      "Calculate total pressure or find a missing partial pressure in a gas mixture using Dalton's law.",
    url: absoluteUrl(pagePath),
    siteName: siteConfig.name,
    type: "website",
  },
};

const faqItems = [
  {
    question: "What is Dalton's law of partial pressures?",
    answer:
      "Dalton's law states that the total pressure of a mixture of nonreacting gases equals the sum of the partial pressures contributed by the individual gases.",
  },
  {
    question: "What formula does the calculator use?",
    answer:
      "For total pressure, the calculator uses Ptotal = P1 + P2 + ... + Pn. For a missing partial pressure, it subtracts the sum of the known partial pressures from the total pressure.",
  },
  {
    question: "What is partial pressure?",
    answer:
      "Partial pressure is the pressure that one gas in a mixture would exert if it occupied the same container alone at the same temperature.",
  },
  {
    question: "Can the partial pressures use different units?",
    answer:
      "Yes. Each pressure may use Pa, kPa, bar, atm, or mmHg. The calculator converts every value to pascals internally before returning the result in your selected unit.",
  },
  {
    question: "How do I calculate a missing partial pressure?",
    answer:
      "Subtract the sum of all known partial pressures from the total pressure. The total pressure must be greater than the combined known partial pressures.",
  },
  {
    question: "When does Dalton's law apply?",
    answer:
      "Dalton's law works best for mixtures of nonreacting gases that behave approximately as ideal gases. Real gases may deviate at high pressures or near condensation.",
  },
];

const webApplicationJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Dalton's Law Calculator",
  url: absoluteUrl(pagePath),
  description:
    "Calculate total gas pressure or a missing partial pressure using Dalton's law with automatic pressure-unit conversion.",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any",
  browserRequirements: "Requires JavaScript",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

const faqJsonLd = {
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

const breadcrumbJsonLd = {
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
      name: "Dalton's Law Calculator",
      item: absoluteUrl(pagePath),
    },
  ],
};

export default function DaltonsLawCalculatorPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webApplicationJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <section className="tool-page-hero">
        <Container>
          <p className="eyebrow">Chemistry calculator</p>

          <h1>Dalton&apos;s Law Calculator</h1>

          <p className="tool-page-hero__description">
            Calculate the total pressure of a gas mixture
            or find a missing partial pressure using
            Ptotal = P₁ + P₂ + ⋯ + Pₙ, with automatic
            pressure-unit conversion.
          </p>

          <nav aria-label="Breadcrumb">
            <ol className="breadcrumb-list">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/calculators">Calculators</Link>
              </li>
              <li aria-current="page">
                Dalton&apos;s Law Calculator
              </li>
            </ol>
          </nav>
        </Container>
      </section>

      <section
        className="calculator-section"
        aria-label="Dalton's law calculator"
      >
        <Container>
          <DaltonsLawCalculator />
        </Container>
      </section>

      <section className="article-section">
        <Container className="article-layout">
          <article className="article-content">
            <section aria-labelledby="overview-heading">
              <p className="eyebrow">
                Partial-pressure guide
              </p>

              <h2 id="overview-heading">
                What is Dalton&apos;s law?
              </h2>

              <p>
                Dalton&apos;s law of partial pressures
                describes the pressure produced by a
                mixture of nonreacting gases. The total
                pressure equals the sum of the partial
                pressure contributed by every gas.
              </p>

              <p>
                Each gas behaves as though it occupies
                the container independently. Its partial
                pressure contributes to the measurable
                pressure of the complete mixture.
              </p>
            </section>

            <section aria-labelledby="formula-heading">
              <p className="eyebrow">Core equation</p>

              <h2 id="formula-heading">
                Dalton&apos;s law formula
              </h2>

              <div className="formula-block">
                <strong>
                  Ptotal = P₁ + P₂ + ⋯ + Pₙ
                </strong>
              </div>

              <ul className="article-list">
                <li>
                  Ptotal is the total pressure of the gas
                  mixture.
                </li>
                <li>
                  P₁, P₂, and Pₙ are the individual
                  partial pressures.
                </li>
                <li>
                  All pressures must use compatible units
                  before they are added.
                </li>
              </ul>
            </section>

            <section aria-labelledby="missing-heading">
              <p className="eyebrow">
                Find an unknown pressure
              </p>

              <h2 id="missing-heading">
                Missing partial pressure formula
              </h2>

              <div className="formula-block">
                <strong>
                  Pmissing = Ptotal − (P₁ + P₂ + ⋯ + Pₙ)
                </strong>
              </div>

              <p>
                Add the known partial pressures and
                subtract their sum from the measured
                total pressure. A valid total pressure
                must exceed the combined known partial
                pressures.
              </p>
            </section>

            <section aria-labelledby="example-heading">
              <p className="eyebrow">Worked example</p>

              <h2 id="example-heading">
                Calculate total pressure
              </h2>

              <p>
                A gas mixture contains nitrogen at
                0.78 atm, oxygen at 0.21 atm, and other
                gases at 0.01 atm. Find its total
                pressure.
              </p>

              <ol className="calculation-steps">
                <li>
                  Write the equation:{" "}
                  <strong>
                    Ptotal = P₁ + P₂ + P₃
                  </strong>.
                </li>
                <li>
                  Substitute the pressures:{" "}
                  <strong>
                    Ptotal = 0.78 + 0.21 + 0.01 atm
                  </strong>.
                </li>
                <li>
                  Add the values:{" "}
                  <strong>Ptotal = 1.00 atm</strong>.
                </li>
              </ol>
            </section>

            <section aria-labelledby="missing-example-heading">
              <p className="eyebrow">
                Missing-gas example
              </p>

              <h2 id="missing-example-heading">
                Calculate a missing partial pressure
              </h2>

              <p>
                A mixture has a total pressure of
                760 mmHg. Two known gases contribute
                300 mmHg and 250 mmHg.
              </p>

              <ol className="calculation-steps">
                <li>
                  Add known pressures:{" "}
                  <strong>
                    300 + 250 = 550 mmHg
                  </strong>.
                </li>
                <li>
                  Subtract from the total:{" "}
                  <strong>
                    760 − 550 = 210 mmHg
                  </strong>.
                </li>
                <li>
                  The missing partial pressure is{" "}
                  <strong>210 mmHg</strong>.
                </li>
              </ol>
            </section>

            <section aria-labelledby="units-heading">
              <p className="eyebrow">Supported units</p>

              <h2 id="units-heading">
                Dalton&apos;s law pressure units
              </h2>

              <ul className="article-list">
                <li>Pascals (Pa)</li>
                <li>Kilopascals (kPa)</li>
                <li>Bar</li>
                <li>Atmospheres (atm)</li>
                <li>Millimeters of mercury (mmHg)</li>
              </ul>

              <p>
                Mixed units are converted to pascals
                internally. The final value is then
                converted to the result unit you select.
              </p>
            </section>

            <section aria-labelledby="applications-heading">
              <p className="eyebrow">
                Practical applications
              </p>

              <h2 id="applications-heading">
                Where Dalton&apos;s law is used
              </h2>

              <ul className="article-list">
                <li>
                  Analyzing atmospheric and laboratory
                  gas mixtures.
                </li>
                <li>
                  Correcting gas pressure collected over
                  water.
                </li>
                <li>
                  Understanding breathing and respiratory
                  gas exchange.
                </li>
                <li>
                  Planning compressed-air and diving gas
                  mixtures.
                </li>
                <li>
                  Solving chemistry and ideal-gas
                  problems.
                </li>
              </ul>
            </section>

            <section aria-labelledby="water-heading">
              <p className="eyebrow">
                Gas collected over water
              </p>

              <h2 id="water-heading">
                Correct pressure for water vapor
              </h2>

              <p>
                Gas collected over water contains both
                the desired gas and water vapor. Subtract
                the water-vapor pressure from the total
                measured pressure:
              </p>

              <div className="formula-block">
                <strong>
                  Pgas = Ptotal − Pwater vapor
                </strong>
              </div>

              <p>
                Water-vapor pressure depends on
                temperature, so use a reliable vapor
                pressure table for the experiment&apos;s
                measured temperature.
              </p>
            </section>

            <section aria-labelledby="limits-heading">
              <p className="eyebrow">
                Calculation limits
              </p>

              <h2 id="limits-heading">
                Assumptions and common mistakes
              </h2>

              <ul className="article-list">
                <li>
                  Convert incompatible pressure units
                  before adding values.
                </li>
                <li>
                  Include every gas present in the
                  mixture.
                </li>
                <li>
                  Use positive pressure values.
                </li>
                <li>
                  Do not confuse partial pressure with
                  mole fraction.
                </li>
                <li>
                  Expect deviations for strongly
                  interacting or nonideal gases.
                </li>
              </ul>
            </section>

            <section aria-labelledby="related-heading">
              <p className="eyebrow">Related tools</p>

              <h2 id="related-heading">
                Continue your gas-law calculations
              </h2>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/ideal-gas-law-calculator"
                >
                  Ideal Gas Law Calculator
                </Link>{" "}
                when pressure, volume, moles, and
                temperature are involved.
              </p>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/combined-gas-law-calculator"
                >
                  Combined Gas Law Calculator
                </Link>{" "}
                when pressure, volume, and temperature
                change between two gas states.
              </p>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/gay-lussacs-law-calculator"
                >
                  Gay-Lussac&apos;s Law Calculator
                </Link>{" "}
                for pressure-temperature changes at
                constant volume.
              </p>
            </section>

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">
                Questions and answers
              </p>

              <h2 id="faq-heading">
                Dalton&apos;s law calculator FAQ
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

              <h2>Dalton&apos;s law checklist</h2>

              <ul>
                <li>Choose the value to calculate</li>
                <li>Enter all known pressures</li>
                <li>Select each pressure unit</li>
                <li>Choose the result unit</li>
                <li>Add or subtract pressures</li>
              </ul>
            </div>

            <div className="sidebar-card">
              <p className="sidebar-card__label">
                Related calculator
              </p>

              <h2>Use the ideal gas law</h2>

              <p>
                Include volume, moles, and temperature
                in your gas calculation.
              </p>

              <Link href="/calculators/ideal-gas-law-calculator">
                Open Ideal Gas Law Calculator
              </Link>
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
