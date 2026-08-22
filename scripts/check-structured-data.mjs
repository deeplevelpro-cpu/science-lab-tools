import fs from "node:fs";
import path from "node:path";

const appDir = path.join(".next", "server", "app");

if (!fs.existsSync(appDir)) {
  console.error(
    `Build output not found at ${appDir}. Run "pnpm build" first.`,
  );
  process.exit(1);
}

function collectHtmlFiles(directory) {
  const files = [];
  for (const entry of fs.readdirSync(directory, {
    withFileTypes: true,
  })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectHtmlFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith(".html")) {
      files.push(fullPath);
    }
  }
  return files;
}

const htmlFiles = collectHtmlFiles(appDir).filter(
  (file) =>
    !file.endsWith("_not-found.html") &&
    !file.endsWith("_global-error.html"),
);

const scriptPattern =
  /<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi;

const problems = [];
let blockCount = 0;

function report(route, message) {
  problems.push(`${route || "/"}: ${message}`);
}

function validateFaqPage(route, schema) {
  const entities = schema.mainEntity;
  if (!Array.isArray(entities) || entities.length === 0) {
    report(route, "FAQPage is missing a non-empty mainEntity array");
    return;
  }
  entities.forEach((entity, index) => {
    if (entity?.["@type"] !== "Question") {
      report(
        route,
        `FAQPage mainEntity[${index}] is not a Question`,
      );
    }
    if (!entity?.name || typeof entity.name !== "string") {
      report(
        route,
        `FAQPage mainEntity[${index}] is missing a question name`,
      );
    }
    const answerText = entity?.acceptedAnswer?.text;
    if (!answerText || typeof answerText !== "string") {
      report(
        route,
        `FAQPage mainEntity[${index}] is missing acceptedAnswer.text`,
      );
    }
  });
}

function validateArticle(route, schema) {
  if (!schema.headline || typeof schema.headline !== "string") {
    report(route, "Article is missing a headline");
  }
}

function validateWebApplication(route, schema) {
  if (!schema.name) {
    report(route, "WebApplication is missing a name");
  }
  if (!schema.url) {
    report(route, "WebApplication is missing a url");
  }
}

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, "utf8");
  const route =
    "/" +
    path
      .relative(appDir, file)
      .replace(/\.html$/, "")
      .replace(/\\/g, "/")
      .replace(/^index$/, "");

  for (const match of html.matchAll(scriptPattern)) {
    blockCount++;
    const raw = match[1].replace(/\\u003c/g, "<");

    let schema;
    try {
      schema = JSON.parse(raw);
    } catch (error) {
      report(route, `invalid JSON-LD (${error.message})`);
      continue;
    }

    const context = schema["@context"];
    if (
      typeof context !== "string" ||
      !context.includes("schema.org")
    ) {
      report(route, `JSON-LD is missing a schema.org @context`);
    }

    const schemas = schema["@graph"]
      ? schema["@graph"]
      : [schema];

    for (const item of schemas) {
      const type = item["@type"];

      if (!type) {
        report(route, "JSON-LD graph item is missing @type");
        continue;
      }

      if (type === "FAQPage") {
        validateFaqPage(route, item);
      } else if (type === "Article") {
        validateArticle(route, item);
      } else if (
        type === "WebApplication" ||
        (Array.isArray(type) && type.includes("WebApplication"))
      ) {
        validateWebApplication(route, item);
      }
    }
  }
}

if (problems.length > 0) {
  console.error(
    `Found ${problems.length} structured data problem(s) across ${blockCount} JSON-LD blocks:\n`,
  );
  for (const problem of problems) {
    console.error(`  ${problem}`);
  }
  process.exit(1);
}

console.log(
  `Structured data check passed: ${blockCount} JSON-LD blocks across ${htmlFiles.length} pages are valid.`,
);
