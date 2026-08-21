import type { Metadata } from "next";

import { RelatedCalculators } from "@/components/related-calculators";
import { getRelatedCalculators } from "@/content/calculators/get-related-calculators";
import { calculators } from "@/content/calculators/registry";
import Link from "next/link";

import { KineticEnergyCalculator } from "@/components/calculators/kinetic-energy-calculator";
import { CalculatorTrustPanel } from "@/components/calculator-trust";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";
import { createCalculatorSchema } from "@/lib/seo/calculator-schema";

const pageTitle = "Kinetic Energy Calculator";
const pageDescription =
  "Calculate kinetic energy, mass, or velocity using KE = ½mv², with SI units, formula explanations, input validation, and worked calculation steps.";

const pagePath =
  "/calculators/kinetic-energy-calculator";

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
      "What formula does the kinetic energy calculator use?",
    answer:
      "It uses the classical kinetic energy formula: KE = ½mv², where m is mass and v is speed.",
  },
  {
    question:
      "What is the SI unit of kinetic energy?",
    answer:
      "The SI unit of kinetic energy is the joule, written as J.",
  },
  {
    question:
      "Can kinetic energy be negative?",
    answer:
      "No. Classical kinetic energy cannot be negative because mass is positive and speed is squared.",
  },
  {
    question:
      "Can speed be negative?",
    answer:
      "No. Speed is a magnitude and must be zero or greater. Direction is represented by velocity, not speed.",
  },
] as const;

const calculatorSchema = createCalculatorSchema({
  name: pageTitle,
  description: pageDescription,
  slug: "kinetic-energy-calculator",
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
  "kinetic-energy-calculator",
  calculators,
);

export default function KineticEnergyCalculatorPage() {
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
                Kinetic Energy Calculator
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">
              Motion energy tool
            </p>

            <h1>Kinetic Energy Calculator</h1>

            <p>
              Solve kinetic energy, mass, or speed
              from two known values using KE = ½mv².
            </p>
          </div>
        </Container>
      </section>

      <section
        className="tool-section"
        aria-label="Kinetic energy calculator"
      >
        <Container>
          <KineticEnergyCalculator />
        </Container>
      </section>

      <section className="article-section">
        <Container className="article-layout">
          <article className="article-content">
            <section aria-labelledby="overview-heading">
              <p className="eyebrow">
                Energy of motion
              </p>

              <h2 id="overview-heading">
                What is kinetic energy?
              </h2>

              <p>
                Kinetic energy is the energy an object
                has because it is moving. It depends on
                the object&apos;s mass and on the square
                of its speed.
              </p>
            </section>

            <section aria-labelledby="formula-heading">
              <p className="eyebrow">Formula</p>

              <h2 id="formula-heading">
                Kinetic energy formula
              </h2>

              <div className="formula-card">
                <p>
                  Kinetic energy
                  <span>KE = ½mv²</span>
                </p>
              </div>

              <ul className="article-list">
                <li>
                  <strong>KE</strong> is kinetic energy
                  in joules.
                </li>
                <li>
                  <strong>m</strong> is mass in
                  kilograms.
                </li>
                <li>
                  <strong>v</strong> is speed in meters
                  per second.
                </li>
              </ul>
            </section>

            <section aria-labelledby="example-heading">
              <p className="eyebrow">
                Worked example
              </p>

              <h2 id="example-heading">
                A 10 kg object moves at 4 m/s
              </h2>

              <ol className="calculation-steps">
                <li>
                  Write the formula:{" "}
                  <strong>KE = ½mv²</strong>.
                </li>
                <li>
                  Substitute the values:{" "}
                  <strong>
                    KE = ½ × 10 × 4²
                  </strong>
                  .
                </li>
                <li>
                  Calculate the energy:{" "}
                  <strong>KE = 80 J</strong>.
                </li>
              </ol>
            </section>

            <section aria-labelledby="rearranged-heading">
              <p className="eyebrow">
                Rearranged equations
              </p>

              <h2 id="rearranged-heading">
                Solve for mass or speed
              </h2>

              <div className="comparison-grid">
                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Mass
                  </p>

                  <h3>m = 2KE ÷ v²</h3>

                  <p>
                    Divide twice the kinetic energy by
                    the square of a non-zero speed.
                  </p>
                </article>

                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Speed
                  </p>

                  <h3>v = √(2KE ÷ m)</h3>

                  <p>
                    Divide twice the kinetic energy by
                    a positive mass, then take the
                    square root.
                  </p>
                </article>
              </div>
            </section>

            <section aria-labelledby="speed-heading">
              <p className="eyebrow">
                Speed squared
              </p>

              <h2 id="speed-heading">
                Why speed has a large effect
              </h2>

              <p>
                Speed is squared in the kinetic energy
                formula. Doubling speed therefore makes
                kinetic energy four times larger when
                mass stays constant.
              </p>
            </section>

            <section aria-labelledby="zero-heading">
              <p className="eyebrow">
                Stationary objects
              </p>

              <h2 id="zero-heading">
                When kinetic energy equals zero
              </h2>

              <p>
                An object with zero speed has zero
                kinetic energy. The object may still
                possess other forms of energy, but its
                kinetic energy is zero while it is
                stationary.
              </p>
            </section>

            <section aria-labelledby="units-heading">
              <p className="eyebrow">Units</p>

              <h2 id="units-heading">
                Standard SI units
              </h2>

              <p>
                Use kilograms for mass and meters per
                second for speed. Convert grams,
                kilometers per hour, and other units
                before entering values.
              </p>

              <div className="formula-card">
                <p>
                  One joule
                  <span>1 J = 1 kg·m²/s²</span>
                </p>
              </div>
            </section>

            <section aria-labelledby="limitations-heading">
              <p className="eyebrow">
                Calculation checks
              </p>

              <h2 id="limitations-heading">
                Important input requirements
              </h2>

              <ul className="article-list">
                <li>
                  Mass must be greater than zero.
                </li>
                <li>
                  Speed cannot be negative.
                </li>
                <li>
                  Kinetic energy cannot be negative.
                </li>
                <li>
                  Speed must be greater than zero when
                  calculating mass.
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
                Continue analyzing motion
              </h2>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/momentum-calculator"
                >
                  Momentum Calculator
                </Link>{" "}
                to analyze mass and velocity using
                p = m × v.
              </p>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/force-calculator"
                >
                  Force Calculator
                </Link>{" "}
                for Newton&apos;s second law problems,
                and use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/acceleration-calculator"
                >
                  Acceleration Calculator
                </Link>{" "}
                to calculate velocity change over time.
              </p>
            </section>

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">
                Questions and answers
              </p>

              <h2 id="faq-heading">
                Kinetic energy calculator FAQ
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

              <h2>Kinetic energy checklist</h2>

              <ul>
                <li>Convert mass to kilograms</li>
                <li>Convert speed to m/s</li>
                <li>Square the speed</li>
                <li>Use non-negative energy</li>
                <li>Report energy in joules</li>
              </ul>
            </div>

            <div className="sidebar-card">
              <p className="sidebar-card__label">
                Related calculator
              </p>

              <h2>Calculate momentum</h2>

              <p>
                Solve momentum, mass, or velocity using
                the linear momentum formula.
              </p>

              <Link href="/calculators/momentum-calculator">
                Open Momentum Calculator
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
