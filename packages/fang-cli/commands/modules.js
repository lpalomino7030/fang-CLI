import { generateModule } from "../generator/generateModule.js";

export function module(nameModule) {
  if (!nameModule) {
    console.error("Module name is required");
    return;
  }

  generateModule(nameModule);

}
