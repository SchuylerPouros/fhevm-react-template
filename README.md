# 🔐 FHEVM React Template - Universal SDK for Fully Homomorphic Encryption

> **Universal FHEVM SDK for building privacy-preserving dApps**

A comprehensive, production-ready SDK and template collection for integrating Zama's fhEVM into your decentralized applications. Built for the **Zama Bounty Program**.

---

## 🎯 What is This?

This repository contains:
1. **Universal FHEVM SDK** (`packages/fhevm-sdk`): A reusable, framework-agnostic SDK for FHE encryption/decryption
2. **Example Templates**: Next.js, React, and Vue demonstrations
3. **Smart Contracts**: Example FHE-enabled contracts
4. **Complete Documentation**: Everything you need to get started

---

## 🚀 Quick Start

### Prerequisites
- Node.js >= 18.0.0
- npm or yarn
- MetaMask wallet
- Sepolia testnet ETH

### Installation

```bash
# Clone the repository
git clone https://github.com/SchuylerPouros/fhevm-react-template.git
cd fhevm-react-template

# Install all packages from root
npm install
```

### Compile & Deploy Contracts

```bash
# Compile Solidity contracts
npm run compile

# Deploy to Sepolia testnet
npm run deploy

# ABI is automatically generated in artifacts/
```

### Launch Frontend Template

```bash
# Start Next.js template (recommended)
npm run dev:nextjs

# Or React template
npm run dev:react

# Or Vue template
npm run dev:vue
```

Visit `http://localhost:3000` to see the app running!

---

## 📁 Project Structure

```
fhevm-react-template/
├── packages/
│   └── fhevm-sdk/              # 🎯 Universal SDK Package
│       ├── src/
│       │   ├── core/           # Framework-agnostic core
│       │   │   ├── client.ts   # Main SDK client
│       │   │   ├── encryption.ts
│       │   │   └── decryption.ts
│       │   ├── react/          # React hooks & adapters
│       │   │   ├── hooks/
│       │   │   │   ├── useFhevm.ts
│       │   │   │   ├── useEncrypt.ts
│       │   │   │   └── useDecrypt.ts
│       │   │   ├── components/
│       │   │   └── provider.tsx
│       │   └── types/          # TypeScript definitions
│       ├── package.json
│       └── README.md
│
├── examples/
│   ├── nextjs-demo/            # Next.js 14 demonstration
│   │   ├── app/
│   │   ├── components/
│   │   └── public/
│   ├── react-demo/             # React 18 demonstration
│   └── vue-demo/               # Vue 3 demonstration
│
├── contracts/                  # Example FHE contracts
│   ├── PrivateRentalMatching.sol
│   └── interfaces/
│
├── scripts/                    # Deployment scripts
│   ├── deploy.ts
│   └── interact.ts
│
├── test/                       # Contract tests
│   └── PrivateRentalMatching.test.ts
│
├── hardhat.config.ts           # Hardhat configuration
├── package.json                # Root package.json
├── README.md                   # This file
├── BOUNTY_SUBMISSION.md        # Bounty submission details
└── SETUP_GUIDE.md              # Detailed setup guide
```

---

## 🌟 Key Features

### Universal SDK Package
- ✅ **Framework-Agnostic Core**: Use with React, Vue, Angular, or vanilla JS
- ✅ **Type-Safe**: Full TypeScript support with comprehensive types
- ✅ **Modular API**: Import only what you need
- ✅ **Wagmi-like Design**: Familiar hook patterns for React developers
- ✅ **Zero Dependencies**: Core has no external dependencies

### Encryption & Decryption
- ✅ **Easy Encryption**: Simple `encryptInput()` helper
- ✅ **Batch Operations**: Encrypt multiple values at once
- ✅ **User Decryption**: EIP-712 signature-based decryption
- ✅ **Public Decryption**: No-signature decryption for public data
- ✅ **Automatic Verification**: Built-in ciphertext validation

### Developer Experience
- ✅ **React Hooks**: `useFhevm()`, `useEncrypt()`, `useDecrypt()`
- ✅ **Ready Components**: Copy-paste encryption/decryption components
- ✅ **Error Handling**: Graceful error messages and retry logic
- ✅ **Loading States**: Built-in loading indicators
- ✅ **IntelliSense**: Full autocomplete support

### Production Ready
- ✅ **Tested**: Comprehensive test suite
- ✅ **Documented**: JSDoc comments on all public APIs
- ✅ **Deployed**: Live demo on Vercel and GitHub Pages
- ✅ **Optimized**: Tree-shakeable for minimal bundle size

---

## 💻 Usage Examples

### Basic SDK Usage (Vanilla JS)

