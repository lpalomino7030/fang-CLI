import { colors, colorize } from "../core/terminal/colors.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";


export function addFeature(flags) {
    const packageJsonExists = fs.existsSync(path.resolve(process.cwd(), "package.json"));
    const srcExists = fs.existsSync(path.resolve(process.cwd(), "src"));

    if (!packageJsonExists) {
        return console.log(colorize(colors.red, "Fang ERROR: Please run this command in a Fang project directory."));
    }

    try {
        if (srcExists) {
            switch (flags[0]) {
                case "--auth":
                case "--a":
                    const authValue = true;
                    console.log("Adding auth..." + authValue);
                    break;
                case "--database":
                case "--db":
                    const dbValue = flags.slice(1).join(" ").trim();
                    console.log("Adding database...");
                    break;
                default:
                    console.log("Fang ERROR: 'fang add <flag>', flag not found");
                    break;
            }

        }

    } catch (error) {
        console.log(colorize(colors.red, "Fang ERROR: 'fang add <flag>', flag not found"));
    }

}