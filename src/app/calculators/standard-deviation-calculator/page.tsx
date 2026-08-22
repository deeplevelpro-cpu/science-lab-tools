import type { Metadata } from "next";

import { RelatedCalculators } from "@/components/related-calculators";
import { getRelatedCalculators } from "@/content/calculators/get-related-calculators";
import { calculators } from "@/content/calculators/registry";
import Link from "next/link";

import { StandardDeviationCalculator } from "@/components/calculators/standard-deviation-calculator";
import { CalculatorTrustPanel } from "@/components/calculator-trust";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";
import { createCalculatorSchema } from "@/lib/seo/calculator-schema";
import { createFAQSchema } from "@/lib/seo/faq-schema";

const pageTitle = "Standard Deviation Calculator";
const pageDescription =
  "Calculate sample and population standard deviation, mean, range, minimum, maximum, and dataset size from laboratory measurements or repeated trials.";

const pagePath =
  "/calculators/standard-deviation-calculator";

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
      "What is the difference between sample and population standard deviation?",
    answer:
      "Population standard deviation divides by n and is used when the dataset represents the entire population. Sample standard deviation divides by n minus 1 and is used when the data is a sample from a larger population.",
  },
  {
    question: "What does a low standard deviation mean?",
    answer:
      "A low standard deviation means the values are closely grouped around the mean and show relatively little variation.",
  },
  {
    question: "What does a high standard deviation mean?",
    answer:
      "A high standard deviation means the values are more widely spread around the mean and show greater variation.",
  },
  {
    question:
      "Can standard deviation be calculated from one value?",
    answer:
      "Population standard deviation for one value is zero, but sample standard deviation is not defined because n minus 1 would be zero.",
  },
] as const;

const calculatorSchema = createCalculatorSchema({
  name: pageTitle,
  description: pageDescription,
  slug: "standard-deviation-calculator",
  category: "Laboratory",
});

const faqSchema = createFAQSchema(faqItems);

const relatedCalculators = getRelatedCalculators(
  "standard-deviation-calculator",
  calculators,
);

export default function StandardDeviationCalculatorPage() {
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
                Standard Deviation Calculator
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">
              Experimental data tool
            </p>

            <h1>Standard Deviation Calculator</h1>

            <p>
              Measure the spread of repeated laboratory
              values and calculate sample deviation,
              population deviation, mean, and range.
            </p>
          </div>
        </Container>
      </section>

      <section
        className="tool-section"
        aria-label="Standard deviation calculator"
      >
        <Container>
          <StandardDeviationCalculator />
        </Container>
      </section>

      <section className="article-section">
        <Container className="article-layout">
          <article className="article-content">
            <section aria-labelledby="meaning-heading">
              <p className="eyebrow">Core concept</p>

              <h2 id="meaning-heading">
                What does standard deviation measure?
              </h2>

              <p>
                Standard deviation measures how far values
                typically lie from the mean. A smaller value
                indicates more consistent measurements, while
                a larger value indicates greater spread.
              </p>
            </section>

            <section aria-labelledby="formula-heading">
              <p className="eyebrow">Formulas</p>

              <h2 id="formula-heading">
                Population and sample standard deviation
              </h2>

              <div className="formula-card">
                <p>
                  Population standard deviation
                  <span>
                    σ = √[Σ(x − μ)² ÷ n]
                  </span>
                </p>
              </div>

              <div className="formula-card">
                <p>
                  Sample standard deviation
                  <span>
                    s = √[Σ(x − x̄)² ÷ (n − 1)]
                  </span>
                </p>
              </div>
            </section>

            <section aria-labelledby="example-heading">
              <p className="eyebrow">
                Worked example
              </p>

              <h2 id="example-heading">
                Analyze a repeated-measurement dataset
              </h2>

              <p>
                Consider the values{" "}
                <strong>
                  2, 4, 4, 4, 5, 5, 7, and 9
                </strong>
                .
              </p>

              <ol className="calculation-steps">
                <li>
                  Calculate the mean: 40 ÷ 8 ={" "}
                  <strong>5</strong>.
                </li>
                <li>
                  Find each value&apos;s difference from
                  the mean.
                </li>
                <li>
                  Square and add those differences.
                </li>
                <li>
                  Divide by n for population variance.
                </li>
                <li>
                  Take the square root to obtain{" "}
                  <strong>σ = 2</strong>.
                </li>
              </ol>
            </section>

            <section aria-labelledby="choice-heading">
              <p className="eyebrow">
                Choosing a formula
              </p>

              <h2 id="choice-heading">
                Should you use sample or population
                standard deviation?
              </h2>

              <div className="comparison-grid">
                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Population
                  </p>
                  <h3>Use all relevant observations</h3>
                  <p>
                    Use population standard deviation when
                    the dataset represents the complete group
                    being analyzed.
                  </p>
                </article>

                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Sample
                  </p>
                  <h3>Estimate a larger population</h3>
                  <p>
                    Use sample standard deviation when the
                    observations are a sample from a broader
                    population.
                  </p>
                </article>
              </div>
            </section>

            <section aria-labelledby="laboratory-heading">
              <p className="eyebrow">
                Laboratory analysis
              </p>

              <h2 id="laboratory-heading">
                Interpret variation between repeated trials
              </h2>

              <p>
                Standard deviation should be interpreted
                together with the mean, range, instrument
                resolution, sample size, and experimental
                method.
              </p>

              <p>
                Learn how to place these statistics in
                context in the{" "}
                <Link
                  className="article-inline-link"
                  href="/scientific-method/analyze-experimental-results"
                >
                  experimental results analysis guide
                </Link>
                .
              </p>
            </section>

            <section aria-labelledby="mistakes-heading">
              <p className="eyebrow">
                Common mistakes
              </p>

              <h2 id="mistakes-heading">
                Standard-deviation calculation mistakes
              </h2>

              <ul className="article-list">
                <li>
                  Using the population formula when the data
                  is only a sample.
                </li>
                <li>
                  Removing unusual results without a
                  documented reason.
                </li>
                <li>
                  Mixing measurements that use different
                  units.
                </li>
                <li>
                  Reporting standard deviation without the
                  mean or sample size.
                </li>
                <li>
                  Rounding intermediate calculations too
                  early.
                </li>
              </ul>
            </section>

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">
                Questions and answers
              </p>

              <h2 id="faq-heading">
                Standard deviation FAQ
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
                <li>Use measurements with matching units</li>
                <li>Check for transcription errors</li>
                <li>Record the sample size</li>
                <li>Report the mean with the deviation</li>
                <li>Investigate anomalies carefully</li>
              </ul>
            </div>

            <div className="sidebar-card">
              <p className="sidebar-card__label">
                Related tool
              </p>

              <h2>Round the final result</h2>

              <p>
                Report calculated statistics with suitable
                measurement precision.
              </p>

              <Link href="/calculators/significant-figures-calculator">
                Open Significant Figures Calculator
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
