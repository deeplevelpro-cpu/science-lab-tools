import type { Metadata } from "next";

import { RelatedCalculators } from "@/components/related-calculators";
import { getRelatedCalculators } from "@/content/calculators/get-related-calculators";
import { calculators } from "@/content/calculators/registry";
import Link from "next/link";

import {
  TangentialVelocityCalculator,
} from "@/components/calculators/tangential-velocity-calculator";
import { CalculatorTrustPanel } from "@/components/calculator-trust";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";
import { createCalculatorSchema } from "@/lib/seo/calculator-schema";

const pageTitle =
  "Tangential Velocity Calculator";

const pageDescription =
  "Calculate tangential velocity, radius, or angular velocity using v = rω, with supported rotational units and clear step-by-step results.";

const pagePath =
  "/calculators/tangential-velocity-calculator";

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
      "What formula does the tangential velocity calculator use?",
    answer:
      "It uses v = rω, where tangential velocity equals radius multiplied by angular velocity.",
  },
  {
    question:
      "What is tangential velocity?",
    answer:
      "Tangential velocity is the linear speed of an object moving along a circular path.",
  },
  {
    question:
      "How do you calculate radius from tangential velocity?",
    answer:
      "Divide tangential velocity by angular velocity using r = v ÷ ω.",
  },
  {
    question:
      "What units are used for tangential velocity?",
    answer:
      "Tangential velocity is measured in meters per second, radius in meters, and angular velocity in radians per second.",
  },
] as const;

const calculatorSchema = createCalculatorSchema({
  name: pageTitle,
  description: pageDescription,
  slug: "tangential-velocity-calculator",
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
  "tangential-velocity-calculator",
  calculators,
);

export default function TangentialVelocityCalculatorPage() {
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
                Tangential Velocity Calculator
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">
              Circular motion tool
            </p>

            <h1>
              Tangential Velocity Calculator
            </h1>

            <p>
              Solve tangential velocity, radius, or
              angular velocity using v = rω.
            </p>
          </div>
        </Container>
      </section>

      <section
        className="tool-section"
        aria-label="Tangential velocity calculator"
      >
        <Container>
          <TangentialVelocityCalculator />
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
                What is tangential velocity?
              </h2>

              <p>
                Tangential velocity is the linear
                speed of an object moving along the
                edge of a circular path.
              </p>
            </section>

            <section aria-labelledby="formula-heading">
              <p className="eyebrow">Formula</p>

              <h2 id="formula-heading">
                Tangential velocity formula
              </h2>

              <div className="formula-card">
                <p>
                  Tangential Velocity
                  <span>v = rω</span>
                </p>
              </div>

              <ul className="article-list">
                <li>
                  <strong>v</strong> is tangential
                  velocity in m/s.
                </li>
                <li>
                  <strong>r</strong> is radius in
                  meters.
                </li>
                <li>
                  <strong>ω</strong> is angular
                  velocity in rad/s.
                </li>
              </ul>
            </section>

            <section aria-labelledby="example-heading">
              <p className="eyebrow">
                Worked example
              </p>

              <h2 id="example-heading">
                A point is 4 m from the axis and
                rotates at 3 rad/s
              </h2>

              <ol className="calculation-steps">
                <li>
                  Write the formula:{" "}
                  <strong>v = rω</strong>.
                </li>
                <li>
                  Substitute the values:{" "}
                  <strong>v = 4 × 3</strong>.
                </li>
                <li>
                  Calculate tangential velocity:{" "}
                  <strong>v = 12 m/s</strong>.
                </li>
              </ol>
            </section>

            <section aria-labelledby="rearranged-heading">
              <p className="eyebrow">
                Rearranged equations
              </p>

              <h2 id="rearranged-heading">
                Solve for radius or angular velocity
              </h2>

              <div className="comparison-grid">
                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Radius
                  </p>

                  <h3>r = v ÷ ω</h3>

                  <p>
                    Divide tangential velocity by
                    angular velocity.
                  </p>
                </article>

                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Angular velocity
                  </p>

                  <h3>ω = v ÷ r</h3>

                  <p>
                    Divide tangential velocity by
                    radius.
                  </p>
                </article>
              </div>
            </section>

            <section aria-labelledby="relationship-heading">
              <p className="eyebrow">
                Physical relationship
              </p>

              <h2 id="relationship-heading">
                Radius and rotation rate both affect v
              </h2>

              <p>
                Tangential velocity increases when
                radius increases, angular velocity
                increases, or both increase.
              </p>
            </section>

            <section aria-labelledby="units-heading">
              <p className="eyebrow">Units</p>

              <h2 id="units-heading">
                Standard SI units
              </h2>

              <p>
                Use meters per second for tangential
                velocity, meters for radius, and
                radians per second for angular
                velocity.
              </p>
            </section>

            <section aria-labelledby="applications-heading">
              <p className="eyebrow">
                Real-world applications
              </p>

              <h2 id="applications-heading">
                Where tangential velocity is used
              </h2>

              <ul className="article-list">
                <li>
                  Wheels, gears, and rotating disks.
                </li>
                <li>
                  Turbines and mechanical shafts.
                </li>
                <li>
                  Amusement rides and rotating
                  platforms.
                </li>
                <li>
                  Planetary and satellite motion.
                </li>
                <li>
                  Motors and industrial machinery.
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
                  Radius is measured from the rotation
                  axis.
                </li>
                <li>
                  Angular velocity must be entered in
                  radians per second.
                </li>
                <li>
                  Direction is not represented.
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
                Continue your circular motion analysis
              </h2>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/angular-velocity-calculator"
                >
                  Angular Velocity Calculator
                </Link>{" "}
                to calculate angular velocity,
                displacement, or time.
              </p>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/centripetal-acceleration-calculator"
                >
                  Centripetal Acceleration Calculator
                </Link>{" "}
                to calculate inward acceleration in
                circular motion.
              </p>
            </section>

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">
                Questions and answers
              </p>

              <h2 id="faq-heading">
                Tangential velocity calculator FAQ
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
                Tangential velocity checklist
              </h2>

              <ul>
                <li>
                  Use tangential velocity in m/s
                </li>
                <li>Use radius in meters</li>
                <li>
                  Use angular velocity in rad/s
                </li>
                <li>Apply v = rω</li>
                <li>Check all values are positive</li>
              </ul>
            </div>

            <div className="sidebar-card">
              <p className="sidebar-card__label">
                Related calculator
              </p>

              <h2>
                Calculate angular velocity
              </h2>

              <p>
                Solve angular velocity, angular
                displacement, or time.
              </p>

              <Link href="/calculators/angular-velocity-calculator">
                Open Angular Velocity Calculator
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
