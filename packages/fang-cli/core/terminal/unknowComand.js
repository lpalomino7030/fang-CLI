
import { colorize, colors } from "./colors.js";


export function unknowComand(unknowComand) {
    console.log("");

    console.log(
        colorize(colors.red, `✖ Unknown command  ` + colorize(colors.yellow, "fang ") + colorize(colors.red, `"${unknowComand}"`))
    );

    console.log("");

    console.log(
        "Use fang --help to see available commands."
    );

    console.log("");

}