/**
 * Security utility functions for FHE operations
 */

export function validateCiphertext(ciphertext: string): boolean {
  // Validate ciphertext format
  if (!ciphertext || typeof ciphertext !== 'string') {
    return false;
  }

  // Check if it's a valid hex string
  return /^0x[0-9a-fA-F]+$/.test(ciphertext);
}

export function sanitizeInput(input: any): any {
  // Sanitize user input to prevent injection attacks
  if (typeof input === 'string') {
    return input.replace(/[<>]/g, '');
  }
  return input;
}

export function validateFheType(type: string): boolean {
  const validTypes = ['euint8', 'euint16', 'euint32', 'euint64', 'euint128'];
  return validTypes.includes(type);
}
