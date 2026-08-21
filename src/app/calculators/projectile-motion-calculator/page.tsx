import type { Metadata } from "next";
import Link from "next/link";

import { ProjectileMotionCalculator } from "@/components/calculators/projectile-motion-calculator";
import { CalculatorTrustPanel } from "@/components/calculator-trust";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";
import { createCalculatorSchema } from "@/lib/seo/calculator-schema";

const pageTitle = "Projectile Motion Calculator";

const pageDescription =
  "Calculate projectile range, maximum height, flight time, and motion components from launch speed, angle, and gravity with step-by-step results.";

const pagePath =
  "/calculators/projectile-motion-calculator";

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

const calculatorSchema = createCalculatorSchema({
  name: pageTitle,
  description: pageDescription,
  slug: "projectile-motion-calculator",
  category: "Physics",
});

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
      name: "Calculators",
      item: absoluteUrl("/calculators"),
    },
    {
      "@type": "ListItem",
      position: 3,
      name: pageTitle,
      item: absoluteUrl(pagePath),
    },
  ],
};

export default function ProjectileMotionCalculatorPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(calculatorSchema).replace(
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

      <section className="tool-page-hero">
        <Container>
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <ol>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/calculators">Calculators</Link>
              </li>
              <li aria-current="page">
                Projectile Motion Calculator
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">Two-dimensional motion tool</p>
            <h1>Projectile Motion Calculator</h1>
            <p>
              Calculate range, maximum height, flight time,
              and velocity components from launch speed,
              launch angle, and gravity.
            </p>
          </div>
        </Container>
      </section>

      <section
        className="tool-section"
        aria-label="Projectile motion calculator"
      >
        <Container>
          <ProjectileMotionCalculator />
        </Container>
      </section>

      <section className="article-section">
        <Container className="article-layout">
          <article className="article-content">
            <section aria-labelledby="formula-heading">
              <p className="eyebrow">Physics formula</p>
              <h2 id="formula-heading">
                How projectile motion is calculated
              </h2>
              <p>
                Projectile motion combines constant horizontal
                velocity with vertical acceleration caused by
                gravity. The launch velocity is resolved into
                horizontal and vertical components before range,
                height, and flight time are calculated.
              </p>
              <p>
                The standard model assumes negligible air
                resistance and equal launch and landing heights.
                Real-world results can differ when drag, wind,
                or elevation changes are significant.
              </p>
            </section>

            <section aria-labelledby="related-heading">
              <h2 id="related-heading">
                Related motion calculators
              </h2>
              <p>
                Study vertical motion independently with the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/free-fall-calculator"
                >
                  Free Fall Calculator
                </Link>
                .
              </p>
              <p>
                Calculate changes in velocity with the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/acceleration-calculator"
                >
                  Acceleration Calculator
                </Link>
                .
              </p>
            </section>
          </article>
        </Container>
        <Container>
          <CalculatorTrustPanel subject="physics" />
        </Container>
      </section>
    </main>
  );
}
