import type { Metadata } from "next";
import Link from "next/link";

import { AccelerationCalculator } from "@/components/calculators/acceleration-calculator";
import { CalculatorTrustPanel } from "@/components/calculator-trust";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";
import { createCalculatorSchema } from "@/lib/seo/calculator-schema";

const pageTitle = "Acceleration Calculator";
const pageDescription =
  "Calculate acceleration, initial velocity, final velocity, or time using the constant-acceleration formula.";

const pagePath =
  "/calculators/acceleration-calculator";

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
      "What formula does the acceleration calculator use?",
    answer:
      "It uses a equals final velocity minus initial velocity divided by time: a = (v − u) ÷ t.",
  },
  {
    question:
      "Can acceleration be negative?",
    answer:
      "Yes. Negative acceleration means velocity decreases in the selected positive direction.",
  },
  {
    question:
      "What units should I use?",
    answer:
      "Use meters per second for velocity, seconds for time, and meters per second squared for acceleration.",
  },
  {
    question:
      "Does this calculator assume constant acceleration?",
    answer:
      "Yes. The formula applies to average acceleration across the interval and is exact for constant acceleration.",
  },
] as const;

const calculatorSchema = createCalculatorSchema({
  name: pageTitle,
  description: pageDescription,
  slug: "acceleration-calculator",
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

export default function AccelerationCalculatorPage() {
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
                Acceleration Calculator
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">
              Physics motion tool
            </p>

            <h1>Acceleration Calculator</h1>

            <p>
              Solve acceleration, initial velocity,
              final velocity, or time from three known
              motion values.
            </p>
          </div>
        </Container>
      </section>

      <section
        className="tool-section"
        aria-label="Acceleration calculator"
      >
        <Container>
          <AccelerationCalculator />
        </Container>
      </section>

      <section className="article-section">
        <Container className="article-layout">
          <article className="article-content">
            <section aria-labelledby="overview-heading">
              <p className="eyebrow">
                Motion analysis
              </p>

              <h2 id="overview-heading">
                What is acceleration?
              </h2>

              <p>
                Acceleration is the rate at which velocity
                changes with time. It can describe
                speeding up, slowing down, or changing
                direction.
              </p>
            </section>

            <section aria-labelledby="formula-heading">
              <p className="eyebrow">Formula</p>

              <h2 id="formula-heading">
                Acceleration formula
              </h2>

              <div className="formula-card">
                <p>
                  Acceleration
                  <span>
                    a = (v − u) ÷ t
                  </span>
                </p>
              </div>

              <ul className="article-list">
                <li>
                  <strong>a</strong> is acceleration.
                </li>
                <li>
                  <strong>u</strong> is initial velocity.
                </li>
                <li>
                  <strong>v</strong> is final velocity.
                </li>
                <li>
                  <strong>t</strong> is elapsed time.
                </li>
              </ul>
            </section>

            <section aria-labelledby="example-heading">
              <p className="eyebrow">
                Worked example
              </p>

              <h2 id="example-heading">
                Velocity increases from 5 m/s to 25 m/s
                in 4 seconds
              </h2>

              <ol className="calculation-steps">
                <li>
                  Velocity change: 25 − 5 ={" "}
                  <strong>20 m/s</strong>.
                </li>
                <li>
                  Divide by time: 20 ÷ 4 ={" "}
                  <strong>5 m/s²</strong>.
                </li>
                <li>
                  The acceleration is{" "}
                  <strong>5 m/s²</strong>.
                </li>
              </ol>
            </section>

            <section aria-labelledby="negative-heading">
              <p className="eyebrow">
                Direction and signs
              </p>

              <h2 id="negative-heading">
                What does negative acceleration mean?
              </h2>

              <p>
                Negative acceleration means the velocity
                change is negative relative to the chosen
                positive direction. It does not always
                mean an object is slowing down; the result
                depends on the signs of velocity and
                acceleration.
              </p>
            </section>

            <section aria-labelledby="rearranged-heading">
              <p className="eyebrow">
                Rearranged equations
              </p>

              <h2 id="rearranged-heading">
                Solve for other motion variables
              </h2>

              <div className="comparison-grid">
                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Initial velocity
                  </p>
                  <h3>u = v − at</h3>
                  <p>
                    Subtract acceleration multiplied by
                    time from final velocity.
                  </p>
                </article>

                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Final velocity
                  </p>
                  <h3>v = u + at</h3>
                  <p>
                    Add acceleration multiplied by time
                    to initial velocity.
                  </p>
                </article>

                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Time
                  </p>
                  <h3>t = (v − u) ÷ a</h3>
                  <p>
                    Divide velocity change by non-zero
                    acceleration.
                  </p>
                </article>
              </div>
            </section>

            <section aria-labelledby="units-heading">
              <p className="eyebrow">Units</p>

              <h2 id="units-heading">
                Keep motion units consistent
              </h2>

              <p>
                This calculator uses meters per second for
                velocity, seconds for time, and meters per
                second squared for acceleration. Convert
                other units before calculating.
              </p>
            </section>

            <section aria-labelledby="limitations-heading">
              <p className="eyebrow">
                Assumptions
              </p>

              <h2 id="limitations-heading">
                When this formula applies
              </h2>

              <ul className="article-list">
                <li>
                  It calculates average acceleration over
                  the selected interval.
                </li>
                <li>
                  It is exact for constant acceleration.
                </li>
                <li>
                  Time must be greater than zero.
                </li>
                <li>
                  Direction must be represented
                  consistently with positive and negative
                  signs.
                </li>
              </ul>
            </section>

            <section aria-labelledby="related-heading">
              <p className="eyebrow">
                Related tools
              </p>

              <h2 id="related-heading">
                Continue analyzing motion data
              </h2>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/rate-of-change-calculator"
                >
                  Rate of Change Calculator
                </Link>{" "}
                for general two-point change calculations,
                or the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/linear-regression-calculator"
                >
                  Linear Regression Calculator
                </Link>{" "}
                to find the slope of a complete dataset.
              </p>

              <p>
                Review the{" "}
                <Link
                  className="article-inline-link"
                  href="/lab-reports/tables-and-graphs"
                >
                  Tables and Graphs Guide
                </Link>{" "}
                for presenting velocity and time data.
              </p>
            </section>

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">
                Questions and answers
              </p>

              <h2 id="faq-heading">
                Acceleration calculator FAQ
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

              <h2>Motion checklist</h2>

              <ul>
                <li>Choose a positive direction</li>
                <li>Use consistent velocity units</li>
                <li>Use a positive time interval</li>
                <li>Preserve negative signs</li>
                <li>Report acceleration in m/s²</li>
              </ul>
            </div>

            <div className="sidebar-card">
              <p className="sidebar-card__label">
                Related calculator
              </p>

              <h2>Measure general change</h2>

              <p>
                Calculate change between any two measured
                observations and their interval.
              </p>

              <Link href="/calculators/rate-of-change-calculator">
                Open Rate of Change Calculator
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
