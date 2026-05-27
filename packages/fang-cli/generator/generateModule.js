import fs from "fs";
import path from "path";

import { generateService } from "./generateService.js";
import { generateController } from "./generateController.js";
import { generateSchema } from "./GenerateSchema.js";

import { logger } from "../core/terminal/logger.js";
import { colorize, colors } from "../core/terminal/colors.js";
import { tree } from "../core/terminal/tree.js";
import { bannerCompact } from "../core/terminal/banner.js";


export function generateModule(nameModule) {
  const targetDir = path.resolve(process.cwd(), "src", nameModule);

  if (fs.existsSync(targetDir)) {
    logger.error(`  🐺  Fang ERROR: The folder ` + colorize(colors.yellow, nameModule) + colorize(colors.red, ` already exists`));
    process.exit(1);    process.exit(1);
  }

  try {
    fs.mkdirSync(targetDir);

    bannerCompact();

    console.log(colorize(colors.blue, `◇  `) + `Creating module ${nameModule}`);
    console.log(colorize(colors.blue, tree.pipe));
    generateSchema(nameModule, targetDir);
    generateService(nameModule, targetDir);
    generateController(nameModule, targetDir);

    console.log();
    logger.success("  🐺 Done");
    console.log();


  } catch (error) {
    logger.error(`  🐺  Fang ERROR: Failed to create folder ` + colorize(colors.red, error));
    process.exit(1);
  }
}
