import { colorize, colors } from "../core/terminal/colors.js";

export function help() {
    console.log("");

    console.log(
        colorize(colors.blue, "🐺 FANG CLI")
    );
    console.log("");
    console.log(
        colorize(colors.white, "Usage:")
    );

    console.log(
        colorize(colors.blue, "    fang ") + colorize(colors.yellow, "<command>") + " " + colorize(colors.white, "[options]")
    );


    console.log("");

    console.log(
        colorize(colors.white, "Commands:")
    );

    console.log(
        colorize(colors.white, "  create <name>   ") + colorize(colors.yellow, "Create a new Fang project")
    );

    console.log(
        colorize(colors.white, "  start           ") + colorize(colors.yellow, "Start production server")
    );

    console.log(
        colorize(colors.white, "  dev             ") + colorize(colors.yellow, "Run development server")
    );

    console.log(
        colorize(colors.white, "  build           ") + colorize(colors.yellow, "Build the project")
    );

    console.log(
        colorize(colors.white, "  module          ") + colorize(colors.yellow, "Generate a module")
    );

    console.log(
        colorize(colors.white, "  version, --version, -v   ") + colorize(colors.yellow, "Show CLI version")
    );

    console.log(
        colorize(colors.white, "  help, --help, -h      ") + colorize(colors.yellow, "Show help menu")
    );

    console.log("");
}