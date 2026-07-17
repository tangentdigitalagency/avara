const REGISTRY_BASE_URL =
  "https://raw.githubusercontent.com/tangentdigitalagency/avara/main/packages/registry/public/r";

export interface RegistryFile {
  path: string;
  type: string;
  target?: string;
  content: string;
}

export interface RegistryItem {
  name: string;
  type: string;
  title: string;
  description: string;
  registryDependencies?: string[];
  dependencies?: string[];
  files: RegistryFile[];
}

export async function fetchRegistryItem(name: string): Promise<RegistryItem> {
  const url = `${REGISTRY_BASE_URL}/${name}.json`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Component "${name}" not found in registry (${response.status} at ${url})`);
  }
  return response.json();
}

export async function resolveDependencyTree(
  names: string[],
): Promise<{ items: RegistryItem[]; npmDependencies: Set<string> }> {
  const resolved = new Map<string, RegistryItem>();
  const npmDependencies = new Set<string>();

  async function resolve(name: string) {
    if (resolved.has(name)) return;
    const item = await fetchRegistryItem(name);
    resolved.set(name, item);
    item.dependencies?.forEach((dep) => npmDependencies.add(dep));
    for (const depName of item.registryDependencies ?? []) {
      await resolve(depName);
    }
  }

  for (const name of names) {
    await resolve(name);
  }

  return { items: [...resolved.values()], npmDependencies };
}
