import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";

const pageTitle = "Educational Disclaimer";
const pageDescription =
  "Review the Science Lab Tools educational disclaimer covering calculator limitations, laboratory safety, professional advice, accuracy, and responsible use.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/disclaimer",
  },
  openGraph: {
    title: `${pageTitle} | ${siteConfig.name}`,
    description: pageDescription,
    type: "article",
    url: absoluteUrl("/disclaimer"),
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

const disclaimerSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: pageTitle,
  description: pageDescription,
  url: absoluteUrl("/disclaimer"),
};

export default function DisclaimerPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(disclaimerSchema).replace(
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
              <li aria-current="page">Disclaimer</li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">Responsible use</p>
            <h1>Educational Disclaimer</h1>
            <p>
              Science Lab Tools provides general educational resources
              and calculation aids. Users remain responsible for
              checking suitability, assumptions, and safety.
            </p>
          </div>
        </Container>
      </section>

      <section className="article-section">
        <Container className="article-layout">
          <article className="article-content">
            <section aria-labelledby="education-heading">
              <h2 id="education-heading">
                Educational information only
              </h2>
              <p>
                Website content is provided for learning, teaching,
                study, and routine calculation support. It is not
                professional scientific, engineering, medical, legal,
                regulatory, or safety advice.
              </p>
            </section>

            <section aria-labelledby="calculations-heading">
              <h2 id="calculations-heading">
                Calculator results
              </h2>
              <p>
                Results depend on the values, units, assumptions, and
                formulas used. Users should independently verify
                important calculations and confirm that the selected
                model applies to the situation being evaluated.
              </p>
            </section>

            <section aria-labelledby="safety-heading">
              <h2 id="safety-heading">
                Laboratory and classroom safety
              </h2>
              <p>
                Nothing on this website replaces qualified supervision,
                risk assessment, institutional procedures, equipment
                instructions, chemical safety documentation, or local
                rules and regulations.
              </p>
            </section>

            <section aria-labelledby="accuracy-heading">
              <h2 id="accuracy-heading">
                Accuracy and availability
              </h2>
              <p>
                We aim to provide accurate and useful resources, but
                errors, omissions, software defects, interruptions, or
                outdated information may occur. Content may be revised
                without notice.
              </p>
            </section>

            <section aria-labelledby="related-heading">
              <h2 id="related-heading">
                Related policies and resources
              </h2>
              <p>
                Learn more about our{" "}
                <Link href="/editorial-policy">
                  editorial standards
                </Link>
                , review the{" "}
                <Link href="/terms-of-use">
                  terms of use
                </Link>
                , or explore our{" "}
                <Link href="/calculators">
                  science calculators
                </Link>
                .
              </p>
            </section>

            <section aria-labelledby="external-heading">
              <h2 id="external-heading">
                External resources
              </h2>
              <p>
                References or links to third-party resources do not
                guarantee their accuracy, availability, security, or
                suitability. Third-party services operate under their
                own policies and terms.
              </p>
            </section>
          </article>

          <aside className="article-sidebar">
            <div className="sidebar-card">
              <p className="sidebar-card__label">Before use</p>
              <h2>Check critical work</h2>
              <ul>
                <li>Confirm the formula applies</li>
                <li>Verify values and units</li>
                <li>Review rounding requirements</li>
                <li>Follow qualified safety guidance</li>
                <li>Use professional review where required</li>
              </ul>
            </div>
          </aside>
        </Container>
      </section>
    </main>
  );
}
