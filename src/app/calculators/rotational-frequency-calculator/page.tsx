import type { Metadata } from "next";

import { RelatedCalculators } from "@/components/related-calculators";
import { getRelatedCalculators } from "@/content/calculators/get-related-calculators";
import { calculators } from "@/content/calculators/registry";
import Link from "next/link";

import {
  RotationalFrequencyCalculator,
} from "@/components/calculators/rotational-frequency-calculator";
import { CalculatorTrustPanel } from "@/components/calculator-trust";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";
import { createCalculatorSchema } from "@/lib/seo/calculator-schema";

const pageTitle =
  "Rotational Frequency Calculator";

const pageDescription =
  "Calculate rotational frequency, period, or angular velocity using f = ω ÷ 2π, with hertz, seconds, radians, and clear calculation steps.";

const pagePath =
  "/calculators/rotational-frequency-calculator";

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
      "What formula does the rotational frequency calculator use?",
    answer:
      "It uses f = ω / 2π, where rotational frequency equals angular velocity divided by 2π.",
  },
  {
    question:
      "What is rotational frequency?",
    answer:
      "Rotational frequency is the number of complete rotations or cycles completed per second.",
  },
  {
    question:
      "How do you calculate rotation period from rotational frequency?",
    answer:
      "Use T = 1 / f, where rotation period equals one divided by rotational frequency.",
  },
  {
    question:
      "What units are used for rotational frequency?",
    answer:
      "Rotational frequency is measured in hertz, rotation period in seconds, and angular velocity in radians per second.",
  },
] as const;

const calculatorSchema = createCalculatorSchema({
  name: pageTitle,
  description: pageDescription,
  slug: "rotational-frequency-calculator",
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
  "rotational-frequency-calculator",
  calculators,
);

export default function RotationalFrequencyCalculatorPage() {
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
                Rotational Frequency Calculator
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">
              Circular motion tool
            </p>

            <h1>
              Rotational Frequency Calculator
            </h1>

            <p>
              Solve rotational frequency, rotation period, or
              angular velocity using f = ω / 2π.
            </p>
          </div>
        </Container>
      </section>

      <section
        className="tool-section"
        aria-label="Rotational frequency calculator"
      >
        <Container>
          <RotationalFrequencyCalculator />
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
                What is rotational frequency?
              </h2>

              <p>
                Rotational frequency is the number
                of complete rotations or cycles an
                object completes each second.
              </p>
            </section>

            <section aria-labelledby="formula-heading">
              <p className="eyebrow">Formula</p>

              <h2 id="formula-heading">
                Rotational frequency formula
              </h2>

              <div className="formula-card">
                <p>
                  Rotational Frequency
                  <span>f = ω / 2π</span>
                </p>
              </div>

              <ul className="article-list">
                <li>
                  <strong>f</strong> is rotational
                  frequency in hertz.
                </li>
                <li>
                  <strong>T</strong> is rotation period
                  in seconds.
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
                A rotating object has an angular
                velocity of 12.566 rad/s
              </h2>

              <ol className="calculation-steps">
                <li>
                  Write the formula:{" "}
                  <strong>f = ω / 2π</strong>.
                </li>
                <li>
                  Substitute the value:{" "}
                  <strong>f = 12.566 ÷ 2π</strong>.
                </li>
                <li>
                  Calculate rotational frequency:{" "}
                  <strong>f ≈ 2 Hz</strong>.
                </li>
              </ol>
            </section>

            <section aria-labelledby="rearranged-heading">
              <p className="eyebrow">
                Rearranged equations
              </p>

              <h2 id="rearranged-heading">
                Solve for rotation period or angular velocity
              </h2>

              <div className="comparison-grid">
                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Rotation period
                  </p>

                  <h3>T = 1 ÷ f</h3>

                  <p>
                    Divide one by rotational frequency.
                  </p>
                </article>

                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Angular velocity
                  </p>

                  <h3>ω = 2πf</h3>

                  <p>
                    Multiply rotational frequency by 2π.
                  </p>
                </article>
              </div>
            </section>

            <section aria-labelledby="relationship-heading">
              <p className="eyebrow">
                Physical relationship
              </p>

              <h2 id="relationship-heading">
                Frequency, period, and angular velocity
              </h2>

              <p>
                Rotational frequency increases when
                angular velocity increases. Rotation period
                decreases as rotational frequency increases.
              </p>
            </section>

            <section aria-labelledby="units-heading">
              <p className="eyebrow">Units</p>

              <h2 id="units-heading">
                Standard SI units
              </h2>

              <p>
                Use hertz for rotational frequency,
                seconds for rotation period, and radians
                per second for angular velocity.
              </p>
            </section>

            <section aria-labelledby="applications-heading">
              <p className="eyebrow">
                Real-world applications
              </p>

              <h2 id="applications-heading">
                Where rotational frequency is used
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
                  Rotation period is the time required
                  for one complete revolution.
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
                Rotational frequency calculator FAQ
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
                Rotational frequency checklist
              </h2>

              <ul>
                <li>
                  Use rotational frequency in Hz
                </li>
                <li>Use rotation period in seconds</li>
                <li>
                  Use angular velocity in rad/s
                </li>
                <li>Apply f = ω / 2π</li>
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
