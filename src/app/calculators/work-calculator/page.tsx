import type { Metadata } from "next";

import { RelatedCalculators } from "@/components/related-calculators";
import { getRelatedCalculators } from "@/content/calculators/get-related-calculators";
import { calculators } from "@/content/calculators/registry";
import Link from "next/link";

import { WorkCalculator } from "@/components/calculators/work-calculator";
import { CalculatorTrustPanel } from "@/components/calculator-trust";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";
import { createCalculatorSchema } from "@/lib/seo/calculator-schema";
import { createFAQSchema } from "@/lib/seo/faq-schema";

const pageTitle = "Work Calculator | Force & Distance";
const pageDescription =
  "Calculate mechanical work, force, or distance using W = Fd, with joule, newton, and meter units plus clear step-by-step calculation results.";

const pagePath = "/calculators/work-calculator";

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
    question: "What formula does the work calculator use?",
    answer:
      "It uses W = F × d for a constant force acting parallel or opposite to the displacement.",
  },
  {
    question: "What is the SI unit of work?",
    answer:
      "The SI unit of work is the joule, written as J. One joule equals one newton-meter.",
  },
  {
    question: "Can work be negative?",
    answer:
      "Yes. Work is negative when the force acts opposite to the displacement.",
  },
  {
    question: "Can distance be negative?",
    answer:
      "This calculator uses positive distance magnitude. Direction is represented by the sign of the force and work.",
  },
] as const;

const calculatorSchema = createCalculatorSchema({
  name: pageTitle,
  description: pageDescription,
  slug: "work-calculator",
  category: "Physics",
});

const faqSchema = createFAQSchema(faqItems);

const relatedCalculators = getRelatedCalculators(
  "work-calculator",
  calculators,
);

export default function WorkCalculatorPage() {
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
                Work Calculator
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">
              Force and displacement tool
            </p>

            <h1>Work Calculator</h1>

            <p>
              Solve work, force, or distance from two
              known values using W = F × d.
            </p>
          </div>
        </Container>
      </section>

      <section
        className="tool-section"
        aria-label="Work calculator"
      >
        <Container>
          <WorkCalculator />
        </Container>
      </section>

      <section className="article-section">
        <Container className="article-layout">
          <article className="article-content">
            <section aria-labelledby="overview-heading">
              <p className="eyebrow">
                Mechanical energy transfer
              </p>

              <h2 id="overview-heading">
                What is work in physics?
              </h2>

              <p>
                Work is the energy transferred when a
                force moves an object through a
                distance. The simple formula applies
                when the force acts parallel or
                opposite to the displacement.
              </p>
            </section>

            <section aria-labelledby="formula-heading">
              <p className="eyebrow">Formula</p>

              <h2 id="formula-heading">
                Work formula
              </h2>

              <div className="formula-card">
                <p>
                  Work
                  <span>W = F × d</span>
                </p>
              </div>

              <ul className="article-list">
                <li>
                  <strong>W</strong> is work in joules.
                </li>
                <li>
                  <strong>F</strong> is force in
                  newtons.
                </li>
                <li>
                  <strong>d</strong> is distance in
                  meters.
                </li>
              </ul>
            </section>

            <section aria-labelledby="example-heading">
              <p className="eyebrow">
                Worked example
              </p>

              <h2 id="example-heading">
                A 20 N force moves an object 5 m
              </h2>

              <ol className="calculation-steps">
                <li>
                  Write the formula:{" "}
                  <strong>W = F × d</strong>.
                </li>
                <li>
                  Substitute the values:{" "}
                  <strong>W = 20 × 5</strong>.
                </li>
                <li>
                  Calculate the work:{" "}
                  <strong>W = 100 J</strong>.
                </li>
              </ol>
            </section>

            <section aria-labelledby="rearranged-heading">
              <p className="eyebrow">
                Rearranged equations
              </p>

              <h2 id="rearranged-heading">
                Solve for force or distance
              </h2>

              <div className="comparison-grid">
                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Force
                  </p>

                  <h3>F = W ÷ d</h3>

                  <p>
                    Divide work by a positive distance.
                  </p>
                </article>

                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Distance
                  </p>

                  <h3>d = W ÷ F</h3>

                  <p>
                    Divide work by a non-zero force.
                    Work and force must have matching
                    signs.
                  </p>
                </article>
              </div>
            </section>

            <section aria-labelledby="negative-heading">
              <p className="eyebrow">
                Direction and signs
              </p>

              <h2 id="negative-heading">
                Positive, negative, and zero work
              </h2>

              <p>
                Work is positive when force acts in the
                direction of displacement and negative
                when force acts opposite to it. Work is
                zero when the force is zero or when
                there is no displacement.
              </p>
            </section>

            <section aria-labelledby="units-heading">
              <p className="eyebrow">Units</p>

              <h2 id="units-heading">
                Standard SI units
              </h2>

              <p>
                Use newtons for force and meters for
                distance. Convert other units before
                entering values.
              </p>

              <div className="formula-card">
                <p>
                  One joule
                  <span>1 J = 1 N·m</span>
                </p>
              </div>
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
                  Distance must be greater than zero.
                </li>
                <li>
                  Force may be positive, negative, or
                  zero when calculating work.
                </li>
                <li>
                  Force cannot be zero when calculating
                  distance.
                </li>
                <li>
                  The formula assumes force is parallel
                  or opposite to displacement.
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
                  href="/calculators/force-calculator"
                >
                  Force Calculator
                </Link>{" "}
                to solve force, mass, or acceleration.
              </p>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/kinetic-energy-calculator"
                >
                  Kinetic Energy Calculator
                </Link>{" "}
                to calculate motion energy, or use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/momentum-calculator"
                >
                  Momentum Calculator
                </Link>{" "}
                for mass and velocity problems.
              </p>
            </section>

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">
                Questions and answers
              </p>

              <h2 id="faq-heading">
                Work calculator FAQ
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

              <h2>Work calculation checklist</h2>

              <ul>
                <li>Convert force to newtons</li>
                <li>Convert distance to meters</li>
                <li>Check force direction</li>
                <li>Use W = F × d</li>
                <li>Report work in joules</li>
              </ul>
            </div>

            <div className="sidebar-card">
              <p className="sidebar-card__label">
                Related calculator
              </p>

              <h2>Calculate kinetic energy</h2>

              <p>
                Solve kinetic energy, mass, or speed
                using KE = ½mv².
              </p>

              <Link href="/calculators/kinetic-energy-calculator">
                Open Kinetic Energy Calculator
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
