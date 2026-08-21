import type { Metadata } from "next";

import { RelatedCalculators } from "@/components/related-calculators";
import { getRelatedCalculators } from "@/content/calculators/get-related-calculators";
import { calculators } from "@/content/calculators/registry";
import Link from "next/link";

import { KinematicEquationsCalculator } from "@/components/calculators/kinematic-equations-calculator";
import { CalculatorTrustPanel } from "@/components/calculator-trust";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";
import { createCalculatorSchema } from "@/lib/seo/calculator-schema";

const pageTitle =
  "Kinematic Equations Calculator";

const pageDescription =
  "Solve SUVAT motion problems for initial velocity, final velocity, acceleration, time, or displacement using four kinematic equations.";

const pagePath =
  "/calculators/kinematic-equations-calculator";

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
      "What are the SUVAT variables?",
    answer:
      "SUVAT represents displacement, initial velocity, final velocity, acceleration, and time. These variables describe motion with constant acceleration.",
  },
  {
    question:
      "Which kinematic equations does this calculator use?",
    answer:
      "The calculator uses v = u + at, s = ut + ½at², v² = u² + 2as, and s = ½(u + v)t.",
  },
  {
    question:
      "Can the calculator solve for any SUVAT variable?",
    answer:
      "It can solve variables supported by the selected equation. Choose an equation that contains the unknown variable and enter the remaining known values.",
  },
  {
    question:
      "Can acceleration be negative?",
    answer:
      "Yes. Negative acceleration can represent deceleration or acceleration in the selected negative direction.",
  },
  {
    question:
      "Why might a velocity equation have no real solution?",
    answer:
      "The values may produce a negative quantity under a square root in v² = u² + 2as. In that case, no real-valued velocity satisfies the supplied data.",
  },
  {
    question:
      "When are SUVAT equations valid?",
    answer:
      "SUVAT equations are valid when acceleration is constant during the motion interval.",
  },
] as const;

