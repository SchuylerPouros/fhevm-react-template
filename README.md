# Universal FHEVM SDK - Fully Homomorphic Encryption for Web3

> Production-ready FHEVM SDK for building privacy-preserving decentralized applications

A comprehensive SDK and template collection for integrating Zama's fhEVM technology into your blockchain applications. This project provides framework-agnostic core utilities, React hooks, and complete examples demonstrating privacy-preserving smart contract interactions.

---

## What is This?

This repository contains:
1. **Universal FHEVM SDK** (`packages/fhevm-sdk`): A reusable, framework-agnostic SDK for FHE encryption/decryption
2. **Example Templates**: Next.js demonstrations with complete SDK integration
3. **Smart Contracts**: Example FHE-enabled contracts
4. **Complete Documentation**: Everything you need to get started

**Live Demo**: [https://private-rental-matching.vercel.app/](https://private-rental-matching.vercel.app/)

**Demo Videos**: Available in repository root (demo1.mp4, demo2.mp4, demo3.mp4)

---

## Quick Start

### Prerequisites
- Node.js >= 18.0.0
- npm or yarn
- MetaMask wallet
- Sepolia testnet ETH

### Installation

```bash
# Clone the repository
git clone <your-repository-url>
cd fhevm-react-template

# Install all packages from root
npm install
```

### Compile and Deploy Contracts

```bash
# Compile Solidity contracts
npm run compile

# Deploy to Sepolia testnet
npm run deploy

# ABI is automatically generated in artifacts/
```

### Launch Frontend Template

```bash
# Start Next.js demo (recommended)
npm run dev:nextjs

# Or navigate to the example directory
cd examples/nextjs-demo
npm install
npm run dev
```

Visit `http://localhost:3000` to see the application running!

---

## Project Structure

```
fhevm-react-template/
├── packages/
│   └── fhevm-sdk/                    # Universal SDK Package
│       ├── src/
│       │   ├── core/                 # Framework-agnostic core
│       │   │   ├── client.ts         # Main SDK client
│       │   │   └── index.ts
│       │   ├── react/                # React hooks and adapters
│       │   │   ├── hooks/
│       │   │   │   ├── useFhevm.ts
│       │   │   │   ├── useEncrypt.ts
│       │   │   │   └── useDecrypt.ts
│       │   │   ├── provider.tsx
│       │   │   └── index.ts
│       │   ├── adapters/             # Framework adapters
│       │   │   ├── vue.ts            # Vue 3 composables
│       │   │   └── index.ts
│       │   ├── utils/                # Utility functions
│       │   │   ├── encryption.ts     # Encryption utilities
│       │   │   ├── decryption.ts     # Decryption utilities
│       │   │   └── index.ts
│       │   └── types/                # TypeScript definitions
│       ├── package.json
│       ├── tsconfig.json
│       └── README.md
│
├── examples/
│   ├── nextjs-demo/                  # Next.js 14 demonstration
│   │   ├── src/
│   │   │   ├── app/                  # App Router (Next.js 14)
│   │   │   │   ├── layout.tsx        # Root layout
│   │   │   │   ├── page.tsx          # Main demo page
│   │   │   │   ├── providers.tsx     # FHEVM Provider setup
│   │   │   │   └── api/              # API routes
│   │   │   │       ├── fhe/
│   │   │   │       │   ├── route.ts  # FHE operations route
│   │   │   │       │   ├── encrypt/route.ts  # Encryption endpoint
│   │   │   │       │   ├── decrypt/route.ts  # Decryption endpoint
│   │   │   │       │   └── compute/route.ts  # Computation endpoint
│   │   │   │       └── keys/route.ts # Key management
│   │   │   ├── components/           # React components
│   │   │   │   ├── ui/               # Base UI components
│   │   │   │   │   ├── Button.tsx
│   │   │   │   │   ├── Input.tsx
│   │   │   │   │   └── Card.tsx
│   │   │   │   ├── fhe/              # FHE feature components
│   │   │   │   │   ├── FHEProvider.tsx
│   │   │   │   │   ├── EncryptionDemo.tsx
│   │   │   │   │   ├── ComputationDemo.tsx
│   │   │   │   │   └── KeyManager.tsx
│   │   │   │   └── examples/         # Use case examples
│   │   │   │       ├── BankingExample.tsx
│   │   │   │       └── MedicalExample.tsx
│   │   │   ├── lib/                  # Utility libraries
│   │   │   │   ├── fhe/              # FHE integration
│   │   │   │   │   ├── client.ts     # Client-side FHE
│   │   │   │   │   ├── server.ts     # Server-side FHE
│   │   │   │   │   ├── keys.ts       # Key management
│   │   │   │   │   └── types.ts      # Type definitions
│   │   │   │   └── utils/            # Utility functions
│   │   │   │       ├── security.ts   # Security utilities
│   │   │   │       └── validation.ts # Validation utilities
│   │   │   ├── hooks/                # Custom hooks
│   │   │   │   ├── useFHE.ts
│   │   │   │   ├── useEncryption.ts
│   │   │   │   └── useComputation.ts
│   │   │   ├── types/                # TypeScript types
│   │   │   │   ├── fhe.ts
│   │   │   │   └── api.ts
│   │   │   └── styles/               # Style files
│   │   │       └── globals.css
│   │   ├── package.json
│   │   └── README.md
│   ├── rental-matching-react/        # React rental platform
│   │   ├── src/
│   │   │   ├── components/           # React components
│   │   │   │   ├── WalletInfo.tsx    # Wallet connection UI
│   │   │   │   ├── CreateListing.tsx # Create listing form
│   │   │   │   ├── CreateRequest.tsx # Create request form
│   │   │   │   ├── CreateMatch.tsx   # Match creation
│   │   │   │   ├── Statistics.tsx    # Platform stats
│   │   │   │   ├── UserActivity.tsx  # User's listings/requests
│   │   │   │   └── StatusBar.tsx     # Status messages
│   │   │   ├── hooks/                # Custom React hooks
│   │   │   │   ├── useWallet.ts      # Wallet connection hook
│   │   │   │   └── useContract.ts    # Contract interaction hook
│   │   │   ├── lib/                  # Utility libraries
│   │   │   │   └── contract.ts       # Contract ABI and types
│   │   │   ├── App.tsx               # Main app component
│   │   │   ├── main.tsx              # Entry point
│   │   │   ├── index.css             # Global styles
│   │   │   └── vite-env.d.ts         # Type declarations
│   │   ├── index.html                # HTML template
│   │   ├── vite.config.ts            # Vite configuration
│   │   ├── tsconfig.json             # TypeScript config
│   │   ├── package.json              # Dependencies
│   │   └── README.md                 # Project documentation
│   ├── RentalMatching/               # HTML rental platform
│   └── README.md                     # Examples documentation
│
├── contracts/                        # Example FHE contracts
│   ├── PrivateRentalMatching.sol
│   └── README.md
│
├── scripts/                          # Deployment scripts
│   ├── deploy.ts
│   └── README.md
│
├── test/                             # Contract tests
│   └── PrivateRentalMatching.test.ts
│
├── hardhat.config.ts                 # Hardhat configuration
├── package.json                      # Root package.json
├── README.md                         # This file
├── BOUNTY_SUBMISSION.md              # Bounty submission details
└── SETUP_GUIDE.md                    # Detailed setup guide
```

---

## Key Features

### Universal SDK Package
- Framework-Agnostic Core: Use with React, Vue, Angular, or vanilla JS
- Type-Safe: Full TypeScript support with comprehensive types
- Modular API: Import only what you need
- Wagmi-like Design: Familiar hook patterns for React developers
- Zero Dependencies: Core has no external dependencies

### Encryption and Decryption
- Easy Encryption: Simple encrypt helper functions
- Batch Operations: Encrypt multiple values at once
- User Decryption: EIP-712 signature-based decryption
- Public Decryption: No-signature decryption for public data
- Automatic Verification: Built-in ciphertext validation

### Developer Experience
- React Hooks: `useFhevm()`, `useEncrypt()`, `useDecrypt()`
- Ready Components: Copy-paste encryption/decryption components
- Error Handling: Graceful error messages and retry logic
- Loading States: Built-in loading indicators
- IntelliSense: Full autocomplete support

### Production Ready
- Tested: Comprehensive test suite
- Documented: JSDoc comments on all public APIs
- Deployed: Live demo on Vercel
- Optimized: Tree-shakeable for minimal bundle size

---

## 💻 SDK Integration Guide

### Installation

```bash
# Install the SDK package
npm install @fhevm/sdk

# Or use it from the workspace
npm install @fhevm/sdk@workspace:*
```

### Basic SDK Usage (Vanilla JS/TypeScript)

```typescript
import { initFhevm } from '@fhevm/sdk/core';

// Initialize the FHEVM SDK
const fhevm = await initFhevm({
  network: 'sepolia',
  gatewayUrl: 'https://gateway.zama.ai',
  debug: false,
});

// Encrypt a value
const encrypted = await fhevm.encrypt(1234, 'euint32');
console.log('Ciphertext:', encrypted.ciphertext);
console.log('Type:', encrypted.type);

// Public decrypt (no signature required)
const decrypted = await fhevm.publicDecrypt(encrypted.ciphertext, 'euint32');
console.log('Decrypted value:', decrypted.value);
```

### React Integration with Hooks

The SDK provides powerful React hooks for seamless integration:

```typescript
'use client';

import { useFhevm, useEncrypt, useDecrypt } from '@fhevm/sdk/react';
import { useState } from 'react';

function EncryptionExample() {
  const { isInitialized, isInitializing } = useFhevm();
  const { encrypt, isEncrypting, result: encryptResult } = useEncrypt();
  const { publicDecrypt, isDecrypting, result: decryptResult } = useDecrypt();

  const [value, setValue] = useState('42');

  const handleEncrypt = async () => {
    try {
      await encrypt(Number(value), 'euint32');
    } catch (error) {
      console.error('Encryption failed:', error);
    }
  };

  const handleDecrypt = async () => {
    if (!encryptResult) return;
    try {
      await publicDecrypt(encryptResult.ciphertext, 'euint32');
    } catch (error) {
      console.error('Decryption failed:', error);
    }
  };

  if (isInitializing) return <div>Initializing FHEVM SDK...</div>;
  if (!isInitialized) return <div>Failed to initialize SDK</div>;

  return (
    <div>
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter a number"
      />

      <button onClick={handleEncrypt} disabled={isEncrypting}>
        {isEncrypting ? 'Encrypting...' : 'Encrypt Value'}
      </button>

      {encryptResult && (
        <div>
          <p>Encrypted: {encryptResult.ciphertext}</p>
          <button onClick={handleDecrypt} disabled={isDecrypting}>
            {isDecrypting ? 'Decrypting...' : 'Decrypt'}
          </button>
        </div>
      )}

      {decryptResult && (
        <div>
          <p>Decrypted value: {decryptResult.value.toString()}</p>
        </div>
      )}
    </div>
  );
}
```

### Setting Up the React Provider

Wrap your application with the `FhevmProvider`:

```typescript
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

// In your root layout or app component
function App() {
  return (
    <Providers>
      <EncryptionExample />
    </Providers>
  );
}
```

### Next.js 14 Integration

#### Complete Project Structure

For production Next.js 14 applications with FHEVM SDK, use this recommended structure:

```
src/
├── app/                        # Next.js App Router
│   ├── layout.tsx              # Root layout with providers
│   ├── page.tsx                # Home page
│   ├── globals.css             # Global styles
│   └── api/                    # API routes
│       ├── fhe/
│       │   ├── route.ts        # FHE operations
│       │   ├── encrypt/route.ts # Encryption endpoint
│       │   ├── decrypt/route.ts # Decryption endpoint
│       │   └── compute/route.ts # Computation endpoint
│       └── keys/route.ts       # Key management
│
├── components/                 # React components
│   ├── ui/                     # Base UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── Card.tsx
│   ├── fhe/                    # FHE feature components
│   │   ├── FHEProvider.tsx     # FHE context provider
│   │   ├── EncryptionDemo.tsx  # Encryption demo
│   │   ├── ComputationDemo.tsx # Computation demo
│   │   └── KeyManager.tsx      # Key manager
│   └── examples/               # Use case examples
│       ├── BankingExample.tsx  # Financial use case
│       └── MedicalExample.tsx  # Healthcare use case
│
├── lib/                        # Utility libraries
│   ├── fhe/                    # FHE integration
│   │   ├── client.ts           # Client-side FHE
│   │   ├── server.ts           # Server-side FHE
│   │   ├── keys.ts             # Key management
│   │   └── types.ts            # Type definitions
│   └── utils/                  # Utility functions
│       ├── security.ts         # Security utilities
│       └── validation.ts       # Validation utilities
│
├── hooks/                      # Custom hooks
│   ├── useFHE.ts               # FHE operations hook
│   ├── useEncryption.ts        # Encryption hook
│   └── useComputation.ts       # Computation hook
│
├── types/                      # TypeScript types
│   ├── fhe.ts                  # FHE-related types
│   └── api.ts                  # API type definitions
│
└── styles/                     # Style files
    └── globals.css
```

#### Core Implementation Files

**1. Root Layout (`src/app/layout.tsx`)**

```typescript
import { Providers } from './providers';
import '../styles/globals.css';

export const metadata = {
  title: 'FHEVM Application',
  description: 'Privacy-preserving application using FHEVM',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

**2. Providers Setup (`src/app/providers.tsx`)**

```typescript
'use client';

import { ReactNode } from 'react';
import { FhevmProvider } from '@fhevm/sdk/react';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <FhevmProvider
      config={{
        network: 'sepolia',
        gatewayUrl: 'https://gateway.zama.ai',
        debug: process.env.NODE_ENV === 'development',
      }}
    >
      {children}
    </FhevmProvider>
  );
}
```

**3. Client-Side FHE Library (`src/lib/fhe/client.ts`)**

```typescript
import { initFhevm } from '@fhevm/sdk/core';
import type { FhevmClient, EncryptedValue } from '@fhevm/sdk/types';

