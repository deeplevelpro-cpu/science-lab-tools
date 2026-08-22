import type { Metadata } from "next";

import { RelatedCalculators } from "@/components/related-calculators";
import { getRelatedCalculators } from "@/content/calculators/get-related-calculators";
import { calculators } from "@/content/calculators/registry";
import Link from "next/link";

import {
  RotationalKineticEnergyCalculator,
} from "@/components/calculators/rotational-kinetic-energy-calculator";
import { CalculatorTrustPanel } from "@/components/calculator-trust";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";
import { createCalculatorSchema } from "@/lib/seo/calculator-schema";
import { createFAQSchema } from "@/lib/seo/faq-schema";

const pageTitle =
  "Rotational Kinetic Energy Calculator";

const pageDescription =
  "Calculate rotational kinetic energy, moment of inertia, or angular velocity using KE = ½Iω², with SI units and step-by-step results.";

const pagePath =
  "/calculators/rotational-kinetic-energy-calculator";

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
      "What formula does the rotational kinetic energy calculator use?",
    answer:
      "It uses KErot = ½Iω², where rotational kinetic energy depends on moment of inertia and the square of angular velocity.",
  },
  {
    question:
      "What is rotational kinetic energy?",
    answer:
      "Rotational kinetic energy is the energy an object has because it is rotating.",
  },
  {
    question:
      "What is moment of inertia?",
    answer:
      "Moment of inertia measures how strongly an object resists changes in rotational motion.",
  },
  {
    question:
      "How do you calculate angular velocity from rotational kinetic energy?",
    answer:
      "Use ω = √(2KErot ÷ I), where KErot is rotational kinetic energy and I is moment of inertia.",
  },
] as const;

const calculatorSchema = createCalculatorSchema({
  name: pageTitle,
  description: pageDescription,
  slug: "rotational-kinetic-energy-calculator",
  category: "Physics",
});

const faqSchema = createFAQSchema(faqItems);

const relatedCalculators = getRelatedCalculators(
  "rotational-kinetic-energy-calculator",
  calculators,
);

