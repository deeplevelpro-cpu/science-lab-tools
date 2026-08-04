import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const appDirectory = path.join(root, "src/app");
const layoutPath = path.join(appDirectory, "layout.tsx");
const siteConfigPath = path.join(
  root,
  "src/config/site.ts",
);
const reportDirectory = path.join(root, "reports");
const reportPath = path.join(
  reportDirectory,
  "seo-page-inventory.json",
);

fs.mkdirSync(reportDirectory, {
  recursive: true,
});

function walk(directory) {
  return fs
    .readdirSync(directory, {
      withFileTypes: true,
    })
    .flatMap((entry) => {
      const absolutePath = path.join(
        directory,
        entry.name,
      );

      if (
        entry.isDirectory() &&
        !entry.name.startsWith("_")
      ) {
        return walk(absolutePath);
      }

      if (
        entry.isFile() &&
        entry.name === "page.tsx"
      ) {
        return [absolutePath];
      }

      return [];
    });
}

function routeFromFile(filePath) {
  const relativeDirectory = path.relative(
    appDirectory,
    path.dirname(filePath),
  );

  if (!relativeDirectory) {
    return "/";
  }

  return `/${relativeDirectory
    .split(path.sep)
    .join("/")}`;
}

function firstMatch(text, pattern) {
  return text.match(pattern)?.[1]?.trim() ?? "";
}

function firstQuotedMatch(
  text,
  prefix,
) {
  const match = text.match(
    new RegExp(
      prefix +
        `(?:"((?:\\\\.|[^"\\\\])*)"|` +
        `'((?:\\\\.|[^'\\\\])*)'|` +
        `\`((?:\\\\.|[^\`\\\\])*)\`)`,
    ),
  );

  return (
    match?.[1] ??
    match?.[2] ??
    match?.[3] ??
    ""
  ).trim();
}

function countMatches(text, pattern) {
  return [...text.matchAll(pattern)].length;
}

function resolveLocalModule(
  fromFile,
  specifier,
) {
  if (
    !specifier.startsWith(".") &&
    !specifier.startsWith("@/")
  ) {
    return "";
  }

  const sourceDirectory = path.join(
    root,
    "src",
  );

  const basePath = specifier.startsWith("@/")
    ? path.join(
        sourceDirectory,
        specifier.slice(2),
      )
    : path.resolve(
        path.dirname(fromFile),
        specifier,
      );

  const relativeToSource = path.relative(
    sourceDirectory,
    basePath,
  );

  if (
    relativeToSource.startsWith("..") ||
    path.isAbsolute(relativeToSource)
  ) {
    return "";
  }

  for (const candidate of [
    basePath,
    `${basePath}.ts`,
    `${basePath}.tsx`,
    `${basePath}.js`,
    `${basePath}.jsx`,
    path.join(basePath, "index.ts"),
    path.join(basePath, "index.tsx"),
    path.join(basePath, "index.js"),
    path.join(basePath, "index.jsx"),
  ]) {
    if (
      fs.existsSync(candidate) &&
      fs.statSync(candidate).isFile()
    ) {
      return candidate;
    }
  }

  return "";
}

function collectLocalSource(
  filePath,
  visited = new Set(),
) {
  const normalizedPath = path.resolve(
    filePath,
  );

  if (visited.has(normalizedPath)) {
    return "";
  }

  visited.add(normalizedPath);

  const text = fs.readFileSync(
    normalizedPath,
    "utf8",
  );

  const collected = [text];
  const modulePattern =
    /(?:import[\s\S]*?\sfrom|export\s+(?:\*|\{[\s\S]*?\})\s+from)\s*["']([^"']+)["']/g;

  for (
    const match of text.matchAll(
      modulePattern,
    )
  ) {
    const resolved = resolveLocalModule(
      normalizedPath,
      match[1],
    );

    if (resolved) {
      collected.push(
        collectLocalSource(
          resolved,
          visited,
        ),
      );
    }
  }

  return collected.join("\n");
}

function resolveStringConstant(
  text,
  variableName,
) {
  if (!variableName) {
    return "";
  }

  const escapedName = variableName.replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\$&",
  );

  return firstQuotedMatch(
    text,
    `(?:export\\s+)?const\\s+${escapedName}` +
      `(?:\\s*:\\s*[^=]+)?\\s*=\\s*`,
  );
}