const calculatorSchema = createCalculatorSchema({
  name: pageTitle,
  description: pageDescription,
  slug: "kinematic-equations-calculator",
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
  "kinematic-equations-calculator",
  calculators,
);

export default function KinematicEquationsCalculatorPage() {
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
                Kinematic Equations Calculator
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">
              SUVAT motion solver
            </p>

            <h1>
              Kinematic Equations Calculator
            </h1>

            <p>
              Solve constant-acceleration motion problems
              using four standard SUVAT equations.
            </p>
          </div>
        </Container>
      </section>

      <section
        className="tool-section"
        aria-label="Kinematic equations calculator"
      >
        <Container>
          <KinematicEquationsCalculator />
        </Container>
      </section>

      <section className="article-section">
        <Container className="article-layout">
          <article className="article-content">
            <section aria-labelledby="overview-heading">
              <p className="eyebrow">
                Constant-acceleration motion
              </p>

              <h2 id="overview-heading">
                What are kinematic equations?
              </h2>

              <p>
                Kinematic equations describe motion when
                acceleration remains constant. They connect
                displacement, initial velocity, final
                velocity, acceleration, and time.
              </p>

              <p>
                These equations are commonly called SUVAT
                equations because each letter represents one
                motion variable.
              </p>
            </section>

            <section aria-labelledby="variables-heading">
              <p className="eyebrow">
                SUVAT variables
              </p>

              <h2 id="variables-heading">
                Meaning of each variable
              </h2>

              <ul className="article-list">
                <li>
                  <strong>s</strong> is displacement in
                  metres.
                </li>
                <li>
                  <strong>u</strong> is initial velocity in
                  metres per second.
                </li>
                <li>
                  <strong>v</strong> is final velocity in
                  metres per second.
                </li>
                <li>
                  <strong>a</strong> is acceleration in
                  metres per second squared.
                </li>
                <li>
                  <strong>t</strong> is elapsed time in
                  seconds.
                </li>
              </ul>
            </section>

            <section aria-labelledby="equations-heading">
              <p className="eyebrow">
                Formula reference
              </p>

              <h2 id="equations-heading">
                Four kinematic equations
              </h2>

              <div className="formula-card">
                <p>
                  Velocity–time
                  <span>v = u + at</span>
                </p>

                <p>
                  Displacement–time
                  <span>s = ut + ½at²</span>
                </p>

                <p>
                  Velocity–displacement
                  <span>v² = u² + 2as</span>
                </p>

                <p>
                  Average-velocity form
                  <span>s = ½(u + v)t</span>
                </p>
              </div>
            </section>

            <section aria-labelledby="selection-heading">
              <p className="eyebrow">
                Equation selection
              </p>

              <h2 id="selection-heading">
                How to choose the correct equation
              </h2>

              <p>
                Select an equation that contains the
                variable you want to calculate and the
                values you already know.
              </p>

              <ul className="article-list">
                <li>
                  Use <strong>v = u + at</strong> when
                  displacement is not required.
                </li>
                <li>
                  Use <strong>s = ut + ½at²</strong> when
                  final velocity is not known.
                </li>
                <li>
                  Use <strong>v² = u² + 2as</strong> when
                  time is not known.
                </li>
                <li>
                  Use <strong>s = ½(u + v)t</strong> when
                  acceleration is not required.
                </li>
              </ul>
            </section>

            <section aria-labelledby="example-one-heading">
              <p className="eyebrow">
                Worked example
              </p>

              <h2 id="example-one-heading">
                Calculate final velocity
              </h2>

              <p>
                An object has an initial velocity of
                5 m/s, acceleration of 2 m/s², and moves
                for 4 seconds.
              </p>

              <ol className="calculation-steps">
                <li>
                  Choose
                  <strong> v = u + at</strong>.
                </li>
                <li>
                  Substitute
                  <strong> v = 5 + (2 × 4)</strong>.
                </li>
                <li>
                  Simplify
                  <strong> v = 5 + 8</strong>.
                </li>
                <li>
                  Final velocity is
                  <strong> 13 m/s</strong>.
                </li>
              </ol>
            </section>

            <section aria-labelledby="example-two-heading">
              <p className="eyebrow">
                Worked example
              </p>

              <h2 id="example-two-heading">
                Calculate displacement
              </h2>

              <p>
                An object starts at 5 m/s, accelerates at
                2 m/s², and moves for 4 seconds.
              </p>

              <ol className="calculation-steps">
                <li>
                  Choose
                  <strong> s = ut + ½at²</strong>.
                </li>
                <li>
                  Substitute
                  <strong>
                    {" "}
                    s = (5 × 4) + ½(2)(4²)
                  </strong>.
                </li>
                <li>
                  Calculate
                  <strong> s = 20 + 16</strong>.
                </li>
                <li>
                  Displacement is
                  <strong> 36 m</strong>.
                </li>
              </ol>
            </section>

            <section aria-labelledby="sign-heading">
              <p className="eyebrow">
                Direction and signs
              </p>

              <h2 id="sign-heading">
                Positive and negative values
              </h2>

              <p>
                Velocity, acceleration, and displacement
                can be positive or negative depending on
                the selected direction. Use one direction
                as positive and keep that sign convention
                throughout the calculation.
              </p>

              <p>
                Time must remain positive because it
                represents elapsed duration.
              </p>
            </section>

            <section aria-labelledby="limitations-heading">
              <p className="eyebrow">
                Validity
              </p>

              <h2 id="limitations-heading">
                When not to use SUVAT equations
              </h2>

              <p>
                These equations assume constant
                acceleration. They should not be used
                directly when acceleration changes
                continuously with time or position.
              </p>

              <p>
                For variable acceleration, calculus,
                numerical methods, or motion graphs may be
                required.
              </p>
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
                  href="/calculators/acceleration-calculator"
                >
                  Acceleration Calculator
                </Link>{" "}
                for direct velocity-change calculations.
              </p>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/displacement-calculator"
                >
                  Displacement Calculator
                </Link>{" "}
                to compare initial and final positions.
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

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/free-fall-calculator"
                >
                  Free Fall Calculator
                </Link>{" "}
                for vertical motion under gravity.
              </p>
            </section>

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">
                Questions and answers
              </p>

              <h2 id="faq-heading">
                Kinematic equations FAQ
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
                SUVAT checklist
              </p>

              <h2>Before calculating</h2>

              <ul>
                <li>Identify the unknown variable</li>
                <li>List the known values</li>
                <li>Choose a compatible equation</li>
                <li>Apply one sign convention</li>
                <li>Check units before calculating</li>
              </ul>
            </div>

            <div className="sidebar-card">
              <p className="sidebar-card__label">
                Related calculator
              </p>

              <h2>Calculate acceleration</h2>

              <p>
                Calculate acceleration, velocity, or time
                from constant-acceleration motion.
              </p>

              <Link href="/calculators/acceleration-calculator">
                Open Acceleration Calculator
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