```typescript
import { initFhevm, encryptInput } from '@fhevm/core';

// Initialize SDK
const fhevm = await initFhevm({
  network: 'sepolia',
  gatewayUrl: 'https://gateway.zama.ai',
});

// Encrypt a value
const encrypted = await encryptInput(1234, 'euint32');
console.log(encrypted); // Returns encrypted ciphertext
```

### React Hooks

```typescript
import { useFhevm, useEncrypt, useDecrypt } from '@fhevm/react';

function MyComponent() {
  const { isInitialized } = useFhevm();
  const { encrypt, isEncrypting } = useEncrypt();
  const { decrypt, decryptedValue } = useDecrypt();

  const handleEncrypt = async () => {
    const result = await encrypt(1234, 'euint32');
    console.log('Encrypted:', result);
  };

  const handleDecrypt = async (ciphertext) => {
    const result = await decrypt(ciphertext, 'euint32');
    console.log('Decrypted:', result);
  };

  return (
    <div>
      <button onClick={handleEncrypt} disabled={isEncrypting}>
        {isEncrypting ? 'Encrypting...' : 'Encrypt Value'}
      </button>
      <button onClick={() => handleDecrypt('0x...')}>
        Decrypt Value
      </button>
      {decryptedValue && <p>Result: {decryptedValue}</p>}
    </div>
  );
}
```

### With React Provider

```typescript
import { FhevmProvider } from '@fhevm/react';

function App() {
  return (
    <FhevmProvider
      config={{
        network: 'sepolia',
        gatewayUrl: 'https://gateway.zama.ai',
      }}
    >
      <MyComponent />
    </FhevmProvider>
  );
}
```

---

## 🎓 Example Templates

### 1. Next.js Template (Primary)
**Live Demo**: [https://private-rental-matching.vercel.app/](https://private-rental-matching.vercel.app/)

A full-featured **Anonymous Rental Matching Platform** demonstrating:
- Privacy-preserving property listings
- Encrypted matching algorithm
- User and public decryption flows
- EIP-712 signature integration
- Production deployment

**Use Case**: Landlords and tenants match without revealing sensitive information (prices, locations) until both parties confirm.

### 2. React Template
Simple React 18 app showing basic SDK integration.

### 3. Vue Template
Vue 3 Composition API example with the SDK.

---

## 📚 Documentation

- **[BOUNTY_SUBMISSION.md](./BOUNTY_SUBMISSION.md)**: Complete bounty requirements checklist
- **[SETUP_GUIDE.md](./SETUP_GUIDE.md)**: Detailed installation and configuration
- **[SDK_DOCUMENTATION.md](./SDK_DOCUMENTATION.md)**: Full API reference
- **[packages/fhevm-sdk/README.md](./packages/fhevm-sdk/README.md)**: SDK-specific docs

---

## 🔗 Links

| Resource | URL |
|----------|-----|
| **Live Demo** | https://private-rental-matching.vercel.app/ |
| **GitHub Repository** | https://github.com/SchuylerPouros/fhevm-react-template |
| **Demo Video** | [demo1.mp4 demo2.mp4 demo3.mp4] |
| **Contract Address** | `0x980051585b6DC385159BD53B5C78eb7B91b848E5` |
| **Sepolia Explorer** | https://sepolia.etherscan.io/address/0x980051585b6DC385159BD53B5C78eb7B91b848E5 |

---

## 🧪 Testing

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

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Web3**: wagmi, viem, RainbowKit
- **FHE**: Zama fhEVM SDK
- **Smart Contracts**: Solidity, Hardhat
- **Deployment**: Vercel, GitHub Pages

---

## 🏆 Zama Bounty Program

This project is submitted for the **Zama FHEVM SDK Bounty**.

### Requirements Met:
- ✅ Universal SDK package importable into any dApp
- ✅ Initialization, encryption, and decryption utilities
- ✅ EIP-712 signature support for userDecrypt
- ✅ Wagmi-like modular API structure
- ✅ Reusable components for common scenarios
- ✅ Clean, well-documented, and extensible code
- ✅ Complete setup from root directory
- ✅ Example templates with Next.js
- ✅ Video demonstration
- ✅ Deployment links in README

See [BOUNTY_SUBMISSION.md](./BOUNTY_SUBMISSION.md) for detailed checklist.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

MIT License - see [LICENSE](./LICENSE) for details.

---

## 🙏 Acknowledgments

- **Zama** for creating fhEVM and hosting this bounty
- **wagmi** and **RainbowKit** for API design inspiration
- **Next.js** team for the excellent framework
- **Community** for feedback and support

---

## 📞 Support

For questions and support:
- Open an issue on [GitHub](https://github.com/SchuylerPouros/fhevm-react-template/issues)
- Check the [documentation](./SETUP_GUIDE.md)
- Watch the [demo video]

---

**Built with ❤️ for privacy-preserving Web3**
