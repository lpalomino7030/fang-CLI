import type { Context } from "./context.js";
import type { RouteGroup } from "./router.js";

/**
 * Represents a class constructor for a Controller.
 * Ensures the class has a static 'register' method for route definition.
 */
type Controllertype = {
  new (...args: any[]): any;
  /**
   * Registers the controller routes within a specific group.
   * @param group - The routing group instance to attach routes to.
   */
  register: (group: RouteGroup) => void;
};

/**
 * Defines the structure for Service classes.
 * Ensures all methods take 'Context' as the first argument.
 */
type ServiceRouteType = {
  [key: string]: (ctx: Context, ...args: any[]) => any | Promise<any>;
};

/**
 * Decorator for Controller classes.
 * Validates the static structure and logs the registration process.
 * * @example
 * ```ts
 * \@Controller
 * class UserController {
 * static register(group: RouteGroup) {
 * group.get("/", (ctx) => { ... });
 * }
 * }
 * ```
 * @param controller - The class constructor to be decorated.
 */
export const Controller = (controller: Controllertype) => {
  return controller;
};

/**
 * Decorator for Service classes.
 * Validates that all methods follow the (ctx: Context) signature.
 * * @example
 * ```ts
 * \@Service
 * class UserService {
 * async findAll(ctx: Context) { ... }
 * }
 * ```
 * @param constructor - The service class constructor.
 * @returns The original constructor if validation passes.
 */
export function Service<T extends new (...args: any[]) => ServiceRouteType>(
  constructor: T,
) {
  return constructor;
}

/**
 * Interface for Service implementation.
 * Provides IntelliSense support during method creation to ensure 'ctx' is included.
 * * @example
 * ```ts
 * class MyService implements IBaseService {
 * // IntelliSense will suggest (ctx: Context)
 * async execute(ctx: Context) { ... }
 * }
 * ```
 */
interface IBaseService {
  [key: string]: (ctx: Context, ...args: any[]) => any | Promise<any>;
}

export abstract class BaseService implements IBaseService {
  [key: string]: (ctx: Context, ...args: any[]) => any | Promise<any>;
}

export const CONTROLLER_METADATA = Symbol("fang:controller_path");

/**
 * A class decorator factory that marks a class as a routing controller
 * and attaches the necessary metadata for the reflection-based router.
 * * @param {string} path - The base URL path for the controller.
 * If it doesn't start with '/', it will be automatically prefixed.
 * * @template T - A constructor type that must implement a static `register` method.
 * * @returns {Function} A class decorator that validates the static structure
 * and injects the {@link CONTROLLER_METADATA}.
 * * @example
 * ```ts
 * @ReflectionController("users")
 * class UserController {
 * static register(group: RouteGroup) {
 * // Route definitions
 * }
 * }
 * ```
 */
export function ReflectionController(path: string) {
  return <T extends { register: (group: RouteGroup) => void }>(
    constructor: T,
  ) => {
    // 1. Metadata for our native scanner
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    (constructor as any)[CONTROLLER_METADATA] = normalizedPath;

    return constructor;
  };
}