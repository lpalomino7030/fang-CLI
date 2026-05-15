export const colors = {
    reset: "\x1b[0m",
    white: "\x1b[37m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",

    bold: "\x1b[1m",
};

export function colorize(color, text) {
    return `${color}${text}${colors.reset}`;
}