let fhevmInstance: FhevmClient | null = null;

export async function getFhevmClient(): Promise<FhevmClient> {
  if (!fhevmInstance) {
    fhevmInstance = await initFhevm({
      network: 'sepolia',
      gatewayUrl: process.env.NEXT_PUBLIC_GATEWAY_URL || 'https://gateway.zama.ai',
      debug: process.env.NODE_ENV === 'development',
    });
  }
  return fhevmInstance;
}

export async function encryptValue(
  value: number,
  type: 'euint8' | 'euint16' | 'euint32' = 'euint32'
): Promise<EncryptedValue> {
  const client = await getFhevmClient();
  return client.encrypt(value, type);
}

export async function decryptValue(
  ciphertext: string,
  type: string
): Promise<bigint> {
  const client = await getFhevmClient();
  const result = await client.publicDecrypt(ciphertext, type);
  return result.value;
}
```

**4. Custom FHE Hook (`src/hooks/useFHE.ts`)**

```typescript
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
```

**5. Encryption Component (`src/components/fhe/EncryptionDemo.tsx`)**

```typescript
'use client';

import { useState } from 'react';
import { useEncrypt, useDecrypt } from '@fhevm/sdk/react';

export function EncryptionDemo() {
  const [value, setValue] = useState('42');
  const [type, setType] = useState<'euint8' | 'euint16' | 'euint32'>('euint32');

  const { encrypt, isEncrypting, result: encryptResult, error: encryptError } = useEncrypt();
  const { publicDecrypt, isDecrypting, result: decryptResult, error: decryptError } = useDecrypt();

  const handleEncrypt = async () => {
    try {
      await encrypt(Number(value), type);
    } catch (error) {
      console.error('Encryption failed:', error);
    }
  };

  const handleDecrypt = async () => {
    if (!encryptResult) return;
    try {
      await publicDecrypt(encryptResult.ciphertext, type);
    } catch (error) {
      console.error('Decryption failed:', error);
    }
  };

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold">FHE Encryption Demo</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Value to Encrypt
          </label>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Enter a number"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            FHE Type
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as any)}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="euint8">euint8 (0-255)</option>
            <option value="euint16">euint16 (0-65535)</option>
            <option value="euint32">euint32</option>
          </select>
        </div>

        <button
          onClick={handleEncrypt}
          disabled={isEncrypting}
          className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {isEncrypting ? 'Encrypting...' : 'Encrypt Value'}
        </button>

        {encryptError && (
          <div className="p-4 bg-red-100 border border-red-300 rounded-lg">
            <p className="text-red-700">Error: {encryptError.message}</p>
          </div>
        )}

        {encryptResult && (
          <div className="p-4 bg-green-100 border border-green-300 rounded-lg">
            <h3 className="font-semibold mb-2">Encrypted Result:</h3>
            <p className="break-all font-mono text-sm">{encryptResult.ciphertext}</p>
            <p className="mt-2 text-sm">Type: {encryptResult.type}</p>

            <button
              onClick={handleDecrypt}
              disabled={isDecrypting}
              className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
            >
              {isDecrypting ? 'Decrypting...' : 'Decrypt'}
            </button>
          </div>
        )}

        {decryptResult && (
          <div className="p-4 bg-purple-100 border border-purple-300 rounded-lg">
            <h3 className="font-semibold mb-2">Decrypted Result:</h3>
            <p className="text-2xl font-bold">{decryptResult.value.toString()}</p>
          </div>
        )}
      </div>
    </div>
  );
}
```

**6. API Route for Encryption (`src/app/api/fhe/encrypt/route.ts`)**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { initFhevm } from '@fhevm/sdk/core';

export async function POST(request: NextRequest) {
  try {
    const { value, type } = await request.json();

    if (typeof value !== 'number' || !type) {
      return NextResponse.json(
        { error: 'Invalid input' },
        { status: 400 }
      );
    }

    const fhevm = await initFhevm({
      network: 'sepolia',
      gatewayUrl: process.env.GATEWAY_URL || 'https://gateway.zama.ai',
    });

    const encrypted = await fhevm.encrypt(value, type);

    return NextResponse.json({
      success: true,
      data: encrypted,
    });
  } catch (error) {
    console.error('Encryption error:', error);
    return NextResponse.json(
      { error: 'Encryption failed' },
      { status: 500 }
    );
  }
}
```

