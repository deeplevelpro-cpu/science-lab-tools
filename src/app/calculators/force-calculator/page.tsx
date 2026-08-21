import type { Metadata } from "next";

import { RelatedCalculators } from "@/components/related-calculators";
import { getRelatedCalculators } from "@/content/calculators/get-related-calculators";
import { calculators } from "@/content/calculators/registry";
import Link from "next/link";

import { ForceCalculator } from "@/components/calculators/force-calculator";
import { CalculatorTrustPanel } from "@/components/calculator-trust";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";
import { createCalculatorSchema } from "@/lib/seo/calculator-schema";

const pageTitle = "Force Calculator | Mass & Acceleration";
const pageDescription =
  "Calculate force, mass, or acceleration using Newton’s second law F = ma, with supported SI units, input validation, and clear step-by-step results.";

const pagePath =
  "/calculators/force-calculator";

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
      "What formula does the force calculator use?",
    answer:
      "It uses Newton's second law: force equals mass multiplied by acceleration, F = m × a.",
  },
  {
    question:
      "What is one newton?",
    answer:
      "One newton is the force needed to accelerate one kilogram of mass by one meter per second squared.",
  },
  {
    question:
      "Can force and acceleration be negative?",
    answer:
      "Yes. A negative sign indicates direction relative to the chosen positive axis.",
  },
  {
    question:
      "What units should I use?",
    answer:
      "Use kilograms for mass, meters per second squared for acceleration, and newtons for force.",
  },
] as const;

const calculatorSchema = createCalculatorSchema({
  name: pageTitle,
  description: pageDescription,
  slug: "force-calculator",
  category: "Physics",
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
  "force-calculator",
  calculators,
);

export default function ForceCalculatorPage() {
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
                Force Calculator
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">
              Newton&apos;s second law tool
            </p>

            <h1>Force Calculator</h1>

            <p>
              Solve force, mass, or acceleration from
              two known values using F = m × a.
            </p>
          </div>
        </Container>
      </section>

      <section
        className="tool-section"
        aria-label="Force calculator"
      >
        <Container>
          <ForceCalculator />
        </Container>
      </section>

      <section className="article-section">
        <Container className="article-layout">
          <article className="article-content">
            <section aria-labelledby="overview-heading">
              <p className="eyebrow">
                Newton&apos;s second law
              </p>

              <h2 id="overview-heading">
                What is force?
              </h2>

              <p>
                Force is a push or pull that can change
                an object&apos;s motion. The net force on
                an object equals its mass multiplied by
                its acceleration.
              </p>
            </section>

            <section aria-labelledby="formula-heading">
              <p className="eyebrow">Formula</p>

              <h2 id="formula-heading">
                Force formula
              </h2>

              <div className="formula-card">
                <p>
                  Force
                  <span>F = m × a</span>
                </p>
              </div>

              <ul className="article-list">
                <li>
                  <strong>F</strong> is net force in
                  newtons.
                </li>
                <li>
                  <strong>m</strong> is mass in
                  kilograms.
                </li>
                <li>
                  <strong>a</strong> is acceleration in
                  meters per second squared.
                </li>
              </ul>
            </section>

            <section aria-labelledby="example-heading">
              <p className="eyebrow">
                Worked example
              </p>

              <h2 id="example-heading">
                A 10 kg object accelerates at 3 m/s²
              </h2>

              <ol className="calculation-steps">
                <li>
                  Write the formula:{" "}
                  <strong>F = m × a</strong>.
                </li>
                <li>
                  Substitute the values:{" "}
                  <strong>F = 10 × 3</strong>.
                </li>
                <li>
                  Calculate the force:{" "}
                  <strong>F = 30 N</strong>.
                </li>
              </ol>
            </section>

            <section aria-labelledby="rearranged-heading">
              <p className="eyebrow">
                Rearranged equations
              </p>

              <h2 id="rearranged-heading">
                Solve for mass or acceleration
              </h2>

              <div className="comparison-grid">
                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Mass
                  </p>

                  <h3>m = F ÷ a</h3>

                  <p>
                    Divide force by non-zero
                    acceleration.
                  </p>
                </article>

                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Acceleration
                  </p>

                  <h3>a = F ÷ m</h3>

                  <p>
                    Divide force by a positive mass.
                  </p>
                </article>
              </div>
            </section>

            <section aria-labelledby="net-force-heading">
              <p className="eyebrow">
                Net force
              </p>

              <h2 id="net-force-heading">
                Use the combined force on the object
              </h2>

              <p>
                Newton&apos;s second law uses net force,
                which is the vector sum of all forces.
                Forces acting in opposite directions
                should use opposite signs before they are
                combined.
              </p>
            </section>

            <section aria-labelledby="sign-heading">
              <p className="eyebrow">
                Direction
              </p>

              <h2 id="sign-heading">
                Interpret positive and negative values
              </h2>

              <p>
                A positive or negative force indicates
                direction relative to the chosen axis.
                Because mass is positive, force and
                acceleration point in the same direction.
              </p>
            </section>

            <section aria-labelledby="units-heading">
              <p className="eyebrow">Units</p>

              <h2 id="units-heading">
                Standard SI units
              </h2>

              <p>
                One newton equals one kilogram meter per
                second squared. Convert grams to
                kilograms and other acceleration units to
                meters per second squared before using
                the calculator.
              </p>

              <div className="formula-card">
                <p>
                  One newton
                  <span>1 N = 1 kg·m/s²</span>
                </p>
              </div>
            </section>

            <section aria-labelledby="limitations-heading">
              <p className="eyebrow">
                Assumptions
              </p>

              <h2 id="limitations-heading">
                What the calculation represents
              </h2>

              <ul className="article-list">
                <li>
                  Force should represent the net force.
                </li>
                <li>
                  Mass must be greater than zero.
                </li>
                <li>
                  Direction signs must be used
                  consistently.
                </li>
                <li>
                  The calculation uses SI units without
                  automatic conversion.
                </li>
              </ul>
            </section>

            <section aria-labelledby="related-heading">
              <p className="eyebrow">
                Related tools
              </p>

              <h2 id="related-heading">
                Continue analyzing motion
              </h2>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/acceleration-calculator"
                >
                  Acceleration Calculator
                </Link>{" "}
                to calculate acceleration from initial
                velocity, final velocity, and time.
              </p>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/rate-of-change-calculator"
                >
                  Rate of Change Calculator
                </Link>{" "}
                for general change-over-interval
                calculations, and review the{" "}
                <Link
                  className="article-inline-link"
                  href="/lab-reports/tables-and-graphs"
                >
                  Tables and Graphs Guide
                </Link>{" "}
                when presenting force and acceleration
                data.
              </p>
            </section>

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">
                Questions and answers
              </p>

              <h2 id="faq-heading">
                Force calculator FAQ
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

              <h2>Force checklist</h2>

              <ul>
                <li>Use net force</li>
                <li>Convert mass to kilograms</li>
                <li>Choose a positive direction</li>
                <li>Preserve negative signs</li>
                <li>Report force in newtons</li>
              </ul>
            </div>

            <div className="sidebar-card">
              <p className="sidebar-card__label">
                Related calculator
              </p>

              <h2>Find acceleration first</h2>

              <p>
                Calculate acceleration from velocity
                change and elapsed time.
              </p>

              <Link href="/calculators/acceleration-calculator">
                Open Acceleration Calculator
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
