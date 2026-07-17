import { writeFile, mkdir, access } from "node:fs/promises";
import { dirname, join } from "node:path";
import { execSync } from "node:child_process";
import prompts from "prompts";
import { resolveDependencyTree, type RegistryFile } from "./registry.js";

async function detectPackageManager(cwd: string): Promise<"pnpm" | "yarn" | "bun" | "npm"> {
  const lockfiles: [string, "pnpm" | "yarn" | "bun"][] = [
    ["pnpm-lock.yaml", "pnpm"],
    ["yarn.lock", "yarn"],
    ["bun.lockb", "bun"],
  ];
  for (const [file, manager] of lockfiles) {
    try {
      await access(join(cwd, file));
      return manager;
    } catch {
      // not this one, keep checking
    }
  }
  return "npm";
}
function resolveTargetPath(file: RegistryFile, cwd: string, itemName: string): string {
  if (file.target) {
    return join(cwd, file.target.replace(/^~\//, ""));
  }
  const fileName = file.path.split("/").pop()!;
  if (file.type === "registry:lib") {
    // Matches the @/lib/* aliases baked into components' rewritten imports.
    const aliasedName = itemName === "motion" ? "avara-motion" : itemName;
    return join(cwd, "src", "lib", `${aliasedName}.${fileName.split(".").pop()}`);
  }
  return join(cwd, "src", "components", "ui", itemName, fileName);
}

export async function addComponents(names: string[], options: { yes?: boolean } = {}) {
  const cwd = process.cwd();

  console.log(`Resolving ${names.join(", ")}...`);
  const { items, npmDependencies } = await resolveDependencyTree(names);

  const requestedSet = new Set(names);
  const pulledIn = items.filter((item) => !requestedSet.has(item.name)).map((item) => item.name);

  if (pulledIn.length > 0 && !options.yes) {
    const { proceed } = await prompts({
      type: "confirm",
      name: "proceed",
      message: `This will also install required dependencies: ${pulledIn.join(", ")}. Continue?`,
      initial: true,
    });
    if (!proceed) {
      console.log("Cancelled.");
      return;
    }
  }

  for (const item of items) {
    for (const file of item.files) {
      const targetPath = resolveTargetPath(file, cwd, item.name);
      await mkdir(dirname(targetPath), { recursive: true });
      await writeFile(targetPath, file.content);
      console.log(`  ✓ ${targetPath.replace(cwd + "/", "")}`);
    }
  }

  if (npmDependencies.size > 0) {
    const deps = [...npmDependencies];
    const manager = await detectPackageManager(cwd);
    const installCmd = manager === "npm" ? "npm install" : `${manager} add`;

    if (options.yes) {
      console.log(`\nInstalling: ${deps.join(", ")}`);
      execSync(`${installCmd} ${deps.join(" ")}`, { cwd, stdio: "inherit" });
    } else {
      const { install } = await prompts({
        type: "confirm",
        name: "install",
        message: `Install required npm dependencies now? (${deps.join(", ")})`,
        initial: true,
      });
      if (install) {
        execSync(`${installCmd} ${deps.join(" ")}`, { cwd, stdio: "inherit" });
      } else {
        console.log(`\nRun this yourself when ready:\n  ${installCmd} ${deps.join(" ")}`);
      }
    }
  }

  console.log(
    `\nNote: components use "@/..." import aliases. Make sure your tsconfig/vite config has "@" pointing at your "src" directory.`,
  );
  console.log(`\nDone. Added: ${items.map((i) => i.name).join(", ")}`);
}
