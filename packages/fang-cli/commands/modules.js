import { generateModule } from "../generator/generate";

export function module(nameModule) {
  if (!nameModule) {
    console.error("Module name is required");
    return;
  }

  generateModule(nameModule);

}
