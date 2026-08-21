import type { Metadata } from "next";

import { RelatedCalculators } from "@/components/related-calculators";
import { getRelatedCalculators } from "@/content/calculators/get-related-calculators";
import { calculators } from "@/content/calculators/registry";
import Link from "next/link";

import {
  RotationalDynamicsCalculator,
} from "@/components/calculators/rotational-dynamics-calculator";
import { CalculatorTrustPanel } from "@/components/calculator-trust";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";
import { createCalculatorSchema } from "@/lib/seo/calculator-schema";

const pageTitle =
  "Rotational Dynamics Calculator";

const pageDescription =
  "Calculate torque, moment of inertia, or angular acceleration using τ = Iα, with SI units, formula guidance, and step-by-step rotational results.";

const pagePath =
  "/calculators/rotational-dynamics-calculator";

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
      "What formula does the rotational dynamics calculator use?",
    answer:
      "It uses τ = Iα, where torque equals moment of inertia multiplied by angular acceleration.",
  },
  {
    question:
      "What is rotational dynamics?",
    answer:
      "Rotational dynamics studies how torque, moment of inertia, and angular acceleration affect rotating objects.",
  },
  {
    question:
      "How do you calculate moment of inertia from torque?",
    answer:
      "Divide torque by angular acceleration using I = τ ÷ α.",
  },
  {
    question:
      "What units are used for torque?",
    answer:
      "Torque is measured in newton meters, written as N·m.",
  },
] as const;

const calculatorSchema = createCalculatorSchema({
  name: pageTitle,
  description: pageDescription,
  slug: "rotational-dynamics-calculator",
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
  "rotational-dynamics-calculator",
  calculators,
);

export default function RotationalDynamicsCalculatorPage() {
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
                Rotational Dynamics Calculator
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">
              Rotational mechanics tool
            </p>

            <h1>
              Rotational Dynamics Calculator
            </h1>

            <p>
              Solve torque, moment of inertia, or
              angular acceleration using τ = Iα.
            </p>
          </div>
        </Container>
      </section>

      <section
        className="tool-section"
        aria-label="Rotational dynamics calculator"
      >
        <Container>
          <RotationalDynamicsCalculator />
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
                What is rotational dynamics?
              </h2>

              <p>
                Rotational dynamics explains how
                torque produces angular acceleration
                in an object with a particular moment
                of inertia.
              </p>
            </section>

            <section aria-labelledby="formula-heading">
              <p className="eyebrow">Formula</p>

              <h2 id="formula-heading">
                Rotational dynamics formula
              </h2>

              <div className="formula-card">
                <p>
                  Torque
                  <span>τ = Iα</span>
                </p>
              </div>

              <ul className="article-list">
                <li>
                  <strong>τ</strong> is torque in
                  N·m.
                </li>
                <li>
                  <strong>I</strong> is moment of
                  inertia in kg·m².
                </li>
                <li>
                  <strong>α</strong> is angular
                  acceleration in rad/s².
                </li>
              </ul>
            </section>

            <section aria-labelledby="example-heading">
              <p className="eyebrow">
                Worked example
              </p>

              <h2 id="example-heading">
                An object has I = 4 kg·m² and
                α = 3 rad/s²
              </h2>

              <ol className="calculation-steps">
                <li>
                  Write the formula:{" "}
                  <strong>τ = Iα</strong>.
                </li>
                <li>
                  Substitute the values:{" "}
                  <strong>τ = 4 × 3</strong>.
                </li>
                <li>
                  Calculate torque:{" "}
                  <strong>τ = 12 N·m</strong>.
                </li>
              </ol>
            </section>

            <section aria-labelledby="rearranged-heading">
              <p className="eyebrow">
                Rearranged equations
              </p>

              <h2 id="rearranged-heading">
                Solve for moment of inertia or
                angular acceleration
              </h2>

              <div className="comparison-grid">
                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Moment of inertia
                  </p>

                  <h3>I = τ ÷ α</h3>

                  <p>
                    Divide torque by angular
                    acceleration.
                  </p>
                </article>

                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Angular acceleration
                  </p>

                  <h3>α = τ ÷ I</h3>

                  <p>
                    Divide torque by moment of
                    inertia.
                  </p>
                </article>
              </div>
            </section>

            <section aria-labelledby="relationship-heading">
              <p className="eyebrow">
                Physical relationship
              </p>

              <h2 id="relationship-heading">
                Torque, inertia, and angular
                acceleration
              </h2>

              <p>
                For a fixed moment of inertia, greater
                torque produces greater angular
                acceleration. For a fixed torque, a
                larger moment of inertia produces
                less angular acceleration.
              </p>
            </section>

            <section aria-labelledby="units-heading">
              <p className="eyebrow">Units</p>

              <h2 id="units-heading">
                Standard SI units
              </h2>

              <p>
                Use newton meters for torque,
                kilogram square meters for moment of
                inertia, and radians per second
                squared for angular acceleration.
              </p>
            </section>

            <section aria-labelledby="applications-heading">
              <p className="eyebrow">
                Real-world applications
              </p>

              <h2 id="applications-heading">
                Where rotational dynamics is used
              </h2>

              <ul className="article-list">
                <li>
                  Motors, turbines, and rotating
                  machinery.
                </li>
                <li>
                  Wheels, gears, and flywheels.
                </li>
                <li>
                  Vehicle drivetrain analysis.
                </li>
                <li>
                  Robotics and mechanical systems.
                </li>
                <li>
                  Sports and rotating body motion.
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
                  Net torque is treated as constant.
                </li>
                <li>
                  Moment of inertia is defined for
                  the selected rotation axis.
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
                for force and lever-arm calculations.
              </p>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/moment-of-inertia-calculator"
                >
                  Moment of Inertia Calculator
                </Link>{" "}
                for common rotational shapes.
              </p>
            </section>

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">
                Questions and answers
              </p>

              <h2 id="faq-heading">
                Rotational dynamics calculator FAQ
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
                Rotational dynamics checklist
              </h2>

              <ul>
                <li>Use torque in N·m</li>
                <li>
                  Use moment of inertia in kg·m²
                </li>
                <li>
                  Use angular acceleration in rad/s²
                </li>
                <li>Apply τ = Iα</li>
                <li>Check all values are positive</li>
              </ul>
            </div>

            <div className="sidebar-card">
              <p className="sidebar-card__label">
                Related calculator
              </p>

              <h2>
                Calculate moment of inertia
              </h2>

              <p>
                Calculate rotational inertia for
                point masses, disks, hoops, spheres,
                shells, and rods.
              </p>

              <Link href="/calculators/moment-of-inertia-calculator">
                Open Moment of Inertia Calculator
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
