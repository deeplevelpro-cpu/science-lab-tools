import type { Metadata } from "next";

import { CalculatorCategoryPage } from "@/components/calculator-directory";
import { calculatorCategories } from "@/content/calculators/categories";
import { getCategoryCalculators } from "@/content/calculators/get-category-calculators";
import { calculators } from "@/content/calculators/registry";
import { absoluteUrl } from "@/lib/seo/url";
import { createCollectionSchema } from "@/lib/seo/collection-schema";

const category = calculatorCategories.find(
  (item) => item.slug === "laboratory",
)!;

const pagePath = "/calculators/laboratory";

export const metadata: Metadata = {
  title: `${category.name} | Science Lab Tools`,
  description: category.description,
  alternates: {
    canonical: pagePath,
  },
  openGraph: {
    title: category.name,
    description: category.description,
    type: "website",
    url: absoluteUrl(pagePath),
  },
  robots: {
    index: true,
    follow: true,
  },
};

const categoryCalculators = getCategoryCalculators(
  calculators,
  category.category,
);

const categorySchema = createCollectionSchema({
  name: category.name,
  description: category.description,
  path: pagePath,
  calculators: categoryCalculators,
});

export default function LaboratoryCalculatorsPage() {
  const laboratoryCalculators = categoryCalculators;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(categorySchema).replace(
            /</g,
            "\\u003c",
          ),
        }}
      />

      <CalculatorCategoryPage
        category={category}
        calculators={laboratoryCalculators}
      />
    </>
  );
}
