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
  DELETE = 'DELETE',
  /** The HEAD method asks for a response identical to a GET request, but without the response body. */
  HEAD = 'HEAD',
  /** The OPTIONS method describes the communication options for the target resource. */
  OPTIONS = 'OPTIONS',
  /** The CONNECT method establishes a tunnel to the server identified by the target resource. */
  CONNECT = 'CONNECT',
  /** The TRACE method performs a message loop-back test along the path to the target resource. */
  TRACE = 'TRACE'
}