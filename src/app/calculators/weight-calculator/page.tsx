import type { Metadata } from "next";
import Link from "next/link";

import { WeightCalculator } from "@/components/calculators/weight-calculator";
import { CalculatorTrustPanel } from "@/components/calculator-trust";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";

const pageTitle = "Weight Calculator | Mass & Gravity";

const pageDescription =
  "Calculate weight, mass, or gravitational acceleration using W = m × g, with examples for Earth and the Moon.";

const pagePath =
  "/calculators/weight-calculator";

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
      "What formula does the weight calculator use?",
    answer:
      "The calculator uses W = m × g, where W is weight in newtons, m is mass in kilograms, and g is gravitational acceleration in meters per second squared.",
  },
  {
    question:
      "What is the difference between mass and weight?",
    answer:
      "Mass measures the amount of matter in an object and remains constant, while weight is the gravitational force acting on that mass and changes when gravity changes.",
  },
  {
    question:
      "What value should I use for gravity on Earth?",
    answer:
      "Standard Earth gravity is 9.80665 meters per second squared. For many classroom calculations, 9.81 meters per second squared is sufficiently precise.",
  },
  {
    question:
      "Does an object's mass change on the Moon?",
    answer:
      "No. Mass remains the same, but weight decreases because the Moon's gravitational acceleration is much lower than Earth's.",
  },
  {
    question:
      "Is weight measured in kilograms or newtons?",
    answer:
      "In physics, weight is a force and is measured in newtons. Kilograms measure mass, not weight.",
  },
];

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: pageTitle,
  description: pageDescription,
  url: absoluteUrl(pagePath),
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

