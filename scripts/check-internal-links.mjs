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

const hrefPattern = /<a\b[^>]*\shref=["']([^"']+)["']/gi;

// Files that exist as literal routes rather than "<route>.html", e.g.
// /robots.txt, /sitemap.xml, /manifest.webmanifest, /favicon.ico.
function routeExists(routePath) {
  const trimmed = routePath.replace(/^\/+/, "");
  const htmlCandidate = path.join(
    appDir,
    trimmed === "" ? "index.html" : `${trimmed}.html`,
  );
  if (fs.existsSync(htmlCandidate)) {
    return true;
  }

  const literalCandidate = path.join(appDir, trimmed);
  return fs.existsSync(literalCandidate);
}

const broken = [];
const checked = new Set();

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, "utf8");
  const sourceRoute =
    "/" +
    path
      .relative(appDir, file)
      .replace(/\.html$/, "")
      .replace(/\\/g, "/")
      .replace(/^index$/, "");

  for (const match of html.matchAll(hrefPattern)) {
    const rawHref = match[1];

    // Only internal, same-origin, path-based links.
    if (
      !rawHref.startsWith("/") ||
      rawHref.startsWith("//") ||
      rawHref.startsWith("/api/")
    ) {
      continue;
    }

    const [pathname] = rawHref.split(/[?#]/);
    if (pathname === "") {
      continue;
    }

    const key = `${sourceRoute} -> ${pathname}`;
    if (checked.has(key)) {
      continue;
    }
    checked.add(key);

    if (!routeExists(pathname)) {
      broken.push({ sourceRoute, href: rawHref });
    }
  }
}

if (broken.length > 0) {
  console.error(
    `Found ${broken.length} internal link(s) pointing at routes that don't exist in the build output:\n`,
  );
  for (const { sourceRoute, href } of broken) {
    console.error(`  ${sourceRoute || "/"} -> ${href}`);
  }
  process.exit(1);
}

console.log(
  `Internal link check passed: ${checked.size} unique internal links across ${htmlFiles.length} pages all resolve.`,
);
