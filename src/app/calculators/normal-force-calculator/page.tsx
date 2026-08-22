import type { Metadata } from "next";

import { RelatedCalculators } from "@/components/related-calculators";
import { getRelatedCalculators } from "@/content/calculators/get-related-calculators";
import { calculators } from "@/content/calculators/registry";
import Link from "next/link";

import { NormalForceCalculator } from "@/components/calculators/normal-force-calculator";
import { CalculatorTrustPanel } from "@/components/calculator-trust";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";
import { createCalculatorSchema } from "@/lib/seo/calculator-schema";
import { createFAQSchema } from "@/lib/seo/faq-schema";

const pageTitle = "Normal Force Calculator";

const pageDescription =
  "Calculate normal force, mass, or gravitational acceleration on horizontal and inclined surfaces with optional upward or downward forces.";

const pagePath =
  "/calculators/normal-force-calculator";

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
      "What is normal force?",
    answer:
      "Normal force is the support force exerted by a surface on an object in contact with it. It acts perpendicular to the surface.",
  },
  {
    question:
      "What formula is used on a horizontal surface?",
    answer:
      "For a horizontal surface, the calculator uses N = mg + Fdown − Fup, where downward forces increase normal force and upward forces reduce it.",
  },
  {
    question:
      "What formula is used on an inclined surface?",
    answer:
      "For an incline, the calculator uses N = mg cos(θ) + Fdown − Fup.",
  },
  {
    question:
      "Is normal force always equal to weight?",
    answer:
      "No. Normal force equals weight only on a horizontal surface when there are no additional vertical forces and no vertical acceleration.",
  },
  {
    question:
      "What happens if the upward force is greater than the supported weight?",
    answer:
      "The object loses contact with the surface, so the normal force becomes zero rather than negative.",
  },
];

const calculatorSchema = createCalculatorSchema({
  name: pageTitle,
  description: pageDescription,
  slug: "normal-force-calculator",
  category: "Physics",
});

const faqSchema = createFAQSchema(faqItems);

const relatedCalculators = getRelatedCalculators(
  "normal-force-calculator",
  calculators,
);

