import fs from "fs";
import path from "path";

export function replaceProjectName(dir, name) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);

    if (fs.lstatSync(fullPath).isDirectory()) {
      replaceProjectName(fullPath, name);
    } else {
      let content = fs.readFileSync(fullPath, "utf-8");

      content = content.replace(/__PROJECT_NAME__/g, name);

      fs.writeFileSync(fullPath, content);
    }
  }
}
