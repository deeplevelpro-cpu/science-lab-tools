import fs from "node:fs";

const fallbackSiteUrl = "http://localhost:3000";

function normalizeSiteUrl(value) {
  return value.replace(/\/+$/, "");
}

const siteUrl = normalizeSiteUrl(
  process.env.NEXT_PUBLIC_SITE_URL ?? fallbackSiteUrl,
);

const requiredRoutes = [
  [".next/server/app/index.html", "Homepage"],
  [".next/server/app/calculators.html", "Calculators"],
  [".next/server/app/scientific-method.html", "Scientific method"],
  [".next/server/app/templates.html", "Templates"],
  [
    ".next/server/app/templates/printable-lab-report-template.html",
    "Printable lab report template",
  ],
  [
    ".next/server/app/templates/scientific-method-worksheet.html",
    "Scientific method worksheet",
  ],
  [
    ".next/server/app/templates/experiment-planning-template.html",
    "Experiment planning template",
  ],
  [
    ".next/server/app/templates/data-table-template.html",
    "Scientific data table template",
  ],
  [
    ".next/server/app/templates/graphing-scientific-data-worksheet.html",
    "Graphing scientific data worksheet",
  ],
  [
    ".next/server/app/templates/variables-worksheet.html",
    "Independent and dependent variables worksheet",
  ],
  [
    ".next/server/app/scientific-method/steps-of-the-scientific-method.html",
    "Scientific method steps guide",
  ],
  [
    ".next/server/app/scientific-method/scientific-question.html",
    "Scientific question guide",
  ],
  [
    ".next/server/app/scientific-method/how-to-write-a-hypothesis.html",
    "Hypothesis guide",
  ],
  [
    ".next/server/app/scientific-method/independent-dependent-controlled-variables.html",
    "Experimental variables guide",
  ],
  [
    ".next/server/app/scientific-method/control-group-and-experimental-group.html",
    "Control and experimental groups guide",
  ],
  [
    ".next/server/app/scientific-method/experimental-design.html",
    "Experimental design guide",
  ],
  [
    ".next/server/app/scientific-method/collect-and-record-data.html",
    "Scientific data collection guide",
  ],
  [
    ".next/server/app/scientific-method/analyze-experimental-results.html",
    "Experimental results analysis guide",
  ],
  [
    ".next/server/app/calculators/percent-error-calculator.html",
    "Percent error calculator",
  ],
  [
    ".next/server/app/calculators/percent-difference-calculator.html",
    "Percent difference calculator",
  ],
  [
    ".next/server/app/calculators/significant-figures-calculator.html",
    "Significant figures calculator",
  ],
  [
    ".next/server/app/calculators/coefficient-variation-calculator.html",
    "Coefficient of variation calculator",
  ],
  [
    ".next/server/app/calculators/mean-median-mode-calculator.html",
    "Mean median mode calculator",
  ],
  [
    ".next/server/app/calculators/standard-deviation-calculator.html",
    "Standard deviation calculator",
  ],
  [
    ".next/server/app/calculators/uncertainty-propagation-calculator.html",
    "Uncertainty propagation calculator",
  ],
  [
    ".next/server/app/calculators/measurement-uncertainty-calculator.html",
    "Measurement uncertainty calculator",
  ],
  [
    ".next/server/app/calculators/rate-of-change-calculator.html",
    "Rate of change calculator",
  ],
  [
    ".next/server/app/calculators/linear-regression-calculator.html",
    "Linear regression calculator",
  ],
  [
    ".next/server/app/calculators/molarity-calculator.html",
    "Molarity calculator",
  ],
  [
    ".next/server/app/calculators/molality-calculator.html",
    "Molality calculator",
  ],
  [
    ".next/server/app/calculators/mass-moles-calculator.html",
    "Mass to moles calculator",
  ],
  [
    ".next/server/app/calculators/dilution-calculator.html",
    "Dilution calculator",
  ],
  [
    ".next/server/app/calculators/force-calculator.html",
    "Force calculator",
  ],
  [
    ".next/server/app/calculators/acceleration-calculator.html",
    "Acceleration calculator",
  ],
  [
    ".next/server/app/calculators/density-calculator.html",
    "Density calculator",
  ],
  [
    ".next/server/app/calculators/specific-heat-calculator.html",
    "Specific heat calculator",
  ],
  [
    ".next/server/app/lab-reports/how-to-write-a-lab-report.html",
    "How to write a lab report guide",
  ],
  [
    ".next/server/app/lab-reports/lab-report-format.html",
    "Lab report format guide",
  ],
  [
    ".next/server/app/lab-reports/lab-report-introduction.html",
    "Lab report introduction guide",
  ],
  [
    ".next/server/app/lab-reports/materials-and-methods.html",
    "Materials and methods guide",
  ],
  [
    ".next/server/app/lab-reports/lab-report-results.html",
    "Lab report results guide",
  ],
  [
    ".next/server/app/lab-reports/lab-report-discussion.html",
    "Lab report discussion guide",
  ],
  [
    ".next/server/app/lab-reports/lab-report-conclusion.html",
    "Lab report conclusion guide",
  ],
  [
    ".next/server/app/lab-reports/significant-figures-in-lab-reports.html",
    "Significant figures guide",
  ],
  [
    ".next/server/app/lab-reports/tables-and-graphs.html",
    "Tables and graphs guide",
  ],
  [
    ".next/server/app/lab-reports/lab-report-template.html",
    "Lab report template",
  ],
];

const placeholderRoutes = [];
let failed = false;

for (const [file, label] of requiredRoutes) {
  if (!fs.existsSync(file)) {
    console.error(`MISSING: ${label} (${file})`);
    failed = true;
  } else {
    console.log(`OK: ${label}`);
  }
}

const homepage = fs.readFileSync(".next/server/app/index.html", "utf8");

const homepageChecks = [
  ['<html lang="en"', "HTML language"],
  ['<meta name="description"', "Meta description"],
  ['application/ld+json', "Organization structured data"],
];

for (const [needle, label] of homepageChecks) {
  if (!homepage.includes(needle)) {
    console.error(`MISSING: ${label}`);
    failed = true;
  } else {
    console.log(`OK: ${label}`);
  }
}

