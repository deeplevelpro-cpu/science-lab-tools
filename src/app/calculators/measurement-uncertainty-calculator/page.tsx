import type { Metadata } from "next";
import Link from "next/link";

import { MeasurementUncertaintyCalculator } from "@/components/calculators/measurement-uncertainty-calculator";
import { CalculatorTrustPanel } from "@/components/calculator-trust";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";
import { createCalculatorSchema } from "@/lib/seo/calculator-schema";

const pageTitle =
  "Measurement Uncertainty Calculator";
const pageDescription =
  "Calculate relative uncertainty, percentage uncertainty, measurement range, and plus-or-minus notation from a measured value and absolute uncertainty.";

const pagePath =
  "/calculators/measurement-uncertainty-calculator";

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
    question: "What is absolute uncertainty?",
    answer:
      "Absolute uncertainty is the plus-or-minus amount attached to a measured value and is normally written in the same unit as the measurement.",
  },
  {
    question: "How is relative uncertainty calculated?",
    answer:
      "Relative uncertainty equals absolute uncertainty divided by the absolute measured value.",
  },
  {
    question: "How is percentage uncertainty calculated?",
    answer:
      "Percentage uncertainty equals relative uncertainty multiplied by 100 percent.",
  },
  {
    question: "Why can the measured value not be zero?",
    answer:
      "Relative and percentage uncertainty require division by the measured value, so they are undefined when the measured value is zero.",
  },
] as const;

const calculatorSchema = createCalculatorSchema({
  name: pageTitle,
  description: pageDescription,
  slug: "measurement-uncertainty-calculator",
  category: "Laboratory",
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

export default function MeasurementUncertaintyCalculatorPage() {
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
                Measurement Uncertainty Calculator
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">
              Laboratory uncertainty tool
            </p>

            <h1>
              Measurement Uncertainty Calculator
            </h1>

            <p>
              Convert absolute uncertainty into relative
              uncertainty, percentage uncertainty, and a
              measurement range.
            </p>
          </div>
        </Container>
      </section>

      <section
        className="tool-section"
        aria-label="Measurement uncertainty calculator"
      >
        <Container>
          <MeasurementUncertaintyCalculator />
        </Container>
      </section>

      <section className="article-section">
        <Container className="article-layout">
          <article className="article-content">
            <section aria-labelledby="overview-heading">
              <p className="eyebrow">
                Measurement quality
              </p>

              <h2 id="overview-heading">
                What is measurement uncertainty?
              </h2>

              <p>
                Measurement uncertainty describes the
                estimated range around a reported value. It
                communicates that an experimental
                measurement is not perfectly exact.
              </p>
            </section>

            <section aria-labelledby="notation-heading">
              <p className="eyebrow">
                Reporting format
              </p>

              <h2 id="notation-heading">
                Plus-or-minus notation
              </h2>

              <div className="formula-card">
                <p>
                  Measurement notation
                  <span>
                    measured value ± absolute uncertainty
                  </span>
                </p>
              </div>

              <p>
                The measured value and absolute uncertainty
                should normally use the same unit.
              </p>
            </section>

            <section aria-labelledby="relative-heading">
              <p className="eyebrow">
                Relative uncertainty
              </p>

              <h2 id="relative-heading">
                Compare uncertainty to the measurement
              </h2>

              <div className="formula-card">
                <p>
                  Relative uncertainty
                  <span>
                    absolute uncertainty ÷ |measured value|
                  </span>
                </p>
              </div>

              <p>
                Relative uncertainty expresses the
                uncertainty as a fraction of the measurement
                size.
              </p>
            </section>

            <section aria-labelledby="percentage-heading">
              <p className="eyebrow">
                Percentage form
              </p>

              <h2 id="percentage-heading">
                Percentage uncertainty formula
              </h2>

              <div className="formula-card">
                <p>
                  Percentage uncertainty
                  <span>
                    relative uncertainty × 100%
                  </span>
                </p>
              </div>
            </section>

            <section aria-labelledby="example-heading">
              <p className="eyebrow">
                Worked example
              </p>

              <h2 id="example-heading">
                Calculate uncertainty for 50 ± 2
              </h2>

              <ol className="calculation-steps">
                <li>
                  Measured value = <strong>50</strong>.
                </li>
                <li>
                  Absolute uncertainty ={" "}
                  <strong>2</strong>.
                </li>
                <li>
                  Relative uncertainty = 2 ÷ 50 ={" "}
                  <strong>0.04</strong>.
                </li>
                <li>
                  Percentage uncertainty ={" "}
                  <strong>4%</strong>.
                </li>
                <li>
                  Measurement range ={" "}
                  <strong>48 to 52</strong>.
                </li>
              </ol>
            </section>

            <section aria-labelledby="interpret-heading">
              <p className="eyebrow">
                Interpretation
              </p>

              <h2 id="interpret-heading">
                What does a lower uncertainty mean?
              </h2>

              <p>
                A lower relative or percentage uncertainty
                indicates that the uncertainty is small
                compared with the measured value. This often
                suggests greater measurement precision.
              </p>

              <p>
                Uncertainty should still be interpreted in
                relation to the instrument, experimental
                method, sample size, and research question.
              </p>
            </section>

            <section aria-labelledby="reporting-heading">
              <p className="eyebrow">
                Scientific reporting
              </p>

              <h2 id="reporting-heading">
                Report uncertainty clearly
              </h2>

              <ul className="article-list">
                <li>
                  Include the correct measurement unit.
                </li>
                <li>
                  Use consistent decimal places.
                </li>
                <li>
                  State how the uncertainty was estimated.
                </li>
                <li>
                  Add error bars when uncertainty is shown
                  on a graph.
                </li>
                <li>
                  Discuss important sources of uncertainty
                  in the lab report discussion.
                </li>
              </ul>
            </section>

            <section aria-labelledby="related-heading">
              <p className="eyebrow">
                Related resources
              </p>

              <h2 id="related-heading">
                Analyze and report measurement quality
              </h2>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/lab-reports/significant-figures-in-lab-reports"
                >
                  Significant Figures Guide
                </Link>{" "}
                for measurement precision and the{" "}
                <Link
                  className="article-inline-link"
                  href="/lab-reports/lab-report-discussion"
                >
                  Lab Report Discussion Guide
                </Link>{" "}
                to evaluate uncertainty and limitations.
              </p>

              <p>
                Review the{" "}
                <Link
                  className="article-inline-link"
                  href="/lab-reports/tables-and-graphs"
                >
                  Tables and Graphs Guide
                </Link>{" "}
                before adding uncertainty or error bars to
                scientific graphs.
              </p>
            </section>

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">
                Questions and answers
              </p>

              <h2 id="faq-heading">
                Measurement uncertainty FAQ
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

              <h2>Uncertainty checklist</h2>

              <ul>
                <li>Use matching units</li>
                <li>Enter a non-zero measured value</li>
                <li>Use a non-negative uncertainty</li>
                <li>Report the plus-or-minus notation</li>
                <li>Explain the uncertainty source</li>
              </ul>
            </div>

            <div className="sidebar-card">
              <p className="sidebar-card__label">
                Related calculator
              </p>

              <h2>Check measurement accuracy</h2>

              <p>
                Compare an experimental result with an
                accepted value.
              </p>

              <Link href="/calculators/percent-error-calculator">
                Open Percent Error Calculator
              </Link>
            </div>
          </aside>
        </Container>
        <Container>
          <CalculatorTrustPanel subject="laboratory" />
        </Container>
      </section>
    </main>
  );
}
