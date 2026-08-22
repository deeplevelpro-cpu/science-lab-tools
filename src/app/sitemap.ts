import type { MetadataRoute } from "next";

import { calculators } from "@/content/calculators/registry";
import { absoluteUrl } from "@/lib/seo/url";


export default function sitemap(): MetadataRoute.Sitemap {
  const calculatorPages = calculators.map(
    (calculator) => ({
      url: absoluteUrl(calculator.href),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    }),
  );

  return [
    {
      url: absoluteUrl("/"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/about"),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: absoluteUrl("/editorial-policy"),
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: absoluteUrl("/disclaimer"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: absoluteUrl("/privacy-policy"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: absoluteUrl("/terms-of-use"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: absoluteUrl("/calculators"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/calculators/physics"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/calculators/chemistry"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/calculators/laboratory"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...calculatorPages,
  ];
}
