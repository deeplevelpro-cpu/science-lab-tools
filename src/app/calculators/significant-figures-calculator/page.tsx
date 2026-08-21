import type { Metadata } from "next";
import Link from "next/link";

import { SignificantFiguresCalculator } from "@/components/calculators/significant-figures-calculator";
import { CalculatorTrustPanel } from "@/components/calculator-trust";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";
import { createCalculatorSchema } from "@/lib/seo/calculator-schema";

const pageTitle = "Significant Figures Calculator";
const pageDescription =
  "Count significant figures and round decimal or scientific-notation values to a selected precision. Learn the rules for leading, captive, and trailing zeros.";

const pagePath =
  "/calculators/significant-figures-calculator";

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
    question: "What are significant figures?",
    answer:
      "Significant figures are the meaningful digits in a measured or calculated value that communicate its precision.",
  },
  {
    question: "Are leading zeros significant?",
    answer:
      "No. Zeros before the first nonzero digit only locate the decimal point and are not significant.",
  },
  {
    question: "Are trailing zeros significant?",
    answer:
      "Trailing zeros after a decimal point are significant. Trailing zeros in a whole number may be ambiguous unless a decimal point or scientific notation clarifies them.",
  },
  {
    question: "When should a laboratory result be rounded?",
    answer:
      "Keep extra digits during intermediate calculations and round the final reported result according to the required precision.",
  },
] as const;

const calculatorSchema = createCalculatorSchema({
  name: pageTitle,
  description: pageDescription,
  slug: "significant-figures-calculator",
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

export default function SignificantFiguresCalculatorPage() {
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
                Significant Figures Calculator
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">
              Laboratory precision tool
            </p>

            <h1>Significant Figures Calculator</h1>

            <p>
              Count the significant figures in a measured
              value and round it to the precision required
              for your laboratory calculation.
            </p>
          </div>
        </Container>
      </section>

      <section
        className="tool-section"
        aria-label="Significant figures calculator"
      >
        <Container>
          <SignificantFiguresCalculator />
        </Container>
      </section>

      <section className="article-section">
        <Container className="article-layout">
          <article className="article-content">
            <section aria-labelledby="rules-heading">
              <p className="eyebrow">Counting rules</p>

              <h2 id="rules-heading">
                How to identify significant figures
              </h2>

              <ul className="article-list">
                <li>
                  Every nonzero digit is significant.
                </li>
                <li>
                  Zeros between nonzero digits are
                  significant.
                </li>
                <li>
                  Leading zeros before the first nonzero
                  digit are not significant.
                </li>
                <li>
                  Trailing zeros after a decimal point are
                  significant.
                </li>
                <li>
                  Whole-number trailing zeros may be
                  ambiguous without scientific notation.
                </li>
              </ul>
            </section>

            <section aria-labelledby="example-heading">
              <p className="eyebrow">
                Worked example
              </p>

              <h2 id="example-heading">
                Count significant figures in 0.00450
              </h2>

              <ol className="calculation-steps">
                <li>
                  Ignore the leading zeros before 4.
                </li>
                <li>
                  Count the digits 4 and 5.
                </li>
                <li>
                  Count the final zero because it follows
                  a decimal and a nonzero digit.
                </li>
              </ol>

              <p>
                The value <strong>0.00450</strong> contains{" "}
                <strong>3 significant figures</strong>.
              </p>
            </section>

            <section aria-labelledby="rounding-heading">
              <p className="eyebrow">Rounding</p>

              <h2 id="rounding-heading">
                Round to a selected number of significant
                figures
              </h2>

              <p>
                Start counting from the first nonzero digit.
                Keep the requested number of digits, then
                inspect the next digit to determine whether
                the final retained digit should increase.
              </p>

              <div className="formula-card">
                <p>
                  Example
                  <span>
                    12.345 rounded to 3 significant figures
                    is 12.3.
                  </span>
                </p>
              </div>
            </section>

            <section aria-labelledby="notation-heading">
              <p className="eyebrow">
                Scientific notation
              </p>

              <h2 id="notation-heading">
                Clarify ambiguous trailing zeros
              </h2>

              <p>
                Scientific notation clearly communicates
                precision. For example, 1.20 × 10³ has three
                significant figures, while 1.2 × 10³ has
                two.
              </p>
            </section>

            <section aria-labelledby="laboratory-heading">
              <p className="eyebrow">
                Laboratory reporting
              </p>

              <h2 id="laboratory-heading">
                Preserve measurement precision
              </h2>

              <p>
                Enter measured values exactly as recorded.
                A value such as 8.50 should not be shortened
                to 8.5 because the final zero communicates
                instrument precision.
              </p>

              <p>
                For a complete explanation of precision
                rules, read the{" "}
                <Link
                  className="article-inline-link"
                  href="/lab-reports/significant-figures-in-lab-reports"
                >
                  significant figures in lab reports guide
                </Link>
                .
              </p>
            </section>

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">
                Questions and answers
              </p>

              <h2 id="faq-heading">
                Significant figures FAQ
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

              <h2>Significant-figure checklist</h2>

              <ul>
                <li>Preserve the original written value</li>
                <li>Ignore leading zeros</li>
                <li>Count captive zeros</li>
                <li>Count trailing decimal zeros</li>
                <li>Round only the final result</li>
              </ul>
            </div>

            <div className="sidebar-card">
              <p className="sidebar-card__label">
                Related tool
              </p>

              <h2>Calculate experimental error</h2>

              <p>
                Compare a laboratory measurement with an
                accepted reference value.
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
