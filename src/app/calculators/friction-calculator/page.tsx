import type { Metadata } from "next";
import Link from "next/link";

import { FrictionCalculator } from "@/components/calculators/friction-calculator";
import { CalculatorTrustPanel } from "@/components/calculator-trust";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";
import { createCalculatorSchema } from "@/lib/seo/calculator-schema";

const pageTitle = "Friction Calculator | Force & Coefficient";

const pageDescription =
  "Calculate static or kinetic friction force, coefficient of friction, or normal force using F = μN, with clear assumptions and worked calculation steps.";

const pagePath =
  "/calculators/friction-calculator";

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
      "What formula does the friction calculator use?",
    answer:
      "The calculator uses F = μN, where F is friction force, μ is the coefficient of friction, and N is normal force.",
  },
  {
    question:
      "What is the difference between static and kinetic friction?",
    answer:
      "Static friction resists the start of motion, while kinetic friction acts when two surfaces are already sliding.",
  },
  {
    question:
      "Does the coefficient of friction have a unit?",
    answer:
      "No. The coefficient of friction is a dimensionless ratio.",
  },
  {
    question:
      "Can static friction be less than μsN?",
    answer:
      "Yes. Static friction adjusts up to a maximum value of μsN. The calculator treats μsN as the maximum static friction.",
  },
  {
    question:
      "Why is normal force needed?",
    answer:
      "Friction depends on how strongly the surfaces press together, which is represented by normal force.",
  },
];

