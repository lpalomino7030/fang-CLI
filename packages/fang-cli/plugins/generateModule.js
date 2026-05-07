import fs from "fs";
import path from "path";

import { generateService } from "./generateService.js";
import { generateController } from "./generateController.js";
import { generateSchema } from "./GenerateSchema.js";

export function generateModule(nameModule) {
  const targetDir = path.resolve(process.cwd(), "src", nameModule);

  if (fs.existsSync(targetDir)) {
    console.error("Fang ERROR: The folder already exists");
    process.exit(1);
  }
  try {
    fs.mkdirSync(targetDir);
    generateSchema(nameModule, targetDir);
    generateService(nameModule, targetDir);
    generateController(nameModule, targetDir);

    console.log("Structure created successfully: ", nameModule);
  } catch (error) {
    console.error("Fang ERROR: Failed to create folder", error);
    process.exit(1);
  }
}
