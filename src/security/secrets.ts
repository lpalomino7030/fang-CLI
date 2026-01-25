import { generateKey } from "node:crypto";
import { promisify } from "node:util";

const generateKeyAsync = promisify(generateKey);

type Algorithm = "hmac" | "aes";

/** Allowed bit lengths for AES encryption */
const AES_BIT_LENGTHS = [128, 192, 256];

/**
 * Generates a cryptographically strong secret key.
 * * @param algorithm - The desired algorithm ("hmac" or "aes").
 * @param length - The length of the key in BITS. Defaults to 256.
 * @returns A promise resolving to the hex-encoded secret key.
 */
export const createSecretKey = async (
  algorithm: Algorithm,
  length: number = 256, // Defaulting to a strong 256-bit key
): Promise<string> => {
  try {
    // Validation for HMAC:
    // Security best practice suggests the key should be at least the size of the hash output (e.g., 256 or 512 bits)
    if (algorithm === "hmac" && length < 128) {
      throw new Error(
        "HMAC key length should be at least 128 bits for minimal security.",
      );
    }

    // Validation for AES:
    // AES strictly requires 128, 192, or 256 bits.
    if (algorithm === "aes" && !AES_BIT_LENGTHS.includes(length)) {
      throw new Error(
        `AES key length must be one of: ${AES_BIT_LENGTHS.join(", ")} bits.`,
      );
    }

    const key = await generateKeyAsync(algorithm, { length });

    return key.export().toString("hex");
  } catch (error) {
    // Re-throwing with context helps debugging in large applications
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`[SecurityModule] Failed to generate key: ${message}`);
  }
};
