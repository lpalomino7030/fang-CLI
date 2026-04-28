import { colors } from "../types/colors-enum.js";

export interface ILogger {
  info(msg: string): void;
  warn(msg: string): void;
  error(msg: string): void;
  logHttp(
    method: string,
    url: string,
    ms: number,
    statusCode: number,
    isError?: boolean,
  ): void;
  custom(msg: string, tag: string, color: colors): void;
}

/**
 * Utility class for formatted console logging with ANSI colors.
 */
export class Logger implements ILogger {
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
  warn(msg: string) {
    console.log(`${colors.yellow}[WARN]${colors.reset} ${msg}`);
  }

  /**
   * Logs an error message with a red [ERROR] tag.
   * @param msg - The error message to display.
   */
  error(msg: string) {
    console.log(`${colors.red}[ERROR]${colors.reset} ${msg}`);
  }

  logHttp(
    method: string,
    url: string,
    ms: number,
    statusCode: number,
    isError: boolean = false,
  ) {
    if (!isError)
      console.log(
        `${colors.cyan}${method}${colors.reset} ${url} - ${colors.green}${ms}ms${colors.reset} ${colors.cyan}[Status ${statusCode}]${colors.reset}`,
      );
    else
      console.log(
        `${colors.cyan}${method}${colors.reset} ${url} - ${colors.green}${ms}ms${colors.reset} ${colors.red}[Status ${statusCode}]${colors.reset}`,
      );
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
