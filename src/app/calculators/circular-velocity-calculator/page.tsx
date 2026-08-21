import type { Metadata } from "next";

import { RelatedCalculators } from "@/components/related-calculators";
import { getRelatedCalculators } from "@/content/calculators/get-related-calculators";
import { calculators } from "@/content/calculators/registry";
import Link from "next/link";

import {
  CircularVelocityCalculator,
} from "@/components/calculators/circular-velocity-calculator";
import { CalculatorTrustPanel } from "@/components/calculator-trust";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";
import { createCalculatorSchema } from "@/lib/seo/calculator-schema";

const pageTitle =
  "Circular Velocity Calculator";

const pageDescription =
  "Calculate circular velocity, orbit radius, or rotational period using v = 2πr ÷ T, with supported units, formula guidance, and worked results.";

const pagePath =
  "/calculators/circular-velocity-calculator";

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
      "What formula does the circular velocity calculator use?",
    answer:
      "It uses v = 2πr ÷ T, where circular velocity equals the circumference of the circular path divided by the period.",
  },
  {
    question:
      "What is circular velocity?",
    answer:
      "Circular velocity is the tangential speed of an object moving around a circular path.",
  },
  {
    question:
      "What is the period in circular motion?",
    answer:
      "The period is the time required for one complete revolution.",
  },
  {
    question:
      "How do you calculate radius from circular velocity?",
    answer:
      "Multiply velocity by period and divide by 2π using r = vT ÷ 2π.",
  },
] as const;

const calculatorSchema = createCalculatorSchema({
  name: pageTitle,
  description: pageDescription,
  slug: "circular-velocity-calculator",
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
  "circular-velocity-calculator",
  calculators,
);

export default function CircularVelocityCalculatorPage() {
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
                Circular Velocity Calculator
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">
              Circular motion speed tool
            </p>

            <h1>
              Circular Velocity Calculator
            </h1>

            <p>
              Solve circular velocity, radius, or
              period using v = 2πr ÷ T.
            </p>
          </div>
        </Container>
      </section>

      <section
        className="tool-section"
        aria-label="Circular velocity calculator"
      >
        <Container>
          <CircularVelocityCalculator />
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
                What is circular velocity?
              </h2>

              <p>
                Circular velocity is the tangential
                speed of an object moving around a
                circular path. It equals the distance
                traveled in one revolution divided
                by the time required.
              </p>
            </section>

            <section aria-labelledby="formula-heading">
              <p className="eyebrow">Formula</p>

              <h2 id="formula-heading">
                Circular velocity formula
              </h2>

              <div className="formula-card">
                <p>
                  Circular Velocity
                  <span>v = 2πr ÷ T</span>
                </p>
              </div>

              <ul className="article-list">
                <li>
                  <strong>v</strong> is circular
                  velocity in meters per second.
                </li>
                <li>
                  <strong>r</strong> is radius in
                  meters.
                </li>
                <li>
                  <strong>T</strong> is period in
                  seconds.
                </li>
              </ul>
            </section>

            <section aria-labelledby="example-heading">
              <p className="eyebrow">
                Worked example
              </p>

              <h2 id="example-heading">
                A 5 m radius circle has a 10 s period
              </h2>

              <ol className="calculation-steps">
                <li>
                  Write the formula:{" "}
                  <strong>v = 2πr ÷ T</strong>.
                </li>
                <li>
                  Substitute the values:{" "}
                  <strong>
                    v = 2 × π × 5 ÷ 10
                  </strong>.
                </li>
                <li>
                  Calculate the velocity:{" "}
                  <strong>
                    v ≈ 3.1416 m/s
                  </strong>.
                </li>
              </ol>
            </section>

            <section aria-labelledby="rearranged-heading">
              <p className="eyebrow">
                Rearranged equations
              </p>

              <h2 id="rearranged-heading">
                Solve for radius or period
              </h2>

              <div className="comparison-grid">
                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Radius
                  </p>

                  <h3>r = vT ÷ 2π</h3>

                  <p>
                    Multiply velocity by period, then
                    divide by 2π.
                  </p>
                </article>

                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Period
                  </p>

                  <h3>T = 2πr ÷ v</h3>

                  <p>
                    Divide the circumference by
                    circular velocity.
                  </p>
                </article>
              </div>
            </section>

            <section aria-labelledby="circumference-heading">
              <p className="eyebrow">
                Distance traveled
              </p>

              <h2 id="circumference-heading">
                Why the formula uses 2πr
              </h2>

              <p>
                The expression 2πr is the
                circumference of the circular path.
                An object traveling one complete
                revolution covers this distance
                during one period.
              </p>
            </section>

            <section aria-labelledby="units-heading">
              <p className="eyebrow">Units</p>

              <h2 id="units-heading">
                Standard SI units
              </h2>

              <p>
                Use meters per second for circular
                velocity, meters for radius, and
                seconds for period.
              </p>
            </section>

            <section aria-labelledby="applications-heading">
              <p className="eyebrow">
                Real-world applications
              </p>

              <h2 id="applications-heading">
                Where circular velocity is used
              </h2>

              <ul className="article-list">
                <li>
                  Rotating laboratory equipment.
                </li>
                <li>
                  Wheels, pulleys, and turntables.
                </li>
                <li>
                  Circular tracks and amusement
                  rides.
                </li>
                <li>
                  Planetary and satellite motion.
                </li>
                <li>
                  Circular-motion experiments.
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
                  Velocity, radius, and period must
                  be greater than zero.
                </li>
                <li>
                  Motion is assumed to follow a
                  circular path.
                </li>
                <li>
                  Velocity represents tangential
                  speed.
                </li>
                <li>
                  Period represents one complete
                  revolution.
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
                Continue your circular-motion analysis
              </h2>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/centripetal-force-calculator"
                >
                  Centripetal Force Calculator
                </Link>{" "}
                to calculate inward force, mass,
                velocity, or radius.
              </p>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/kinetic-energy-calculator"
                >
                  Kinetic Energy Calculator
                </Link>{" "}
                to calculate energy from mass and
                velocity.
              </p>
            </section>

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">
                Questions and answers
              </p>

              <h2 id="faq-heading">
                Circular velocity calculator FAQ
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
                Circular velocity checklist
              </h2>

              <ul>
                <li>Use radius in meters</li>
                <li>Use period in seconds</li>
                <li>Calculate circumference</li>
                <li>Apply v = 2πr ÷ T</li>
                <li>
                  Report velocity in meters per second
                </li>
              </ul>
            </div>

            <div className="sidebar-card">
              <p className="sidebar-card__label">
                Related calculator
              </p>

              <h2>
                Calculate centripetal force
              </h2>

              <p>
                Solve centripetal force, mass,
                velocity, or radius using
                Fc = mv² ÷ r.
              </p>

              <Link href="/calculators/centripetal-force-calculator">
                Open Centripetal Force Calculator
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
