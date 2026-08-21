import type { Metadata } from "next";
import Link from "next/link";

import {
  RevolutionsCalculator,
} from "@/components/calculators/revolutions-calculator";
import { CalculatorTrustPanel } from "@/components/calculator-trust";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";
import { createCalculatorSchema } from "@/lib/seo/calculator-schema";

const pageTitle =
  "Revolutions Calculator";

const pageDescription =
  "Calculate revolutions, rotational frequency, time, or angular displacement using N = ft and N = θ / 2π.";

const pagePath =
  "/calculators/revolutions-calculator";

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
      "What formula does the revolutions calculator use?",
    answer:
      "It uses N = ft when rotational frequency and time are known, and N = θ / 2π when angular displacement is known.",
  },
  {
    question:
      "How do you calculate revolutions from frequency and time?",
    answer:
      "Multiply rotational frequency in hertz by time in seconds using N = ft.",
  },
  {
    question:
      "How do you calculate angular displacement from revolutions?",
    answer:
      "Multiply the number of revolutions by 2π using θ = 2πN.",
  },
  {
    question:
      "What units does the revolutions calculator use?",
    answer:
      "Revolutions are measured in rev, rotational frequency in hertz, time in seconds, and angular displacement in radians.",
  },
] as const;

const calculatorSchema = createCalculatorSchema({
  name: pageTitle,
  description: pageDescription,
  slug: "revolutions-calculator",
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

export default function RevolutionsCalculatorPage() {
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
                Revolutions Calculator
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">
              Rotational motion tool
            </p>

            <h1>Revolutions Calculator</h1>

            <p>
              Calculate revolutions, rotational
              frequency, time, or angular displacement
              using N = ft and N = θ / 2π.
            </p>
          </div>
        </Container>
      </section>

      <section
        className="tool-section"
        aria-label="Revolutions calculator"
      >
        <Container>
          <RevolutionsCalculator />
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
                What is a revolution?
              </h2>

              <p>
                One revolution is one complete rotation
                through 360 degrees or 2π radians.
                The number of revolutions describes how
                many complete turns an object makes.
              </p>
            </section>

            <section aria-labelledby="formula-heading">
              <p className="eyebrow">Formulas</p>

              <h2 id="formula-heading">
                Revolutions formulas
              </h2>

              <div className="formula-card">
                <p>
                  Number of Revolutions
                  <span>N = ft</span>
                </p>
              </div>

              <ul className="article-list">
                <li>
                  <strong>N</strong> is the number of
                  revolutions.
                </li>
                <li>
                  <strong>f</strong> is rotational
                  frequency in hertz.
                </li>
                <li>
                  <strong>t</strong> is time in seconds.
                </li>
                <li>
                  <strong>θ</strong> is angular
                  displacement in radians.
                </li>
              </ul>
            </section>

            <section aria-labelledby="example-heading">
              <p className="eyebrow">
                Worked example
              </p>

              <h2 id="example-heading">
                Calculate revolutions from frequency
                and time
              </h2>

              <ol className="calculation-steps">
                <li>
                  Write the formula:{" "}
                  <strong>N = ft</strong>.
                </li>
                <li>
                  Substitute 3 Hz and 4 seconds:{" "}
                  <strong>N = 3 × 4</strong>.
                </li>
                <li>
                  Calculate the result:{" "}
                  <strong>N = 12 revolutions</strong>.
                </li>
              </ol>
            </section>

            <section aria-labelledby="rearranged-heading">
              <p className="eyebrow">
                Rearranged equations
              </p>

              <h2 id="rearranged-heading">
                Solve rotational motion variables
              </h2>

              <div className="comparison-grid">
                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Rotational frequency
                  </p>

                  <h3>f = N ÷ t</h3>

                  <p>
                    Divide revolutions by elapsed time.
                  </p>
                </article>

                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Time
                  </p>

                  <h3>t = N ÷ f</h3>

                  <p>
                    Divide revolutions by rotational
                    frequency.
                  </p>
                </article>

                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Angular displacement
                  </p>

                  <h3>θ = 2πN</h3>

                  <p>
                    Multiply revolutions by 2π to obtain
                    radians.
                  </p>
                </article>

                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Revolutions from radians
                  </p>

                  <h3>N = θ ÷ 2π</h3>

                  <p>
                    Divide angular displacement by 2π.
                  </p>
                </article>
              </div>
            </section>

            <section aria-labelledby="relationship-heading">
              <p className="eyebrow">
                Physical relationship
              </p>

              <h2 id="relationship-heading">
                Revolutions, frequency, and time
              </h2>

              <p>
                The number of revolutions increases
                directly with rotational frequency and
                elapsed time. A higher rotation rate or
                longer duration produces more complete
                turns.
              </p>
            </section>

            <section aria-labelledby="units-heading">
              <p className="eyebrow">Units</p>

              <h2 id="units-heading">
                Standard rotational units
              </h2>

              <p>
                Use revolutions for complete turns,
                hertz for rotations per second, seconds
                for time, and radians for angular
                displacement.
              </p>
            </section>

            <section aria-labelledby="applications-heading">
              <p className="eyebrow">
                Real-world applications
              </p>

              <h2 id="applications-heading">
                Where revolution calculations are used
              </h2>

              <ul className="article-list">
                <li>Motors, gears, and rotating shafts.</li>
                <li>Wheels and vehicle components.</li>
                <li>Fans, turbines, and generators.</li>
                <li>
                  Turntables and laboratory centrifuges.
                </li>
                <li>
                  Planetary and orbital rotation analysis.
                </li>
              </ul>
            </section>

            <section aria-labelledby="limitations-heading">
              <p className="eyebrow">
                Calculation guidance
              </p>

              <h2 id="limitations-heading">
                Important input rules
              </h2>

              <ul className="article-list">
                <li>Enter positive finite values only.</li>
                <li>
                  Frequency must be entered in hertz.
                </li>
                <li>Time must be entered in seconds.</li>
                <li>
                  Angular displacement must be entered
                  in radians.
                </li>
                <li>
                  Rotation direction is not represented.
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
                  href="/calculators/rotational-frequency-calculator"
                >
                  Rotational Frequency Calculator
                </Link>{" "}
                to calculate frequency, angular
                velocity, or rotation period.
              </p>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/rpm-calculator"
                >
                  RPM Calculator
                </Link>{" "}
                to convert RPM, hertz, and angular
                velocity.
              </p>
            </section>

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">
                Questions and answers
              </p>

              <h2 id="faq-heading">
                Revolutions calculator FAQ
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

              <h2>Revolutions checklist</h2>

              <ul>
                <li>Use revolutions for N</li>
                <li>Use frequency in Hz</li>
                <li>Use time in seconds</li>
                <li>Use displacement in radians</li>
                <li>Apply N = ft or N = θ / 2π</li>
              </ul>
            </div>

            <div className="sidebar-card">
              <p className="sidebar-card__label">
                Related calculator
              </p>

              <h2>Convert rotational speed</h2>

              <p>
                Convert RPM, rotational frequency,
                and angular velocity.
              </p>

              <Link href="/calculators/rpm-calculator">
                Open RPM Calculator
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
