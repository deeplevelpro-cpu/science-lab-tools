import type { Metadata } from "next";

import { RelatedCalculators } from "@/components/related-calculators";
import { getRelatedCalculators } from "@/content/calculators/get-related-calculators";
import { calculators } from "@/content/calculators/registry";
import Link from "next/link";

import { DisplacementCalculator } from "@/components/calculators/displacement-calculator";
import { CalculatorTrustPanel } from "@/components/calculator-trust";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";
import { createCalculatorSchema } from "@/lib/seo/calculator-schema";
import { createFAQSchema } from "@/lib/seo/faq-schema";

const pageTitle = "Displacement Calculator";

const pageDescription =
  "Calculate displacement, initial position, or final position using Δx = x₂ − x₁, with signed direction, unit guidance, and step-by-step results.";

const pagePath =
  "/calculators/displacement-calculator";

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
      "What formula does the displacement calculator use?",
    answer:
      "It uses displacement equals final position minus initial position: Δx = x₂ − x₁.",
  },
  {
    question:
      "Can displacement be negative?",
    answer:
      "Yes. Negative displacement means the final position is in the negative direction relative to the initial position.",
  },
  {
    question:
      "Can displacement be zero?",
    answer:
      "Yes. Displacement is zero when the final position is the same as the initial position.",
  },
  {
    question:
      "What is the difference between distance and displacement?",
    answer:
      "Distance measures total path length, while displacement measures the straight-line change in position and includes direction.",
  },
] as const;

const calculatorSchema = createCalculatorSchema({
  name: pageTitle,
  description: pageDescription,
  slug: "displacement-calculator",
  category: "Physics",
});

const faqSchema = createFAQSchema(faqItems);

const relatedCalculators = getRelatedCalculators(
  "displacement-calculator",
  calculators,
);

export default function DisplacementCalculatorPage() {
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
                Displacement Calculator
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">
              Linear motion tool
            </p>

            <h1>Displacement Calculator</h1>

            <p>
              Calculate displacement, initial position,
              or final position from two known values.
            </p>
          </div>
        </Container>
      </section>

      <section
        className="tool-section"
        aria-label="Displacement calculator"
      >
        <Container>
          <DisplacementCalculator />
        </Container>
      </section>

      <section className="article-section">
        <Container className="article-layout">
          <article className="article-content">
            <section aria-labelledby="overview-heading">
              <p className="eyebrow">
                Motion analysis
              </p>

              <h2 id="overview-heading">
                What is displacement?
              </h2>

              <p>
                Displacement is the change in position
                between an initial point and a final
                point. It includes direction and can be
                positive, negative, or zero.
              </p>
            </section>

            <section aria-labelledby="formula-heading">
              <p className="eyebrow">Formula</p>

              <h2 id="formula-heading">
                Displacement formula
              </h2>

              <div className="formula-card">
                <p>
                  Displacement
                  <span>Δx = x₂ − x₁</span>
                </p>
              </div>

              <ul className="article-list">
                <li>
                  <strong>Δx</strong> is displacement.
                </li>
                <li>
                  <strong>x₁</strong> is initial position.
                </li>
                <li>
                  <strong>x₂</strong> is final position.
                </li>
              </ul>
            </section>

            <section aria-labelledby="example-heading">
              <p className="eyebrow">
                Worked example
              </p>

              <h2 id="example-heading">
                Calculate displacement from two positions
              </h2>

              <ol className="calculation-steps">
                <li>
                  Initial position is
                  <strong> 10 metres</strong>.
                </li>
                <li>
                  Final position is
                  <strong> 35 metres</strong>.
                </li>
                <li>
                  Apply
                  <strong> Δx = 35 − 10</strong>.
                </li>
                <li>
                  Displacement is
                  <strong> 25 metres</strong>.
                </li>
              </ol>
            </section>

            <section aria-labelledby="distance-heading">
              <p className="eyebrow">
                Important distinction
              </p>

              <h2 id="distance-heading">
                Displacement versus distance
              </h2>

              <p>
                Distance measures the total path travelled,
                while displacement compares only the
                starting and ending positions. A complete
                round trip can have a positive distance but
                zero displacement.
              </p>
            </section>

            <section aria-labelledby="direction-heading">
              <p className="eyebrow">
                Direction
              </p>

              <h2 id="direction-heading">
                Why displacement can be negative
              </h2>

              <p>
                A negative value means the final position
                lies in the selected negative direction
                relative to the initial position.
              </p>
            </section>

            <section aria-labelledby="applications-heading">
              <p className="eyebrow">
                Applications
              </p>

              <h2 id="applications-heading">
                Where displacement is used
              </h2>

              <ul className="article-list">
                <li>Linear motion experiments.</li>
                <li>Position-time graph analysis.</li>
                <li>Average velocity calculations.</li>
                <li>Projectile and free-fall problems.</li>
                <li>Introductory kinematics exercises.</li>
              </ul>
            </section>

            <section aria-labelledby="related-heading">
              <p className="eyebrow">
                Related tools
              </p>

              <h2 id="related-heading">
                Continue your motion analysis
              </h2>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/average-velocity-calculator"
                >
                  Average Velocity Calculator
                </Link>{" "}
                to calculate displacement per unit time.
              </p>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/average-speed-calculator"
                >
                  Average Speed Calculator
                </Link>{" "}
                when total distance rather than displacement
                is required.
              </p>
            </section>

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">
                Questions and answers
              </p>

              <h2 id="faq-heading">
                Displacement FAQ
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

              <h2>Displacement checklist</h2>

              <ul>
                <li>Identify initial position</li>
                <li>Identify final position</li>
                <li>Subtract initial from final</li>
                <li>Include direction through sign</li>
                <li>Report displacement in metres</li>
              </ul>
            </div>

            <div className="sidebar-card">
              <p className="sidebar-card__label">
                Related calculator
              </p>

              <h2>Calculate average velocity</h2>

              <p>
                Use displacement and elapsed time to
                calculate average velocity.
              </p>

              <Link href="/calculators/average-velocity-calculator">
                Open Average Velocity Calculator
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
