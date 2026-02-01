import type { Context } from "./context.js";
import { Logger } from "./logger.js";
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
  const logger = new Logger();
  logger.info(`Controller ${controller.name} registered`);
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