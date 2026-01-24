/**
 * ANSI escape codes for terminal string styling.
 * Used by the Logger to provide colored output in the console.
 */
export enum colors {
  /** Resets the terminal color to its default state. */
  reset = "\x1b[0m",
  /** Sets the output color to green. Commonly used for success messages. */
  green = "\x1b[32m",
  /** Sets the output color to blue. */
  blue = "\x1b[34m",
  /** Sets the output color to yellow. Often used for warnings. */
  yellow = "\x1b[33m",
  /** Sets the output color to cyan. Used for info or method names. */
  cyan = "\x1b[36m",
  /** Sets the output color to magenta. */
  magenta = "\x1b[35m",
  /** Sets the output color to red. Reserved for errors and critical failures. */
  red = "\x1b[31m"
}