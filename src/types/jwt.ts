export enum TokenExpiration {
  /** 15 minutes - Ideal for access tokens */
  FifteenMinutes = 900,
  /** 1 hour - Standard for web sessions */
  OneHour = 3600,
  /** 12 hours - Typical for mobile app sessions */
  TwelveHours = 43200,
  /** 1 day - For longer lasting sessions */
  OneDay = 86400,
  /** 7 days - Standard for 'Remember Me' functionality */
  OneWeek = 604800,
  /** 30 days - Long term persistent sessions */
  OneMonth = 2592000,
}

/**
 * Standard structure for a JWT Payload.
 * Includes common claims like Issued At (iat) and Expiration (exp).
 */
export type JWTPayload = {
  iat?: number;
  exp?: number;
  [key: string]: any;
};
