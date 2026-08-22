import type { Metadata } from "next";

import { RelatedCalculators } from "@/components/related-calculators";
import { getRelatedCalculators } from "@/content/calculators/get-related-calculators";
import { calculators } from "@/content/calculators/registry";
import Link from "next/link";

import { InclinedPlaneCalculator } from "@/components/calculators/inclined-plane-calculator";
import { CalculatorTrustPanel } from "@/components/calculator-trust";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";
import { createCalculatorSchema } from "@/lib/seo/calculator-schema";
import { createFAQSchema } from "@/lib/seo/faq-schema";

const pageTitle = "Inclined Plane Calculator";

const pageDescription =
  "Calculate parallel force, normal force, friction force, net force, and acceleration on an inclined plane.";

const pagePath =
  "/calculators/inclined-plane-calculator";

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
      "What does the inclined plane calculator calculate?",
    answer:
      "It calculates the component of weight parallel to the incline, normal force, friction force, net force, and acceleration.",
  },
  {
    question:
      "What is the force parallel to an incline?",
    answer:
      "The component of gravitational force acting down the incline is F parallel = mg sin theta.",
  },
  {
    question:
      "What is the normal force on an incline?",
    answer:
      "For a simple inclined plane without additional perpendicular forces, normal force is N = mg cos theta.",
  },
  {
    question:
      "How is friction calculated on an incline?",
    answer:
      "Friction is calculated using Ff = μN, where μ is the coefficient of friction and N is normal force.",
  },
  {
    question:
      "What does a negative net force mean?",
    answer:
      "A negative result means the friction term is larger than the downslope gravitational component under the selected direction convention.",
  },
];

const calculatorSchema = createCalculatorSchema({
  name: pageTitle,
  description: pageDescription,
  slug: "inclined-plane-calculator",
  category: "Physics",
});

const faqSchema = createFAQSchema(faqItems);

const relatedCalculators = getRelatedCalculators(
  "inclined-plane-calculator",
  calculators,
);

