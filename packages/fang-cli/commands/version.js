import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { colorize, colors } from "../core/terminal/colors.js";

const __dirname = path.dirname(
    fileURLToPath(import.meta.url)
);

const packageJsonPath = path.join(
    __dirname,
    "../package.json"
);

const packageJson = JSON.parse(
    fs.readFileSync(packageJsonPath, "utf-8")
);

const verifyDependency = packageJson.dependencies;

export function version() {
    console.log(
        colorize(colors.white, "🐺 -> ") +
        colorize(colors.blue, "FANG CLI version : ") +
        colorize(colors.green, packageJson.version)
    );

    console.log(verifyDependency)
}