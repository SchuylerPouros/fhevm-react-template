/**
 * useFhevm Hook
 * Access FHEVM client and status
 */

'use client';

import { useFhevmContext } from '../provider';
import type { FhevmClient } from '../../types';

export interface UseFhevmReturn {
  client: FhevmClient | null;
  isInitialized: boolean;
  isInitializing: boolean;
  error: Error | null;
}

/**
 * Hook to access FHEVM client
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { client, isInitialized, isInitializing } = useFhevm();
 *
 *   if (isInitializing) return <div>Initializing...</div>;
 *   if (!isInitialized) return <div>Not initialized</div>;
 *
 *   return <div>Ready to encrypt!</div>;
 * }
 * ```
 */
export function useFhevm(): UseFhevmReturn {
  const { client, isInitialized, isInitializing, error } = useFhevmContext();

  return {
    client,
    isInitialized,
    isInitializing,
    error,
  };
}
