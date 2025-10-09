/**
 * useEncrypt Hook
 * Encrypt values using FHE
 */

'use client';

import { useState, useCallback } from 'react';
import { useFhevm } from './useFhevm';
import type { FheType, EncryptedValue } from '../../types';

export interface UseEncryptReturn {
  encrypt: (value: number | bigint | boolean, type: FheType) => Promise<EncryptedValue>;
  isEncrypting: boolean;
  error: Error | null;
  result: EncryptedValue | null;
}

/**
 * Hook to encrypt values
 *
 * @example
 * ```tsx
 * function EncryptInput() {
 *   const { encrypt, isEncrypting, result } = useEncrypt();
 *
 *   const handleEncrypt = async () => {
 *     const encrypted = await encrypt(1234, 'euint32');
 *     console.log('Encrypted:', encrypted);
 *   };
 *
 *   return (
 *     <button onClick={handleEncrypt} disabled={isEncrypting}>
 *       {isEncrypting ? 'Encrypting...' : 'Encrypt Value'}
 *     </button>
 *   );
 * }
 * ```
 */
export function useEncrypt(): UseEncryptReturn {
  const { client, isInitialized } = useFhevm();
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [result, setResult] = useState<EncryptedValue | null>(null);

  const encrypt = useCallback(
    async (value: number | bigint | boolean, type: FheType): Promise<EncryptedValue> => {
      if (!client || !isInitialized) {
        throw new Error('FHEVM client not initialized');
      }

      try {
        setIsEncrypting(true);
        setError(null);

        const encrypted = await client.encrypt(value, type);
        setResult(encrypted);

        return encrypted;
      } catch (err) {
        const error = err as Error;
        setError(error);
        throw error;
      } finally {
        setIsEncrypting(false);
      }
    },
    [client, isInitialized]
  );

  return {
    encrypt,
    isEncrypting,
    error,
    result,
  };
}
