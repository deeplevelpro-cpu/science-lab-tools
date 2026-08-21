import { absoluteUrl } from "./url";

type CalculatorSchemaInput = {
  name: string;
  description: string;
  slug: string;
  category: string;
  relatedCalculators?: {
    name: string;
    href: string;
  }[];
};

export function createCalculatorSchema({
  name,
  description,
  slug,
  category,
  relatedCalculators = [],
}: CalculatorSchemaInput) {
  const url = absoluteUrl(`/calculators/${slug}`);

  return {
    "@context": "https://schema.org",
    "@type": [
      "SoftwareApplication",
      "WebApplication",
    ],
    name,
    description,
    url,
    applicationCategory:
      "EducationalApplication",
    operatingSystem: "Web",
    isAccessibleForFree: true,

    creator: {
      "@type": "Organization",
      name: "Science Lab Tools",
      url: absoluteUrl("/"),
    },

    publisher: {
      "@type": "Organization",
      name: "Science Lab Tools",
      url: absoluteUrl("/"),
    },

    about: {
      "@type": "Thing",
      name: `${category} calculator`,
    },

    ...(relatedCalculators.length > 0 && {
      isRelatedTo: {
        "@type": "ItemList",
        itemListElement: relatedCalculators.map(
          (calculator, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: calculator.name,
            url: absoluteUrl(calculator.href),
          }),
        ),
      },
    }),
  };
}

export function createCalculatorBreadcrumbSchema({
  name,
  slug,
  category,
}: {
  name: string;
  slug: string;
  category: string;
}) {
  return {
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
        name: category,
        item: absoluteUrl(
          `/calculators/${category.toLowerCase()}`,
        ),
      },
      {
        "@type": "ListItem",
        position: 4,
        name,
        item: absoluteUrl(
          `/calculators/${slug}`,
        ),
      },
    ],
  };
}
