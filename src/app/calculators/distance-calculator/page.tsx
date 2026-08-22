import type { Metadata } from "next";

import { RelatedCalculators } from "@/components/related-calculators";
import { getRelatedCalculators } from "@/content/calculators/get-related-calculators";
import { calculators } from "@/content/calculators/registry";
import Link from "next/link";

import { DistanceCalculator } from "@/components/calculators/distance-calculator";
import { CalculatorTrustPanel } from "@/components/calculator-trust";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";
import { createCalculatorSchema } from "@/lib/seo/calculator-schema";
import { createFAQSchema } from "@/lib/seo/faq-schema";

const pageTitle = "Distance Calculator | Speed, Time & Distance";

const pageDescription =
  "Calculate distance, speed, or travel time using d = vt, with common motion units, automatic rearrangement, formula guidance, and clear working steps.";

const pagePath =
  "/calculators/distance-calculator";

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
      "What formula does the distance calculator use?",
    answer:
      "The calculator uses distance equals speed multiplied by time: d = v × t.",
  },
  {
    question:
      "Can this calculator find speed?",
    answer:
      "Yes. Enter distance and time, then select speed as the unknown variable.",
  },
  {
    question:
      "Can this calculator find time?",
    answer:
      "Yes. Enter distance and speed, then select time as the unknown variable.",
  },
  {
    question:
      "What units should I use?",
    answer:
      "Use compatible units. For example, metres with metres per second and seconds, or kilometres with kilometres per hour and hours.",
  },
  {
    question:
      "What is the difference between distance and displacement?",
    answer:
      "Distance is the total path travelled, while displacement measures the change from initial position to final position and includes direction.",
  },
] as const;

const calculatorSchema = createCalculatorSchema({
  name: pageTitle,
  description: pageDescription,
  slug: "distance-calculator",
  category: "Physics",
});

const faqSchema = createFAQSchema(faqItems);

const relatedCalculators = getRelatedCalculators(
  "distance-calculator",
  calculators,
);

export default function DistanceCalculatorPage() {
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
                Distance Calculator
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">
              Linear motion tool
            </p>

            <h1>Distance Calculator</h1>

            <p>
              Calculate distance, speed, or time using
              two known motion values.
            </p>
          </div>
        </Container>
      </section>

      <section
        className="tool-section"
        aria-label="Distance calculator"
      >
        <Container>
          <DistanceCalculator />
        </Container>
      </section>

      <section className="article-section">
        <Container className="article-layout">
          <article className="article-content">
            <section aria-labelledby="overview-heading">
              <p className="eyebrow">
                Motion fundamentals
              </p>

              <h2 id="overview-heading">
                What is distance?
              </h2>

              <p>
                Distance is the total path length travelled
                by an object. It is a scalar quantity, so it
                has magnitude but no direction.
              </p>

              <p>
                In constant-speed motion, distance can be
                calculated by multiplying speed by elapsed
                time.
              </p>
            </section>

            <section aria-labelledby="formula-heading">
              <p className="eyebrow">Formula</p>

              <h2 id="formula-heading">
                Distance, speed, and time formulas
              </h2>

              <div className="formula-card">
                <p>
                  Distance
                  <span>d = v × t</span>
                </p>

                <p>
                  Speed
                  <span>v = d ÷ t</span>
                </p>

                <p>
                  Time
                  <span>t = d ÷ v</span>
                </p>
              </div>

              <ul className="article-list">
                <li>
                  <strong>d</strong> is distance.
                </li>
                <li>
                  <strong>v</strong> is speed.
                </li>
                <li>
                  <strong>t</strong> is elapsed time.
                </li>
              </ul>
            </section>

            <section aria-labelledby="example-heading">
              <p className="eyebrow">
                Worked example
              </p>

              <h2 id="example-heading">
                Calculate distance from speed and time
              </h2>

              <ol className="calculation-steps">
                <li>
                  Speed is
                  <strong> 12 metres per second</strong>.
                </li>
                <li>
                  Time is
                  <strong> 5 seconds</strong>.
                </li>
                <li>
                  Apply
                  <strong> d = 12 × 5</strong>.
                </li>
                <li>
                  Distance is
                  <strong> 60 metres</strong>.
                </li>
              </ol>
            </section>

            <section aria-labelledby="units-heading">
              <p className="eyebrow">
                Unit consistency
              </p>

              <h2 id="units-heading">
                Use compatible units
              </h2>

              <p>
                The speed and time units must match the
                distance unit you want to calculate.
              </p>

              <ul className="article-list">
                <li>
                  Metres per second with seconds produces
                  metres.
                </li>
                <li>
                  Kilometres per hour with hours produces
                  kilometres.
                </li>
                <li>
                  Miles per hour with hours produces miles.
                </li>
              </ul>
            </section>

            <section aria-labelledby="difference-heading">
              <p className="eyebrow">
                Important distinction
              </p>

              <h2 id="difference-heading">
                Distance versus displacement
              </h2>

              <p>
                Distance measures the complete path
                travelled. Displacement measures the
                straight-line change between the initial
                and final positions and includes direction.
              </p>

              <p>
                An object can travel a large distance and
                still have zero displacement if it returns
                to its starting point.
              </p>
            </section>

            <section aria-labelledby="applications-heading">
              <p className="eyebrow">
                Applications
              </p>

              <h2 id="applications-heading">
                Where the distance formula is used
              </h2>

              <ul className="article-list">
                <li>Constant-speed motion problems.</li>
                <li>Vehicle travel calculations.</li>
                <li>Laboratory motion experiments.</li>
                <li>Sports performance analysis.</li>
                <li>Introductory physics exercises.</li>
              </ul>
            </section>

            <section aria-labelledby="related-heading">
              <p className="eyebrow">
                Related tools
              </p>

              <h2 id="related-heading">
                Continue your motion calculations
              </h2>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/average-speed-calculator"
                >
                  Average Speed Calculator
                </Link>{" "}
                for journeys where total distance and total
                elapsed time are known.
              </p>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/displacement-calculator"
                >
                  Displacement Calculator
                </Link>{" "}
                when direction and change in position are
                important.
              </p>

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
            </section>

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">
                Questions and answers
              </p>

              <h2 id="faq-heading">
                Distance calculator FAQ
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

              <h2>Distance checklist</h2>

              <ul>
                <li>Identify the unknown variable</li>
                <li>Enter two known values</li>
                <li>Use compatible units</li>
                <li>Apply the correct formula</li>
                <li>Report the result with units</li>
              </ul>
            </div>

            <div className="sidebar-card">
              <p className="sidebar-card__label">
                Related calculator
              </p>

              <h2>Compare with displacement</h2>

              <p>
                Use displacement when the change in
                position and direction matter.
              </p>

              <Link href="/calculators/displacement-calculator">
                Open Displacement Calculator
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
