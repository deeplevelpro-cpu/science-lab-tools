import type { Metadata } from "next";

import { RelatedCalculators } from "@/components/related-calculators";
import { getRelatedCalculators } from "@/content/calculators/get-related-calculators";
import { calculators } from "@/content/calculators/registry";
import Link from "next/link";

import { RateOfChangeCalculator } from "@/components/calculators/rate-of-change-calculator";
import { CalculatorTrustPanel } from "@/components/calculator-trust";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";
import { createCalculatorSchema } from "@/lib/seo/calculator-schema";

const pageTitle = "Rate of Change Calculator";
const pageDescription =
  "Calculate absolute change, percentage change, independent-variable interval, and average rate of change from two observations.";

const pagePath =
  "/calculators/rate-of-change-calculator";

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
      "What is average rate of change?",
    answer:
      "Average rate of change is the change in the measured value divided by the change in the corresponding independent variable.",
  },
  {
    question:
      "Is average rate of change the same as slope?",
    answer:
      "Between two points, average rate of change is the slope of the secant line connecting those points.",
  },
  {
    question:
      "How is percentage change calculated?",
    answer:
      "Percentage change equals final value minus initial value, divided by the absolute initial value, multiplied by 100 percent.",
  },
  {
    question:
      "Why is percentage change undefined when the initial value is zero?",
    answer:
      "Percentage change requires division by the initial value, so it is undefined when the initial value equals zero.",
  },
] as const;

const calculatorSchema = createCalculatorSchema({
  name: pageTitle,
  description: pageDescription,
  slug: "rate-of-change-calculator",
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
  "rate-of-change-calculator",
  calculators,
);

export default function RateOfChangeCalculatorPage() {
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
                Rate of Change Calculator
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">
              Experimental trend tool
            </p>

            <h1>Rate of Change Calculator</h1>

            <p>
              Calculate how quickly a measured quantity
              increases, decreases, or remains constant
              across an interval.
            </p>
          </div>
        </Container>
      </section>

      <section
        className="tool-section"
        aria-label="Rate of change calculator"
      >
        <Container>
          <RateOfChangeCalculator />
        </Container>
      </section>

      <section className="article-section">
        <Container className="article-layout">
          <article className="article-content">
            <section aria-labelledby="overview-heading">
              <p className="eyebrow">
                Trend measurement
              </p>

              <h2 id="overview-heading">
                What does rate of change measure?
              </h2>

              <p>
                Rate of change describes how much a
                measured quantity changes for each unit
                change in another variable, such as time,
                distance, temperature, or concentration.
              </p>
            </section>

            <section aria-labelledby="formula-heading">
              <p className="eyebrow">Formula</p>

              <h2 id="formula-heading">
                Average rate of change formula
              </h2>

              <div className="formula-card">
                <p>
                  Average rate of change
                  <span>
                    (final value − initial value) ÷
                    (final independent value − initial
                    independent value)
                  </span>
                </p>
              </div>
            </section>

            <section aria-labelledby="example-heading">
              <p className="eyebrow">
                Worked example
              </p>

              <h2 id="example-heading">
                Temperature increases from 20 to 35 in 5 minutes
              </h2>

              <ol className="calculation-steps">
                <li>
                  Change in temperature: 35 − 20 ={" "}
                  <strong>15</strong>.
                </li>
                <li>
                  Change in time: 5 − 0 ={" "}
                  <strong>5</strong>.
                </li>
                <li>
                  Average rate of change: 15 ÷ 5 ={" "}
                  <strong>3 units per minute</strong>.
                </li>
                <li>
                  Percentage change: 15 ÷ 20 × 100 ={" "}
                  <strong>75%</strong>.
                </li>
              </ol>
            </section>

            <section aria-labelledby="direction-heading">
              <p className="eyebrow">
                Direction
              </p>

              <h2 id="direction-heading">
                Interpret positive, negative, and zero rates
              </h2>

              <div className="comparison-grid">
                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Positive rate
                  </p>
                  <h3>Increasing trend</h3>
                  <p>
                    The measured value rises across the
                    selected interval.
                  </p>
                </article>

                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Negative rate
                  </p>
                  <h3>Decreasing trend</h3>
                  <p>
                    The measured value falls across the
                    selected interval.
                  </p>
                </article>
              </div>

              <p>
                A rate of zero means the measured value did
                not change across the interval.
              </p>
            </section>

            <section aria-labelledby="units-heading">
              <p className="eyebrow">
                Units
              </p>

              <h2 id="units-heading">
                Report both variable units
              </h2>

              <p>
                A rate should be reported as the measured
                variable unit per independent-variable
                unit, such as degrees Celsius per minute,
                centimeters per second, or grams per hour.
              </p>
            </section>

            <section aria-labelledby="percentage-heading">
              <p className="eyebrow">
                Relative change
              </p>

              <h2 id="percentage-heading">
                Percentage change formula
              </h2>

              <div className="formula-card">
                <p>
                  Percentage change
                  <span>
                    (final value − initial value) ÷
                    |initial value| × 100%
                  </span>
                </p>
              </div>

              <p>
                Percentage change is undefined when the
                initial value is zero because division by
                zero is not possible.
              </p>
            </section>

            <section aria-labelledby="limitations-heading">
              <p className="eyebrow">
                Limitations
              </p>

              <h2 id="limitations-heading">
                Average rate can hide variation
              </h2>

              <ul className="article-list">
                <li>
                  It summarizes only the selected start and
                  end points.
                </li>
                <li>
                  It may hide changes that occurred within
                  the interval.
                </li>
                <li>
                  A graph should be inspected for curvature,
                  plateaus, and anomalies.
                </li>
                <li>
                  Units and experimental context must be
                  stated clearly.
                </li>
              </ul>
            </section>

            <section aria-labelledby="related-heading">
              <p className="eyebrow">
                Related analysis
              </p>

              <h2 id="related-heading">
                Compare two-point and multi-point trends
              </h2>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/linear-regression-calculator"
                >
                  Linear Regression Calculator
                </Link>{" "}
                when analyzing a complete paired dataset
                rather than only two observations.
              </p>

              <p>
                Review the{" "}
                <Link
                  className="article-inline-link"
                  href="/scientific-method/analyze-experimental-results"
                >
                  Experimental Results Analysis Guide
                </Link>{" "}
                and the{" "}
                <Link
                  className="article-inline-link"
                  href="/lab-reports/tables-and-graphs"
                >
                  Tables and Graphs Guide
                </Link>{" "}
                for interpretation and presentation.
              </p>
            </section>

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">
                Questions and answers
              </p>

              <h2 id="faq-heading">
                Rate of change FAQ
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

              <h2>Rate checklist</h2>

              <ul>
                <li>Record initial and final values</li>
                <li>Record matching independent values</li>
                <li>Keep units consistent</li>
                <li>Calculate both changes</li>
                <li>Report measured units per interval unit</li>
              </ul>
            </div>

            <div className="sidebar-card">
              <p className="sidebar-card__label">
                Related calculator
              </p>

              <h2>Analyze a full data series</h2>

              <p>
                Fit a best-fit line and calculate slope,
                correlation, and R squared.
              </p>

              <Link href="/calculators/linear-regression-calculator">
                Open Linear Regression Calculator
              </Link>
            </div>
          </aside>
        </Container>
        <Container>
          <CalculatorTrustPanel subject="laboratory" />
        </Container>
      </section>
    

      <RelatedCalculators
        calculators={relatedCalculators}
      />
</main>
  );
}
