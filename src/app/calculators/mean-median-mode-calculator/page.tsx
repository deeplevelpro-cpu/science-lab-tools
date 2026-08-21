import type { Metadata } from "next";

import { RelatedCalculators } from "@/components/related-calculators";
import { getRelatedCalculators } from "@/content/calculators/get-related-calculators";
import { calculators } from "@/content/calculators/registry";
import Link from "next/link";

import { MeanMedianModeCalculator } from "@/components/calculators/mean-median-mode-calculator";
import { CalculatorTrustPanel } from "@/components/calculator-trust";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";
import { createCalculatorSchema } from "@/lib/seo/calculator-schema";

const pageTitle = "Mean, Median and Mode Calculator";
const pageDescription =
  "Calculate the mean, median, mode, sum, range, minimum, maximum, and sorted values for a numerical dataset.";

const pagePath =
  "/calculators/mean-median-mode-calculator";

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
    question: "How is the mean calculated?",
    answer:
      "The mean is calculated by adding all values and dividing the sum by the total number of values.",
  },
  {
    question: "How is the median calculated?",
    answer:
      "The values are sorted from smallest to largest. For an odd number of values, the median is the middle value. For an even number, it is the mean of the two middle values.",
  },
  {
    question: "Can a dataset have more than one mode?",
    answer:
      "Yes. A dataset is multimodal when two or more values share the highest frequency.",
  },
  {
    question: "What happens when every value occurs once?",
    answer:
      "The dataset has no mode because no value occurs more frequently than the others.",
  },
] as const;

const calculatorSchema = createCalculatorSchema({
  name: pageTitle,
  description: pageDescription,
  slug: "mean-median-mode-calculator",
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



const relatedCalculators = getRelatedCalculators(
  "mean-median-mode-calculator",
  calculators,
);

export default function MeanMedianModeCalculatorPage() {
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
                Mean, Median and Mode Calculator
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">
              Dataset statistics tool
            </p>

            <h1>Mean, Median and Mode Calculator</h1>

            <p>
              Analyze a numerical dataset and calculate its
              mean, median, mode, sum, range, minimum, and
              maximum.
            </p>
          </div>
        </Container>
      </section>

      <section
        className="tool-section"
        aria-label="Mean, median and mode calculator"
      >
        <Container>
          <MeanMedianModeCalculator />
        </Container>
      </section>

      <section className="article-section">
        <Container className="article-layout">
          <article className="article-content">
            <section aria-labelledby="overview-heading">
              <p className="eyebrow">
                Central tendency
              </p>

              <h2 id="overview-heading">
                What do mean, median, and mode describe?
              </h2>

              <p>
                Mean, median, and mode are measures of
                central tendency. Each describes the center
                of a dataset in a different way.
              </p>
            </section>

            <section aria-labelledby="mean-heading">
              <p className="eyebrow">Mean</p>

              <h2 id="mean-heading">
                Calculate the arithmetic average
              </h2>

              <div className="formula-card">
                <p>
                  Mean
                  <span>x̄ = Σx ÷ n</span>
                </p>
              </div>

              <p>
                Add all values and divide by the number of
                values. The mean uses every observation, so
                extreme values can strongly affect it.
              </p>
            </section>

            <section aria-labelledby="median-heading">
              <p className="eyebrow">Median</p>

              <h2 id="median-heading">
                Find the middle of the sorted dataset
              </h2>

              <p>
                Sort the values from smallest to largest.
                With an odd number of values, choose the
                middle value. With an even number, average
                the two middle values.
              </p>
            </section>

            <section aria-labelledby="mode-heading">
              <p className="eyebrow">Mode</p>

              <h2 id="mode-heading">
                Identify the most frequent value
              </h2>

              <p>
                The mode is the value that occurs most
                frequently. A dataset may have one mode,
                multiple modes, or no mode.
              </p>
            </section>

            <section aria-labelledby="example-heading">
              <p className="eyebrow">
                Worked example
              </p>

              <h2 id="example-heading">
                Analyze 2, 4, 4, 6, and 8
              </h2>

              <ol className="calculation-steps">
                <li>
                  Sum: 2 + 4 + 4 + 6 + 8 ={" "}
                  <strong>24</strong>.
                </li>
                <li>
                  Mean: 24 ÷ 5 ={" "}
                  <strong>4.8</strong>.
                </li>
                <li>
                  Median: the middle sorted value is{" "}
                  <strong>4</strong>.
                </li>
                <li>
                  Mode: 4 occurs most often, so the mode is{" "}
                  <strong>4</strong>.
                </li>
                <li>
                  Range: 8 − 2 ={" "}
                  <strong>6</strong>.
                </li>
              </ol>
            </section>

            <section aria-labelledby="comparison-heading">
              <p className="eyebrow">
                Choosing a measure
              </p>

              <h2 id="comparison-heading">
                Which measure should you report?
              </h2>

              <div className="comparison-grid">
                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Mean
                  </p>
                  <h3>Uses every value</h3>
                  <p>
                    Useful for balanced numerical datasets,
                    but sensitive to unusually high or low
                    values.
                  </p>
                </article>

                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Median
                  </p>
                  <h3>Resistant to extremes</h3>
                  <p>
                    Useful when the dataset is skewed or
                    contains unusually large or small values.
                  </p>
                </article>

                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Mode
                  </p>
                  <h3>Shows the most common value</h3>
                  <p>
                    Useful for identifying the most frequent
                    result or category.
                  </p>
                </article>
              </div>
            </section>

            <section aria-labelledby="laboratory-heading">
              <p className="eyebrow">
                Laboratory use
              </p>

              <h2 id="laboratory-heading">
                Summarize repeated measurements
              </h2>

              <p>
                Mean is commonly used to summarize repeated
                measurements, while median can be useful when
                a dataset contains an extreme result.
              </p>

              <p>
                For a fuller evaluation of spread and
                consistency, use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/standard-deviation-calculator"
                >
                  Standard Deviation Calculator
                </Link>
                .
              </p>
            </section>

            <section aria-labelledby="analysis-heading">
              <p className="eyebrow">
                Data interpretation
              </p>

              <h2 id="analysis-heading">
                Put the statistics in context
              </h2>

              <p>
                A summary statistic should be interpreted
                together with sample size, spread, units,
                anomalies, and the experimental method.
              </p>

              <p>
                Review the{" "}
                <Link
                  className="article-inline-link"
                  href="/scientific-method/analyze-experimental-results"
                >
                  experimental results analysis guide
                </Link>{" "}
                for a complete workflow.
              </p>
            </section>

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">
                Questions and answers
              </p>

              <h2 id="faq-heading">
                Mean, median, and mode FAQ
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

              <h2>Dataset checklist</h2>

              <ul>
                <li>Use values with matching units</li>
                <li>Check the dataset for input errors</li>
                <li>Sort values before finding the median</li>
                <li>Check whether multiple modes exist</li>
                <li>Report the number of observations</li>
              </ul>
            </div>

            <div className="sidebar-card">
              <p className="sidebar-card__label">
                Related tool
              </p>

              <h2>Measure dataset spread</h2>

              <p>
                Calculate sample and population standard
                deviation for repeated measurements.
              </p>

              <Link href="/calculators/standard-deviation-calculator">
                Open Standard Deviation Calculator
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
