import type { Middleware } from "../types/types.js";

/**
 * Internal representation of a registered route.
 */
interface Route {
  /** HTTP method (GET, POST, etc.) */
  method: string;
  /** Original path string */
  path: string;
  /** Middleware stack associated with this route */
  stack: Middleware[];
  /** Compiled regex for path matching */
  regex: RegExp;
  /** Named parameter keys extracted from the path */
  keys: string[];
}

/**
 * Core routing engine responsible for registering and matching routes using Regex.
 */
export class Router {
  private routes: Route[] = [];

  /**
   * Registers a new route with its corresponding middleware stack.
   * Converts Express-style paths (e.g., `/user/:id`) into regular expressions.
   * * @param method - HTTP verb.
   * @param path - URL path pattern.
   * @param fns - Middleware functions to execute.
   */
  add(method: string, path: string, ...fns: Middleware[]) {
    const keys: string[] = [];

    // Replace :param with a regex capture group and store the key name
    const pattern = path.replace(/:([a-zA-Z0-9]+)/g, (_, key) => {
      keys.push(key);
      return "([^/]+)";
    });

    const regex = new RegExp(`^${pattern}$`);

    this.routes.push({
      method,
      path,
      regex,
      stack: fns,
      keys,
    });
  }

  /**
   * Searches for a matching route based on method and URL.
   * Extracts path parameters if a match is found.
   * * @param method - The request HTTP method.
   * @param url - The request URL pathname.
   * @returns An object containing the extracted params and middleware stack, or null if no match.
   */
  find(method: string, url: string) {
    const route = this.routes.find(
      (r) => r.method === method && r.regex.test(url),
    );

    if (!route) return null;

    const match = url.match(route.regex);
    const params: Record<string, string> = {};

    if (match) {
      route.keys.forEach((key, index) => {
        // match[0] is the full string, parameters start at index 1
        params[key] = match[index + 1] as string;
      });
    }

    return {
      params,
      stack: route.stack,
    };
  }
}

/**
 * Facilitates grouping routes under a common prefix and applying group-level middlewares.
 */
export class RouteGroup {
  private prefix: string;
  private middlewares: Middleware[] = [];
  private parentApp: Router;

  /**
   * Creates a new RouteGroup.
   * @param prefix - The base path for all routes in this group.
   * @param parentApp - Reference to the main Router instance.
   */
  constructor(prefix: string, parentApp: any) {
    this.prefix = prefix;
    this.parentApp = parentApp;
  }

  /**
   * Adds middleware that will be prepended to all routes within this group.
   * @param middleware - The middleware to add.
   * @returns The RouteGroup instance for chaining.
   */
  use(middleware: Middleware) {
    this.middlewares.push(middleware);
    return this;
  }

  /**
   * Normalizes paths and registers the route in the parent Router.
   * @private
   */
  private addRoute(method: string, path: string, ...middleware: Middleware[]) {
    const cleanPrefix = this.prefix.startsWith("/")
      ? this.prefix
      : `/${this.prefix}`;
    const cleanPath = path.startsWith("/") ? path : `/${path}`;

    // Ensure no double slashes during concatenation
    const fullPath = `${cleanPrefix}${cleanPath}`.replace(/\/+/g, "/");

    // Prepend group middlewares to the specific route middleware stack
    const totalStack = [...this.middlewares, ...middleware];

    this.parentApp.add(method, fullPath, ...totalStack);
  }

  /** Registers a GET route within the group. */
  get(path: string, ...middleware: Middleware[]) {
    this.addRoute("GET", path, ...middleware);
  }
  /** Registers a POST route within the group. */
  post(path: string, ...middleware: Middleware[]) {
    this.addRoute("POST", path, ...middleware);
  }
  /** Registers a PUT route within the group. */
  put(path: string, ...middleware: Middleware[]) {
    this.addRoute("PUT", path, ...middleware);
  }
  /** Registers a PATCH route within the group. */
  patch(path: string, ...middleware: Middleware[]) {
    this.addRoute("PATCH", path, ...middleware);
  }
  /** Registers a DELETE route within the group. */
  delete(path: string, ...middleware: Middleware[]) {
    this.addRoute("DELETE", path, ...middleware);
  }
}
