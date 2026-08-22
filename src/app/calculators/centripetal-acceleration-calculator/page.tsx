import type { Metadata } from "next";

import { RelatedCalculators } from "@/components/related-calculators";
import { getRelatedCalculators } from "@/content/calculators/get-related-calculators";
import { calculators } from "@/content/calculators/registry";
import Link from "next/link";

import {
  CentripetalAccelerationCalculator,
} from "@/components/calculators/centripetal-acceleration-calculator";
import { CalculatorTrustPanel } from "@/components/calculator-trust";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";
import { createCalculatorSchema } from "@/lib/seo/calculator-schema";
import { createFAQSchema } from "@/lib/seo/faq-schema";

const pageTitle =
  "Centripetal Acceleration Calculator";

const pageDescription =
  "Calculate centripetal acceleration, tangential velocity, or radius using ac = v² ÷ r, with physics explanations, units, and step-by-step results.";

const pagePath =
  "/calculators/centripetal-acceleration-calculator";

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
      "What formula does the centripetal acceleration calculator use?",
    answer:
      "It uses ac = v² ÷ r, where centripetal acceleration equals velocity squared divided by radius.",
  },
  {
    question:
      "What is centripetal acceleration?",
    answer:
      "Centripetal acceleration is the inward net force that keeps an object moving along a circular path.",
  },
  {
    question:
      "What is the SI unit of centripetal acceleration?",
    answer:
      "The SI unit of centripetal acceleration is the newton, written as N.",
  },
  {
    question:
      "How does velocity affect centripetal acceleration?",
    answer:
      "Centripetal acceleration increases with the square of velocity, so doubling velocity produces four times the force when mass and radius remain constant.",
  },
] as const;

const calculatorSchema = createCalculatorSchema({
  name: pageTitle,
  description: pageDescription,
  slug: "centripetal-acceleration-calculator",
  category: "Physics",
});

const faqSchema = createFAQSchema(faqItems);

const relatedCalculators = getRelatedCalculators(
  "centripetal-acceleration-calculator",
  calculators,
);

export default function CentripetalAccelerationCalculatorPage() {
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
                Centripetal Acceleration Calculator
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">
              Circular motion tool
            </p>

            <h1>
              Centripetal Acceleration Calculator
            </h1>

            <p>
              Solve centripetal acceleration, velocity,
              or radius using ac = v² ÷ r.
            </p>
          </div>
        </Container>
      </section>

      <section
        className="tool-section"
        aria-label="Centripetal acceleration calculator"
      >
        <Container>
          <CentripetalAccelerationCalculator />
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
                What is centripetal acceleration?
              </h2>

              <p>
                Centripetal acceleration is the inward net
                force that continually changes the
                direction of an object moving in a
                circle.
              </p>
            </section>

            <section aria-labelledby="formula-heading">
              <p className="eyebrow">Formula</p>

              <h2 id="formula-heading">
                Centripetal acceleration formula
              </h2>

              <div className="formula-card">
                <p>
                  Centripetal Force
                  <span>ac = v² ÷ r</span>
                </p>
              </div>

              <ul className="article-list">
                <li>
                  <strong>Fc</strong> is centripetal
                  force in newtons.
                </li>
                <li>

                </li>
                <li>
                  <strong>v</strong> is tangential
                  velocity in meters per second.
                </li>
                <li>
                  <strong>r</strong> is radius in
                  meters.
                </li>
              </ul>
            </section>

            <section aria-labelledby="example-heading">
              <p className="eyebrow">
                Worked example
              </p>

              <h2 id="example-heading">
                A 4 kg object moves at 6 m/s in a
                3 m radius circle
              </h2>

              <ol className="calculation-steps">
                <li>
                  Write the formula:{" "}
                  <strong>ac = v² ÷ r</strong>.
                </li>
                <li>
                  Substitute the values:{" "}
                  <strong>
                    Fc = 4 × 6² ÷ 3
                  </strong>.
                </li>
                <li>
                  Calculate the force:{" "}
                  <strong>Fc = 48 N</strong>.
                </li>
              </ol>
            </section>

            <section aria-labelledby="rearranged-heading">
              <p className="eyebrow">
                Rearranged equations
              </p>

              <h2 id="rearranged-heading">
                Solve for velocity or radius
              </h2>

              <div className="comparison-grid">
                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Mass
                  </p>

                  <h3>m = Fc r ÷ v²</h3>

                  <p>
                    Multiply force by radius, then
                    divide by velocity squared.
                  </p>
                </article>

                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Velocity
                  </p>

                  <h3>v = √(Fc r ÷ m)</h3>

                  <p>
                    Take the square root after
                    dividing force times radius by
                    mass.
                  </p>
                </article>

                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Radius
                  </p>

                  <h3>r = mv² ÷ Fc</h3>

                  <p>
                    Divide mass times velocity
                    squared by force.
                  </p>
                </article>
              </div>
            </section>

            <section aria-labelledby="velocity-heading">
              <p className="eyebrow">
                Velocity effect
              </p>

              <h2 id="velocity-heading">
                Why velocity is squared
              </h2>

              <p>
                Centripetal acceleration is proportional to
                velocity squared. If velocity
                doubles, the required inward force
                becomes four times greater when mass
                and radius stay unchanged.
              </p>
            </section>

            <section aria-labelledby="units-heading">
              <p className="eyebrow">Units</p>

              <h2 id="units-heading">
                Standard SI units
              </h2>

              <p>
                Use newtons for centripetal acceleration,
                kilograms for mass, meters per second
                for velocity, and meters for radius.
              </p>
            </section>

            <section aria-labelledby="applications-heading">
              <p className="eyebrow">
                Real-world applications
              </p>

              <h2 id="applications-heading">
                Where centripetal acceleration is used
              </h2>

              <ul className="article-list">
                <li>
                  Vehicles turning on curved roads.
                </li>
                <li>
                  Objects rotating on strings.
                </li>
                <li>
                  Roller coasters and amusement
                  rides.
                </li>
                <li>
                  Satellites and orbital motion.
                </li>
                <li>
                  Laboratory circular-motion
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
                  All entered values must be greater
                  than zero.
                </li>
                <li>
                  Velocity is tangential to the
                  circular path.
                </li>
                <li>
                  Radius is measured from the center
                  of rotation.
                </li>
                <li>
                  The result represents the net
                  inward force, not a separate type
                  of physical force.
                </li>
                <li>
                  Units are not converted
                  automatically.
                </li>
              </ul>
            </section>

            <section aria-labelledby="related-heading">
              <p className="eyebrow">
                Related tools
              </p>

              <h2 id="related-heading">
                Continue your motion calculations
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
                  href="/calculators/kinetic-energy-calculator"
                >
                  Kinetic Energy Calculator
                </Link>{" "}
                to calculate energy from mass and
                velocity.
              </p>
            </section>

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">
                Questions and answers
              </p>

              <h2 id="faq-heading">
                Centripetal acceleration calculator FAQ
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

              <h2>
                Centripetal acceleration checklist
              </h2>

              <ul>
                <li>Use mass in kilograms</li>
                <li>
                  Use velocity in meters per second
                </li>
                <li>Use radius in meters</li>
                <li>Square the velocity</li>
                <li>Apply ac = v² ÷ r</li>
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
    

      <RelatedCalculators
        calculators={relatedCalculators}
      />
</main>
  );
}