**7. Main Page (`src/app/page.tsx`)**

```typescript
'use client';

import { EncryptionDemo } from '@/components/fhe/EncryptionDemo';
import { useFhevm } from '@fhevm/sdk/react';

export default function Home() {
  const { isInitialized, isInitializing } = useFhevm();

  if (isInitializing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Initializing FHEVM SDK...</div>
      </div>
    );
  }

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">Failed to initialize FHEVM SDK</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen p-8 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
          FHEVM Application
        </h1>
        <EncryptionDemo />
      </div>
    </main>
  );
}
```

#### Environment Configuration

Create a `.env.local` file:

```bash
NEXT_PUBLIC_GATEWAY_URL=https://gateway.zama.ai
NEXT_PUBLIC_NETWORK=sepolia
GATEWAY_URL=https://gateway.zama.ai
```

#### Additional API Routes

**Decryption API (`src/app/api/fhe/decrypt/route.ts`)**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { initFhevm } from '@fhevm/sdk/core';

export async function POST(request: NextRequest) {
  try {
    const { ciphertext, type, signature, contractAddress } = await request.json();

    if (!ciphertext || !type) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const fhevm = await initFhevm({
      network: 'sepolia',
      gatewayUrl: process.env.GATEWAY_URL || 'https://gateway.zama.ai',
    });

    let result;
    if (signature && contractAddress) {
      // User decryption with EIP-712 signature
      result = await fhevm.userDecrypt(ciphertext, type, signature, contractAddress);
    } else {
      // Public decryption
      result = await fhevm.publicDecrypt(ciphertext, type);
    }

    return NextResponse.json({
      success: true,
      data: {
        value: result.value.toString(),
        type: result.type,
      },
    });
  } catch (error) {
    console.error('Decryption error:', error);
    return NextResponse.json(
      { error: 'Decryption failed' },
      { status: 500 }
    );
  }
}
```

**Computation API (`src/app/api/fhe/compute/route.ts`)**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { initFhevm } from '@fhevm/sdk/core';

export async function POST(request: NextRequest) {
  try {
    const { operation, operands, types } = await request.json();

    if (!operation || !operands || !types) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const fhevm = await initFhevm({
      network: 'sepolia',
      gatewayUrl: process.env.GATEWAY_URL || 'https://gateway.zama.ai',
    });

    // Encrypt operands
    const encryptedOperands = await Promise.all(
      operands.map((value: number, index: number) =>
        fhevm.encrypt(value, types[index])
      )
    );

    return NextResponse.json({
      success: true,
      data: {
        operation,
        encryptedOperands: encryptedOperands.map(op => ({
          ciphertext: op.ciphertext,
          type: op.type,
        })),
      },
    });
  } catch (error) {
    console.error('Computation error:', error);
    return NextResponse.json(
      { error: 'Computation failed' },
      { status: 500 }
    );
  }
}
```

