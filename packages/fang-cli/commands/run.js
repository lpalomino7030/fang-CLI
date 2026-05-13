import fs from "fs";
import path from "path";
import { execSync, spawn } from "child_process";

export function runProject() {
  const targetDir = path.resolve(process.cwd(), "src");

  let child = null;
  let timeout;

  // BUILD
  function buildProject() {
    console.log("Building project...");

    execSync("npm run build", {
      stdio: "inherit",
    });
  }

  // START
  function startProject() {
    console.log("Starting project...");

    child = spawn("node", ["dist/index.js"], {
      stdio: "inherit",
    });
  }

  // RESTART
  function restartProject() {
    console.log("Restarting project...");

    if (child) {
      child.once("exit", () => {
        buildProject();
        startProject();
      });

      child.kill();

      return;
    }

    buildProject();
    startProject();
  }

  // VALIDATION
  if (!fs.existsSync(targetDir)) {
    console.error("Source directory not found");
    process.exit(1);
  }

  // WATCHER
  fs.watch(targetDir, { recursive: true }, (_, filename) => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      console.log(`Changed: ${filename}`);

      restartProject();
    }, 200);
  });

  // INITIAL START
  buildProject();
  startProject();
}
