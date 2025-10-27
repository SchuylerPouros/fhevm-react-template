'use client';

import { ReactNode } from 'react';
import { FhevmProvider as SDKProvider } from '@fhevm/sdk/react';

interface FHEProviderProps {
  children: ReactNode;
}

export function FHEProvider({ children }: FHEProviderProps) {
  return (
    <SDKProvider
      config={{
        network: 'sepolia',
        gatewayUrl: process.env.NEXT_PUBLIC_GATEWAY_URL || 'https://gateway.zama.ai',
        debug: process.env.NODE_ENV === 'development',
      }}
    >
      {children}
    </SDKProvider>
  );
}
