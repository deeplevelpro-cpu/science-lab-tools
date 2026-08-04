import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";

const pageTitle = "Lab Report Format | Sections & Examples";
const pageDescription =
  "Learn the standard lab report format and the correct order, purpose, and content of each section, from title and introduction to results, discussion, and conclusion.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/lab-reports/lab-report-format",
  },
  openGraph: {
    title: `${pageTitle} | ${siteConfig.name}`,
    description: pageDescription,
    type: "article",
    url: absoluteUrl("/lab-reports/lab-report-format"),
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
    question: "What is the correct order of a lab report?",
    answer:
      "A common order is title, introduction, objective or hypothesis, materials and methods, results, discussion, conclusion, references, and appendices when required.",
  },
  {
    question: "Does every lab report use the same format?",
    answer:
      "The main scientific sections are usually similar, but exact requirements may vary by subject, instructor, institution, or publication style.",
  },
  {
    question: "Where should calculations appear?",
    answer:
      "Important calculated results normally appear in the results section. Detailed sample calculations may be included there or in an appendix when required.",
  },
  {
    question: "Where should experimental errors be discussed?",
    answer:
      "Experimental limitations, anomalous results, uncertainty, and realistic improvements normally belong in the discussion section.",
  },
] as const;

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: pageTitle,
  description: pageDescription,
  url: absoluteUrl("/lab-reports/lab-report-format"),
  mainEntityOfPage: absoluteUrl(
    "/lab-reports/lab-report-format",
  ),
  author: {
    "@type": "Organization",
    name: siteConfig.name,
  },
  publisher: {
    "@type": "Organization",
    name: siteConfig.name,
  },
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

const reportSections = [
  {
    number: "01",
    title: "Title",
    purpose:
      "Identify the investigation precisely and communicate its main variables or scientific relationship.",
    include:
      "A concise description of the system, material, variables, or process investigated.",
    avoid:
      "General titles such as Science Experiment or Chemistry Lab.",
  },
  {
    number: "02",
    title: "Introduction",
    purpose:
      "Provide the scientific background needed to understand the investigation.",
    include:
      "Relevant principles, definitions, objective, research question, and hypothesis when required.",
    avoid:
      "Unrelated textbook information or a detailed description of the procedure.",
  },
  {
    number: "03",
    title: "Materials and Methods",
    purpose:
      "Explain what was used and how the investigation was performed.",
    include:
      "Equipment, quantities, variables, conditions, procedural steps, repetitions, and safety details.",
    avoid:
      "Interpretation of results or statements about whether the experiment worked.",
  },
  {
    number: "04",
    title: "Results",
    purpose:
      "Present the observations, measurements, and calculations produced by the investigation.",
    include:
      "Tables, graphs, qualitative observations, processed values, units, and appropriate significant figures.",
    avoid:
      "Lengthy explanations about why the results occurred.",
  },
  {
    number: "05",
    title: "Discussion",
    purpose:
      "Interpret the evidence and evaluate the investigation.",
    include:
      "Patterns, scientific explanations, hypothesis evaluation, anomalies, limitations, and improvements.",
    avoid:
      "Repeating every value from the results section without interpretation.",
  },
  {
    number: "06",
    title: "Conclusion",
    purpose:
      "Answer the research question using the most important evidence.",
    include:
      "The principal finding, relevant evidence, and a direct statement about the hypothesis or objective.",
    avoid:
      "New data, new scientific theories, or unsupported claims.",
  },
  {
    number: "07",
    title: "References and Appendices",
    purpose:
      "Document information sources and provide supporting material when necessary.",
    include:
      "Citations, raw data, extended calculations, risk assessments, or supplementary figures when required.",
    avoid:
      "Material that should have appeared in the main report.",
  },
] as const;

