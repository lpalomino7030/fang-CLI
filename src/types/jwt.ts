export enum TokenExpiration {
  /** 15 minutes - Ideal for access tokens */
  FifteenMinutes = 900,
  /** 30 minutes - High security sessions (e.g., Banking) */
  ThirtyMinutes = 1800,
  /** 1 hour - Standard for web sessions */
  OneHour = 3600,
  /** 2 hours - Extended web sessions */
  TwoHours = 7200,
  /** 4 hours - Standard for workplace shift sessions */
  FourHours = 14400,
  /** 8 hours - Typical full workday session */
  EightHours = 28800,
  /** 12 hours - Typical for mobile app sessions */
  TwelveHours = 43200,
  /** 1 day - For longer lasting sessions */
  OneDay = 86400,
  /** 7 days - Standard for 'Remember Me' functionality */
  OneWeek = 604800,
  /** 14 days - Standard for refresh tokens (Extended) */
  TwoWeeks = 1209600,
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
