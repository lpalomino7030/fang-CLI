import { colors } from "./colors.js";

export const logger = {
    success(message) {
        console.log(
            `${colors.green}✔ ${message}${colors.reset}`
        );
    },

    error(message) {
        console.log(
            `${colors.red}✖ ${message}${colors.reset}`
        );
    },

    warn(message) {
        console.log(
            `${colors.yellow}⚠ ${message}${colors.reset}`
        );
    },

    info(message) {
        console.log(
            `${colors.cyan}ℹ ${message}${colors.reset}`
        );
    },
};
