import Link from "next/link";
import type { Metadata } from "next";

import { AccelerationDueToGravityCalculator } from "@/components/calculators/acceleration-due-to-gravity-calculator";
import { CalculatorTrustPanel } from "@/components/calculator-trust";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";
import { createCalculatorSchema } from "@/lib/seo/calculator-schema";

const pageTitle =
  "Acceleration Due to Gravity Calculator";

const pageDescription =
  "Calculate gravitational acceleration from the mass and radius of a planet or celestial body using g = GM / r².";

const canonicalPath =
  "/calculators/acceleration-due-to-gravity-calculator";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: canonicalPath,
  },
  openGraph: {
    title: `${pageTitle} | ${siteConfig.name}`,
    description: pageDescription,
    url: absoluteUrl(canonicalPath),
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  twitter: {
    card: "summary_large_image",
    title: `${pageTitle} | ${siteConfig.name}`,
    description: pageDescription,
  },
};

const faqItems = [
  {
    question:
      "What formula calculates acceleration due to gravity?",
    answer:
      "The calculator uses g = GM / r², where G is the universal gravitational constant, M is the mass of the celestial body, and r is the distance from its center.",
  },
  {
    question:
      "What is the acceleration due to gravity on Earth?",
    answer:
      "The standard value near Earth's surface is approximately 9.81 metres per second squared, although the exact value varies slightly with altitude and location.",
  },
  {
    question:
      "Why does gravity decrease with distance?",
    answer:
      "Gravitational acceleration follows an inverse-square relationship, so increasing the distance from the centre reduces gravity in proportion to the square of that distance.",
  },
  {
    question:
      "Can this calculator be used for other planets?",
    answer:
      "Yes. Enter the mass and radius of any planet, moon, star, or other spherical celestial body to estimate its surface gravitational acceleration.",
  },
];

