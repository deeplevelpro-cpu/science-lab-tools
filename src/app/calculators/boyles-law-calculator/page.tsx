import type { Metadata } from "next";
import Link from "next/link";

import { CalculatorTrustPanel } from "@/components/calculator-trust";
import { BoylesLawCalculator } from "@/components/calculators/boyles-law-calculator";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";
import { createCalculatorSchema } from "@/lib/seo/calculator-schema";

const pagePath = "/calculators/boyles-law-calculator";
const pageTitle = "Boyle's Law Calculator";
const pageDescription =
  "Calculate initial or final pressure and volume using Boyle's law, P₁V₁ = P₂V₂. Supports atm, kPa, Pa, bar, mmHg, liters, and milliliters.";

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
    question: "What formula does the Boyle's law calculator use?",
    answer:
      "The calculator uses P₁V₁ = P₂V₂, where P₁ and V₁ are the initial pressure and volume and P₂ and V₂ are the final pressure and volume.",
  },
  {
    question: "What must remain constant when using Boyle's law?",
    answer:
      "The amount of gas and its temperature must remain constant. Boyle's law describes an isothermal change for a fixed quantity of gas.",
  },
  {
    question: "Can Boyle's law calculate any of the four variables?",
    answer:
      "Yes. Enter three known positive values and select initial pressure, initial volume, final pressure, or final volume as the unknown.",
  },
  {
    question: "Can I use different pressure and volume units?",
    answer:
      "Yes. The calculator converts supported pressure and volume units internally before applying Boyle's law and returns the answer in your selected output unit.",
  },
  {
    question: "Why are pressure and volume inversely proportional?",
    answer:
      "At constant temperature, reducing a gas volume increases the frequency of particle collisions with the container walls, so its pressure rises.",
  },
] as const;