const canonicalMatch = homepage.match(
  /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["'][^>]*>/,
);

if (!canonicalMatch) {
  console.error("MISSING: Homepage canonical");
  failed = true;
} else {
  const canonicalUrl = new URL(canonicalMatch[1]);

  if (
    canonicalUrl.origin !== new URL(siteUrl).origin ||
    canonicalUrl.pathname !== "/"
  ) {
    console.error(`INVALID: Homepage canonical (${canonicalMatch[1]})`);
    failed = true;
  } else {
    console.log(`OK: Homepage canonical (${canonicalMatch[1]})`);
  }
}

const calculatorsHtml = fs.readFileSync(
  ".next/server/app/calculators.html",
  "utf8",
);

if (calculatorsHtml.includes('name="robots" content="noindex')) {
  console.error("INVALID: Calculators directory is noindex");
  failed = true;
} else {
  console.log("OK: Calculators directory is indexable");
}

if (
  !calculatorsHtml.includes(
    'href="/calculators/percent-error-calculator"',
  )
) {
  console.error("MISSING: Calculator directory internal link");
  failed = true;
} else {
  console.log("OK: Calculator directory internal link");
}

for (const [file, label] of placeholderRoutes) {
  const html = fs.readFileSync(file, "utf8");

  if (!html.includes('name="robots" content="noindex, follow"')) {
    console.error(`MISSING NOINDEX: ${label}`);
    failed = true;
  } else {
    console.log(`OK NOINDEX: ${label}`);
  }
}

const calculatorFile =
  ".next/server/app/calculators/percent-error-calculator.html";
const calculatorHtml = fs.readFileSync(calculatorFile, "utf8");

const calculatorChecks = [
  ["Percent Error Calculator", "Calculator title and heading"],
  [
    `href="${siteUrl}/calculators/percent-error-calculator"`,
    "Calculator canonical",
  ],
  ["EducationalApplication", "Web application structured data"],
  ["FAQPage", "FAQ structured data"],
];

for (const [needle, label] of calculatorChecks) {
  if (!calculatorHtml.includes(needle)) {
    console.error(`MISSING: ${label}`);
    failed = true;
  } else {
    console.log(`OK: ${label}`);
  }
}

if (calculatorHtml.includes('name="robots" content="noindex')) {
  console.error("INVALID: Calculator page is noindex");
  failed = true;
} else {
  console.log("OK: Calculator page is indexable");
}

const percentDifferenceFile =
  ".next/server/app/calculators/percent-difference-calculator.html";
const percentDifferenceHtml = fs.readFileSync(
  percentDifferenceFile,
  "utf8",
);

const percentDifferenceChecks = [
  [
    "Percent Difference Calculator",
    "Percent difference title and heading",
  ],
  [
    `href="${siteUrl}/calculators/percent-difference-calculator"`,
    "Percent difference canonical",
  ],
  [
    "EducationalApplication",
    "Percent difference application structured data",
  ],
  ["FAQPage", "Percent difference FAQ structured data"],
  [
    'href="/calculators/percent-error-calculator"',
    "Percent difference internal comparison link",
  ],
];

for (const [needle, label] of percentDifferenceChecks) {
  if (!percentDifferenceHtml.includes(needle)) {
    console.error(`MISSING: ${label}`);
    failed = true;
  } else {
    console.log(`OK: ${label}`);
  }
}

if (
  percentDifferenceHtml.includes(
    'name="robots" content="noindex',
  )
) {
  console.error(
    "INVALID: Percent difference calculator is noindex",
  );
  failed = true;
} else {
  console.log(
    "OK: Percent difference calculator is indexable",
  );
}

const molarityFile =
  ".next/server/app/calculators/molarity-calculator.html";
const molarityHtml = fs.readFileSync(molarityFile, "utf8");

const molarityChecks = [
  ["Molarity Calculator", "Molarity title and heading"],
  [
    `href="${siteUrl}/calculators/molarity-calculator"`,
    "Molarity canonical",
  ],
  [
    "EducationalApplication",
    "Molarity application structured data",
  ],
  ["FAQPage", "Molarity FAQ structured data"],
];

for (const [needle, label] of molarityChecks) {
  if (!molarityHtml.includes(needle)) {
    console.error(`MISSING: ${label}`);
    failed = true;
  } else {
    console.log(`OK: ${label}`);
  }
}

if (molarityHtml.includes('name="robots" content="noindex')) {
  console.error("INVALID: Molarity calculator is noindex");
  failed = true;
} else {
  console.log("OK: Molarity calculator is indexable");
}

const molalityFile =
  ".next/server/app/calculators/molality-calculator.html";
const molalityHtml = fs.readFileSync(molalityFile, "utf8");

const molalityChecks = [
  ["Molality Calculator", "Molality title and heading"],
  [
    `href="${siteUrl}/calculators/molality-calculator"`,
    "Molality canonical",
  ],
  [
    "EducationalApplication",
    "Molality application structured data",
  ],
  ["FAQPage", "Molality FAQ structured data"],
  [
    'href="/calculators/molarity-calculator"',
    "Molality internal molarity link",
  ],
  [
    'href="/calculators/dilution-calculator"',
    "Molality internal dilution link",
  ],
  [
    'href="/calculators/mass-moles-calculator"',
    "Molality internal mass-to-moles link",
  ],
];

for (const [needle, label] of molalityChecks) {
  if (!molalityHtml.includes(needle)) {
    console.error(`MISSING: ${label}`);
    failed = true;
  } else {
    console.log(`OK: ${label}`);
  }
}

if (molalityHtml.includes('name="robots" content="noindex')) {
  console.error("INVALID: Molality calculator is noindex");
  failed = true;
} else {
  console.log("OK: Molality calculator is indexable");
}

const dilutionFile =
  ".next/server/app/calculators/dilution-calculator.html";
const dilutionHtml = fs.readFileSync(dilutionFile, "utf8");

const dilutionChecks = [
  ["Dilution Calculator", "Dilution title and heading"],
  [
    `href="${siteUrl}/calculators/dilution-calculator"`,
    "Dilution canonical",
  ],
  [
    "EducationalApplication",
    "Dilution application structured data",
  ],
  ["FAQPage", "Dilution FAQ structured data"],
  [
    'href="/calculators/molarity-calculator"',
    "Dilution internal molarity link",
  ],
];

for (const [needle, label] of dilutionChecks) {
  if (!dilutionHtml.includes(needle)) {
    console.error(`MISSING: ${label}`);
    failed = true;
  } else {
    console.log(`OK: ${label}`);
  }
}

if (dilutionHtml.includes('name="robots" content="noindex')) {
  console.error("INVALID: Dilution calculator is noindex");
  failed = true;
} else {
  console.log("OK: Dilution calculator is indexable");
}

const densityFile =
  ".next/server/app/calculators/density-calculator.html";
const densityHtml = fs.readFileSync(densityFile, "utf8");

const densityChecks = [
  ["Density Calculator", "Density title and heading"],
  [
    `href="${siteUrl}/calculators/density-calculator"`,
    "Density canonical",
  ],
  [
    "EducationalApplication",
    "Density application structured data",
  ],
  ["FAQPage", "Density FAQ structured data"],
];

for (const [needle, label] of densityChecks) {
  if (!densityHtml.includes(needle)) {
    console.error(`MISSING: ${label}`);
    failed = true;
  } else {
    console.log(`OK: ${label}`);
  }
}

if (densityHtml.includes('name="robots" content="noindex')) {
  console.error("INVALID: Density calculator is noindex");
  failed = true;
} else {
  console.log("OK: Density calculator is indexable");
}

const forceCalculatorFile =
  ".next/server/app/calculators/force-calculator.html";

const forceCalculatorHtml = fs.readFileSync(
  forceCalculatorFile,
  "utf8",
);

const forceCalculatorChecks = [
  [
    "Force Calculator",
    "Force title and heading",
  ],
  [
    `href="${siteUrl}/calculators/force-calculator"`,
    "Force canonical",
  ],
  [
    "EducationalApplication",
    "Force application structured data",
  ],
  [
    "FAQPage",
    "Force FAQ structured data",
  ],
  [
    'href="/calculators/acceleration-calculator"',
    "Force acceleration internal link",
  ],
  [
    'href="/calculators/rate-of-change-calculator"',
    "Force rate of change internal link",
  ],
  [
    'href="/lab-reports/tables-and-graphs"',
    "Force tables and graphs internal link",
  ],
];

for (const [needle, label] of forceCalculatorChecks) {
  if (!forceCalculatorHtml.includes(needle)) {
    console.error(`MISSING: ${label}`);
    failed = true;
  } else {
    console.log(`OK: ${label}`);
  }
}

if (
  forceCalculatorHtml.includes(
    'name="robots" content="noindex',
  )
) {
  console.error(
    "INVALID: Force calculator is noindex",
  );
  failed = true;
} else {
  console.log(
    "OK: Force calculator is indexable",
  );
}

const accelerationCalculatorFile =
  ".next/server/app/calculators/acceleration-calculator.html";

const accelerationCalculatorHtml = fs.readFileSync(
  accelerationCalculatorFile,
  "utf8",
);

const accelerationCalculatorChecks = [
  [
    "Acceleration Calculator",
    "Acceleration title and heading",
  ],
  [
    `href="${siteUrl}/calculators/acceleration-calculator"`,
    "Acceleration canonical",
  ],
  [
    "EducationalApplication",
    "Acceleration application structured data",
  ],
  [
    "FAQPage",
    "Acceleration FAQ structured data",
  ],
  [
    'href="/calculators/rate-of-change-calculator"',
    "Acceleration rate of change internal link",
  ],
  [
    'href="/calculators/linear-regression-calculator"',
    "Acceleration linear regression internal link",
  ],
  [
    'href="/lab-reports/tables-and-graphs"',
    "Acceleration tables and graphs internal link",
  ],
];

for (
  const [needle, label] of accelerationCalculatorChecks
) {
  if (!accelerationCalculatorHtml.includes(needle)) {
    console.error(`MISSING: ${label}`);
    failed = true;
  } else {
    console.log(`OK: ${label}`);
  }
}

if (
  accelerationCalculatorHtml.includes(
    'name="robots" content="noindex',
  )
) {
  console.error(
    "INVALID: Acceleration calculator is noindex",
  );
  failed = true;
} else {
  console.log(
    "OK: Acceleration calculator is indexable",
  );
}

const specificHeatFile =
  ".next/server/app/calculators/specific-heat-calculator.html";
const specificHeatHtml = fs.readFileSync(
  specificHeatFile,
  "utf8",
);

const specificHeatChecks = [
  ["Specific Heat Calculator", "Specific heat title and heading"],
  [
    `href="${siteUrl}/calculators/specific-heat-calculator"`,
    "Specific heat canonical",
  ],
  [
    "EducationalApplication",
    "Specific heat application structured data",
  ],
  ["FAQPage", "Specific heat FAQ structured data"],
];

for (const [needle, label] of specificHeatChecks) {
  if (!specificHeatHtml.includes(needle)) {
    console.error(`MISSING: ${label}`);
    failed = true;
  } else {
    console.log(`OK: ${label}`);
  }
}

if (
  specificHeatHtml.includes(
    'name="robots" content="noindex',
  )
) {
  console.error("INVALID: Specific heat calculator is noindex");
  failed = true;
} else {
  console.log("OK: Specific heat calculator is indexable");
}

const uncertaintyPropagationCalculatorFile =
  ".next/server/app/calculators/uncertainty-propagation-calculator.html";

const uncertaintyPropagationCalculatorHtml = fs.readFileSync(
  uncertaintyPropagationCalculatorFile,
  "utf8",
);

const uncertaintyPropagationCalculatorChecks = [
  [
    "Uncertainty Propagation Calculator",
    "Uncertainty propagation title and heading",
  ],
  [
    `href="${siteUrl}/calculators/uncertainty-propagation-calculator"`,
    "Uncertainty propagation canonical",
  ],
  [
    "EducationalApplication",
    "Uncertainty propagation application structured data",
  ],
  [
    "FAQPage",
    "Uncertainty propagation FAQ structured data",
  ],
  [
    'href="/calculators/measurement-uncertainty-calculator"',
    "Uncertainty propagation measurement calculator internal link",
  ],
  [
    'href="/lab-reports/significant-figures-in-lab-reports"',
    "Uncertainty propagation significant figures internal link",
  ],
  [
    'href="/lab-reports/lab-report-discussion"',
    "Uncertainty propagation discussion internal link",
  ],
];

for (
  const [needle, label] of
    uncertaintyPropagationCalculatorChecks
) {
  if (!uncertaintyPropagationCalculatorHtml.includes(needle)) {
    console.error(`MISSING: ${label}`);
    failed = true;
  } else {
    console.log(`OK: ${label}`);
  }
}

if (
  uncertaintyPropagationCalculatorHtml.includes(
    'name="robots" content="noindex',
  )
) {
  console.error(
    "INVALID: Uncertainty propagation calculator is noindex",
  );
  failed = true;
} else {
  console.log(
    "OK: Uncertainty propagation calculator is indexable",
  );
}

const measurementUncertaintyCalculatorFile =
  ".next/server/app/calculators/measurement-uncertainty-calculator.html";

const measurementUncertaintyCalculatorHtml = fs.readFileSync(
  measurementUncertaintyCalculatorFile,
  "utf8",
);

const measurementUncertaintyCalculatorChecks = [
  [
    "Measurement Uncertainty Calculator",
    "Measurement uncertainty title and heading",
  ],
  [
    `href="${siteUrl}/calculators/measurement-uncertainty-calculator"`,
    "Measurement uncertainty canonical",
  ],
  [
    "EducationalApplication",
    "Measurement uncertainty application structured data",
  ],
  [
    "FAQPage",
    "Measurement uncertainty FAQ structured data",
  ],
  [
    'href="/lab-reports/significant-figures-in-lab-reports"',
    "Measurement uncertainty significant figures internal link",
  ],
  [
    'href="/lab-reports/lab-report-discussion"',
    "Measurement uncertainty discussion internal link",
  ],
  [
    'href="/lab-reports/tables-and-graphs"',
    "Measurement uncertainty tables and graphs internal link",
  ],
  [
    'href="/calculators/percent-error-calculator"',
    "Measurement uncertainty percent error internal link",
  ],
];

for (
  const [needle, label] of
    measurementUncertaintyCalculatorChecks
) {
  if (!measurementUncertaintyCalculatorHtml.includes(needle)) {
    console.error(`MISSING: ${label}`);
    failed = true;
  } else {
    console.log(`OK: ${label}`);
  }
}

if (
  measurementUncertaintyCalculatorHtml.includes(
    'name="robots" content="noindex',
  )
) {
  console.error(
    "INVALID: Measurement uncertainty calculator is noindex",
  );
  failed = true;
} else {
  console.log(
    "OK: Measurement uncertainty calculator is indexable",
  );
}

const rateOfChangeCalculatorFile =
  ".next/server/app/calculators/rate-of-change-calculator.html";

const rateOfChangeCalculatorHtml = fs.readFileSync(
  rateOfChangeCalculatorFile,
  "utf8",
);

const rateOfChangeCalculatorChecks = [
  [
    "Rate of Change Calculator",
    "Rate of change title and heading",
  ],
  [
    `href="${siteUrl}/calculators/rate-of-change-calculator"`,
    "Rate of change canonical",
  ],
  [
    "EducationalApplication",
    "Rate of change application structured data",
  ],
  [
    "FAQPage",
    "Rate of change FAQ structured data",
  ],
  [
    'href="/calculators/linear-regression-calculator"',
    "Rate of change linear regression internal link",
  ],
  [
    'href="/scientific-method/analyze-experimental-results"',
    "Rate of change analysis guide internal link",
  ],
  [
    'href="/lab-reports/tables-and-graphs"',
    "Rate of change tables and graphs internal link",
  ],
];

for (
  const [needle, label] of rateOfChangeCalculatorChecks
) {
  if (!rateOfChangeCalculatorHtml.includes(needle)) {
    console.error(`MISSING: ${label}`);
    failed = true;
  } else {
    console.log(`OK: ${label}`);
  }
}

if (
  rateOfChangeCalculatorHtml.includes(
    'name="robots" content="noindex',
  )
) {
  console.error(
    "INVALID: Rate of change calculator is noindex",
  );
  failed = true;
} else {
  console.log(
    "OK: Rate of change calculator is indexable",
  );
}

const linearRegressionCalculatorFile =
  ".next/server/app/calculators/linear-regression-calculator.html";

const linearRegressionCalculatorHtml = fs.readFileSync(
  linearRegressionCalculatorFile,
  "utf8",
);

const linearRegressionCalculatorChecks = [
  [
    "Linear Regression Calculator",
    "Linear regression title and heading",
  ],
  [
    `href="${siteUrl}/calculators/linear-regression-calculator"`,
    "Linear regression canonical",
  ],
  [
    "EducationalApplication",
    "Linear regression application structured data",
  ],
  [
    "FAQPage",
    "Linear regression FAQ structured data",
  ],
  [
    'href="/lab-reports/tables-and-graphs"',
    "Linear regression tables and graphs internal link",
  ],
  [
    'href="/templates/graphing-scientific-data-worksheet"',
    "Linear regression graphing worksheet internal link",
  ],
  [
    'href="/scientific-method/analyze-experimental-results"',
    "Linear regression analysis guide internal link",
  ],
];

for (
  const [needle, label] of linearRegressionCalculatorChecks
) {
  if (!linearRegressionCalculatorHtml.includes(needle)) {
    console.error(`MISSING: ${label}`);
    failed = true;
  } else {
    console.log(`OK: ${label}`);
  }
}

if (
  linearRegressionCalculatorHtml.includes(
    'name="robots" content="noindex',
  )
) {
  console.error(
    "INVALID: Linear regression calculator is noindex",
  );
  failed = true;
} else {
  console.log(
    "OK: Linear regression calculator is indexable",
  );
}

const coefficientVariationCalculatorFile =
  ".next/server/app/calculators/coefficient-variation-calculator.html";

const coefficientVariationCalculatorHtml = fs.readFileSync(
  coefficientVariationCalculatorFile,
  "utf8",
);

const coefficientVariationCalculatorChecks = [
  [
    "Coefficient of Variation Calculator",
    "Coefficient variation title and heading",
  ],
  [
    `href="${siteUrl}/calculators/coefficient-variation-calculator"`,
    "Coefficient variation canonical",
  ],
  [
    "EducationalApplication",
    "Coefficient variation application structured data",
  ],
  [
    "FAQPage",
    "Coefficient variation FAQ structured data",
  ],
  [
    'href="/calculators/standard-deviation-calculator"',
    "Coefficient variation standard deviation internal link",
  ],
  [
    'href="/calculators/mean-median-mode-calculator"',
    "Coefficient variation mean median mode internal link",
  ],
  [
    'href="/scientific-method/analyze-experimental-results"',
    "Coefficient variation analysis guide internal link",
  ],
];

for (
  const [needle, label] of
    coefficientVariationCalculatorChecks
) {
  if (!coefficientVariationCalculatorHtml.includes(needle)) {
    console.error(`MISSING: ${label}`);
    failed = true;
  } else {
    console.log(`OK: ${label}`);
  }
}

if (
  coefficientVariationCalculatorHtml.includes(
    'name="robots" content="noindex',
  )
) {
  console.error(
    "INVALID: Coefficient variation calculator is noindex",
  );
  failed = true;
} else {
  console.log(
    "OK: Coefficient variation calculator is indexable",
  );
}

const meanMedianModeCalculatorFile =
  ".next/server/app/calculators/mean-median-mode-calculator.html";

const meanMedianModeCalculatorHtml = fs.readFileSync(
  meanMedianModeCalculatorFile,
  "utf8",
);

const meanMedianModeCalculatorChecks = [
  [
    "Mean, Median and Mode Calculator",
    "Mean median mode title and heading",
  ],
  [
    `href="${siteUrl}/calculators/mean-median-mode-calculator"`,
    "Mean median mode canonical",
  ],
  [
    "EducationalApplication",
    "Mean median mode application structured data",
  ],
  [
    "FAQPage",
    "Mean median mode FAQ structured data",
  ],
  [
    'href="/calculators/standard-deviation-calculator"',
    "Mean median mode standard deviation internal link",
  ],
  [
    'href="/scientific-method/analyze-experimental-results"',
    "Mean median mode analysis guide internal link",
  ],
];

for (
  const [needle, label] of meanMedianModeCalculatorChecks
) {
  if (!meanMedianModeCalculatorHtml.includes(needle)) {
    console.error(`MISSING: ${label}`);
    failed = true;
  } else {
    console.log(`OK: ${label}`);
  }
}

if (
  meanMedianModeCalculatorHtml.includes(
    'name="robots" content="noindex',
  )
) {
  console.error(
    "INVALID: Mean median mode calculator is noindex",
  );
  failed = true;
} else {
  console.log(
    "OK: Mean median mode calculator is indexable",
  );
}

const standardDeviationCalculatorFile =
  ".next/server/app/calculators/standard-deviation-calculator.html";

const standardDeviationCalculatorHtml = fs.readFileSync(
  standardDeviationCalculatorFile,
  "utf8",
);

const standardDeviationCalculatorChecks = [
  [
    "Standard Deviation Calculator",
    "Standard deviation title and heading",
  ],
  [
    `href="${siteUrl}/calculators/standard-deviation-calculator"`,
    "Standard deviation canonical",
  ],
  [
    "EducationalApplication",
    "Standard deviation application structured data",
  ],
  [
    "FAQPage",
    "Standard deviation FAQ structured data",
  ],
  [
    'href="/scientific-method/analyze-experimental-results"',
    "Standard deviation analysis guide internal link",
  ],
  [
    'href="/calculators/significant-figures-calculator"',
    "Standard deviation significant figures internal link",
  ],
];

for (
  const [needle, label] of standardDeviationCalculatorChecks
) {
  if (!standardDeviationCalculatorHtml.includes(needle)) {
    console.error(`MISSING: ${label}`);
    failed = true;
  } else {
    console.log(`OK: ${label}`);
  }
}

if (
  standardDeviationCalculatorHtml.includes(
    'name="robots" content="noindex',
  )
) {
  console.error(
    "INVALID: Standard deviation calculator is noindex",
  );
  failed = true;
} else {
  console.log(
    "OK: Standard deviation calculator is indexable",
  );
}

const significantFiguresCalculatorFile =
  ".next/server/app/calculators/significant-figures-calculator.html";

const significantFiguresCalculatorHtml = fs.readFileSync(
  significantFiguresCalculatorFile,
  "utf8",
);

const significantFiguresCalculatorChecks = [
  [
    "Significant Figures Calculator",
    "Significant figures title and heading",
  ],
  [
    `href="${siteUrl}/calculators/significant-figures-calculator"`,
    "Significant figures canonical",
  ],
  [
    "EducationalApplication",
    "Significant figures application structured data",
  ],
  [
    "FAQPage",
    "Significant figures FAQ structured data",
  ],
  [
    'href="/lab-reports/significant-figures-in-lab-reports"',
    "Significant figures guide internal link",
  ],
  [
    'href="/calculators/percent-error-calculator"',
    "Significant figures percent error internal link",
  ],
];

for (const [needle, label] of significantFiguresCalculatorChecks) {
  if (!significantFiguresCalculatorHtml.includes(needle)) {
    console.error(`MISSING: ${label}`);
    failed = true;
  } else {
    console.log(`OK: ${label}`);
  }
}

if (
  significantFiguresCalculatorHtml.includes(
    'name="robots" content="noindex',
  )
) {
  console.error(
    "INVALID: Significant figures calculator is noindex",
  );
  failed = true;
} else {
  console.log(
    "OK: Significant figures calculator is indexable",
  );
}

const massMolesFile =
  ".next/server/app/calculators/mass-moles-calculator.html";

const massMolesHtml = fs.readFileSync(
  massMolesFile,
  "utf8",
);

const massMolesChecks = [
  [
    "Mass to Moles Calculator",
    "Mass to moles title and heading",
  ],
  [
    `href="${siteUrl}/calculators/mass-moles-calculator"`,
    "Mass to moles canonical",
  ],
  [
    "EducationalApplication",
    "Mass to moles application structured data",
  ],
  [
    "FAQPage",
    "Mass to moles FAQ structured data",
  ],
  [
    'href="/calculators/molarity-calculator"',
    "Mass to moles molarity internal link",
  ],
];

for (const [needle, label] of massMolesChecks) {
  if (!massMolesHtml.includes(needle)) {
    console.error(`MISSING: ${label}`);
    failed = true;
  } else {
    console.log(`OK: ${label}`);
  }
}

if (
  massMolesHtml.includes(
    'name="robots" content="noindex',
  )
) {
  console.error(
    "INVALID: Mass to moles calculator is noindex",
  );
  failed = true;
} else {
  console.log(
    "OK: Mass to moles calculator is indexable",
  );
}

const labReportsHubHtml = fs.readFileSync(
  ".next/server/app/lab-reports.html",
  "utf8",
);

const labGuideHtml = fs.readFileSync(
  ".next/server/app/lab-reports/how-to-write-a-lab-report.html",
  "utf8",
);

const labReportChecks = [
  [
    labReportsHubHtml,
    "Lab Report Guides",
    "Lab reports hub title and heading",
  ],
  [
    labReportsHubHtml,
    `href="${siteUrl}/lab-reports"`,
    "Lab reports hub canonical",
  ],
  [
    labReportsHubHtml,
    'href="/lab-reports/how-to-write-a-lab-report"',
    "Lab reports hub internal guide link",
  ],
  [
    labGuideHtml,
    "How to Write a Lab Report",
    "Lab report guide title and heading",
  ],
  [
    labGuideHtml,
    `href="${siteUrl}/lab-reports/how-to-write-a-lab-report"`,
    "Lab report guide canonical",
  ],
  [
    labGuideHtml,
    '"@type":"Article"',
    "Lab report Article structured data",
  ],
  [
    labGuideHtml,
    "FAQPage",
    "Lab report FAQ structured data",
  ],
  [
    labGuideHtml,
    'href="/calculators/percent-error-calculator"',
    "Lab report calculator internal link",
  ],
];

for (const [html, needle, label] of labReportChecks) {
  if (!html.includes(needle)) {
    console.error(`MISSING: ${label}`);
    failed = true;
  } else {
    console.log(`OK: ${label}`);
  }
}

for (const [html, label] of [
  [labReportsHubHtml, "Lab reports hub"],
  [labGuideHtml, "Lab report guide"],
]) {
  if (html.includes('name="robots" content="noindex')) {
    console.error(`INVALID: ${label} is noindex`);
    failed = true;
  } else {
    console.log(`OK: ${label} is indexable`);
  }
}

const labFormatHtml = fs.readFileSync(
  ".next/server/app/lab-reports/lab-report-format.html",
  "utf8",
);

const labFormatChecks = [
  ["Lab Report Format", "Lab report format title and heading"],
  [
    `href="${siteUrl}/lab-reports/lab-report-format"`,
    "Lab report format canonical",
  ],
  [
    '"@type":"Article"',
    "Lab report format Article structured data",
  ],
  ["FAQPage", "Lab report format FAQ structured data"],
  [
    'href="/lab-reports/how-to-write-a-lab-report"',
    "Lab report format cornerstone internal link",
  ],
  [
    'href="/calculators/percent-difference-calculator"',
    "Lab report format calculator internal link",
  ],
];

for (const [needle, label] of labFormatChecks) {
  if (!labFormatHtml.includes(needle)) {
    console.error(`MISSING: ${label}`);
    failed = true;
  } else {
    console.log(`OK: ${label}`);
  }
}

if (labFormatHtml.includes('name="robots" content="noindex')) {
  console.error("INVALID: Lab report format guide is noindex");
  failed = true;
} else {
  console.log("OK: Lab report format guide is indexable");
}

const labIntroductionHtml = fs.readFileSync(
  ".next/server/app/lab-reports/lab-report-introduction.html",
  "utf8",
);

const labIntroductionChecks = [
  [
    "How to Write a Lab Report Introduction",
    "Lab introduction title and heading",
  ],
  [
    `href="${siteUrl}/lab-reports/lab-report-introduction"`,
    "Lab introduction canonical",
  ],
  [
    '"@type":"Article"',
    "Lab introduction Article structured data",
  ],
  ["FAQPage", "Lab introduction FAQ structured data"],
  [
    'href="/lab-reports/lab-report-format"',
    "Lab introduction format internal link",
  ],
  [
    'href="/lab-reports/how-to-write-a-lab-report"',
    "Lab introduction cornerstone internal link",
  ],
  [
    'href="/calculators/percent-error-calculator"',
    "Lab introduction calculator internal link",
  ],
];

for (const [needle, label] of labIntroductionChecks) {
  if (!labIntroductionHtml.includes(needle)) {
    console.error(`MISSING: ${label}`);
    failed = true;
  } else {
    console.log(`OK: ${label}`);
  }
}

if (
  labIntroductionHtml.includes(
    'name="robots" content="noindex',
  )
) {
  console.error("INVALID: Lab introduction guide is noindex");
  failed = true;
} else {
  console.log("OK: Lab introduction guide is indexable");
}

const materialsMethodsHtml = fs.readFileSync(
  ".next/server/app/lab-reports/materials-and-methods.html",
  "utf8",
);

const materialsMethodsChecks = [
  [
    "Materials and Methods in a Lab Report",
    "Materials and methods title and heading",
  ],
  [
    `href="${siteUrl}/lab-reports/materials-and-methods"`,
    "Materials and methods canonical",
  ],
  [
    '"@type":"Article"',
    "Materials and methods Article structured data",
  ],
  ["FAQPage", "Materials and methods FAQ structured data"],
  [
    'href="/lab-reports/lab-report-introduction"',
    "Materials and methods introduction internal link",
  ],
  [
    'href="/lab-reports/lab-report-format"',
    "Materials and methods format internal link",
  ],
  [
    'href="/calculators/density-calculator"',
    "Materials and methods calculator internal link",
  ],
];

for (const [needle, label] of materialsMethodsChecks) {
  if (!materialsMethodsHtml.includes(needle)) {
    console.error(`MISSING: ${label}`);
    failed = true;
  } else {
    console.log(`OK: ${label}`);
  }
}

if (
  materialsMethodsHtml.includes(
    'name="robots" content="noindex',
  )
) {
  console.error("INVALID: Materials and methods guide is noindex");
  failed = true;
} else {
  console.log("OK: Materials and methods guide is indexable");
}

const labResultsHtml = fs.readFileSync(
  ".next/server/app/lab-reports/lab-report-results.html",
  "utf8",
);

const labResultsChecks = [
  [
    "How to Write a Lab Report Results Section",
    "Lab results title and heading",
  ],
  [
    `href="${siteUrl}/lab-reports/lab-report-results"`,
    "Lab results canonical",
  ],
  [
    '"@type":"Article"',
    "Lab results Article structured data",
  ],
  ["FAQPage", "Lab results FAQ structured data"],
  [
    'href="/lab-reports/materials-and-methods"',
    "Lab results methods internal link",
  ],
  [
    'href="/lab-reports/lab-report-format"',
    "Lab results format internal link",
  ],
  [
    'href="/calculators/percent-error-calculator"',
    "Lab results percent error link",
  ],
  [
    'href="/calculators/percent-difference-calculator"',
    "Lab results percent difference link",
  ],
];

for (const [needle, label] of labResultsChecks) {
  if (!labResultsHtml.includes(needle)) {
    console.error(`MISSING: ${label}`);
    failed = true;
  } else {
    console.log(`OK: ${label}`);
  }
}

if (
  labResultsHtml.includes(
    'name="robots" content="noindex',
  )
) {
  console.error("INVALID: Lab results guide is noindex");
  failed = true;
} else {
  console.log("OK: Lab results guide is indexable");
}

const labDiscussionHtml = fs.readFileSync(
  ".next/server/app/lab-reports/lab-report-discussion.html",
  "utf8",
);

const labDiscussionChecks = [
  [
    "How to Write a Lab Report Discussion",
    "Lab discussion title and heading",
  ],
  [
    `href="${siteUrl}/lab-reports/lab-report-discussion"`,
    "Lab discussion canonical",
  ],
  [
    '"@type":"Article"',
    "Lab discussion Article structured data",
  ],
  ["FAQPage", "Lab discussion FAQ structured data"],
  [
    'href="/lab-reports/lab-report-results"',
    "Lab discussion results internal link",
  ],
  [
    'href="/lab-reports/lab-report-format"',
    "Lab discussion format internal link",
  ],
  [
    'href="/calculators/percent-error-calculator"',
    "Lab discussion calculator internal link",
  ],
];

for (const [needle, label] of labDiscussionChecks) {
  if (!labDiscussionHtml.includes(needle)) {
    console.error(`MISSING: ${label}`);
    failed = true;
  } else {
    console.log(`OK: ${label}`);
  }
}

if (
  labDiscussionHtml.includes(
    'name="robots" content="noindex',
  )
) {
  console.error("INVALID: Lab discussion guide is noindex");
  failed = true;
} else {
  console.log("OK: Lab discussion guide is indexable");
}

const labConclusionHtml = fs.readFileSync(
  ".next/server/app/lab-reports/lab-report-conclusion.html",
  "utf8",
);

const labConclusionChecks = [
  [
    "How to Write a Lab Report Conclusion",
    "Lab conclusion title and heading",
  ],
  [
    `href="${siteUrl}/lab-reports/lab-report-conclusion"`,
    "Lab conclusion canonical",
  ],
  [
    '"@type":"Article"',
    "Lab conclusion Article structured data",
  ],
  ["FAQPage", "Lab conclusion FAQ structured data"],
  [
    'href="/lab-reports/lab-report-discussion"',
    "Lab conclusion discussion internal link",
  ],
  [
    'href="/lab-reports/lab-report-format"',
    "Lab conclusion format internal link",
  ],
  [
    'href="/calculators/percent-difference-calculator"',
    "Lab conclusion calculator internal link",
  ],
];

for (const [needle, label] of labConclusionChecks) {
  if (!labConclusionHtml.includes(needle)) {
    console.error(`MISSING: ${label}`);
    failed = true;
  } else {
    console.log(`OK: ${label}`);
  }
}

if (
  labConclusionHtml.includes(
    'name="robots" content="noindex',
  )
) {
  console.error("INVALID: Lab conclusion guide is noindex");
  failed = true;
} else {
  console.log("OK: Lab conclusion guide is indexable");
}

const significantFiguresHtml = fs.readFileSync(
  ".next/server/app/lab-reports/significant-figures-in-lab-reports.html",
  "utf8",
);

const significantFiguresChecks = [
  [
    "Significant Figures in Lab Reports",
    "Significant figures title and heading",
  ],
  [
    `href="${siteUrl}/lab-reports/significant-figures-in-lab-reports"`,
    "Significant figures canonical",
  ],
  [
    '"@type":"Article"',
    "Significant figures Article structured data",
  ],
  ["FAQPage", "Significant figures FAQ structured data"],
  [
    'href="/lab-reports/lab-report-results"',
    "Significant figures results internal link",
  ],
  [
    'href="/lab-reports/lab-report-format"',
    "Significant figures format internal link",
  ],
  [
    'href="/calculators/percent-error-calculator"',
    "Significant figures calculator internal link",
  ],
];

for (const [needle, label] of significantFiguresChecks) {
  if (!significantFiguresHtml.includes(needle)) {
    console.error(`MISSING: ${label}`);
    failed = true;
  } else {
    console.log(`OK: ${label}`);
  }
}

if (
  significantFiguresHtml.includes(
    'name="robots" content="noindex',
  )
) {
  console.error("INVALID: Significant figures guide is noindex");
  failed = true;
} else {
  console.log("OK: Significant figures guide is indexable");
}

const tablesGraphsHtml = fs.readFileSync(
  ".next/server/app/lab-reports/tables-and-graphs.html",
  "utf8",
);

const tablesGraphsChecks = [
  [
    "Tables and Graphs in Lab Reports",
    "Tables and graphs title and heading",
  ],
  [
    `href="${siteUrl}/lab-reports/tables-and-graphs"`,
    "Tables and graphs canonical",
  ],
  [
    '"@type":"Article"',
    "Tables and graphs Article structured data",
  ],
  ["FAQPage", "Tables and graphs FAQ structured data"],
  [
    'href="/lab-reports/lab-report-results"',
    "Tables and graphs results internal link",
  ],
  [
    'href="/lab-reports/significant-figures-in-lab-reports"',
    "Tables and graphs significant figures internal link",
  ],
  [
    'href="/calculators/percent-difference-calculator"',
    "Tables and graphs calculator internal link",
  ],
];

for (const [needle, label] of tablesGraphsChecks) {
  if (!tablesGraphsHtml.includes(needle)) {
    console.error(`MISSING: ${label}`);
    failed = true;
  } else {
    console.log(`OK: ${label}`);
  }
}

if (
  tablesGraphsHtml.includes(
    'name="robots" content="noindex',
  )
) {
  console.error("INVALID: Tables and graphs guide is noindex");
  failed = true;
} else {
  console.log("OK: Tables and graphs guide is indexable");
}

const labTemplateHtml = fs.readFileSync(
  ".next/server/app/lab-reports/lab-report-template.html",
  "utf8",
);

const labTemplateChecks = [
  [
    "Lab Report Template",
    "Lab report template title and heading",
  ],
  [
    `href="${siteUrl}/lab-reports/lab-report-template"`,
    "Lab report template canonical",
  ],
  [
    '"@type":"Article"',
    "Lab report template Article structured data",
  ],
  [
    "FAQPage",
    "Lab report template FAQ structured data",
  ],
  [
    'href="/lab-reports/how-to-write-a-lab-report"',
    "Lab report template cornerstone internal link",
  ],
  [
    'href="/lab-reports/lab-report-format"',
    "Lab report template format internal link",
  ],
  [
    'href="/lab-reports/tables-and-graphs"',
    "Lab report template tables and graphs internal link",
  ],
];

for (const [needle, label] of labTemplateChecks) {
  if (!labTemplateHtml.includes(needle)) {
    console.error(`MISSING: ${label}`);
    failed = true;
  } else {
    console.log(`OK: ${label}`);
  }
}

if (
  labTemplateHtml.includes(
    'name="robots" content="noindex',
  )
) {
  console.error("INVALID: Lab report template is noindex");
  failed = true;
} else {
  console.log("OK: Lab report template is indexable");
}

const scientificMethodHtml = fs.readFileSync(
  ".next/server/app/scientific-method.html",
  "utf8",
);

const scientificMethodChecks = [
  [
    "Scientific Method Guides",
    "Scientific method hub title and heading",
  ],
  [
    `href="${siteUrl}/scientific-method"`,
    "Scientific method hub canonical",
  ],
  [
    '"@type":"CollectionPage"',
    "Scientific method CollectionPage structured data",
  ],
  [
    'href="/scientific-method/steps-of-the-scientific-method"',
    "Scientific method cornerstone internal link",
  ],
  [
    'href="/lab-reports"',
    "Scientific method lab reports internal link",
  ],
  [
    'href="/calculators"',
    "Scientific method calculators internal link",
  ],
];

for (const [needle, label] of scientificMethodChecks) {
  if (!scientificMethodHtml.includes(needle)) {
    console.error(`MISSING: ${label}`);
    failed = true;
  } else {
    console.log(`OK: ${label}`);
  }
}

if (
  scientificMethodHtml.includes(
    'name="robots" content="noindex',
  )
) {
  console.error("INVALID: Scientific method hub is noindex");
  failed = true;
} else {
  console.log("OK: Scientific method hub is indexable");
}

const scientificMethodStepsHtml = fs.readFileSync(
  ".next/server/app/scientific-method/steps-of-the-scientific-method.html",
  "utf8",
);

const scientificMethodStepsChecks = [
  [
    "Steps of the Scientific Method",
    "Scientific method steps title and heading",
  ],
  [
    `href="${siteUrl}/scientific-method/steps-of-the-scientific-method"`,
    "Scientific method steps canonical",
  ],
  [
    '"@type":"Article"',
    "Scientific method steps Article structured data",
  ],
  [
    "FAQPage",
    "Scientific method steps FAQ structured data",
  ],
  [
    'href="/scientific-method"',
    "Scientific method steps hub internal link",
  ],
  [
    'href="/lab-reports/lab-report-template"',
    "Scientific method steps template internal link",
  ],
  [
    'href="/calculators/percent-error-calculator"',
    "Scientific method steps calculator internal link",
  ],
];

for (const [needle, label] of scientificMethodStepsChecks) {
  if (!scientificMethodStepsHtml.includes(needle)) {
    console.error(`MISSING: ${label}`);
    failed = true;
  } else {
    console.log(`OK: ${label}`);
  }
}

if (
  scientificMethodStepsHtml.includes(
    'name="robots" content="noindex',
  )
) {
  console.error("INVALID: Scientific method steps guide is noindex");
  failed = true;
} else {
  console.log("OK: Scientific method steps guide is indexable");
}

const scientificQuestionHtml = fs.readFileSync(
  ".next/server/app/scientific-method/scientific-question.html",
  "utf8",
);

const scientificQuestionChecks = [
  [
    "How to Write a Scientific Question",
    "Scientific question title and heading",
  ],
  [
    `href="${siteUrl}/scientific-method/scientific-question"`,
    "Scientific question canonical",
  ],
  [
    '"@type":"Article"',
    "Scientific question Article structured data",
  ],
  [
    "FAQPage",
    "Scientific question FAQ structured data",
  ],
  [
    'href="/scientific-method"',
    "Scientific question hub internal link",
  ],
  [
    'href="/scientific-method/steps-of-the-scientific-method"',
    "Scientific question cornerstone internal link",
  ],
  [
    'href="/lab-reports/lab-report-template"',
    "Scientific question template internal link",
  ],
  [
    'href="/calculators/percent-difference-calculator"',
    "Scientific question calculator internal link",
  ],
];

for (const [needle, label] of scientificQuestionChecks) {
  if (!scientificQuestionHtml.includes(needle)) {
    console.error(`MISSING: ${label}`);
    failed = true;
  } else {
    console.log(`OK: ${label}`);
  }
}

if (
  scientificQuestionHtml.includes(
    'name="robots" content="noindex',
  )
) {
  console.error("INVALID: Scientific question guide is noindex");
  failed = true;
} else {
  console.log("OK: Scientific question guide is indexable");
}

const hypothesisHtml = fs.readFileSync(
  ".next/server/app/scientific-method/how-to-write-a-hypothesis.html",
  "utf8",
);

const hypothesisChecks = [
  [
    "How to Write a Hypothesis",
    "Hypothesis title and heading",
  ],
  [
    `href="${siteUrl}/scientific-method/how-to-write-a-hypothesis"`,
    "Hypothesis canonical",
  ],
  [
    '"@type":"Article"',
    "Hypothesis Article structured data",
  ],
  [
    "FAQPage",
    "Hypothesis FAQ structured data",
  ],
  [
    'href="/scientific-method"',
    "Hypothesis hub internal link",
  ],
  [
    'href="/scientific-method/scientific-question"',
    "Hypothesis scientific question internal link",
  ],
  [
    'href="/scientific-method/steps-of-the-scientific-method"',
    "Hypothesis cornerstone internal link",
  ],
  [
    'href="/lab-reports/lab-report-template"',
    "Hypothesis template internal link",
  ],
  [
    'href="/calculators/percent-error-calculator"',
    "Hypothesis calculator internal link",
  ],
];

for (const [needle, label] of hypothesisChecks) {
  if (!hypothesisHtml.includes(needle)) {
    console.error(`MISSING: ${label}`);
    failed = true;
  } else {
    console.log(`OK: ${label}`);
  }
}

if (
  hypothesisHtml.includes(
    'name="robots" content="noindex',
  )
) {
  console.error("INVALID: Hypothesis guide is noindex");
  failed = true;
} else {
  console.log("OK: Hypothesis guide is indexable");
}

const variablesHtml = fs.readFileSync(
  ".next/server/app/scientific-method/independent-dependent-controlled-variables.html",
  "utf8",
);

const variablesChecks = [
  [
    "Independent, Dependent, and Controlled Variables",
    "Variables title and heading",
  ],
  [
    `href="${siteUrl}/scientific-method/independent-dependent-controlled-variables"`,
    "Variables canonical",
  ],
  [
    '"@type":"Article"',
    "Variables Article structured data",
  ],
  [
    "FAQPage",
    "Variables FAQ structured data",
  ],
  [
    'href="/scientific-method"',
    "Variables hub internal link",
  ],
  [
    'href="/scientific-method/scientific-question"',
    "Variables scientific question internal link",
  ],
  [
    'href="/scientific-method/how-to-write-a-hypothesis"',
    "Variables hypothesis internal link",
  ],
  [
    'href="/scientific-method/steps-of-the-scientific-method"',
    "Variables cornerstone internal link",
  ],
  [
    'href="/lab-reports/lab-report-template"',
    "Variables template internal link",
  ],
];

for (const [needle, label] of variablesChecks) {
  if (!variablesHtml.includes(needle)) {
    console.error(`MISSING: ${label}`);
    failed = true;
  } else {
    console.log(`OK: ${label}`);
  }
}

if (
  variablesHtml.includes(
    'name="robots" content="noindex',
  )
) {
  console.error("INVALID: Variables guide is noindex");
  failed = true;
} else {
  console.log("OK: Variables guide is indexable");
}

const controlGroupHtml = fs.readFileSync(
  ".next/server/app/scientific-method/control-group-and-experimental-group.html",
  "utf8",
);

const controlGroupChecks = [
  [
    "Control Group and Experimental Group",
    "Control group title and heading",
  ],
  [
    `href="${siteUrl}/scientific-method/control-group-and-experimental-group"`,
    "Control group canonical",
  ],
  [
    '"@type":"Article"',
    "Control group Article structured data",
  ],
  [
    "FAQPage",
    "Control group FAQ structured data",
  ],
  [
    'href="/scientific-method"',
    "Control group hub internal link",
  ],
  [
    'href="/scientific-method/independent-dependent-controlled-variables"',
    "Control group variables internal link",
  ],
  [
    'href="/scientific-method/steps-of-the-scientific-method"',
    "Control group cornerstone internal link",
  ],
  [
    'href="/lab-reports/lab-report-template"',
    "Control group template internal link",
  ],
  [
    'href="/calculators/percent-difference-calculator"',
    "Control group calculator internal link",
  ],
];

for (const [needle, label] of controlGroupChecks) {
  if (!controlGroupHtml.includes(needle)) {
    console.error(`MISSING: ${label}`);
    failed = true;
  } else {
    console.log(`OK: ${label}`);
  }
}

if (
  controlGroupHtml.includes(
    'name="robots" content="noindex',
  )
) {
  console.error("INVALID: Control group guide is noindex");
  failed = true;
} else {
  console.log("OK: Control group guide is indexable");
}

const experimentalDesignHtml = fs.readFileSync(
  ".next/server/app/scientific-method/experimental-design.html",
  "utf8",
);

const experimentalDesignChecks = [
  [
    "How to Design a Scientific Experiment",
    "Experimental design title and heading",
  ],
  [
    `href="${siteUrl}/scientific-method/experimental-design"`,
    "Experimental design canonical",
  ],
  [
    '"@type":"Article"',
    "Experimental design Article structured data",
  ],
  [
    "FAQPage",
    "Experimental design FAQ structured data",
  ],
  [
    'href="/scientific-method"',
    "Experimental design hub internal link",
  ],
  [
    'href="/scientific-method/independent-dependent-controlled-variables"',
    "Experimental design variables internal link",
  ],
  [
    'href="/scientific-method/control-group-and-experimental-group"',
    "Experimental design control group internal link",
  ],
  [
    'href="/lab-reports/materials-and-methods"',
    "Experimental design methods internal link",
  ],
];

for (const [needle, label] of experimentalDesignChecks) {
  if (!experimentalDesignHtml.includes(needle)) {
    console.error(`MISSING: ${label}`);
    failed = true;
  } else {
    console.log(`OK: ${label}`);
  }
}

if (
  experimentalDesignHtml.includes(
    'name="robots" content="noindex',
  )
) {
  console.error("INVALID: Experimental design guide is noindex");
  failed = true;
} else {
  console.log("OK: Experimental design guide is indexable");
}

const dataCollectionHtml = fs.readFileSync(
  ".next/server/app/scientific-method/collect-and-record-data.html",
  "utf8",
);

const dataCollectionChecks = [
  [
    "How to Collect and Record Scientific Data",
    "Data collection title and heading",
  ],
  [
    `href="${siteUrl}/scientific-method/collect-and-record-data"`,
    "Data collection canonical",
  ],
  [
    '"@type":"Article"',
    "Data collection Article structured data",
  ],
  [
    "FAQPage",
    "Data collection FAQ structured data",
  ],
  [
    'href="/scientific-method"',
    "Data collection hub internal link",
  ],
  [
    'href="/scientific-method/experimental-design"',
    "Data collection experimental design internal link",
  ],
  [
    'href="/lab-reports/tables-and-graphs"',
    "Data collection tables and graphs internal link",
  ],
  [
    'href="/lab-reports/significant-figures-in-lab-reports"',
    "Data collection significant figures internal link",
  ],
];

for (const [needle, label] of dataCollectionChecks) {
  if (!dataCollectionHtml.includes(needle)) {
    console.error(`MISSING: ${label}`);
    failed = true;
  } else {
    console.log(`OK: ${label}`);
  }
}

if (
  dataCollectionHtml.includes(
    'name="robots" content="noindex',
  )
) {
  console.error("INVALID: Data collection guide is noindex");
  failed = true;
} else {
  console.log("OK: Data collection guide is indexable");
}

const resultsAnalysisHtml = fs.readFileSync(
  ".next/server/app/scientific-method/analyze-experimental-results.html",
  "utf8",
);

const resultsAnalysisChecks = [
  [
    "How to Analyze Experimental Results",
    "Results analysis title and heading",
  ],
  [
    `href="${siteUrl}/scientific-method/analyze-experimental-results"`,
    "Results analysis canonical",
  ],
  [
    '"@type":"Article"',
    "Results analysis Article structured data",
  ],
  [
    "FAQPage",
    "Results analysis FAQ structured data",
  ],
  [
    'href="/scientific-method"',
    "Results analysis hub internal link",
  ],
  [
    'href="/scientific-method/collect-and-record-data"',
    "Results analysis data collection internal link",
  ],
  [
    'href="/lab-reports/tables-and-graphs"',
    "Results analysis tables and graphs internal link",
  ],
  [
    'href="/calculators/percent-error-calculator"',
    "Results analysis percent error internal link",
  ],
];

for (const [needle, label] of resultsAnalysisChecks) {
  if (!resultsAnalysisHtml.includes(needle)) {
    console.error(`MISSING: ${label}`);
    failed = true;
  } else {
    console.log(`OK: ${label}`);
  }
}

if (
  resultsAnalysisHtml.includes(
    'name="robots" content="noindex',
  )
) {
  console.error("INVALID: Results analysis guide is noindex");
  failed = true;
} else {
  console.log("OK: Results analysis guide is indexable");
}

const templatesHtml = fs.readFileSync(
  ".next/server/app/templates.html",
  "utf8",
);

const templatesHubChecks = [
  [
    "Science Templates and Worksheets",
    "Templates hub title and heading",
  ],
  [
    `href="${siteUrl}/templates"`,
    "Templates hub canonical",
  ],
  [
    '"@type":"CollectionPage"',
    "Templates hub CollectionPage structured data",
  ],
  [
    'href="/scientific-method"',
    "Templates hub scientific method internal link",
  ],
  [
    'href="/lab-reports"',
    "Templates hub lab reports internal link",
  ],
];

for (const [needle, label] of templatesHubChecks) {
  if (!templatesHtml.includes(needle)) {
    console.error(`MISSING: ${label}`);
    failed = true;
  } else {
    console.log(`OK: ${label}`);
  }
}

if (
  templatesHtml.includes(
    'name="robots" content="noindex',
  )
) {
  console.error("INVALID: Templates hub is noindex");
  failed = true;
} else {
  console.log("OK: Templates hub is indexable");
}

const printableLabReportTemplateHtml = fs.readFileSync(
  ".next/server/app/templates/printable-lab-report-template.html",
  "utf8",
);

const printableLabReportTemplateChecks = [
  [
    "Printable Lab Report Template",
    "Printable lab report title and heading",
  ],
  [
    `href="${siteUrl}/templates/printable-lab-report-template"`,
    "Printable lab report canonical",
  ],
  [
    '"@type":"Article"',
    "Printable lab report Article structured data",
  ],
  [
    "FAQPage",
    "Printable lab report FAQ structured data",
  ],
  [
    'href="/templates"',
    "Printable lab report templates hub link",
  ],
  [
    'href="/lab-reports/how-to-write-a-lab-report"',
    "Printable lab report complete guide link",
  ],
  [
    'href="/lab-reports/lab-report-format"',
    "Printable lab report format link",
  ],
  [
    'href="/lab-reports/tables-and-graphs"',
    "Printable lab report tables and graphs link",
  ],
  [
    'href="/lab-reports/lab-report-template"',
    "Printable lab report template guide link",
  ],
];

for (
  const [needle, label]
  of printableLabReportTemplateChecks
) {
  if (!printableLabReportTemplateHtml.includes(needle)) {
    console.error(`MISSING: ${label}`);
    failed = true;
  } else {
    console.log(`OK: ${label}`);
  }
}

if (
  printableLabReportTemplateHtml.includes(
    'name="robots" content="noindex',
  )
) {
  console.error(
    "INVALID: Printable lab report template is noindex",
  );
  failed = true;
} else {
  console.log(
    "OK: Printable lab report template is indexable",
  );
}

const scientificMethodWorksheetHtml = fs.readFileSync(
  ".next/server/app/templates/scientific-method-worksheet.html",
  "utf8",
);

const scientificMethodWorksheetChecks = [
  [
    "Scientific Method Worksheet",
    "Scientific method worksheet title and heading",
  ],
  [
    `href="${siteUrl}/templates/scientific-method-worksheet"`,
    "Scientific method worksheet canonical",
  ],
  [
    '"@type":"Article"',
    "Scientific method worksheet Article structured data",
  ],
  [
    "FAQPage",
    "Scientific method worksheet FAQ structured data",
  ],
  [
    'href="/templates"',
    "Scientific method worksheet templates hub link",
  ],
  [
    'href="/scientific-method/steps-of-the-scientific-method"',
    "Scientific method worksheet steps guide link",
  ],
  [
    'href="/scientific-method/scientific-question"',
    "Scientific method worksheet question guide link",
  ],
  [
    'href="/scientific-method/experimental-design"',
    "Scientific method worksheet experimental design link",
  ],
  [
    'href="/scientific-method"',
    "Scientific method worksheet hub link",
  ],
];

for (
  const [needle, label]
  of scientificMethodWorksheetChecks
) {
  if (!scientificMethodWorksheetHtml.includes(needle)) {
    console.error(`MISSING: ${label}`);
    failed = true;
  } else {
    console.log(`OK: ${label}`);
  }
}

if (
  scientificMethodWorksheetHtml.includes(
    'name="robots" content="noindex',
  )
) {
  console.error(
    "INVALID: Scientific method worksheet is noindex",
  );
  failed = true;
} else {
  console.log(
    "OK: Scientific method worksheet is indexable",
  );
}

const experimentPlanningTemplateHtml = fs.readFileSync(
  ".next/server/app/templates/experiment-planning-template.html",
  "utf8",
);

const experimentPlanningTemplateChecks = [
  [
    "Experiment Planning Template",
    "Experiment planning template title and heading",
  ],
  [
    `href="${siteUrl}/templates/experiment-planning-template"`,
    "Experiment planning template canonical",
  ],
  [
    '"@type":"Article"',
    "Experiment planning template Article structured data",
  ],
  [
    "FAQPage",
    "Experiment planning template FAQ structured data",
  ],
  [
    'href="/templates"',
    "Experiment planning template templates hub link",
  ],
  [
    'href="/scientific-method/experimental-design"',
    "Experiment planning template experimental design link",
  ],
  [
    'href="/scientific-method/independent-dependent-controlled-variables"',
    "Experiment planning template variables link",
  ],
  [
    'href="/scientific-method/collect-and-record-data"',
    "Experiment planning template data collection link",
  ],
];

for (
  const [needle, label]
  of experimentPlanningTemplateChecks
) {
  if (!experimentPlanningTemplateHtml.includes(needle)) {
    console.error(`MISSING: ${label}`);
    failed = true;
  } else {
    console.log(`OK: ${label}`);
  }
}

if (
  experimentPlanningTemplateHtml.includes(
    'name="robots" content="noindex',
  )
) {
  console.error(
    "INVALID: Experiment planning template is noindex",
  );
  failed = true;
} else {
  console.log(
    "OK: Experiment planning template is indexable",
  );
}

const dataTableTemplateHtml = fs.readFileSync(
  ".next/server/app/templates/data-table-template.html",
  "utf8",
);

const dataTableTemplateChecks = [
  [
    "Scientific Data Table Template",
    "Data table template title and heading",
  ],
  [
    `href="${siteUrl}/templates/data-table-template"`,
    "Data table template canonical",
  ],
  [
    '"@type":"Article"',
    "Data table template Article structured data",
  ],
  [
    "FAQPage",
    "Data table template FAQ structured data",
  ],
  [
    'href="/templates"',
    "Data table template templates hub link",
  ],
  [
    'href="/scientific-method/collect-and-record-data"',
    "Data table template data collection link",
  ],
  [
    'href="/lab-reports/tables-and-graphs"',
    "Data table template tables and graphs link",
  ],
  [
    'href="/lab-reports/significant-figures-in-lab-reports"',
    "Data table template significant figures link",
  ],
];

for (
  const [needle, label]
  of dataTableTemplateChecks
) {
  if (!dataTableTemplateHtml.includes(needle)) {
    console.error(`MISSING: ${label}`);
    failed = true;
  } else {
    console.log(`OK: ${label}`);
  }
}

if (
  dataTableTemplateHtml.includes(
    'name="robots" content="noindex',
  )
) {
  console.error(
    "INVALID: Data table template is noindex",
  );
  failed = true;
} else {
  console.log(
    "OK: Data table template is indexable",
  );
}

const graphingScientificDataWorksheetHtml = fs.readFileSync(
  ".next/server/app/templates/graphing-scientific-data-worksheet.html",
  "utf8",
);

const graphingScientificDataWorksheetChecks = [
  [
    "Graphing Scientific Data Worksheet",
    "Graphing worksheet title and heading",
  ],
  [
    `href="${siteUrl}/templates/graphing-scientific-data-worksheet"`,
    "Graphing worksheet canonical",
  ],
  [
    '"@type":"Article"',
    "Graphing worksheet Article structured data",
  ],
  [
    "FAQPage",
    "Graphing worksheet FAQ structured data",
  ],
  [
    'href="/templates"',
    "Graphing worksheet templates hub link",
  ],
  [
    'href="/templates/data-table-template"',
    "Graphing worksheet data table link",
  ],
  [
    'href="/lab-reports/tables-and-graphs"',
    "Graphing worksheet tables and graphs link",
  ],
  [
    'href="/scientific-method/analyze-experimental-results"',
    "Graphing worksheet results analysis link",
  ],
];

for (
  const [needle, label]
  of graphingScientificDataWorksheetChecks
) {
  if (!graphingScientificDataWorksheetHtml.includes(needle)) {
    console.error(`MISSING: ${label}`);
    failed = true;
  } else {
    console.log(`OK: ${label}`);
  }
}

if (
  graphingScientificDataWorksheetHtml.includes(
    'name="robots" content="noindex',
  )
) {
  console.error(
    "INVALID: Graphing scientific data worksheet is noindex",
  );
  failed = true;
} else {
  console.log(
    "OK: Graphing scientific data worksheet is indexable",
  );
}

const variablesWorksheetHtml = fs.readFileSync(
  ".next/server/app/templates/variables-worksheet.html",
  "utf8",
);

const variablesWorksheetChecks = [
  [
    "Independent and Dependent Variables Worksheet",
    "Variables worksheet title and heading",
  ],
  [
    `href="${siteUrl}/templates/variables-worksheet"`,
    "Variables worksheet canonical",
  ],
  [
    '"@type":"Article"',
    "Variables worksheet Article structured data",
  ],
  [
    "FAQPage",
    "Variables worksheet FAQ structured data",
  ],
  [
    'href="/templates"',
    "Variables worksheet templates hub link",
  ],
  [
    'href="/scientific-method/independent-dependent-controlled-variables"',
    "Variables worksheet variables guide link",
  ],
  [
    'href="/templates/experiment-planning-template"',
    "Variables worksheet experiment planning link",
  ],
  [
    'href="/scientific-method/control-group-and-experimental-group"',
    "Variables worksheet control group link",
  ],
];

for (const [needle, label] of variablesWorksheetChecks) {
  if (!variablesWorksheetHtml.includes(needle)) {
    console.error(`MISSING: ${label}`);
    failed = true;
  } else {
    console.log(`OK: ${label}`);
  }
}

if (
  variablesWorksheetHtml.includes(
    'name="robots" content="noindex',
  )
) {
  console.error(
    "INVALID: Variables worksheet is noindex",
  );
  failed = true;
} else {
  console.log(
    "OK: Variables worksheet is indexable",
  );
}

if (failed) {
  process.exit(1);
}

console.log("SEO route checks passed.");
