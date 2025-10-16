/**
 * useDecrypt Hook
 * Decrypt ciphertexts with user signatures
 */

'use client';

import { useState, useCallback } from 'react';
import { useFhevm } from './useFhevm';
import type { DecryptionRequest, DecryptedValue } from '../../types';

export interface UseDecryptReturn {
  decrypt: (request: DecryptionRequest, signature: string) => Promise<DecryptedValue>;
  publicDecrypt: (ciphertext: string, type: string) => Promise<DecryptedValue>;
  isDecrypting: boolean;
  error: Error | null;
  result: DecryptedValue | null;
}

/**
 * Hook to decrypt values
 *
 * @example
 * ```tsx
 * function DecryptResult() {
 *   const { decrypt, isDecrypting, result } = useDecrypt();
 *   const { signTypedDataAsync } = useSignTypedData();
 *
 *   const handleDecrypt = async (ciphertext: string) => {
 *     // Get EIP-712 signature from user
 *     const signature = await signTypedDataAsync({
 *       domain: { name: 'FHEVM', version: '1', chainId: 11155111 },
 *       types: { Decrypt: [{ name: 'ciphertext', type: 'string' }] },
 *       message: { ciphertext },
 *     });
 *
 *     // Decrypt with signature
 *     const decrypted = await decrypt({
 *       ciphertext,
 *       type: 'euint32',
 *       contractAddress: '0x...',
 *     }, signature);
 *
 *     console.log('Decrypted:', decrypted.value);
 *   };
 *
 *   return (
 *     <button onClick={() => handleDecrypt('0x...')} disabled={isDecrypting}>
 *       {isDecrypting ? 'Decrypting...' : 'Decrypt'}
 *     </button>
 *   );
 * }
 * ```
 */
export function useDecrypt(): UseDecryptReturn {
  const { client, isInitialized } = useFhevm();
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [result, setResult] = useState<DecryptedValue | null>(null);

  const decrypt = useCallback(
    async (request: DecryptionRequest, signature: string): Promise<DecryptedValue> => {
      if (!client || !isInitialized) {
        throw new Error('FHEVM client not initialized');
      }

      try {
        setIsDecrypting(true);
        setError(null);

        const decrypted = await client.userDecrypt(request, signature);
        setResult(decrypted);

        return decrypted;
      } catch (err) {
        const error = err as Error;
        setError(error);
        throw error;
      } finally {
        setIsDecrypting(false);
      }
    },
    [client, isInitialized]
  );

  const publicDecrypt = useCallback(
    async (ciphertext: string, type: any): Promise<DecryptedValue> => {
      if (!client || !isInitialized) {
        throw new Error('FHEVM client not initialized');
      }

      try {
        setIsDecrypting(true);
        setError(null);

        const decrypted = await client.publicDecrypt(ciphertext, type);
        setResult(decrypted);

        return decrypted;
      } catch (err) {
        const error = err as Error;
        setError(error);
        throw error;
      } finally {
        setIsDecrypting(false);
      }
    },
    [client, isInitialized]
  );

  return {
    decrypt,
    publicDecrypt,
    isDecrypting,
    error,
    result,
  };
}
