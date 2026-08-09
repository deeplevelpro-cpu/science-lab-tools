import type { Metadata } from "next";
import Link from "next/link";

import { CalculatorTrustPanel } from "@/components/calculator-trust";
import { CharlesLawCalculator } from "@/components/calculators/charles-law-calculator";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";

export const metadata: Metadata = {
  title: "Charles's Law Calculator | Volume & Temperature",
  description:
    "Calculate initial or final gas volume and temperature with Charles's law, V₁/T₁ = V₂/T₂. Supports Kelvin, Celsius, Fahrenheit, liters, milliliters, and cubic meters.",
  alternates: {
    canonical: "/calculators/charles-law-calculator",
  },
  openGraph: {
    title: "Charles's Law Calculator",
    description:
      "Solve gas volume and temperature problems using V₁/T₁ = V₂/T₂ with automatic unit conversion.",
    url: absoluteUrl("/calculators/charles-law-calculator"),
    siteName: siteConfig.name,
    type: "website",
  },
};

const faqItems = [
  {
    question: "What is Charles's law?",
    answer:
      "Charles's law states that the volume of a fixed amount of gas is directly proportional to its absolute temperature when pressure remains constant.",
  },
  {
    question: "What formula does the calculator use?",
    answer:
      "The calculator uses V₁/T₁ = V₂/T₂, where V is gas volume and T is absolute temperature measured in Kelvin.",
  },
  {
    question: "Must temperature be entered in Kelvin?",
    answer:
      "The equation requires absolute temperature. You may enter Kelvin, Celsius, or Fahrenheit because the calculator converts temperatures to Kelvin before solving.",
  },
  {
    question: "Can Charles's law use Celsius directly?",
    answer:
      "No. Celsius values must first be converted to Kelvin. Using Celsius directly in the ratio produces an incorrect result.",
  },
  {
    question: "When does Charles's law apply?",
    answer:
      "It applies when the gas pressure and amount of gas remain constant and the gas behaves approximately as an ideal gas.",
  },
  {
    question: "Why does gas volume increase when heated?",
    answer:
      "At constant pressure, faster-moving heated gas particles require more space, so the gas expands as its absolute temperature rises.",
  },
];

const webApplicationJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Charles's Law Calculator",
  url: absoluteUrl("/calculators/charles-law-calculator"),
  description:
    "Calculate initial or final gas volume and temperature using Charles's law.",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any",
  browserRequirements: "Requires JavaScript",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

const faqJsonLd = {
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
      name: "Charles's Law Calculator",
      item: absoluteUrl("/calculators/charles-law-calculator"),
    },
  ],
};

