import fs from "fs";
import path from "path";

import { createStructure } from "../core/fileSystem/createStructure.js";
import { createFiles } from "../core/fileSystem/createFiles.js";
import { installDependencies } from "../core/fileSystem/installDependencies.js";

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