export default function InclinedPlaneCalculatorPage() {
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
                Inclined Plane Calculator
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">
              Incline forces and motion
            </p>

            <h1>Inclined Plane Calculator</h1>

            <p>
              Calculate parallel force, normal force,
              friction, net force, and acceleration for
              an object on an inclined surface.
            </p>
          </div>
        </Container>
      </section>

      <section
        className="tool-section"
        aria-label="Inclined plane calculator"
      >
        <Container>
          <InclinedPlaneCalculator />
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
                Forces on an inclined plane
              </h2>

              <p>
                An inclined plane changes how an
                object&apos;s weight acts relative to
                the surface. Gravity can be resolved
                into components parallel and
                perpendicular to the incline.
              </p>

              <p>
                The parallel component tends to move the
                object down the slope. The perpendicular
                component determines the normal force.
              </p>
            </section>

            <section aria-labelledby="parallel-heading">
              <p className="eyebrow">
                Parallel component
              </p>

              <h2 id="parallel-heading">
                Force down the incline
              </h2>

              <div className="formula-card">
                <p>
                  Parallel force
                  <span>F∥ = mg sin(θ)</span>
                </p>
              </div>

              <p>
                This is the component of gravitational
                force acting parallel to the surface and
                pointing down the incline.
              </p>
            </section>

            <section aria-labelledby="normal-heading">
              <p className="eyebrow">
                Perpendicular component
              </p>

              <h2 id="normal-heading">
                Normal force on an incline
              </h2>

              <div className="formula-card">
                <p>
                  Normal force
                  <span>N = mg cos(θ)</span>
                </p>
              </div>

              <p>
                The normal force is perpendicular to the
                incline. In this simplified model, it is
                equal to the perpendicular component of
                the object&apos;s weight.
              </p>
            </section>

            <section aria-labelledby="friction-heading">
              <p className="eyebrow">
                Surface resistance
              </p>

              <h2 id="friction-heading">
                Friction force on the incline
              </h2>

              <div className="formula-card">
                <p>
                  Friction force
                  <span>Ff = μN</span>
                </p>
              </div>

              <p>
                When the object moves down the slope,
                friction acts up the incline. Enter zero
                as the coefficient for a frictionless
                surface.
              </p>
            </section>

            <section aria-labelledby="net-force-heading">
              <p className="eyebrow">
                Combined forces
              </p>

              <h2 id="net-force-heading">
                Net force down the incline
              </h2>

              <div className="formula-card">
                <p>
                  Net force
                  <span>
                    Fnet = mg sin(θ) − μmg cos(θ)
                  </span>
                </p>
              </div>

              <p>
                The calculator defines the downslope
                direction as positive. Friction is
                subtracted because it acts in the
                opposite direction.
              </p>
            </section>

            <section aria-labelledby="acceleration-heading">
              <p className="eyebrow">
                Motion result
              </p>

              <h2 id="acceleration-heading">
                Acceleration on an inclined plane
              </h2>

              <div className="formula-card">
                <p>
                  Acceleration
                  <span>
                    a = g[sin(θ) − μ cos(θ)]
                  </span>
                </p>
              </div>

              <p>
                Mass cancels when Newton&apos;s second
                law is applied, so acceleration depends
                on gravity, incline angle, and the
                coefficient of friction.
              </p>
            </section>

            <section aria-labelledby="example-heading">
              <p className="eyebrow">
                Worked example
              </p>

              <h2 id="example-heading">
                Find acceleration with friction
              </h2>

              <p>
                Consider a 10 kg object on a 30° incline
                with gravity 9.81 m/s² and coefficient
                of friction 0.2.
              </p>

              <ol className="calculation-steps">
                <li>
                  Parallel force:{" "}
                  <strong>
                    10 × 9.81 × sin(30°) = 49.05 N
                  </strong>.
                </li>

                <li>
                  Normal force:{" "}
                  <strong>
                    10 × 9.81 × cos(30°) ≈ 84.96 N
                  </strong>.
                </li>

                <li>
                  Friction force:{" "}
                  <strong>
                    0.2 × 84.96 ≈ 16.99 N
                  </strong>.
                </li>

                <li>
                  Net force:{" "}
                  <strong>
                    49.05 − 16.99 ≈ 32.06 N
                  </strong>.
                </li>

                <li>
                  Acceleration:{" "}
                  <strong>
                    32.06 ÷ 10 ≈ 3.21 m/s²
                  </strong>.
                </li>
              </ol>
            </section>

            <section aria-labelledby="negative-heading">
              <p className="eyebrow">
                Direction convention
              </p>

              <h2 id="negative-heading">
                Understanding a negative result
              </h2>

              <p>
                A negative net force or acceleration
                means the calculated friction term is
                larger than the gravitational component
                acting down the incline.
              </p>

              <p>
                For an object initially at rest, a
                negative result does not automatically
                mean it accelerates uphill. Static
                friction must be considered separately
                to determine whether motion begins.
              </p>
            </section>

            <section aria-labelledby="assumptions-heading">
              <p className="eyebrow">
                Model assumptions
              </p>

              <h2 id="assumptions-heading">
                Calculator limitations
              </h2>

              <ul className="article-list">
                <li>
                  The incline is treated as a rigid
                  straight surface.
                </li>

                <li>
                  The coefficient of friction is treated
                  as constant.
                </li>

                <li>
                  Air resistance is ignored.
                </li>

                <li>
                  No external pulling or pushing force is
                  included.
                </li>

                <li>
                  The positive direction is down the
                  incline.
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
                  href="/calculators/friction-calculator"
                >
                  Friction Calculator
                </Link>{" "}
                to solve friction force, coefficient, or
                normal force directly.
              </p>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/normal-force-calculator"
                >
                  Normal Force Calculator
                </Link>{" "}
                for horizontal and inclined surfaces
                with optional external forces.
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
                for Newton&apos;s second-law problems.
              </p>
            </section>

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">
                Questions and answers
              </p>

              <h2 id="faq-heading">
                Inclined plane calculator FAQ
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

              <h2>Incline reference</h2>

              <ul>
                <li>F∥ = mg sin(θ)</li>
                <li>N = mg cos(θ)</li>
                <li>Ff = μN</li>
                <li>Fnet = F∥ − Ff</li>
                <li>a = Fnet ÷ m</li>
              </ul>
            </div>

            <div className="sidebar-card">
              <p className="sidebar-card__label">
                Related calculator
              </p>

              <h2>Calculate friction separately</h2>

              <p>
                Solve friction force, coefficient, or
                normal force using F = μN.
              </p>

              <Link href="/calculators/friction-calculator">
                Open Friction Calculator
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
