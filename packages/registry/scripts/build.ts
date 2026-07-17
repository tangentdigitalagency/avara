import { readFile, writeFile, mkdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, "..", "..", "..");
const REGISTRY_PATH = join(__dirname, "..", "registry.json");
const OUTPUT_DIR = join(__dirname, "..", "public", "r");

interface RegistryFile {
  path: string;
  type: string;
  target?: string;
}

interface RegistryItem {
  name: string;
  type: string;
  title: string;
  description: string;
  registryDependencies?: string[];
  dependencies?: string[];
  files: RegistryFile[];
}

interface Registry {
  $schema: string;
  name: string;
  homepage: string;
  items: RegistryItem[];
}

const IMPORT_REWRITES: [RegExp, string][] = [
  [/from ["']\.\.\/\.\.\/lib\/cn["']/g, 'from "@/lib/cn"'],
  [/from ["']\.\.\/\.\.\/lib\/slot-class-names["']/g, 'from "@/lib/slot-class-names"'],
  [/from ["']\.\.\/\.\.\/lib\/color-focus-ring["']/g, 'from "@/lib/color-focus-ring"'],
  [/from ["']@avara\/motion["']/g, 'from "@/lib/avara-motion"'],
  [/from ["']\.\.\/button\/button\.variants["']/g, 'from "@/components/ui/button/button-variants"'],
];

function rewriteImports(content: string): string {
  return IMPORT_REWRITES.reduce(
    (acc, [pattern, replacement]) => acc.replace(pattern, replacement),
    content,
  );
}

async function build() {
  const raw = await readFile(REGISTRY_PATH, "utf-8");
  const registry: Registry = JSON.parse(raw);

  await mkdir(OUTPUT_DIR, { recursive: true });

  for (const item of registry.items) {
    const filesWithContent = await Promise.all(
      item.files.map(async (file) => {
        const absolutePath = join(REPO_ROOT, file.path);
        const rawContent = await readFile(absolutePath, "utf-8");
        const content = rewriteImports(rawContent);
        return { ...file, content };
      }),
    );

    const builtItem = { ...item, files: filesWithContent };
    const outputPath = join(OUTPUT_DIR, `${item.name}.json`);
    await writeFile(outputPath, JSON.stringify(builtItem, null, 2));
    console.log(`Built ${item.name}.json`);
  }

  console.log(`\n${registry.items.length} items built to ${OUTPUT_DIR}`);
}

build().catch((err) => {
  console.error("Build failed:", err);
  process.exit(1);
});
