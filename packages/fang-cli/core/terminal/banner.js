import { colors } from "./colors.js";

const bannerColors = [
    colors.magenta,
    colors.cyan,
    colors.green,
    colors.blue,
    colors.yellow,
];

function randomColor() {
    return bannerColors[
        Math.floor(Math.random() * bannerColors.length)
    ];
}

export function bannerCompact() {
    const color = randomColor();
    console.log(`
${color}
█▀▀ ▄▀█ █▄░█ █▀▀   █▀▀ █░░ █
█▀░ █▀█ █░▀█ █▄█   █▄▄ █▄▄ █
${color}
`);
}

export function bannerFang(name) {
    console.log(`
${colors.magenta}███████╗ █████╗ ███╗   ██╗ ██████╗${colors.reset}    ${colors.cyan}███████╗██╗     ██╗${colors.reset}
${colors.magenta}██╔════╝██╔══██╗████╗  ██║██╔════╝${colors.reset}    ${colors.cyan}██╔════╝██║     ██║${colors.reset}
${colors.magenta}█████╗  ███████║██╔██╗ ██║██║  ███╗${colors.reset}   ${colors.cyan}██║     ██║     ██║${colors.reset}
${colors.magenta}██╔══╝  ██╔══██║██║╚██╗██║██║   ██║${colors.reset}   ${colors.cyan}██║     ██║     ██║${colors.reset}
${colors.magenta}██║     ██║  ██║██║ ╚████║╚██████╔╝${colors.reset}   ${colors.cyan}╚██████╗███████╗██║${colors.reset}
${colors.magenta}╚═╝     ╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝${colors.reset}     ${colors.cyan}╚═════╝╚══════╝╚═╝${colors.reset}

${colors.green}✔ ${name} initialized${colors.reset}
`);
}