const calculatorSchema = createCalculatorSchema({
  name: pageTitle,
  description: pageDescription,
  slug: "friction-calculator",
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

export default function FrictionCalculatorPage() {
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
                Friction Calculator
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">
              Surface resistance tool
            </p>

            <h1>Friction Calculator</h1>

            <p>
              Calculate static or kinetic friction
              force, coefficient of friction, or normal
              force using F = μN.
            </p>
          </div>
        </Container>
      </section>

      <section
        className="tool-section"
        aria-label="Friction calculator"
      >
        <Container>
          <FrictionCalculator />
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
                What is friction?
              </h2>

              <p>
                Friction is a contact force that opposes
                relative motion or attempted motion
                between two surfaces.
              </p>

              <p>
                Its magnitude depends on the coefficient
                of friction and the normal force pressing
                the surfaces together.
              </p>
            </section>

            <section aria-labelledby="formula-heading">
              <p className="eyebrow">Formula</p>

              <h2 id="formula-heading">
                Friction-force formula
              </h2>

              <div className="formula-card">
                <p>
                  Friction force
                  <span>Ff = μN</span>
                </p>
              </div>

              <ul className="article-list">
                <li>
                  <strong>Ff</strong> is friction force
                  in newtons.
                </li>

                <li>
                  <strong>μ</strong> is the coefficient
                  of friction.
                </li>

                <li>
                  <strong>N</strong> is normal force in
                  newtons.
                </li>
              </ul>
            </section>

            <section aria-labelledby="kinetic-heading">
              <p className="eyebrow">
                Kinetic friction
              </p>

              <h2 id="kinetic-heading">
                Friction while surfaces are sliding
              </h2>

              <div className="formula-card">
                <p>
                  Kinetic friction
                  <span>Fk = μkN</span>
                </p>
              </div>

              <p>
                Kinetic friction acts when one surface
                slides across another. Its direction is
                opposite the relative motion.
              </p>
            </section>

            <section aria-labelledby="static-heading">
              <p className="eyebrow">
                Static friction
              </p>

              <h2 id="static-heading">
                Friction before sliding begins
              </h2>

              <div className="formula-card">
                <p>
                  Maximum static friction
                  <span>Fs,max = μsN</span>
                </p>
              </div>

              <p>
                Static friction adjusts to match an
                applied force until it reaches its
                maximum value. The calculator treats
                μsN as the maximum static friction.
              </p>
            </section>

            <section aria-labelledby="example-heading">
              <p className="eyebrow">
                Worked example
              </p>

              <h2 id="example-heading">
                Calculate kinetic friction
              </h2>

              <p>
                Suppose the coefficient of kinetic
                friction is 0.3 and the normal force is
                100 N.
              </p>

              <ol className="calculation-steps">
                <li>
                  Write the formula:{" "}
                  <strong>Fk = μkN</strong>.
                </li>

                <li>
                  Substitute the values:{" "}
                  <strong>Fk = 0.3 × 100</strong>.
                </li>

                <li>
                  Calculate the result:{" "}
                  <strong>Fk = 30 N</strong>.
                </li>
              </ol>
            </section>

            <section aria-labelledby="coefficient-heading">
              <p className="eyebrow">
                Surface interaction
              </p>

              <h2 id="coefficient-heading">
                What is the coefficient of friction?
              </h2>

              <p>
                The coefficient of friction describes
                how strongly two surfaces resist sliding.
                It has no unit because it is a ratio.
              </p>

              <p>
                Rougher or more adhesive surface pairs
                usually have larger coefficients, while
                smoother or lubricated surfaces usually
                have smaller values.
              </p>
            </section>

            <section aria-labelledby="rearranged-heading">
              <p className="eyebrow">
                Rearranged equations
              </p>

              <h2 id="rearranged-heading">
                Solve for coefficient or normal force
              </h2>

              <div className="comparison-grid">
                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Coefficient
                  </p>

                  <h3>μ = Ff ÷ N</h3>

                  <p>
                    Divide friction force by normal
                    force.
                  </p>
                </article>

                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Normal force
                  </p>

                  <h3>N = Ff ÷ μ</h3>

                  <p>
                    Divide friction force by the
                    coefficient of friction.
                  </p>
                </article>
              </div>
            </section>

            <section aria-labelledby="normal-force-heading">
              <p className="eyebrow">
                Normal force connection
              </p>

              <h2 id="normal-force-heading">
                Why normal force affects friction
              </h2>

              <p>
                Normal force measures how strongly the
                surfaces press together. Increasing the
                normal force generally increases the
                friction force predicted by the model.
              </p>

              <p>
                On an incline, normal force is usually
                smaller than the object&apos;s full
                weight because only the perpendicular
                component of weight presses into the
                surface.
              </p>
            </section>

            <section aria-labelledby="limitations-heading">
              <p className="eyebrow">
                Model limitations
              </p>

              <h2 id="limitations-heading">
                When F = μN is an approximation
              </h2>

              <ul className="article-list">
                <li>
                  The coefficient is treated as constant.
                </li>

                <li>
                  Surface deformation is ignored.
                </li>

                <li>
                  Air resistance is not included.
                </li>

                <li>
                  Static friction is treated as its
                  maximum possible value.
                </li>

                <li>
                  The model is less accurate for rolling
                  resistance and lubricated contacts.
                </li>
              </ul>
            </section>

            <section aria-labelledby="related-heading">
              <p className="eyebrow">
                Related tools
              </p>

              <h2 id="related-heading">
                Continue your force calculations
              </h2>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/normal-force-calculator"
                >
                  Normal Force Calculator
                </Link>{" "}
                to find the supporting force needed in
                the friction formula.
              </p>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/weight-calculator"
                >
                  Weight Calculator
                </Link>{" "}
                to calculate gravitational force from
                mass and gravity.
              </p>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/force-calculator"
                >
                  Force Calculator
                </Link>{" "}
                for general force, mass, and acceleration
                calculations.
              </p>
            </section>

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">
                Questions and answers
              </p>

              <h2 id="faq-heading">
                Friction calculator FAQ
              </h2>

              <div className="faq-list">
                {faqItems.map((item) => (
                  <details key={item.question}>
                    <summary>
                      {item.question}
                    </summary>

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

              <h2>Friction checklist</h2>

              <ul>
                <li>Choose static or kinetic</li>
                <li>Use normal force in newtons</li>
                <li>Use a dimensionless coefficient</li>
                <li>Apply F = μN</li>
                <li>Report friction in newtons</li>
              </ul>
            </div>

            <div className="sidebar-card">
              <p className="sidebar-card__label">
                Related calculator
              </p>

              <h2>Find normal force first</h2>

              <p>
                Calculate normal force on horizontal or
                inclined surfaces.
              </p>

              <Link href="/calculators/normal-force-calculator">
                Open Normal Force Calculator
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
