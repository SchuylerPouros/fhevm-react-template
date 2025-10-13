# FHEVM SDK - Next.js 14 Example

Complete Next.js 14 demonstration of the Universal FHEVM SDK.

## Features

- ✅ Next.js 14 App Router
- ✅ FHEVM SDK Integration
- ✅ Encryption/Decryption Examples
- ✅ TypeScript Support
- ✅ Tailwind CSS Styling
- ✅ React Hooks (`useFhevm`, `useEncrypt`, `useDecrypt`)

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Visit http://localhost:3000
```

## Project Structure

```
nextjs-demo/
├── app/
│   ├── page.tsx          # Main demo page
│   ├── layout.tsx        # Root layout
│   ├── providers.tsx     # FHEVM Provider setup
│   └── globals.css       # Global styles
├── package.json
├── next.config.js
├── tsconfig.json
└── README.md
```

## Usage

### 1. Initialize SDK

The SDK is initialized in `app/providers.tsx`:

```typescript
import { FhevmProvider } from '@fhevm/sdk/react';

export function Providers({ children }: { children: ReactNode }) {
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
```

### 2. Use Hooks in Components

In `app/page.tsx`:

```typescript
import { useFhevm, useEncrypt, useDecrypt } from '@fhevm/sdk/react';

export default function Home() {
  const { isInitialized } = useFhevm();
  const { encrypt, isEncrypting } = useEncrypt();
  const { publicDecrypt, isDecrypting } = useDecrypt();

  const handleEncrypt = async () => {
    const encrypted = await encrypt(42, 'euint8');
    console.log(encrypted.ciphertext);
  };

  return <button onClick={handleEncrypt}>Encrypt</button>;
}
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Learn More

- [FHEVM SDK Documentation](../../packages/fhevm-sdk/README.md)
- [Next.js Documentation](https://nextjs.org/docs)
- [Zama fhEVM Guide](https://docs.zama.ai/fhevm)

## Full Demo Application

For a more complete example, see the Private Rental Matching Platform:
- Live: https://private-rental-matching.vercel.app/
- Source: https://github.com/SchuylerPouros/private-rental-matching
