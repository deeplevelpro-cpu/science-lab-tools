import type { Metadata } from "next";

import { RelatedCalculators } from "@/components/related-calculators";
import { getRelatedCalculators } from "@/content/calculators/get-related-calculators";
import { calculators } from "@/content/calculators/registry";
import Link from "next/link";

import {
  RpmCalculator,
} from "@/components/calculators/rpm-calculator";
import { CalculatorTrustPanel } from "@/components/calculator-trust";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";
import { createCalculatorSchema } from "@/lib/seo/calculator-schema";

const pageTitle =
  "RPM Calculator | Rotational Speed & Frequency";

const pageDescription =
  "Convert RPM, rotational frequency, angular velocity, or rotation period with standard formulas, supported units, and clear conversion steps.";

const pagePath =
  "/calculators/rpm-calculator";

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
      "What formula does the RPM calculator use?",
    answer:
      "It uses RPM = 60f, where revolutions per minute equals rotational frequency in hertz multiplied by 60.",
  },
  {
    question:
      "How do you convert RPM to hertz?",
    answer:
      "Divide RPM by 60. For example, 120 RPM equals 2 hertz.",
  },
  {
    question:
      "How do you convert RPM to angular velocity?",
    answer:
      "Use ω = 2π × RPM / 60 to convert revolutions per minute to radians per second.",
  },
  {
    question:
      "What units does the RPM calculator use?",
    answer:
      "Rotational speed is measured in RPM, rotational frequency in hertz, and angular velocity in radians per second.",
  },
] as const;

const calculatorSchema = createCalculatorSchema({
  name: pageTitle,
  description: pageDescription,
  slug: "rpm-calculator",
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
  "rpm-calculator",
  calculators,
);

export default function RpmCalculatorPage() {
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
                RPM Calculator
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">
              Rotational motion tool
            </p>

            <h1>RPM Calculator</h1>

            <p>
              Convert RPM, rotational frequency, or
              angular velocity using RPM = 60f.
            </p>
          </div>
        </Container>
      </section>

      <section
        className="tool-section"
        aria-label="RPM calculator"
      >
        <Container>
          <RpmCalculator />
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
                What is RPM?
              </h2>

              <p>
                RPM means revolutions per minute. It
                measures how many complete rotations
                an object makes in one minute.
              </p>
            </section>

            <section aria-labelledby="formula-heading">
              <p className="eyebrow">Formula</p>

              <h2 id="formula-heading">
                RPM conversion formulas
              </h2>

              <div className="formula-card">
                <p>
                  Rotational Speed
                  <span>RPM = 60f</span>
                </p>
              </div>

              <ul className="article-list">
                <li>
                  <strong>RPM</strong> is revolutions
                  per minute.
                </li>
                <li>
                  <strong>f</strong> is rotational
                  frequency in hertz.
                </li>
                <li>
                  <strong>ω</strong> is angular
                  velocity in radians per second.
                </li>
              </ul>
            </section>

            <section aria-labelledby="example-heading">
              <p className="eyebrow">
                Worked example
              </p>

              <h2 id="example-heading">
                Convert 2 Hz to RPM
              </h2>

              <ol className="calculation-steps">
                <li>
                  Write the formula:{" "}
                  <strong>RPM = 60f</strong>.
                </li>
                <li>
                  Substitute the frequency:{" "}
                  <strong>RPM = 60 × 2</strong>.
                </li>
                <li>
                  Calculate the speed:{" "}
                  <strong>RPM = 120</strong>.
                </li>
              </ol>
            </section>

            <section aria-labelledby="rearranged-heading">
              <p className="eyebrow">
                Conversion equations
              </p>

              <h2 id="rearranged-heading">
                Convert RPM, hertz, and rad/s
              </h2>

              <div className="comparison-grid">
                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Rotational frequency
                  </p>

                  <h3>f = RPM ÷ 60</h3>

                  <p>
                    Divide RPM by 60 to obtain hertz.
                  </p>
                </article>

                        <article className="comparison-card">
                <p className="comparison-card__label">
                  Angular velocity
                </p>

                <h3>ω = 2π × RPM ÷ 60</h3>

                <p>
                  Convert RPM to revolutions per
                  second, then multiply by 2π.
                </p>
              </article>
            </div>
          </section>

          <section aria-labelledby="relationship-heading">
            <p className="eyebrow">
              Physical relationship
            </p>

            <h2 id="relationship-heading">
              RPM and rotational frequency
            </h2>

            <p>
              One hertz equals one revolution per
              second, which equals 60 RPM. RPM
              therefore increases directly with
              rotational frequency.
            </p>
          </section>

          <section aria-labelledby="units-heading">
            <p className="eyebrow">Units</p>

            <h2 id="units-heading">
              Standard rotational units
            </h2>

            <p>
              Use RPM for revolutions per minute,
              hertz for revolutions per second, and
              radians per second for angular velocity.
            </p>
          </section>

          <section aria-labelledby="applications-heading">
            <p className="eyebrow">
              Real-world applications
            </p>

            <h2 id="applications-heading">
              Where RPM is used
            </h2>

            <ul className="article-list">
              <li>Electric motors and generators.</li>
              <li>Vehicle engines and drive shafts.</li>
              <li>Fans, pumps, and turbines.</li>
              <li>Drills and machining equipment.</li>
              <li>Rotating laboratory equipment.</li>
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
              <li>Frequency must be entered in hertz.</li>
              <li>
                Angular velocity must be entered in
                radians per second.
              </li>
              <li>
                Rotation direction is not represented.
              </li>
              <li>
                Degrees per second are not converted
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
                href="/calculators/angular-velocity-calculator"
              >
                Angular Velocity Calculator
              </Link>{" "}
              to calculate angular velocity,
              displacement, or time.
            </p>
          </section>

          <section aria-labelledby="faq-heading">
            <p className="eyebrow">
              Questions and answers
            </p>

            <h2 id="faq-heading">
              RPM calculator FAQ
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

              <h2>RPM conversion checklist</h2>

              <ul>
                <li>Use rotational speed in RPM</li>
                <li>Use frequency in Hz</li>
                <li>Use angular velocity in rad/s</li>
                <li>Apply RPM = 60f</li>
                <li>Check that values are positive</li>
              </ul>
            </div>

            <div className="sidebar-card">
              <p className="sidebar-card__label">
                Related calculator
              </p>

              <h2>Calculate rotational frequency</h2>

              <p>
                Solve rotational frequency, angular
                velocity, or rotation period.
              </p>

              <Link href="/calculators/rotational-frequency-calculator">
                Open Rotational Frequency Calculator
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
