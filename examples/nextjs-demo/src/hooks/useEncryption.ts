'use client';

import { useState, useCallback } from 'react';
import { useEncrypt } from '@fhevm/sdk/react';
import { validateFheType } from '@/lib/utils/security';
import { getValidationForType } from '@/lib/utils/validation';

export function useEncryption() {
  const { encrypt: sdkEncrypt, isEncrypting, result, error, reset } = useEncrypt();
  const [validationError, setValidationError] = useState<string | null>(null);

  const encrypt = useCallback(async (
    value: number,
    type: 'euint8' | 'euint16' | 'euint32'
  ) => {
    setValidationError(null);

    // Validate FHE type
    if (!validateFheType(type)) {
      setValidationError('Invalid FHE type');
      return;
    }

    // Validate value range for type
    const validator = getValidationForType(type);
    if (!validator(value)) {
      setValidationError(`Value ${value} is out of range for ${type}`);
      return;
    }

    try {
      await sdkEncrypt(value, type);
    } catch (err) {
      console.error('Encryption error:', err);
    }
  }, [sdkEncrypt]);

  return {
    encrypt,
    isEncrypting,
    result,
    error: error || (validationError ? new Error(validationError) : null),
    reset,
  };
}
