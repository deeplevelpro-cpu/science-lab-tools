import type { Metadata } from "next";
import Link from "next/link";

import { FreeFallCalculator } from "@/components/calculators/free-fall-calculator";
import { CalculatorTrustPanel } from "@/components/calculator-trust";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";

const pageTitle = "Free Fall Calculator";

const pageDescription =
  "Calculate free-fall time, distance, and final velocity from height or time using tested equations, SI units, worked examples, and clear assumptions.";

const pagePath =
  "/calculators/free-fall-calculator";

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

const faqItems = [
  {
    question:
      "What equations does the free fall calculator use?",
    answer:
      "For an object released from rest, the calculator uses h = ½gt² for distance, v = gt for velocity from time, t = √(2h/g) for time from height, and v = √(2gh) for velocity from height.",
  },
  {
    question:
      "What gravity value should I use for Earth?",
    answer:
      "The calculator defaults to standard gravity, exactly 9.80665 meters per second squared. A classroom problem may instead specify 9.81 or 9.8 meters per second squared.",
  },
  {
    question:
      "Does this calculator include air resistance?",
    answer:
      "No. It models ideal free fall with constant gravity and no aerodynamic drag. Real objects may fall more slowly, especially when drag is significant.",
  },
  {
    question:
      "Why must I enter either height or time, but not both?",
    answer:
      "Height mode calculates fall time and final velocity from the entered distance. Time mode calculates distance and final velocity from elapsed time. One starting value keeps the selected calculation unambiguous.",
  },
  {
    question:
      "Can I calculate free fall on the Moon?",
    answer:
      "Yes. Enter a suitable lunar gravitational acceleration, such as approximately 1.62 meters per second squared. The same ideal equations apply when gravity is treated as constant.",
  },
];

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: pageTitle,
  description: pageDescription,
  url: absoluteUrl(pagePath),
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

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