#### Advanced Components

**Key Manager Component (`src/components/fhe/KeyManager.tsx`)**

```typescript
'use client';

import { useState } from 'react';
import { useFhevm } from '@fhevm/sdk/react';

export function KeyManager() {
  const { fhevm, isInitialized } = useFhevm();
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGetPublicKey = async () => {
    if (!fhevm) return;
    setLoading(true);
    try {
      // Get the public key from FHEVM instance
      const key = await fhevm.getPublicKey();
      setPublicKey(key);
    } catch (error) {
      console.error('Failed to get public key:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isInitialized) {
    return <div>FHEVM not initialized</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Key Management</h2>

      <button
        onClick={handleGetPublicKey}
        disabled={loading}
        className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
      >
        {loading ? 'Loading...' : 'Get Public Key'}
      </button>

      {publicKey && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <h3 className="font-semibold mb-2">Public Key:</h3>
          <p className="break-all font-mono text-sm">{publicKey}</p>
        </div>
      )}
    </div>
  );
}
```

**Computation Demo Component (`src/components/fhe/ComputationDemo.tsx`)**

```typescript
'use client';

import { useState } from 'react';
import { useEncrypt } from '@fhevm/sdk/react';

export function ComputationDemo() {
  const [value1, setValue1] = useState('10');
  const [value2, setValue2] = useState('20');
  const [operation, setOperation] = useState<'add' | 'sub' | 'mul'>('add');

  const { encrypt, isEncrypting } = useEncrypt();
  const [results, setResults] = useState<any>(null);

  const handleCompute = async () => {
    try {
      // Encrypt both values
      const encrypted1 = await encrypt(Number(value1), 'euint32');
      const encrypted2 = await encrypt(Number(value2), 'euint32');

      setResults({
        operation,
        operand1: encrypted1,
        operand2: encrypted2,
      });
    } catch (error) {
      console.error('Computation failed:', error);
    }
  };

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold">FHE Computation Demo</h2>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              First Value
            </label>
            <input
              type="number"
              value={value1}
              onChange={(e) => setValue1(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Second Value
            </label>
            <input
              type="number"
              value={value2}
              onChange={(e) => setValue2(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Operation
          </label>
          <select
            value={operation}
            onChange={(e) => setOperation(e.target.value as any)}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="add">Addition (+)</option>
            <option value="sub">Subtraction (-)</option>
            <option value="mul">Multiplication (×)</option>
          </select>
        </div>

        <button
          onClick={handleCompute}
          disabled={isEncrypting}
          className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
        >
          {isEncrypting ? 'Computing...' : 'Encrypt and Compute'}
        </button>

        {results && (
          <div className="p-4 bg-indigo-100 border border-indigo-300 rounded-lg">
            <h3 className="font-semibold mb-2">Encrypted Operands:</h3>
            <div className="space-y-2 text-sm">
              <p>
                <strong>Operation:</strong> {results.operation}
              </p>
              <p className="break-all">
                <strong>Operand 1:</strong> {results.operand1?.ciphertext}
              </p>
              <p className="break-all">
                <strong>Operand 2:</strong> {results.operand2?.ciphertext}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
```

