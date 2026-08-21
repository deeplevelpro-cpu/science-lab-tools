import type { Metadata } from "next";
import Link from "next/link";

import {
  ElasticPotentialEnergyCalculator,
} from "@/components/calculators/elastic-potential-energy-calculator";
import { CalculatorTrustPanel } from "@/components/calculator-trust";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";
import { createCalculatorSchema } from "@/lib/seo/calculator-schema";

const pageTitle =
  "Elastic Potential Energy Calculator";

const pageDescription =
  "Calculate elastic potential energy, spring constant, or extension using E = ½kx², with SI units, formula explanations, and step-by-step results.";

const pagePath =
  "/calculators/elastic-potential-energy-calculator";

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
      "What formula does the elastic potential energy calculator use?",
    answer:
      "It uses E = ½kx², where elastic potential energy equals one-half multiplied by the spring constant and the square of the extension.",
  },
  {
    question:
      "What is the SI unit of elastic potential energy?",
    answer:
      "The SI unit is the joule, written as J.",
  },
  {
    question:
      "What is the unit of spring constant?",
    answer:
      "The SI unit of spring constant is newtons per meter, written as N/m.",
  },
  {
    question:
      "Can the extension be zero or negative?",
    answer:
      "This calculator requires a positive extension magnitude when performing the calculation.",
  },
] as const;

const calculatorSchema = createCalculatorSchema({
  name: pageTitle,
  description: pageDescription,
  slug: "elastic-potential-energy-calculator",
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

export default function ElasticPotentialEnergyCalculatorPage() {
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
                Elastic Potential Energy Calculator
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">
              Spring energy tool
            </p>

            <h1>
              Elastic Potential Energy Calculator
            </h1>

            <p>
              Solve elastic potential energy, spring
              constant, or extension using E = ½kx².
            </p>
          </div>
        </Container>
      </section>

      <section
        className="tool-section"
        aria-label="Elastic potential energy calculator"
      >
        <Container>
          <ElasticPotentialEnergyCalculator />
        </Container>
      </section>

      <section className="article-section">
        <Container className="article-layout">
          <article className="article-content">
            <section aria-labelledby="overview-heading">
              <p className="eyebrow">
                Energy stored in a spring
              </p>

              <h2 id="overview-heading">
                What is elastic potential energy?
              </h2>

              <p>
                Elastic potential energy is stored
                when an elastic object, such as a
                spring, is stretched or compressed
                from its equilibrium position.
              </p>
            </section>

            <section aria-labelledby="formula-heading">
              <p className="eyebrow">Formula</p>

              <h2 id="formula-heading">
                Elastic potential energy formula
              </h2>

              <div className="formula-card">
                <p>
                  Elastic Energy
                  <span>E = ½kx²</span>
                </p>
              </div>

              <ul className="article-list">
                <li>
                  <strong>E</strong> is elastic
                  potential energy in joules.
                </li>
                <li>
                  <strong>k</strong> is the spring
                  constant in newtons per meter.
                </li>
                <li>
                  <strong>x</strong> is extension or
                  compression in meters.
                </li>
              </ul>
            </section>

            <section aria-labelledby="example-heading">
              <p className="eyebrow">
                Worked example
              </p>

              <h2 id="example-heading">
                A 200 N/m spring extends 0.5 m
              </h2>

              <ol className="calculation-steps">
                <li>
                  Write the formula:{" "}
                  <strong>E = ½kx²</strong>.
                </li>
                <li>
                  Substitute the values:{" "}
                  <strong>
                    E = ½ × 200 × 0.5²
                  </strong>.
                </li>
                <li>
                  Calculate the energy:{" "}
                  <strong>E = 25 J</strong>.
                </li>
              </ol>
            </section>

            <section aria-labelledby="rearranged-heading">
              <p className="eyebrow">
                Rearranged equations
              </p>

              <h2 id="rearranged-heading">
                Solve for spring constant or extension
              </h2>

              <div className="comparison-grid">
                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Spring Constant
                  </p>

                  <h3>k = 2E ÷ x²</h3>

                  <p>
                    Multiply energy by two, then divide
                    by the square of extension.
                  </p>
                </article>

                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Extension
                  </p>

                  <h3>x = √(2E ÷ k)</h3>

                  <p>
                    Divide twice the energy by the
                    spring constant, then take the
                    square root.
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
                Use newtons per meter for spring
                constant and meters for extension.
              </p>

              <div className="formula-card">
                <p>
                  Spring constant
                  <span>k in N/m</span>
                </p>
              </div>
            </section>

            <section aria-labelledby="hookes-law-heading">
              <p className="eyebrow">
                Hooke&apos;s law region
              </p>

              <h2 id="hookes-law-heading">
                When does this formula apply?
              </h2>

              <p>
                The formula assumes the spring behaves
                elastically and remains within the
                region where its spring constant is
                effectively constant.
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
                  Spring constant must be greater than
                  zero.
                </li>
                <li>
                  Extension magnitude must be greater
                  than zero.
                </li>
                <li>
                  Elastic energy must be greater than
                  zero when solving for another
                  variable.
                </li>
                <li>
                  The spring is assumed to remain in
                  its elastic range.
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
                Continue analyzing energy
              </h2>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/gravitational-potential-energy-calculator"
                >
                  Gravitational Potential Energy Calculator
                </Link>{" "}
                to calculate energy due to height.
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
                  href="/calculators/work-calculator"
                >
                  Work Calculator
                </Link>{" "}
                for force and displacement.
              </p>
            </section>

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">
                Questions and answers
              </p>

              <h2 id="faq-heading">
                Elastic potential energy FAQ
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

              <h2>Elastic energy checklist</h2>

              <ul>
                <li>Convert extension to meters</li>
                <li>Use spring constant in N/m</li>
                <li>Square the extension</li>
                <li>Use E = ½kx²</li>
                <li>Report energy in joules</li>
              </ul>
            </div>

            <div className="sidebar-card">
              <p className="sidebar-card__label">
                Related calculator
              </p>

              <h2>Calculate gravitational energy</h2>

              <p>
                Solve potential energy, mass, gravity,
                or height using PE = mgh.
              </p>

              <Link href="/calculators/gravitational-potential-energy-calculator">
                Open Gravitational Energy Calculator
              </Link>
            </div>
          </aside>
        </Container>
        <Container>
          <CalculatorTrustPanel subject="physics" />
        </Container>
      </section>
    </main>
  );
}
