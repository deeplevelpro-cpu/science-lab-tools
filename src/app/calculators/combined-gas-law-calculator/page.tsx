import type { Metadata } from "next";
import Link from "next/link";

import { CalculatorTrustPanel } from "@/components/calculator-trust";
import { CombinedGasLawCalculator } from "@/components/calculators/combined-gas-law-calculator";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";

const pagePath =
  "/calculators/combined-gas-law-calculator";

const pageTitle =
  "Combined Gas Law Calculator | P₁V₁/T₁ = P₂V₂/T₂";

const pageDescription =
  "Calculate pressure, volume, or temperature using the combined gas law. Solve P₁V₁/T₁ = P₂V₂/T₂ with automatic unit conversion and worked examples.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: pagePath,
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: absoluteUrl(pagePath),
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const faqItems = [
  {
    question: "What is the combined gas law?",
    answer:
      "The combined gas law relates the pressure, volume, and absolute temperature of a fixed amount of gas between two states using P₁V₁/T₁ = P₂V₂/T₂.",
  },
  {
    question:
      "What variables can this combined gas law calculator solve?",
    answer:
      "It can calculate initial or final pressure, volume, or temperature when the other five values are known.",
  },
  {
    question:
      "Must temperature be converted to Kelvin?",
    answer:
      "The equation requires absolute temperature. This calculator accepts Kelvin, Celsius, or Fahrenheit and converts temperature to Kelvin internally.",
  },
  {
    question:
      "Can different pressure and volume units be mixed?",
    answer:
      "Yes. Pressure and volume inputs may use different supported units because the calculator converts them to consistent SI units before solving.",
  },
  {
    question: "When does the combined gas law apply?",
    answer:
      "It applies to a fixed amount of gas when pressure, volume, and temperature change and the gas behaves approximately as an ideal gas.",
  },
  {
    question:
      "Does the combined gas law include Boyle's and Charles's laws?",
    answer:
      "Yes. Boyle's law, Charles's law, and Gay-Lussac's law can be obtained as special cases by holding one variable constant.",
  },
] as const;

const webApplicationJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Combined Gas Law Calculator",
  url: absoluteUrl(pagePath),
  description: pageDescription,
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
      name: "Combined Gas Law Calculator",
      item: absoluteUrl(pagePath),
    },
  ],
};

