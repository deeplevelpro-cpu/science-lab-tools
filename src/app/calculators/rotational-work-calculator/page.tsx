import type { Metadata } from "next";

import { RelatedCalculators } from "@/components/related-calculators";
import { getRelatedCalculators } from "@/content/calculators/get-related-calculators";
import { calculators } from "@/content/calculators/registry";
import Link from "next/link";

import {
  RotationalWorkCalculator,
} from "@/components/calculators/rotational-work-calculator";
import { CalculatorTrustPanel } from "@/components/calculator-trust";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";
import { createCalculatorSchema } from "@/lib/seo/calculator-schema";

const pageTitle =
  "Rotational Work Calculator";

const pageDescription =
  "Calculate rotational work, torque, or angular displacement using W = τθ, with SI units, formula explanations, and clear step-by-step results.";

const pagePath =
  "/calculators/rotational-work-calculator";

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
      "What formula does the rotational work calculator use?",
    answer:
      "It uses W = τθ, where rotational work equals torque multiplied by angular displacement in radians.",
  },
  {
    question:
      "What is rotational work?",
    answer:
      "Rotational work is the energy transferred when a torque rotates an object through an angular displacement.",
  },
  {
    question:
      "How do you calculate torque from rotational work?",
    answer:
      "Divide rotational work by angular displacement using τ = W ÷ θ.",
  },
  {
    question:
      "What units are used for rotational work?",
    answer:
      "Rotational work is measured in joules, torque in newton meters, and angular displacement in radians.",
  },
] as const;

const calculatorSchema = createCalculatorSchema({
  name: pageTitle,
  description: pageDescription,
  slug: "rotational-work-calculator",
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
  "rotational-work-calculator",
  calculators,
);

export default function RotationalWorkCalculatorPage() {
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
                Rotational Work Calculator
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">
              Rotational mechanics tool
            </p>

            <h1>
              Rotational Work Calculator
            </h1>

            <p>
              Solve rotational work, torque, or
              angular displacement using W = τθ.
            </p>
          </div>
        </Container>
      </section>

      <section
        className="tool-section"
        aria-label="Rotational work calculator"
      >
        <Container>
          <RotationalWorkCalculator />
        </Container>
      </section>

      <section className="article-section">
        <Container className="article-layout">
          <article className="article-content">
            <section aria-labelledby="overview-heading">
              <p className="eyebrow">
                Physics overview
              </p>

              <h2 id="overview-heading">
                What is rotational work?
              </h2>

              <p>
                Rotational work is the energy
                transferred when torque turns an
                object through an angular displacement.
              </p>
            </section>

            <section aria-labelledby="formula-heading">
              <p className="eyebrow">Formula</p>

              <h2 id="formula-heading">
                Rotational work formula
              </h2>

              <div className="formula-card">
                <p>
                  Rotational Work
                  <span>W = τθ</span>
                </p>
              </div>

              <ul className="article-list">
                <li>
                  <strong>W</strong> is rotational
                  work in joules.
                </li>
                <li>
                  <strong>τ</strong> is torque in
                  N·m.
                </li>
                <li>
                  <strong>θ</strong> is angular
                  displacement in radians.
                </li>
              </ul>
            </section>

            <section aria-labelledby="example-heading">
              <p className="eyebrow">
                Worked example
              </p>

              <h2 id="example-heading">
                A torque of 8 N·m rotates an object
                through 3 radians
              </h2>

              <ol className="calculation-steps">
                <li>
                  Write the formula:{" "}
                  <strong>W = τθ</strong>.
                </li>
                <li>
                  Substitute the values:{" "}
                  <strong>W = 8 × 3</strong>.
                </li>
                <li>
                  Calculate rotational work:{" "}
                  <strong>W = 24 J</strong>.
                </li>
              </ol>
            </section>

            <section aria-labelledby="rearranged-heading">
              <p className="eyebrow">
                Rearranged equations
              </p>

              <h2 id="rearranged-heading">
                Solve for torque or angular
                displacement
              </h2>

              <div className="comparison-grid">
                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Torque
                  </p>

                  <h3>τ = W ÷ θ</h3>

                  <p>
                    Divide rotational work by angular
                    displacement.
                  </p>
                </article>

                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Angular displacement
                  </p>

                  <h3>θ = W ÷ τ</h3>

                  <p>
                    Divide rotational work by torque.
                  </p>
                </article>
              </div>
            </section>

            <section aria-labelledby="relationship-heading">
              <p className="eyebrow">
                Physical relationship
              </p>

              <h2 id="relationship-heading">
                Torque and angle both affect work
              </h2>

              <p>
                Rotational work increases when torque
                increases, angular displacement
                increases, or both increase.
              </p>
            </section>

            <section aria-labelledby="units-heading">
              <p className="eyebrow">Units</p>

              <h2 id="units-heading">
                Standard SI units
              </h2>

              <p>
                Use joules for rotational work,
                newton meters for torque, and radians
                for angular displacement.
              </p>
            </section>

            <section aria-labelledby="applications-heading">
              <p className="eyebrow">
                Real-world applications
              </p>

              <h2 id="applications-heading">
                Where rotational work is used
              </h2>

              <ul className="article-list">
                <li>
                  Motors and rotating machinery.
                </li>
                <li>
                  Wheels, gears, and flywheels.
                </li>
                <li>
                  Turbines and mechanical shafts.
                </li>
                <li>
                  Vehicle drivetrain systems.
                </li>
                <li>
                  Robotics and rotational actuators.
                </li>
              </ul>
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
                  All entered values must be greater
                  than zero.
                </li>
                <li>
                  Torque is treated as constant.
                </li>
                <li>
                  Angular displacement must be entered
                  in radians.
                </li>
                <li>
                  Vector direction is not represented.
                </li>
                <li>
                  Units are not converted
                  automatically.
                </li>
              </ul>
            </section>

            <section aria-labelledby="related-heading">
              <p className="eyebrow">
                Related tools
              </p>

              <h2 id="related-heading">
                Continue your rotational analysis
              </h2>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/torque-calculator"
                >
                  Torque Calculator
                </Link>{" "}
                to calculate torque, force, or lever
                arm distance.
              </p>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/rotational-power-calculator"
                >
                  Rotational Power Calculator
                </Link>{" "}
                to calculate power, torque, or angular
                velocity.
              </p>
            </section>

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">
                Questions and answers
              </p>

              <h2 id="faq-heading">
                Rotational work calculator FAQ
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

              <h2>
                Rotational work checklist
              </h2>

              <ul>
                <li>Use work in joules</li>
                <li>Use torque in N·m</li>
                <li>
                  Use angular displacement in radians
                </li>
                <li>Apply W = τθ</li>
                <li>Check all values are positive</li>
              </ul>
            </div>

            <div className="sidebar-card">
              <p className="sidebar-card__label">
                Related calculator
              </p>

              <h2>
                Calculate rotational power
              </h2>

              <p>
                Solve rotational power, torque, or
                angular velocity using P = τω.
              </p>

              <Link href="/calculators/rotational-power-calculator">
                Open Rotational Power Calculator
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
