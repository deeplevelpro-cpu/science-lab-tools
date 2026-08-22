
import { absoluteUrl } from "./url";

type CollectionCalculator = {
  name: string;
  slug: string;
};

type CollectionSchemaInput = {
  name: string;
  description: string;
  path: string;
  calculators: readonly CollectionCalculator[];
};

export function createCollectionSchema({
  name,
  description,
  path,
  calculators,
}: CollectionSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url: absoluteUrl(path),

    mainEntity: {
      "@type": "ItemList",
      numberOfItems: calculators.length,
      itemListElement: calculators.map(
        (calculator, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: calculator.name,
          url: absoluteUrl(
            `/calculators/${calculator.slug}`,
          ),
        }),
      ),
    },
  };
}
