import type { Metadata } from "next";

import { RelatedCalculators } from "@/components/related-calculators";
import { getRelatedCalculators } from "@/content/calculators/get-related-calculators";
import { calculators } from "@/content/calculators/registry";
import Link from "next/link";

import {
  MomentOfInertiaCalculator,
} from "@/components/calculators/moment-of-inertia-calculator";
import { CalculatorTrustPanel } from "@/components/calculator-trust";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";
import { createCalculatorSchema } from "@/lib/seo/calculator-schema";

const pageTitle =
  "Moment of Inertia Calculator";

const pageDescription =
  "Calculate moment of inertia for point masses, disks, hoops, spheres, shells, and rods using standard rotational formulas.";

const pagePath =
  "/calculators/moment-of-inertia-calculator";

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
      "What is moment of inertia?",
    answer:
      "Moment of inertia measures how strongly an object resists changes in rotational motion about a selected axis.",
  },
  {
    question:
      "Which shapes does this calculator support?",
    answer:
      "It supports point masses, solid disks or cylinders, thin hoops, solid spheres, thin spherical shells, rods through the center, and rods through one end.",
  },
  {
    question:
      "What unit is used for moment of inertia?",
    answer:
      "The standard SI unit is kilogram square meter, written as kg·m².",
  },
  {
    question:
      "Why does the axis of rotation matter?",
    answer:
      "Moment of inertia changes when the axis changes because the mass distribution relative to that axis also changes.",
  },
] as const;

const calculatorSchema = createCalculatorSchema({
  name: pageTitle,
  description: pageDescription,
  slug: "moment-of-inertia-calculator",
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
  "moment-of-inertia-calculator",
  calculators,
);

export default function MomentOfInertiaCalculatorPage() {
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
                Moment of Inertia Calculator
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">
              Rotational mechanics tool
            </p>

            <h1>
              Moment of Inertia Calculator
            </h1>

            <p>
              Calculate moment of inertia for common
              shapes using mass and radius or length.
            </p>
          </div>
        </Container>
      </section>

      <section
        className="tool-section"
        aria-label="Moment of inertia calculator"
      >
        <Container>
          <MomentOfInertiaCalculator />
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
                What is moment of inertia?
              </h2>

              <p>
                Moment of inertia is the rotational
                equivalent of mass. It describes how
                difficult it is to change an
                object&apos;s rotational motion around
                a selected axis.
              </p>
            </section>

            <section aria-labelledby="formulas-heading">
              <p className="eyebrow">
                Standard formulas
              </p>

              <h2 id="formulas-heading">
                Moment of inertia formulas by shape
              </h2>

              <div className="comparison-grid">
                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Point mass
                  </p>
                  <h3>I = mr²</h3>
                </article>

                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Solid disk or cylinder
                  </p>
                  <h3>I = ½mr²</h3>
                </article>

                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Thin hoop or ring
                  </p>
                  <h3>I = mr²</h3>
                </article>

                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Solid sphere
                  </p>
                  <h3>I = ⅖mr²</h3>
                </article>

                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Thin spherical shell
                  </p>
                  <h3>I = ⅔mr²</h3>
                </article>

                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Rod through center
                  </p>
                  <h3>I = ¹⁄₁₂mL²</h3>
                </article>

                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Rod through one end
                  </p>
                  <h3>I = ⅓mL²</h3>
                </article>
              </div>
            </section>

            <section aria-labelledby="variables-heading">
              <p className="eyebrow">
                Formula variables
              </p>

              <h2 id="variables-heading">
                What each symbol means
              </h2>

              <ul className="article-list">
                <li>
                  <strong>I</strong> is moment of
                  inertia in kg·m².
                </li>
                <li>
                  <strong>m</strong> is mass in
                  kilograms.
                </li>
                <li>
                  <strong>r</strong> is radius in
                  meters.
                </li>
                <li>
                  <strong>L</strong> is rod length in
                  meters.
                </li>
              </ul>
            </section>

            <section aria-labelledby="example-heading">
              <p className="eyebrow">
                Worked example
              </p>

              <h2 id="example-heading">
                Solid disk with mass 4 kg and radius
                3 m
              </h2>

              <ol className="calculation-steps">
                <li>
                  Use the solid disk formula:{" "}
                  <strong>I = ½mr²</strong>.
                </li>
                <li>
                  Substitute the values:{" "}
                  <strong>I = ½ × 4 × 3²</strong>.
                </li>
                <li>
                  Square the radius:{" "}
                  <strong>3² = 9</strong>.
                </li>
                <li>
                  Calculate the result:{" "}
                  <strong>I = 18 kg·m²</strong>.
                </li>
              </ol>
            </section>

            <section aria-labelledby="axis-heading">
              <p className="eyebrow">
                Rotation axis
              </p>

              <h2 id="axis-heading">
                Why the axis matters
              </h2>

              <p>
                The same object can have different
                moments of inertia depending on the
                selected axis. A rod rotating through
                its center has a lower moment of
                inertia than the same rod rotating
                through one end.
              </p>
            </section>

            <section aria-labelledby="distribution-heading">
              <p className="eyebrow">
                Mass distribution
              </p>

              <h2 id="distribution-heading">
                Distance from the axis changes I
              </h2>

              <p>
                Mass farther from the axis contributes
                more strongly because radius or length
                is squared in the formula. This is why
                hoops usually have greater moment of
                inertia than solid disks of equal mass
                and radius.
              </p>
            </section>

            <section aria-labelledby="units-heading">
              <p className="eyebrow">Units</p>

              <h2 id="units-heading">
                Standard SI units
              </h2>

              <p>
                Use kilograms for mass and meters for
                radius or length. The resulting moment
                of inertia is expressed in kilogram
                square meters, written as kg·m².
              </p>
            </section>

            <section aria-labelledby="applications-heading">
              <p className="eyebrow">
                Real-world applications
              </p>

              <h2 id="applications-heading">
                Where moment of inertia is used
              </h2>

              <ul className="article-list">
                <li>
                  Flywheels and rotating machinery.
                </li>
                <li>
                  Wheels, gears, and pulleys.
                </li>
                <li>
                  Sports equipment and body rotation.
                </li>
                <li>
                  Turbines and electric motors.
                </li>
                <li>
                  Satellites and spacecraft attitude
                  control.
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
                  The object is treated as an ideal
                  geometric shape.
                </li>
                <li>
                  Mass is assumed to be distributed
                  uniformly.
                </li>
                <li>
                  The specified axis matches the
                  selected formula.
                </li>
                <li>
                  Mass and dimensions must be greater
                  than zero.
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
                  href="/calculators/rotational-kinetic-energy-calculator"
                >
                  Rotational Kinetic Energy Calculator
                </Link>{" "}
                to calculate energy using moment of
                inertia and angular velocity.
              </p>

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
            </section>

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">
                Questions and answers
              </p>

              <h2 id="faq-heading">
                Moment of inertia calculator FAQ
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
                Moment of inertia checklist
              </h2>

              <ul>
                <li>Select the correct shape</li>
                <li>Confirm the rotation axis</li>
                <li>Use mass in kilograms</li>
                <li>
                  Use radius or length in meters
                </li>
                <li>Report the answer in kg·m²</li>
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
