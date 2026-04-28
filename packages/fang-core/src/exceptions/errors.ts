/**
 * Base class for all Fang HTTP exceptions.
 */
export class HttpException extends Error {
  constructor(
    public readonly message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestException extends HttpException {
  constructor(message = "Bad Request") {
    super(message, 400);
  }
}

export class UnauthorizedException extends HttpException {
  constructor(message = "Unauthorized") {
    super(message, 401);
  }
}

export class ForbiddenException extends HttpException {
  constructor(message = "Forbidden") {
    super(message, 403);
  }
}

export class NotFoundException extends HttpException {
  constructor(message = "Not Found") {
    super(message, 404);
  }
}

export class InternalServerErrorException extends HttpException {
  constructor(message = "Internal Server Error") {
    super(message, 500);
  }
}

export class NotImplementedException extends HttpException {
  constructor(message = "Not Implemented") {
    super(message, 501);
  }
}

export class ServiceUnavailableException extends HttpException {
  constructor(message = "Service Unavailable") {
    super(message, 503);
  }
}

export class GatewayTimeoutException extends HttpException {
  constructor(message = "Gateway Timeout") {
    super(message, 504);
  }
}

export class HttpVersionNotSupportedException extends HttpException {
  constructor(message = "HTTP Version Not Supported") {
    super(message, 505);
  }
}

export class InvalidBodyScheme extends HttpException {
  constructor(message = "Invalid body scheme") {
    super(message, 400);
  }
}