const calculatorSchema = createCalculatorSchema({
  name: pageTitle,
  description: pageDescription,
  slug: "boyles-law-calculator",
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

export default function BoylesLawCalculatorPage() {
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
                Boyle&apos;s Law Calculator
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">
              Chemistry gas-law calculator
            </p>

            <h1>Boyle&apos;s Law Calculator</h1>

            <p>
              Calculate initial or final pressure and
              volume using P₁V₁ = P₂V₂ with automatic
              pressure and volume unit conversion.
            </p>
          </div>
        </Container>
      </section>

      <section
        className="tool-section"
        aria-label="Boyle's law calculator"
      >
        <Container>
          <BoylesLawCalculator />
        </Container>
      </section>

      <section className="article-section">
        <Container className="article-layout">
          <article className="article-content">
            <section aria-labelledby="overview-heading">
              <p className="eyebrow">
                Chemistry overview
              </p>

              <h2 id="overview-heading">
                What is Boyle&apos;s law?
              </h2>

              <p>
                Boyle&apos;s law describes how the
                pressure and volume of a fixed amount of
                gas change when temperature remains
                constant. As volume decreases, pressure
                increases. As volume increases, pressure
                decreases.
              </p>

              <p>
                This inverse relationship is commonly
                used to solve gas compression and
                expansion problems in chemistry and
                physics.
              </p>
            </section>

            <section aria-labelledby="formula-heading">
              <p className="eyebrow">Formula</p>

              <h2 id="formula-heading">
                Boyle&apos;s law formula
              </h2>

              <div className="formula-card">
                <p>
                  Constant-temperature gas relationship
                  <span>P₁V₁ = P₂V₂</span>
                </p>
              </div>

              <ul className="article-list">
                <li>
                  <strong>P₁</strong> is the initial gas
                  pressure.
                </li>
                <li>
                  <strong>V₁</strong> is the initial gas
                  volume.
                </li>
                <li>
                  <strong>P₂</strong> is the final gas
                  pressure.
                </li>
                <li>
                  <strong>V₂</strong> is the final gas
                  volume.
                </li>
              </ul>
            </section>

            <section aria-labelledby="rearranged-heading">
              <p className="eyebrow">
                Rearranged equations
              </p>

              <h2 id="rearranged-heading">
                Solve for pressure or volume
              </h2>

              <div className="comparison-grid">
                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Initial pressure
                  </p>
                  <h3>P₁ = P₂V₂ ÷ V₁</h3>
                  <p>
                    Divide the final pressure-volume
                    product by the initial volume.
                  </p>
                </article>

                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Initial volume
                  </p>
                  <h3>V₁ = P₂V₂ ÷ P₁</h3>
                  <p>
                    Divide the final pressure-volume
                    product by the initial pressure.
                  </p>
                </article>

                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Final pressure
                  </p>
                  <h3>P₂ = P₁V₁ ÷ V₂</h3>
                  <p>
                    Divide the initial pressure-volume
                    product by the final volume.
                  </p>
                </article>

                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Final volume
                  </p>
                  <h3>V₂ = P₁V₁ ÷ P₂</h3>
                  <p>
                    Divide the initial pressure-volume
                    product by the final pressure.
                  </p>
                </article>
              </div>
            </section>

            <section aria-labelledby="example-heading">
              <p className="eyebrow">
                Worked example
              </p>

              <h2 id="example-heading">
                Calculate pressure after compression
              </h2>

              <p>
                A gas has an initial pressure of 1 atm
                and an initial volume of 2 L. It is
                compressed to 1 L at constant
                temperature. Find the final pressure.
              </p>

              <ol className="calculation-steps">
                <li>
                  Write the equation:{" "}
                  <strong>P₁V₁ = P₂V₂</strong>.
                </li>
                <li>
                  Rearrange it:{" "}
                  <strong>P₂ = P₁V₁ ÷ V₂</strong>.
                </li>
                <li>
                  Substitute the known values:{" "}
                  <strong>
                    P₂ = (1 atm × 2 L) ÷ 1 L
                  </strong>.
                </li>
                <li>
                  Calculate the result:{" "}
                  <strong>P₂ = 2 atm</strong>.
                </li>
              </ol>

              <p>
                Halving the volume doubles the pressure
                because pressure and volume are inversely
                proportional under Boyle&apos;s law.
              </p>
            </section>

            <section aria-labelledby="units-heading">
              <p className="eyebrow">
                Supported units
              </p>

              <h2 id="units-heading">
                Pressure and volume units
              </h2>

              <p>
                The calculator converts values to
                consistent SI units before solving the
                equation, so supported units can be
                mixed safely.
              </p>

              <ul className="article-list">
                <li>
                  Pressure: pascals, kilopascals, bar,
                  atmospheres, and millimeters of
                  mercury.
                </li>
                <li>
                  Volume: cubic meters, liters, and
                  milliliters.
                </li>
                <li>
                  The calculated answer uses the unit
                  selected for the unknown variable.
                </li>
              </ul>
            </section>

            <section aria-labelledby="conditions-heading">
              <p className="eyebrow">
                Required conditions
              </p>

              <h2 id="conditions-heading">
                When Boyle&apos;s law applies
              </h2>

              <ul className="article-list">
                <li>
                  The temperature of the gas remains
                  constant.
                </li>
                <li>
                  The amount of gas remains fixed.
                </li>
                <li>
                  No gas enters or leaves the system.
                </li>
                <li>
                  Pressure values are absolute rather
                  than gauge pressure.
                </li>
                <li>
                  The gas behaves approximately as an
                  ideal gas.
                </li>
              </ul>
            </section>

            <section aria-labelledby="graph-heading">
              <p className="eyebrow">
                Inverse relationship
              </p>

              <h2 id="graph-heading">
                Understanding the pressure-volume graph
              </h2>

              <p>
                A graph of pressure against volume at
                constant temperature forms a downward
                curve called an isotherm. Equal
                increases in volume do not produce equal
                decreases in pressure because the
                relationship is inverse rather than
                linear.
              </p>

              <p>
                A graph of pressure against reciprocal
                volume, 1/V, is linear when Boyle&apos;s
                law applies.
              </p>
            </section>

            <section aria-labelledby="limitations-heading">
              <p className="eyebrow">
                Calculation limits
              </p>

              <h2 id="limitations-heading">
                Important limitations and mistakes
              </h2>

              <ul className="article-list">
                <li>
                  Do not use Boyle&apos;s law if the gas
                  temperature changes significantly.
                </li>
                <li>
                  Do not substitute gauge pressure
                  without first converting it to
                  absolute pressure.
                </li>
                <li>
                  All entered pressure and volume values
                  must be greater than zero.
                </li>
                <li>
                  Real gases can depart from ideal
                  behavior at high pressure or near
                  condensation.
                </li>
                <li>
                  Keep pressure and volume units
                  physically consistent with their
                  selected fields.
                </li>
              </ul>
            </section>

            <section aria-labelledby="related-heading">
              <p className="eyebrow">
                Related tools
              </p>

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
                  href="/calculators/pressure-calculator"
                >
                  Pressure Calculator
                </Link>{" "}
                to calculate pressure from force and
                area.
              </p>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/density-calculator"
                >
                  Density Calculator
                </Link>{" "}
                to calculate mass, volume, or density.
              </p>
            </section>

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">
                Questions and answers
              </p>

              <h2 id="faq-heading">
                Boyle&apos;s law calculator FAQ
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

              <h2>Boyle&apos;s law checklist</h2>

              <ul>
                <li>Select the unknown variable</li>
                <li>Enter the other three values</li>
                <li>Choose pressure and volume units</li>
                <li>Keep temperature constant</li>
                <li>Apply P₁V₁ = P₂V₂</li>
              </ul>
            </div>

            <div className="sidebar-card">
              <p className="sidebar-card__label">
                Related calculator
              </p>

              <h2>Use the ideal gas law</h2>

              <p>
                Include moles and temperature in your
                gas calculation.
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