export default function NormalForceCalculatorPage() {
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
                Normal Force Calculator
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">
              Surface support-force tool
            </p>

            <h1>Normal Force Calculator</h1>

            <p>
              Calculate normal force, mass, or gravity
              for horizontal and inclined surfaces,
              including optional upward and downward
              forces.
            </p>
          </div>
        </Container>
      </section>

      <section
        className="tool-section"
        aria-label="Normal force calculator"
      >
        <Container>
          <NormalForceCalculator />
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
                What is normal force?
              </h2>

              <p>
                Normal force is the contact force exerted
                by a surface on an object. It acts
                perpendicular to the surface and prevents
                the object from passing through it.
              </p>

              <p>
                Normal force is not automatically equal
                to weight. Inclines and external forces
                can change its magnitude.
              </p>
            </section>

            <section aria-labelledby="horizontal-heading">
              <p className="eyebrow">
                Horizontal surface
              </p>

              <h2 id="horizontal-heading">
                Normal-force formula on a level surface
              </h2>

              <div className="formula-card">
                <p>
                  Horizontal surface
                  <span>
                    N = mg + Fdown − Fup
                  </span>
                </p>
              </div>

              <ul className="article-list">
                <li>
                  <strong>N</strong> is normal force in
                  newtons.
                </li>

                <li>
                  <strong>m</strong> is mass in
                  kilograms.
                </li>

                <li>
                  <strong>g</strong> is gravitational
                  acceleration.
                </li>

                <li>
                  <strong>Fdown</strong> is any additional
                  downward force.
                </li>

                <li>
                  <strong>Fup</strong> is any additional
                  upward force.
                </li>
              </ul>
            </section>

            <section aria-labelledby="incline-heading">
              <p className="eyebrow">
                Inclined surface
              </p>

              <h2 id="incline-heading">
                Normal-force formula on an incline
              </h2>

              <div className="formula-card">
                <p>
                  Inclined surface
                  <span>
                    N = mg cos(θ) + Fdown − Fup
                  </span>
                </p>
              </div>

              <p>
                Only the component of weight
                perpendicular to the incline contributes
                directly to the normal force. That
                perpendicular component is mg cos(θ).
              </p>
            </section>

            <section aria-labelledby="example-heading">
              <p className="eyebrow">
                Worked example
              </p>

              <h2 id="example-heading">
                A 10 kg object on a horizontal surface
              </h2>

              <ol className="calculation-steps">
                <li>
                  Use the formula:{" "}
                  <strong>N = mg</strong>.
                </li>

                <li>
                  Substitute the values:{" "}
                  <strong>N = 10 × 9.81</strong>.
                </li>

                <li>
                  Calculate the result:{" "}
                  <strong>N = 98.1 N</strong>.
                </li>
              </ol>
            </section>

            <section aria-labelledby="incline-example-heading">
              <p className="eyebrow">
                Incline example
              </p>

              <h2 id="incline-example-heading">
                A 10 kg object on a 30° incline
              </h2>

              <ol className="calculation-steps">
                <li>
                  Write the formula:{" "}
                  <strong>N = mg cos(θ)</strong>.
                </li>

                <li>
                  Substitute the values:{" "}
                  <strong>
                    N = 10 × 9.81 × cos(30°)
                  </strong>.
                </li>

                <li>
                  Calculate the result:{" "}
                  <strong>N ≈ 84.96 N</strong>.
                </li>
              </ol>
            </section>

            <section aria-labelledby="external-forces-heading">
              <p className="eyebrow">
                External forces
              </p>

              <h2 id="external-forces-heading">
                How pushes and pulls affect normal force
              </h2>

              <div className="comparison-grid">
                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Downward force
                  </p>

                  <h3>Increases normal force</h3>

                  <p>
                    Pressing an object into the surface
                    increases the supporting force.
                  </p>
                </article>

                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Upward force
                  </p>

                  <h3>Reduces normal force</h3>

                  <p>
                    Pulling an object away from the
                    surface reduces the supporting force.
                  </p>
                </article>
              </div>
            </section>

            <section aria-labelledby="weight-heading">
              <p className="eyebrow">
                Weight comparison
              </p>

              <h2 id="weight-heading">
                Normal force and weight are different
              </h2>

              <p>
                Weight is the gravitational force acting
                on an object. Normal force is the
                support force supplied by a surface.
              </p>

              <p>
                They have equal magnitudes only in
                specific conditions, such as an object at
                rest on a horizontal surface with no
                additional vertical forces.
              </p>
            </section>

            <section aria-labelledby="contact-heading">
              <p className="eyebrow">
                Loss of contact
              </p>

              <h2 id="contact-heading">
                Normal force cannot be negative
              </h2>

              <p>
                A surface can push an object but cannot
                pull it toward itself. If an upward force
                becomes large enough to lift the object,
                contact is lost and the normal force
                becomes zero.
              </p>
            </section>

            <section aria-labelledby="friction-heading">
              <p className="eyebrow">
                Friction connection
              </p>

              <h2 id="friction-heading">
                Why normal force matters in friction
              </h2>

              <p>
                Many friction calculations use the
                normal force. The maximum static friction
                and kinetic friction are commonly modeled
                using a coefficient multiplied by normal
                force.
              </p>

              <div className="formula-card">
                <p>
                  Friction relationship
                  <span>Ff = μN</span>
                </p>
              </div>
            </section>

            <section aria-labelledby="units-heading">
              <p className="eyebrow">Units</p>

              <h2 id="units-heading">
                Use consistent SI units
              </h2>

              <ul className="article-list">
                <li>Mass should be entered in kilograms.</li>
                <li>Forces should be entered in newtons.</li>
                <li>
                  Gravity should be entered in meters per
                  second squared.
                </li>
                <li>Angles should be entered in degrees.</li>
              </ul>
            </section>

            <section aria-labelledby="limitations-heading">
              <p className="eyebrow">
                Assumptions
              </p>

              <h2 id="limitations-heading">
                What the calculation assumes
              </h2>

              <ul className="article-list">
                <li>
                  External forces act perpendicular to
                  the surface.
                </li>

                <li>
                  The incline angle is at least 0° and
                  less than 90°.
                </li>

                <li>
                  The object remains in contact with the
                  surface.
                </li>

                <li>
                  Gravity is treated as constant.
                </li>

                <li>
                  The calculator does not include
                  vertical acceleration of the surface.
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
                to solve general force, mass, or
                acceleration problems.
              </p>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/acceleration-due-to-gravity-calculator"
                >
                  Acceleration Due to Gravity Calculator
                </Link>{" "}
                to estimate gravity for a planet or
                celestial body.
              </p>
            </section>

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">
                Questions and answers
              </p>

              <h2 id="faq-heading">
                Normal force calculator FAQ
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

              <h2>Normal-force checklist</h2>

              <ul>
                <li>Identify the surface angle</li>
                <li>Use mass in kilograms</li>
                <li>Include perpendicular forces</li>
                <li>Apply the cosine on an incline</li>
                <li>Report force in newtons</li>
              </ul>
            </div>

            <div className="sidebar-card">
              <p className="sidebar-card__label">
                Related calculator
              </p>

              <h2>Calculate weight first</h2>

              <p>
                Find gravitational force from mass and
                local gravity.
              </p>

              <Link href="/calculators/weight-calculator">
                Open Weight Calculator
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
