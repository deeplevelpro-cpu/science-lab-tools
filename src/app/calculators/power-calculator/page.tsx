import type { Metadata } from "next";

import { RelatedCalculators } from "@/components/related-calculators";
import { getRelatedCalculators } from "@/content/calculators/get-related-calculators";
import { calculators } from "@/content/calculators/registry";
import Link from "next/link";

import { PowerCalculator } from "@/components/calculators/power-calculator";
import { CalculatorTrustPanel } from "@/components/calculator-trust";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";
import { createCalculatorSchema } from "@/lib/seo/calculator-schema";
import { createFAQSchema } from "@/lib/seo/faq-schema";

const pageTitle = "Power Calculator | Work, Energy & Time";
const pageDescription =
  "Calculate power, work, or elapsed time using P = W ÷ t, with watt, joule, and time-unit guidance plus clear step-by-step calculation results.";

const pagePath = "/calculators/power-calculator";

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
    question: "What formula does the power calculator use?",
    answer:
      "It uses P = W ÷ t, where power equals work divided by time.",
  },
  {
    question: "What is the SI unit of power?",
    answer:
      "The SI unit of power is the watt, written as W. One watt equals one joule per second.",
  },
  {
    question: "Can power be negative?",
    answer:
      "Yes. Negative power can represent energy being removed from a system or work occurring in the opposite defined direction.",
  },
  {
    question: "Can time be zero or negative?",
    answer:
      "No. This calculator requires time to be greater than zero.",
  },
] as const;

const calculatorSchema = createCalculatorSchema({
  name: pageTitle,
  description: pageDescription,
  slug: "power-calculator",
  category: "Physics",
});

const faqSchema = createFAQSchema(faqItems);

const relatedCalculators = getRelatedCalculators(
  "power-calculator",
  calculators,
);

export default function PowerCalculatorPage() {
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
                Power Calculator
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">
              Work and time tool
            </p>

            <h1>Power Calculator</h1>

            <p>
              Solve power, work, or time from two
              known values using P = W ÷ t.
            </p>
          </div>
        </Container>
      </section>

      <section
        className="tool-section"
        aria-label="Power calculator"
      >
        <Container>
          <PowerCalculator />
        </Container>
      </section>

      <section className="article-section">
        <Container className="article-layout">
          <article className="article-content">
            <section aria-labelledby="overview-heading">
              <p className="eyebrow">
                Energy transfer rate
              </p>

              <h2 id="overview-heading">
                What is power in physics?
              </h2>

              <p>
                Power measures how quickly work is done
                or energy is transferred. The same
                amount of work produces greater power
                when completed in less time.
              </p>
            </section>

            <section aria-labelledby="formula-heading">
              <p className="eyebrow">Formula</p>

              <h2 id="formula-heading">
                Power formula
              </h2>

              <div className="formula-card">
                <p>
                  Power
                  <span>P = W ÷ t</span>
                </p>
              </div>

              <ul className="article-list">
                <li>
                  <strong>P</strong> is power in watts.
                </li>
                <li>
                  <strong>W</strong> is work in joules.
                </li>
                <li>
                  <strong>t</strong> is time in seconds.
                </li>
              </ul>
            </section>

            <section aria-labelledby="example-heading">
              <p className="eyebrow">
                Worked example
              </p>

              <h2 id="example-heading">
                600 J of work is completed in 12 s
              </h2>

              <ol className="calculation-steps">
                <li>
                  Write the formula:{" "}
                  <strong>P = W ÷ t</strong>.
                </li>
                <li>
                  Substitute the values:{" "}
                  <strong>P = 600 ÷ 12</strong>.
                </li>
                <li>
                  Calculate the power:{" "}
                  <strong>P = 50 W</strong>.
                </li>
              </ol>
            </section>

            <section aria-labelledby="rearranged-heading">
              <p className="eyebrow">
                Rearranged equations
              </p>

              <h2 id="rearranged-heading">
                Solve for work or time
              </h2>

              <div className="comparison-grid">
                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Work
                  </p>

                  <h3>W = P × t</h3>

                  <p>
                    Multiply power by positive time.
                  </p>
                </article>

                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Time
                  </p>

                  <h3>t = W ÷ P</h3>

                  <p>
                    Divide work by non-zero power.
                    Work and power must have matching
                    signs.
                  </p>
                </article>
              </div>
            </section>

            <section aria-labelledby="units-heading">
              <p className="eyebrow">Units</p>

              <h2 id="units-heading">
                Standard SI units
              </h2>

              <p>
                Use joules for work and seconds for
                time. Convert other units before
                entering values.
              </p>

              <div className="formula-card">
                <p>
                  One watt
                  <span>1 W = 1 J/s</span>
                </p>
              </div>
            </section>

            <section aria-labelledby="interpretation-heading">
              <p className="eyebrow">
                Understanding results
              </p>

              <h2 id="interpretation-heading">
                What does a higher power value mean?
              </h2>

              <p>
                A higher power value means work is
                being completed faster. Two machines
                may perform the same amount of work,
                but the machine that finishes sooner
                has greater power.
              </p>
            </section>

            <section aria-labelledby="limitations-heading">
              <p className="eyebrow">
                Calculation limits
              </p>

              <h2 id="limitations-heading">
                Important assumptions
              </h2>

              <ul className="article-list">
                <li>
                  Time must be greater than zero.
                </li>
                <li>
                  Power may be positive, negative, or
                  zero when calculating work.
                </li>
                <li>
                  Power cannot be zero when calculating
                  time.
                </li>
                <li>
                  Work and power must have matching
                  signs when calculating time.
                </li>
                <li>
                  The calculator does not automatically
                  convert units.
                </li>
              </ul>
            </section>

            <section aria-labelledby="related-heading">
              <p className="eyebrow">
                Related tools
              </p>

              <h2 id="related-heading">
                Continue analyzing mechanics
              </h2>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/work-calculator"
                >
                  Work Calculator
                </Link>{" "}
                to solve work, force, or distance.
              </p>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/kinetic-energy-calculator"
                >
                  Kinetic Energy Calculator
                </Link>{" "}
                for motion energy, or use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/force-calculator"
                >
                  Force Calculator
                </Link>{" "}
                for force, mass, and acceleration.
              </p>
            </section>

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">
                Questions and answers
              </p>

              <h2 id="faq-heading">
                Power calculator FAQ
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

              <h2>Power calculation checklist</h2>

              <ul>
                <li>Convert work to joules</li>
                <li>Convert time to seconds</li>
                <li>Use P = W ÷ t</li>
                <li>Check positive time</li>
                <li>Report power in watts</li>
              </ul>
            </div>

            <div className="sidebar-card">
              <p className="sidebar-card__label">
                Related calculator
              </p>

              <h2>Calculate mechanical work</h2>

              <p>
                Solve work, force, or distance using
                W = F × d.
              </p>

              <Link href="/calculators/work-calculator">
                Open Work Calculator
              </Link>
            </div>
          </aside>
        </Container>
        <Container>
          <CalculatorTrustPanel subject="physics" />
        </Container>
      </section>
    

      <RelatedCalculators
        calculators={relatedCalculators}
      />
</main>
  );
}