export default function RotationalKineticEnergyCalculatorPage() {
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
                Rotational Kinetic Energy Calculator
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">
              Rotational energy tool
            </p>

            <h1>
              Rotational Kinetic Energy Calculator
            </h1>

            <p>
              Solve rotational kinetic energy,
              moment of inertia, or angular velocity
              using KErot = ½Iω².
            </p>
          </div>
        </Container>
      </section>

      <section
        className="tool-section"
        aria-label="Rotational kinetic energy calculator"
      >
        <Container>
          <RotationalKineticEnergyCalculator />
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
                What is rotational kinetic energy?
              </h2>

              <p>
                Rotational kinetic energy is the
                energy stored in a rotating object.
                It depends on the object&apos;s
                moment of inertia and angular
                velocity.
              </p>
            </section>

            <section aria-labelledby="formula-heading">
              <p className="eyebrow">Formula</p>

              <h2 id="formula-heading">
                Rotational kinetic energy formula
              </h2>

              <div className="formula-card">
                <p>
                  Rotational Kinetic Energy
                  <span>KErot = ½Iω²</span>
                </p>
              </div>

              <ul className="article-list">
                <li>
                  <strong>KErot</strong> is rotational
                  kinetic energy in joules.
                </li>
                <li>
                  <strong>I</strong> is moment of
                  inertia in kilogram square meters.
                </li>
                <li>
                  <strong>ω</strong> is angular
                  velocity in radians per second.
                </li>
              </ul>
            </section>

            <section aria-labelledby="example-heading">
              <p className="eyebrow">
                Worked example
              </p>

              <h2 id="example-heading">
                A rotating object has I = 4 kg·m² and
                ω = 3 rad/s
              </h2>

              <ol className="calculation-steps">
                <li>
                  Write the formula:{" "}
                  <strong>KErot = ½Iω²</strong>.
                </li>
                <li>
                  Substitute the values:{" "}
                  <strong>
                    KErot = ½ × 4 × 3²
                  </strong>.
                </li>
                <li>
                  Square angular velocity:{" "}
                  <strong>3² = 9</strong>.
                </li>
                <li>
                  Calculate the energy:{" "}
                  <strong>KErot = 18 J</strong>.
                </li>
              </ol>
            </section>

            <section aria-labelledby="rearranged-heading">
              <p className="eyebrow">
                Rearranged equations
              </p>

              <h2 id="rearranged-heading">
                Solve for moment of inertia or
                angular velocity
              </h2>

              <div className="comparison-grid">
                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Moment of inertia
                  </p>

                  <h3>I = 2KErot ÷ ω²</h3>

                  <p>
                    Double the rotational kinetic
                    energy and divide by angular
                    velocity squared.
                  </p>
                </article>

                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Angular velocity
                  </p>

                  <h3>ω = √(2KErot ÷ I)</h3>

                  <p>
                    Divide twice the energy by moment
                    of inertia, then take the square
                    root.
                  </p>
                </article>
              </div>
            </section>

            <section aria-labelledby="inertia-heading">
              <p className="eyebrow">
                Rotational resistance
              </p>

              <h2 id="inertia-heading">
                Why moment of inertia matters
              </h2>

              <p>
                Moment of inertia depends on both
                mass and how that mass is distributed
                around the axis of rotation. Moving
                mass farther from the axis generally
                increases moment of inertia.
              </p>
            </section>

            <section aria-labelledby="velocity-heading">
              <p className="eyebrow">
                Squared relationship
              </p>

              <h2 id="velocity-heading">
                Angular velocity has a large effect
              </h2>

              <p>
                Rotational kinetic energy increases
                with the square of angular velocity.
                Doubling angular velocity increases
                rotational kinetic energy by a
                factor of four when moment of inertia
                stays constant.
              </p>
            </section>

            <section aria-labelledby="units-heading">
              <p className="eyebrow">Units</p>

              <h2 id="units-heading">
                Standard SI units
              </h2>

              <p>
                Use joules for rotational kinetic
                energy, kilogram square meters for
                moment of inertia, and radians per
                second for angular velocity.
              </p>
            </section>

            <section aria-labelledby="applications-heading">
              <p className="eyebrow">
                Real-world applications
              </p>

              <h2 id="applications-heading">
                Where rotational kinetic energy is
                used
              </h2>

              <ul className="article-list">
                <li>
                  Flywheels and energy-storage
                  systems.
                </li>
                <li>
                  Wheels, gears, and rotating shafts.
                </li>
                <li>
                  Turbines and electric motors.
                </li>
                <li>
                  Rotating laboratory equipment.
                </li>
                <li>
                  Planetary and satellite rotation.
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
                  Moment of inertia is assumed to be
                  known for the selected axis.
                </li>
                <li>
                  Angular velocity must be expressed
                  consistently.
                </li>
                <li>
                  Energy losses from friction are not
                  included.
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
                Continue your rotational-motion
                analysis
              </h2>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/angular-velocity-calculator"
                >
                  Angular Velocity Calculator
                </Link>{" "}
                to calculate angular velocity,
                angular displacement, or time.
              </p>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/kinetic-energy-calculator"
                >
                  Kinetic Energy Calculator
                </Link>{" "}
                to calculate translational kinetic
                energy from mass and velocity.
              </p>
            </section>

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">
                Questions and answers
              </p>

              <h2 id="faq-heading">
                Rotational kinetic energy FAQ
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
                Rotational energy checklist
              </h2>

              <ul>
                <li>Use energy in joules</li>
                <li>
                  Use moment of inertia in kg·m²
                </li>
                <li>
                  Use angular velocity in rad/s
                </li>
                <li>Apply KErot = ½Iω²</li>
                <li>
                  Check the angular velocity square
                </li>
              </ul>
            </div>

            <div className="sidebar-card">
              <p className="sidebar-card__label">
                Related calculator
              </p>

              <h2>
                Calculate angular velocity
              </h2>

              <p>
                Solve angular velocity, angular
                displacement, or time using ω = θ ÷ t.
              </p>

              <Link href="/calculators/angular-velocity-calculator">
                Open Angular Velocity Calculator
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