export default function CharlesLawCalculatorPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webApplicationJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <section className="tool-page-hero">
        <Container>
          <p className="eyebrow">Chemistry calculator</p>

          <h1>Charles&apos;s Law Calculator</h1>

          <p className="tool-page-hero__description">
            Calculate initial or final gas volume and
            temperature using V₁/T₁ = V₂/T₂, with
            automatic volume and temperature unit
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
                Charles&apos;s Law Calculator
              </li>
            </ol>
          </nav>
        </Container>
      </section>

      <section
        className="calculator-section"
        aria-label="Charles's law calculator"
      >
        <Container>
          <CharlesLawCalculator />
        </Container>
      </section>

      <section className="article-section">
        <Container className="article-layout">
          <article className="article-content">
            <section aria-labelledby="overview-heading">
              <p className="eyebrow">Gas-law guide</p>

              <h2 id="overview-heading">
                What is Charles&apos;s law?
              </h2>

              <p>
                Charles&apos;s law describes how the
                volume of a fixed amount of gas changes
                with its absolute temperature when
                pressure remains constant. As the gas
                becomes hotter, its volume increases. As
                it cools, its volume decreases.
              </p>

              <p>
                Volume and absolute temperature are
                directly proportional. Doubling the
                Kelvin temperature doubles the gas
                volume under the required conditions.
              </p>
            </section>

            <section aria-labelledby="formula-heading">
              <p className="eyebrow">Core equation</p>

              <h2 id="formula-heading">
                Charles&apos;s law formula
              </h2>

              <div className="formula-block">
                <strong>V₁/T₁ = V₂/T₂</strong>
              </div>

              <ul className="article-list">
                <li>V₁ is the initial gas volume.</li>
                <li>
                  T₁ is the initial absolute temperature.
                </li>
                <li>V₂ is the final gas volume.</li>
                <li>
                  T₂ is the final absolute temperature.
                </li>
              </ul>

              <p>
                Temperatures must represent an absolute
                scale. The calculator converts Celsius
                and Fahrenheit inputs to Kelvin before
                applying the equation.
              </p>
            </section>

            <section aria-labelledby="rearranged-heading">
              <p className="eyebrow">Solve any variable</p>

              <h2 id="rearranged-heading">
                Rearranged Charles&apos;s law equations
              </h2>

              <ul className="article-list">
                <li>
                  Final volume:{" "}
                  <strong>V₂ = V₁ × T₂ ÷ T₁</strong>
                </li>
                <li>
                  Initial volume:{" "}
                  <strong>V₁ = V₂ × T₁ ÷ T₂</strong>
                </li>
                <li>
                  Final temperature:{" "}
                  <strong>T₂ = T₁ × V₂ ÷ V₁</strong>
                </li>
                <li>
                  Initial temperature:{" "}
                  <strong>T₁ = T₂ × V₁ ÷ V₂</strong>
                </li>
              </ul>

              <p>
                Select the unknown variable, enter the
                remaining three values, and choose the
                required output unit. The calculator
                performs the rearrangement and unit
                conversion automatically.
              </p>
            </section>

            <section aria-labelledby="example-heading">
              <p className="eyebrow">Worked example</p>

              <h2 id="example-heading">
                Calculate gas volume after heating
              </h2>

              <p>
                A gas occupies 2 L at 300 K. It is heated
                to 450 K while pressure remains constant.
                Find the final volume.
              </p>

              <ol className="calculation-steps">
                <li>
                  Write the equation:{" "}
                  <strong>V₁/T₁ = V₂/T₂</strong>.
                </li>
                <li>
                  Rearrange it:{" "}
                  <strong>V₂ = V₁ × T₂ ÷ T₁</strong>.
                </li>
                <li>
                  Substitute values:{" "}
                  <strong>
                    V₂ = 2 L × 450 K ÷ 300 K
                  </strong>.
                </li>
                <li>
                  Calculate the result:{" "}
                  <strong>V₂ = 3 L</strong>.
                </li>
              </ol>

              <p>
                The Kelvin temperature increases by a
                factor of 1.5, so the volume also
                increases by a factor of 1.5.
              </p>
            </section>

            <section aria-labelledby="units-heading">
              <p className="eyebrow">Supported units</p>

              <h2 id="units-heading">
                Volume and temperature units
              </h2>

              <ul className="article-list">
                <li>
                  Volume: cubic meters, liters, and
                  milliliters.
                </li>
                <li>
                  Temperature: Kelvin, Celsius, and
                  Fahrenheit.
                </li>
                <li>
                  The calculated result uses the selected
                  output unit.
                </li>
                <li>
                  Mixed input units are converted before
                  the equation is solved.
                </li>
              </ul>
            </section>

            <section aria-labelledby="conditions-heading">
              <p className="eyebrow">
                Required conditions
              </p>

              <h2 id="conditions-heading">
                When Charles&apos;s law applies
              </h2>

              <ul className="article-list">
                <li>Gas pressure remains constant.</li>
                <li>The amount of gas remains fixed.</li>
                <li>No gas enters or leaves the system.</li>
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
              <p className="eyebrow">
                Direct relationship
              </p>

              <h2 id="graph-heading">
                Understanding the volume-temperature graph
              </h2>

              <p>
                A graph of gas volume against Kelvin
                temperature forms a straight line when
                pressure and the amount of gas remain
                constant. This linear pattern shows that
                volume is directly proportional to
                absolute temperature.
              </p>

              <p>
                Extrapolating the ideal line toward zero
                volume points to absolute zero, although
                real gases usually liquefy before that
                theoretical limit is reached.
              </p>
            </section>

            <section aria-labelledby="limitations-heading">
              <p className="eyebrow">
                Calculation limits
              </p>

              <h2 id="limitations-heading">
                Important limitations and mistakes
              </h2>

              <ul className="article-list">
                <li>
                  Never substitute Celsius or Fahrenheit
                  directly into the temperature ratio.
                </li>
                <li>
                  Do not use Charles&apos;s law when gas
                  pressure changes significantly.
                </li>
                <li>
                  Volume values must be greater than zero.
                </li>
                <li>
                  Temperatures must be above absolute
                  zero.
                </li>
                <li>
                  Real gases may depart from ideal
                  behavior near condensation or at high
                  pressure.
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
                  href="/calculators/ideal-gas-law-calculator"
                >
                  Ideal Gas Law Calculator
                </Link>{" "}
                when pressure, volume, moles, and
                temperature are involved.
              </p>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/avogadros-law-calculator"
                >
                  Avogadro&apos;s Law Calculator
                </Link>{" "}
                when gas volume changes with the amount of
                gas at constant temperature and pressure.
              </p>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/temperature-converter"
                >
                  Temperature Converter
                </Link>{" "}
                for standalone temperature conversions.
              </p>
            </section>

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">
                Questions and answers
              </p>

              <h2 id="faq-heading">
                Charles&apos;s law calculator FAQ
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

              <h2>Charles&apos;s law checklist</h2>

              <ul>
                <li>Select the unknown variable</li>
                <li>Enter the other three values</li>
                <li>Choose volume and temperature units</li>
                <li>Keep pressure constant</li>
                <li>Apply V₁/T₁ = V₂/T₂</li>
              </ul>
            </div>

            <div className="sidebar-card">
              <p className="sidebar-card__label">
                Related calculator
              </p>

              <h2>Use the ideal gas law</h2>

              <p>
                Include pressure and moles in your gas
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
    </main>
  );
}
