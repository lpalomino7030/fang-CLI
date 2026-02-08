import http from "node:http";
import { RouteGroup, Router } from "./router.js";
import { Context } from "./context.js";
import type { Middleware, NextFunction } from "../types/types.js";
import { logger } from "../utils/logger.js";
import { colors } from "../types/colors-enum.js";
import { HttpException } from "../exceptions/errors.js";
import { methods } from "../types/method-enum.js";
import { Logger, type ILogger } from "./logger.js";

type ErrorHandler = (err: any, ctx: Context) => void;

/**
 * Fang is a lightweight HTTP framework built on top of Node.js native http module.
 * It supports middleware, routing groups, and Zod-based body validation.
 */
export class Fang {
  private router = new Router();
  private middlewares: Middleware[] = [];
  private timeout: number | null = null;
  private globalErrorHandler: ErrorHandler | null = null;
  private logger: ILogger = new Logger();

  //#region Http Methods

  /**
   * Registers a GET route.
   * @param path - The route path.
   * @param middleware - A sequence of middlewares to execute for this route.
   */
  public get(path: string, ...middleware: Middleware[]) {
    this.router.add(methods.GET, path, ...middleware);
  }

  /**
   * Registers a POST route.
   * @param path - The route path.
   * @param middleware - A sequence of middlewares to execute for this route.
   */
  public post(path: string, ...middleware: Middleware[]) {
    this.router.add(methods.POST, path, ...middleware);
  }

  /**
   * Registers a PUT route.
   * @param path - The route path.
   * @param middleware - A sequence of middlewares to execute for this route.
   */
  public put(path: string, ...middleware: Middleware[]) {
    this.router.add(methods.PUT, path, ...middleware);
  }

  /**
   * Registers a PATCH route.
   * @param path - The route path.
   * @param middleware - A sequence of middlewares to execute for this route.
   */
  public patch(path: string, ...middleware: Middleware[]) {
    this.router.add(methods.PATCH, path, ...middleware);
  }

  /**
   * Registers a DELETE route.
   * @param path - The route path.
   * @param middleware - A sequence of middlewares to execute for this route.
   */
  public delete(path: string, ...middleware: Middleware[]) {
    this.router.add(methods.DELETE, path, ...middleware);
  }

  /**
   * Registers a HEAD route.
   * @param path - The route path.
   * @param middleware - A sequence of middlewares to execute for this route.
   */
  public head(path: string, ...middleware: Middleware[]) {
    this.router.add(methods.HEAD, path, ...middleware);
  }

  /**
   * Registers an OPTIONS route.
   * @param path - The route path.
   * @param middleware - A sequence of middlewares to execute for this route.
   */
  public options(path: string, ...middleware: Middleware[]) {
    this.router.add(methods.OPTIONS, path, ...middleware);
  }

  /**
   * Registers a TRACE route.
   * @param path - The route path.
   * @param middleware - A sequence of middlewares to execute for this route.
   */
  public trace(path: string, ...middleware: Middleware[]) {
    this.router.add(methods.TRACE, path, ...middleware);
  }

  /**
   * Registers a CONNECT route.
   * @param path - The route path.
   * @param middleware - A sequence of middlewares to execute for this route.
   */
  public connect(path: string, ...middleware: Middleware[]) {
    this.router.add(methods.CONNECT, path, ...middleware);
  }

  /**
   * Registers a global middleware that will run on every request.
   * @param middleware - The middleware function to register.
   */
  public use(middleware: Middleware) {
    this.middlewares.push(middleware);
  }
  //#endregion

  /**
   * Core request handler. Manages the lifecycle of a request, including
   * global middlewares, route matching, and execution of the middleware stack.
   * @param req - The native Node.js request.
   * @param res - The native Node.js response.
   */
  private async handleRequest(
    req: http.IncomingMessage,
    res: http.ServerResponse,
  ) {
    //REQUEST TIMEOUT
    if (this.timeout !== null)
      res.setTimeout(this.timeout, () => {
        if (!res.headersSent) {
          res.writeHead(504, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({
              error: "Gateway Timeout",
              message: "The server took too long to respond",
            }),
          );
          this.logger.warn(`Request timed out after ${this.timeout}ms`);
          return;
        }
      });

    //Parser URL
    const parsedUrl = new URL(req.url || "/", `http://${req.headers.host}`);
    const path = parsedUrl.pathname;
    const method = req.method || "GET";
    const route = this.router.find(method, path);
    const ctx = new Context(req, res, route?.params || {});

    //Middleware globals + middlewares by routes
    const middlewareStack = [...this.middlewares];
    if (route) middlewareStack.push(...route.stack);

    let index = 0;
    const next: NextFunction = async () => {
      if (index < middlewareStack.length) {
        const middleware = middlewareStack[index++];
        await middleware!(ctx, next);
      } else if (!route) {
        if (method !== "OPTIONS")
          ctx.json(
            {
              error: "Not Found",
              message: `The route ${method} ${path} is not found`,
            },
            404,
          );
      }
    };

    try {
      const start = Date.now();
      await next();
      const ms = Date.now() - start;
      this.logger.logHttp(method, path, ms, res.statusCode);
    } catch (error) {
      const start = Date.now();
      if (this.globalErrorHandler) {
        this.globalErrorHandler(error as Error, ctx);
      } else {
        this.handlerGenericError(error as Error, res);
      }
      const ms = Date.now() - start;
      this.logger.logHttp(method, path, ms, res.statusCode, true);
    }
  }

  /**
   * Handles uncaught errors within the request lifecycle.
   * @param err - The error object.
   * @param res - The native Node.js response.
   */
  private handlerGenericError(err: any, res: http.ServerResponse) {
    const status = err instanceof HttpException ? err.status : 500;
    const message = err.message || "Internal Server Error";

    console.error(`[Fang Error]:`, err);
    res.writeHead(status, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        error: err.name,
        message,
        status,
      }),
    );
  }

  /**
   * Registers a custom global error handler.
   * @param handler - Function to execute when an error occurs (Error, Context).
   */
  public onError(handler: ErrorHandler) {
    this.globalErrorHandler = handler;
  }

  //#region Settings methods

  /**
   * Creates a routing group with a common prefix.
   * @param prefix - The base path for all routes in this group (e.g., "/api/v1").
   * @param callback - An optional function to define routes within the group.
   * Useful for modularizing routes across different files.
   * @returns A new RouteGroup instance for manual registration or chaining.
   */
  public group(
    prefix: string,
    callback?: (group: RouteGroup) => void,
  ): RouteGroup {
    const group = new RouteGroup(prefix, this.router);
    if (callback) callback(group);
    return group;
  }

  /**
   * Sets a global timeout for all requests.
   * @param timeout - Timeout in milliseconds (defaults to 30000).
   * @returns The Fang instance for chaining.
   */
  public setTimeout(timeout: number = 30000) {
    this.timeout = timeout;
    return this;
  }

  /**
   * Replaces the default logger with a custom implementation.
   * The custom logger must implement the ILogger interface.
   * @param customLogger - An object implementing ILogger.
   */
  public setLogger(customLogger: ILogger) {
    this.logger = customLogger;
    return this; // Para permitir encadenamiento
  }

  //#endregion

  /**
   * Starts the HTTP server and listens on the specified port.
   * @param port - The port number to listen on (3000 default value).
   * @param callback - Optional callback to execute when the server starts.
   */
  listen(port?: number, callback?: () => void) {
    if (!port) port = 3000;
    const server = http.createServer((req, res) => {
      this.handleRequest(req, res);
    });

    server.listen(port, () => {
      if (callback) callback();
      else logger.ready(port);
    });
  }
}