function resolveMetadataValue(
  text,
  property,
) {
  const escapedProperty = property.replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\$&",
  );

  const variableName =
    firstMatch(
      text,
      new RegExp(
        `${escapedProperty}:\\s*([A-Za-z_$][\\w$]*)`,
      ),
    ) ||
    firstMatch(
      text,
      new RegExp(
        `(?:^|[,{}]\\s*)` +
          `(${escapedProperty})(?=\\s*[,}])`,
        "m",
      ),
    );

  const resolvedVariable = resolveStringConstant(
    text,
    variableName,
  );

  if (resolvedVariable) {
    return resolvedVariable;
  }

  return firstQuotedMatch(
    text,
    `${escapedProperty}:\\s*`,
  );
}

function resolveCanonical(text) {
  return resolveMetadataValue(
    text,
    "canonical",
  );
}

function hasMetadataExport(text) {
  return (
    /export\s+const\s+metadata(?:\s*:\s*Metadata)?\s*=/.test(
      text,
    ) ||
    /export\s+(?:async\s+)?function\s+generateMetadata/.test(
      text,
    )
  );
}

function hasRobotsMetadata(text) {
  return /\brobots\s*:/.test(text);
}

function hasJsonLd(text) {
  return /application\/ld\+json/.test(text);
}

function getRenderedTitle(text) {
  const resolvedTitle =
    resolveMetadataValue(
      text,
      "title",
    );

  if (resolvedTitle) {
    return resolvedTitle;
  }

  const template = firstMatch(
    text,
    /title:\s*`([^`]+)`/,
  );

  if (template) {
    return template.replace(
      /\$\{([A-Za-z_$][\w$]*)\}/g,
      (_, variableName) => {
        if (variableName === "siteConfig") {
          return "Science Lab Tools";
        }

        return (
          resolveStringConstant(
            text,
            variableName,
          ) || `<${variableName}>`
        );
      },
    );
  }

  return "";
}

const layoutText = fs.existsSync(layoutPath)
  ? fs.readFileSync(layoutPath, "utf8")
  : "";

const siteConfigText = fs.existsSync(
  siteConfigPath,
)
  ? fs.readFileSync(siteConfigPath, "utf8")
  : "";

const siteConfigDescriptionMatch =
  siteConfigText.match(
    /description:\s*\n?\s*"([^"]+)"/,
  );

const siteConfigDescription =
  siteConfigDescriptionMatch?.[1]?.trim() ?? "";

const inherited = {
  hasMetadata: hasMetadataExport(layoutText),
  title:
    resolveMetadataValue(layoutText, "default") ||
    resolveMetadataValue(layoutText, "title"),
  description:
    resolveMetadataValue(
      layoutText,
      "description",
    ) ||
    (layoutText.includes(
      "description: siteConfig.description",
    )
      ? siteConfigDescription
      : ""),
  canonical: resolveCanonical(layoutText),
  hasRobots: hasRobotsMetadata(layoutText),
  hasJsonLd: hasJsonLd(layoutText),
};

const pages = walk(appDirectory)
  .map((filePath) => {
    const text = fs.readFileSync(
      filePath,
      "utf8",
    );

    const route = routeFromFile(filePath);
    const isHomepage = route === "/";

    const ownTitle = isHomepage
      ? ""
      : getRenderedTitle(text);

    const ownDescription = isHomepage
      ? ""
      : resolveMetadataValue(
          text,
          "description",
        );

    const ownCanonical = isHomepage
      ? ""
      : resolveCanonical(text);

    const title = isHomepage
      ? inherited.title
      : ownTitle;

    const description = isHomepage
      ? inherited.description
      : ownDescription;

    const canonical = isHomepage
      ? inherited.canonical
      : ownCanonical;

    const ownMetadata =
      hasMetadataExport(text);

    const hasMetadata =
      ownMetadata ||
      (isHomepage &&
        inherited.hasMetadata);

    const hasRobots =
      hasRobotsMetadata(text) ||
      inherited.hasRobots;

    const pageHasJsonLd =
      hasJsonLd(text) ||
      (isHomepage &&
        inherited.hasJsonLd);

    const h1Count = countMatches(
      text,
      /<h1(?:\s[^>]*)?>/g,
    );

    const linkedSourceText =
      collectLocalSource(filePath);

    const staticInternalLinks = countMatches(
      linkedSourceText,
      /href=["'`]\/(?!\/|#)[^"'`]+["'`]/g,
    );

    const dynamicInternalLinks = countMatches(
      linkedSourceText,
      /href=\{(?:calculator|resource|category)\.href\}/g,
    );

    const internalLinks =
      staticInternalLinks +
      dynamicInternalLinks * 2;

    const hasFaqSchema =
      /"@type":\s*"FAQPage"/.test(
        text,
      );

    const hasWebApplication =
      /"@type":\s*"WebApplication"/.test(
        text,
      );

    const hasBreadcrumbSchema =
      /"@type":\s*"BreadcrumbList"/.test(
        text,
      );

    const sourceWords = text
      .replace(/<[^>]+>/g, " ")
      .replace(
        /[^A-Za-zÀ-ÿ0-9μθπτΔ²³°]+/g,
        " ",
      )
      .trim()
      .split(/\s+/)
      .filter(Boolean).length;

    const issues = [];

    if (!hasMetadata) {
      issues.push("missing-metadata");
    }

    if (!title) {
      issues.push("missing-title");
    } else if (title.length < 20) {
      issues.push("short-title");
    } else if (title.length > 65) {
      issues.push("long-title");
    }

    if (!description) {
      issues.push("missing-description");
    } else if (description.length < 100) {
      issues.push(
        "short-description",
      );
    } else if (description.length > 170) {
      issues.push(
        "long-description",
      );
    }

    if (!canonical) {
      issues.push("missing-canonical");
    }

    if (!hasRobots) {
      issues.push(
        "missing-robots-directive",
      );
    }

    if (h1Count !== 1) {
      issues.push(
        `h1-count-${h1Count}`,
      );
    }

    if (internalLinks < 2) {
      issues.push(
        "weak-internal-linking",
      );
    }

    if (!pageHasJsonLd) {
      issues.push("missing-jsonld");
    }

    return {
      route,
      file: path.relative(
        root,
        filePath,
      ),
      title,
      titleLength: title.length,
      description,
      descriptionLength:
        description.length,
      canonical,
      h1Count,
      internalLinks,
      sourceWords,
      hasMetadata,
      hasRobots,
      hasJsonLd: pageHasJsonLd,
      hasFaqSchema,
      hasWebApplication,
      hasBreadcrumbSchema,
      issues,
    };
  })
  .sort((a, b) =>
    a.route.localeCompare(b.route),
  );

