import { generateComponent } from "../generator/generateComponent.js";

export function component(nameModule) {
  if (!nameModule) {
    console.error("Module name is required");
    return;
  }

  generateComponent(nameModule);

}
