import type { Metadata } from "next";

import { RelatedCalculators } from "@/components/related-calculators";
import { getRelatedCalculators } from "@/content/calculators/get-related-calculators";
import { calculators } from "@/content/calculators/registry";

import {
  createCalculatorBreadcrumbSchema,
  createCalculatorSchema,
} from "@/lib/seo/calculator-schema";
import Link from "next/link";

import { CalculatorTrustPanel } from "@/components/calculator-trust";
import { MolecularFormulaCalculator } from "@/components/calculators/molecular-formula-calculator";

const pageTitle =
  "Molecular Formula Calculator | Empirical to Molecular";

const pageDescription =
  "Calculate a molecular formula from an empirical formula and molar mass. See the whole-number multiplier, formula mass, calculation steps, and examples.";

const pageUrl =
  "https://science-lab-tools-murex.vercel.app/calculators/molecular-formula-calculator";

export const metadata: Metadata = {
  title: "Molecular Formula Calculator | Empirical to Molecular",
  description:
    "Calculate a molecular formula from an empirical formula and molar mass. See the whole-number multiplier, formula mass, calculation steps, and examples.",
  alternates: {
    canonical: "/calculators/molecular-formula-calculator",
  },
  openGraph: {
    title: "Molecular Formula Calculator",
    description:
      "Convert an empirical formula and compound molar mass into a molecular formula with clear calculation steps.",
    url: pageUrl,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Molecular Formula Calculator",
    description:
      "Find a molecular formula from an empirical formula and molar mass.",
  },
};

const faqs = [
  {
    question: "How do you calculate a molecular formula?",
    answer:
      "First calculate the empirical formula mass. Divide the compound molar mass by the empirical formula mass, round the result to the nearest valid whole number, and multiply every empirical-formula subscript by that number.",
  },
  {
    question:
      "What is the difference between an empirical formula and a molecular formula?",
    answer:
      "An empirical formula shows the simplest whole-number ratio of atoms in a compound. A molecular formula shows the actual number of atoms of each element in one molecule.",
  },
  {
    question: "Can an empirical formula and molecular formula be the same?",
    answer:
      "Yes. They are the same when the compound molar mass equals the empirical formula mass, producing a whole-number multiplier of 1.",
  },
  {
    question: "Why must the molecular multiplier be a whole number?",
    answer:
      "A molecular formula represents whole atoms. Therefore, the molecular molar mass must be approximately a whole-number multiple of the empirical formula mass.",
  },
  {
    question: "What units should I use for molar mass?",
    answer:
      "Enter molar mass in grams per mole, written as g/mol. The empirical formula itself does not require a unit.",
  },
] as const;

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

const calculatorSchema = createCalculatorSchema({
  name: pageTitle,
  description: pageDescription,
  slug: "molecular-formula-calculator",
  category: "Chemistry",
});

const breadcrumbSchema =
  createCalculatorBreadcrumbSchema({
    name: pageTitle,
    slug: "molecular-formula-calculator",
    category: "Chemistry",
  });



const relatedCalculators = getRelatedCalculators(
  "molecular-formula-calculator",
  calculators,
);

