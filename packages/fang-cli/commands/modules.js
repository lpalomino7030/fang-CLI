import { generateModule } from "../plugins/generateModule.js";

export function module(nameModule, flags) {
  if (!nameModule) {
    console.error("Module name is required");
    return;
  }

  generateModule(nameModule);

  console.log("Module created successfully");
}
