export const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  blue: "\x1b[34m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m",
  magenta: "\x1b[35m"
};

export const logger = {
  info: (msg: string) => console.log(`${colors.cyan}[Fang-js]${colors.reset} ${msg}`),
  ready: (port: number) => {
    console.log(`
${colors.magenta}   ___  _   _  _  __ 
  | __|/ \\ | \\| |/ _|  ${colors.blue}  _
  | _|/ ^ \\| .  | (_ |  ${colors.blue} / |
  |_|/_/ \\_\\_|\\_|\\__|  ${colors.blue}/_/ ${colors.reset}
 
${colors.green}🐺 Server ready at:${colors.reset} http://localhost:${port}
    `);
  }
};