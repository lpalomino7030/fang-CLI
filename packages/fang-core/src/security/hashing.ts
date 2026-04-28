import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";

/** * Promisify scrypt to use async/await instead of traditional callbacks.
 */
const scryptAsync = promisify(scrypt);

/** * Final derived key length in bytes.
 * 64 bytes (512 bits) provides a very high level of security.
 */
const KEY_LENGTH = 64;

/**
 * Generates a secure hash for a password using the scrypt algorithm.
 * * @param password - The plain-text password to be hashed.
 * @param saltLength - (Optional) Number of random bytes to generate for the salt. Defaults to 16.
 * @returns A promise that resolves to a string in the format: `scrypt$salt$hash`.
 */
export const generateHash = async (
  password: string,
  saltLength: number = 16,
): Promise<string> => {
  // Generate unique random bytes for each password to prevent rainbow table attacks.
  const salt = randomBytes(saltLength).toString("hex");

  // Derive the key using scrypt (memory-hard algorithm resistant to GPU/ASIC cracking).
  const derivedKey = (await scryptAsync(password, salt, KEY_LENGTH)) as Buffer;
  const hash = derivedKey.toString("hex");

  // Return the method, salt, and hash joined by a delimiter for easy parsing later.
  return `scrypt$${salt}$${hash}`;
};

/**
 * Verifies if a provided password matches a previously generated hash.
 * * @param password - The plain-text password provided by the user during login.
 * @param hash - The stored hash string (expected format: `scrypt$salt$hash`).
 * @returns A promise that resolves to true if the password matches, or false if it doesn't or the format is invalid.
 */
export const verifyHash = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  // Split the stored string into its components.
  const [method, salt, key] = hash.split("$");

  // Basic validation: ensure the algorithm is correct and all parts are present.
  if (method !== "scrypt" || !salt || !key) return false;

  try {
    // Re-generate the hash using the provided password and the original salt.
    const computedHash = (await scryptAsync(
      password,
      salt,
      KEY_LENGTH,
    )) as Buffer;

    // Convert the stored hex key back into a Buffer for comparison.
    const computedKey = Buffer.from(key, "hex");

    // Safety check: timingSafeEqual throws an error if buffer lengths do not match.
    if (computedHash.length !== computedKey.length) return false;

    // Compare buffers in constant time to prevent side-channel timing attacks.
    return timingSafeEqual(computedKey, computedHash);
  } catch (error) {
    // Return false on any internal derivation errors to fail-safe.
    return false;
  }
};
