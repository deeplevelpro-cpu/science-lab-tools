import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";

const pageTitle = "Authors and Review Team | Science Lab Tools";
const pageDescription =
  "Meet the Science Lab Tools editorial team and learn how scientific calculators, educational guides, and laboratory resources are reviewed for accuracy and clarity.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/authors",
  },
  openGraph: {
    title: `${pageTitle} | ${siteConfig.name}`,
    description: pageDescription,
    type: "profile",
    url: absoluteUrl("/authors"),
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

const authorSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: pageTitle,
  description: pageDescription,
  url: absoluteUrl("/authors"),
  mainEntity: {
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
  },
};

export default function AuthorsPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(authorSchema).replace(
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
              <li aria-current="page">Authors</li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">Expertise and accountability</p>
            <h1>Authors and Review Team</h1>
            <p>
              Science Lab Tools is maintained by an editorial team focused
              on accurate calculations, clear scientific explanations, and
              practical learning resources.
            </p>
          </div>
        </Container>
      </section>

      <section className="article-section">
        <Container className="article-layout">
          <article className="article-content">
            <section>
              <p className="eyebrow">Editorial team</p>
              <h2>Science Lab Tools Editorial Team</h2>
              <p>
                Our team develops and maintains educational calculators,
                laboratory guides, templates, and science learning
                resources.
              </p>
              <p>
                Content focuses on chemistry, physics, laboratory methods,
                scientific calculations, formulas, units, and educational
                clarity.
              </p>
            </section>

            <section>
              <p className="eyebrow">Review process</p>
              <h2>How content is reviewed</h2>
              <p>
                Calculator formulas are checked against established
                scientific relationships. Pages are reviewed for correct
                terminology, units, assumptions, examples, and practical
                usefulness.
              </p>
            </section>

            <section>
              <p className="eyebrow">Related standards</p>
              <h2>Learn about our process</h2>
              <p>
                Read our{" "}
                <Link href="/editorial-policy">
                  editorial policy
                </Link>{" "}
                and explore our{" "}
                <Link href="/methodology">
                  methodology
                </Link>{" "}
                for more details.
              </p>
            </section>
          </article>
        </Container>
      </section>
    </main>
  );
}
