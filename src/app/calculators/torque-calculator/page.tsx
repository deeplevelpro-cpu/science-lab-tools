import type { Metadata } from "next";
import Link from "next/link";

import {
  TorqueCalculator,
} from "@/components/calculators/torque-calculator";
import { CalculatorTrustPanel } from "@/components/calculator-trust";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";

const pageTitle = "Torque Calculator | Force & Lever Arm";

const pageDescription =
  "Calculate torque, perpendicular force, or lever-arm distance using τ = Fr, with SI units, formula explanations, and clear calculation steps.";

const pagePath =
  "/calculators/torque-calculator";

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
      "What formula does the torque calculator use?",
    answer:
      "It uses τ = Fr for a force acting perpendicular to the lever arm, where torque equals force multiplied by perpendicular distance.",
  },
  {
    question:
      "What is the SI unit of torque?",
    answer:
      "The SI unit of torque is the newton-meter, written as N·m.",
  },
  {
    question:
      "What is the lever arm in a torque calculation?",
    answer:
      "The lever arm is the perpendicular distance from the pivot or axis of rotation to the line of action of the force.",
  },
  {
    question:
      "How do you calculate force from torque?",
    answer:
      "Divide torque by the lever-arm distance using F = τ ÷ r.",
  },
] as const;

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: pageTitle,
  description: pageDescription,
  url: absoluteUrl(pagePath),
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

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

export default function TorqueCalculatorPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            webApplicationSchema,
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
                Torque Calculator
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">
              Rotational force tool
            </p>

            <h1>Torque Calculator</h1>

            <p>
              Solve torque, force, or lever-arm
              distance using τ = Fr.
            </p>
          </div>
        </Container>
      </section>

      <section
        className="tool-section"
        aria-label="Torque calculator"
      >
        <Container>
          <TorqueCalculator />
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
                What is torque?
              </h2>

              <p>
                Torque measures the turning effect of
                a force around a pivot or axis. Greater
                force or a longer lever arm produces
                greater torque.
              </p>
            </section>

            <section aria-labelledby="formula-heading">
              <p className="eyebrow">Formula</p>

              <h2 id="formula-heading">
                Torque formula
              </h2>

              <div className="formula-card">
                <p>
                  Torque
                  <span>τ = Fr</span>
                </p>
              </div>

              <ul className="article-list">
                <li>
                  <strong>τ</strong> is torque in
                  newton-meters.
                </li>
                <li>
                  <strong>F</strong> is perpendicular
                  force in newtons.
                </li>
                <li>
                  <strong>r</strong> is lever-arm
                  distance in meters.
                </li>
              </ul>
            </section>

            <section aria-labelledby="example-heading">
              <p className="eyebrow">
                Worked example
              </p>

              <h2 id="example-heading">
                An 80 N force acts 0.5 m from a pivot
              </h2>

              <ol className="calculation-steps">
                <li>
                  Write the formula:{" "}
                  <strong>τ = Fr</strong>.
                </li>
                <li>
                  Substitute the values:{" "}
                  <strong>τ = 80 × 0.5</strong>.
                </li>
                <li>
                  Calculate the torque:{" "}
                  <strong>τ = 40 N·m</strong>.
                </li>
              </ol>
            </section>

            <section aria-labelledby="angle-heading">
              <p className="eyebrow">
                Force direction
              </p>

              <h2 id="angle-heading">
                Perpendicular force assumption
              </h2>

              <p>
                This calculator uses τ = Fr, which
                assumes the force acts perpendicular
                to the lever arm. For a force at an
                angle, the general formula is
                τ = Fr sin θ.
              </p>
            </section>

            <section aria-labelledby="rearranged-heading">
              <p className="eyebrow">
                Rearranged equations
              </p>

              <h2 id="rearranged-heading">
                Solve for force or lever arm
              </h2>

              <div className="comparison-grid">
                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Force
                  </p>

                  <h3>F = τ ÷ r</h3>

                  <p>
                    Divide torque by lever-arm
                    distance.
                  </p>
                </article>

                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Lever Arm
                  </p>

                  <h3>r = τ ÷ F</h3>

                  <p>
                    Divide torque by force.
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
                Use newton-meters for torque, newtons
                for force, and meters for the lever
                arm.
              </p>
            </section>

            <section aria-labelledby="applications-heading">
              <p className="eyebrow">
                Real-world applications
              </p>

              <h2 id="applications-heading">
                Where torque calculations are used
              </h2>

              <ul className="article-list">
                <li>
                  Wrenches, spanners, and fasteners.
                </li>
                <li>
                  Doors, levers, and rotating handles.
                </li>
                <li>
                  Motors, shafts, and mechanical
                  systems.
                </li>
                <li>
                  Laboratory rotational-equilibrium
                  experiments.
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
                  Torque, force, and lever arm must be
                  greater than zero.
                </li>
                <li>
                  Force is assumed to act perpendicular
                  to the lever arm.
                </li>
                <li>
                  Lever arm means perpendicular
                  distance from the pivot.
                </li>
                <li>
                  The calculator uses magnitudes and
                  does not represent rotation
                  direction.
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
                Continue your mechanics calculations
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
                  href="/calculators/work-calculator"
                >
                  Work Calculator
                </Link>{" "}
                to calculate work, force, or distance.
              </p>
            </section>

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">
                Questions and answers
              </p>

              <h2 id="faq-heading">
                Torque calculator FAQ
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

              <h2>Torque checklist</h2>

              <ul>
                <li>Use force in newtons</li>
                <li>Use distance in meters</li>
                <li>Use perpendicular distance</li>
                <li>Apply τ = Fr</li>
                <li>Report torque in N·m</li>
              </ul>
            </div>

            <div className="sidebar-card">
              <p className="sidebar-card__label">
                Related calculator
              </p>

              <h2>Calculate force</h2>

              <p>
                Solve force, mass, or acceleration
                using F = ma.
              </p>

              <Link href="/calculators/force-calculator">
                Open Force Calculator
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