**Banking Example Component (`src/components/examples/BankingExample.tsx`)**

```typescript
'use client';

import { useState } from 'react';
import { useEncrypt, useDecrypt } from '@fhevm/sdk/react';

export function BankingExample() {
  const [balance, setBalance] = useState('1000');
  const [amount, setAmount] = useState('100');

  const { encrypt, isEncrypting, result: encryptedBalance } = useEncrypt();
  const { publicDecrypt, result: decryptedBalance } = useDecrypt();

  const handleEncryptBalance = async () => {
    await encrypt(Number(balance), 'euint32');
  };

  const handleCheckBalance = async () => {
    if (encryptedBalance) {
      await publicDecrypt(encryptedBalance.ciphertext, 'euint32');
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">
        🏦 Private Banking Example
      </h2>
      <p className="text-gray-600 mb-6">
        Encrypt account balance and perform private transactions
      </p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Account Balance
          </label>
          <input
            type="number"
            value={balance}
            onChange={(e) => setBalance(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <button
          onClick={handleEncryptBalance}
          disabled={isEncrypting}
          className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
        >
          {isEncrypting ? 'Encrypting...' : 'Encrypt Balance'}
        </button>

        {encryptedBalance && (
          <div className="p-4 bg-green-100 border border-green-300 rounded-lg">
            <p className="text-sm font-medium mb-2">Encrypted Balance:</p>
            <p className="break-all font-mono text-xs">
              {encryptedBalance.ciphertext}
            </p>

            <button
              onClick={handleCheckBalance}
              className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Check Balance
            </button>
          </div>
        )}

        {decryptedBalance && (
          <div className="p-4 bg-blue-100 border border-blue-300 rounded-lg">
            <p className="text-sm font-medium">Current Balance:</p>
            <p className="text-2xl font-bold">${decryptedBalance.value.toString()}</p>
          </div>
        )}
      </div>
    </div>
  );
}
```