export default function LabReportFormatPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema).replace(
            /</g,
            "\\u003c",
          ),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
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
                <Link href="/lab-reports">Lab Reports</Link>
              </li>
              <li aria-current="page">Lab Report Format</li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">Scientific report structure</p>
            <h1>Lab Report Format</h1>
            <p>
              Understand the correct order and purpose of every major
              section in a scientific laboratory report.
            </p>
          </div>
        </Container>
      </section>

      <section className="article-section">
        <Container className="article-layout">
          <article className="article-content">
            <section aria-labelledby="format-overview">
              <p className="eyebrow">Overview</p>
              <h2 id="format-overview">
                What is the standard lab report format?
              </h2>

              <p>
                A lab report format is an organized framework for
                recording an investigation. Each section performs a
                different scientific function, from explaining the
                purpose of the experiment to presenting evidence and
                evaluating conclusions.
              </p>

              <p>
                Exact requirements may vary, but most student and
                academic laboratory reports use a recognizable
                sequence of introduction, method, results,
                interpretation, and conclusion.
              </p>

              <div className="formula-card">
                <p>
                  Standard sequence
                  <span>
                    Title → Introduction → Methods → Results →
                    Discussion → Conclusion
                  </span>
                </p>
              </div>
            </section>

            <section aria-labelledby="section-guide">
              <p className="eyebrow">Section-by-section guide</p>
              <h2 id="section-guide">
                Purpose and content of each report section
              </h2>

              <div className="report-format-list">
                {reportSections.map((section) => (
                  <section
                    className="report-format-card"
                    key={section.number}
                    aria-labelledby={`report-section-${section.number}`}
                  >
                    <span className="report-format-card__number">
                      {section.number}
                    </span>

                    <div>
                      <h3 id={`report-section-${section.number}`}>
                        {section.title}
                      </h3>

                      <dl>
                        <div>
                          <dt>Purpose</dt>
                          <dd>{section.purpose}</dd>
                        </div>
                        <div>
                          <dt>Include</dt>
                          <dd>{section.include}</dd>
                        </div>
                        <div>
                          <dt>Avoid</dt>
                          <dd>{section.avoid}</dd>
                        </div>
                      </dl>
                    </div>
                  </section>
                ))}
              </div>
            </section>

            <section aria-labelledby="results-discussion">
              <p className="eyebrow">Important distinction</p>
              <h2 id="results-discussion">
                Results versus discussion
              </h2>

              <p>
                The results section reports what was observed or
                calculated. The discussion explains why those results
                matter and how they relate to the investigation
                question.
              </p>

              <div className="comparison-grid">
                <div className="comparison-card">
                  <p className="comparison-card__label">Results</p>
                  <h3>Present the evidence</h3>
                  <ul>
                    <li>Measurements and observations</li>
                    <li>Tables and graphs</li>
                    <li>Calculated values</li>
                    <li>Important patterns</li>
                  </ul>
                </div>

                <div className="comparison-card">
                  <p className="comparison-card__label">Discussion</p>
                  <h3>Interpret the evidence</h3>
                  <ul>
                    <li>Scientific explanation</li>
                    <li>Hypothesis evaluation</li>
                    <li>Anomalies and uncertainty</li>
                    <li>Limitations and improvements</li>
                  </ul>
                </div>
              </div>
            </section>

            <section aria-labelledby="formatting-rules">
              <p className="eyebrow">Presentation</p>
              <h2 id="formatting-rules">
                Basic scientific formatting rules
              </h2>

              <ul className="article-list">
                <li>
                  Use descriptive headings for each major section.
                </li>
                <li>
                  Number and title tables and figures consistently.
                </li>
                <li>
                  Label every measured variable with the correct unit.
                </li>
                <li>
                  Use consistent decimal places and significant
                  figures.
                </li>
                <li>
                  Define abbreviations before using them repeatedly.
                </li>
                <li>
                  Cite scientific information taken from other
                  sources.
                </li>
                <li>
                  Follow any additional formatting instructions
                  provided by the instructor.
                </li>
              </ul>
            </section>

            <section aria-labelledby="related-guide">
              <p className="eyebrow">Related resource</p>
              <h2 id="related-guide">
                Follow the complete writing process
              </h2>

              <p>
                The format explains where information belongs. The
                complete guide explains how to plan, draft, evaluate,
                and edit every section.
              </p>

              <p>
                <Link
                  className="article-inline-link"
                  href="/lab-reports/how-to-write-a-lab-report"
                >
                  Read How to Write a Lab Report
                </Link>
                .
              </p>
            </section>

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">Questions and answers</p>
              <h2 id="faq-heading">Lab report format FAQ</h2>

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
                Standard order
              </p>
              <h2>Report sections</h2>
              <ol>
                <li>Title</li>
                <li>Introduction</li>
                <li>Objective or hypothesis</li>
                <li>Materials and methods</li>
                <li>Results</li>
                <li>Discussion</li>
                <li>Conclusion</li>
                <li>References</li>
              </ol>
            </div>

            <div className="sidebar-card">
              <p className="sidebar-card__label">
                Data analysis
              </p>
              <h2>Compare measured values</h2>
              <Link
                className="article-inline-link"
                href="/calculators/percent-difference-calculator"
              >
                Open Percent Difference Calculator
              </Link>
            </div>
          </aside>
        </Container>
      </section>
    </main>
  );
}