export default function MolecularFormulaCalculatorPage() {
  return (
    <main>
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(calculatorSchema),
        }}
        type="application/ld+json"
      />

      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
        type="application/ld+json"
      />

      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
        type="application/ld+json"
      />

      <section className="page-hero">
        <div className="page-shell">
          <nav aria-label="Breadcrumb" className="breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/calculators">Calculators</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">
              Molecular Formula Calculator
            </span>
          </nav>

          <div className="page-hero__content">
            <p className="page-eyebrow">Chemistry calculator</p>

            <h1>Molecular Formula Calculator</h1>

            <p className="page-hero__summary">
              Calculate the molecular formula of a compound from
              its empirical formula and molar mass. The calculator
              finds the empirical formula mass, determines the
              whole-number multiplier, and shows the complete
              calculation.
            </p>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="page-shell">
          <MolecularFormulaCalculator />
        </div>
      </section>

      <section className="page-section page-section--muted">
        <div className="page-shell content-layout">
          <article className="prose-content">
            <h2>How to calculate a molecular formula</h2>

            <p>
              A molecular formula gives the actual number of atoms
              of every element in one molecule. To determine it,
              you need the compound&apos;s empirical formula and
              molar mass.
            </p>

            <ol>
              <li>
                Calculate the molar mass of the empirical formula.
              </li>
              <li>
                Divide the compound molar mass by the empirical
                formula mass.
              </li>
              <li>
                Round the result to the nearest valid whole number.
              </li>
              <li>
                Multiply every subscript in the empirical formula
                by that whole-number multiplier.
              </li>
            </ol>

            <h2>Molecular formula equation</h2>

            <div className="formula-card">
              <p>
                <strong>
                  n = compound molar mass ÷ empirical formula mass
                </strong>
              </p>

              <p>
                <strong>
                  Molecular formula = (empirical formula)
                  <sub>n</sub>
                </strong>
              </p>
            </div>

            <p>
              The value of <em>n</em> should be a positive whole
              number because chemical formulas contain whole
              numbers of atoms.
            </p>

            <h2>Worked example: glucose</h2>

            <p>
              The empirical formula of glucose is CH<sub>2</sub>O,
              and its molar mass is approximately 180.156 g/mol.
            </p>

            <ol>
              <li>
                Empirical formula mass of CH<sub>2</sub>O:
                approximately 30.026 g/mol.
              </li>
              <li>
                Multiplier: 180.156 ÷ 30.026 ≈ 6.
              </li>
              <li>
                Multiply every subscript by 6.
              </li>
              <li>
                Molecular formula: C<sub>6</sub>H<sub>12</sub>O
                <sub>6</sub>.
              </li>
            </ol>

            <h2>
              Empirical formula vs. molecular formula
            </h2>

            <div className="overflow-x-auto">
              <table>
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th>Empirical formula</th>
                    <th>Molecular formula</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Meaning</td>
                    <td>Simplest ratio of atoms</td>
                    <td>Actual number of atoms</td>
                  </tr>
                  <tr>
                    <td>Example for glucose</td>
                    <td>
                      CH<sub>2</sub>O
                    </td>
                    <td>
                      C<sub>6</sub>H<sub>12</sub>O<sub>6</sub>
                    </td>
                  </tr>
                  <tr>
                    <td>Can be identical?</td>
                    <td colSpan={2}>
                      Yes, when the molecular multiplier equals 1.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>Common calculation mistakes</h2>

            <ul>
              <li>
                Using an incorrect or unbalanced empirical formula.
              </li>
              <li>
                Dividing the empirical formula mass by the compound
                molar mass in the wrong order.
              </li>
              <li>
                Rounding a value that is not reasonably close to a
                whole number.
              </li>
              <li>
                Multiplying only one subscript instead of every
                element subscript.
              </li>
              <li>
                Confusing formula mass with the measured molar mass
                of the compound.
              </li>
            </ul>

            <h2>Related chemistry calculators</h2>

            <p>
              Use the{" "}
              <Link href="/calculators/empirical-formula-calculator">
                empirical formula calculator
              </Link>{" "}
              when you have elemental masses or percentages. Use
              the{" "}
              <Link href="/calculators/molecular-weight-calculator">
                molecular weight calculator
              </Link>{" "}
              to calculate the molar mass of a known chemical
              formula.
            </p>

            <p>
              You may also continue with the{" "}
              <Link href="/calculators/stoichiometry-calculator">
                stoichiometry calculator
              </Link>
              ,{" "}
              <Link href="/calculators/mass-moles-calculator">
                mass to moles calculator
              </Link>
              , or{" "}
              <Link href="/calculators/molarity-calculator">
                molarity calculator
              </Link>
              .
            </p>

            <h2>Frequently asked questions</h2>

            <div className="faq-list">
              {faqs.map((faq) => (
                <details key={faq.question}>
                  <summary>{faq.question}</summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </article>

          <aside className="content-sidebar">
            <div className="sidebar-card">
              <p className="sidebar-card__label">
                Required inputs
              </p>

              <h2>What you need</h2>

              <ul>
                <li>Empirical formula</li>
                <li>Compound molar mass in g/mol</li>
              </ul>
            </div>

            <div className="sidebar-card">
              <p className="sidebar-card__label">
                Calculation rule
              </p>

              <h2>Whole-number check</h2>

              <p>
                The molar-mass ratio should be close to a positive
                whole number. If it is not, verify the empirical
                formula and experimental molar mass.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="page-section">
        <div className="page-shell">
          <CalculatorTrustPanel subject="chemistry" />
        </div>
      </section>
    

      <RelatedCalculators
        calculators={relatedCalculators}
      />
</main>
  );
}
