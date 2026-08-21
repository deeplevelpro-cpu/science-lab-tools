import type { Metadata } from "next";

import { RelatedCalculators } from "@/components/related-calculators";
import { getRelatedCalculators } from "@/content/calculators/get-related-calculators";
import { calculators } from "@/content/calculators/registry";
import Link from "next/link";

import {
  RotationalPowerCalculator,
} from "@/components/calculators/rotational-power-calculator";
import { CalculatorTrustPanel } from "@/components/calculator-trust";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";
import { createCalculatorSchema } from "@/lib/seo/calculator-schema";

const pageTitle =
  "Rotational Power Calculator";

const pageDescription =
  "Calculate rotational power, torque, or angular velocity using P = τω, with watt, newton-meter, and radian-per-second unit guidance.";

const pagePath =
  "/calculators/rotational-power-calculator";

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
      "What formula does the rotational power calculator use?",
    answer:
      "It uses P = τω, where rotational power equals torque multiplied by angular velocity.",
  },
  {
    question:
      "What is rotational power?",
    answer:
      "Rotational power is the rate at which rotational work is performed or rotational energy is transferred.",
  },
  {
    question:
      "How do you calculate torque from rotational power?",
    answer:
      "Divide rotational power by angular velocity using τ = P ÷ ω.",
  },
  {
    question:
      "What units are used for rotational power?",
    answer:
      "Use watts for power, newton-meters for torque, and radians per second for angular velocity.",
  },
] as const;

const calculatorSchema = createCalculatorSchema({
  name: pageTitle,
  description: pageDescription,
  slug: "rotational-power-calculator",
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
  "rotational-power-calculator",
  calculators,
);

export default function RotationalPowerCalculatorPage() {
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
                Rotational Power Calculator
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">
              Rotational mechanics tool
            </p>

            <h1>
              Rotational Power Calculator
            </h1>

            <p>
              Solve rotational power, torque, or
              angular velocity using P = τω.
            </p>
          </div>
        </Container>
      </section>

      <section
        className="tool-section"
        aria-label="Rotational power calculator"
      >
        <Container>
          <RotationalPowerCalculator />
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
                What is rotational power?
              </h2>

              <p>
                Rotational power measures how quickly
                rotational work is performed. It
                depends on the torque applied to an
                object and its angular velocity.
              </p>
            </section>

            <section aria-labelledby="formula-heading">
              <p className="eyebrow">Formula</p>

              <h2 id="formula-heading">
                Rotational power formula
              </h2>

              <div className="formula-card">
                <p>
                  Rotational Power
                  <span>P = τω</span>
                </p>
              </div>

              <ul className="article-list">
                <li>
                  <strong>P</strong> is rotational
                  power in watts.
                </li>
                <li>
                  <strong>τ</strong> is torque in
                  newton-meters.
                </li>
                <li>
                  <strong>ω</strong> is angular
                  velocity in radians per second.
                </li>
              </ul>
            </section>

            <section aria-labelledby="example-heading">
              <p className="eyebrow">
                Worked example
              </p>

              <h2 id="example-heading">
                A shaft produces 12 N·m of torque at
                5 rad/s
              </h2>

              <ol className="calculation-steps">
                <li>
                  Write the formula:{" "}
                  <strong>P = τω</strong>.
                </li>
                <li>
                  Substitute the values:{" "}
                  <strong>P = 12 × 5</strong>.
                </li>
                <li>
                  Calculate the power:{" "}
                  <strong>P = 60 W</strong>.
                </li>
              </ol>
            </section>

            <section aria-labelledby="rearranged-heading">
              <p className="eyebrow">
                Rearranged equations
              </p>

              <h2 id="rearranged-heading">
                Solve for torque or angular velocity
              </h2>

              <div className="comparison-grid">
                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Torque
                  </p>

                  <h3>τ = P ÷ ω</h3>

                  <p>
                    Divide rotational power by angular
                    velocity.
                  </p>
                </article>

                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Angular velocity
                  </p>

                  <h3>ω = P ÷ τ</h3>

                  <p>
                    Divide rotational power by torque.
                  </p>
                </article>
              </div>
            </section>

            <section aria-labelledby="relationship-heading">
              <p className="eyebrow">
                Physical relationship
              </p>

              <h2 id="relationship-heading">
                Torque and speed both affect power
              </h2>

              <p>
                Rotational power increases when torque
                increases, angular velocity increases,
                or both increase. A system can produce
                the same power using high torque at
                low speed or lower torque at higher
                speed.
              </p>
            </section>

            <section aria-labelledby="units-heading">
              <p className="eyebrow">Units</p>

              <h2 id="units-heading">
                Standard SI units
              </h2>

              <p>
                Use watts for power, newton-meters for
                torque, and radians per second for
                angular velocity.
              </p>
            </section>

            <section aria-labelledby="applications-heading">
              <p className="eyebrow">
                Real-world applications
              </p>

              <h2 id="applications-heading">
                Where rotational power is used
              </h2>

              <ul className="article-list">
                <li>
                  Electric motors and generators.
                </li>
                <li>
                  Vehicle engines and drive shafts.
                </li>
                <li>
                  Turbines and industrial machinery.
                </li>
                <li>
                  Gearboxes and transmission systems.
                </li>
                <li>
                  Rotating laboratory equipment.
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
                  Power, torque, and angular velocity
                  must be greater than zero.
                </li>
                <li>
                  Torque is assumed to act along the
                  rotation axis.
                </li>
                <li>
                  Angular velocity is treated as
                  constant at the calculation point.
                </li>
                <li>
                  Mechanical losses are not included.
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
                  href="/calculators/angular-velocity-calculator"
                >
                  Angular Velocity Calculator
                </Link>{" "}
                to calculate angular velocity,
                angular displacement, or time.
              </p>
            </section>

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">
                Questions and answers
              </p>

              <h2 id="faq-heading">
                Rotational power calculator FAQ
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
                Rotational power checklist
              </h2>

              <ul>
                <li>Use power in watts</li>
                <li>Use torque in newton-meters</li>
                <li>
                  Use angular velocity in rad/s
                </li>
                <li>Apply P = τω</li>
                <li>Check all values are positive</li>
              </ul>
            </div>

            <div className="sidebar-card">
              <p className="sidebar-card__label">
                Related calculator
              </p>

              <h2>
                Calculate rotational energy
              </h2>

              <p>
                Solve rotational kinetic energy,
                moment of inertia, or angular velocity
                using KErot = ½Iω².
              </p>

              <Link href="/calculators/rotational-kinetic-energy-calculator">
                Open Rotational Energy Calculator
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
