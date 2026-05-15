import { colorize, colors } from "../core/terminal/colors.js";

import { FRAMEWORK_VERSION, CLI_VERSION } from "../core/utils/constant.js";

export function version() {
    console.log(
        colorize(colors.white, "🐺 -> ") +
        colorize(colors.blue, "FANG CLI version : ") +
        colorize(colors.green, CLI_VERSION)
    );

    console.log(colorize(colors.white, "⚡ -> ") +
        colorize(colors.blue, "FANG FRAMEWORK version : ") +
        colorize(colors.green, FRAMEWORK_VERSION)
    );
}