import { UnauthorizedException } from "../exceptions/errors.js";
import { verifyJwt } from "../security/index.js";
import type { Middleware } from "../types/types.js";

/**
 * Authentication Middleware for the Fang framework.
 * * This middleware validates the presence and integrity of a JSON Web Token (JWT)
 * passed via the 'Authorization' header using the 'Bearer' scheme.
 * * If valid, the decoded payload is attached to `ctx.state.user`.
 * If invalid or missing, it responds with a 401 Unauthorized error using the built-in context helper.
 * * @param secret - The secret key used to verify the HMAC signature.
 * @returns A Fang Middleware function.
 * * @example
 * // Apply to a specific route
 * app.get("/dashboard", auth(process.env.JWT_SECRET), (ctx) => {
 * const user = ctx.state.user;
 * return ctx.json({ welcome: user.username });
 * });
 */
export const auth = (secret: string): Middleware => {
  return async (ctx, next) => {
    const authHeader = ctx.req.headers.authorization;

    // Validate header presence and Bearer prefix
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnauthorizedException(
        "Unauthorized: Missing or invalid token format",
      );
    }

    // Extract token string
    const token = authHeader.split(" ")[1];
    if (!token) {
      throw new UnauthorizedException("Unauthorized: Token string is empty");
    }

    // Cryptographic verification
    const user = verifyJwt(token, secret);

    if (!user) {
      throw new UnauthorizedException("Unauthorized: Invalid or expired token");
    }

    // Inject decoded data into the context state
    ctx.state.user = user;

    // Continue the middleware chain
    await next();
  };
};
