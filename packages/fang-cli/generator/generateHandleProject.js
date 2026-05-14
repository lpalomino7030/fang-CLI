import fs from "fs";
import path from "path";

import { createStructure } from "../templates/core/createStructure.js";
import { createFiles } from "../templates/core/createFiles.js";
import { installDependencies } from "../templates/core/installDependencies.js";

export function generateHandleProject(projectName) {
  const rootDir = path.resolve(process.cwd(), projectName);

  if (fs.existsSync(rootDir)) {
    console.error("Project already exists");
    process.exit(1);
  }

  fs.mkdirSync(rootDir);

  console.log("Creating structure...");
  createStructure(rootDir);

  console.log("Creating files...");
  createFiles(rootDir, projectName);

  console.log("Installing dependencies...");
  installDependencies(rootDir);

  console.log(`
Project created successfully 🚀

cd ${projectName}
npm run dev
  `);
}