#### Type Definitions (`src/types/fhe.ts`)**

```typescript
export interface EncryptedValue {
  ciphertext: string;
  type: string;
  timestamp: number;
}

export interface DecryptedValue {
  value: bigint;
  type: string;
  timestamp: number;
}

export interface FhevmConfig {
  network: 'sepolia' | 'mainnet';
  gatewayUrl: string;
  debug?: boolean;
}

export interface ComputationRequest {
  operation: 'add' | 'sub' | 'mul' | 'div';
  operands: number[];
  types: string[];
}

export interface ComputationResult {
  operation: string;
  encryptedOperands: EncryptedValue[];
  result?: EncryptedValue;
}
```

#### Package Configuration (`package.json`)

```json
{
  "name": "fhevm-nextjs-app",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@fhevm/sdk": "^1.0.0",
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "typescript": "^5.3.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "tailwindcss": "^3.4.0"
  }
}
```

### Vue 3 Integration

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { initFhevm } from '@fhevm/sdk/core';

const fhevm = ref(null);
const encrypted = ref(null);
const decrypted = ref(null);
const isEncrypting = ref(false);
const isDecrypting = ref(false);
const inputValue = ref(42);

onMounted(async () => {
  fhevm.value = await initFhevm({
    network: 'sepolia',
    gatewayUrl: 'https://gateway.zama.ai',
  });
});

async function encryptValue() {
  isEncrypting.value = true;
  try {
    encrypted.value = await fhevm.value.encrypt(inputValue.value, 'euint32');
  } finally {
    isEncrypting.value = false;
  }
}

async function decryptValue() {
  if (!encrypted.value) return;
  isDecrypting.value = true;
  try {
    decrypted.value = await fhevm.value.publicDecrypt(
      encrypted.value.ciphertext,
      'euint32'
    );
  } finally {
    isDecrypting.value = false;
  }
}
</script>

<template>
  <div>
    <input v-model.number="inputValue" type="number" />
    <button @click="encryptValue" :disabled="isEncrypting">
      {{ isEncrypting ? 'Encrypting...' : 'Encrypt' }}
    </button>

    <div v-if="encrypted">
      <p>Encrypted: {{ encrypted.ciphertext }}</p>
      <button @click="decryptValue" :disabled="isDecrypting">
        {{ isDecrypting ? 'Decrypting...' : 'Decrypt' }}
      </button>
    </div>

    <div v-if="decrypted">
      <p>Decrypted: {{ decrypted.value }}</p>
    </div>
  </div>
</template>
```

### Node.js Backend Integration

```typescript
import { initFhevm } from '@fhevm/sdk/core';

async function main() {
  // Initialize SDK
  const fhevm = await initFhevm({
    network: 'sepolia',
    gatewayUrl: 'https://gateway.zama.ai',
  });

  // Encrypt a value
  const encrypted = await fhevm.encrypt(1234, 'euint32');
  console.log('Encrypted:', encrypted.ciphertext);

  // Public decrypt (for testing/backend scenarios)
  const decrypted = await fhevm.publicDecrypt(
    encrypted.ciphertext,
    'euint32'
  );
  console.log('Decrypted:', decrypted.value);
}

main().catch(console.error);
```

### SDK API Reference

#### Core SDK (`@fhevm/sdk/core`)

```typescript
// Initialize
const fhevm = await initFhevm(config: FhevmConfig): Promise<FhevmClient>

// Configuration
interface FhevmConfig {
  network: 'sepolia' | 'mainnet';
  gatewayUrl: string;
  debug?: boolean;
}