export default function CombinedGasLawCalculatorPage() {
  return (
    <main>
      {[webApplicationJsonLd, faqJsonLd, breadcrumbJsonLd].map(
        (schema, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(schema),
            }}
          />
        ),
      )}

      <section className="tool-page-hero">
        <Container>
          <p className="eyebrow">Chemistry calculator</p>

          <h1>Combined Gas Law Calculator</h1>

          <p className="tool-page-hero__description">
            Solve for initial or final pressure, volume,
            or temperature using P₁V₁/T₁ = P₂V₂/T₂,
            with automatic unit conversion.
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
                Combined Gas Law Calculator
              </li>
            </ol>
          </nav>
        </Container>
      </section>

      <section
        className="calculator-section"
        aria-label="Combined gas law calculator"
      >
        <Container>
          <CombinedGasLawCalculator />
        </Container>
      </section>

      <section className="article-section">
        <Container className="article-layout">
          <article className="article-content">
            <section aria-labelledby="overview-heading">
              <p className="eyebrow">Gas-law guide</p>
              <h2 id="overview-heading">
                What is the combined gas law?
              </h2>
              <p>
                The combined gas law describes how the
                pressure, volume, and absolute temperature
                of a fixed amount of gas change between
                two states.
              </p>
              <p>
                It combines Boyle&apos;s law,
                Charles&apos;s law, and Gay-Lussac&apos;s
                law into one equation.
              </p>
            </section>

            <section aria-labelledby="formula-heading">
              <p className="eyebrow">Core equation</p>
              <h2 id="formula-heading">
                Combined gas law formula
              </h2>

              <div className="formula-block">
                <strong>P₁V₁/T₁ = P₂V₂/T₂</strong>
              </div>

              <ul className="article-list">
                <li>P₁ and P₂ are initial and final pressure.</li>
                <li>V₁ and V₂ are initial and final volume.</li>
                <li>
                  T₁ and T₂ are initial and final absolute
                  temperature.
                </li>
              </ul>
            </section>

            <section aria-labelledby="equations-heading">
              <p className="eyebrow">Solve any variable</p>
              <h2 id="equations-heading">
                Rearranged combined gas law equations
              </h2>

              <ul className="article-list">
                <li>
                  <strong>P₂ = P₁V₁T₂ ÷ (V₂T₁)</strong>
                </li>
                <li>
                  <strong>V₂ = P₁V₁T₂ ÷ (P₂T₁)</strong>
                </li>
                <li>
                  <strong>T₂ = P₂V₂T₁ ÷ (P₁V₁)</strong>
                </li>
                <li>
                  <strong>P₁ = P₂V₂T₁ ÷ (V₁T₂)</strong>
                </li>
                <li>
                  <strong>V₁ = P₂V₂T₁ ÷ (P₁T₂)</strong>
                </li>
                <li>
                  <strong>T₁ = P₁V₁T₂ ÷ (P₂V₂)</strong>
                </li>
              </ul>
            </section>

            <section aria-labelledby="example-heading">
              <p className="eyebrow">Worked example</p>
              <h2 id="example-heading">
                Calculate final gas volume
              </h2>

              <p>
                A gas starts at 1 atm, 2 L, and 300 K.
                It changes to 0.8 atm and 450 K. Find the
                final volume.
              </p>

              <ol className="calculation-steps">
                <li>
                  Use{" "}
                  <strong>
                    V₂ = P₁V₁T₂ ÷ (P₂T₁)
                  </strong>.
                </li>
                <li>
                  Substitute{" "}
                  <strong>
                    V₂ = 1 × 2 × 450 ÷ (0.8 × 300)
                  </strong>.
                </li>
                <li>
                  Calculate the result:{" "}
                  <strong>V₂ = 3.75 L</strong>.
                </li>
              </ol>
            </section>

            <section aria-labelledby="units-heading">
              <p className="eyebrow">Supported units</p>
              <h2 id="units-heading">
                Pressure, volume, and temperature units
              </h2>

              <ul className="article-list">
                <li>
                  Pressure: Pa, kPa, bar, atm, and mmHg.
                </li>
                <li>Volume: cubic meters, liters, and milliliters.</li>
                <li>Temperature: Kelvin, Celsius, and Fahrenheit.</li>
                <li>
                  The answer is returned in the selected
                  unit for the unknown variable.
                </li>
              </ul>
            </section>

            <section aria-labelledby="conditions-heading">
              <p className="eyebrow">Correct usage</p>
              <h2 id="conditions-heading">
                When to use the combined gas law
              </h2>

              <ul className="article-list">
                <li>The amount of gas remains fixed.</li>
                <li>
                  Pressure, volume, or temperature changes
                  between two states.
                </li>
                <li>
                  Temperatures are interpreted on an
                  absolute scale.
                </li>
                <li>
                  The gas behaves approximately as an
                  ideal gas.
                </li>
              </ul>
            </section>

            <section aria-labelledby="related-heading">
              <p className="eyebrow">Related calculators</p>
              <h2 id="related-heading">
                Explore individual gas laws
              </h2>

              <ul className="article-list">
                <li>
                  <Link href="/calculators/ideal-gas-law-calculator">
                    Ideal Gas Law Calculator
                  </Link>
                </li>
                <li>
                  <Link href="/calculators/boyles-law-calculator">
                    Boyle&apos;s Law Calculator
                  </Link>
                </li>
                <li>
                  <Link href="/calculators/charles-law-calculator">
                    Charles&apos;s Law Calculator
                  </Link>
                </li>
                <li>
                  <Link href="/calculators/avogadros-law-calculator">
                    Avogadro&apos;s Law Calculator
                  </Link>{" "}
                  for volume and amount changes at constant
                  temperature and pressure.
                </li>
                <li>
                  <Link href="/calculators/gay-lussacs-law-calculator">
                    Gay-Lussac&apos;s Law Calculator
                  </Link>
                </li>
              </ul>
            </section>

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">Questions answered</p>
              <h2 id="faq-heading">
                Combined gas law calculator FAQ
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
            <CalculatorTrustPanel subject="chemistry" />
          </aside>
        </Container>
      </section>
    </main>
  );
}
