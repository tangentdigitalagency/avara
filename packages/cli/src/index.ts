import { Command } from "commander";
import { addComponents } from "./add.js";

const program = new Command();

program
  .name("avara")
  .description("Avara — CLI for adding components to your project.")
  .version("0.0.0");

program
  .command("add")
  .description("Add one or more components to your project")
  .argument("<components...>", "component names to add (e.g. button toast)")
  .option("-y, --yes", "skip confirmation prompts")
  .action(async (components: string[], options: { yes?: boolean }) => {
    try {
      await addComponents(components, options);
    } catch (error) {
      console.error(error instanceof Error ? error.message : error);
      process.exit(1);
    }
  });

program.parse();
