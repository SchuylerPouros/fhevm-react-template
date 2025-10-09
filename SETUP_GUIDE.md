# 📖 Complete Setup Guide

This guide will walk you through setting up the FHEVM React Template from scratch.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Compile Smart Contracts](#compile-smart-contracts)
5. [Deploy Contracts](#deploy-contracts)
6. [Run Frontend Templates](#run-frontend-templates)
7. [Using the SDK](#using-the-sdk)
8. [Troubleshooting](#troubleshooting)

---

## 1️⃣ Prerequisites

Before you begin, ensure you have the following installed:

### Required Software
- **Node.js**: Version 18.0.0 or higher
  ```bash
  node --version  # Should be >= 18.0.0
  ```
- **npm** or **yarn**: Latest version
  ```bash
  npm --version
  ```
- **Git**: For cloning the repository
  ```bash
  git --version
  ```

### Web3 Requirements
- **MetaMask**: Browser extension installed
- **Sepolia ETH**: Get free testnet ETH from:
  - [Sepolia Faucet 1](https://sepoliafaucet.com/)
  - [Sepolia Faucet 2](https://www.alchemy.com/faucets/ethereum-sepolia)
- **WalletConnect Project ID** (Optional): Get from [WalletConnect Cloud](https://cloud.walletconnect.com/)

---

## 2️⃣ Installation

### Clone the Repository

```bash
# HTTPS
git clone https://github.com/SchuylerPouros/fhevm-react-template.git

# SSH (if you have SSH keys set up)
git clone git@github.com:SchuylerPouros/fhevm-react-template.git

# Navigate into directory
cd fhevm-react-template
```

### Install Dependencies

```bash
# Install all packages from root
npm install

# This will install:
# - Root dependencies
# - FHEVM SDK package
# - All example templates
# - Development tools
```

**Wait Time**: ~2-5 minutes depending on your internet speed.

---

## 3️⃣ Configuration

### Create Environment Files

```bash
# Copy the example environment file
cp .env.example .env
```

### Edit `.env` File

Open `.env` in your text editor and configure:

```env
# Network Configuration
NEXT_PUBLIC_CHAIN_ID=11155111  # Sepolia testnet

# RPC URLs (get free ones from Alchemy or Infura)
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY
NEXT_PUBLIC_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY

# Your wallet private key (for deployment only - NEVER share!)
PRIVATE_KEY=your_private_key_here

# Gateway Configuration (Zama's Gateway)
GATEWAY_CONTRACT_ADDRESS=0x33347831500F1e73f102B0d440e6AcF701F577ac
NEXT_PUBLIC_GATEWAY_URL=https://gateway.zama.ai

# WalletConnect (optional but recommended)
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here

# Contract Address (will be filled after deployment)
NEXT_PUBLIC_CONTRACT_ADDRESS=

# Gateway Pausers (for advanced setup)
NUM_PAUSERS=4
PAUSER_ADDRESS_0=0x...
PAUSER_ADDRESS_1=0x...
PAUSER_ADDRESS_2=0x...
PAUSER_ADDRESS_3=0x...
```

### Get API Keys

#### Alchemy RPC (Recommended)
1. Go to [Alchemy](https://www.alchemy.com/)
2. Sign up for free account
3. Create a new app for Sepolia
4. Copy the API key URL

#### Infura RPC (Alternative)
1. Go to [Infura](https://infura.io/)
2. Sign up for free account
3. Create a new project
4. Select Sepolia endpoint
5. Copy the URL

#### WalletConnect Project ID
1. Go to [WalletConnect Cloud](https://cloud.walletconnect.com/)
2. Sign up for free account
3. Create a new project
4. Copy the Project ID

---

## 4️⃣ Compile Smart Contracts

### Compile Contracts

```bash
npm run compile
```

**Expected Output**:
```
Compiled 1 Solidity file successfully
✓ Compilation complete
```

### Verify Compilation

Check that artifacts were generated:
```bash
ls -la artifacts/contracts/
```

You should see:
```
PrivateRentalMatching.sol/
└── PrivateRentalMatching.json  # ABI and bytecode
```

---

## 5️⃣ Deploy Contracts

### Prerequisites for Deployment
- ✅ `.env` configured with PRIVATE_KEY
- ✅ Sepolia ETH in your wallet (at least 0.1 ETH)
- ✅ SEPOLIA_RPC_URL configured

### Deploy to Sepolia

```bash
npm run deploy
```

**Expected Output**:
```
Deploying PrivateRentalMatching to Sepolia...
Contract deployed to: 0x980051585b6DC385159BD53B5C78eb7B91b848E5
Transaction hash: 0x...
✓ Deployment complete
```

### Update `.env` with Contract Address

After deployment, add the contract address to `.env`:
```env
NEXT_PUBLIC_CONTRACT_ADDRESS=0x980051585b6DC385159BD53B5C78eb7B91b848E5
```

### Verify Contract on Etherscan

```bash
npm run verify
```

Or manually visit:
`https://sepolia.etherscan.io/address/YOUR_CONTRACT_ADDRESS`

---

## 6️⃣ Run Frontend Templates

### Start Next.js Template (Recommended)

```bash
npm run dev:nextjs
```

**Expected Output**:
```
> next dev

  ▲ Next.js 14.2.33
  - Local:        http://localhost:3000
  - Network:      http://192.168.1.x:3000

✓ Ready in 2.3s
```

Visit: `http://localhost:3000`

### Start React Template

```bash
npm run dev:react
```

Visit: `http://localhost:3001`

### Start Vue Template

```bash
npm run dev:vue
```

Visit: `http://localhost:3002`

---

## 7️⃣ Using the SDK

### In Your Own Project

#### Install the SDK

```bash
# From npm (when published)
npm install @fhevm/sdk @fhevm/react

# Or link locally for development
npm link ../fhevm-react-template/packages/fhevm-sdk
```

#### Basic Integration

```typescript
// 1. Initialize SDK (vanilla JS)
import { initFhevm, encryptInput, decryptValue } from '@fhevm/core';

const fhevm = await initFhevm({
  network: 'sepolia',
  gatewayUrl: 'https://gateway.zama.ai',
});

// 2. Encrypt a value
const encrypted = await encryptInput(1234, 'euint32');

// 3. Use in smart contract
const tx = await contract.submitEncrypted(encrypted);
await tx.wait();

// 4. Decrypt result
const decrypted = await decryptValue(ciphertext, 'euint32');
```

#### React Integration

```typescript
// 1. Wrap app with provider
import { FhevmProvider } from '@fhevm/react';

function App() {
  return (
    <FhevmProvider config={{ network: 'sepolia' }}>
      <YourApp />
    </FhevmProvider>
  );
}

// 2. Use hooks in components
import { useFhevm, useEncrypt, useDecrypt } from '@fhevm/react';

function MyComponent() {
  const { isInitialized } = useFhevm();
  const { encrypt, isEncrypting } = useEncrypt();
  const { decrypt, decryptedValue, isDecrypting } = useDecrypt();

  const handleSubmit = async (value: number) => {
    const encrypted = await encrypt(value, 'euint32');
    // Use encrypted value in transaction
  };

  return (
    <div>
      <button onClick={() => handleSubmit(1234)} disabled={isEncrypting}>
        {isEncrypting ? 'Encrypting...' : 'Submit'}
      </button>
    </div>
  );
}
```

---

## 8️⃣ Troubleshooting

### Common Issues

#### Issue: `npm install` fails

**Solution**:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

#### Issue: Contract deployment fails

**Possible Causes**:
1. Insufficient Sepolia ETH
   - Get more from faucet
2. Wrong PRIVATE_KEY format
   - Should not include `0x` prefix in some cases
   - Make sure it's 64 characters (32 bytes)
3. RPC URL not working
   - Try a different RPC provider

**Solution**:
```bash
# Check your balance
npm run check-balance

# Test RPC connection
curl YOUR_RPC_URL \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{"method":"eth_blockNumber","params":[],"id":1,"jsonrpc":"2.0"}'
```

#### Issue: Frontend won't start

**Solution**:
```bash
# Check if port is already in use
lsof -i :3000  # Mac/Linux
netstat -ano | findstr :3000  # Windows

# Kill the process or use different port
PORT=3001 npm run dev:nextjs
```

#### Issue: MetaMask not connecting

**Solutions**:
1. Make sure MetaMask is installed
2. Switch to Sepolia network in MetaMask
3. Clear browser cache
4. Restart browser

#### Issue: Encryption/Decryption fails

**Check**:
1. Is FHEVM SDK initialized?
2. Is wallet connected?
3. Are you on Sepolia network?
4. Is Gateway URL correct?

**Debug**:
```typescript
// Enable debug logging
const fhevm = await initFhevm({
  network: 'sepolia',
  debug: true,  // Add this
});
```

#### Issue: Build fails

**Common Causes**:
1. TypeScript errors - check `npm run type-check`
2. Missing environment variables
3. Outdated dependencies

**Solution**:
```bash
# Update all dependencies
npm update

# Check for TypeScript errors
npm run type-check

# Clean build
npm run clean
npm run build
```

---

## 🎯 Next Steps

After completing setup:

1. ✅ Explore the Next.js demo at `http://localhost:3000`
2. ✅ Try encrypting and decrypting values
3. ✅ Create a test listing and request
4. ✅ Review the SDK documentation
5. ✅ Start building your own FHE-enabled dApp!

---

## 📚 Additional Resources

- **Documentation**: See [SDK_DOCUMENTATION.md](./SDK_DOCUMENTATION.md) for full API reference
- **Examples**: Check `examples/` directory for code samples
- **Tests**: Run `npm test` to see test examples
- **Zama Docs**: [https://docs.zama.ai/fhevm](https://docs.zama.ai/fhevm)

---

## 🆘 Getting Help

If you're still stuck:
1. Check [existing issues](https://github.com/SchuylerPouros/fhevm-react-template/issues)
2. Open a new issue with:
   - Your error message
   - Steps to reproduce
   - Your environment (OS, Node version, etc.)
3. Join Zama's community Discord

---

**Happy building! 🚀**
