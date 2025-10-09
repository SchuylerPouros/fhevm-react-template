/**
 * FHEVM React Provider
 * Provides FHEVM context to React applications
 */

'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { initFhevm, getFhevmClient } from '../core';
import type { FhevmClient, FhevmConfig } from '../types';

interface FhevmContextValue {
  client: FhevmClient | null;
  isInitialized: boolean;
  isInitializing: boolean;
  error: Error | null;
}

const FhevmContext = createContext<FhevmContextValue>({
  client: null,
  isInitialized: false,
  isInitializing: false,
  error: null,
});

export interface FhevmProviderProps {
  children: ReactNode;
  config: FhevmConfig;
}

/**
 * FHEVM Provider Component
 * Wrap your app with this provider to enable FHEVM hooks
 */
export function FhevmProvider({ children, config }: FhevmProviderProps) {
  const [client, setClient] = useState<FhevmClient | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function initialize() {
      try {
        setIsInitializing(true);
        const existingClient = getFhevmClient();

        if (existingClient && existingClient.isInitialized) {
          setClient(existingClient);
          setIsInitialized(true);
        } else {
          const newClient = await initFhevm(config);
          setClient(newClient);
          setIsInitialized(newClient.isInitialized);
        }

        setError(null);
      } catch (err) {
        console.error('[FHEVM Provider] Initialization failed:', err);
        setError(err as Error);
        setIsInitialized(false);
      } finally {
        setIsInitializing(false);
      }
    }

    initialize();
  }, [config]);

  const value: FhevmContextValue = {
    client,
    isInitialized,
    isInitializing,
    error,
  };

  return <FhevmContext.Provider value={value}>{children}</FhevmContext.Provider>;
}

/**
 * Hook to access FHEVM context
 */
export function useFhevmContext(): FhevmContextValue {
  const context = useContext(FhevmContext);

  if (!context) {
    throw new Error('useFhevmContext must be used within FhevmProvider');
  }

  return context;
}
