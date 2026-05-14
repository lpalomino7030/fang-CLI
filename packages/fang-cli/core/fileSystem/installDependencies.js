import { execSync } from "child_process";

export function installDependencies(rootDir) {
  execSync("npm install", {
    cwd: rootDir,
    stdio: "inherit",
  });
}
