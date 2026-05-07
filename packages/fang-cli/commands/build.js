import { execSync } from "child_process";
import fs from "fs";
import path from "path";

export async function buildProject() {
  const tsconfigPath = path.resolve(process.cwd(), "tsconfig.json");

  if (!fs.existsSync(tsconfigPath)) {
    console.error("Fang ERROR: tsconfig.json not found");
    process.exit(1);
  }

  console.log("Building project...");

  execSync("npm run build", {
    stdio: "inherit",
  });

  console.log("Build completed");
}
