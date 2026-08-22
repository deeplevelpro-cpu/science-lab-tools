import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";

const pageTitle = "Calculation Methodology | ScienceCalcHub";
const pageDescription =
  "Learn how ScienceCalcHub develops, verifies, and maintains scientific calculators using established formulas, unit standards, testing, and educational review.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/methodology",
  },
  openGraph: {
    title: `${pageTitle} | ${siteConfig.name}`,
    description: pageDescription,
    type: "article",
    url: absoluteUrl("/methodology"),
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

const methodologySchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: pageTitle,
  description: pageDescription,
  url: absoluteUrl("/methodology"),
  publisher: {
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
  },
};

export default function MethodologyPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(methodologySchema).replace(
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
              <li aria-current="page">Methodology</li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">Scientific accuracy standards</p>
            <h1>Calculation Methodology</h1>
            <p>
              Learn how ScienceCalcHub creates and validates
              educational calculators and scientific resources.
            </p>
          </div>
        </Container>
      </section>

      <section className="article-section">
        <Container className="article-layout">
          <article className="article-content">
            <section>
              <p className="eyebrow">Formula selection</p>
              <h2>Using established scientific relationships</h2>
              <p>
                Calculator formulas are based on accepted scientific
                relationships, standard terminology, and commonly used
                equations.
              </p>
            </section>

            <section>
              <p className="eyebrow">Validation process</p>
              <h2>Testing calculations and examples</h2>
              <p>
                Calculator logic is tested using representative values,
                boundary cases, invalid inputs, and expected results to
                improve reliability. Each calculator is designed to present
                formulas, assumptions, units, and limitations clearly so users
                can understand the scientific basis of each result.
              </p>
            </section>

            <section>
              <p className="eyebrow">Educational approach</p>
              <h2>Explaining the science behind results</h2>
              <p>
                Pages include formulas, variables, units, examples, and
                explanations so learners understand how calculations work.
              </p>
            </section>

            <section>
              <p className="eyebrow">Related standards</p>
              <h2>Transparency and review</h2>
              <p>
                Read our{" "}
                <Link href="/editorial-policy">
                  editorial policy
                </Link>{" "}
                and meet our{" "}
                <Link href="/authors">
                  review team
                </Link>
                .
              </p>
            </section>
          </article>
        </Container>
      </section>
    </main>
  );
}
