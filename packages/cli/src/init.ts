import { readFile, access } from "node:fs/promises";
import { join } from "node:path";

interface AliasCheck {
  file: string;
  found: boolean;
}

async function fileExists(path: string): Promise<boolean> {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function checkTsconfig(cwd: string): Promise<AliasCheck> {
  // Modern Vite+React scaffolds split into tsconfig.app.json; fall back to
  // the plain tsconfig.json for older/simpler setups. Real, documented gotcha
  // (shadcn/ui#4746): writing to the wrong one is a common real bug.
  const candidates = ["tsconfig.app.json", "tsconfig.json"];

  for (const name of candidates) {
    const path = join(cwd, name);
    if (await fileExists(path)) {
      const content = await readFile(path, "utf-8");
      // tsconfig files commonly contain comments (JSONC) — JSON.parse would
      // throw on those, so a plain string check is more robust here than
      // a real parse.
      const found = content.includes('"@/*"');
      return { file: name, found };
    }
  }

  return { file: "tsconfig.json (not found)", found: false };
}

async function checkViteConfig(cwd: string): Promise<AliasCheck> {
  const candidates = ["vite.config.ts", "vite.config.js"];

  for (const name of candidates) {
    const path = join(cwd, name);
    if (await fileExists(path)) {
      const content = await readFile(path, "utf-8");
      const found = content.includes('"@"') || content.includes("'@'");
      return { file: name, found };
    }
  }

  return { file: "vite.config.ts (not found)", found: false };
}

export async function init() {
  const cwd = process.cwd();
  console.log('Checking for the "@" import alias...\n');

  const tsconfigCheck = await checkTsconfig(cwd);
  const viteCheck = await checkViteConfig(cwd);

  if (tsconfigCheck.found && viteCheck.found) {
    console.log(`✓ Alias already configured in ${tsconfigCheck.file} and ${viteCheck.file}.`);
    console.log('You\'re ready to run "avara add <component>".');
    return;
  }

  console.log('The "@" alias isn\'t fully configured yet. Add the following:\n');

  if (!tsconfigCheck.found) {
    console.log(`── ${tsconfigCheck.file} ──`);
    console.log(`{
  "compilerOptions": {
    // ...
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
`);
  } else {
    console.log(`✓ ${tsconfigCheck.file} already has the alias.\n`);
  }

  if (!viteCheck.found) {
    console.log(`── ${viteCheck.file} ──`);
    console.log(`import path from "path";
// ...
export default defineConfig({
  // ...
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
`);
  } else {
    console.log(`✓ ${viteCheck.file} already has the alias.\n`);
  }

  console.log(
    'Once both are in place, run "avara init" again to confirm, or just start using "avara add".',
  );
  console.log(
    '\nNote: this check looks for the literal string "@" in your config files — it can be fooled by an unrelated "@" elsewhere in the file. If you already have the alias configured and still see this message, trust your own setup over this check.',
  );
}
