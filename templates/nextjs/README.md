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
app/
├── layout.tsx              # Root layout
├── page.tsx                # Home page
├── providers.tsx           # FHEVM Provider
├── globals.css             # Global styles
└── api/                    # API routes
    ├── fhe/
    │   ├── encrypt/        # Encryption endpoint
    │   ├── decrypt/        # Decryption endpoint
    │   └── compute/        # Computation endpoint
    └── keys/               # Key management

components/
├── ui/                     # UI components
├── fhe/                    # FHE components
└── examples/               # Example components

lib/
├── fhe/                    # FHE utilities
└── utils/                  # Helper functions

hooks/                      # Custom React hooks
types/                      # Type definitions
```

## Integration Guide

See the main [README.md](../../README.md) for complete integration instructions.

## Documentation

- [SDK Documentation](../../SDK_DOCUMENTATION.md)
- [Setup Guide](../../SETUP_GUIDE.md)
- [Bounty Submission](../../BOUNTY_SUBMISSION.md)
