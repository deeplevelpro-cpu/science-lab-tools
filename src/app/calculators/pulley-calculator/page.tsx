import type { Metadata } from "next";
import Link from "next/link";

import { PulleyCalculator } from "@/components/calculators/pulley-calculator";
import { CalculatorTrustPanel } from "@/components/calculator-trust";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";

const pageTitle = "Pulley Calculator | Force & Mechanical Advantage";

const pageDescription =
  "Calculate load force, ideal mechanical advantage, required effort force, and input rope distance for an ideal pulley system.";

const pagePath =
  "/calculators/pulley-calculator";

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
      "What does the pulley calculator calculate?",
    answer:
      "It calculates load force, ideal mechanical advantage, effort force, and input rope distance for an ideal pulley system.",
  },
  {
    question:
      "How do you calculate pulley mechanical advantage?",
    answer:
      "For an ideal pulley system, mechanical advantage equals the number of rope segments directly supporting the moving load.",
  },
  {
    question:
      "How do you calculate effort force in a pulley?",
    answer:
      "Divide the load force by the ideal mechanical advantage using Fe = W ÷ IMA.",
  },
  {
    question:
      "Why must more rope be pulled when mechanical advantage increases?",
    answer:
      "An ideal pulley reduces the required force by increasing the input distance. The rope distance equals mechanical advantage multiplied by load distance.",
  },
  {
    question:
      "Does this calculator include pulley friction?",
    answer:
      "No. It assumes massless rope, massless pulleys, and no friction, so real systems may require more effort force.",
  },
];

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: pageTitle,
  description: pageDescription,
  url: absoluteUrl(pagePath),
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

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

