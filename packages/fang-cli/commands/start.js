import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { colors, colorize } from "../core/terminal/colors.js";


export async function startProject() {
  const packageJsonPath = path.resolve(process.cwd(), "package.json");

  if (!fs.existsSync(packageJsonPath)) {
    console.error(colorize(colors.red, "Fang ERROR: "));

    console.log(colorize(colors.red, " 🐺  Please run this command in a Fang project directory."));
    process.exit(1);
  }

  console.log(colorize(colors.green, "Starting Fang application..."));

  try {
    execSync("node dist/index.js", {
      stdio: "inherit",
    });
  } catch (error) {
    console.error(colorize(colors.red, "Fang ERROR: "));
    console.log(colorize(colors.red, " 🐺  Error starting application."));
    console.log(colorize(colors.red, " 🐺  Please run 'fang build' first."));
    process.exit(1);
  }
}