// Encryption
const result = await fhevm.encrypt(
  value: number | bigint,
  type: 'euint8' | 'euint16' | 'euint32' | 'euint64' | 'euint128'
): Promise<EncryptedValue>

// Public Decryption (no signature)
const decrypted = await fhevm.publicDecrypt(
  ciphertext: string,
  type: string
): Promise<DecryptedValue>

// User Decryption (with EIP-712 signature)
const decrypted = await fhevm.userDecrypt(
  ciphertext: string,
  type: string,
  signature: string,
  contractAddress: string
): Promise<DecryptedValue>
```

#### React Hooks (`@fhevm/sdk/react`)

```typescript
// Provider
<FhevmProvider config={config}>
  {children}
</FhevmProvider>

// Initialization Hook
const {
  isInitialized: boolean,
  isInitializing: boolean,
  error: Error | null,
  fhevm: FhevmClient | null
} = useFhevm()

// Encryption Hook
const {
  encrypt: (value: number, type: string) => Promise<void>,
  isEncrypting: boolean,
  result: EncryptedValue | null,
  error: Error | null,
  reset: () => void
} = useEncrypt()

// Decryption Hook
const {
  publicDecrypt: (ciphertext: string, type: string) => Promise<void>,
  userDecrypt: (ciphertext: string, type: string, signature: string) => Promise<void>,
  isDecrypting: boolean,
  result: DecryptedValue | null,
  error: Error | null,
  reset: () => void
} = useDecrypt()
```

#### Type Definitions

```typescript
interface EncryptedValue {
  ciphertext: string;      // Hex-encoded encrypted data
  type: string;            // FHE type (euint8, euint16, etc.)
  timestamp: number;       // Encryption timestamp
}

interface DecryptedValue {
  value: bigint;           // Decrypted value
  type: string;            // FHE type
  timestamp: number;       // Decryption timestamp
}
```

---

## Example Templates

All examples are located in the `examples/` directory and demonstrate different ways to integrate the FHEVM SDK.

### 1. Next.js 14 Demo (`examples/nextjs-demo/`)

A complete Next.js 14 application showcasing the FHEVM SDK with App Router:

**Features:**
- Full FHEVM SDK integration with React hooks
- Interactive encryption/decryption UI
- Support for multiple FHE types (euint8, euint16, euint32)
- Real-time state management with loading indicators
- Beautiful gradient UI with Tailwind CSS
- TypeScript support with full type safety
- Complete API routes for server-side operations
- Reusable FHE components and custom hooks
- Banking and medical use case examples

**Running the Example:**

```bash
# From the root directory
npm install
npm run dev:nextjs

# Or from the example directory
cd examples/nextjs-demo
npm install
npm run dev
```

Visit `http://localhost:3000` to see the demo in action.

**Key Files:**
- `src/app/providers.tsx` - FhevmProvider setup
- `src/app/page.tsx` - Main component using SDK hooks
- `src/app/api/fhe/` - API routes for encryption/decryption
- `src/components/fhe/` - Reusable FHE components
- `src/lib/fhe/` - FHE utility functions
- `src/hooks/` - Custom React hooks

### 2. Rental Matching Platform - HTML Version (`examples/RentalMatching/`)

A production-ready privacy-preserving rental matching platform built with vanilla HTML/JS:

**Features:**
- Anonymous property listings with encrypted data
- Encrypted matching algorithm
- User and public decryption workflows
- EIP-712 signature integration for secure decryption
- Production-ready deployment configuration

**Use Case:** Landlords and tenants can match without revealing sensitive information (prices, locations) until both parties confirm mutual interest.

