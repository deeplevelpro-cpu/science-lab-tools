import type { Metadata } from "next";
import Link from "next/link";

import {
  IdealGasLawCalculator,
} from "@/components/calculators/ideal-gas-law-calculator";
import { CalculatorTrustPanel } from "@/components/calculator-trust";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";

const pagePath =
  "/calculators/ideal-gas-law-calculator";

const pageTitle = "Ideal Gas Law Calculator";

const pageDescription =
  "Calculate pressure, volume, moles, or temperature using PV = nRT. Supports common pressure, volume, and temperature units with formulas and examples.";

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
      "What formula does the ideal gas law calculator use?",
    answer:
      "The calculator uses PV = nRT, where P is pressure, V is volume, n is the amount of gas in moles, R is the universal gas constant, and T is absolute temperature.",
  },
  {
    question:
      "Which gas constant does the calculator use?",
    answer:
      "The calculator converts inputs to SI units and uses R = 8.31446261815324 joules per mole-kelvin.",
  },
  {
    question:
      "Can I enter temperature in Celsius or Fahrenheit?",
    answer:
      "Yes. The calculator accepts kelvin, degrees Celsius, and degrees Fahrenheit, then converts the temperature to kelvin internally.",
  },
  {
    question:
      "Can the ideal gas law solve for pressure or volume?",
    answer:
      "Yes. It can calculate pressure, volume, amount in moles, or temperature when the other three values are known.",
  },
  {
    question:
      "When is the ideal gas law inaccurate?",
    answer:
      "The ideal gas law becomes less accurate for real gases at very high pressures, very low temperatures, or near condensation, where intermolecular forces and molecular volume matter.",
  },
] as const;

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

const breadcrumbSchema = {
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
      name: pageTitle,
      item: absoluteUrl(pagePath),
    },
  ],
};

