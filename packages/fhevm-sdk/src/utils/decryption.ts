/**
 * Decryption utility functions for FHEVM SDK
 */

import type { DecryptedValue } from '../types';

/**
 * Formats decrypted value with metadata
 */
export function formatDecryptedValue(
  value: bigint,
  type: string
): DecryptedValue {
  return {
    value,
    type,
    timestamp: Date.now(),
  };
}

/**
 * Converts bigint to number safely
 * Throws if the value is too large for JavaScript number
 */
export function bigintToNumber(value: bigint): number {
  if (value > BigInt(Number.MAX_SAFE_INTEGER)) {
    throw new Error(
      `Value ${value} is too large to convert to number safely. Use bigint instead.`
    );
  }
  return Number(value);
}

/**
 * Parses decrypted value based on type
 */
export function parseDecryptedValue(
  rawValue: any,
  type: string
): bigint {
  if (typeof rawValue === 'bigint') {
    return rawValue;
  }

  if (typeof rawValue === 'number') {
    return BigInt(rawValue);
  }

  if (typeof rawValue === 'string') {
    return BigInt(rawValue);
  }

  throw new Error(`Unable to parse decrypted value of type ${typeof rawValue}`);
}

/**
 * Validates decrypted value is within expected range for type
 */
export function validateDecryptedValue(
  value: bigint,
  type: string
): boolean {
  const ranges: Record<string, bigint> = {
    euint8: BigInt(2 ** 8 - 1),
    euint16: BigInt(2 ** 16 - 1),
    euint32: BigInt(2 ** 32 - 1),
    euint64: BigInt('18446744073709551615'),
    euint128: BigInt('340282366920938463463374607431768211455'),
  };

  const max = ranges[type];
  if (!max) {
    return false;
  }

  return value >= 0n && value <= max;
}
