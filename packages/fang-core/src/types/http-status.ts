/**
 * Common HTTP response status codes.
 * These codes are used to indicate the semantic outcome of an HTTP request.
 */
export enum httpStatus {
  // --- 2xx Success ---
  OK = 200,
  Created = 201,
  /** 202 Accepted: The request has been received but not yet acted upon. Useful for async processing. */
  Accepted = 202,
  NoContent = 204,

  // --- 3xx Redirection ---
  /** 301 Moved Permanently: The URL of the requested resource has been changed permanently. */
  MovedPermanently = 301,
  /** 302 Found: The resource resides temporarily under a different URI. */
  Found = 302,
  /** 304 Not Modified: Used for caching; tells the client the response has not been modified. */
  NotModified = 304,

  // --- 4xx Client Errors ---
  BadRequest = 400,
  Unauthorized = 401,
  /** 403 Forbidden: The client does not have access rights to the content. */
  Forbidden = 403,
  NotFound = 404,
  /** 405 Method Not Allowed: The request method is known by the server but has been disabled. */
  MethodNotAllowed = 405,
  /** 409 Conflict: The request conflicts with the current state of the server (e.g., duplicate entries). */
  Conflict = 409,
  /** 422 Unprocessable Entity: The request was well-formed but contains semantic errors (validation). */
  UnprocessableEntity = 422,
  /** 429 Too Many Requests: The user has sent too many requests in a given amount of time (Rate Limiting). */
  TooManyRequests = 429,

  // --- 5xx Server Errors ---
  InternalError = 500,
  /** 501 Not Implemented: The server does not support the functionality required to fulfill the request. */
  NotImplemented = 501,
  /** 502 Bad Gateway: The server, while acting as a gateway, received an invalid response. */
  BadGateway = 502,
  ServiceUnavailable = 503,
  /** 504 Gateway Timeout: The server, while acting as a gateway, did not get a response in time. */
  GatewayTimeout = 504
}