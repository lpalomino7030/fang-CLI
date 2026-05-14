import { ask } from "../core/prompt/prompt.js";
import { generateProject } from "..//generator/generateProject.js";
import { generateHandleProject } from "../generator/generateHandleProject.js";

export async function createProject(projectName, flags = []) {
  let template = "default";

  // INTERACTIVE MODE
  if (!projectName) {
    projectName = await ask("Project name: ");

    const language = await ask("Language (ts/js): ");

    template = language.toLowerCase() === "js" ? "api" : "default";

    console.log("Selected lenguage", template);

    generateHandleProject(projectName);
    // generateProject(template, projectName);
    return;
  }

  // FLAG MODE
  const templateFlag = flags.find((f) => f.startsWith("--template="));

  // fang create myapp
  if (!templateFlag) {
    generateProject("default", projectName);
    return;
  }

  // fang create myapp --template=api
  template = templateFlag.split("=")[1];

  generateProject(template, projectName);
}