export default function FreeFallCalculatorPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            webApplicationSchema,
          ).replace(/</g, "\\u003c"),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema,
          ).replace(/</g, "\\u003c"),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(
            /</g,
            "\\u003c",
          ),
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
                Free Fall Calculator
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">
              Gravity and motion tool
            </p>
            <h1>Free Fall Calculator</h1>
            <p>
              Calculate falling distance, final velocity,
              or fall time for an object released from
              rest under constant gravity.
            </p>
          </div>
        </Container>
      </section>

      <section
        className="tool-section"
        aria-label="Free fall calculator"
      >
        <Container>
          <FreeFallCalculator />
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
                What is free fall?
              </h2>
              <p>
                Free fall is motion in which gravity is
                the only significant force acting on an
                object. The object accelerates downward
                whether it is moving downward, moving
                upward, or momentarily at rest.
              </p>
              <p>
                This calculator models an object released
                from rest. Its initial velocity is
                therefore zero, and gravitational
                acceleration is treated as constant
                throughout the fall.
              </p>
            </section>

            <section aria-labelledby="formula-heading">
              <p className="eyebrow">Equations</p>
              <h2 id="formula-heading">
                Free-fall formulas from rest
              </h2>

              <div className="formula-card">
                <p>
                  Distance from time
                  <span>h = ½gt²</span>
                </p>
              </div>

              <div className="formula-card">
                <p>
                  Velocity from time
                  <span>v = gt</span>
                </p>
              </div>

              <div className="formula-card">
                <p>
                  Time from height
                  <span>t = √(2h ÷ g)</span>
                </p>
              </div>

              <div className="formula-card">
                <p>
                  Velocity from height
                  <span>v = √(2gh)</span>
                </p>
              </div>

              <ul className="article-list">
                <li>
                  <strong>h</strong> is vertical falling
                  distance in metres.
                </li>
                <li>
                  <strong>t</strong> is elapsed time in
                  seconds.
                </li>
                <li>
                  <strong>v</strong> is final speed in
                  metres per second.
                </li>
                <li>
                  <strong>g</strong> is positive
                  gravitational acceleration in metres
                  per second squared.
                </li>
              </ul>
            </section>

            <section aria-labelledby="height-example-heading">
              <p className="eyebrow">
                Worked example
              </p>
              <h2 id="height-example-heading">
                Fall time and velocity from a 20 m height
              </h2>
              <p>
                Suppose an object is released from rest
                20 metres above the ground using standard
                gravity of 9.80665 m/s².
              </p>

              <ol className="calculation-steps">
                <li>
                  Calculate time:{" "}
                  <strong>
                    t = √((2 × 20) ÷ 9.80665)
                  </strong>.
                </li>
                <li>
                  The fall time is approximately{" "}
                  <strong>2.019 seconds</strong>.
                </li>
                <li>
                  Calculate final velocity:{" "}
                  <strong>
                    v = √(2 × 9.80665 × 20)
                  </strong>.
                </li>
                <li>
                  The final speed is approximately{" "}
                  <strong>19.806 m/s</strong>.
                </li>
              </ol>
            </section>

            <section aria-labelledby="time-example-heading">
              <p className="eyebrow">
                Second worked example
              </p>
              <h2 id="time-example-heading">
                Distance and velocity after 2 seconds
              </h2>

              <ol className="calculation-steps">
                <li>
                  Calculate distance:{" "}
                  <strong>
                    h = ½ × 9.80665 × 2²
                  </strong>.
                </li>
                <li>
                  The object falls approximately{" "}
                  <strong>19.613 m</strong>.
                </li>
                <li>
                  Calculate final velocity:{" "}
                  <strong>
                    v = 9.80665 × 2
                  </strong>.
                </li>
                <li>
                  The final speed is approximately{" "}
                  <strong>19.613 m/s</strong>.
                </li>
              </ol>
            </section>

            <section aria-labelledby="gravity-heading">
              <p className="eyebrow">
                Standard gravity
              </p>
              <h2 id="gravity-heading">
                Which gravity value should you use?
              </h2>
              <p>
                Standard acceleration of gravity is
                exactly 9.80665 m/s². Many classroom
                problems round this value to 9.81 m/s²
                or 9.8 m/s².
              </p>
              <p>
                Use the value specified by your
                assignment or experiment. For another
                world, enter an appropriate local gravity
                value; for example, lunar surface gravity
                is commonly approximated as 1.62 m/s².
              </p>
            </section>

            <section aria-labelledby="units-heading">
              <p className="eyebrow">Units</p>
              <h2 id="units-heading">
                Use consistent SI units
              </h2>
              <ul className="article-list">
                <li>Enter height in metres.</li>
                <li>Enter fall time in seconds.</li>
                <li>
                  Enter gravity in metres per second
                  squared.
                </li>
                <li>
                  Read final velocity in metres per
                  second.
                </li>
                <li>
                  Convert centimetres, feet, or other
                  units before calculating.
                </li>
              </ul>
            </section>

            <section aria-labelledby="limitations-heading">
              <p className="eyebrow">
                Assumptions and limitations
              </p>
              <h2 id="limitations-heading">
                When these free-fall equations apply
              </h2>
              <ul className="article-list">
                <li>
                  The object is released from rest, so
                  its initial velocity is zero.
                </li>
                <li>
                  Gravity is constant over the falling
                  distance.
                </li>
                <li>
                  Air resistance, buoyancy, wind, and
                  other forces are ignored.
                </li>
                <li>
                  Height and time inputs must be positive.
                </li>
                <li>
                  The result is an ideal model and may not
                  match a real atmospheric fall.
                </li>
              </ul>
              <p>
                Air resistance becomes important for
                objects with a large area, low mass, or
                long falling distance. A drag model is
                required when those effects cannot be
                neglected.
              </p>
            </section>

            <section aria-labelledby="references-heading">
              <p className="eyebrow">
                Scientific references
              </p>
              <h2 id="references-heading">
                Sources and further reading
              </h2>
              <ul className="article-list">
                <li>
                  <a
                    className="article-inline-link"
                    href="https://physics.nist.gov/cgi-bin/cuu/Value?gn="
                    target="_blank"
                    rel="noreferrer"
                  >
                    NIST CODATA: standard acceleration
                    of gravity
                  </a>
                </li>
                <li>
                  <a
                    className="article-inline-link"
                    href="https://openstax.org/books/university-physics-volume-1/pages/3-5-free-fall"
                    target="_blank"
                    rel="noreferrer"
                  >
                    OpenStax University Physics:
                    Free Fall
                  </a>
                </li>
                <li>
                  <a
                    className="article-inline-link"
                    href="https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/free-fall-without-air-resistance/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    NASA Glenn: Free Fall Without Air
                    Resistance
                  </a>
                </li>
              </ul>
            </section>

            <section aria-labelledby="related-heading">
              <p className="eyebrow">
                Related tools
              </p>
              <h2 id="related-heading">
                Continue your motion calculations
              </h2>
              <p>
                Estimate local gravity with the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/acceleration-due-to-gravity-calculator"
                >
                  Acceleration Due to Gravity Calculator
                </Link>
                .
              </p>
              <p>
                Solve broader constant-acceleration
                problems with the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/kinematic-equations-calculator"
                >
                  Kinematic Equations Calculator
                </Link>
                .
              </p>
              <p>
                Analyze horizontal and vertical launch
                motion with the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/projectile-motion-calculator"
                >
                  Projectile Motion Calculator
                </Link>
                .
              </p>
            </section>

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">
                Questions and answers
              </p>
              <h2 id="faq-heading">
                Free fall calculator FAQ
              </h2>
              <div className="faq-list">
                {faqItems.map((item) => (
                  <details key={item.question}>
                    <summary>
                      {item.question}
                    </summary>
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
              <h2>Free-fall checklist</h2>
              <ul>
                <li>Assume release from rest</li>
                <li>Enter either height or time</li>
                <li>Choose a positive gravity value</li>
                <li>Use consistent SI units</li>
                <li>Ignore drag only when reasonable</li>
              </ul>
            </div>

            <div className="sidebar-card">
              <p className="sidebar-card__label">
                Key limitation
              </p>
              <h2>Ideal motion model</h2>
              <p>
                Results assume constant gravity and no
                air resistance.
              </p>
              <Link href="/calculators/kinematic-equations-calculator">
                Open Kinematics Calculator
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
