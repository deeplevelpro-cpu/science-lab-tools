import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";

const pageTitle = "Editorial Policy | Science Calc Hub";
const pageDescription =
  "Read the Science Lab Tools editorial policy covering research, formula validation, educational clarity, updates, corrections, and responsible content standards.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/editorial-policy",
  },
  openGraph: {
    title: `${pageTitle} | ${siteConfig.name}`,
    description: pageDescription,
    type: "article",
    url: absoluteUrl("/editorial-policy"),
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

const policySchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: pageTitle,
  description: pageDescription,
  url: absoluteUrl("/editorial-policy"),
};

export default function EditorialPolicyPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(policySchema).replace(
            /</g,
            "\\u003c",
          ),
        }}
      />

      <section className="tool-page-hero">
        <Container>
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <ol>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li aria-current="page">Editorial Policy</li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">Publishing standards</p>
            <h1>Editorial Policy</h1>
            <p>
              This policy explains how we develop, review, test, and
              maintain educational calculators and science resources.
            </p>
          </div>
        </Container>
      </section>

      <section className="article-section">
        <Container className="article-layout">
          <article className="article-content">
            <section aria-labelledby="accuracy-heading">
              <p className="eyebrow">Accuracy</p>
              <h2 id="accuracy-heading">
                Formula and calculation review
              </h2>
              <p>
                Calculator formulas are implemented from established
                scientific relationships. Calculation engines are
                tested using representative values, boundary cases,
                invalid inputs, and expected rearrangements.
              </p>
            </section>

            <section aria-labelledby="clarity-heading">
              <p className="eyebrow">Clarity</p>
              <h2 id="clarity-heading">
                Educational explanations
              </h2>
              <p>
                We aim to explain variables, formulas, units,
                assumptions, working steps, and common mistakes in
                language suitable for learners while preserving
                scientific meaning.
              </p>
            </section>

            <section aria-labelledby="sources-heading">
              <p className="eyebrow">Evidence</p>
              <h2 id="sources-heading">
                Source and terminology standards
              </h2>
              <p>
                Content is based on established scientific principles,
                conventional notation, widely used SI units, and
                standard laboratory practices. Where a topic has
                multiple conventions, the relevant assumption should
                be stated.
              </p>
            </section>

            <section aria-labelledby="updates-heading">
              <p className="eyebrow">Maintenance</p>
              <h2 id="updates-heading">
                Updates and corrections
              </h2>
              <p>
                Pages may be updated to improve explanations, correct
                errors, add examples, strengthen accessibility, revise
                metadata, or reflect better technical implementation.
              </p>
              <p>
                Material errors should be corrected promptly after
                verification. Minor formatting or readability changes
                may be made without changing the scientific meaning.
              </p>
            </section>

            <section aria-labelledby="related-heading">
              <p className="eyebrow">Related resources</p>
              <h2 id="related-heading">
                Learn more about our standards
              </h2>
              <p>
                Read more{" "}
                <Link href="/about">
                  about Science Lab Tools
                </Link>
                , review the{" "}
                <Link href="/disclaimer">
                  educational disclaimer
                </Link>
                , or explore our{" "}
                <Link href="/scientific-method">
                  scientific-method guides
                </Link>
                .
              </p>
            </section>

            <section aria-labelledby="independence-heading">
              <p className="eyebrow">Editorial independence</p>
              <h2 id="independence-heading">
                Educational value comes first
              </h2>
              <p>
                Commercial considerations should not change formulas,
                scientific conclusions, safety guidance, or the
                presentation of factual educational content.
              </p>
            </section>
          </article>

          <aside className="article-sidebar">
            <div className="sidebar-card">
              <p className="sidebar-card__label">
                Review checklist
              </p>
              <h2>Before publication</h2>
              <ul>
                <li>Formula and variables checked</li>
                <li>Units and assumptions explained</li>
                <li>Representative examples reviewed</li>
                <li>Metadata and structured data validated</li>
                <li>Accessibility and production checks completed</li>
              </ul>
            </div>
          </aside>
        </Container>
      </section>
    </main>
  );
}
