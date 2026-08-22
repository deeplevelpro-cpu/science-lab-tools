import type { Metadata } from "next";

import { RelatedCalculators } from "@/components/related-calculators";
import { getRelatedCalculators } from "@/content/calculators/get-related-calculators";
import { calculators } from "@/content/calculators/registry";
import Link from "next/link";

import { MolecularWeightCalculator } from "@/components/calculators/molecular-weight-calculator";
import { CalculatorTrustPanel } from "@/components/calculator-trust";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";
import {
  createCalculatorBreadcrumbSchema,
  createCalculatorSchema,
} from "@/lib/seo/calculator-schema";

const pageTitle = "Molecular Weight Calculator";
const pageDescription =
  "Calculate molecular weight and molar mass from a chemical formula. Supports subscripts, parentheses, nested groups, hydrates, and element-by-element mass breakdowns.";
const pagePath =
  "/calculators/molecular-weight-calculator";

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
    question: "How do you calculate molecular weight?",
    answer:
      "Multiply the atomic mass of each element by the number of atoms shown in the chemical formula, then add all element contributions.",
  },
  {
    question: "Are molecular weight and molar mass the same?",
    answer:
      "They use the same numerical value for a substance. Molecular weight is often treated as a relative value, while molar mass is expressed in grams per mole.",
  },
  {
    question: "Does this calculator support parentheses?",
    answer:
      "Yes. It supports grouped formulas such as Ca(OH)2 and nested groups such as K4(ON(SO3)2)2.",
  },
  {
    question: "Can this calculator handle hydrates?",
    answer:
      "Yes. Hydrates can be entered using a middle dot, for example CuSO4·5H2O.",
  },
] as const;

const calculatorSchema = createCalculatorSchema({
  name: pageTitle,
  description: pageDescription,
  slug: "molecular-weight-calculator",
  category: "Chemistry",
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

const breadcrumbSchema =
  createCalculatorBreadcrumbSchema({
    name: pageTitle,
    slug: "molecular-weight-calculator",
    category: "Chemistry",
  });



const relatedCalculators = getRelatedCalculators(
  "molecular-weight-calculator",
  calculators,
);

export default function MolecularWeightCalculatorPage() {
  return (
    <main>
      {[calculatorSchema, faqSchema, breadcrumbSchema].map(
        (schema, index) => (
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
        ),
      )}

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
                Molecular Weight Calculator
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">
              Chemical formula calculator
            </p>

            <h1>Molecular Weight Calculator</h1>

            <p>
              Calculate molecular weight and molar mass
              from chemical formulas, grouped compounds,
              and hydrate notation.
            </p>
          </div>
        </Container>
      </section>

      <section
        className="tool-section"
        aria-label="Molecular weight calculator"
      >
        <Container>
          <MolecularWeightCalculator />
        </Container>
      </section>

      <section className="article-section">
        <Container className="article-layout">
          <article className="article-content">
            <section aria-labelledby="formula-heading">
              <p className="eyebrow">Formula</p>

              <h2 id="formula-heading">
                How molecular weight is calculated
              </h2>

              <div className="formula-card">
                <p>
                  Molar mass =
                  <span>
                    Σ(number of atoms × atomic mass)
                  </span>
                </p>
              </div>

              <p>
                Each element symbol is identified from
                the formula. Its atomic mass is multiplied
                by its atom count, and all contributions
                are added together.
              </p>
            </section>

            <section aria-labelledby="example-heading">
              <p className="eyebrow">
                Worked example
              </p>

              <h2 id="example-heading">
                Molecular weight of water
              </h2>

              <p>
                Water has the formula{" "}
                <strong>H2O</strong>. It contains two
                hydrogen atoms and one oxygen atom.
              </p>

              <ol className="calculation-steps">
                <li>
                  Hydrogen: 2 × 1.008 = 2.016
                </li>
                <li>
                  Oxygen: 1 × 15.999 = 15.999
                </li>
                <li>
                  Total: 2.016 + 15.999 ={" "}
                  <strong>18.015 g/mol</strong>
                </li>
              </ol>
            </section>

            <section aria-labelledby="supported-heading">
              <p className="eyebrow">
                Supported notation
              </p>

              <h2 id="supported-heading">
                Chemical formulas this calculator supports
              </h2>

              <ul className="article-list">
                <li>
                  Standard formulas such as H2O and NaCl
                </li>
                <li>
                  Multi-digit subscripts such as C12H22O11
                </li>
                <li>
                  Parentheses such as Ca(OH)2
                </li>
                <li>
                  Nested groups such as K4(ON(SO3)2)2
                </li>
                <li>
                  Hydrates such as CuSO4·5H2O
                </li>
              </ul>
            </section>

            <section aria-labelledby="mistakes-heading">
              <p className="eyebrow">
                Common mistakes
              </p>

              <h2 id="mistakes-heading">
                Molecular-weight calculation mistakes
              </h2>

              <ul className="article-list">
                <li>
                  Using incorrect capitalization for
                  element symbols.
                </li>
                <li>
                  Forgetting to multiply grouped atoms by
                  a parenthesis subscript.
                </li>
                <li>
                  Ignoring hydrate water molecules.
                </li>
                <li>
                  Using atomic number instead of atomic mass.
                </li>
                <li>
                  Rounding individual element masses too early.
                </li>
              </ul>
            </section>

            <section aria-labelledby="related-heading">
              <p className="eyebrow">
                Related chemistry tools
              </p>

              <h2 id="related-heading">
                Continue with mole calculations
              </h2>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/mass-moles-calculator"
                >
                  Mass to Moles Calculator
                </Link>{" "}
                to convert between grams and moles using
                the calculated molar mass.
              </p>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/molarity-calculator"
                >
                  Molarity Calculator
                </Link>{" "}
                to calculate solution concentration.
              </p>
            </section>

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">
                Questions and answers
              </p>

              <h2 id="faq-heading">
                Molecular weight calculator FAQ
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

              <h2>Chemical formula checklist</h2>

              <ul>
                <li>Use correct element capitalization</li>
                <li>Check every subscript</li>
                <li>Apply group multipliers</li>
                <li>Include hydrate molecules</li>
                <li>Round only the final result</li>
              </ul>
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
