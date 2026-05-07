import { execSync } from "child_process";
import fs from "fs";
import path from "path";

export async function startProject() {
  const packageJsonPath = path.resolve(process.cwd(), "package.json");

  if (!fs.existsSync(packageJsonPath)) {
    console.error("Fang ERROR: package.json not found");
    process.exit(1);
  }

  console.log("Starting Fang application...");

  execSync("node dist/index.js", {
    stdio: "inherit",
  });
}
