"use client";

import { useMemo, useState } from "react";

import type { CalculatorDefinition } from "@/content/calculators/registry";

import { CalculatorCard } from "./calculator-card";

type SortOption = "name-asc" | "name-desc" | "newest";

type CalculatorDirectoryProps = {
  calculators: readonly CalculatorDefinition[];
};

const categories = [
  "All",
  "Laboratory",
  "Chemistry",
  "Physics",
] as const;

export function CalculatorDirectory({
  calculators,
}: CalculatorDirectoryProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] =
    useState<(typeof categories)[number]>("All");
  const [sort, setSort] = useState<SortOption>("name-asc");

  const visibleCalculators = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    const filtered = calculators.filter((calculator) => {
      const matchesCategory =
        category === "All" ||
        calculator.category === category;

      const searchableText = [
        calculator.name,
        calculator.shortDescription,
        calculator.category,
        ...calculator.keywords,
      ]
        .join(" ")
        .toLowerCase();

      return (
        matchesCategory &&
        (!normalizedQuery ||
          searchableText.includes(normalizedQuery))
      );
    });

    return [...filtered].sort((a, b) => {
      if (sort === "name-desc") {
        return b.name.localeCompare(a.name);
      }

      if (sort === "newest") {
        return calculators.indexOf(b) - calculators.indexOf(a);
      }

      return a.name.localeCompare(b.name);
    });
  }, [calculators, category, query, sort]);

  return (
    <div className="calculator-directory">
      <div
        className="calculator-directory-controls"
        aria-label="Calculator directory controls"
      >
        <div className="calculator-directory-search">
          <label htmlFor="calculator-search">
            Search calculators
          </label>
          <input
            id="calculator-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by calculator, formula, or topic"
          />
        </div>

        <div className="calculator-directory-sort">
          <label htmlFor="calculator-sort">Sort by</label>
          <select
            id="calculator-sort"
            value={sort}
            onChange={(event) =>
              setSort(event.target.value as SortOption)
            }
          >
            <option value="name-asc">Name: A–Z</option>
            <option value="name-desc">Name: Z–A</option>
            <option value="newest">Recently added</option>
          </select>
        </div>
      </div>

      <div
        className="calculator-directory-filters"
        aria-label="Filter calculators by subject"
      >
        {categories.map((item) => (
          <button
            type="button"
            key={item}
            aria-pressed={category === item}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <p className="calculator-directory-count" aria-live="polite">
        {visibleCalculators.length}{" "}
        {visibleCalculators.length === 1
          ? "calculator"
          : "calculators"}{" "}
        found
      </p>

      {visibleCalculators.length ? (
        <div className="calculator-directory-grid">
          {visibleCalculators.map((calculator) => (
            <CalculatorCard
              key={calculator.slug}
              calculator={calculator}
            />
          ))}
        </div>
      ) : (
        <div className="calculator-directory-empty">
          <h3>No calculators found</h3>
          <p>
            Try another search term or select a different
            subject.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory("All");
              setSort("name-asc");
            }}
          >
            Clear search and filters
          </button>
        </div>
      )}
    </div>
  );
}
