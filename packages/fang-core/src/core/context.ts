import { IncomingMessage, ServerResponse } from "node:http";
import { z } from "zod";
import { httpStatus } from "../types/http-status.js";
import { BadRequestException, InvalidBodyScheme } from "../exceptions/errors.js";
import type { CookieOptions } from "../types/types.js";

/**
 * Represents the context of the current HTTP request and response.
 */
export class Context {
  /** Parsed query parameters from the URL. */
  public query: Record<string, string> = {};
  /** Shared state object for passing data between middlewares. */
  public state: Record<string, any> = {};

  /**
   * Creates an instance of Context.
   * @param req - The incoming HTTP request.
   * @param res - The outgoing HTTP response.
   * @param params - Route parameters extracted from the path.
   */
  constructor(
    public req: IncomingMessage,
    public res: ServerResponse,
    public params: Record<string, string> = {},
  ) {
    const url = new URL(req.url || "/", `http://${req.headers.host}`);
    this.query = Object.fromEntries(url.searchParams.entries());
  }

  /**
   * Sends a JSON response.
   * @param data - The payload to be stringified and sent.
   * @param status - HTTP status code (defaults to 200 OK).
   */
  json(data: any, status = httpStatus.OK) {
    if (this.res.headersSent) return;
    this.res.writeHead(status, { "Content-Type": "application/json" });
    this.res.end(JSON.stringify(data));
  }

  /**
   * Sends a plain text response.
   * @param content - The string content to send.
   * @param status - HTTP status code (defaults to 200 OK).
   */
  text(content: string, status = httpStatus.OK) {
    if (this.res.headersSent) return;
    this.res.writeHead(status, { "Content-Type": "text/plain" });
    this.res.end(content);
  }

