import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";

const pageTitle = "About Science Lab Tools";
const pageDescription =
  "Learn how Science Lab Tools creates formula-checked calculators, laboratory guides, worksheets, and practical educational resources for science learning.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: `${pageTitle} | ${siteConfig.name}`,
    description: pageDescription,
    type: "website",
    url: absoluteUrl("/about"),
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

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: pageTitle,
  description: pageDescription,
  url: absoluteUrl("/about"),
  mainEntity: {
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
  },
};

export default function AboutPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aboutSchema).replace(
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
              <li aria-current="page">About</li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">Our purpose and standards</p>
            <h1>About Science Lab Tools</h1>
            <p>
              We create practical science calculators, laboratory
              resources, and learning guides that explain both the
              answer and the scientific reasoning behind it.
            </p>
          </div>
        </Container>
      </section>

      <section className="article-section">
        <Container className="article-layout">
          <article className="article-content">
            <section aria-labelledby="mission-heading">
              <p className="eyebrow">Our mission</p>
              <h2 id="mission-heading">
                Make scientific work clearer and more useful
              </h2>
              <p>
                Science Lab Tools is designed for students, teachers,
                homeschool families, and independent learners who need
                accurate calculations and clear educational guidance.
              </p>
              <p>
                Our resources connect formulas, variables, units,
                working steps, laboratory practice, and interpretation
                so users can understand how a result is produced.
              </p>
            </section>

            <section aria-labelledby="resources-heading">
              <p className="eyebrow">What we publish</p>
              <h2 id="resources-heading">
                Calculators, guides, and printable resources
              </h2>
              <p>
                The website includes physics and chemistry calculators,
                laboratory-report guidance, scientific-method lessons,
                data-analysis resources, and printable classroom
                templates.
              </p>
              <p>
                Explore the{" "}
                <Link href="/calculators">science calculators</Link>,{" "}
                <Link href="/lab-reports">lab-report guides</Link>,{" "}
                <Link href="/scientific-method">
                  scientific-method resources
                </Link>
                , and{" "}
                <Link href="/templates">printable templates</Link>.
              </p>
            </section>

            <section aria-labelledby="standards-heading">
              <p className="eyebrow">Quality standards</p>
              <h2 id="standards-heading">
                How we approach accuracy
              </h2>
              <p>
                Calculator logic is checked against documented formulas
                and representative test cases. Educational pages are
                structured around established scientific concepts,
                standard terminology, and practical learning needs.
              </p>
              <p>
                We also review page metadata, internal links,
                accessibility, production performance, and live-page
                behavior as part of the publishing workflow.
              </p>
            </section>

            <section aria-labelledby="limitations-heading">
              <p className="eyebrow">Responsible use</p>
              <h2 id="limitations-heading">
                Educational support, not professional supervision
              </h2>
              <p>
                These resources support learning and routine
                calculations. They do not replace qualified laboratory
                supervision, institutional procedures, manufacturer
                instructions, professional engineering judgment, or
                safety requirements.
              </p>
            </section>
          </article>

          <aside className="article-sidebar">
            <div className="sidebar-card">
              <p className="sidebar-card__label">
                Transparency
              </p>
              <h2>How to evaluate our content</h2>
              <ul>
                <li>Review the stated formula and units</li>
                <li>Check assumptions before using a result</li>
                <li>Compare critical work with trusted references</li>
                <li>Follow laboratory and classroom safety rules</li>
              </ul>
            </div>
          </aside>
        </Container>
      </section>
    </main>
  );
}
