import { colors } from "./colors.js";

export const badge = {
    success(message) {
        console.log(
            `${colors.bgGreen}${colors.white}${colors.bold} SUCCESS ${colors.reset} ${message}`
        );
    },

    error(message) {
        console.log(
            `${colors.bgRed}${colors.white}${colors.bold} ERROR ${colors.reset} ${message}`
        );
    },

    warn(message) {
        console.log(
            `${colors.bgYellow}${colors.black}${colors.bold} WARNING ${colors.reset} ${message}`
        );
    },

    info(message) {
        console.log(
            `${colors.bgCyan}${colors.black}${colors.bold} INFO ${colors.reset} ${message}`
        );
    },
}

export function colorizeBadge(badge, color) {
    return `${color}${colors.white}${colors.bold} ${badge} ${colors.reset}`;
}