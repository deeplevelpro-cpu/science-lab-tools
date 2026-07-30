import type { Metadata } from "next";
import Link from "next/link";

import { CalculatorTrustPanel } from "@/components/calculator-trust";
import { AvogadrosLawCalculator } from "@/components/calculators/avogadros-law-calculator";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";

export const metadata: Metadata = {
  title: "Avogadro's Law Calculator | Volume & Moles",
  description:
    "Calculate gas volume or amount with Avogadro's law, V₁/n₁ = V₂/n₂. Convert liters, milliliters, cubic meters, moles, and millimoles automatically.",
  alternates: {
    canonical: "/calculators/avogadros-law-calculator",
  },
  openGraph: {
    title: "Avogadro's Law Calculator",
    description:
      "Solve gas volume and amount problems using V₁/n₁ = V₂/n₂ with automatic unit conversion.",
    url: absoluteUrl(
      "/calculators/avogadros-law-calculator",
    ),
    siteName: siteConfig.name,
    type: "website",
  },
};

const faqItems = [
  {
    question: "What is Avogadro's law?",
    answer:
      "Avogadro's law states that equal volumes of gases at the same temperature and pressure contain equal numbers of particles. For a changing gas sample at constant temperature and pressure, volume is directly proportional to the amount of gas.",
  },
  {
    question: "What formula does the calculator use?",
    answer:
      "The calculator uses V₁/n₁ = V₂/n₂, where V represents gas volume and n represents the amount of gas in moles.",
  },
  {
    question: "What conditions must remain constant?",
    answer:
      "Temperature and pressure must remain constant while the amount and volume of gas change.",
  },
  {
    question: "Can the calculator use millimoles?",
    answer:
      "Yes. You can use moles or millimoles for either gas amount. The calculator converts the inputs to moles before solving.",
  },
  {
    question: "Can different volume units be mixed?",
    answer:
      "Yes. Cubic meters, liters, and milliliters can be mixed because the calculator converts all volume values before applying the equation.",
  },
  {
    question: "What happens when the amount of gas doubles?",
    answer:
      "At constant temperature and pressure, doubling the amount of gas doubles its volume because volume and amount are directly proportional.",
  },
];

const webApplicationJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Avogadro's Law Calculator",
  url: absoluteUrl(
    "/calculators/avogadros-law-calculator",
  ),
  description:
    "Calculate gas volume or amount using Avogadro's law with automatic unit conversion.",
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
      name: "Avogadro's Law Calculator",
      item: absoluteUrl(
        "/calculators/avogadros-law-calculator",
      ),
    },
  ],
};

export default function AvogadrosLawCalculatorPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webApplicationJsonLd),
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

          <h1>Avogadro&apos;s Law Calculator</h1>

          <p className="tool-page-hero__description">
            Calculate initial or final gas volume and
            amount using V₁/n₁ = V₂/n₂, with automatic
            volume and mole unit conversion.
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
                Avogadro&apos;s Law Calculator
              </li>
            </ol>
          </nav>
        </Container>
      </section>

      <section
        className="calculator-section"
        aria-label="Avogadro's law calculator"
      >
        <Container>
          <AvogadrosLawCalculator />
        </Container>
      </section>

      <section className="article-section">
        <Container className="article-layout">
          <article className="article-content">
            <section aria-labelledby="overview-heading">
              <p className="eyebrow">Gas-law guide</p>

              <h2 id="overview-heading">
                What is Avogadro&apos;s law?
              </h2>

              <p>
                Avogadro&apos;s law describes the direct
                relationship between a gas&apos;s volume
                and the amount of gas present when
                temperature and pressure remain constant.
                Adding more gas increases the volume,
                while removing gas decreases it.
              </p>

              <p>
                Equal volumes of gases at the same
                temperature and pressure contain equal
                numbers of particles. Therefore, a
                sample&apos;s volume-to-mole ratio remains
                constant under these conditions.
              </p>
            </section>

            <section aria-labelledby="formula-heading">
              <p className="eyebrow">Core equation</p>

              <h2 id="formula-heading">
                Avogadro&apos;s law formula
              </h2>

              <div className="formula-block">
                <strong>V₁/n₁ = V₂/n₂</strong>
              </div>

              <ul className="article-list">
                <li>V₁ is the initial gas volume.</li>
                <li>n₁ is the initial amount of gas.</li>
                <li>V₂ is the final gas volume.</li>
                <li>n₂ is the final amount of gas.</li>
              </ul>

              <p>
                The symbol n represents the amount of
                substance, normally measured in moles.
                Volume and amount units may differ because
                the calculator converts them before
                solving the equation.
              </p>
            </section>

            <section aria-labelledby="rearranged-heading">
              <p className="eyebrow">Solve any variable</p>

              <h2 id="rearranged-heading">
                Rearranged Avogadro&apos;s law equations
              </h2>

              <ul className="article-list">
                <li>
                  Final volume:{" "}
                  <strong>V₂ = V₁ × n₂ ÷ n₁</strong>
                </li>
                <li>
                  Initial volume:{" "}
                  <strong>V₁ = V₂ × n₁ ÷ n₂</strong>
                </li>
                <li>
                  Final amount:{" "}
                  <strong>n₂ = n₁ × V₂ ÷ V₁</strong>
                </li>
                <li>
                  Initial amount:{" "}
                  <strong>n₁ = V₁ × n₂ ÷ V₂</strong>
                </li>
              </ul>

              <p>
                Select the unknown variable and enter the
                other three values. The tool rearranges
                the equation, converts the units, and
                returns the result in your selected unit.
              </p>
            </section>

            <section aria-labelledby="example-heading">
              <p className="eyebrow">Worked example</p>

              <h2 id="example-heading">
                Calculate volume after adding gas
              </h2>

              <p>
                A gas occupies 2 L when the sample
                contains 1 mol. Find the new volume when
                the amount increases to 2.5 mol at
                constant temperature and pressure.
              </p>

              <ol className="calculation-steps">
                <li>
                  Write the equation:{" "}
                  <strong>V₁/n₁ = V₂/n₂</strong>.
                </li>
                <li>
                  Rearrange it:{" "}
                  <strong>V₂ = V₁ × n₂ ÷ n₁</strong>.
                </li>
                <li>
                  Substitute values:{" "}
                  <strong>
                    V₂ = 2 L × 2.5 mol ÷ 1 mol
                  </strong>.
                </li>
                <li>
                  Calculate the result:{" "}
                  <strong>V₂ = 5 L</strong>.
                </li>
              </ol>

              <p>
                The amount of gas increases by a factor
                of 2.5, so its volume also increases by
                a factor of 2.5.
              </p>
            </section>

            <section aria-labelledby="units-heading">
              <p className="eyebrow">Supported units</p>

              <h2 id="units-heading">
                Volume and amount units
              </h2>

              <ul className="article-list">
                <li>
                  Volume: cubic meters, liters, and
                  milliliters.
                </li>
                <li>
                  Amount of gas: moles and millimoles.
                </li>
                <li>
                  Mixed input units are converted before
                  the equation is solved.
                </li>
                <li>
                  The answer uses the selected unit for
                  the unknown variable.
                </li>
              </ul>
            </section>

            <section aria-labelledby="conditions-heading">
              <p className="eyebrow">
                Required conditions
              </p>

              <h2 id="conditions-heading">
                When Avogadro&apos;s law applies
              </h2>

              <ul className="article-list">
                <li>Gas temperature remains constant.</li>
                <li>Gas pressure remains constant.</li>
                <li>
                  The container can change volume as the
                  amount of gas changes.
                </li>
                <li>
                  The gas behaves approximately as an
                  ideal gas.
                </li>
                <li>
                  Volume and gas amount are greater than
                  zero.
                </li>
              </ul>
            </section>

            <section aria-labelledby="relationship-heading">
              <p className="eyebrow">
                Direct proportionality
              </p>

              <h2 id="relationship-heading">
                Volume and mole relationship
              </h2>

              <p>
                A graph of volume against the amount of
                gas in moles forms a straight line at
                constant temperature and pressure. This
                pattern shows that V is directly
                proportional to n.
              </p>

              <p>
                If the number of moles doubles, volume
                doubles. If the amount falls by half,
                volume also falls by half, provided the
                required conditions do not change.
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
                  Do not apply the equation when
                  temperature changes significantly.
                </li>
                <li>
                  Do not apply it when pressure changes.
                </li>
                <li>
                  Keep units consistent or use the
                  calculator&apos;s unit conversion.
                </li>
                <li>
                  Never enter zero or negative volume or
                  amount values.
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
                Continue your gas calculations
              </h2>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/ideal-gas-law-calculator"
                >
                  Ideal Gas Law Calculator
                </Link>{" "}
                when pressure, volume, moles, and
                temperature are all involved.
              </p>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/charles-law-calculator"
                >
                  Charles&apos;s Law Calculator
                </Link>{" "}
                when volume changes with temperature at
                constant pressure.
              </p>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/combined-gas-law-calculator"
                >
                  Combined Gas Law Calculator
                </Link>{" "}
                when pressure, volume, and temperature
                change between two gas states.
              </p>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/molarity-calculator"
                >
                  Molarity Calculator
                </Link>{" "}
                for solution concentration calculations.
              </p>
            </section>

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">
                Questions and answers
              </p>

              <h2 id="faq-heading">
                Avogadro&apos;s law calculator FAQ
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

              <h2>Avogadro&apos;s law checklist</h2>

              <ul>
                <li>Select the unknown variable</li>
                <li>Enter the other three values</li>
                <li>Choose volume and amount units</li>
                <li>Keep temperature constant</li>
                <li>Keep pressure constant</li>
                <li>Apply V₁/n₁ = V₂/n₂</li>
              </ul>
            </div>

            <div className="sidebar-card">
              <p className="sidebar-card__label">
                Related calculator
              </p>

              <h2>Use the ideal gas law</h2>

              <p>
                Include pressure and temperature in your
                gas calculation.
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
