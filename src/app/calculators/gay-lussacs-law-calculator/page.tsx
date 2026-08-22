import type { Metadata } from "next";

import { RelatedCalculators } from "@/components/related-calculators";
import { getRelatedCalculators } from "@/content/calculators/get-related-calculators";
import { calculators } from "@/content/calculators/registry";
import Link from "next/link";

import { CalculatorTrustPanel } from "@/components/calculator-trust";
import { GayLussacsLawCalculator } from "@/components/calculators/gay-lussacs-law-calculator";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";
import { createCalculatorSchema } from "@/lib/seo/calculator-schema";
import { createFAQSchema } from "@/lib/seo/faq-schema";

export const metadata: Metadata = {
  title: "Gay-Lussac's Law Calculator | Pressure & Temperature",
  description:
    "Calculate initial or final gas pressure and temperature with Gay-Lussac's law, P₁/T₁ = P₂/T₂. Supports Pa, kPa, bar, atm, mmHg, Kelvin, Celsius, and Fahrenheit.",
  alternates: {
    canonical: "/calculators/gay-lussacs-law-calculator",
  },
  openGraph: {
    title: "Gay-Lussac's Law Calculator",
    description:
      "Solve pressure-temperature gas-law problems using P₁/T₁ = P₂/T₂ with automatic unit conversion.",
    url: absoluteUrl("/calculators/gay-lussacs-law-calculator"),
    siteName: siteConfig.name,
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "ScienceCalcHub",
    description:
      "Science calculators and educational tools for students, teachers, and researchers.",
  },
};

const faqItems = [
  {
    question: "What is Gay-Lussac's law?",
    answer:
      "Gay-Lussac's law states that the pressure of a fixed amount of gas is directly proportional to its absolute temperature when volume remains constant.",
  },
  {
    question: "What formula does the calculator use?",
    answer:
      "The calculator uses P₁/T₁ = P₂/T₂, where P is gas pressure and T is absolute temperature measured in Kelvin.",
  },
  {
    question: "Must temperature be entered in Kelvin?",
    answer:
      "The equation requires absolute temperature. You may enter Kelvin, Celsius, or Fahrenheit because the calculator converts temperatures to Kelvin before solving.",
  },
  {
    question: "Can Gay-Lussac's law use Celsius directly?",
    answer:
      "No. Celsius values must be converted to Kelvin before they are used in the pressure-temperature ratio.",
  },
  {
    question: "When does Gay-Lussac's law apply?",
    answer:
      "It applies to a fixed amount of gas in a rigid container when volume remains constant and the gas behaves approximately as an ideal gas.",
  },
  {
    question: "Why does gas pressure increase when heated?",
    answer:
      "Heating makes gas particles move faster and collide with the rigid container walls more frequently and forcefully, increasing pressure.",
  },
];

const calculatorSchema = createCalculatorSchema({
  name: "Gay-Lussac's Law Calculator | Pressure & Temperature",
  description: "Calculate initial or final gas pressure and temperature with Gay-Lussac's law, P₁/T₁ = P₂/T₂. Supports Pa, kPa, bar, atm, mmHg, Kelvin, Celsius, and Fahrenheit.",
  slug: "gay-lussacs-law-calculator",
  category: "Chemistry",
});

const faqJsonLd = createFAQSchema(faqItems);

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: absoluteUrl("/"),
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Calculators",
      item: absoluteUrl("/calculators"),
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Gay-Lussac's Law Calculator",
      item: absoluteUrl("/calculators/gay-lussacs-law-calculator"),
    },
  ],
};



const relatedCalculators = getRelatedCalculators(
  "gay-lussacs-law-calculator",
  calculators,
);

export default function GayLussacsLawCalculatorPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(calculatorSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />

      <section className="tool-page-hero">
        <Container>
          <p className="eyebrow">Chemistry calculator</p>

          <h1>Gay-Lussac&apos;s Law Calculator</h1>

          <p className="tool-page-hero__description">
            Calculate initial or final gas pressure and
            temperature using P₁/T₁ = P₂/T₂, with
            automatic pressure and temperature unit
            conversion.
          </p>

          <nav aria-label="Breadcrumb">
            <ol className="breadcrumb-list">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/calculators">Calculators</Link>
              </li>
              <li aria-current="page">
                Gay-Lussac&apos;s Law Calculator
              </li>
            </ol>
          </nav>
        </Container>
      </section>

      <section
        className="calculator-section"
        aria-label="Gay-Lussac's law calculator"
      >
        <Container>
          <GayLussacsLawCalculator />
        </Container>
      </section>

      <section className="article-section">
        <Container className="article-layout">
          <article className="article-content">
            <section aria-labelledby="overview-heading">
              <p className="eyebrow">Gas-law guide</p>

              <h2 id="overview-heading">
                What is Gay-Lussac&apos;s law?
              </h2>

              <p>
                Gay-Lussac&apos;s law describes how the
                pressure of a fixed amount of gas changes
                with absolute temperature when volume
                remains constant. Heating the gas raises
                its pressure, while cooling lowers it.
              </p>

              <p>
                Pressure and absolute temperature are
                directly proportional. Doubling the
                Kelvin temperature doubles the pressure
                under the required conditions.
              </p>
            </section>

            <section aria-labelledby="formula-heading">
              <p className="eyebrow">Core equation</p>

              <h2 id="formula-heading">
                Gay-Lussac&apos;s law formula
              </h2>

              <div className="formula-block">
                <strong>P₁/T₁ = P₂/T₂</strong>
              </div>

              <ul className="article-list">
                <li>P₁ is the initial gas pressure.</li>
                <li>T₁ is the initial absolute temperature.</li>
                <li>P₂ is the final gas pressure.</li>
                <li>T₂ is the final absolute temperature.</li>
              </ul>

              <p>
                Celsius and Fahrenheit inputs are
                converted to Kelvin before the
                pressure-temperature ratio is evaluated.
              </p>
            </section>

            <section aria-labelledby="rearranged-heading">
              <p className="eyebrow">Solve any variable</p>

              <h2 id="rearranged-heading">
                Rearranged Gay-Lussac&apos;s law equations
              </h2>

              <ul className="article-list">
                <li>
                  Final pressure:{" "}
                  <strong>P₂ = P₁ × T₂ ÷ T₁</strong>
                </li>
                <li>
                  Initial pressure:{" "}
                  <strong>P₁ = P₂ × T₁ ÷ T₂</strong>
                </li>
                <li>
                  Final temperature:{" "}
                  <strong>T₂ = T₁ × P₂ ÷ P₁</strong>
                </li>
                <li>
                  Initial temperature:{" "}
                  <strong>T₁ = T₂ × P₁ ÷ P₂</strong>
                </li>
              </ul>

              <p>
                Select the unknown variable, enter the
                remaining values, and choose the required
                pressure and temperature units.
              </p>
            </section>

            <section aria-labelledby="example-heading">
              <p className="eyebrow">Worked example</p>

              <h2 id="example-heading">
                Calculate gas pressure after heating
              </h2>

              <p>
                A sealed rigid container holds gas at
                1 atm and 300 K. The gas is heated to
                450 K. Find the final pressure.
              </p>

              <ol className="calculation-steps">
                <li>
                  Write the equation:{" "}
                  <strong>P₁/T₁ = P₂/T₂</strong>.
                </li>
                <li>
                  Rearrange it:{" "}
                  <strong>P₂ = P₁ × T₂ ÷ T₁</strong>.
                </li>
                <li>
                  Substitute values:{" "}
                  <strong>
                    P₂ = 1 atm × 450 K ÷ 300 K
                  </strong>.
                </li>
                <li>
                  Calculate the result:{" "}
                  <strong>P₂ = 1.5 atm</strong>.
                </li>
              </ol>

              <p>
                The Kelvin temperature increases by a
                factor of 1.5, so pressure also increases
                by a factor of 1.5.
              </p>
            </section>

            <section aria-labelledby="units-heading">
              <p className="eyebrow">Supported units</p>

              <h2 id="units-heading">
                Pressure and temperature units
              </h2>

              <ul className="article-list">
                <li>
                  Pressure: pascals, kilopascals, bar,
                  atmospheres, and millimeters of mercury.
                </li>
                <li>
                  Temperature: Kelvin, Celsius, and
                  Fahrenheit.
                </li>
                <li>
                  Mixed pressure units are converted
                  internally before solving.
                </li>
                <li>
                  The result uses the selected output unit.
                </li>
              </ul>
            </section>

            <section aria-labelledby="conditions-heading">
              <p className="eyebrow">Required conditions</p>

              <h2 id="conditions-heading">
                When Gay-Lussac&apos;s law applies
              </h2>

              <ul className="article-list">
                <li>Gas volume remains constant.</li>
                <li>The amount of gas remains fixed.</li>
                <li>The container is sealed and rigid.</li>
                <li>
                  Temperature is interpreted on an
                  absolute scale.
                </li>
                <li>
                  The gas behaves approximately as an
                  ideal gas.
                </li>
              </ul>
            </section>

            <section aria-labelledby="graph-heading">
              <p className="eyebrow">Direct relationship</p>

              <h2 id="graph-heading">
                Understanding the pressure-temperature graph
              </h2>

              <p>
                A graph of gas pressure against Kelvin
                temperature forms a straight line when
                volume and the amount of gas remain
                constant.
              </p>

              <p>
                This linear relationship means equal
                proportional changes in absolute
                temperature produce equal proportional
                changes in pressure.
              </p>
            </section>

            <section aria-labelledby="limitations-heading">
              <p className="eyebrow">Calculation limits</p>

              <h2 id="limitations-heading">
                Important limitations and mistakes
              </h2>

              <ul className="article-list">
                <li>
                  Never substitute Celsius or Fahrenheit
                  directly into the temperature ratio.
                </li>
                <li>
                  Do not apply the law if container volume
                  changes significantly.
                </li>
                <li>Pressure values must exceed zero.</li>
                <li>
                  Temperatures must remain above absolute
                  zero.
                </li>
                <li>
                  Real gases can depart from ideal
                  behavior at high pressure or near
                  condensation.
                </li>
              </ul>
            </section>

            <section aria-labelledby="related-heading">
              <p className="eyebrow">Related tools</p>

              <h2 id="related-heading">
                Continue your gas-law calculations
              </h2>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/boyles-law-calculator"
                >
                  Boyle&apos;s Law Calculator
                </Link>{" "}
                when pressure and volume change at
                constant temperature.
              </p>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/charles-law-calculator"
                >
                  Charles&apos;s Law Calculator
                </Link>{" "}
                when volume and temperature change at
                constant pressure.
              </p>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/ideal-gas-law-calculator"
                >
                  Ideal Gas Law Calculator
                </Link>{" "}
                when pressure, volume, moles, and
                temperature are involved.
              </p>
            </section>

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">
                Questions and answers
              </p>

              <h2 id="faq-heading">
                Gay-Lussac&apos;s law calculator FAQ
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

              <h2>Gay-Lussac&apos;s law checklist</h2>

              <ul>
                <li>Select the unknown variable</li>
                <li>Enter the other three values</li>
                <li>Choose pressure and temperature units</li>
                <li>Keep gas volume constant</li>
                <li>Apply P₁/T₁ = P₂/T₂</li>
              </ul>
            </div>

            <div className="sidebar-card">
              <p className="sidebar-card__label">
                Related calculator
              </p>

              <h2>Use the ideal gas law</h2>

              <p>
                Include volume and moles in your gas
                calculation.
              </p>

              <Link href="/calculators/ideal-gas-law-calculator">
                Open Ideal Gas Law Calculator
              </Link>
            </div>
          </aside>
        </Container>

        <Container>
          <CalculatorTrustPanel subject="chemistry" />
        </Container>
      </section>
    

      <RelatedCalculators
        calculators={relatedCalculators}
      />
</main>
  );
}
