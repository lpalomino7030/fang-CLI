import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { generateStyle } from "./generateStyle.js";
import { generateLogic } from "./generateLogic.js";

import { logger } from "../core/terminal/logger.js";
import { colorize, colors } from "../core/terminal/colors.js";
import { tree } from "../core/terminal/tree.js";
import { bannerCompact } from "../core/terminal/banner.js";

export function generateComponent(nameComponent) {
const targetDir = path.resolve(
  process.cwd(),
  "src",
  "components",
  nameComponent
);

  if (!nameComponent) {
    logger.error(
      `  🐺  Fang ERROR: The folder ` +
        colorize(colors.yellow, nameModule) +
        colorize(colors.red, ` already exists`),
    );
    return;
  }

  try {
    fs.mkdirSync(targetDir,{ recursive: true });

    console.log();

    console.log(colorize(colors.blue, `◇  `) + `Creating module ${nameComponent}`);
    console.log(colorize(colors.blue, tree.pipe));

    generateStyle(nameComponent, targetDir);
    generateLogic(nameComponent, targetDir);

    console.log();
    logger.success("  🐺 Done");
    console.log();

  } catch (error) {
    logger.error(
      `  🐺  Fang ERROR: Failed to create folder ` +
        colorize(colors.red, error),
    );
    process.exit(1);
  }
}
