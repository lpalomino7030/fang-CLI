import fs from "fs";
import path from "path";

import { generateService } from "./generateService.js";
import { generateController } from "./generateController.js";
import { generateSchema } from "./GenerateSchema.js";

import { logger } from "../core/terminal/logger.js";
import { colorize, colors } from "../core/terminal/colors.js";
import { tree } from "../core/terminal/tree.js";
import { badge, colorizeBadge } from "../core/terminal/badge.js";

export function generateModule(nameModule) {
  const targetDir = path.resolve(process.cwd(), "src", nameModule);

  if (fs.existsSync(targetDir)) {
    logger.error(`  🐺  Fang ERROR: The folder ` + colorize(colors.yellow, nameModule) + colorize(colors.red, ` already exists`));
    process.exit(1);
  }

  try {
    fs.mkdirSync(targetDir);
    // console.log(`Creating module ` + colorizeBadge(`${nameModule}`, colors.bgBlue));
    generateSchema(nameModule, targetDir);
    generateService(nameModule, targetDir);
    generateController(nameModule, targetDir);

    console.log(`◇ Creating module ${nameModule}`);
    console.log(tree.pipe);

    console.log(`${tree.branch} schema created`);
    console.log(`${tree.branch} service created`);
    console.log(`${tree.last} controller created`);

    console.log();
    logger.success("Done");

  } catch (error) {
    logger.error(`  🐺  Fang ERROR: Failed to create folder ` + colorize(colors.red, error));
    process.exit(1);
  }
}