export default function IdealGasLawCalculatorPage() {
  return (
    <main>
      {[
        webApplicationSchema,
        faqSchema,
        breadcrumbSchema,
      ].map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(
              /</g,
              "\\u003c",
            ),
          }}
        />
      ))}

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
                Ideal Gas Law Calculator
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">
              Chemistry gas-law calculator
            </p>

            <h1>Ideal Gas Law Calculator</h1>

            <p>
              Calculate pressure, volume, moles, or
              temperature using PV = nRT with automatic
              unit conversion.
            </p>
          </div>
        </Container>
      </section>

      <section
        className="tool-section"
        aria-label="Ideal gas law calculator"
      >
        <Container>
          <IdealGasLawCalculator />
        </Container>
      </section>

      <section className="article-section">
        <Container className="article-layout">
          <article className="article-content">
            <section aria-labelledby="overview-heading">
              <p className="eyebrow">
                Chemistry overview
              </p>

              <h2 id="overview-heading">
                What is the ideal gas law?
              </h2>

              <p>
                The ideal gas law describes the
                relationship between the pressure,
                volume, amount, and absolute temperature
                of an ideal gas. It combines several
                simpler gas laws into one equation:
                PV = nRT.
              </p>

              <p>
                The equation is widely used in chemistry
                and physics to estimate the behavior of
                gases when three of the four main
                variables are known.
              </p>
            </section>

            <section aria-labelledby="formula-heading">
              <p className="eyebrow">Formula</p>

              <h2 id="formula-heading">
                Ideal gas law formula
              </h2>

              <div className="formula-card">
                <p>
                  Ideal gas law
                  <span>PV = nRT</span>
                </p>
              </div>

              <ul className="article-list">
                <li>
                  <strong>P</strong> is the pressure of
                  the gas.
                </li>
                <li>
                  <strong>V</strong> is the volume
                  occupied by the gas.
                </li>
                <li>
                  <strong>n</strong> is the amount of
                  gas in moles.
                </li>
                <li>
                  <strong>R</strong> is the universal
                  gas constant.
                </li>
                <li>
                  <strong>T</strong> is absolute
                  temperature in kelvin.
                </li>
              </ul>
            </section>

            <section aria-labelledby="rearranged-heading">
              <p className="eyebrow">
                Rearranged equations
              </p>

              <h2 id="rearranged-heading">
                Solve for any gas variable
              </h2>

              <div className="comparison-grid">
                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Pressure
                  </p>
                  <h3>P = nRT ÷ V</h3>
                  <p>
                    Divide nRT by the gas volume.
                  </p>
                </article>

                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Volume
                  </p>
                  <h3>V = nRT ÷ P</h3>
                  <p>
                    Divide nRT by the gas pressure.
                  </p>
                </article>

                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Moles
                  </p>
                  <h3>n = PV ÷ RT</h3>
                  <p>
                    Divide pressure times volume by RT.
                  </p>
                </article>

                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Temperature
                  </p>
                  <h3>T = PV ÷ nR</h3>
                  <p>
                    Divide pressure times volume by nR.
                  </p>
                </article>
              </div>
            </section>

            <section aria-labelledby="example-heading">
              <p className="eyebrow">
                Worked example
              </p>

              <h2 id="example-heading">
                Find the volume of one mole at 25°C
              </h2>

              <p>
                Suppose one mole of an ideal gas is at
                1 atmosphere and 25°C. Calculate its
                volume using V = nRT ÷ P.
              </p>

              <ol className="calculation-steps">
                <li>
                  Convert the temperature:{" "}
                  <strong>
                    25°C = 298.15 K
                  </strong>.
                </li>
                <li>
                  Convert pressure to SI units:{" "}
                  <strong>
                    1 atm = 101,325 Pa
                  </strong>.
                </li>
                <li>
                  Substitute the values into{" "}
                  <strong>V = nRT ÷ P</strong>.
                </li>
                <li>
                  Calculate the volume:{" "}
                  <strong>
                    V ≈ 0.02447 m³
                  </strong>.
                </li>
                <li>
                  Convert cubic meters to liters:{" "}
                  <strong>V ≈ 24.47 L</strong>.
                </li>
              </ol>
            </section>

            <section aria-labelledby="units-heading">
              <p className="eyebrow">
                Supported units
              </p>

              <h2 id="units-heading">
                Pressure, volume, and temperature units
              </h2>

              <p>
                This calculator automatically converts
                common laboratory units to SI units
                before applying the equation.
              </p>

              <ul className="article-list">
                <li>
                  Pressure: pascals, kilopascals, bar,
                  atmospheres, and millimeters of
                  mercury.
                </li>
                <li>
                  Volume: cubic meters, liters, and
                  milliliters.
                </li>
                <li>
                  Temperature: kelvin, degrees Celsius,
                  and degrees Fahrenheit.
                </li>
                <li>
                  Amount of gas: moles.
                </li>
              </ul>
            </section>

            <section aria-labelledby="constant-heading">
              <p className="eyebrow">
                Gas constant
              </p>

              <h2 id="constant-heading">
                Why the value of R depends on units
              </h2>

              <p>
                The universal gas constant can be
                written in different numerical forms
                depending on the selected pressure and
                volume units. For example, it is often
                shown as approximately 8.314 J/(mol·K)
                in SI calculations or 0.082057
                L·atm/(mol·K) in laboratory problems.
              </p>

              <p>
                This tool avoids mixing incompatible
                versions of R by converting all values
                internally and using the SI gas
                constant.
              </p>
            </section>

            <section aria-labelledby="assumptions-heading">
              <p className="eyebrow">
                Model assumptions
              </p>

              <h2 id="assumptions-heading">
                When the ideal gas law works best
              </h2>

              <ul className="article-list">
                <li>
                  Gas particles are treated as having
                  negligible individual volume.
                </li>
                <li>
                  Intermolecular attractions and
                  repulsions are assumed to be
                  negligible.
                </li>
                <li>
                  Particle collisions are treated as
                  perfectly elastic.
                </li>
                <li>
                  The model usually works best at
                  relatively low pressure and high
                  temperature.
                </li>
              </ul>
            </section>

            <section aria-labelledby="limitations-heading">
              <p className="eyebrow">
                Calculation limits
              </p>

              <h2 id="limitations-heading">
                Important limitations
              </h2>

              <p>
                Real gases can depart from ideal
                behavior at high pressures, low
                temperatures, or near a phase change.
                More advanced equations, such as the
                van der Waals equation, may be required
                under those conditions.
              </p>

              <ul className="article-list">
                <li>
                  Pressure, volume, and moles must be
                  greater than zero.
                </li>
                <li>
                  Temperature must be above absolute
                  zero.
                </li>
                <li>
                  Units must describe the physical
                  quantities shown.
                </li>
                <li>
                  Results are estimates based on ideal
                  gas behavior.
                </li>
              </ul>
            </section>

            <section aria-labelledby="related-heading">
              <p className="eyebrow">
                Related tools
              </p>

              <h2 id="related-heading">
                Continue your chemistry calculations
              </h2>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/pressure-calculator"
                >
                  Pressure Calculator
                </Link>{" "}
                for force-per-area calculations.
              </p>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/molarity-calculator"
                >
                  Molarity Calculator
                </Link>{" "}
                to calculate concentration from moles
                and solution volume.
              </p>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/stoichiometry-calculator"
                >
                  Stoichiometry Calculator
                </Link>{" "}
                for mole-ratio calculations in balanced
                chemical reactions.
              </p>
            </section>

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">
                Questions and answers
              </p>

              <h2 id="faq-heading">
                Ideal gas law calculator FAQ
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

              <h2>Ideal gas checklist</h2>

              <ul>
                <li>Select the variable to calculate</li>
                <li>Enter the other three values</li>
                <li>Choose the correct units</li>
                <li>Keep temperature above absolute zero</li>
                <li>Apply PV = nRT</li>
              </ul>
            </div>

            <div className="sidebar-card">
              <p className="sidebar-card__label">
                Related calculator
              </p>

              <h2>Calculate molarity</h2>

              <p>
                Find concentration from moles and
                solution volume.
              </p>

              <Link href="/calculators/molarity-calculator">
                Open Molarity Calculator
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
