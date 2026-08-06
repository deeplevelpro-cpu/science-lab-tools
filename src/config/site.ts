const fallbackUrl = "https://www.sciencecalchub.org";

function normalizeUrl(value: string): string {
  return value.replace(/\/+$/, "");
}

export const siteConfig = {
  name: "Science Lab Tools",
  shortName: "Lab Tools",
  description:
    "Accurate science calculators, laboratory report templates, worksheets, and practical learning resources for students and teachers.",
  url: normalizeUrl(process.env.NEXT_PUBLIC_SITE_URL ?? fallbackUrl),
  locale: "en_US",
  language: "en",
  creator: "Science Lab Tools Editorial Team",
  categories: [
    {
      name: "Lab Calculators",
      description:
        "Interactive chemistry, physics, and laboratory calculation tools.",
      href: "/calculators",
    },
    {
      name: "Lab Reports",
      description:
        "Templates and guidance for planning and writing laboratory reports.",
      href: "/lab-reports",
    },
    {
      name: "Scientific Method",
      description:
        "Resources for hypotheses, variables, observations, and experiments.",
      href: "/scientific-method",
    },
    {
      name: "Templates",
      description:
        "Printable laboratory worksheets, data tables, and report templates.",
      href: "/templates",
    },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
