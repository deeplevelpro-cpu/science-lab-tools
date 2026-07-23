import type { Metadata } from "next";
import Link from "next/link";

import { CalculatorTrustPanel } from "@/components/calculator-trust";
import { EmpiricalFormulaCalculator } from "@/components/calculators/empirical-formula-calculator";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";

const pagePath =
  "/calculators/empirical-formula-calculator";
const pageUrl = absoluteUrl(pagePath);

const title =
  "Empirical Formula Calculator from Mass or Percent";

const description =
  "Calculate an empirical formula from element masses or percentage composition. See mole conversions, simplest whole-number ratios, subscripts, and formula mass.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: pagePath,
  },
  openGraph: {
    title,
    description,
    url: pageUrl,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const faqItems = [
  {
    question: "What is an empirical formula?",
    answer:
      "An empirical formula shows the simplest whole-number ratio of atoms of each element in a compound. It does not necessarily show the actual number of atoms in one molecule.",
  },
  {
    question:
      "How do you calculate an empirical formula from percentages?",
    answer:
      "Treat each percentage as grams in a 100-gram sample, divide every amount by its element atomic mass, divide all mole values by the smallest value, and convert the ratios to whole numbers.",
  },
  {
    question:
      "Can I calculate an empirical formula from masses?",
    answer:
      "Yes. Enter the mass of every element using the same unit. Because the calculation uses mass ratios, grams, milligrams, or another consistent mass unit can be used.",
  },
  {
    question:
      "What if an element ratio is close to 1.5 or 1.33?",
    answer:
      "Multiply every normalized ratio by the same small integer. A ratio near 1.5 normally requires multiplying by 2, while a ratio near 1.33 commonly requires multiplying by 3.",
  },
  {
    question:
      "What is the difference between empirical and molecular formulas?",
    answer:
      "The empirical formula gives the simplest atom ratio. The molecular formula gives the actual number of each type of atom and is a whole-number multiple of the empirical formula.",
  },
  {
    question:
      "Why must percentage composition total about 100 percent?",
    answer:
      "A complete percentage composition represents all elements in the compound. Small differences from 100 percent can occur because measured values have been rounded.",
  },
];

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Empirical Formula Calculator",
  url: pageUrl,
  description,
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any",
  browserRequirements: "Requires JavaScript",
  isAccessibleForFree: true,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  publisher: {
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
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
      item: siteConfig.url,
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
      name: "Empirical Formula Calculator",
      item: pageUrl,
    },
  ],
};

