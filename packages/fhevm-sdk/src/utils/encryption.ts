/**
 * Encryption utility functions for FHEVM SDK
 */

import type { EncryptedValue } from '../types';

/**
 * Validates if a value is within the range for a given FHE type
 */
export function validateValueForType(
  value: number | bigint,
  type: 'euint8' | 'euint16' | 'euint32' | 'euint64' | 'euint128'
): boolean {
  const numValue = typeof value === 'bigint' ? value : BigInt(value);

  const ranges: Record<string, bigint> = {
    euint8: BigInt(2 ** 8 - 1),
    euint16: BigInt(2 ** 16 - 1),
    euint32: BigInt(2 ** 32 - 1),
    euint64: BigInt('18446744073709551615'),
    euint128: BigInt('340282366920938463463374607431768211455'),
  };

  const max = ranges[type];
  return numValue >= 0n && numValue <= max;
}

/**
 * Converts a hex string to Uint8Array
 */
export function hexToBytes(hex: string): Uint8Array {
  const cleanHex = hex.startsWith('0x') ? hex.slice(2) : hex;
  const bytes = new Uint8Array(cleanHex.length / 2);
  for (let i = 0; i < cleanHex.length; i += 2) {
    bytes[i / 2] = parseInt(cleanHex.substring(i, i + 2), 16);
  }
  return bytes;
}

/**
 * Converts Uint8Array to hex string
 */
export function bytesToHex(bytes: Uint8Array): string {
  return '0x' + Array.from(bytes)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Validates ciphertext format
 */
export function validateCiphertext(ciphertext: string): boolean {
  if (!ciphertext || typeof ciphertext !== 'string') {
    return false;
  }

  // Check if it's a valid hex string
  const hexPattern = /^(0x)?[0-9a-fA-F]+$/;
  return hexPattern.test(ciphertext);
}

/**
 * Formats encrypted value with metadata
 */
export function formatEncryptedValue(
  ciphertext: string,
  type: string
): EncryptedValue {
  return {
    ciphertext,
    type,
    timestamp: Date.now(),
  };
}
