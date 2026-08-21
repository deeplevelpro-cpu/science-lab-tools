import type { Metadata } from "next";
import Link from "next/link";

import { SpecificHeatCalculator } from "@/components/calculators/specific-heat-calculator";
import { CalculatorTrustPanel } from "@/components/calculator-trust";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";
import { createCalculatorSchema } from "@/lib/seo/calculator-schema";

const pageTitle = "Specific Heat Calculator";
const pageDescription =
  "Calculate heat energy, mass, specific heat capacity, or temperature change using q = mcΔT. Includes worked examples, unit guidance, and heating and cooling cases.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/calculators/specific-heat-calculator",
  },
  openGraph: {
    title: `${pageTitle} | ${siteConfig.name}`,
    description: pageDescription,
    type: "website",
    url: absoluteUrl("/calculators/specific-heat-calculator"),
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
    question: "What is the specific heat formula?",
    answer:
      "The standard equation is q = mcΔT, where q is heat energy, m is mass, c is specific heat capacity, and ΔT is temperature change.",
  },
  {
    question: "Can heat energy be negative?",
    answer:
      "Yes. Negative heat energy represents heat leaving a material, which normally corresponds to a negative temperature change.",
  },
  {
    question: "What units should I use?",
    answer:
      "This calculator uses joules for heat energy, grams for mass, joules per gram per degree Celsius for specific heat capacity, and degrees Celsius for temperature change.",
  },
] as const;

const calculatorSchema = createCalculatorSchema({
  name: pageTitle,
  description: pageDescription,
  slug: "specific-heat-calculator",
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

export default function SpecificHeatCalculatorPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(calculatorSchema).replace(
            /</g,
            "\\u003c",
          ),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
        }}
      />

      <section className="tool-page-hero">
        <Container>
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <ol>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/calculators">Calculators</Link>
              </li>
              <li aria-current="page">Specific Heat Calculator</li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">Thermal physics tool</p>
            <h1>Specific Heat Calculator</h1>
            <p>
              Calculate heat energy, mass, specific heat capacity,
              or temperature change for heating and cooling problems.
            </p>
          </div>
        </Container>
      </section>

      <section
        className="tool-section"
        aria-label="Specific heat calculator"
      >
        <Container>
          <SpecificHeatCalculator />
        </Container>
      </section>

      <section className="article-section">
        <Container className="article-layout">
          <article className="article-content">
            <section aria-labelledby="formula-heading">
              <p className="eyebrow">Formula</p>
              <h2 id="formula-heading">
                The specific heat equation
              </h2>

              <div className="formula-card">
                <p>
                  Specific heat equation
                  <span>q = m × c × ΔT</span>
                </p>
              </div>

              <p>
                Heat energy depends on the material mass, its
                specific heat capacity, and the amount of temperature
                change.
              </p>
            </section>

            <section aria-labelledby="example-heading">
              <p className="eyebrow">Worked example</p>
              <h2 id="example-heading">
                Heating water example
              </h2>

              <p>
                Calculate the heat required to raise{" "}
                <strong>100 grams of water</strong> by{" "}
                <strong>10°C</strong>. The specific heat capacity of
                water is <strong>4.18 J/(g·°C)</strong>.
              </p>

              <ol className="calculation-steps">
                <li>
                  Write the equation: q = m × c × ΔT
                </li>
                <li>
                  Substitute the values: 100 × 4.18 × 10
                </li>
                <li>
                  Multiply: <strong>4,180</strong>
                </li>
                <li>
                  The required heat energy is{" "}
                  <strong>4,180 J</strong>
                </li>
              </ol>
            </section>

            <section aria-labelledby="signs-heading">
              <p className="eyebrow">Heating and cooling</p>
              <h2 id="signs-heading">
                Understand positive and negative values
              </h2>

              <p>
                Positive heat energy and temperature change normally
                represent heating. Negative heat energy and
                temperature change represent cooling.
              </p>

              <p>
                When solving for mass or specific heat capacity, heat
                energy and temperature change must have matching
                signs so that the physical result remains positive.
              </p>
            </section>

            <section aria-labelledby="mistakes-heading">
              <p className="eyebrow">Physics guidance</p>
              <h2 id="mistakes-heading">
                Common specific heat mistakes
              </h2>

              <ul className="article-list">
                <li>
                  Using final temperature instead of temperature
                  change.
                </li>
                <li>
                  Mixing kilograms with a specific heat value based
                  on grams.
                </li>
                <li>
                  Ignoring the sign of heat energy during cooling.
                </li>
                <li>
                  Confusing heat energy with temperature.
                </li>
                <li>Rounding intermediate values too early.</li>
              </ul>
            </section>

            <section aria-labelledby="related-heading">
              <p className="eyebrow">Related energy tools</p>
              <h2 id="related-heading">
                Continue with heat and energy calculations
              </h2>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/power-calculator"
                >
                  Power Calculator
                </Link>{" "}
                to calculate the rate at which heat or other forms
                of energy are transferred.
              </p>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/work-calculator"
                >
                  Work Calculator
                </Link>{" "}
                to compare thermal energy calculations with
                mechanical energy transfer.
              </p>
            </section>

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">Questions and answers</p>
              <h2 id="faq-heading">Specific heat FAQ</h2>

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
              <h2>Specific heat checklist</h2>
              <ul>
                <li>Select the missing variable</li>
                <li>Use grams for mass</li>
                <li>Use joules for heat energy</li>
                <li>Calculate ΔT as final minus initial</li>
                <li>Use negative values for cooling</li>
              </ul>
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
