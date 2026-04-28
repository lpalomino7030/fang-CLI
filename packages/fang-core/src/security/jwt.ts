import { createHmac, timingSafeEqual } from "node:crypto";
import type { JWTPayload } from "../types/jwt.js";

const ALGORITHM = "HS256";
const HEADER = { alg: ALGORITHM, typ: "JWT" };

export interface SignOptions {
  /** Time in seconds until the token becomes invalid (e.g., 3600 for 1 hour). */
  expiresIn: number;
  /** The secret key used to sign the token. */
  secret: string;
}

/**
 * Encodes data to a URL-safe Base64 string.
 * @param str - The string or Buffer to be encoded.
 * @internal
 */
export const base64UrlEncode = (str: string | Buffer): string =>
  Buffer.from(str)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");

/**
 * Decodes a URL-safe Base64 string back to a UTF-8 string.
 * @param str - The Base64URL encoded string.
 * @internal
 */
export const base64UrlDecode = (str: string): string =>
  Buffer.from(str.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString();

/**
 * Creates a digital signature for the JWT parts.
 * @param data - The concatenated header and payload (header.payload).
 * @param secret - The secret key for the HMAC-SHA256 algorithm.
 */
const createSignature = (data: string, secret: string): string =>
  base64UrlEncode(createHmac("sha256", secret).update(data).digest());

/**
 * Generates a JSON Web Token (JWT) signed with HMAC-SHA256.
 * * @param payload - The data you want to store in the token.
 * @param options - Configuration including `secret` and `expiresIn` (in seconds).
 * @returns A complete JWT string in the format `header.payload.signature`.
 * * @example
 * const token = signJwt({ userId: 123 }, { secret: 'my-key', expiresIn: 3600 });
 */
export const signJwt = (payload: JWTPayload, options: SignOptions): string => {
  const { secret, expiresIn } = options;
  const now = Math.floor(Date.now() / 1000);

  const headerEncoded = base64UrlEncode(JSON.stringify(HEADER));
  const payloadEncoded = base64UrlEncode(
    JSON.stringify({
      ...payload,
      iat: now,
      exp: now + expiresIn,
    }),
  );

  const dataToSign = `${headerEncoded}.${payloadEncoded}`;
  const signature = createSignature(dataToSign, secret);

  return `${dataToSign}.${signature}`;
};

/**
 * Decodes and validates a JWT using a secret key.
 * * Checks for:
 * 1. Correct format (3 parts separated by dots).
 * 2. Cryptographic signature integrity (using timingSafeEqual).
 * 3. Token expiration (exp claim).
 * * @param token - The JWT string to be verified.
 * @param secret - The secret key used when the token was signed.
 * @returns The decoded payload if valid, or `null` if verification fails.
 */
export const verifyJwt = (token: string, secret: string): JWTPayload | null => {
  const parts = token.split(".");
  if (parts.length !== 3) return null;

  const [header, payload, signature] = parts;
  const dataToVerify = `${header}.${payload}`;
  const computedSignature = createSignature(dataToVerify, secret);

  const signatureBuffer = Buffer.from(signature!);
  const computedBuffer = Buffer.from(computedSignature);

  if (signatureBuffer.length !== computedBuffer.length) return null;
  if (!timingSafeEqual(signatureBuffer, computedBuffer)) return null;

  try {
    const decodedPayload: JWTPayload = JSON.parse(base64UrlDecode(payload!));
    const now = Math.floor(Date.now() / 1000);

    if (decodedPayload.exp && decodedPayload.exp < now) return null;

    return decodedPayload;
  } catch {
    return null;
  }
};
