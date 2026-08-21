import type { Metadata } from "next";

import { RelatedCalculators } from "@/components/related-calculators";
import { getRelatedCalculators } from "@/content/calculators/get-related-calculators";
import { calculators } from "@/content/calculators/registry";
import Link from "next/link";

import {
  AngularDisplacementCalculator,
} from "@/components/calculators/angular-displacement-calculator";
import { CalculatorTrustPanel } from "@/components/calculator-trust";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";
import { createCalculatorSchema } from "@/lib/seo/calculator-schema";

const pageTitle =
  "Angular Displacement Calculator";

const pageDescription =
  "Calculate angular displacement, angular velocity, or elapsed time using θ = ωt, with unit guidance, formula explanations, and worked calculation steps.";

const pagePath =
  "/calculators/angular-displacement-calculator";

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
      "What formula does the angular displacement calculator use?",
    answer:
      "It uses θ = ω × t, where angular displacement equals angular velocity multiplied by elapsed time.",
  },
  {
    question:
      "What is angular displacement?",
    answer:
      "Angular velocity measures how quickly angular position changes with time and is commonly expressed in radians per second.",
  },
  {
    question:
      "How do you calculate angular displacement?",
    answer:
      "Multiply angular velocity by time using θ = ω × t.",
  },
  {
    question:
      "How do you calculate time from angular displacement?",
    answer:
      "Divide angular displacement by angular velocity using t = θ ÷ ω.",
  },
] as const;

const calculatorSchema = createCalculatorSchema({
  name: pageTitle,
  description: pageDescription,
  slug: "angular-displacement-calculator",
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
  "angular-displacement-calculator",
  calculators,
);

export default function AngularDisplacementCalculatorPage() {
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
                Angular Displacement Calculator
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">
              Rotational motion tool
            </p>

            <h1>
              Angular Displacement Calculator
            </h1>

            <p>
              Solve angular displacement, angular
              displacement, or time using θ = ω × t.
            </p>
          </div>
        </Container>
      </section>

      <section
        className="tool-section"
        aria-label="Angular displacement calculator"
      >
        <Container>
          <AngularDisplacementCalculator />
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
                What is angular displacement?
              </h2>

              <p>
                Angular displacement describes how
                quickly an object changes its angular
                position. It is used to analyze
                rotating wheels, laboratory
                equipment, motors, gears, and other
                rotational systems.
              </p>
            </section>

            <section aria-labelledby="formula-heading">
              <p className="eyebrow">Formula</p>

              <h2 id="formula-heading">
                Angular displacement formula
              </h2>

              <div className="formula-card">
                <p>
                  Angular Velocity
                  <span>θ = ω × t</span>
                </p>
              </div>

              <ul className="article-list">
                <li>
                  <strong>θ</strong> is angular
                  velocity in radians per second.
                </li>
                <li>
                  <strong>θ</strong> is angular
                  displacement in radians.
                </li>
                <li>
                  <strong>t</strong> is elapsed time
                  in seconds.
                </li>
              </ul>
            </section>

            <section aria-labelledby="example-heading">
              <p className="eyebrow">
                Worked example
              </p>

              <h2 id="example-heading">
                An object rotates through 12 radians
                in 4 seconds
              </h2>

              <ol className="calculation-steps">
                <li>
                  Write the formula:{" "}
                  <strong>θ = ω × t</strong>.
                </li>
                <li>
                  Substitute the values:{" "}
                  <strong>θ = 12 ÷ 4</strong>.
                </li>
                <li>
                  Calculate angular displacement:{" "}
                  <strong>θ = 12 rad</strong>.
                </li>
              </ol>
            </section>

            <section aria-labelledby="rearranged-heading">
              <p className="eyebrow">
                Rearranged equations
              </p>

              <h2 id="rearranged-heading">
                Solve for displacement or time
              </h2>

              <div className="comparison-grid">
                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Angular displacement
                  </p>

                  <h3>θ = ω × t</h3>

                  <p>
                    Multiply angular displacement by
                    elapsed time.
                  </p>
                </article>

                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Time
                  </p>

                  <h3>t = θ ÷ ω</h3>

                  <p>
                    Divide angular displacement by
                    angular displacement.
                  </p>
                </article>
              </div>
            </section>

            <section aria-labelledby="units-heading">
              <p className="eyebrow">Units</p>

              <h2 id="units-heading">
                Standard angular-motion units
              </h2>

              <p>
                Use radians per second for angular
                velocity, radians for angular
                displacement, and seconds for time.
                Convert degrees to radians before
                using the calculator when necessary.
              </p>
            </section>

            <section aria-labelledby="direction-heading">
              <p className="eyebrow">
                Direction of rotation
              </p>

              <h2 id="direction-heading">
                Angular displacement can include direction
              </h2>

              <p>
                In vector-based physics problems, the
                sign of angular displacement can indicate
                clockwise or counterclockwise
                rotation. This calculator uses
                positive magnitudes for general
                educational calculations.
              </p>
            </section>

            <section aria-labelledby="applications-heading">
              <p className="eyebrow">
                Real-world applications
              </p>

              <h2 id="applications-heading">
                Where angular displacement is used
              </h2>

              <ul className="article-list">
                <li>
                  Rotating laboratory instruments.
                </li>
                <li>
                  Motors, turbines, and generators.
                </li>
                <li>
                  Wheels, gears, and pulleys.
                </li>
                <li>
                  Planetary and satellite rotation.
                </li>
                <li>
                  Rotational-motion experiments.
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
                  Angular displacement, displacement, and
                  time must be greater than zero.
                </li>
                <li>
                  Angular displacement must be entered
                  in radians.
                </li>
                <li>
                  Time must represent the same motion
                  interval as the displacement.
                </li>
                <li>
                  The formula calculates average
                  angular displacement over the interval.
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
                Continue your rotational-motion analysis
              </h2>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/circular-velocity-calculator"
                >
                  Circular Velocity Calculator
                </Link>{" "}
                to calculate tangential velocity,
                radius, or period.
              </p>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/centripetal-acceleration-calculator"
                >
                  Centripetal Acceleration Calculator
                </Link>{" "}
                to calculate inward acceleration,
                velocity, or radius.
              </p>
            </section>

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">
                Questions and answers
              </p>

              <h2 id="faq-heading">
                Angular displacement calculator FAQ
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
                Angular displacement checklist
              </h2>

              <ul>
                <li>Use radians for displacement</li>
                <li>Use seconds for time</li>
                <li>Apply θ = ω × t</li>
                <li>Check positive input values</li>
                <li>Report results in rad/s</li>
              </ul>
            </div>

            <div className="sidebar-card">
              <p className="sidebar-card__label">
                Related calculator
              </p>

              <h2>
                Calculate circular velocity
              </h2>

              <p>
                Solve tangential velocity, radius, or
                period using v = 2πr ÷ T.
              </p>

              <Link href="/calculators/circular-velocity-calculator">
                Open Circular Velocity Calculator
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
