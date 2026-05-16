import fs from "fs";
import path from "path";

import { createStructure } from "../core/fileSystem/createStructure.js";
import { createFiles } from "../core/fileSystem/createFiles.js";
import { installDependencies } from "../core/fileSystem/installDependencies.js";
import { tree } from "../core/terminal/tree.js";
import { bannerFang } from "../core/terminal/banner.js";

export function generateHandleProject(projectName) {
  const rootDir = path.resolve(process.cwd(), projectName);

  if (fs.existsSync(rootDir)) {
    console.error("Project already exists");
    process.exit(1);
  }

  bannerFang(projectName);

  console.log();
  console.log(`◇ Creating project ${projectName}`);
  console.log(tree.pipe);

  fs.mkdirSync(rootDir);

  console.log(tree.branch + "Creating structure...");
  createStructure(rootDir);

  console.log(tree.branch + "Creating files...");
  createFiles(rootDir, projectName);

  console.log(tree.last + "Installing dependencies...");
  installDependencies(rootDir);

  console.log(`
Project created successfully 🚀

cd ${projectName}
npm run dev
  `);
}
