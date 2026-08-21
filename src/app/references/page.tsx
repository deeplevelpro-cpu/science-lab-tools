import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";

const pageTitle = "Scientific References | Science Lab Tools";
const pageDescription =
  "Explore the scientific standards and reference principles used to develop Science Lab Tools calculators, educational resources, and laboratory guidance.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/references",
  },
  openGraph: {
    title: `${pageTitle} | ${siteConfig.name}`,
    description: pageDescription,
    type: "article",
    url: absoluteUrl("/references"),
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

const referencesSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: pageTitle,
  description: pageDescription,
  url: absoluteUrl("/references"),
  publisher: {
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
  },
};

export default function ReferencesPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(referencesSchema).replace(
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
              <li aria-current="page">References</li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">Scientific sources</p>
            <h1>Scientific References</h1>
            <p>
              Learn about the standards and scientific principles
              that guide Science Lab Tools calculators and resources.
            </p>
          </div>
        </Container>
      </section>

      <section className="article-section">
        <Container className="article-layout">
          <article className="article-content">
            <section>
              <p className="eyebrow">Scientific standards</p>
              <h2>Formula and unit references</h2>
              <p>
                Our calculators are based on established scientific
                equations, accepted terminology, and standard units used
                in science education and laboratory practice.
              </p>
            </section>

            <section>
              <p className="eyebrow">Reference areas</p>
              <h2>Topics supported by scientific standards</h2>
              <ul>
                <li>Chemistry formulas and concentration calculations</li>
                <li>Physics equations and measurement principles</li>
                <li>Laboratory units and scientific notation</li>
                <li>Mathematical methods used in scientific analysis</li>
              </ul>
            </section>

            <section>
              <p className="eyebrow">Transparency</p>
              <h2>How references are used</h2>
              <p>
                References guide formula selection, explanations,
                assumptions, and educational examples. For more details,
                review our{" "}
                <Link href="/methodology">
                  calculation methodology
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
