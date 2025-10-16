# FHEVM SDK Documentation

Complete API reference for the Universal FHEVM SDK.

---

## Table of Contents

1. [Installation](#installation)
2. [Core API](#core-api)
3. [React API](#react-api)
4. [TypeScript Types](#typescript-types)
5. [Integration Guide](#integration-guide)
6. [Best Practices](#best-practices)
7. [Troubleshooting](#troubleshooting)

---

## Installation

```bash
npm install @fhevm/sdk
# or
yarn add @fhevm/sdk
# or
pnpm add @fhevm/sdk
```

---

## Core API

The core API is framework-agnostic and can be used in any JavaScript/TypeScript environment.

### `initFhevm(config: FhevmConfig)`

Initialize the FHEVM SDK with configuration options.

**Parameters:**
- `config.network` (string): Network name (`'sepolia'` | `'mainnet'` | `'localhost'`)
- `config.gatewayUrl` (string): Gateway URL (e.g., `'https://gateway.zama.ai'`)
- `config.aclAddress` (string, optional): ACL contract address
- `config.kmsVerifierAddress` (string, optional): KMS verifier address
- `config.chainId` (number, optional): Chain ID
- `config.debug` (boolean, optional): Enable debug logging

**Returns:** `Promise<FhevmClient>`

**Example:**
```typescript
import { initFhevm } from '@fhevm/sdk/core';

const fhevm = await initFhevm({
  network: 'sepolia',
  gatewayUrl: 'https://gateway.zama.ai',
  debug: true,
});
```

### `getFhevmClient()`

Get the current FHEVM client instance.

**Returns:** `FhevmClient | null`

**Example:**
```typescript
import { getFhevmClient } from '@fhevm/sdk/core';

const client = getFhevmClient();
if (client && client.isInitialized) {
  // Use client
}
```

### FhevmClient Methods

#### `encrypt(value, type)`

Encrypt a value using FHE.

**Parameters:**
- `value` (number | bigint | boolean): Value to encrypt
- `type` (FheType): FHE type (e.g., `'euint32'`, `'ebool'`)

**Returns:** `Promise<EncryptedValue>`

**Example:**
```typescript
const encrypted = await fhevm.encrypt(1234, 'euint32');
console.log(encrypted.ciphertext); // "0x..."
```

#### `decrypt(request)`

Decrypt a ciphertext (requires signature).

**Parameters:**
- `request.ciphertext` (string): Encrypted value
- `request.type` (FheType): FHE type
- `request.contractAddress` (string): Contract address

**Returns:** `Promise<DecryptedValue>`

**Example:**
```typescript
const decrypted = await fhevm.decrypt({
  ciphertext: '0x...',
  type: 'euint32',
  contractAddress: '0x...',
});
```

#### `publicDecrypt(ciphertext, type)`

Decrypt a public ciphertext (no signature required).

**Parameters:**
- `ciphertext` (string): Encrypted value
- `type` (FheType): FHE type

**Returns:** `Promise<DecryptedValue>`

**Example:**
```typescript
const decrypted = await fhevm.publicDecrypt('0x...', 'euint32');
console.log(decrypted.value); // 1234n
```

#### `userDecrypt(request, signature)`

Decrypt with user signature (EIP-712).

**Parameters:**
- `request` (DecryptionRequest): Decryption request
- `signature` (string): EIP-712 signature

**Returns:** `Promise<DecryptedValue>`

**Example:**
```typescript
const decrypted = await fhevm.userDecrypt(
  {
    ciphertext: '0x...',
    type: 'euint32',
    contractAddress: '0x...',
  },
  signature
);
```

---

## React API

React-specific hooks and components for easy integration.

### `<FhevmProvider>`

Provider component to wrap your application.

**Props:**
- `config` (FhevmConfig): SDK configuration
- `children` (ReactNode): Child components

**Example:**
```typescript
import { FhevmProvider } from '@fhevm/sdk/react';

function App() {
  return (
    <FhevmProvider
      config={{
        network: 'sepolia',
        gatewayUrl: 'https://gateway.zama.ai',
      }}
    >
      <YourApp />
    </FhevmProvider>
  );
}
```

### `useFhevm()`

Hook to access FHEVM client and status.

**Returns:**
- `client` (FhevmClient | null): FHEVM client instance
- `isInitialized` (boolean): Whether SDK is initialized
- `isInitializing` (boolean): Whether SDK is initializing
- `error` (Error | null): Initialization error

**Example:**
```typescript
import { useFhevm } from '@fhevm/sdk/react';

function MyComponent() {
  const { client, isInitialized, isInitializing, error } = useFhevm();

  if (isInitializing) return <div>Initializing...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!isInitialized) return <div>Not initialized</div>;

  return <div>Ready!</div>;
}
```

### `useEncrypt()`

Hook to encrypt values.

**Returns:**
- `encrypt` (function): Encryption function
- `isEncrypting` (boolean): Whether encrypting
- `error` (Error | null): Encryption error
- `result` (EncryptedValue | null): Last encrypted value

**Example:**
```typescript
import { useEncrypt } from '@fhevm/sdk/react';

function EncryptInput() {
  const { encrypt, isEncrypting, result } = useEncrypt();

  const handleEncrypt = async () => {
    try {
      const encrypted = await encrypt(1234, 'euint32');
      console.log('Encrypted:', encrypted.ciphertext);
    } catch (error) {
      console.error('Encryption failed:', error);
    }
  };

  return (
    <button onClick={handleEncrypt} disabled={isEncrypting}>
      {isEncrypting ? 'Encrypting...' : 'Encrypt Value'}
    </button>
  );
}
```

### `useDecrypt()`

Hook to decrypt ciphertexts.

**Returns:**
- `decrypt` (function): User decryption function (requires signature)
- `publicDecrypt` (function): Public decryption function (no signature)
- `isDecrypting` (boolean): Whether decrypting
- `error` (Error | null): Decryption error
- `result` (DecryptedValue | null): Last decrypted value

**Example:**
```typescript
import { useDecrypt } from '@fhevm/sdk/react';
import { useSignTypedData } from 'wagmi';

function DecryptResult() {
  const { decrypt, publicDecrypt, isDecrypting } = useDecrypt();
  const { signTypedDataAsync } = useSignTypedData();

  const handleDecrypt = async (ciphertext: string) => {
    // Get EIP-712 signature
    const signature = await signTypedDataAsync({
      domain: {
        name: 'FHEVM',
        version: '1',
        chainId: 11155111,
        verifyingContract: contractAddress,
      },
      types: {
        Decrypt: [
          { name: 'ciphertext', type: 'string' },
          { name: 'contractAddress', type: 'address' },
        ],
      },
      message: {
        ciphertext,
        contractAddress,
      },
    });

    // Decrypt with signature
    const decrypted = await decrypt(
      {
        ciphertext,
        type: 'euint32',
        contractAddress,
      },
      signature
    );

    console.log('Decrypted:', decrypted.value);
  };

  const handlePublicDecrypt = async (ciphertext: string) => {
    const decrypted = await publicDecrypt(ciphertext, 'euint32');
    console.log('Decrypted:', decrypted.value);
  };

  return (
    <div>
      <button onClick={() => handleDecrypt('0x...')} disabled={isDecrypting}>
        User Decrypt
      </button>
      <button onClick={() => handlePublicDecrypt('0x...')} disabled={isDecrypting}>
        Public Decrypt
      </button>
    </div>
  );
}
```

---

## TypeScript Types

### FheType

Supported FHE types:

```typescript
type FheType =
  | 'euint8'      // 0-255
  | 'euint16'     // 0-65535
  | 'euint32'     // 0-4294967295
  | 'euint64'     // 0-18446744073709551615n
  | 'euint128'    // 128-bit unsigned integer
  | 'euint256'    // 256-bit unsigned integer
  | 'ebool'       // Encrypted boolean
  | 'eaddress';   // Encrypted Ethereum address
```

### FhevmConfig

```typescript
interface FhevmConfig {
  network: 'sepolia' | 'mainnet' | 'localhost';
  gatewayUrl: string;
  aclAddress?: string;
  kmsVerifierAddress?: string;
  chainId?: number;
  debug?: boolean;
}
```

### EncryptedValue

```typescript
interface EncryptedValue {
  ciphertext: string;
  type: FheType;
}
```

### DecryptedValue

```typescript
interface DecryptedValue {
  value: bigint | boolean | string;
  type: FheType;
}
```

### DecryptionRequest

```typescript
interface DecryptionRequest {
  ciphertext: string;
  type: FheType;
  contractAddress: string;
}
```

---

## Integration Guide

### With Next.js

```typescript
// app/providers.tsx
'use client';

import { FhevmProvider } from '@fhevm/sdk/react';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <FhevmProvider
      config={{
        network: 'sepolia',
        gatewayUrl: 'https://gateway.zama.ai',
      }}
    >
      {children}
    </FhevmProvider>
  );
}

// app/layout.tsx
import { Providers } from './providers';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

### With React

```typescript
// main.tsx
import { FhevmProvider } from '@fhevm/sdk/react';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <FhevmProvider
    config={{
      network: 'sepolia',
      gatewayUrl: 'https://gateway.zama.ai',
    }}
  >
    <App />
  </FhevmProvider>
);
```

### With Vue 3

```vue
<script setup>
import { ref, onMounted } from 'vue';
import { initFhevm } from '@fhevm/sdk/core';

const fhevm = ref(null);
const isInitialized = ref(false);

onMounted(async () => {
  fhevm.value = await initFhevm({
    network: 'sepolia',
    gatewayUrl: 'https://gateway.zama.ai',
  });
  isInitialized.value = fhevm.value.isInitialized;
});

async function encryptValue(value, type) {
  return await fhevm.value.encrypt(value, type);
}
</script>

<template>
  <div v-if="isInitialized">
    <button @click="encryptValue(42, 'euint8')">Encrypt</button>
  </div>
</template>
```

### With Node.js

```typescript
import { initFhevm } from '@fhevm/sdk/core';

async function main() {
  const fhevm = await initFhevm({
    network: 'sepolia',
    gatewayUrl: 'https://gateway.zama.ai',
  });

  const encrypted = await fhevm.encrypt(1234, 'euint32');
  console.log('Encrypted:', encrypted.ciphertext);
}

main().catch(console.error);
```

---

## Best Practices

### 1. Initialize Once

Initialize the SDK once at the application root:

```typescript
// ✅ Good
<FhevmProvider config={...}>
  <App />
</FhevmProvider>

// ❌ Bad - multiple providers
<FhevmProvider config={...}>
  <FhevmProvider config={...}>
    <App />
  </FhevmProvider>
</FhevmProvider>
```

### 2. Handle Errors

Always handle encryption/decryption errors:

```typescript
try {
  const encrypted = await encrypt(value, type);
} catch (error) {
  if (error.code === 'USER_REJECTED') {
    // User rejected signature
  } else if (error.code === 'ENCRYPTION_FAILED') {
    // Encryption failed
  } else {
    // Other error
  }
}
```

### 3. Use Loading States

Show loading indicators during async operations:

```typescript
const { encrypt, isEncrypting } = useEncrypt();

<button onClick={handleEncrypt} disabled={isEncrypting}>
  {isEncrypting ? 'Encrypting...' : 'Encrypt'}
</button>
```

### 4. Validate Inputs

Validate values before encryption:

```typescript
function validateEuint8(value: number): boolean {
  return value >= 0 && value <= 255;
}

if (!validateEuint8(value)) {
  throw new Error('Value out of range for euint8');
}
```

### 5. Cache Encrypted Values

Avoid re-encrypting the same values:

```typescript
const [encryptedCache, setEncryptedCache] = useState<Map<string, EncryptedValue>>(new Map());

async function getEncrypted(value: number, type: FheType) {
  const key = `${value}-${type}`;
  if (encryptedCache.has(key)) {
    return encryptedCache.get(key)!;
  }

  const encrypted = await encrypt(value, type);
  setEncryptedCache(new Map(encryptedCache.set(key, encrypted)));
  return encrypted;
}
```

---

## Troubleshooting

### SDK Not Initializing

**Problem:** `useFhevm()` returns `isInitialized: false`

**Solutions:**
1. Check Gateway URL is correct
2. Verify network connectivity
3. Enable debug mode: `debug: true`
4. Check browser console for errors

### Encryption Fails

**Problem:** `encrypt()` throws an error

**Solutions:**
1. Check value is within valid range for type
2. Verify SDK is initialized
3. Check wallet is connected (if required)
4. Verify Gateway is accessible

### Decryption Fails

**Problem:** `decrypt()` throws an error

**Solutions:**
1. Verify signature is valid (EIP-712)
2. Check contract address is correct
3. Ensure user has permission to decrypt
4. Verify ciphertext format

### Type Errors

**Problem:** TypeScript compilation errors

**Solutions:**
1. Install `@types/react` if using React
2. Ensure `@fhevm/sdk` types are imported
3. Check TypeScript version >= 5.0
4. Verify `tsconfig.json` settings

---

## Additional Resources

- [Setup Guide](./SETUP_GUIDE.md)
- [Demo Application](./DEMO_APPLICATION.md)
- [Bounty Submission](./BOUNTY_SUBMISSION.md)
- [Examples](./examples/README.md)
- [Zama Documentation](https://docs.zama.ai/fhevm)

---

## Support

- **GitHub Issues**: [Report bugs](https://github.com/SchuylerPouros/fhevm-react-template/issues)
- **Demo Application**: [Live example](https://private-rental-matching.vercel.app/)
- **Video Tutorial**: [See VIDEO_SCRIPT.md](./VIDEO_SCRIPT.md)

---

**Built with ❤️ for privacy-preserving Web3**
