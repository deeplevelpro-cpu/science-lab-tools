import type { Metadata } from "next";
import Link from "next/link";

import {
  AngularAccelerationCalculator,
} from "@/components/calculators/angular-acceleration-calculator";
import { CalculatorTrustPanel } from "@/components/calculator-trust";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";
import { createCalculatorSchema } from "@/lib/seo/calculator-schema";

const pageTitle =
  "Angular Acceleration Calculator";

const pageDescription =
  "Calculate angular acceleration, change in angular velocity, or elapsed time using α = Δω ÷ t, with supported units and clear step-by-step results.";

const pagePath =
  "/calculators/angular-acceleration-calculator";

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
      "What formula does the angular acceleration calculator use?",
    answer:
      "It uses α = Δω ÷ t, where angular acceleration equals the change in angular velocity divided by elapsed time.",
  },
  {
    question:
      "What is angular acceleration?",
    answer:
      "Angular acceleration measures how quickly angular velocity changes with time and is commonly expressed in radians per second squared.",
  },
  {
    question:
      "How do you calculate angular velocity change?",
    answer:
      "Multiply angular acceleration by time using Δω = αt.",
  },
  {
    question:
      "How do you calculate time from angular acceleration?",
    answer:
      "Divide angular velocity change by angular acceleration using t = Δω ÷ α.",
  },
] as const;

const calculatorSchema = createCalculatorSchema({
  name: pageTitle,
  description: pageDescription,
  slug: "angular-acceleration-calculator",
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

export default function AngularAccelerationCalculatorPage() {
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
                Angular Acceleration Calculator
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">
              Rotational motion tool
            </p>

            <h1>
              Angular Acceleration Calculator
            </h1>

            <p>
              Solve angular acceleration, angular
              velocity change, or time using
              α = Δω ÷ t.
            </p>
          </div>
        </Container>
      </section>

      <section
        className="tool-section"
        aria-label="Angular acceleration calculator"
      >
        <Container>
          <AngularAccelerationCalculator />
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
                What is angular acceleration?
              </h2>

              <p>
                Angular acceleration describes how
                quickly angular velocity changes with
                time. It is used when rotating objects
                speed up, slow down, or change their
                rotational rate.
              </p>
            </section>

            <section aria-labelledby="formula-heading">
              <p className="eyebrow">Formula</p>

              <h2 id="formula-heading">
                Angular acceleration formula
              </h2>

              <div className="formula-card">
                <p>
                  Angular Acceleration
                  <span>α = Δω ÷ t</span>
                </p>
              </div>

              <ul className="article-list">
                <li>
                  <strong>α</strong> is angular
                  acceleration in radians per second
                  squared.
                </li>
                <li>
                  <strong>Δω</strong> is the change
                  in angular velocity in radians per
                  second.
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
                Angular velocity changes by 12 rad/s
                in 4 seconds
              </h2>

              <ol className="calculation-steps">
                <li>
                  Write the formula:{" "}
                  <strong>α = Δω ÷ t</strong>.
                </li>
                <li>
                  Substitute the values:{" "}
                  <strong>α = 12 ÷ 4</strong>.
                </li>
                <li>
                  Calculate angular acceleration:{" "}
                  <strong>α = 3 rad/s²</strong>.
                </li>
              </ol>
            </section>

            <section aria-labelledby="rearranged-heading">
              <p className="eyebrow">
                Rearranged equations
              </p>

              <h2 id="rearranged-heading">
                Solve for velocity change or time
              </h2>

              <div className="comparison-grid">
                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Angular velocity change
                  </p>

                  <h3>Δω = αt</h3>

                  <p>
                    Multiply angular acceleration by
                    elapsed time.
                  </p>
                </article>

                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Time
                  </p>

                  <h3>t = Δω ÷ α</h3>

                  <p>
                    Divide angular velocity change by
                    angular acceleration.
                  </p>
                </article>
              </div>
            </section>

            <section aria-labelledby="units-heading">
              <p className="eyebrow">Units</p>

              <h2 id="units-heading">
                Standard rotational units
              </h2>

              <p>
                Use radians per second squared for
                angular acceleration, radians per
                second for angular velocity change,
                and seconds for time.
              </p>
            </section>

            <section aria-labelledby="change-heading">
              <p className="eyebrow">
                Velocity change
              </p>

              <h2 id="change-heading">
                Understanding Δω
              </h2>

              <p>
                Angular velocity change is the
                difference between final and initial
                angular velocity. In general,
                Δω = ωf − ωi.
              </p>
            </section>

            <section aria-labelledby="applications-heading">
              <p className="eyebrow">
                Real-world applications
              </p>

              <h2 id="applications-heading">
                Where angular acceleration is used
              </h2>

              <ul className="article-list">
                <li>
                  Motors starting or slowing down.
                </li>
                <li>
                  Rotating laboratory equipment.
                </li>
                <li>
                  Wheels, gears, and flywheels.
                </li>
                <li>
                  Turbines and generators.
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
                  Angular acceleration, velocity
                  change, and time must be greater
                  than zero.
                </li>
                <li>
                  Angular velocity change must use
                  radians per second.
                </li>
                <li>
                  Time must match the same motion
                  interval.
                </li>
                <li>
                  The formula calculates average
                  angular acceleration.
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
                  href="/calculators/angular-velocity-calculator"
                >
                  Angular Velocity Calculator
                </Link>{" "}
                to calculate angular velocity,
                displacement, or time.
              </p>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/circular-velocity-calculator"
                >
                  Circular Velocity Calculator
                </Link>{" "}
                to calculate tangential speed,
                radius, or period.
              </p>
            </section>

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">
                Questions and answers
              </p>

              <h2 id="faq-heading">
                Angular acceleration calculator FAQ
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
                Angular acceleration checklist
              </h2>

              <ul>
                <li>
                  Find the angular velocity change
                </li>
                <li>Use seconds for time</li>
                <li>Apply α = Δω ÷ t</li>
                <li>Check positive input values</li>
                <li>Report results in rad/s²</li>
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
                displacement, or time using
                ω = θ ÷ t.
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
    </main>
  );
}
