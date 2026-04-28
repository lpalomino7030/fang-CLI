import type { CorsOptions, Middleware } from "../types/types.js";

/**
 * Middleware to enable and configure Cross-Origin Resource Sharing (CORS).
 * * @param options - Configuration object based on the `CorsOptions` interface.
 * @param options.origin - Defines which origins are allowed.
 * Can be a `string`, an `array of strings`, or a `function` that returns a boolean.
 * @param options.methods - An array of allowed HTTP methods (e.g., ['GET', 'POST']).
 * @param options.allowedHeaders - An array of custom headers allowed during the request.
 * @param options.credentials - If true, enables the **Access-Control-Allow-Credentials** header.
 * * @returns A middleware function to handle CORS headers and pre-flight (OPTIONS) requests.
 */
export const cors = (options: CorsOptions = {}): Middleware => {
  const { origin, allowedHeaders, credentials } = options;

  return async (ctx, next) => {
    const { req, res } = ctx;
    const requestOrigin = ctx.req.headers.origin;

    // Origin Handling
    if (requestOrigin) {
      if (!origin || origin === "*") {
        res.setHeader("Access-Control-Allow-Origin", "*");
      } else if (typeof origin === "string") {
        res.setHeader("Access-Control-Allow-Origin", origin);
      } else if (Array.isArray(origin) && origin.includes(requestOrigin)) {
        res.setHeader("Access-Control-Allow-Origin", requestOrigin);
      }
    }

    // Allowed Methods
    res.setHeader(
      "Access-Control-Allow-Methods",
      options.methods?.join(",") || "GET,HEAD,PUT,PATCH,POST,DELETE",
    );

    // Allowed Headers
    if (allowedHeaders) {
      res.setHeader("Access-Control-Allow-Headers", allowedHeaders.join(","));
    }

    // Credentials
    if (credentials) {
      res.setHeader("Access-Control-Allow-Credentials", "true");
    }

    /**
     * Pre-flight Request Handling
     * If the method is OPTIONS, we respond immediately with 204 No Content
     * to satisfy the browser's security check.
     */
    if (req.method === "OPTIONS") {
      res.writeHead(204);
      res.end();
      return;
    }

    // Continue to the next middleware or route handler
    await next();
  };
};
