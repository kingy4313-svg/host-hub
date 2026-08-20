import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

process.env.NITRO_COMPATIBILITY_DATE ||= "2025-07-13";

const viteEntry = fileURLToPath(new URL("../node_modules/vite/bin/vite.js", import.meta.url));
const result = spawnSync(process.execPath, [viteEntry, "build"], { stdio: "inherit" });

if (result.error) throw result.error;
process.exit(result.status ?? 1);