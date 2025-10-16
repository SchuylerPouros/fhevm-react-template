'use client';

import { ReactNode } from 'react';
import { FhevmProvider } from '@fhevm/sdk/react';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <FhevmProvider
      config={{
        network: 'sepolia',
        gatewayUrl: 'https://gateway.zama.ai',
        debug: true,
      }}
    >
      {children}
    </FhevmProvider>
  );
}
