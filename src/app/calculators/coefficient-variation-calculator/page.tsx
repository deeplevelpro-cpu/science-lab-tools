import type { Metadata } from "next";
import Link from "next/link";

import { CoefficientVariationCalculator } from "@/components/calculators/coefficient-variation-calculator";
import { CalculatorTrustPanel } from "@/components/calculator-trust";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";
import { createCalculatorSchema } from "@/lib/seo/calculator-schema";

const pageTitle =
  "Coefficient of Variation Calculator";
const pageDescription =
  "Calculate coefficient of variation from a numerical dataset using sample or population standard deviation, with mean and working steps.";

const pagePath =
  "/calculators/coefficient-variation-calculator";

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
      "What is the coefficient of variation?",
    answer:
      "The coefficient of variation is the standard deviation divided by the absolute mean, multiplied by 100 percent. It expresses spread relative to the size of the mean.",
  },
  {
    question:
      "What does a lower coefficient of variation mean?",
    answer:
      "A lower coefficient of variation generally indicates that the values are more consistent relative to their mean.",
  },
  {
    question:
      "Should I use sample or population standard deviation?",
    answer:
      "Use sample standard deviation when the observations represent a sample from a larger population. Use population standard deviation when the dataset represents the complete population being analyzed.",
  },
  {
    question:
      "Why is coefficient of variation undefined when the mean is zero?",
    answer:
      "The formula divides standard deviation by the mean. Division by zero is undefined, so coefficient of variation cannot be calculated when the mean is zero.",
  },
] as const;

const calculatorSchema = createCalculatorSchema({
  name: pageTitle,
  description: pageDescription,
  slug: "coefficient-variation-calculator",
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

export default function CoefficientVariationCalculatorPage() {
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
                Coefficient of Variation Calculator
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">
              Relative variability tool
            </p>

            <h1>
              Coefficient of Variation Calculator
            </h1>

            <p>
              Compare dataset spread relative to the mean
              using sample or population standard
              deviation.
            </p>
          </div>
        </Container>
      </section>

      <section
        className="tool-section"
        aria-label="Coefficient of variation calculator"
      >
        <Container>
          <CoefficientVariationCalculator />
        </Container>
      </section>

      <section className="article-section">
        <Container className="article-layout">
          <article className="article-content">
            <section aria-labelledby="overview-heading">
              <p className="eyebrow">
                Relative spread
              </p>

              <h2 id="overview-heading">
                What does coefficient of variation measure?
              </h2>

              <p>
                Coefficient of variation measures standard
                deviation relative to the magnitude of the
                mean. Because the result is expressed as a
                percentage, it can help compare variability
                between datasets with different scales.
              </p>
            </section>

            <section aria-labelledby="formula-heading">
              <p className="eyebrow">Formula</p>

              <h2 id="formula-heading">
                Coefficient of variation formula
              </h2>

              <div className="formula-card">
                <p>
                  Coefficient of variation
                  <span>
                    CV = standard deviation ÷ |mean| × 100%
                  </span>
                </p>
              </div>

              <p>
                The absolute mean is used so that a dataset
                with a negative mean still produces a
                positive relative-spread percentage.
              </p>
            </section>

            <section aria-labelledby="example-heading">
              <p className="eyebrow">
                Worked example
              </p>

              <h2 id="example-heading">
                Calculate CV for 10, 12, and 14
              </h2>

              <ol className="calculation-steps">
                <li>
                  Mean: (10 + 12 + 14) ÷ 3 ={" "}
                  <strong>12</strong>.
                </li>
                <li>
                  Sample standard deviation ={" "}
                  <strong>2</strong>.
                </li>
                <li>
                  CV = 2 ÷ 12 × 100%.
                </li>
                <li>
                  Coefficient of variation ={" "}
                  <strong>16.67%</strong>.
                </li>
              </ol>
            </section>

            <section aria-labelledby="interpret-heading">
              <p className="eyebrow">
                Interpretation
              </p>

              <h2 id="interpret-heading">
                How to interpret the result
              </h2>

              <p>
                A lower coefficient of variation means the
                standard deviation is small relative to the
                mean. A higher value means the data is more
                dispersed relative to its average.
              </p>

              <p>
                The meaning of a low or high value depends
                on the subject, measurement process, and
                acceptable experimental variation.
              </p>
            </section>

            <section aria-labelledby="comparison-heading">
              <p className="eyebrow">
                Choosing a method
              </p>

              <h2 id="comparison-heading">
                Sample versus population CV
              </h2>

              <div className="comparison-grid">
                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Sample
                  </p>
                  <h3>Uses n − 1</h3>
                  <p>
                    Use this when the measurements are a
                    sample intended to estimate a larger
                    population.
                  </p>
                </article>

                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Population
                  </p>
                  <h3>Uses n</h3>
                  <p>
                    Use this when the dataset includes every
                    observation in the population of
                    interest.
                  </p>
                </article>
              </div>
            </section>

            <section aria-labelledby="limitations-heading">
              <p className="eyebrow">
                Limitations
              </p>

              <h2 id="limitations-heading">
                When coefficient of variation can mislead
              </h2>

              <ul className="article-list">
                <li>
                  It is undefined when the mean equals zero.
                </li>
                <li>
                  It can become extremely large when the
                  mean is close to zero.
                </li>
                <li>
                  It should not be used blindly for data
                  measured on interval scales with arbitrary
                  zero points.
                </li>
                <li>
                  It does not replace inspection of
                  anomalies or the full data distribution.
                </li>
              </ul>
            </section>

            <section aria-labelledby="related-heading">
              <p className="eyebrow">
                Related analysis
              </p>

              <h2 id="related-heading">
                Review absolute and relative spread
              </h2>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/standard-deviation-calculator"
                >
                  Standard Deviation Calculator
                </Link>{" "}
                to inspect absolute spread, and the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/mean-median-mode-calculator"
                >
                  Mean, Median and Mode Calculator
                </Link>{" "}
                to summarize central tendency.
              </p>
            </section>

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">
                Questions and answers
              </p>

              <h2 id="faq-heading">
                Coefficient of variation FAQ
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

              <h2>CV checklist</h2>

              <ul>
                <li>Use values with matching units</li>
                <li>Select sample or population correctly</li>
                <li>Confirm the mean is not zero</li>
                <li>Report the method used</li>
                <li>Interpret the percentage in context</li>
              </ul>
            </div>

            <div className="sidebar-card">
              <p className="sidebar-card__label">
                Related guide
              </p>

              <h2>Analyze experimental results</h2>

              <p>
                Interpret variability, repeated trials,
                anomalies, and evidence quality.
              </p>

              <Link href="/scientific-method/analyze-experimental-results">
                Open Results Analysis Guide
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
