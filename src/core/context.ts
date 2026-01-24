import { IncomingMessage, ServerResponse } from "node:http";
import { z } from "zod";
import { httpStatus } from "../types/http-status.js";

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
    public params: Record<string, string> = {}
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
          reject(new Error("Invalid JSON format or Server Error"));
        }
      });

      this.req.on("error", (err) => {
        reject(err);
      });
    });
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