export default function PulleyCalculatorPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            webApplicationSchema,
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
                Pulley Calculator
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">
              Ideal pulley-system tool
            </p>

            <h1>Pulley Calculator</h1>

            <p>
              Calculate load force, mechanical
              advantage, effort force, and rope distance
              for an ideal pulley system.
            </p>
          </div>
        </Container>
      </section>

      <section
        className="tool-section"
        aria-label="Pulley calculator"
      >
        <Container>
          <PulleyCalculator />
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
                How a pulley system works
              </h2>

              <p>
                A pulley changes the direction of a
                pulling force and can reduce the effort
                needed to lift a load.
              </p>

              <p>
                In an ideal system, the mechanical
                advantage is determined by the number of
                rope segments directly supporting the
                moving load.
              </p>
            </section>

            <section aria-labelledby="load-force-heading">
              <p className="eyebrow">
                Load force
              </p>

              <h2 id="load-force-heading">
                Calculate the weight of the load
              </h2>

              <div className="formula-card">
                <p>
                  Load force
                  <span>W = mg</span>
                </p>
              </div>

              <p>
                The load force is the weight of the
                object being lifted. It depends on mass
                and gravitational acceleration.
              </p>
            </section>

            <section aria-labelledby="advantage-heading">
              <p className="eyebrow">
                Mechanical advantage
              </p>

              <h2 id="advantage-heading">
                Count the supporting rope segments
              </h2>

              <div className="formula-card">
                <p>
                  Ideal mechanical advantage
                  <span>IMA = n</span>
                </p>
              </div>

              <p>
                Count only the rope segments that
                directly support the moving load. A
                single fixed pulley has an ideal
                mechanical advantage of 1.
              </p>
            </section>

            <section aria-labelledby="effort-heading">
              <p className="eyebrow">
                Effort force
              </p>

              <h2 id="effort-heading">
                Calculate the ideal pulling force
              </h2>

              <div className="formula-card">
                <p>
                  Effort force
                  <span>Fe = W ÷ IMA</span>
                </p>
              </div>

              <p>
                Increasing the number of supporting rope
                segments reduces the ideal effort force
                required to lift the load.
              </p>
            </section>

            <section aria-labelledby="distance-heading">
              <p className="eyebrow">
                Distance trade-off
              </p>

              <h2 id="distance-heading">
                Calculate input rope distance
              </h2>

              <div className="formula-card">
                <p>
                  Input distance
                  <span>de = IMA × dl</span>
                </p>
              </div>

              <p>
                The reduction in force comes with a
                distance trade-off. To lift the load a
                given distance, more rope must be pulled.
              </p>
            </section>

            <section aria-labelledby="example-heading">
              <p className="eyebrow">
                Worked example
              </p>

              <h2 id="example-heading">
                Four-segment pulley system
              </h2>

              <p>
                Suppose a 20 kg load is lifted by an
                ideal pulley with four supporting rope
                segments using gravity 9.81 m/s².
              </p>

              <ol className="calculation-steps">
                <li>
                  Load force:{" "}
                  <strong>
                    W = 20 × 9.81 = 196.2 N
                  </strong>.
                </li>

                <li>
                  Mechanical advantage:{" "}
                  <strong>IMA = 4</strong>.
                </li>

                <li>
                  Effort force:{" "}
                  <strong>
                    Fe = 196.2 ÷ 4 = 49.05 N
                  </strong>.
                </li>

                <li>
                  To lift the load 0.5 m, pull{" "}
                  <strong>
                    4 × 0.5 = 2 m
                  </strong>{" "}
                  of rope.
                </li>
              </ol>
            </section>

            <section aria-labelledby="segments-heading">
              <p className="eyebrow">
                Correct setup
              </p>

              <h2 id="segments-heading">
                How to count supporting segments
              </h2>

              <p>
                Identify the pulley or block that moves
                with the load, then count each tensioned
                rope segment pulling upward on that
                moving assembly.
              </p>

              <p>
                Do not automatically count the total
                number of pulleys. Mechanical advantage
                depends on supporting rope segments, not
                pulley count alone.
              </p>
            </section>

            <section aria-labelledby="ideal-heading">
              <p className="eyebrow">
                Ideal versus real systems
              </p>

              <h2 id="ideal-heading">
                Why real effort force is usually larger
              </h2>

              <ul className="article-list">
                <li>
                  Axle and bearing friction reduce
                  efficiency.
                </li>

                <li>
                  Rope bending causes energy loss.
                </li>

                <li>
                  Real pulleys and ropes have mass.
                </li>

                <li>
                  Rope stretching can affect movement.
                </li>

                <li>
                  Misalignment can increase resistance.
                </li>
              </ul>
            </section>

            <section aria-labelledby="related-heading">
              <p className="eyebrow">
                Related tools
              </p>

              <h2 id="related-heading">
                Continue your mechanics calculations
              </h2>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/weight-calculator"
                >
                  Weight Calculator
                </Link>{" "}
                to calculate the load force separately.
              </p>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/force-calculator"
                >
                  Force Calculator
                </Link>{" "}
                for force, mass, and acceleration
                problems.
              </p>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/work-calculator"
                >
                  Work Calculator
                </Link>{" "}
                to compare force and distance in a
                mechanical system.
              </p>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/inclined-plane-calculator"
                >
                  Inclined Plane Calculator
                </Link>{" "}
                for another simple-machine force model.
              </p>
            </section>

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">
                Questions and answers
              </p>

              <h2 id="faq-heading">
                Pulley calculator FAQ
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
                Quick formulas
              </p>

              <h2>Pulley reference</h2>

              <ul>
                <li>W = mg</li>
                <li>IMA = n</li>
                <li>Fe = W ÷ IMA</li>
                <li>de = IMA × dl</li>
              </ul>
            </div>

            <div className="sidebar-card">
              <p className="sidebar-card__label">
                Important assumption
              </p>

              <h2>Ideal system only</h2>

              <p>
                Real pulley systems require more effort
                because of friction and component mass.
              </p>

              <Link href="/calculators/work-calculator">
                Open Work Calculator
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
