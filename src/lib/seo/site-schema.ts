
import { absoluteUrl } from "./url";

export function createSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": absoluteUrl("/#organization"),
        name: "ScienceCalcHub",
        url: absoluteUrl("/"),
        description:
          "Science calculators and educational tools for students, researchers, and laboratory users.",
      },
      {
        "@type": "WebSite",
        "@id": absoluteUrl("/#website"),
        url: absoluteUrl("/"),
        name: "ScienceCalcHub",
        publisher: {
          "@id": absoluteUrl("/#organization"),
        },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate:
              absoluteUrl("/search?q={search_term_string}"),
          },
          "query-input":
            "required name=search_term_string",
        },
      },
    ],
  };
}
