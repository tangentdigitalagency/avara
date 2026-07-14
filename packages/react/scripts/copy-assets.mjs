import { copyFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";

const from = "src/styles/theme.css";
const to = "dist/styles.css";

mkdirSync(dirname(to), { recursive: true });
copyFileSync(from, to);

console.log(`Copied ${from} -> ${to}`);