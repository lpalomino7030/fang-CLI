import fs from "fs";
import { execSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
import { copyFolder } from "../core/fileSystem/copyFolder.js";
import { replaceProjectName } from "../core/utils/replaceProjectName.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export function generateProject(projectName, configuration) {
  const targetDir = path.resolve(process.cwd(), projectName);

  if (fs.existsSync(targetDir)) {
    console.error("Fang ERROR: The folder already exists");

    process.exit(1);
  }

  const templateDir = path.join(__dirname, "../templates", configuration.template);

  if (!fs.existsSync(templateDir)) {
    console.error(`Fang ERROR: Template "${configuration.template}" does not exist`);

    process.exit(1);
  }

  copyFolder(templateDir, targetDir);

  replaceProjectName(targetDir, projectName);

  console.log("Installing dependencies...");

  execSync("npm install", {
    cwd: targetDir,
    stdio: "inherit",
  });

  console.log(`
Project created successfully

cd ${projectName}
npm run dev
  `);
}
