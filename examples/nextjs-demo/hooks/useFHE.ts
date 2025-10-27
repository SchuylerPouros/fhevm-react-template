'use client';

import { useState, useCallback } from 'react';
import { encryptValue, decryptValue } from '@/lib/fhe/client';
import { useFhevm } from '@fhevm/sdk/react';

export function useFHE() {
  const { isInitialized, isInitializing } = useFhevm();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const encrypt = useCallback(async (value: number, type: 'euint8' | 'euint16' | 'euint32' = 'euint32') => {
    setIsProcessing(true);
    setError(null);
    try {
      const result = await encryptValue(value, type);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Encryption failed');
      setError(error);
      throw error;
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const decrypt = useCallback(async (ciphertext: string, type: string) => {
    setIsProcessing(true);
    setError(null);
    try {
      const result = await decryptValue(ciphertext, type);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Decryption failed');
      setError(error);
      throw error;
    } finally {
      setIsProcessing(false);
    }
  }, []);

  return {
    encrypt,
    decrypt,
    isProcessing,
    isInitialized,
    isInitializing,
    error,
  };
}
