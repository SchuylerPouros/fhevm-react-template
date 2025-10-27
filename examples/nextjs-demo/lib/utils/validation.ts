/**
 * Validation utility functions
 */

export function validateNumber(value: any, min?: number, max?: number): boolean {
  const num = Number(value);

  if (isNaN(num)) {
    return false;
  }

  if (min !== undefined && num < min) {
    return false;
  }

  if (max !== undefined && num > max) {
    return false;
  }

  return true;
}

export function validateEuint8(value: number): boolean {
  return validateNumber(value, 0, 255);
}

export function validateEuint16(value: number): boolean {
  return validateNumber(value, 0, 65535);
}

export function validateEuint32(value: number): boolean {
  return validateNumber(value, 0, 4294967295);
}

export function getValidationForType(type: string): (value: number) => boolean {
  switch (type) {
    case 'euint8':
      return validateEuint8;
    case 'euint16':
      return validateEuint16;
    case 'euint32':
      return validateEuint32;
    default:
      return () => true;
  }
}