export default function WeightCalculatorPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            webApplicationSchema,
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
                Weight Calculator
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">
              Gravitational force tool
            </p>

            <h1>Weight Calculator</h1>

            <p>
              Calculate weight, mass, or gravitational
              acceleration from two known values using
              W = m × g.
            </p>
          </div>
        </Container>
      </section>

      <section
        className="tool-section"
        aria-label="Weight calculator"
      >
        <Container>
          <WeightCalculator />
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
                What is weight?
              </h2>

              <p>
                Weight is the gravitational force acting
                on an object. It depends on both the
                object&apos;s mass and the local
                gravitational acceleration.
              </p>

              <p>
                An object keeps the same mass when moved
                between planets or moons, but its weight
                changes because gravitational acceleration
                is different.
              </p>
            </section>

            <section aria-labelledby="formula-heading">
              <p className="eyebrow">Formula</p>

              <h2 id="formula-heading">
                Weight formula
              </h2>

              <div className="formula-card">
                <p>
                  Weight
                  <span>W = m × g</span>
                </p>
              </div>

              <ul className="article-list">
                <li>
                  <strong>W</strong> is weight in
                  newtons.
                </li>

                <li>
                  <strong>m</strong> is mass in
                  kilograms.
                </li>

                <li>
                  <strong>g</strong> is gravitational
                  acceleration in meters per second
                  squared.
                </li>
              </ul>
            </section>

            <section aria-labelledby="earth-example-heading">
              <p className="eyebrow">
                Worked example
              </p>

              <h2 id="earth-example-heading">
                Calculate the weight of a 10 kg object
                on Earth
              </h2>

              <ol className="calculation-steps">
                <li>
                  Write the formula:{" "}
                  <strong>W = m × g</strong>.
                </li>

                <li>
                  Substitute the values:{" "}
                  <strong>
                    W = 10 × 9.80665
                  </strong>.
                </li>

                <li>
                  Calculate the result:{" "}
                  <strong>W = 98.0665 N</strong>.
                </li>
              </ol>
            </section>

            <section aria-labelledby="moon-example-heading">
              <p className="eyebrow">
                Gravity comparison
              </p>

              <h2 id="moon-example-heading">
                Calculate weight on the Moon
              </h2>

              <p>
                A 60 kg person has a mass of 60 kg on both
                Earth and the Moon. Using lunar gravity
                of approximately 1.62 m/s²:
              </p>

              <div className="formula-card">
                <p>
                  Lunar weight
                  <span>
                    W = 60 × 1.62 = 97.2 N
                  </span>
                </p>
              </div>

              <p>
                The person&apos;s mass remains 60 kg, but
                the gravitational force acting on that
                mass is much smaller.
              </p>
            </section>

            <section aria-labelledby="rearranged-heading">
              <p className="eyebrow">
                Rearranged equations
              </p>

              <h2 id="rearranged-heading">
                Solve for mass or gravity
              </h2>

              <div className="comparison-grid">
                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Mass
                  </p>

                  <h3>m = W ÷ g</h3>

                  <p>
                    Divide weight by gravitational
                    acceleration.
                  </p>
                </article>

                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Gravity
                  </p>

                  <h3>g = W ÷ m</h3>

                  <p>
                    Divide weight by a positive mass.
                  </p>
                </article>
              </div>
            </section>

            <section aria-labelledby="mass-weight-heading">
              <p className="eyebrow">
                Important distinction
              </p>

              <h2 id="mass-weight-heading">
                Mass is not the same as weight
              </h2>

              <div className="comparison-grid">
                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Mass
                  </p>

                  <h3>Measured in kilograms</h3>

                  <p>
                    Mass describes the amount of matter
                    in an object and does not depend on
                    location.
                  </p>
                </article>

                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Weight
                  </p>

                  <h3>Measured in newtons</h3>

                  <p>
                    Weight is a force and changes when
                    gravitational acceleration changes.
                  </p>
                </article>
              </div>
            </section>

            <section aria-labelledby="earth-gravity-heading">
              <p className="eyebrow">
                Standard gravity
              </p>

              <h2 id="earth-gravity-heading">
                Which Earth gravity value should you use?
              </h2>

              <p>
                Standard gravitational acceleration is
                defined as 9.80665 m/s². Many school and
                laboratory problems round this value to
                9.81 m/s² or 9.8 m/s².
              </p>

              <p>
                Use the precision requested by your
                assignment or experiment. Do not round
                intermediate results too early when a
                precise final answer is required.
              </p>
            </section>

            <section aria-labelledby="force-heading">
              <p className="eyebrow">
                Relationship to force
              </p>

              <h2 id="force-heading">
                Weight is a specific type of force
              </h2>

              <p>
                Newton&apos;s second law states that force
                equals mass multiplied by acceleration.
                For weight calculations, the acceleration
                is specifically gravitational
                acceleration.
              </p>

              <div className="formula-card">
                <p>
                  General force
                  <span>F = m × a</span>
                </p>
              </div>

              <div className="formula-card">
                <p>
                  Gravitational force
                  <span>W = m × g</span>
                </p>
              </div>
            </section>

            <section aria-labelledby="units-heading">
              <p className="eyebrow">Units</p>

              <h2 id="units-heading">
                Use consistent SI units
              </h2>

              <ul className="article-list">
                <li>
                  Enter mass in kilograms.
                </li>

                <li>
                  Enter gravity in meters per second
                  squared.
                </li>

                <li>
                  Report weight in newtons.
                </li>

                <li>
                  Convert grams to kilograms before
                  calculating.
                </li>
              </ul>

              <div className="formula-card">
                <p>
                  One newton
                  <span>1 N = 1 kg·m/s²</span>
                </p>
              </div>
            </section>

            <section aria-labelledby="limitations-heading">
              <p className="eyebrow">
                Assumptions
              </p>

              <h2 id="limitations-heading">
                What the calculation represents
              </h2>

              <ul className="article-list">
                <li>
                  Mass and gravity must be greater than
                  zero.
                </li>

                <li>
                  Gravity is treated as constant for the
                  calculation.
                </li>

                <li>
                  The calculator uses SI units without
                  automatic unit conversion.
                </li>

                <li>
                  The result represents gravitational
                  force, not apparent weight caused by
                  additional acceleration.
                </li>
              </ul>
            </section>

            <section aria-labelledby="related-heading">
              <p className="eyebrow">
                Related tools
              </p>

              <h2 id="related-heading">
                Continue your gravity calculations
              </h2>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/force-calculator"
                >
                  Force Calculator
                </Link>{" "}
                to calculate general force, mass, or
                acceleration using Newton&apos;s second
                law.
              </p>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/acceleration-due-to-gravity-calculator"
                >
                  Acceleration Due to Gravity Calculator
                </Link>{" "}
                to estimate gravity from a celestial
                body&apos;s mass and radius.
              </p>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/gravitational-potential-energy-calculator"
                >
                  Gravitational Potential Energy
                  Calculator
                </Link>{" "}
                to calculate energy from mass, gravity,
                and height.
              </p>
            </section>

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">
                Questions and answers
              </p>

              <h2 id="faq-heading">
                Weight calculator FAQ
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

              <h2>Weight checklist</h2>

              <ul>
                <li>Use mass in kilograms</li>
                <li>Choose local gravity</li>
                <li>Apply W = m × g</li>
                <li>Report weight in newtons</li>
                <li>Keep mass and weight separate</li>
              </ul>
            </div>

            <div className="sidebar-card">
              <p className="sidebar-card__label">
                Related calculator
              </p>

              <h2>Calculate local gravity</h2>

              <p>
                Estimate gravitational acceleration from
                a planet&apos;s mass and radius.
              </p>

              <Link href="/calculators/acceleration-due-to-gravity-calculator">
                Open Gravity Calculator
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
