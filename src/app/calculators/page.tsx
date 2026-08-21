import type { Metadata } from "next";
import Link from "next/link";

import { CalculatorDirectory } from "@/components/calculator-directory";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { calculators } from "@/content/calculators/registry";
import { calculatorCategories } from "@/content/calculators/categories";
import { absoluteUrl } from "@/lib/seo/url";

const pageTitle =
  "Free Science Calculators";

const pageDescription =
  "Use free physics, chemistry, statistics, and laboratory calculators with tested formulas, unit guidance, worked examples, and step-by-step solutions.";

const pagePath = "/calculators";

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


const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: pageTitle,
  description: pageDescription,
  url: absoluteUrl(pagePath),
  isPartOf: {
    "@type": "WebSite",
    name: siteConfig.name,
    url: absoluteUrl("/"),
  },
  about: [
    {
      "@type": "Thing",
      name: "Physics calculators",
    },
    {
      "@type": "Thing",
      name: "Chemistry calculators",
    },
    {
      "@type": "Thing",
      name: "Laboratory calculators",
    },
  ],
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: calculators.length,
    itemListElement: calculators.map(
      (calculator, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: calculator.name,
        url: absoluteUrl(calculator.href),
      }),
    ),
  },
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
      name: "Science Calculators",
      item: absoluteUrl(pagePath),
    },
  ],
};

export default function CalculatorsPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionSchema).replace(
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

      <section className="directory-hero">
        <Container>
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <ol>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li aria-current="page">Calculators</li>
            </ol>
          </nav>

          <div className="directory-hero__content">
            <p className="eyebrow">Interactive science tools</p>
            <h1>Science calculators with clear working steps</h1>
            <p>
              Use reviewed laboratory, chemistry, and physics calculators that
              explain the formula, variables, units, and calculation process.
            </p>
          </div>
        </Container>
      </section>

      <section className="directory-section" aria-labelledby="available-heading">
        <Container>
          <div className="section-heading section-heading--split">
            <div>
              <p className="eyebrow">Available now</p>
              <h2 id="available-heading">Published calculators</h2>
            </div>

            <p>
              Each published calculator includes validation, tested calculation
              logic, worked examples, and supporting educational guidance.
            </p>
          </div>

          <div className="calculator-category-grid">
  {calculatorCategories.map((category) => (
    <article
      key={category.slug}
      className="calculator-directory-card"
    >
      <h3>
        <Link href={`/calculators/${category.slug}`}>
          {category.name}
        </Link>
      </h3>

      <p>{category.description}</p>

      <Link
        className="calculator-directory-card__link"
        href={`/calculators/${category.slug}`}
      >
        Explore calculators
        <span aria-hidden="true">→</span>
      </Link>
    </article>
  ))}
</div>

<CalculatorDirectory calculators={calculators} />
        </Container>
      </section>

    </main>
  );
}
