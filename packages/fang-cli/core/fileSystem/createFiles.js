import fs from "fs";
import path from "path";
import { loadTemplate } from "./loadTemplate.js";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const templateDir = path.join(__dirname, "../../templates/typescript");

export function createFiles(rootDir, projectName) {
  const variables = { projectName };

  const packageTemplate = loadTemplate(
    path.join(templateDir, "package.template.json"),
    variables,
  );

  const tsConfigTemplate = loadTemplate(
    path.join(templateDir, "tsconfig.template.json"),
    variables,
  );

  const indexTemplate = loadTemplate(
    path.join(templateDir, "index.template.ts"),
    variables,
  );

  const gitIgnoreTemplate = loadTemplate(
    path.join(templateDir, ".gitignore.template"),
    variables,
  );

  fs.writeFileSync(path.join(rootDir, "package.json"), packageTemplate);

  fs.writeFileSync(path.join(rootDir, "tsconfig.json"), tsConfigTemplate);

  fs.writeFileSync(path.join(rootDir, "src/index.ts"), indexTemplate);

  fs.writeFileSync(path.join(rootDir, ".gitignore"), gitIgnoreTemplate);
}
