import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";

const pageTitle = "Lab Report Template | Free Science Lab Format";
const pageDescription =
  "Use this structured lab report template to organize the title, introduction, hypothesis, methods, results, discussion, conclusion, and references.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/lab-reports/lab-report-template",
  },
  openGraph: {
    title: `${pageTitle} | ${siteConfig.name}`,
    description: pageDescription,
    type: "article",
    url: absoluteUrl("/lab-reports/lab-report-template"),
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
    question: "What sections are included in this lab report template?",
    answer:
      "The template includes the title, scientific background, objective, research question, hypothesis, variables, materials, methods, results, discussion, conclusion, references, and optional appendices.",
  },
  {
    question: "Can this template be used for every science subject?",
    answer:
      "The general structure works for many biology, chemistry, physics, and general science investigations, but individual instructors may require additional or different sections.",
  },
  {
    question: "Should the template headings remain in the final report?",
    answer:
      "Major scientific section headings should normally remain because they make the report easier to navigate. Instructional prompts should be removed after the report is completed.",
  },
  {
    question: "Where should raw data and calculations appear?",
    answer:
      "Important raw data and calculated values belong in the results section. Extensive raw data or repeated calculations may be placed in an appendix when permitted.",
  },
] as const;

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: pageTitle,
  description: pageDescription,
  url: absoluteUrl("/lab-reports/lab-report-template"),
  mainEntityOfPage: absoluteUrl(
    "/lab-reports/lab-report-template",
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

const templateSections = [
  {
    number: "01",
    title: "Title",
    prompt:
      "Write a concise title that identifies the investigation and its principal variables.",
  },
  {
    number: "02",
    title: "Scientific Background",
    prompt:
      "Explain the scientific concepts, relationships, and equations needed to understand the investigation.",
  },
  {
    number: "03",
    title: "Objective",
    prompt:
      "State what the investigation was designed to determine, compare, measure, or evaluate.",
  },
  {
    number: "04",
    title: "Research Question",
    prompt:
      "Write a focused question that identifies the independent and dependent variables.",
  },
  {
    number: "05",
    title: "Hypothesis",
    prompt:
      "Predict the expected relationship between variables and support the prediction with scientific reasoning.",
  },
  {
    number: "06",
    title: "Variables",
    prompt:
      "Identify the independent variable, dependent variable, and important controlled variables.",
  },
  {
    number: "07",
    title: "Materials and Equipment",
    prompt:
      "List important equipment, substances, quantities, concentrations, capacities, and relevant specifications.",
  },
  {
    number: "08",
    title: "Method",
    prompt:
      "Describe the procedure, conditions, measurements, repeated trials, and safety precautions in logical order.",
  },
  {
    number: "09",
    title: "Results",
    prompt:
      "Present measurements, observations, tables, graphs, calculated values, units, and important patterns.",
  },
  {
    number: "10",
    title: "Discussion",
    prompt:
      "Interpret the results, explain patterns, evaluate the hypothesis, address anomalies, and assess limitations.",
  },
  {
    number: "11",
    title: "Conclusion",
    prompt:
      "Answer the research question using the most important evidence and state whether the hypothesis was supported.",
  },
  {
    number: "12",
    title: "References",
    prompt:
      "List the scientific sources used for background information, methods, equations, or accepted values.",
  },
  {
    number: "13",
    title: "Appendix",
    prompt:
      "Include extensive raw data, extended calculations, risk assessments, or supplementary material when required.",
  },
] as const;

export default function LabReportTemplatePage() {
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
          __html: JSON.stringify(faqSchema).replace(
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
                <Link href="/lab-reports">Lab Reports</Link>
              </li>
              <li aria-current="page">Lab Report Template</li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">Structured writing framework</p>
            <h1>Lab Report Template</h1>
            <p>
              Use this section-by-section framework to plan, draft,
              and review a complete scientific laboratory report.
            </p>
          </div>
        </Container>
      </section>

      <section className="article-section">
        <Container className="article-layout">
          <article className="article-content">
            <section aria-labelledby="template-overview">
              <p className="eyebrow">Overview</p>
              <h2 id="template-overview">
                How to use this lab report template
              </h2>

              <p>
                Complete each section using evidence from your own
                investigation. Replace the prompts with report
                content and remove instructional wording before
                submission.
              </p>

              <p>
                Assignment requirements may differ, so compare this
                structure with the instructions provided by your
                teacher, laboratory manual, or institution.
              </p>
            </section>

            <section aria-labelledby="template-sections">
              <p className="eyebrow">Complete framework</p>
              <h2 id="template-sections">
                Lab report sections
              </h2>

              <div className="report-format-list">
                {templateSections.map((section) => (
                  <section
                    className="report-format-card"
                    key={section.number}
                    aria-labelledby={`template-section-${section.number}`}
                  >
                    <span className="report-format-card__number">
                      {section.number}
                    </span>

                    <div>
                      <h3 id={`template-section-${section.number}`}>
                        {section.title}
                      </h3>
                      <p>{section.prompt}</p>

                      <div className="template-writing-area">
                        <span>Your content</span>
                        <div />
                        <div />
                        <div />
                      </div>
                    </div>
                  </section>
                ))}
              </div>
            </section>

            <section aria-labelledby="review-checklist">
              <p className="eyebrow">Final review</p>
              <h2 id="review-checklist">
                Lab report submission checklist
              </h2>

              <ul className="article-list">
                <li>
                  Confirm that the title identifies the investigation.
                </li>
                <li>
                  Ensure the introduction leads to a clear research
                  question.
                </li>
                <li>
                  Check that the method contains reproducible detail.
                </li>
                <li>
                  Verify that tables, graphs, variables, and units are
                  labeled.
                </li>
                <li>
                  Use appropriate significant figures and rounding.
                </li>
                <li>
                  Separate results from scientific interpretation.
                </li>
                <li>
                  Connect the conclusion directly to the evidence.
                </li>
                <li>
                  Cite all external scientific information.
                </li>
                <li>
                  Remove template prompts before submission.
                </li>
              </ul>
            </section>

            <section aria-labelledby="related-guides">
              <p className="eyebrow">Detailed guidance</p>
              <h2 id="related-guides">
                Learn how to complete each section
              </h2>

              <p>
                Review the complete writing process in{" "}
                <Link
                  className="article-inline-link"
                  href="/lab-reports/how-to-write-a-lab-report"
                >
                  How to Write a Lab Report
                </Link>
                , and confirm the correct section order using the{" "}
                <Link
                  className="article-inline-link"
                  href="/lab-reports/lab-report-format"
                >
                  Lab Report Format guide
                </Link>
                .
              </p>
            </section>

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">Questions and answers</p>
              <h2 id="faq-heading">Lab report template FAQ</h2>

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
                Core report order
              </p>
              <h2>Essential sections</h2>
              <ol>
                <li>Introduction</li>
                <li>Methods</li>
                <li>Results</li>
                <li>Discussion</li>
                <li>Conclusion</li>
                <li>References</li>
              </ol>
            </div>

            <div className="sidebar-card">
              <p className="sidebar-card__label">
                Data presentation
              </p>
              <h2>Format scientific evidence</h2>
              <Link
                className="article-inline-link"
                href="/lab-reports/tables-and-graphs"
              >
                Read Tables and Graphs Guide
              </Link>
            </div>
          </aside>
        </Container>
      </section>
    </main>
  );
}
