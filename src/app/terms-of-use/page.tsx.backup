import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";

const pageTitle = "Terms of Use | Science Calc Hub";
const pageDescription =
  "Read the Science Lab Tools terms of use covering acceptable use, educational content, calculators, intellectual property, warranties, and liability limitations.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/terms-of-use",
  },
  openGraph: {
    title: `${pageTitle} | ${siteConfig.name}`,
    description: pageDescription,
    type: "article",
    url: absoluteUrl("/terms-of-use"),
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

const termsSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: pageTitle,
  description: pageDescription,
  url: absoluteUrl("/terms-of-use"),
};

export default function TermsOfUsePage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(termsSchema).replace(
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
              <li aria-current="page">Terms of Use</li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">Website terms</p>
            <h1>Terms of Use</h1>
            <p>
              By using Science Lab Tools, visitors agree to use the
              website lawfully, responsibly, and in accordance with
              these terms.
            </p>
          </div>
        </Container>
      </section>

      <section className="article-section">
        <Container className="article-layout">
          <article className="article-content">
            <section aria-labelledby="acceptance-heading">
              <h2 id="acceptance-heading">
                Acceptance of these terms
              </h2>
              <p>
                Accessing or using this website indicates acceptance of
                these terms. Visitors who do not agree should stop using
                the website.
              </p>
            </section>

            <section aria-labelledby="use-heading">
              <h2 id="use-heading">
                Permitted use
              </h2>
              <p>
                Resources may be used for lawful personal, classroom,
                homework, teaching, and educational purposes. Users
                must not interfere with website operation, attempt
                unauthorized access, distribute malicious code, or use
                automated systems in a harmful manner.
              </p>
            </section>

            <section aria-labelledby="content-heading">
              <h2 id="content-heading">
                Educational content and calculators
              </h2>
              <p>
                Content and results are provided as general educational
                aids. Users are responsible for checking formulas,
                values, units, assumptions, suitability, and safety
                before relying on a result.
              </p>
            </section>

            <section aria-labelledby="property-heading">
              <h2 id="property-heading">
                Intellectual property
              </h2>
              <p>
                Unless otherwise stated, original website text,
                branding, layouts, calculator interfaces, and resource
                designs are protected by applicable intellectual
                property rules. Limited classroom use does not transfer
                ownership.
              </p>
            </section>

            <section aria-labelledby="warranty-heading">
              <h2 id="warranty-heading">
                No warranty
              </h2>
              <p>
                The website is provided on an as-available basis without
                guarantees that every resource will always be accurate,
                complete, uninterrupted, secure, or suitable for a
                specific purpose.
              </p>
            </section>

            <section aria-labelledby="liability-heading">
              <h2 id="liability-heading">
                Limitation of liability
              </h2>
              <p>
                To the extent permitted by applicable law, the website
                and its operators are not responsible for losses,
                injuries, damages, or decisions resulting from use of,
                inability to use, or reliance on the website.
              </p>
            </section>

            <section aria-labelledby="related-heading">
              <h2 id="related-heading">
                Related policies
              </h2>
              <p>
                Please also review our{" "}
                <Link href="/privacy-policy">
                  privacy policy
                </Link>
                ,{" "}
                <Link href="/disclaimer">
                  educational disclaimer
                </Link>
                , and{" "}
                <Link href="/editorial-policy">
                  editorial policy
                </Link>
                .
              </p>
            </section>

            <section aria-labelledby="changes-heading">
              <h2 id="changes-heading">
                Changes to these terms
              </h2>
              <p>
                These terms may be revised as the website, services,
                business structure, or applicable requirements change.
                Continued use after an update indicates acceptance of
                the revised terms.
              </p>
            </section>
          </article>

          <aside className="article-sidebar">
            <div className="sidebar-card">
              <p className="sidebar-card__label">
                Key responsibilities
              </p>
              <h2>Use resources carefully</h2>
              <ul>
                <li>Use the website lawfully</li>
                <li>Verify important calculations</li>
                <li>Follow safety procedures</li>
                <li>Respect intellectual property</li>
                <li>Do not misuse technical systems</li>
              </ul>
            </div>
          </aside>
        </Container>
      </section>
    </main>
  );
}
