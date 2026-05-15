import { generateModule } from "../generator/generateModule.js";

export function module(nameModule, flags) {
  if (!nameModule) {
    console.error("Module name is required");
    return;
  }

  generateModule(nameModule);

}
