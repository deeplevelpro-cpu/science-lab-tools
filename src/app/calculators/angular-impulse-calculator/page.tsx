import type { Metadata } from "next";

import { RelatedCalculators } from "@/components/related-calculators";
import { getRelatedCalculators } from "@/content/calculators/get-related-calculators";
import { calculators } from "@/content/calculators/registry";
import Link from "next/link";

import {
  AngularImpulseCalculator,
} from "@/components/calculators/angular-impulse-calculator";
import { CalculatorTrustPanel } from "@/components/calculator-trust";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";
import { createCalculatorSchema } from "@/lib/seo/calculator-schema";
import { createFAQSchema } from "@/lib/seo/faq-schema";

const pageTitle =
  "Angular Impulse Calculator";

const pageDescription =
  "Calculate angular impulse, torque, time, or change in angular momentum using J = τt = ΔL, with validated inputs and step-by-step results.";

const pagePath =
  "/calculators/angular-impulse-calculator";

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
      "What formula does the angular impulse calculator use?",
    answer:
      "It uses J = τt = ΔL, where angular impulse equals torque multiplied by time and also equals the change in angular momentum.",
  },
  {
    question:
      "What is angular impulse?",
    answer:
      "Angular impulse measures the rotational effect of torque acting over a time interval.",
  },
  {
    question:
      "How do you calculate torque from angular impulse?",
    answer:
      "Divide angular impulse by time using τ = J ÷ t.",
  },
  {
    question:
      "What units are used for angular impulse?",
    answer:
      "Angular impulse is measured in newton meter seconds, written as N·m·s.",
  },
] as const;

const calculatorSchema = createCalculatorSchema({
  name: pageTitle,
  description: pageDescription,
  slug: "angular-impulse-calculator",
  category: "Physics",
});

const faqSchema = createFAQSchema(faqItems);

const relatedCalculators = getRelatedCalculators(
  "angular-impulse-calculator",
  calculators,
);

export default function AngularImpulseCalculatorPage() {
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
                Angular Impulse Calculator
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">
              Rotational mechanics tool
            </p>

            <h1>
              Angular Impulse Calculator
            </h1>

            <p>
              Solve angular impulse, torque, or time
              using J = τt = ΔL.
            </p>
          </div>
        </Container>
      </section>

      <section
        className="tool-section"
        aria-label="Angular impulse calculator"
      >
        <Container>
          <AngularImpulseCalculator />
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
                What is angular impulse?
              </h2>

              <p>
                Angular impulse describes the effect
                of torque acting over a time interval.
                It equals the resulting change in
                angular momentum.
              </p>
            </section>

            <section aria-labelledby="formula-heading">
              <p className="eyebrow">Formula</p>

              <h2 id="formula-heading">
                Angular impulse formula
              </h2>

              <div className="formula-card">
                <p>
                  Angular Impulse
                  <span>J = τt = ΔL</span>
                </p>
              </div>

              <ul className="article-list">
                <li>
                  <strong>J</strong> is angular
                  impulse in N·m·s.
                </li>
                <li>
                  <strong>τ</strong> is torque in
                  N·m.
                </li>
                <li>
                  <strong>t</strong> is time in
                  seconds.
                </li>
                <li>
                  <strong>ΔL</strong> is the change
                  in angular momentum.
                </li>
              </ul>
            </section>

            <section aria-labelledby="example-heading">
              <p className="eyebrow">
                Worked example
              </p>

              <h2 id="example-heading">
                A torque of 8 N·m acts for 3 seconds
              </h2>

              <ol className="calculation-steps">
                <li>
                  Write the formula:{" "}
                  <strong>J = τt</strong>.
                </li>
                <li>
                  Substitute the values:{" "}
                  <strong>J = 8 × 3</strong>.
                </li>
                <li>
                  Calculate angular impulse:{" "}
                  <strong>J = 24 N·m·s</strong>.
                </li>
              </ol>
            </section>

            <section aria-labelledby="rearranged-heading">
              <p className="eyebrow">
                Rearranged equations
              </p>

              <h2 id="rearranged-heading">
                Solve for torque or time
              </h2>

              <div className="comparison-grid">
                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Torque
                  </p>

                  <h3>τ = J ÷ t</h3>

                  <p>
                    Divide angular impulse by time.
                  </p>
                </article>

                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Time
                  </p>

                  <h3>t = J ÷ τ</h3>

                  <p>
                    Divide angular impulse by torque.
                  </p>
                </article>
              </div>
            </section>

            <section aria-labelledby="momentum-heading">
              <p className="eyebrow">
                Angular momentum relationship
              </p>

              <h2 id="momentum-heading">
                Angular impulse equals ΔL
              </h2>

              <p>
                The angular impulse applied to an
                object equals its change in angular
                momentum. A larger torque or a longer
                application time produces a larger
                rotational momentum change.
              </p>
            </section>

            <section aria-labelledby="units-heading">
              <p className="eyebrow">Units</p>

              <h2 id="units-heading">
                Standard SI units
              </h2>

              <p>
                Use newton meter seconds for angular
                impulse, newton meters for torque, and
                seconds for time.
              </p>
            </section>

            <section aria-labelledby="applications-heading">
              <p className="eyebrow">
                Real-world applications
              </p>

              <h2 id="applications-heading">
                Where angular impulse is used
              </h2>

              <ul className="article-list">
                <li>
                  Starting and stopping rotating
                  machinery.
                </li>
                <li>
                  Applying torque to wheels and
                  flywheels.
                </li>
                <li>
                  Sports involving rotational motion.
                </li>
                <li>
                  Motor and turbine performance
                  analysis.
                </li>
                <li>
                  Studying changes in angular
                  momentum.
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
                  Torque is treated as constant during
                  the time interval.
                </li>
                <li>
                  The torque direction is not
                  represented.
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
                Continue your rotational analysis
              </h2>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/torque-calculator"
                >
                  Torque Calculator
                </Link>{" "}
                to calculate torque, force, or lever
                arm distance.
              </p>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/angular-momentum-calculator"
                >
                  Angular Momentum Calculator
                </Link>{" "}
                to calculate angular momentum, moment
                of inertia, or angular velocity.
              </p>
            </section>

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">
                Questions and answers
              </p>

              <h2 id="faq-heading">
                Angular impulse calculator FAQ
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
                Angular impulse checklist
              </h2>

              <ul>
                <li>
                  Use angular impulse in N·m·s
                </li>
                <li>Use torque in N·m</li>
                <li>Use time in seconds</li>
                <li>Apply J = τt = ΔL</li>
                <li>Check all values are positive</li>
              </ul>
            </div>

            <div className="sidebar-card">
              <p className="sidebar-card__label">
                Related calculator
              </p>

              <h2>
                Calculate angular momentum
              </h2>

              <p>
                Solve angular momentum, moment of
                inertia, or angular velocity using
                L = Iω.
              </p>

              <Link href="/calculators/angular-momentum-calculator">
                Open Angular Momentum Calculator
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
