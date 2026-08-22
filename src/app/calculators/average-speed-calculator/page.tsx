import type { Metadata } from "next";

import { RelatedCalculators } from "@/components/related-calculators";
import { getRelatedCalculators } from "@/content/calculators/get-related-calculators";
import { calculators } from "@/content/calculators/registry";
import Link from "next/link";

import { AverageSpeedCalculator } from "@/components/calculators/average-speed-calculator";
import { CalculatorTrustPanel } from "@/components/calculator-trust";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";
import { createCalculatorSchema } from "@/lib/seo/calculator-schema";
import { createFAQSchema } from "@/lib/seo/faq-schema";

const pageTitle = "Average Speed Calculator";

const pageDescription =
  "Calculate average speed, total distance, or elapsed time using average speed = distance ÷ time, with unit conversions and step-by-step results.";

const pagePath =
  "/calculators/average-speed-calculator";

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
      "What formula does the average speed calculator use?",
    answer:
      "It uses average speed equals total distance divided by total elapsed time: s̄ = d ÷ t.",
  },
  {
    question:
      "What is the difference between average speed and average velocity?",
    answer:
      "Average speed uses total distance travelled, while average velocity uses net displacement and includes direction.",
  },
  {
    question:
      "Can average speed be negative?",
    answer:
      "No. Average speed is a scalar quantity and cannot be negative.",
  },
  {
    question:
      "Can average speed be zero?",
    answer:
      "Yes. Average speed is zero when no distance is travelled during a positive time interval.",
  },
] as const;

const calculatorSchema = createCalculatorSchema({
  name: pageTitle,
  description: pageDescription,
  slug: "average-speed-calculator",
  category: "Physics",
});

const faqSchema = createFAQSchema(faqItems);

const relatedCalculators = getRelatedCalculators(
  "average-speed-calculator",
  calculators,
);

export default function AverageSpeedCalculatorPage() {
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
                Average Speed Calculator
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">
              Linear motion tool
            </p>

            <h1>Average Speed Calculator</h1>

            <p>
              Calculate average speed, total distance,
              or elapsed time from two known journey
              values.
            </p>
          </div>
        </Container>
      </section>

      <section
        className="tool-section"
        aria-label="Average speed calculator"
      >
        <Container>
          <AverageSpeedCalculator />
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
                What is average speed?
              </h2>

              <p>
                Average speed describes how much total
                distance an object travels during a given
                time interval. It is a scalar quantity,
                so it does not include direction.
              </p>
            </section>

            <section aria-labelledby="formula-heading">
              <p className="eyebrow">Formula</p>

              <h2 id="formula-heading">
                Average speed formula
              </h2>

              <div className="formula-card">
                <p>
                  Average speed
                  <span>s̄ = d ÷ t</span>
                </p>
              </div>

              <ul className="article-list">
                <li>
                  <strong>s̄</strong> is average speed.
                </li>
                <li>
                  <strong>d</strong> is total distance.
                </li>
                <li>
                  <strong>t</strong> is total elapsed time.
                </li>
              </ul>
            </section>

            <section aria-labelledby="example-heading">
              <p className="eyebrow">
                Worked example
              </p>

              <h2 id="example-heading">
                Calculate speed from distance and time
              </h2>

              <ol className="calculation-steps">
                <li>
                  Total distance is
                  <strong> 150 metres</strong>.
                </li>
                <li>
                  Elapsed time is
                  <strong> 10 seconds</strong>.
                </li>
                <li>
                  Apply
                  <strong> s̄ = 150 ÷ 10</strong>.
                </li>
                <li>
                  Average speed is
                  <strong> 15 m/s</strong>.
                </li>
              </ol>
            </section>

            <section aria-labelledby="velocity-heading">
              <p className="eyebrow">
                Important distinction
              </p>

              <h2 id="velocity-heading">
                Average speed versus average velocity
              </h2>

              <p>
                Average speed uses the full path length,
                while average velocity uses displacement.
                A round trip can have a positive average
                speed but zero average velocity.
              </p>
            </section>

            <section aria-labelledby="applications-heading">
              <p className="eyebrow">
                Applications
              </p>

              <h2 id="applications-heading">
                Where average speed is used
              </h2>

              <ul className="article-list">
                <li>Travel and journey calculations.</li>
                <li>Vehicle performance analysis.</li>
                <li>Laboratory motion experiments.</li>
                <li>Sports timing and distance studies.</li>
                <li>Introductory physics problems.</li>
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
                when displacement and direction matter.
              </p>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/acceleration-calculator"
                >
                  Acceleration Calculator
                </Link>{" "}
                to calculate changes in velocity over time.
              </p>
            </section>

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">
                Questions and answers
              </p>

              <h2 id="faq-heading">
                Average speed FAQ
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

              <h2>Speed checklist</h2>

              <ul>
                <li>Use total distance travelled</li>
                <li>Use positive elapsed time</li>
                <li>Do not include direction</li>
                <li>Apply s̄ = d ÷ t</li>
                <li>Report speed in m/s</li>
              </ul>
            </div>

            <div className="sidebar-card">
              <p className="sidebar-card__label">
                Related calculator
              </p>

              <h2>Calculate average velocity</h2>

              <p>
                Analyze displacement and direction over
                a motion interval.
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
