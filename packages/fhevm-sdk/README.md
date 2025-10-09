# @fhevm/sdk

Universal SDK for building privacy-preserving dApps with Fully Homomorphic Encryption (FHE).

## Features

- ✅ **Framework-Agnostic Core**: Use with React, Vue, Angular, or vanilla JS
- ✅ **Type-Safe**: Full TypeScript support
- ✅ **Wagmi-like API**: Familiar hook patterns for React developers
- ✅ **Modular**: Import only what you need
- ✅ **Zero Dependencies**: Core has no external dependencies

## Installation

```bash
npm install @fhevm/sdk
# or
yarn add @fhevm/sdk
# or
pnpm add @fhevm/sdk
```

## Quick Start

### Vanilla JavaScript / Node.js

```typescript
import { initFhevm } from '@fhevm/sdk/core';

// Initialize SDK
const fhevm = await initFhevm({
  network: 'sepolia',
  gatewayUrl: 'https://gateway.zama.ai',
});

// Encrypt a value
const encrypted = await fhevm.encrypt(1234, 'euint32');
console.log('Encrypted:', encrypted.ciphertext);

// Decrypt (requires signature)
const decrypted = await fhevm.userDecrypt(
  {
    ciphertext: encrypted.ciphertext,
    type: 'euint32',
    contractAddress: '0x...',
  },
  signature
);
console.log('Decrypted:', decrypted.value);
```

### React

```typescript
import { FhevmProvider, useFhevm, useEncrypt } from '@fhevm/sdk/react';

// 1. Wrap your app
function App() {
  return (
    <FhevmProvider config={{ network: 'sepolia', gatewayUrl: 'https://gateway.zama.ai' }}>
      <MyComponent />
    </FhevmProvider>
  );
}

// 2. Use hooks in components
function MyComponent() {
  const { isInitialized } = useFhevm();
  const { encrypt, isEncrypting, result } = useEncrypt();

  const handleEncrypt = async () => {
    const encrypted = await encrypt(1234, 'euint32');
    console.log('Encrypted:', encrypted);
  };

  if (!isInitialized) return <div>Initializing FHEVM...</div>;

  return (
    <button onClick={handleEncrypt} disabled={isEncrypting}>
      {isEncrypting ? 'Encrypting...' : 'Encrypt Value'}
    </button>
  );
}
```

## API Reference

### Core API

#### `initFhevm(config: FhevmConfig)`

Initialize the FHEVM SDK.

```typescript
const fhevm = await initFhevm({
  network: 'sepolia',
  gatewayUrl: 'https://gateway.zama.ai',
  debug: true, // optional
});
```

#### `encrypt(value, type)`

Encrypt a value.

```typescript
const encrypted = await fhevm.encrypt(1234, 'euint32');
```

#### `decrypt(request)`

Decrypt a ciphertext (requires signature).

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

### React Hooks

#### `useFhevm()`

Access FHEVM client and status.

```typescript
const { client, isInitialized, isInitializing, error } = useFhevm();
```

#### `useEncrypt()`

Encrypt values.

```typescript
const { encrypt, isEncrypting, error, result } = useEncrypt();

await encrypt(1234, 'euint32');
```

#### `useDecrypt()`

Decrypt ciphertexts.

```typescript
const { decrypt, publicDecrypt, isDecrypting, result } = useDecrypt();

// User decryption (requires signature)
await decrypt({ ciphertext, type, contractAddress }, signature);

// Public decryption (no signature)
await publicDecrypt(ciphertext, type);
```

## Supported FHE Types

- `euint8`: 8-bit unsigned integer (0-255)
- `euint16`: 16-bit unsigned integer (0-65535)
- `euint32`: 32-bit unsigned integer
- `euint64`: 64-bit unsigned integer
- `euint128`: 128-bit unsigned integer
- `euint256`: 256-bit unsigned integer
- `ebool`: Encrypted boolean
- `eaddress`: Encrypted Ethereum address

## Examples

See the `examples/` directory for complete implementations:

- [Next.js Demo](../examples/nextjs-demo) - Full-featured rental matching dApp
- [React Demo](../examples/react-demo) - Simple React integration
- [Vue Demo](../examples/vue-demo) - Vue 3 example

## Documentation

- [Setup Guide](../../SETUP_GUIDE.md)
- [API Documentation](../../SDK_DOCUMENTATION.md)
- [Demo Application](../../DEMO_APPLICATION.md)

## License

MIT
