import { colors } from "../types/colors-enum.js";

/**
 * Utility class for formatted console logging with ANSI colors.
 */
export class Logger {
  constructor() {}

  /**
   * Logs an informational message with a cyan [INFO] tag.
   * @param msg - The message to display in the console.
   */
  info(msg: string) {
    console.log(`${colors.cyan}[INFO]${colors.reset} ${msg}`);
  }

  /**
   * Logs a warning message with a yellow [WARN] tag.
   * @param msg - The warning message to display.
   */
  warm(msg: string) {
    console.log(`${colors.yellow}[WARN]${colors.reset} ${msg}`);
  }

  /**
   * Logs an error message with a red [ERROR] tag.
   * @param msg - The error message to display.
   */
  error(msg: string) {
    console.log(`${colors.red}[ERROR]${colors.reset} ${msg}`);
  }

  /**
   * Logs a message with a fully customizable tag and color.
   * @param msg - The main message to display.
   * @param tag - The label to show inside the brackets (e.g., "DATABASE").
   * @param color - The ANSI color code from the colors enum.
   */
  custom(msg: string, tag: string, color: colors) {
    console.log(`${color}[${tag}]${colors.reset} ${msg}`);
  }
}
