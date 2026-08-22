import type { Metadata } from "next";

import { RelatedCalculators } from "@/components/related-calculators";
import { getRelatedCalculators } from "@/content/calculators/get-related-calculators";
import { calculators } from "@/content/calculators/registry";
import Link from "next/link";

import {
  AngularMomentumCalculator,
} from "@/components/calculators/angular-momentum-calculator";
import { CalculatorTrustPanel } from "@/components/calculator-trust";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";
import { createCalculatorSchema } from "@/lib/seo/calculator-schema";
import { createFAQSchema } from "@/lib/seo/faq-schema";

const pageTitle =
  "Angular Momentum Calculator";

const pageDescription =
  "Calculate angular momentum, moment of inertia, or angular velocity using L = Iω, with unit guidance, formula explanations, and worked results.";

const pagePath =
  "/calculators/angular-momentum-calculator";

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
      "What formula does the angular momentum calculator use?",
    answer:
      "It uses L = Iω, where angular momentum equals moment of inertia multiplied by angular velocity.",
  },
  {
    question:
      "What is angular momentum?",
    answer:
      "Angular momentum is the rotational equivalent of linear momentum and describes the rotational motion of an object.",
  },
  {
    question:
      "How do you calculate moment of inertia from angular momentum?",
    answer:
      "Divide angular momentum by angular velocity using I = L ÷ ω.",
  },
  {
    question:
      "What units are used for angular momentum?",
    answer:
      "Angular momentum is measured in kilogram square meters per second, written as kg·m²/s.",
  },
] as const;

const calculatorSchema = createCalculatorSchema({
  name: pageTitle,
  description: pageDescription,
  slug: "angular-momentum-calculator",
  category: "Physics",
});

const faqSchema = createFAQSchema(faqItems);

const relatedCalculators = getRelatedCalculators(
  "angular-momentum-calculator",
  calculators,
);

export default function AngularMomentumCalculatorPage() {
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
                Angular Momentum Calculator
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">
              Rotational mechanics tool
            </p>

            <h1>
              Angular Momentum Calculator
            </h1>

            <p>
              Solve angular momentum, moment of
              inertia, or angular velocity using
              L = Iω.
            </p>
          </div>
        </Container>
      </section>

      <section
        className="tool-section"
        aria-label="Angular momentum calculator"
      >
        <Container>
          <AngularMomentumCalculator />
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
                What is angular momentum?
              </h2>

              <p>
                Angular momentum describes the
                rotational motion of an object. It
                depends on the object&apos;s moment of
                inertia and angular velocity.
              </p>
            </section>

            <section aria-labelledby="formula-heading">
              <p className="eyebrow">Formula</p>

              <h2 id="formula-heading">
                Angular momentum formula
              </h2>

              <div className="formula-card">
                <p>
                  Angular Momentum
                  <span>L = Iω</span>
                </p>
              </div>

              <ul className="article-list">
                <li>
                  <strong>L</strong> is angular
                  momentum in kg·m²/s.
                </li>
                <li>
                  <strong>I</strong> is moment of
                  inertia in kg·m².
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
                An object has I = 4 kg·m² and
                ω = 3 rad/s
              </h2>

              <ol className="calculation-steps">
                <li>
                  Write the formula:{" "}
                  <strong>L = Iω</strong>.
                </li>
                <li>
                  Substitute the values:{" "}
                  <strong>L = 4 × 3</strong>.
                </li>
                <li>
                  Calculate angular momentum:{" "}
                  <strong>L = 12 kg·m²/s</strong>.
                </li>
              </ol>
            </section>

            <section aria-labelledby="rearranged-heading">
              <p className="eyebrow">
                Rearranged equations
              </p>

              <h2 id="rearranged-heading">
                Solve for moment of inertia or
                angular velocity
              </h2>

              <div className="comparison-grid">
                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Moment of inertia
                  </p>

                  <h3>I = L ÷ ω</h3>

                  <p>
                    Divide angular momentum by angular
                    velocity.
                  </p>
                </article>

                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Angular velocity
                  </p>

                  <h3>ω = L ÷ I</h3>

                  <p>
                    Divide angular momentum by moment
                    of inertia.
                  </p>
                </article>
              </div>
            </section>

            <section aria-labelledby="conservation-heading">
              <p className="eyebrow">
                Conservation principle
              </p>

              <h2 id="conservation-heading">
                Conservation of angular momentum
              </h2>

              <p>
                When no external torque acts on a
                system, its total angular momentum
                remains constant. A decrease in moment
                of inertia therefore causes angular
                velocity to increase.
              </p>
            </section>

            <section aria-labelledby="relationship-heading">
              <p className="eyebrow">
                Physical relationship
              </p>

              <h2 id="relationship-heading">
                Moment of inertia and speed both
                affect L
              </h2>

              <p>
                Angular momentum increases when moment
                of inertia increases, angular velocity
                increases, or both increase.
              </p>
            </section>

            <section aria-labelledby="units-heading">
              <p className="eyebrow">Units</p>

              <h2 id="units-heading">
                Standard SI units
              </h2>

              <p>
                Use kilogram square meters per second
                for angular momentum, kilogram square
                meters for moment of inertia, and
                radians per second for angular
                velocity.
              </p>
            </section>

            <section aria-labelledby="applications-heading">
              <p className="eyebrow">
                Real-world applications
              </p>

              <h2 id="applications-heading">
                Where angular momentum is used
              </h2>

              <ul className="article-list">
                <li>
                  Rotating wheels and flywheels.
                </li>
                <li>
                  Spinning athletes and ice skaters.
                </li>
                <li>
                  Planetary and satellite motion.
                </li>
                <li>
                  Gyroscopes and navigation systems.
                </li>
                <li>
                  Rotating machinery and turbines.
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
                  Moment of inertia is defined for the
                  selected rotation axis.
                </li>
                <li>
                  Angular velocity is expressed in
                  radians per second.
                </li>
                <li>
                  Vector direction is not represented.
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
                Continue your rotational analysis
              </h2>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/moment-of-inertia-calculator"
                >
                  Moment of Inertia Calculator
                </Link>{" "}
                to calculate rotational inertia for
                common shapes.
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
                angular displacement, or time.
              </p>
            </section>

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">
                Questions and answers
              </p>

              <h2 id="faq-heading">
                Angular momentum calculator FAQ
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
                Angular momentum checklist
              </h2>

              <ul>
                <li>
                  Use angular momentum in kg·m²/s
                </li>
                <li>
                  Use moment of inertia in kg·m²
                </li>
                <li>
                  Use angular velocity in rad/s
                </li>
                <li>Apply L = Iω</li>
                <li>Check all values are positive</li>
              </ul>
            </div>

            <div className="sidebar-card">
              <p className="sidebar-card__label">
                Related calculator
              </p>

              <h2>
                Calculate moment of inertia
              </h2>

              <p>
                Calculate rotational inertia for
                point masses, disks, hoops, spheres,
                shells, and rods.
              </p>

              <Link href="/calculators/moment-of-inertia-calculator">
                Open Moment of Inertia Calculator
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