const titleGroups = new Map();
const descriptionGroups = new Map();

for (const page of pages) {
  if (page.title) {
    titleGroups.set(page.title, [
      ...(titleGroups.get(page.title) ??
        []),
      page.route,
    ]);
  }

  if (page.description) {
    descriptionGroups.set(
      page.description,
      [
        ...(descriptionGroups.get(
          page.description,
        ) ?? []),
        page.route,
      ],
    );
  }
}

const duplicateTitles = [
  ...titleGroups,
]
  .filter(
    ([, routes]) => routes.length > 1,
  )
  .map(([value, routes]) => ({
    value,
    routes,
  }));

const duplicateDescriptions = [
  ...descriptionGroups,
]
  .filter(
    ([, routes]) => routes.length > 1,
  )
  .map(([value, routes]) => ({
    value,
    routes,
  }));

const issueCounts = {};

for (const page of pages) {
  for (const issue of page.issues) {
    issueCounts[issue] =
      (issueCounts[issue] ?? 0) + 1;
  }
}

const report = {
  generatedAt: new Date().toISOString(),
  inherited,
  totals: {
    pages: pages.length,
    pagesWithIssues: pages.filter(
      (page) =>
        page.issues.length > 0,
    ).length,
    pagesWithoutIssues: pages.filter(
      (page) =>
        page.issues.length === 0,
    ).length,
    duplicateTitles:
      duplicateTitles.length,
    duplicateDescriptions:
      duplicateDescriptions.length,
  },
  issueCounts,
  duplicateTitles,
  duplicateDescriptions,
  pages,
};

fs.writeFileSync(
  reportPath,
  `${JSON.stringify(
    report,
    null,
    2,
  )}\n`,
);

console.log(
  `Pages audited: ${report.totals.pages}`,
);
console.log(
  `Pages with issues: ${report.totals.pagesWithIssues}`,
);
console.log(
  `Pages without issues: ${report.totals.pagesWithoutIssues}`,
);
console.log(
  `Duplicate titles: ${report.totals.duplicateTitles}`,
);
console.log(
  `Duplicate descriptions: ${report.totals.duplicateDescriptions}`,
);

console.log("\nIssue counts:");

for (const [issue, count] of Object.entries(
  issueCounts,
).sort((a, b) => b[1] - a[1])) {
  console.log(`${count}\t${issue}`);
}

console.log(
  `\nReport: ${path.relative(
    root,
    reportPath,
  )}`,
);
