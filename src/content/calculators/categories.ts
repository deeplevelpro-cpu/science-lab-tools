export type CalculatorCategory = {
  slug: string;
  name: string;
  category: "Laboratory" | "Chemistry" | "Physics";
  description: string;
  keywords: readonly string[];
};

export const calculatorCategories: readonly CalculatorCategory[] = [
  {
    slug: "physics",
    name: "Physics Calculators",
    category: "Physics",
    description:
      "Solve physics problems involving motion, forces, energy, momentum, rotation, and measurement using accurate educational calculators.",
    keywords: [
      "physics calculators",
      "physics formulas",
      "mechanics calculators",
      "energy calculators",
    ],
  },
  {
    slug: "chemistry",
    name: "Chemistry Calculators",
    category: "Chemistry",
    description:
      "Calculate chemistry values including concentration, reactions, molecular quantities, gas laws, and chemical formulas.",
    keywords: [
      "chemistry calculators",
      "chemistry formulas",
      "stoichiometry calculator",
      "molarity calculator",
    ],
  },
  {
    slug: "laboratory",
    name: "Laboratory Calculators",
    category: "Laboratory",
    description:
      "Use laboratory calculators for measurements, uncertainty, statistics, error analysis, and scientific data processing.",
    keywords: [
      "laboratory calculators",
      "measurement calculators",
      "scientific calculators",
      "error analysis",
    ],
  },
];