export default function EmpiricalFormulaCalculatorPage() {
  return (
    <main>
      {[webApplicationSchema, faqSchema, breadcrumbSchema].map(
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

      <section className="calculator-page">
        <Container>
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/calculators">Calculators</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">
              Empirical Formula Calculator
            </span>
          </nav>

          <div className="calculator-page__intro">
            <p className="eyebrow">Chemistry calculator</p>

            <h1>Empirical Formula Calculator</h1>

            <p>
              Calculate the simplest whole-number ratio of
              elements from percentage composition or measured
              masses, with mole conversions and detailed steps.
            </p>
          </div>

          <EmpiricalFormulaCalculator />
        </Container>
      </section>

      <section className="article-section">
        <Container className="article-layout">
          <article className="article-content">
            <section aria-labelledby="meaning-heading">
              <p className="eyebrow">Formula meaning</p>

              <h2 id="meaning-heading">
                What is an empirical formula?
              </h2>

              <p>
                An empirical formula describes the simplest
                whole-number ratio of the elements in a
                compound. For example, glucose has the
                molecular formula C₆H₁₂O₆, but its empirical
                formula is CH₂O because the subscripts can all
                be divided by six.
              </p>

              <p>
                The empirical formula does not always represent
                the actual number of atoms in a molecule. It
                expresses the lowest ratio supported by
                composition data.
              </p>
            </section>

            <section aria-labelledby="method-heading">
              <p className="eyebrow">Calculation method</p>

              <h2 id="method-heading">
                How to calculate an empirical formula
              </h2>

              <p>
                Convert each element amount to moles by dividing
                it by the element atomic mass:
              </p>

              <div className="formula-card">
                <p>Moles = element amount ÷ atomic mass</p>
              </div>

              <p>
                Next, divide every mole value by the smallest
                mole value:
              </p>

              <div className="formula-card">
                <p>
                  Normalized ratio = element moles ÷ smallest
                  mole amount
                </p>
              </div>

              <p>
                If the ratios are not sufficiently close to
                whole numbers, multiply every ratio by the same
                small integer. The resulting whole numbers
                become the formula subscripts.
              </p>
            </section>

            <section aria-labelledby="steps-heading">
              <p className="eyebrow">Calculator instructions</p>

              <h2 id="steps-heading">
                How to use the empirical formula calculator
              </h2>

              <ol className="article-list">
                <li>
                  Select percentage composition or mass as the
                  input basis.
                </li>
                <li>
                  Choose each chemical element in the compound.
                </li>
                <li>
                  Enter the percentage or measured mass for
                  every element.
                </li>
                <li>
                  Add more element rows when the compound
                  contains additional elements.
                </li>
                <li>
                  Calculate and review the mole values,
                  normalized ratios, and final subscripts.
                </li>
              </ol>
            </section>

            <section aria-labelledby="percentage-example-heading">
              <p className="eyebrow">
                Percentage composition example
              </p>

              <h2 id="percentage-example-heading">
                Finding CH₂O from percentage composition
              </h2>

              <p>
                Consider a compound containing 40.0% carbon,
                6.7% hydrogen, and 53.3% oxygen. Treating the
                percentages as masses in a 100-gram sample gives
                the following approximate mole amounts:
              </p>

              <ol className="calculation-steps">
                <li>Carbon: 40.0 ÷ 12.011 = 3.330 mol</li>
                <li>Hydrogen: 6.7 ÷ 1.008 = 6.647 mol</li>
                <li>Oxygen: 53.3 ÷ 15.999 = 3.331 mol</li>
                <li>
                  Divide all values by approximately 3.330 to
                  obtain the ratio 1:2:1.
                </li>
              </ol>

              <p>
                The simplest whole-number ratio is therefore
                C₁H₂O₁, written as <strong>CH₂O</strong>.
              </p>
            </section>

            <section aria-labelledby="fractions-heading">
              <p className="eyebrow">Fractional ratios</p>

              <h2 id="fractions-heading">
                Converting decimal ratios to whole numbers
              </h2>

              <p>
                Experimental and rounded composition values do
                not always produce exact integers. Ratios near
                common fractions should be multiplied together
                by a suitable small number.
              </p>

              <ul className="article-list">
                <li>
                  A ratio ending near 0.5 usually requires
                  multiplying every ratio by 2.
                </li>
                <li>
                  A ratio ending near 0.33 or 0.67 usually
                  requires multiplying by 3.
                </li>
                <li>
                  A ratio ending near 0.25 or 0.75 usually
                  requires multiplying by 4.
                </li>
                <li>
                  All ratios must be multiplied by the same
                  number to preserve their relationship.
                </li>
              </ul>
            </section>

            <section aria-labelledby="difference-heading">
              <p className="eyebrow">Formula comparison</p>

              <h2 id="difference-heading">
                Empirical formula vs. molecular formula
              </h2>

              <p>
                A molecular formula is a whole-number multiple
                of its empirical formula. If the empirical
                formula mass and the compound molar mass are
                known, the multiplier can be calculated:
              </p>

              <div className="formula-card">
                <p>
                  Molecular multiplier = molecular molar mass ÷
                  empirical formula mass
                </p>
              </div>

              <p>
                For example, the empirical formula CH₂O has a
                formula mass of approximately 30.026 g/mol.
                Glucose has a molar mass near 180.156 g/mol.
                The multiplier is 6, producing C₆H₁₂O₆.
              </p>
            </section>

            <section aria-labelledby="mistakes-heading">
              <p className="eyebrow">Common mistakes</p>

              <h2 id="mistakes-heading">
                Empirical-formula calculation mistakes
              </h2>

              <ul className="article-list">
                <li>
                  Dividing element amounts by atomic numbers
                  instead of atomic masses.
                </li>
                <li>
                  Rounding mole values before calculating the
                  normalized ratios.
                </li>
                <li>
                  Rounding a value such as 1.5 directly to 2
                  instead of multiplying all ratios by 2.
                </li>
                <li>
                  Using inconsistent mass units for different
                  elements.
                </li>
                <li>
                  Omitting an element from the complete
                  percentage composition.
                </li>
                <li>
                  Confusing the empirical formula with the
                  molecular formula.
                </li>
              </ul>
            </section>

            <section aria-labelledby="related-heading">
              <p className="eyebrow">
                Related chemistry tools
              </p>

              <h2 id="related-heading">
                Continue your formula calculations
              </h2>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/molecular-weight-calculator"
                >
                  Molecular Weight Calculator
                </Link>{" "}
                to calculate the molar mass of an empirical or
                molecular formula.
              </p>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/mass-moles-calculator"
                >
                  Mass to Moles Calculator
                </Link>{" "}
                for direct conversions between a substance mass
                and its amount in moles.
              </p>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/stoichiometry-calculator"
                >
                  Stoichiometry Calculator
                </Link>{" "}
                to apply balanced-equation mole ratios to
                reactants and products.
              </p>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/limiting-reactant-calculator"
                >
                  Limiting Reactant Calculator
                </Link>{" "}
                to identify the limiting reagent and calculate
                theoretical product yield.
              </p>
            </section>

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">
                Questions and answers
              </p>

              <h2 id="faq-heading">
                Empirical formula calculator FAQ
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

              <h2>Empirical formula checklist</h2>

              <ul>
                <li>Use one consistent mass unit</li>
                <li>Convert every element amount to moles</li>
                <li>Divide by the smallest mole value</li>
                <li>Preserve fractional ratios</li>
                <li>Multiply all ratios together</li>
                <li>Reduce to the smallest whole numbers</li>
              </ul>
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
