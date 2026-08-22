import type { Metadata } from "next";

import { RelatedCalculators } from "@/components/related-calculators";
import { getRelatedCalculators } from "@/content/calculators/get-related-calculators";
import { calculators } from "@/content/calculators/registry";
import Link from "next/link";

import { PercentErrorCalculator } from "@/components/calculators/percent-error-calculator";
import { CalculatorTrustPanel } from "@/components/calculator-trust";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";
import { createCalculatorSchema } from "@/lib/seo/calculator-schema";
import { createFAQSchema } from "@/lib/seo/faq-schema";

const pageTitle = "Percent Error Calculator";
const pageDescription =
  "Calculate percent error from experimental and accepted values. See the formula, calculation steps, worked examples, and common laboratory mistakes.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/calculators/percent-error-calculator",
  },
  openGraph: {
    title: `${pageTitle} | ${siteConfig.name}`,
    description: pageDescription,
    type: "website",
    url: absoluteUrl("/calculators/percent-error-calculator"),
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
    question: "What is percent error?",
    answer:
      "Percent error measures how far an experimental value is from an accepted or theoretical value, expressed as a percentage of the accepted value.",
  },
  {
    question: "Can percent error be negative?",
    answer:
      "Percent error is normally reported as a non-negative value because the difference is converted to an absolute value before division.",
  },
  {
    question: "Why can the accepted value not be zero?",
    answer:
      "The accepted value is used as the denominator. Dividing by zero is undefined, so the standard percent-error formula cannot be used when the accepted value is zero.",
  },
] as const;

const calculatorSchema = createCalculatorSchema({
  name: pageTitle,
  description: pageDescription,
  slug: "percent-error-calculator",
  category: "Laboratory",
});

const faqSchema = createFAQSchema(faqItems);

const relatedCalculators = getRelatedCalculators(
  "percent-error-calculator",
  calculators,
);

export default function PercentErrorCalculatorPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(calculatorSchema).replace(
            /</g,
            "\\u003c",
          ),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
        }}
      />

      <section className="tool-page-hero">
        <Container>
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <ol>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/calculators">Calculators</Link>
              </li>
              <li aria-current="page">Percent Error Calculator</li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">Laboratory calculation tool</p>
            <h1>Percent Error Calculator</h1>
            <p>
              Compare an experimental measurement with an accepted value and
              calculate percent error with clear working steps.
            </p>
          </div>
        </Container>
      </section>

      <section className="tool-section" aria-label="Percent error calculator">
        <Container>
          <PercentErrorCalculator />
        </Container>
      </section>

      <section className="article-section">
        <Container className="article-layout">
          <article className="article-content">
            <section aria-labelledby="formula-heading">
              <p className="eyebrow">Formula</p>
              <h2 id="formula-heading">How percent error is calculated</h2>

              <div className="formula-card">
                <p>
                  Percent error =
                  <span>
                    |experimental value − accepted value| ÷ |accepted value| ×
                    100
                  </span>
                </p>
              </div>

              <p>
                First find the absolute difference between the experimental and
                accepted values. Divide that difference by the absolute
                accepted value, then multiply the result by 100.
              </p>
            </section>

            <section aria-labelledby="example-heading">
              <p className="eyebrow">Worked example</p>
              <h2 id="example-heading">Percent error example</h2>

              <p>
                A student measures a substance at <strong>9.8 grams</strong>.
                The accepted value is <strong>10 grams</strong>.
              </p>

              <ol className="calculation-steps">
                <li>
                  Find the difference: |9.8 − 10| = <strong>0.2</strong>
                </li>
                <li>
                  Divide by the accepted value: 0.2 ÷ 10 ={" "}
                  <strong>0.02</strong>
                </li>
                <li>
                  Multiply by 100: 0.02 × 100 = <strong>2%</strong>
                </li>
              </ol>

              <p>
                The experimental measurement therefore has a percent error of{" "}
                <strong>2%</strong>.
              </p>
            </section>

            <section aria-labelledby="mistakes-heading">
              <p className="eyebrow">Laboratory guidance</p>
              <h2 id="mistakes-heading">Common percent-error mistakes</h2>

              <ul className="article-list">
                <li>
                  Dividing by the experimental value instead of the accepted
                  value.
                </li>
                <li>
                  Forgetting to use the absolute value of the difference.
                </li>
                <li>Forgetting to multiply the decimal result by 100.</li>
                <li>
                  Mixing values that use different measurement units.
                </li>
                <li>Rounding too early during the calculation.</li>
              </ul>
            </section>

            <section aria-labelledby="related-heading">
              <p className="eyebrow">Related data analysis</p>
              <h2 id="related-heading">
                Compare and evaluate experimental results
              </h2>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/percent-difference-calculator"
                >
                  Percent Difference Calculator
                </Link>{" "}
                when comparing two experimental values without a
                single accepted reference value.
              </p>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/measurement-uncertainty-calculator"
                >
                  Measurement Uncertainty Calculator
                </Link>{" "}
                to assess the precision and reliability of measured
                laboratory values.
              </p>
            </section>

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">Questions and answers</p>
              <h2 id="faq-heading">Percent error FAQ</h2>

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
              <p className="sidebar-card__label">Quick reference</p>
              <h2>Percent error checklist</h2>
              <ul>
                <li>Use matching units</li>
                <li>Use the accepted value as denominator</li>
                <li>Take the absolute difference</li>
                <li>Multiply the result by 100</li>
                <li>Round only the final answer</li>
              </ul>
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
