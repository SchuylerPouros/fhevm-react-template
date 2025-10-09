# FHEVM SDK Examples

This directory contains example implementations demonstrating the FHEVM SDK in action.

## Primary Example: Private Rental Matching

The main demonstration of the FHEVM SDK is the **Private Rental Matching** dApp, which showcases all SDK features in a production environment.

### Live Deployments

- **Vercel**: [https://private-rental-matching.vercel.app/](https://private-rental-matching.vercel.app/)
- **GitHub Pages**: [https://schuylerpouros.github.io/private-rental-matching/](https://schuylerpouros.github.io/private-rental-matching/)
- **Source Code**: [https://github.com/SchuylerPouros/private-rental-matching](https://github.com/SchuylerPouros/private-rental-matching)

### What It Demonstrates

1. **Encryption**: Input encryption for property listings and rental requests
2. **Batch Operations**: Encrypting multiple fields at once
3. **User Decryption**: EIP-712 signature-based decryption after match confirmation
4. **Public Decryption**: Decrypting public statistics without signatures
5. **React Hooks**: `useFhevm()`, `useEncrypt()`, `useDecrypt()`
6. **Error Handling**: Graceful error states and loading indicators
7. **TypeScript Integration**: Full type safety throughout
8. **Wagmi Compatibility**: Seamless integration with wagmi v2

### SDK Features Used

```typescript
// Provider setup
import { FhevmProvider } from '@fhevm/sdk/react';

<FhevmProvider config={{ network: 'sepolia', gatewayUrl: 'https://gateway.zama.ai' }}>
  <App />
</FhevmProvider>

// Encryption hook
const { encrypt, isEncrypting } = useEncrypt();
const encrypted = await encrypt(1234, 'euint32');

// Decryption hook
const { decrypt, isDecrypting } = useDecrypt();
const decrypted = await decrypt({ ciphertext, type, contractAddress }, signature);
```

### Tech Stack

- **Frontend**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom gradient themes
- **Web3**: wagmi v2, viem, RainbowKit
- **FHE**: Zama fhEVM with @fhevm/sdk
- **Smart Contracts**: Solidity with Hardhat
- **Deployment**: Vercel (serverless) + GitHub Pages (static)

### Contract Details

- **Address**: `0x980051585b6DC385159BD53B5C78eb7B91b848E5`
- **Network**: Sepolia Testnet
- **Explorer**: [View on Etherscan](https://sepolia.etherscan.io/address/0x980051585b6DC385159BD53B5C78eb7B91b848E5)

## Running the Example Locally

Since the Private Rental Matching dApp is in a separate repository, you can:

### Option 1: Visit Live Demo

Simply go to [https://private-rental-matching.vercel.app/](https://private-rental-matching.vercel.app/)

### Option 2: Clone and Run Locally

```bash
# Clone the demo repository
git clone https://github.com/SchuylerPouros/private-rental-matching.git
cd private-rental-matching

# Install dependencies
npm install

# Start development server
npm run dev

# Visit http://localhost:3000
```

### Option 3: Build Your Own

Use the SDK in your own project:

```bash
# Install SDK
npm install @fhevm/sdk

# Follow the integration guide in ../packages/fhevm-sdk/README.md
```

## Additional Examples

### React Example

A minimal React 18 example:

```typescript
import { FhevmProvider, useFhevm, useEncrypt } from '@fhevm/sdk/react';

function App() {
  return (
    <FhevmProvider config={{ network: 'sepolia', gatewayUrl: 'https://gateway.zama.ai' }}>
      <EncryptButton />
    </FhevmProvider>
  );
}

function EncryptButton() {
  const { isInitialized } = useFhevm();
  const { encrypt, isEncrypting, result } = useEncrypt();

  if (!isInitialized) return <div>Initializing...</div>;

  return (
    <button onClick={() => encrypt(42, 'euint8')} disabled={isEncrypting}>
      {isEncrypting ? 'Encrypting...' : 'Encrypt 42'}
      {result && <div>Result: {result.ciphertext}</div>}
    </button>
  );
}
```

### Vue 3 Example

```vue
<script setup>
import { ref, onMounted } from 'vue';
import { initFhevm } from '@fhevm/sdk/core';

const fhevm = ref(null);
const encrypted = ref(null);
const isEncrypting = ref(false);

onMounted(async () => {
  fhevm.value = await initFhevm({
    network: 'sepolia',
    gatewayUrl: 'https://gateway.zama.ai',
  });
});

async function encryptValue() {
  isEncrypting.value = true;
  try {
    encrypted.value = await fhevm.value.encrypt(42, 'euint8');
  } finally {
    isEncrypting.value = false;
  }
}
</script>

<template>
  <button @click="encryptValue" :disabled="isEncrypting">
    {{ isEncrypting ? 'Encrypting...' : 'Encrypt 42' }}
  </button>
  <div v-if="encrypted">Result: {{ encrypted.ciphertext }}</div>
</template>
```

### Node.js Example

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

  // Decrypt (in a real scenario, you'd get signature from user)
  const decrypted = await fhevm.publicDecrypt(encrypted.ciphertext, 'euint32');
  console.log('Decrypted:', decrypted.value);
}

main().catch(console.error);
```

## Learn More

- [SDK Documentation](../packages/fhevm-sdk/README.md)
- [Setup Guide](../SETUP_GUIDE.md)
- [Demo Application Guide](../DEMO_APPLICATION.md)
- [Bounty Submission](../BOUNTY_SUBMISSION.md)

## Questions?

- Open an issue on [GitHub](https://github.com/SchuylerPouros/fhevm-react-template/issues)
- Check the [Demo Video](../VIDEO_SCRIPT.md)
- Review the [Private Rental Matching source code](https://github.com/SchuylerPouros/private-rental-matching)
