# Next.js FHEVM Template

This is a reference to the Next.js 14 template demonstrating FHEVM SDK integration.

## Location

The complete Next.js template is available at:
```
../../examples/nextjs-demo/
```

## Features

- Next.js 14 with App Router
- Full FHEVM SDK integration
- React hooks for encryption/decryption
- API routes for server-side operations
- TypeScript support
- Tailwind CSS styling
- Reusable components
- Custom hooks
- Type-safe development

## Quick Start

```bash
# Navigate to the template
cd ../../examples/nextjs-demo

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` to see the template in action.

## Template Contents

### Directory Structure
```
src/
├── app/                        # App Router (Next.js 14)
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home page
│   ├── providers.tsx           # FHEVM Provider
│   └── api/                    # API routes
│       ├── fhe/
│       │   ├── route.ts        # FHE operations route
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
│   │   ├── FHEProvider.tsx
│   │   ├── EncryptionDemo.tsx
│   │   ├── ComputationDemo.tsx
│   │   └── KeyManager.tsx
│   └── examples/               # Use case examples
│       ├── BankingExample.tsx
│       └── MedicalExample.tsx
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

## Integration Guide

See the main [README.md](../../README.md) for complete integration instructions.

## Documentation

- [SDK Documentation](../../SDK_DOCUMENTATION.md)
- [Setup Guide](../../SETUP_GUIDE.md)
- [Bounty Submission](../../BOUNTY_SUBMISSION.md)