  /**
   * Parses the request body and optionally validates it against a Zod schema.
   * @template T - The expected type of the body.
   * @param schema - An optional Zod schema to validate the incoming JSON.
   * @returns A promise that resolves to the parsed (and validated) body.
   * @throws Error if the JSON is invalid or does not match the schema.
   */
  async body<T>(schema?: z.ZodType<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      let data = "";

      this.req.on("data", (chunk) => {
        data += chunk;
      });

      this.req.on("end", () => {
        try {
          const jsonData = JSON.parse(data);
          if (schema) {
            const parsed = schema.safeParse(jsonData);
            if (parsed.success) {
              resolve(parsed.data);
            } else {
              reject(new Error("Invalid body schema"));
            }
          } else {
            resolve(jsonData as T);
          }
        } catch (err) {
          reject(new InvalidBodyScheme("Invalid JSON format or Server Error"));
        }
      });

      this.req.on("error", (err) => {
        reject(err);
      });
    });
  }

  /**
   * Validates and types the URL search parameters (Query Strings).
   * * @template T - The type inferred from the validation schema.
   * @param {z.ZodType<T>} schema - The Zod schema to validate `ctx.query` against.
   * @returns {T} The validated and type-casted query data.
   * @throws {BadRequestException} If the query data does not match the schema.
   * * @example
   * const query = ctx.getQuery(z.object({
   * page: z.coerce.number().default(1),
   * search: z.string().optional()
   * }));
   */
  getQuery<T>(schema: z.ZodType<T>) {
    const parsed = schema.safeParse(this.query);
    if (!parsed.success) throw new BadRequestException("Invalid query schema");
    return parsed.data;
  }

  /**
   * Validates and types the request headers against a Zod schema.
   * * @template T - The type inferred from the validation schema.
   * @param {z.ZodType<T>} schema - The Zod schema to validate the headers against.
   * @returns {T} The validated headers data.
   * @throws {BadRequestException} If the headers do not match the schema.
   * * @remarks
   * Node.js automatically converts all incoming header names to lowercase.
   * Ensure your schema keys are defined in lowercase.
   * * @example
   * const headers = ctx.getHeader(z.object({
   * 'authorization': z.string().startsWith('Bearer '),
   * 'x-api-key': z.string()
   * }).passthrough());
   */
  getHeader<T>(schema: z.ZodType<T>) {
    const parsed = schema.safeParse(this.req.headers);
    if (!parsed.success) throw new BadRequestException("Invalid header schema");
    return parsed.data;
  }

  /**
   * Gets all cookies sent in the request.
   * Parses the `Cookie` header into a key-value pair object.
   * * @returns {Record<string, string>} An object containing all cookie names and their values.
   * @example
   * const { session_id } = ctx.cookies;
   */
  getCookies(): Record<string, string> {
    const cookieHeader = this.req.headers.cookie;

    if (!cookieHeader) return {};

    return Object.fromEntries(
      cookieHeader.split(";").map((cookie) => {
        const [name, ...value] = cookie.trim().split("=");
        return [name?.trim(), value.join("=")];
      }),
    );
  }

  /**
   * Sets a cookie in the response.
   * Appends to existing `Set-Cookie` headers if they exist.
   * * @param {string} name - The name of the cookie.
   * @param {string} value - The value to store in the cookie.
   * @param {CookieOptions} [options={}] - Configuration for the cookie (HttpOnly, Secure, etc.).
   * * @example
   * ctx.setCookie('token', 'abc-123', {
   * httpOnly: true,
   * maxAge: 3600
   * });
   */
  setCookie(name: string, value: string, options: CookieOptions = {}) {
    let {
      httpOnly = true,
      secure = true,
      sameSite = "Lax",
      maxAge,
      path = "/",
    } = options;

    if (sameSite === "None") secure = true;

    let cookieStr = `${name}=${value}; Path=${path}; SameSite=${sameSite}`;

    if (httpOnly) cookieStr += "; HttpOnly";
    if (secure) cookieStr += "; Secure";
    if (maxAge) cookieStr += `; Max-Age=${maxAge}`;

    let cookieArray: string[] = [];
    const existingHeaders = this.res.getHeader("Set-Cookie");

    if (Array.isArray(existingHeaders)) {
      cookieArray = existingHeaders.map(String).concat(cookieStr);
    } else if (existingHeaders) {
      cookieArray = [String(existingHeaders), cookieStr];
    } else {
      cookieArray = [cookieStr];
    }

    this.res.setHeader("Set-Cookie", cookieArray);
  }

  /**
   * Deletes a cookie by setting its expiration date to the past.
   */
  removeCookie(name: string, path: string = "/") {
    this.setCookie(name, "", { maxAge: 0, path });
  }

  /**
   * Sends a 200 OK response with JSON data.
   * @param data - The payload to send.
   */
  ok(data: any) {
    this.json(data, httpStatus.OK);
  }

  /**
   * Sends a 201 Created response with JSON data.
   * @param data - The payload to send.
   */
  created(data: any) {
    this.json(data, httpStatus.Created);
  }

  /**
   * Sends a 204 No Content response.
   */
  noContent() {
    this.json(httpStatus.NoContent);
  }

  /**
   * Sends a 400 Bad Request response.
   * @param data - Error details or message.
   */
  badRequest(data: any) {
    this.json(data, httpStatus.BadRequest);
  }

  /**
   * Sends a 401 Unauthorized response.
   * @param data - Error details or message.
   */
  unauthorized(data: any) {
    this.json(data, httpStatus.Unauthorized);
  }

  /**
   * Sends a 404 Not Found response.
   * @param data - Error details or message.
   */
  notFound(data: any) {
    this.json(data, httpStatus.NotFound);
  }

  /**
   * Sends a 500 Internal Server Error response.
   * @param data - Error details or message.
   */
  internalError(data: any) {
    this.json(data, httpStatus.InternalError);
  }

  /**
   * Sends a 503 Service Unavailable response.
   * @param data - Error details or message.
   */
  serviceUnavailable(data: any) {
    this.json(data, httpStatus.ServiceUnavailable);
  }
}
