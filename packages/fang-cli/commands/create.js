import { ask } from "../core/prompts/prompts.js";
import { generateProject } from "../generator/generateProject.js";
import { generateHandleProject } from "../generator/generateHandleProject.js";

export async function createProject(projectName, flags = []) {

  // INTERACTIVE MODE
  if (!projectName) {
    projectName = await ask("Project name: (Backend)");

    if (!projectName) {
      projectName = "Backend";
    }

    generateHandleProject(projectName);
    return;
  }

  // FLAG MODE
  const templateFlag = flags.find((f) => f.startsWith("--template="));

  // fang create myapp
  // if (!templateFlag) {
  //   generateProject("default", projectName);
  //   return;
  // }

  // fang create myapp --template=api
  const template = templateFlag.split("=")[1];

  generateProject(template, projectName);
}
