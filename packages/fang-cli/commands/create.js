import { ask } from "../core/prompts/prompts.js";
import { generateProject } from "../generator/generateProject.js";
import { generateHandleProject } from "../generator/generateHandleProject.js";
import { resolveFlags } from "../core/parser/resolveFlags.js";


const start = Date.now();

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

  let configuration = {};

  configuration = resolveFlags(flags);

  try {
    generateProject(projectName, configuration);


  } catch (error) {
    console.error(error.message);

  }

}
