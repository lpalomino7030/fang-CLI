import fs from "fs";

export function loadTemplate(templatePath, variables = {}) {
  let content = fs.readFileSync(templatePath, "utf-8");

  for (const [key, value] of Object.entries(variables)) {
    content = content.replaceAll(`{{${key}}}`, value);
  }

  return content;
}