**Live Demo:** [https://simple-rental-matching.vercel.app/](https://simple-rental-matching.vercel.app/)

### 3. Rental Matching Platform - React Version (`examples/rental-matching-react/`)

A modern React implementation of the privacy-preserving rental matching platform:

**Features:**
- Built with React 18 and TypeScript for type safety
- Vite for fast development and optimized builds
- Custom React hooks for wallet and contract interactions
- Component-based architecture for better code organization
- Real-time event listeners for instant updates
- Responsive design that works on all devices
- Full integration with Ethers.js 6
- FHE encryption for all sensitive data

**Tech Stack:**
- React 18 with TypeScript
- Vite build tool
- Ethers.js 6 for blockchain interaction
- FHEVM for fully homomorphic encryption
- CSS3 for styling

**Running the React Version:**

```bash
# From the root directory
cd examples/rental-matching-react

# Install dependencies (if not using workspace)
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Visit `http://localhost:3000` to see the React application.

**Key Improvements over HTML Version:**
- Better code organization with reusable components
- Type safety with TypeScript
- Custom hooks for cleaner state management
- Improved developer experience with hot reload
- Better testability and maintainability
- Optimized production builds

### 4. Additional Examples

The `examples/README.md` file contains additional integration patterns including:
- React 18 standalone example
- Vue 3 Composition API integration
- Node.js backend integration
- Vanilla JavaScript usage

**Explore the Examples:**

```bash
# View all examples
ls examples/

# Read the examples documentation
cat examples/README.md
```

---

## 🚀 Working with Examples

### Running the Next.js Demo

The primary example demonstrates all SDK features in a Next.js 14 application:

```bash
# Option 1: Run from root with npm script
npm run dev:nextjs

# Option 2: Run directly from example directory
cd examples/nextjs-demo
npm install
npm run dev
```

Open `http://localhost:3000` to see:
- Interactive encryption/decryption interface
- Multiple FHE type support (euint8, euint16, euint32)
- Real-time loading states and error handling
- Full TypeScript integration

### Understanding the SDK Integration

The Next.js example showcases the recommended integration pattern:

**1. Provider Setup** (`examples/nextjs-demo/src/app/providers.tsx`)
```typescript
import { FhevmProvider } from '@fhevm/sdk/react';

export function Providers({ children }) {
  return (
    <FhevmProvider config={{
      network: 'sepolia',
      gatewayUrl: 'https://gateway.zama.ai'
    }}>
      {children}
    </FhevmProvider>
  );
}
```

**2. Using Hooks** (`examples/nextjs-demo/src/app/page.tsx`)
```typescript
import { useFhevm, useEncrypt, useDecrypt } from '@fhevm/sdk/react';

export default function Home() {
  const { isInitialized } = useFhevm();
  const { encrypt, isEncrypting, result } = useEncrypt();

  const handleEncrypt = async () => {
    await encrypt(42, 'euint32');
  };

  return (
    <button onClick={handleEncrypt} disabled={isEncrypting}>
      {isEncrypting ? 'Encrypting...' : 'Encrypt'}
    </button>
  );
}
```

### Customizing for Your Project

To adapt the examples for your own project:

1. **Copy the provider setup** from `examples/nextjs-demo/src/app/providers.tsx`
2. **Import the hooks** in your components
3. **Adjust the configuration** (network, gateway URL, contract addresses)
4. **Add your business logic** around encryption/decryption
5. **Style to match** your design system

### Example Use Cases

The examples demonstrate several real-world scenarios:

- **Encrypted Forms**: User input encryption before submission
- **Private Data Storage**: Storing sensitive data on-chain
- **Selective Disclosure**: Decrypting only when authorized
- **Batch Operations**: Encrypting multiple values efficiently

---

## 📚 Documentation

- **[BOUNTY_SUBMISSION.md](./BOUNTY_SUBMISSION.md)**: Complete bounty requirements checklist
- **[SETUP_GUIDE.md](./SETUP_GUIDE.md)**: Detailed installation and configuration
- **[SDK_DOCUMENTATION.md](./SDK_DOCUMENTATION.md)**: Full API reference
- **[packages/fhevm-sdk/README.md](./packages/fhevm-sdk/README.md)**: SDK-specific docs

---

## Links

| Resource | URL |
|----------|-----|
| **GitHub Repository** | Your repository URL |
| **Demo Videos** | Available in repository root |
| **Contract Address** | `0x980051585b6DC385159BD53B5C78eb7B91b848E5` |
| **Sepolia Explorer** | https://sepolia.etherscan.io/address/0x980051585b6DC385159BD53B5C78eb7B91b848E5 |
| **Examples Directory** | `./examples/` |
| **SDK Package** | `./packages/fhevm-sdk/` |

---

## Testing

```bash
# Run all tests
npm test

# Run contract tests
npm run test:contracts

# Run SDK tests
npm run test:sdk

# Test coverage
npm run test:coverage
```

---

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Web3**: wagmi, viem, RainbowKit
- **FHE**: Zama fhEVM SDK
- **Smart Contracts**: Solidity, Hardhat
- **Deployment**: Vercel

---

## Zama Bounty Program

This project is submitted for the Zama FHEVM SDK Bounty.

### Requirements Met:
- Universal SDK package importable into any application
- Initialization, encryption, and decryption utilities
- EIP-712 signature support for userDecrypt
- Wagmi-like modular API structure
- Reusable components for common scenarios
- Clean, well-documented, and extensible code
- Complete setup from root directory
- Example templates with Next.js
- Video demonstration
- Deployment links in README

See [BOUNTY_SUBMISSION.md](./BOUNTY_SUBMISSION.md) for detailed checklist.

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (git checkout -b feature/amazing-feature)
3. Commit your changes (git commit -m 'Add amazing feature')
4. Push to the branch (git push origin feature/amazing-feature)
5. Open a Pull Request

---

## License

MIT License - see [LICENSE](./LICENSE) for details.

---

## Acknowledgments

- Zama for creating fhEVM and hosting this bounty
- wagmi and RainbowKit for API design inspiration
- Next.js team for the excellent framework
- Community for feedback and support

---

## Support

For questions and support:
- Open an issue on GitHub
- Check the [documentation](./SETUP_GUIDE.md)
- Explore the [examples directory](./examples/)
- Review the [SDK documentation](./packages/fhevm-sdk/README.md)

---

**Built for privacy-preserving Web3**
