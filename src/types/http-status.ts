/**
 * Common HTTP response status codes.
 * These codes are used to indicate the semantic outcome of an HTTP request.
 */
export enum httpStatus {
  /** 200 OK: The request has succeeded. */
  OK = 200,
  /** 201 Created: The request has succeeded and a new resource has been created. */
  Created = 201,
  /** 204 No Content: The request has succeeded but there is no body to return. */
  NoContent = 204,
  /** 400 Bad Request: The server cannot process the request due to client error (e.g., invalid syntax). */
  BadRequest = 400,
  /** 401 Unauthorized: The client must authenticate itself to get the requested response. */
  Unauthorized = 401,
  /** 404 Not Found: The server can not find the requested resource. */
  NotFound = 404,
  /** 500 Internal Server Error: The server has encountered a situation it doesn't know how to handle. */
  InternalError = 500,
  /** 503 Service Unavailable: The server is not ready to handle the request (e.g., down for maintenance). */
  ServiceUnavailable = 503
}