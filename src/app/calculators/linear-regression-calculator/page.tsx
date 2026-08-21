import type { Metadata } from "next";
import Link from "next/link";

import { LinearRegressionCalculator } from "@/components/calculators/linear-regression-calculator";
import { CalculatorTrustPanel } from "@/components/calculator-trust";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";
import { createCalculatorSchema } from "@/lib/seo/calculator-schema";

const pageTitle = "Linear Regression Calculator";
const pageDescription =
  "Calculate slope, intercept, best-fit line equation, correlation coefficient, and R squared from paired x and y data.";

const pagePath =
  "/calculators/linear-regression-calculator";

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
    question: "What does the slope represent?",
    answer:
      "The slope represents the predicted change in y for each one-unit increase in x.",
  },
  {
    question: "What does the intercept represent?",
    answer:
      "The intercept is the predicted y value when x equals zero, although it may not always have a meaningful experimental interpretation.",
  },
  {
    question: "What does the correlation coefficient mean?",
    answer:
      "The correlation coefficient r describes the direction and strength of a linear relationship, with values closer to minus one or plus one indicating a stronger linear association.",
  },
  {
    question: "What does R squared mean?",
    answer:
      "R squared is the proportion of variation in y explained by the fitted linear model.",
  },
] as const;

const calculatorSchema = createCalculatorSchema({
  name: pageTitle,
  description: pageDescription,
  slug: "linear-regression-calculator",
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

export default function LinearRegressionCalculatorPage() {
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
                Linear Regression Calculator
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">
              Best-fit line tool
            </p>

            <h1>Linear Regression Calculator</h1>

            <p>
              Analyze paired x and y data to calculate the
              best-fit line, slope, intercept, correlation
              coefficient, and R squared.
            </p>
          </div>
        </Container>
      </section>

      <section
        className="tool-section"
        aria-label="Linear regression calculator"
      >
        <Container>
          <LinearRegressionCalculator />
        </Container>
      </section>

      <section className="article-section">
        <Container className="article-layout">
          <article className="article-content">
            <section aria-labelledby="overview-heading">
              <p className="eyebrow">
                Trend analysis
              </p>

              <h2 id="overview-heading">
                What does linear regression calculate?
              </h2>

              <p>
                Linear regression fits a straight line to
                paired numerical data. The model estimates
                how the dependent variable changes as the
                independent variable changes.
              </p>
            </section>

            <section aria-labelledby="formula-heading">
              <p className="eyebrow">Model</p>

              <h2 id="formula-heading">
                Linear regression equation
              </h2>

              <div className="formula-card">
                <p>
                  Best-fit line
                  <span>y = mx + b</span>
                </p>
              </div>

              <ul className="article-list">
                <li>m is the slope.</li>
                <li>b is the y-intercept.</li>
                <li>x is the predictor variable.</li>
                <li>y is the predicted response.</li>
              </ul>
            </section>

            <section aria-labelledby="example-heading">
              <p className="eyebrow">
                Worked example
              </p>

              <h2 id="example-heading">
                Fit a line to 1,2; 2,4; and 3,6
              </h2>

              <ol className="calculation-steps">
                <li>
                  Mean of x = <strong>2</strong>.
                </li>
                <li>
                  Mean of y = <strong>4</strong>.
                </li>
                <li>
                  Calculated slope = <strong>2</strong>.
                </li>
                <li>
                  Calculated intercept ={" "}
                  <strong>0</strong>.
                </li>
                <li>
                  Regression equation ={" "}
                  <strong>y = 2x + 0</strong>.
                </li>
              </ol>
            </section>

            <section aria-labelledby="correlation-heading">
              <p className="eyebrow">
                Correlation
              </p>

              <h2 id="correlation-heading">
                Interpret the correlation coefficient
              </h2>

              <p>
                The correlation coefficient r ranges from
                −1 to +1. Its sign indicates direction, and
                its magnitude indicates the strength of the
                linear association.
              </p>

              <div className="comparison-grid">
                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Positive r
                  </p>
                  <h3>Upward relationship</h3>
                  <p>
                    Larger x values tend to occur with larger
                    y values.
                  </p>
                </article>

                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Negative r
                  </p>
                  <h3>Downward relationship</h3>
                  <p>
                    Larger x values tend to occur with smaller
                    y values.
                  </p>
                </article>
              </div>
            </section>

            <section aria-labelledby="r-squared-heading">
              <p className="eyebrow">
                Model fit
              </p>

              <h2 id="r-squared-heading">
                Interpret R squared
              </h2>

              <p>
                R squared describes the proportion of
                variation in y explained by the fitted
                linear relationship. A value closer to one
                indicates that the points lie more closely
                around the line.
              </p>
            </section>

            <section aria-labelledby="limitations-heading">
              <p className="eyebrow">
                Limitations
              </p>

              <h2 id="limitations-heading">
                Avoid overinterpreting regression
              </h2>

              <ul className="article-list">
                <li>
                  Correlation does not prove causation.
                </li>
                <li>
                  A straight-line model may not fit curved
                  relationships.
                </li>
                <li>
                  Extreme points can strongly affect the
                  slope and correlation.
                </li>
                <li>
                  Predictions outside the measured x range
                  may be unreliable.
                </li>
                <li>
                  Units and experimental context still
                  matter.
                </li>
              </ul>
            </section>

            <section aria-labelledby="graphing-heading">
              <p className="eyebrow">
                Graphing
              </p>

              <h2 id="graphing-heading">
                Plot the data before interpreting the model
              </h2>

              <p>
                A scatter graph helps reveal curvature,
                clusters, anomalies, or other patterns that
                summary statistics alone may hide.
              </p>

              <p>
                Review the{" "}
                <Link
                  className="article-inline-link"
                  href="/lab-reports/tables-and-graphs"
                >
                  Tables and Graphs Guide
                </Link>{" "}
                and the{" "}
                <Link
                  className="article-inline-link"
                  href="/templates/graphing-scientific-data-worksheet"
                >
                  Graphing Scientific Data Worksheet
                </Link>
                .
              </p>
            </section>

            <section aria-labelledby="analysis-heading">
              <p className="eyebrow">
                Experimental interpretation
              </p>

              <h2 id="analysis-heading">
                Connect the trend to the research question
              </h2>

              <p>
                Use the regression equation, direction,
                strength, anomalies, and experimental
                limitations when describing the evidence.
              </p>

              <p>
                Follow the{" "}
                <Link
                  className="article-inline-link"
                  href="/scientific-method/analyze-experimental-results"
                >
                  Experimental Results Analysis Guide
                </Link>{" "}
                for a complete interpretation workflow.
              </p>
            </section>

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">
                Questions and answers
              </p>

              <h2 id="faq-heading">
                Linear regression FAQ
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

              <h2>Regression checklist</h2>

              <ul>
                <li>Use paired numerical values</li>
                <li>Place x first and y second</li>
                <li>Plot a scatter graph</li>
                <li>Check for anomalies</li>
                <li>Report slope, intercept, r, and R²</li>
              </ul>
            </div>

            <div className="sidebar-card">
              <p className="sidebar-card__label">
                Related statistics
              </p>

              <h2>Summarize each dataset</h2>

              <p>
                Calculate averages and spread before
                interpreting the relationship.
              </p>

              <Link href="/calculators/mean-median-mode-calculator">
                Open Mean, Median and Mode Calculator
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
