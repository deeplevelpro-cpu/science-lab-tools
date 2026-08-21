import type { Metadata } from "next";
import Link from "next/link";

import { DensityCalculator } from "@/components/calculators/density-calculator";
import { CalculatorTrustPanel } from "@/components/calculator-trust";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";
import {
  createCalculatorBreadcrumbSchema,
  createCalculatorSchema,
} from "@/lib/seo/calculator-schema";

const pageTitle = "Density Calculator | Mass, Volume & Density";
const pageDescription =
  "Calculate density, mass, or volume using ρ = m ÷ V. Supports common laboratory units with worked examples, formula guidance, and common mistakes.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/calculators/density-calculator",
  },
  openGraph: {
    title: `${pageTitle} | ${siteConfig.name}`,
    description: pageDescription,
    type: "website",
    url: absoluteUrl("/calculators/density-calculator"),
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
    question: "What is the formula for density?",
    answer:
      "Density is calculated by dividing mass by volume. The formula is density equals mass divided by volume.",
  },
  {
    question: "Can this calculator solve for mass or volume?",
    answer:
      "Yes. Select density, mass, or volume as the missing variable and enter the other two known values.",
  },
  {
    question: "Can grams and milliliters be used together?",
    answer:
      "Yes, especially for liquids. When mass is entered in grams and volume in milliliters, density is reported in grams per milliliter.",
  },
] as const;

const calculatorSchema = createCalculatorSchema({
  name: pageTitle,
  description: pageDescription,
  slug: "density-calculator",
  category: "Physics",
  relatedCalculators: [
    {
      name: "Mass Calculator",
      href: "/calculators/mass-moles-calculator",
    },
    {
      name: "Specific Heat Calculator",
      href: "/calculators/specific-heat-calculator",
    },
  ],
});

const breadcrumbSchema =
  createCalculatorBreadcrumbSchema({
    name: "Density Calculator",
    slug: "density-calculator",
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

export default function DensityCalculatorPage() {
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
          __html: JSON.stringify(breadcrumbSchema).replace(
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
              <li aria-current="page">Density Calculator</li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">Physics and laboratory tool</p>
            <h1>Density Calculator</h1>
            <p>
              Calculate density, mass, or volume using common
              laboratory measurement units and clear working steps.
            </p>
          </div>
        </Container>
      </section>

      <section
        className="tool-section"
        aria-label="Density calculator"
      >
        <Container>
          <DensityCalculator />
        </Container>
      </section>

      <section className="article-section">
        <Container className="article-layout">
          <article className="article-content">
            <section aria-labelledby="formula-heading">
              <p className="eyebrow">Formula</p>
              <h2 id="formula-heading">
                How density is calculated
              </h2>

              <div className="formula-card">
                <p>
                  Density formula
                  <span>ρ = m ÷ V</span>
                </p>
              </div>

              <p>
                Density measures the amount of mass contained in a
                given volume. The symbol ρ represents density, m
                represents mass, and V represents volume.
              </p>
            </section>

            <section aria-labelledby="example-heading">
              <p className="eyebrow">Worked example</p>
              <h2 id="example-heading">
                Density calculation example
              </h2>

              <p>
                A sample has a mass of <strong>100 grams</strong> and
                occupies a volume of <strong>20 cubic centimeters</strong>.
              </p>

              <ol className="calculation-steps">
                <li>
                  Write the formula: density = mass ÷ volume
                </li>
                <li>
                  Substitute the values: 100 ÷ 20
                </li>
                <li>
                  Calculate the result: <strong>5</strong>
                </li>
                <li>
                  Report the density as{" "}
                  <strong>5 g/cm³</strong>
                </li>
              </ol>
            </section>

            <section aria-labelledby="units-heading">
              <p className="eyebrow">Unit guidance</p>
              <h2 id="units-heading">
                Use a consistent measurement system
              </h2>

              <p>
                Density units depend on the mass and volume units
                used. Common laboratory combinations include g/cm³,
                g/mL, and kg/m³.
              </p>

              <p>
                This calculator displays a selected unit system but
                does not automatically convert measurements entered
                in mixed units.
              </p>
            </section>

            <section aria-labelledby="mistakes-heading">
              <p className="eyebrow">Laboratory guidance</p>
              <h2 id="mistakes-heading">
                Common density mistakes
              </h2>

              <ul className="article-list">
                <li>Dividing volume by mass instead of mass by volume.</li>
                <li>Mixing incompatible mass and volume units.</li>
                <li>Using a measured container volume instead of sample volume.</li>
                <li>Ignoring significant figures in the final result.</li>
                <li>Rounding intermediate values too early.</li>
              </ul>
            </section>

            <section aria-labelledby="related-heading">
              <p className="eyebrow">Related calculations</p>
              <h2 id="related-heading">
                Continue with related laboratory calculators
              </h2>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/mass-moles-calculator"
                >
                  Mass to Moles Calculator
                </Link>{" "}
                when converting a measured sample mass into an
                amount of substance for chemistry calculations.
              </p>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/measurement-uncertainty-calculator"
                >
                  Measurement Uncertainty Calculator
                </Link>{" "}
                to evaluate uncertainty in experimental mass,
                volume, and density measurements.
              </p>
            </section>

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">Questions and answers</p>
              <h2 id="faq-heading">Density FAQ</h2>

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
              <h2>Density checklist</h2>
              <ul>
                <li>Select the missing variable</li>
                <li>Enter the other two values</li>
                <li>Choose one consistent unit system</li>
                <li>Use mass divided by volume</li>
                <li>Include the correct compound unit</li>
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