export default function AccelerationDueToGravityCalculatorPage() {
  const calculatorSchema = createCalculatorSchema({
    name: pageTitle,
    description: pageDescription,
    slug: "acceleration-due-to-gravity-calculator",
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
        item: absoluteUrl(canonicalPath),
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(calculatorSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <section className="tool-page-hero">
        <Container>
          <nav
            className="breadcrumbs"
            aria-label="Breadcrumb"
          >
            <ol>
              <li>
                <Link href="/">Home</Link>
              </li>

              <li>
                <Link href="/calculators">
                  Calculators
                </Link>
              </li>

              <li aria-current="page">
                Acceleration Due to Gravity Calculator
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">
              Gravitational physics tool
            </p>

            <h1>
              Acceleration Due to Gravity Calculator
            </h1>

            <p>
              Calculate gravitational acceleration from
              planetary mass and radius using g = GM / r².
            </p>
          </div>
        </Container>
      </section>

      <section
        className="tool-section"
        aria-label="Acceleration due to gravity calculator"
      >
        <Container>
          <AccelerationDueToGravityCalculator />
        </Container>
      </section>

      <section className="article-section">
        <Container className="article-layout">
          <article className="article-content">
            <section aria-labelledby="overview-heading">
              <p className="eyebrow">
                Physics overview
              </p>

              <h2 id="overview-heading">
                What is acceleration due to gravity?
              </h2>

              <p>
                Acceleration due to gravity is the
                acceleration experienced by an object
                because of a body&apos;s gravitational field.
                Near Earth&apos;s surface, its magnitude is
                approximately 9.81 m/s².
              </p>
            </section>

            <section aria-labelledby="formula-heading">
              <p className="eyebrow">Formula</p>

              <h2 id="formula-heading">
                Gravitational acceleration formula
              </h2>

              <div className="formula-card">
                <p>
                  Gravity
                  <span>g = GM ÷ r²</span>
                </p>
              </div>

              <ul className="article-list">
                <li>
                  <strong>g</strong> is gravitational
                  acceleration in m/s².
                </li>
                <li>
                  <strong>G</strong> is the universal
                  gravitational constant.
                </li>
                <li>
                  <strong>M</strong> is the mass of the
                  celestial body in kilograms.
                </li>
                <li>
                  <strong>r</strong> is distance from the
                  body&apos;s centre in metres.
                </li>
              </ul>

              <p>
                <strong>Use consistent SI units:</strong>{" "}
                enter mass in kilograms and radius or distance
                in metres to obtain gravitational acceleration
                in metres per second squared.
              </p>
            </section>

            <section aria-labelledby="example-heading">
              <p className="eyebrow">
                Worked example
              </p>

              <h2 id="example-heading">
                Calculate gravity near Earth&apos;s surface
              </h2>

              <ol className="calculation-steps">
                <li>
                  Use Earth&apos;s mass:
                  <strong> 5.972 × 10²⁴ kg</strong>.
                </li>
                <li>
                  Use Earth&apos;s mean radius:
                  <strong> 6.371 × 10⁶ m</strong>.
                </li>
                <li>
                  Apply <strong>g = GM / r²</strong>.
                </li>
                <li>
                  The result is approximately
                  <strong> 9.82 m/s²</strong>.
                </li>
              </ol>
            </section>

            <section aria-labelledby="distance-heading">
              <p className="eyebrow">
                Distance effect
              </p>

              <h2 id="distance-heading">
                Why gravity changes with altitude
              </h2>

              <p>
                Gravity becomes weaker as distance from a
                planet&apos;s centre increases. Because radius
                is squared in the denominator, even modest
                increases in distance reduce gravitational
                acceleration.
              </p>
            </section>

            <section aria-labelledby="applications-heading">
              <p className="eyebrow">
                Applications
              </p>

              <h2 id="applications-heading">
                Where this calculation is used
              </h2>

              <ul className="article-list">
                <li>Planetary science calculations.</li>
                <li>Satellite and orbital analysis.</li>
                <li>Free-fall and projectile problems.</li>
                <li>Spacecraft mission planning.</li>
                <li>Comparing gravity on planets and moons.</li>
              </ul>
            </section>

            <section aria-labelledby="limitations-heading">
              <p className="eyebrow">
                Model boundaries
              </p>

              <h2 id="limitations-heading">
                Assumptions and limitations
              </h2>

              <p>
                This calculation treats the celestial body as
                spherically symmetric and uses distance from
                the center of mass. It provides a Newtonian
                estimate for common educational and planetary
                calculations.
              </p>

              <ul className="article-list">
                <li>
                  The model does not account for local mass
                  distribution or terrain.
                </li>
                <li>
                  A measured surface value can vary with
                  rotation, latitude, and altitude.
                </li>
                <li>
                  Use the distance from the center, not height
                  above the surface, as radius.
                </li>
              </ul>
            </section>

            <section aria-labelledby="references-heading">
              <p className="eyebrow">
                Scientific references
              </p>

              <h2 id="references-heading">
                Sources for constants and method
              </h2>

              <ul className="article-list">
                <li>
                  <a
                    className="article-inline-link"
                    href="https://physics.nist.gov/cgi-bin/cuu/Value?bg="
                    target="_blank"
                    rel="noreferrer"
                  >
                    NIST CODATA gravitational constant
                  </a>
                </li>
                <li>
                  <a
                    className="article-inline-link"
                    href="https://science.nasa.gov/solar-system/planets/earth/facts/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    NASA Earth facts
                  </a>
                </li>
                <li>
                  <a
                    className="article-inline-link"
                    href="https://openstax.org/books/university-physics-volume-1/pages/13-2-gravitation-near-earths-surface"
                    target="_blank"
                    rel="noreferrer"
                  >
                    OpenStax: gravitation near Earth&apos;s
                    surface
                  </a>
                </li>
              </ul>
            </section>

            <section aria-labelledby="related-heading">
              <p className="eyebrow">
                Related tools
              </p>

              <h2 id="related-heading">
                Continue your gravity analysis
              </h2>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/free-fall-calculator"
                >
                  Free Fall Calculator
                </Link>{" "}
                to calculate falling distance, time, and
                final velocity.
              </p>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/gravitational-potential-energy-calculator"
                >
                  Gravitational Potential Energy Calculator
                </Link>{" "}
                to calculate energy associated with height.
              </p>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/weight-calculator"
                >
                  Weight Calculator
                </Link>{" "}
                to calculate weight from mass and local
                gravitational acceleration.
              </p>
            </section>

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">
                Questions and answers
              </p>

              <h2 id="faq-heading">
                Acceleration due to gravity FAQ
              </h2>

              <div className="faq-list">
                {faqItems.map((item) => (
                  <details key={item.question}>
                    <summary>{item.question}</summary>
                    <p>{item.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          </article>

          <aside className="article-sidebar">
            <div className="sidebar-card">
              <p className="sidebar-card__label">
                Quick reference
              </p>

              <h2>Gravity checklist</h2>

              <ul>
                <li>Enter mass in kilograms</li>
                <li>Enter radius in metres</li>
                <li>Use distance from the centre</li>
                <li>Apply g = GM / r²</li>
                <li>Report acceleration in m/s²</li>
              </ul>
            </div>

            <div className="sidebar-card">
              <p className="sidebar-card__label">
                Related calculator
              </p>

              <h2>Analyze free fall</h2>

              <p>
                Calculate falling time, distance, and
                velocity under constant gravity.
              </p>

              <Link href="/calculators/free-fall-calculator">
                Open Free Fall Calculator
              </Link>
            </div>
          </aside>
        </Container>
        <Container>
          <CalculatorTrustPanel subject="physics" />
        </Container>
      </section>
    </main>
  );
}
