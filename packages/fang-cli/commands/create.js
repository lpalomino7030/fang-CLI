import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";
import { copyFolder } from "../plugins/CopyFolder.js";
import { replaceProjectName } from "../plugins/ReplaceProjectName.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function createProject(projectName, flags = []) {
  if (!projectName) {
    console.error("Debes especificar un nombre de proyecto");
    process.exit(1);
  }

  const targetDir = path.resolve(process.cwd(), projectName);

  if (fs.existsSync(targetDir)) {
    console.error("La carpeta ya existe");
    process.exit(1);
  }

  // Template por defecto
  let template = "api";

  // Leer flags simples
  const templateFlag = flags.find((f) => f.startsWith("--template="));
  if (templateFlag) {
    template = templateFlag.split("=")[1];
  }

  const templateDir = path.join(__dirname, "../templates", template);

  if (!fs.existsSync(templateDir)) {
    console.error(`Template "${template}" no existe`);
    process.exit(1);
  }

  copyFolder(templateDir, targetDir);

  replaceProjectName(targetDir, projectName);

  console.log("Instalando dependencias...");
  execSync("npm install", { cwd: targetDir, stdio: "inherit" });

  console.log(`
Proyecto creado correctamente 🎉

cd ${projectName}
npm run dev
  `);
}
