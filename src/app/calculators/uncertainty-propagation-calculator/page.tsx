import type { Metadata } from "next";

import { RelatedCalculators } from "@/components/related-calculators";
import { getRelatedCalculators } from "@/content/calculators/get-related-calculators";
import { calculators } from "@/content/calculators/registry";
import Link from "next/link";

import { UncertaintyPropagationCalculator } from "@/components/calculators/uncertainty-propagation-calculator";
import { CalculatorTrustPanel } from "@/components/calculator-trust";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";
import { createCalculatorSchema } from "@/lib/seo/calculator-schema";

const pageTitle =
  "Uncertainty Propagation Calculator";
const pageDescription =
  "Propagate uncertainty through addition, subtraction, multiplication, and division using absolute and relative uncertainty rules.";

const pagePath =
  "/calculators/uncertainty-propagation-calculator";

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
      "How do you propagate uncertainty in addition and subtraction?",
    answer:
      "For addition and subtraction, add the absolute uncertainties of the measured values.",
  },
  {
    question:
      "How do you propagate uncertainty in multiplication and division?",
    answer:
      "For multiplication and division, add the relative uncertainties, then multiply the combined relative uncertainty by the absolute result to obtain the propagated absolute uncertainty.",
  },
  {
    question:
      "Can uncertainty ever be negative?",
    answer:
      "No. Absolute uncertainty represents a magnitude and must be zero or positive.",
  },
  {
    question:
      "Why is relative uncertainty undefined when the result is zero?",
    answer:
      "Relative uncertainty requires division by the magnitude of the result, so it is undefined when the calculated result equals zero.",
  },
] as const;

const calculatorSchema = createCalculatorSchema({
  name: pageTitle,
  description: pageDescription,
  slug: "uncertainty-propagation-calculator",
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
  "uncertainty-propagation-calculator",
  calculators,
);

export default function UncertaintyPropagationCalculatorPage() {
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
                Uncertainty Propagation Calculator
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">
              Combined measurement uncertainty
            </p>

            <h1>
              Uncertainty Propagation Calculator
            </h1>

            <p>
              Combine uncertainty through arithmetic
              operations using standard laboratory
              propagation rules.
            </p>
          </div>
        </Container>
      </section>

      <section
        className="tool-section"
        aria-label="Uncertainty propagation calculator"
      >
        <Container>
          <UncertaintyPropagationCalculator />
        </Container>
      </section>

      <section className="article-section">
        <Container className="article-layout">
          <article className="article-content">
            <section aria-labelledby="overview-heading">
              <p className="eyebrow">
                Combined uncertainty
              </p>

              <h2 id="overview-heading">
                What is uncertainty propagation?
              </h2>

              <p>
                Uncertainty propagation estimates the
                uncertainty in a calculated result when the
                input measurements each contain uncertainty.
              </p>

              <p>
                The propagation rule depends on whether the
                measurements are added, subtracted,
                multiplied, or divided.
              </p>
            </section>

            <section aria-labelledby="addition-heading">
              <p className="eyebrow">
                Addition and subtraction
              </p>

              <h2 id="addition-heading">
                Add absolute uncertainties
              </h2>

              <div className="formula-card">
                <p>
                  Propagated absolute uncertainty
                  <span>
                    ΔR = ΔA + ΔB
                  </span>
                </p>
              </div>

              <p>
                This rule applies to both addition and
                subtraction because the uncertainty widths
                combine regardless of the operation sign.
              </p>
            </section>

            <section aria-labelledby="multiplication-heading">
              <p className="eyebrow">
                Multiplication and division
              </p>

              <h2 id="multiplication-heading">
                Add relative uncertainties
              </h2>

              <div className="formula-card">
                <p>
                  Combined relative uncertainty
                  <span>
                    ΔR ÷ |R| = ΔA ÷ |A| + ΔB ÷ |B|
                  </span>
                </p>
              </div>

              <p>
                After combining the relative uncertainties,
                multiply by the absolute result to obtain the
                propagated absolute uncertainty.
              </p>
            </section>

            <section aria-labelledby="example-heading">
              <p className="eyebrow">
                Worked example
              </p>

              <h2 id="example-heading">
                Multiply 10 ± 0.2 by 5 ± 0.1
              </h2>

              <ol className="calculation-steps">
                <li>
                  Calculated value: 10 × 5 ={" "}
                  <strong>50</strong>.
                </li>
                <li>
                  First relative uncertainty: 0.2 ÷ 10 ={" "}
                  <strong>0.02</strong>.
                </li>
                <li>
                  Second relative uncertainty: 0.1 ÷ 5 ={" "}
                  <strong>0.02</strong>.
                </li>
                <li>
                  Combined relative uncertainty ={" "}
                  <strong>0.04</strong>.
                </li>
                <li>
                  Propagated absolute uncertainty: 50 × 0.04 ={" "}
                  <strong>2</strong>.
                </li>
                <li>
                  Final result = <strong>50 ± 2</strong>.
                </li>
              </ol>
            </section>

            <section aria-labelledby="zero-heading">
              <p className="eyebrow">
                Zero results
              </p>

              <h2 id="zero-heading">
                Relative uncertainty can be undefined
              </h2>

              <p>
                Addition or subtraction can produce a result
                of zero while still having a valid absolute
                uncertainty. In that case, relative and
                percentage uncertainty are undefined because
                division by zero is not possible.
              </p>
            </section>

            <section aria-labelledby="limitations-heading">
              <p className="eyebrow">
                Scope
              </p>

              <h2 id="limitations-heading">
                Understand the propagation model
              </h2>

              <ul className="article-list">
                <li>
                  The calculator uses standard classroom
                  worst-case propagation rules.
                </li>
                <li>
                  It assumes the input uncertainties are
                  independent estimates.
                </li>
                <li>
                  More advanced statistical analysis may use
                  quadrature or covariance-based methods.
                </li>
                <li>
                  The final uncertainty should be rounded
                  consistently with the reported value.
                </li>
              </ul>
            </section>

            <section aria-labelledby="related-heading">
              <p className="eyebrow">
                Related resources
              </p>

              <h2 id="related-heading">
                Build a complete uncertainty workflow
              </h2>

              <p>
                Start with the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/measurement-uncertainty-calculator"
                >
                  Measurement Uncertainty Calculator
                </Link>{" "}
                to convert a single measurement into
                relative and percentage uncertainty.
              </p>

              <p>
                Then review the{" "}
                <Link
                  className="article-inline-link"
                  href="/lab-reports/significant-figures-in-lab-reports"
                >
                  Significant Figures Guide
                </Link>{" "}
                and the{" "}
                <Link
                  className="article-inline-link"
                  href="/lab-reports/lab-report-discussion"
                >
                  Lab Report Discussion Guide
                </Link>{" "}
                for reporting and interpretation.
              </p>
            </section>

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">
                Questions and answers
              </p>

              <h2 id="faq-heading">
                Uncertainty propagation FAQ
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

              <h2>Propagation rules</h2>

              <ul>
                <li>Addition: add absolute uncertainties</li>
                <li>Subtraction: add absolute uncertainties</li>
                <li>Multiplication: add relative uncertainties</li>
                <li>Division: add relative uncertainties</li>
                <li>Report value ± absolute uncertainty</li>
              </ul>
            </div>

            <div className="sidebar-card">
              <p className="sidebar-card__label">
                Related calculator
              </p>

              <h2>Calculate single-value uncertainty</h2>

              <p>
                Convert an absolute uncertainty into relative
                and percentage form.
              </p>

              <Link href="/calculators/measurement-uncertainty-calculator">
                Open Measurement Uncertainty Calculator
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
