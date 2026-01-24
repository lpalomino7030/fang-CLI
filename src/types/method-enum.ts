/**
 * Standard HTTP methods supported by the Fang framework.
 * Used for route registration and CORS configuration.
 */
export enum methods {
  /** The GET method requests a representation of the specified resource. */
  GET = 'GET',
  /** The POST method submits an entity to the specified resource. */
  POST = 'POST',
  /** The PUT method replaces all current representations of the target resource with the request payload. */
  PUT = 'PUT',
  /** The PATCH method applies partial modifications to a resource. */
  PATCH = 'PATCH',
  /** The DELETE method deletes the specified resource. */
  DELETE = 'DELETE'
}