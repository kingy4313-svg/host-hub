import { cp, mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";
import { join } from "node:path";

const root = fileURLToPath(new URL("..", import.meta.url));
const dist = join(root, "dist");
const githubPagesBase = "/host-hub";

const build = spawnSync(process.execPath, [join(root, "scripts", "build.mjs")], {
  cwd: root,
  env: { ...process.env, VITE_STATIC_SITE: "true" },
  stdio: "inherit",
});

if (build.error) throw build.error;
if (build.status !== 0) process.exit(build.status ?? 1);

const serverEntry = pathToFileURL(join(root, ".output", "server", "index.mjs"));
const { default: handler } = await import(serverEntry.href);
const response = await handler.fetch(
  new Request("https://kingy4313-svg.github.io/"),
  {},
  { waitUntil() {} },
);

if (!response.ok) {
  throw new Error(`GitHub Pages home page render failed with status ${response.status}`);
}

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
await cp(join(root, ".output", "public"), dist, { recursive: true });
await cp(join(root, "src", "assets"), join(dist, "src", "assets"), { recursive: true });

async function rewriteBundledAssetUrls(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      await rewriteBundledAssetUrls(path);
      continue;
    }
    if (!/\.(css|js)$/.test(entry.name)) continue;
    const source = await readFile(path, "utf8");
    const rewritten = source.replace(
      /(?<!\/host-hub)(?<!src)\/assets\//g,
      `${githubPagesBase}/assets/`,
    ).replace(
      /(["'`])assets\//g,
      `$1${githubPagesBase}/assets/`,
    );
    if (rewritten !== source) await writeFile(path, rewritten, "utf8");
  }
}

await rewriteBundledAssetUrls(dist);

const html = (await response.text()).replace(
  /(["'(])\/(assets\/|src\/assets\/|favicon\.ico)/g,
  `$1${githubPagesBase}/$2`,
);
await writeFile(join(dist, "index.html"), html, "utf8");
await writeFile(join(dist, "404.html"), html, "utf8");
await writeFile(join(dist, ".nojekyll"), "", "utf8");

console.log("GitHub Pages output written to dist/");
