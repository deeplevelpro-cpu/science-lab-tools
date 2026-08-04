import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";

const pageTitle = "Privacy Policy | Science Calc Hub";
const pageDescription =
  "Read the Science Lab Tools privacy policy covering analytics, technical data, cookies, third-party services, data retention, and user privacy choices.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/privacy-policy",
  },
  openGraph: {
    title: `${pageTitle} | ${siteConfig.name}`,
    description: pageDescription,
    type: "article",
    url: absoluteUrl("/privacy-policy"),
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

const privacyPolicySchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: pageTitle,
  description: pageDescription,
  url: absoluteUrl("/privacy-policy"),
};

export default function PrivacyPolicyPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(privacyPolicySchema).replace(
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
              <li aria-current="page">Privacy Policy</li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">Privacy and transparency</p>
            <h1>Privacy Policy</h1>
            <p>
              This policy explains the limited technical information
              that may be processed when visitors use Science Lab Tools.
            </p>
          </div>
        </Container>
      </section>

      <section className="article-section">
        <Container className="article-layout">
          <article className="article-content">
            <section aria-labelledby="collection-heading">
              <h2 id="collection-heading">
                Information processed automatically
              </h2>
              <p>
                Hosting, security, and analytics services may process
                technical information such as browser type, device
                type, approximate location, referring page, visited
                pages, interaction events, and network identifiers.
              </p>
            </section>

            <section aria-labelledby="analytics-heading">
              <h2 id="analytics-heading">
                Analytics
              </h2>
              <p>
                Google Analytics may be used to understand traffic,
                page usage, and general website performance. Analytics
                data helps identify useful resources and technical
                problems.
              </p>
            </section>

            <section aria-labelledby="cookies-heading">
              <h2 id="cookies-heading">
                Cookies and similar technologies
              </h2>
              <p>
                Analytics and infrastructure providers may use cookies
                or similar technologies. Browser settings and relevant
                privacy controls can be used to limit or remove stored
                data.
              </p>
            </section>

            <section aria-labelledby="forms-heading">
              <h2 id="forms-heading">
                Calculator and worksheet inputs
              </h2>
              <p>
                Calculator values are intended to be processed for the
                requested calculation. Users should not enter personal,
                confidential, regulated, or sensitive information into
                calculator fields.
              </p>
            </section>

            <section aria-labelledby="third-party-heading">
              <h2 id="third-party-heading">
                Third-party services
              </h2>
              <p>
                Hosting, analytics, security, and external-link
                providers may process data under their own privacy
                policies. Their practices are governed by their
                respective terms.
              </p>
            </section>

            <section aria-labelledby="related-heading">
              <h2 id="related-heading">
                Related information
              </h2>
              <p>
                Review our{" "}
                <Link href="/terms-of-use">
                  terms of use
                </Link>
                , read the{" "}
                <Link href="/disclaimer">
                  educational disclaimer
                </Link>
                , or learn more{" "}
                <Link href="/about">
                  about Science Lab Tools
                </Link>
                .
              </p>
            </section>

            <section aria-labelledby="changes-heading">
              <h2 id="changes-heading">
                Policy updates
              </h2>
              <p>
                This policy may be updated when website functionality,
                analytics, advertising, contact methods, or legal
                requirements change.
              </p>
            </section>
          </article>

          <aside className="article-sidebar">
            <div className="sidebar-card">
              <p className="sidebar-card__label">
                Privacy choices
              </p>
              <h2>Visitor controls</h2>
              <ul>
                <li>Review browser privacy settings</li>
                <li>Control or remove cookies</li>
                <li>Avoid submitting sensitive information</li>
                <li>Use analytics opt-out tools where available</li>
              </ul>
            </div>
          </aside>
        </Container>
      </section>
    </main>
  );
}
