import { Context } from "../core/context.js";
import type { methods } from "./method-enum.js";

/**
 * Represents the callback to pass control to the next middleware in the stack.
 * If not called, the request cycle will stop at the current middleware.
 */
export type NextFunction = () => Promise<void> | void;

/**
 * A function that processes an HTTP request.
 * It receives the context and a 'next' function to call the subsequent middleware.
 * * @param ctx - The request/response context instance.
 * @param next - The function to trigger the next middleware in the chain.
 */
export type Middleware = (
  ctx: Context,
  next: NextFunction,
) => Promise<void> | void;

/**
 * A final request handler that processes the context.
 * Unlike Middleware, a Handler is typically the end of the chain.
 * * @param ctx - The request/response context instance.
 */
export type Handler = (ctx: Context) => Promise<void> | void;

/**
 * Configuration options for the CORS middleware.
 */
export interface CorsOptions {
  /**
   * Configures the **Access-Control-Allow-Origin** CORS header.
   * - `string`: Allows a single specific origin (or '*' for all).
   * - `string[]`: Allows multiple specific origins.
   * - `Function`: A custom validator that receives the origin and returns a boolean.
   */
  origin?: string | string[] | ((origin: string) => boolean);

  /**
   * List of allowed HTTP methods (e.g., GET, POST, PUT).
   * Uses the `methods` enum values or string array.
   */
  methods?: string[];

  /**
   * Configures the **Access-Control-Allow-Headers** CORS header.
   * Array of custom headers allowed by the server.
   */
  allowedHeaders?: string[];

  /**
   * Configures the **Access-Control-Allow-Credentials** CORS header.
   * Set to true to allow cookies or authorization headers to be sent.
   */
  credentials?: boolean;
}

/**
 * Configuration options for setting cookies in the HTTP response.
 * Follows the RFC 6265 standard for cookie management and security.
 */
export interface CookieOptions {
  /**
   * If true, the cookie is inaccessible to the JavaScript Document.cookie API.
   * This helps mitigate Cross-Site Scripting (XSS) attacks.
   */
  httpOnly?: boolean;

  /**
   * If true, the cookie is only sent to the server over the HTTPS protocol.
   * Recommended for all production environments.
   */
  secure?: boolean;

  /**
   * Controls whether the cookie is sent with cross-site requests.
   * - 'Strict': Only sent for first-party context.
   * - 'Lax': Sent with top-level navigations (Safe choice for most apps).
   * - 'None': Sent in all contexts (Requires 'secure' to be true).
   */
  sameSite?: "Strict" | "Lax" | "None";

  /**
   * Sets the number of seconds until the cookie expires.
   * A zero or negative number will expire the cookie immediately.
   */
  maxAge?: number;

  /**
   * The URL path that must exist in the requested URL for the browser to send the Cookie header.
   * Defaults to '/' in most implementations.
   */
  path?: string;
}
