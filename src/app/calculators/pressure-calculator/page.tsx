import type { Metadata } from "next";
import Link from "next/link";

import {
  PressureCalculator,
} from "@/components/calculators/pressure-calculator";
import { CalculatorTrustPanel } from "@/components/calculator-trust";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";
import { createCalculatorSchema } from "@/lib/seo/calculator-schema";

const pageTitle = "Pressure Calculator | Force & Area";

const pageDescription =
  "Calculate pressure, force, or area using P = F ÷ A, with pascal and area-unit guidance, formula explanations, and clear step-by-step results.";

const pagePath =
  "/calculators/pressure-calculator";

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
    question:
      "What formula does the pressure calculator use?",
    answer:
      "It uses P = F ÷ A, where pressure equals force divided by area.",
  },
  {
    question:
      "What is the SI unit of pressure?",
    answer:
      "The SI unit of pressure is the pascal, written as Pa. One pascal equals one newton per square meter.",
  },
  {
    question:
      "How do you calculate force from pressure?",
    answer:
      "Multiply pressure by area using F = P × A.",
  },
  {
    question:
      "How do you calculate area from pressure?",
    answer:
      "Divide force by pressure using A = F ÷ P.",
  },
] as const;

const calculatorSchema = createCalculatorSchema({
  name: pageTitle,
  description: pageDescription,
  slug: "pressure-calculator",
  category: "Physics",
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

export default function PressureCalculatorPage() {
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
                Pressure Calculator
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">
              Force per unit area
            </p>

            <h1>Pressure Calculator</h1>

            <p>
              Solve pressure, force, or area using
              P = F ÷ A.
            </p>
          </div>
        </Container>
      </section>

      <section
        className="tool-section"
        aria-label="Pressure calculator"
      >
        <Container>
          <PressureCalculator />
        </Container>
      </section>

      <section className="article-section">
        <Container className="article-layout">
          <article className="article-content">
            <section aria-labelledby="overview-heading">
              <p className="eyebrow">
                Physics overview
              </p>

              <h2 id="overview-heading">
                What is pressure?
              </h2>

              <p>
                Pressure measures how much force acts
                over a given area. The same force
                produces greater pressure when it is
                concentrated over a smaller surface.
              </p>
            </section>

            <section aria-labelledby="formula-heading">
              <p className="eyebrow">Formula</p>

              <h2 id="formula-heading">
                Pressure formula
              </h2>

              <div className="formula-card">
                <p>
                  Pressure
                  <span>P = F ÷ A</span>
                </p>
              </div>

              <ul className="article-list">
                <li>
                  <strong>P</strong> is pressure in
                  pascals.
                </li>
                <li>
                  <strong>F</strong> is force in
                  newtons.
                </li>
                <li>
                  <strong>A</strong> is area in square
                  meters.
                </li>
              </ul>
            </section>

            <section aria-labelledby="example-heading">
              <p className="eyebrow">
                Worked example
              </p>

              <h2 id="example-heading">
                A 500 N force acts over 2 m²
              </h2>

              <ol className="calculation-steps">
                <li>
                  Write the formula:{" "}
                  <strong>P = F ÷ A</strong>.
                </li>
                <li>
                  Substitute the values:{" "}
                  <strong>P = 500 ÷ 2</strong>.
                </li>
                <li>
                  Calculate the pressure:{" "}
                  <strong>P = 250 Pa</strong>.
                </li>
              </ol>
            </section>

            <section aria-labelledby="rearranged-heading">
              <p className="eyebrow">
                Rearranged equations
              </p>

              <h2 id="rearranged-heading">
                Solve for force or area
              </h2>

              <div className="comparison-grid">
                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Force
                  </p>

                  <h3>F = P × A</h3>

                  <p>
                    Multiply pressure by area.
                  </p>
                </article>

                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Area
                  </p>

                  <h3>A = F ÷ P</h3>

                  <p>
                    Divide force by pressure.
                  </p>
                </article>
              </div>
            </section>

            <section aria-labelledby="units-heading">
              <p className="eyebrow">Units</p>

              <h2 id="units-heading">
                Standard SI units
              </h2>

              <p>
                Use pascals for pressure, newtons for
                force, and square meters for area.
                One pascal is equal to one newton per
                square meter.
              </p>
            </section>

            <section aria-labelledby="applications-heading">
              <p className="eyebrow">
                Real-world applications
              </p>

              <h2 id="applications-heading">
                Where pressure calculations are used
              </h2>

              <ul className="article-list">
                <li>
                  Contact pressure between solid
                  surfaces.
                </li>
                <li>
                  Mechanical loads acting on plates
                  and supports.
                </li>
                <li>
                  Hydraulic and pneumatic systems.
                </li>
                <li>
                  Laboratory force and area
                  experiments.
                </li>
              </ul>
            </section>

            <section aria-labelledby="limitations-heading">
              <p className="eyebrow">
                Calculation limits
              </p>

              <h2 id="limitations-heading">
                Important assumptions
              </h2>

              <ul className="article-list">
                <li>
                  Pressure, force, and area must be
                  greater than zero.
                </li>
                <li>
                  Force is assumed to act evenly over
                  the stated area.
                </li>
                <li>
                  Area should be measured in square
                  meters for a result in pascals.
                </li>
                <li>
                  The calculator does not automatically
                  convert units.
                </li>
              </ul>
            </section>

            <section aria-labelledby="related-heading">
              <p className="eyebrow">
                Related tools
              </p>

              <h2 id="related-heading">
                Continue your physics calculations
              </h2>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/force-calculator"
                >
                  Force Calculator
                </Link>{" "}
                to solve force, mass, or acceleration.
              </p>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/work-calculator"
                >
                  Work Calculator
                </Link>{" "}
                to calculate work, force, or distance.
              </p>
            </section>

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">
                Questions and answers
              </p>

              <h2 id="faq-heading">
                Pressure calculator FAQ
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

              <h2>Pressure checklist</h2>

              <ul>
                <li>Use force in newtons</li>
                <li>Use area in square meters</li>
                <li>Apply P = F ÷ A</li>
                <li>Report pressure in pascals</li>
                <li>Check that all values are positive</li>
              </ul>
            </div>

            <div className="sidebar-card">
              <p className="sidebar-card__label">
                Related calculator
              </p>

              <h2>Calculate force</h2>

              <p>
                Solve force, mass, or acceleration
                using F = ma.
              </p>

              <Link href="/calculators/force-calculator">
                Open Force Calculator
              </Link>
            </div>
          </aside>
        </Container>
        <Container>
          <CalculatorTrustPanel subject="physics" />
        </Container>
      </section>
    </main>
  );
}
