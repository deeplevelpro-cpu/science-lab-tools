import type { Metadata } from "next";

import { RelatedCalculators } from "@/components/related-calculators";
import { getRelatedCalculators } from "@/content/calculators/get-related-calculators";
import { calculators } from "@/content/calculators/registry";
import Link from "next/link";

import { MomentumCalculator } from "@/components/calculators/momentum-calculator";
import { CalculatorTrustPanel } from "@/components/calculator-trust";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";
import { createCalculatorSchema } from "@/lib/seo/calculator-schema";

const pageTitle = "Momentum Calculator | Mass & Velocity";
const pageDescription =
  "Calculate linear momentum, mass, or velocity using p = mv, with signed motion values, supported SI units, and clear step-by-step calculation results.";

const pagePath =
  "/calculators/momentum-calculator";

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
      "What formula does the momentum calculator use?",
    answer:
      "It uses the linear momentum formula: momentum equals mass multiplied by velocity, p = m × v.",
  },
  {
    question:
      "What is the SI unit of momentum?",
    answer:
      "The SI unit of momentum is kilogram-meter per second, written as kg·m/s.",
  },
  {
    question:
      "Can momentum be negative?",
    answer:
      "Yes. Negative momentum means the object is moving in the direction defined as negative.",
  },
  {
    question:
      "Can mass be negative?",
    answer:
      "No. Mass must be greater than zero in this calculator.",
  },
] as const;

const calculatorSchema = createCalculatorSchema({
  name: pageTitle,
  description: pageDescription,
  slug: "momentum-calculator",
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



const relatedCalculators = getRelatedCalculators(
  "momentum-calculator",
  calculators,
);

export default function MomentumCalculatorPage() {
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
                Momentum Calculator
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">
              Linear momentum tool
            </p>

            <h1>Momentum Calculator</h1>

            <p>
              Solve momentum, mass, or velocity from
              two known values using p = m × v.
            </p>
          </div>
        </Container>
      </section>

      <section
        className="tool-section"
        aria-label="Momentum calculator"
      >
        <Container>
          <MomentumCalculator />
        </Container>
      </section>

      <section className="article-section">
        <Container className="article-layout">
          <article className="article-content">
            <section aria-labelledby="overview-heading">
              <p className="eyebrow">
                Motion and mass
              </p>

              <h2 id="overview-heading">
                What is momentum?
              </h2>

              <p>
                Linear momentum describes the quantity
                of motion carried by an object. It
                depends on both the object&apos;s mass
                and its velocity.
              </p>
            </section>

            <section aria-labelledby="formula-heading">
              <p className="eyebrow">Formula</p>

              <h2 id="formula-heading">
                Momentum formula
              </h2>

              <div className="formula-card">
                <p>
                  Momentum
                  <span>p = m × v</span>
                </p>
              </div>

              <ul className="article-list">
                <li>
                  <strong>p</strong> is momentum in
                  kilogram-meters per second.
                </li>
                <li>
                  <strong>m</strong> is mass in
                  kilograms.
                </li>
                <li>
                  <strong>v</strong> is velocity in
                  meters per second.
                </li>
              </ul>
            </section>

            <section aria-labelledby="example-heading">
              <p className="eyebrow">
                Worked example
              </p>

              <h2 id="example-heading">
                A 12 kg object moves at 5 m/s
              </h2>

              <ol className="calculation-steps">
                <li>
                  Write the formula:{" "}
                  <strong>p = m × v</strong>.
                </li>
                <li>
                  Substitute the values:{" "}
                  <strong>p = 12 × 5</strong>.
                </li>
                <li>
                  Calculate the momentum:{" "}
                  <strong>p = 60 kg·m/s</strong>.
                </li>
              </ol>
            </section>

            <section aria-labelledby="rearranged-heading">
              <p className="eyebrow">
                Rearranged equations
              </p>

              <h2 id="rearranged-heading">
                Solve for mass or velocity
              </h2>

              <div className="comparison-grid">
                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Mass
                  </p>

                  <h3>m = p ÷ v</h3>

                  <p>
                    Divide momentum by a non-zero
                    velocity. Momentum and velocity must
                    have matching signs.
                  </p>
                </article>

                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Velocity
                  </p>

                  <h3>v = p ÷ m</h3>

                  <p>
                    Divide momentum by a positive mass.
                  </p>
                </article>
              </div>
            </section>

            <section aria-labelledby="direction-heading">
              <p className="eyebrow">Direction</p>

              <h2 id="direction-heading">
                Positive and negative momentum
              </h2>

              <p>
                Momentum is a vector quantity. Its sign
                represents direction relative to the
                positive axis selected for the problem.
                A negative velocity therefore produces
                negative momentum when mass is positive.
              </p>
            </section>

            <section aria-labelledby="zero-heading">
              <p className="eyebrow">
                Stationary objects
              </p>

              <h2 id="zero-heading">
                When momentum equals zero
              </h2>

              <p>
                An object with zero velocity has zero
                momentum, regardless of its positive
                mass. Momentum may also become zero at
                the instant an object changes direction.
              </p>
            </section>

            <section aria-labelledby="units-heading">
              <p className="eyebrow">Units</p>

              <h2 id="units-heading">
                Standard SI units
              </h2>

              <p>
                Use kilograms for mass and meters per
                second for velocity. Convert grams,
                kilometers per hour, and other units
                before entering values.
              </p>

              <div className="formula-card">
                <p>
                  Momentum unit
                  <span>kg·m/s</span>
                </p>
              </div>
            </section>

            <section aria-labelledby="limitations-heading">
              <p className="eyebrow">
                Calculation checks
              </p>

              <h2 id="limitations-heading">
                Important input requirements
              </h2>

              <ul className="article-list">
                <li>
                  Mass must be greater than zero.
                </li>
                <li>
                  Velocity cannot be zero when solving
                  for mass.
                </li>
                <li>
                  Momentum and velocity must have
                  matching signs when calculating mass.
                </li>
                <li>
                  All entered values must be finite
                  numbers.
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
                Continue analyzing motion
              </h2>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/force-calculator"
                >
                  Force Calculator
                </Link>{" "}
                to solve Newton&apos;s second law
                problems involving force, mass, and
                acceleration.
              </p>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/acceleration-calculator"
                >
                  Acceleration Calculator
                </Link>{" "}
                to calculate velocity change over time,
                and review the{" "}
                <Link
                  className="article-inline-link"
                  href="/lab-reports/tables-and-graphs"
                >
                  Tables and Graphs Guide
                </Link>{" "}
                when presenting motion data.
              </p>
            </section>

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">
                Questions and answers
              </p>

              <h2 id="faq-heading">
                Momentum calculator FAQ
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

              <h2>Momentum checklist</h2>

              <ul>
                <li>Convert mass to kilograms</li>
                <li>Convert velocity to m/s</li>
                <li>Choose a positive direction</li>
                <li>Preserve negative signs</li>
                <li>Report momentum in kg·m/s</li>
              </ul>
            </div>

            <div className="sidebar-card">
              <p className="sidebar-card__label">
                Related calculator
              </p>

              <h2>Calculate force</h2>

              <p>
                Solve force, mass, or acceleration using
                Newton&apos;s second law.
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
    

      <RelatedCalculators
        calculators={relatedCalculators}
      />
</main>
  );
}
