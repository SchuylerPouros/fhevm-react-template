# 🎬 Demo Application - Anonymous Rental Matching

This document explains the demo application included with this FHEVM SDK submission.

---

## 📍 Demo Location

The complete demo application is located at:
```
D:\zamadapp\dapp122\private-rental-matching
```

This serves as the **primary example** of the FHEVM SDK in action.

---

## 🌐 Live Deployments

The demo is deployed and accessible at:

- **Vercel**: [https://private-rental-matching.vercel.app/](https://private-rental-matching.vercel.app/)
- **GitHub Pages**: [https://schuylerpouros.github.io/private-rental-matching/](https://schuylerpouros.github.io/private-rental-matching/)

---

## 🎯 What It Demonstrates

### Anonymous Rental Matching Platform

**Core Concept**: Privacy-Preserving Tenant-Landlord Matching with Full Identity Protection

The demo showcases a real-world use case where:

1. **Landlords** create property listings with encrypted data:
   - Monthly rent (encrypted as `euint32`)
   - Number of bedrooms (encrypted as `euint8`)
   - Postal code (encrypted as `euint32`)
   - Property type (encrypted as `euint8`)

2. **Tenants** create requests with encrypted requirements:
   - Maximum budget (encrypted as `euint32`)
   - Minimum bedrooms (encrypted as `euint8`)
   - Preferred location (encrypted as `euint32`)
   - Preferred property type (encrypted as `euint8`)

3. **Smart Contract** matches listings with requests entirely on encrypted data
   - No decryption until both parties confirm
   - Full privacy preservation throughout the process

---

## 🔧 SDK Features Demonstrated

### 1. Input Encryption
```typescript
// From app/components/CreateListing.tsx
const { data: encrypted } = useWriteContract({
  // Encrypts rent, bedrooms, postal code, property type
  functionName: 'createListing',
  args: [encryptedRent, encryptedBedrooms, encryptedPostal, encryptedType],
});
```

### 2. User Decryption with EIP-712
```typescript
// Decrypt match details after confirmation
const decryptedData = await userDecrypt(ciphertext);
// User signs EIP-712 message to authorize decryption
```

### 3. Public Decryption
```typescript
// Public data accessible without signature
const publicData = await publicDecrypt(ciphertext);
```

### 4. Batch Operations
```typescript
// Encrypt multiple fields at once
const listing = await encryptBatch({
  rent: { value: 1500, type: 'euint32' },
  bedrooms: { value: 2, type: 'euint8' },
  postal: { value: 10001, type: 'euint32' },
});
```

### 5. React Hooks Integration
```typescript
import { useFhevm, useEncrypt, useDecrypt } from '@fhevm/react';

// In components
const { isInitialized } = useFhevm();
const { encrypt, isEncrypting } = useEncrypt();
const { decrypt, decryptedValue } = useDecrypt();
```

### 6. Wagmi Integration
```typescript
import { useAccount, useWriteContract } from 'wagmi';

// Seamless integration with existing wagmi hooks
const { address } = useAccount();
const { writeContract } = useWriteContract();
```

### 7. Error Handling
```typescript
try {
  const result = await encrypt(value, 'euint32');
} catch (error) {
  if (error.code === 'USER_REJECTED') {
    // Handle user rejection
  } else if (error.code === 'ENCRYPTION_FAILED') {
    // Handle encryption failure
  }
}
```

### 8. Loading States
```typescript
{isEncrypting && <div>Encrypting your data...</div>}
{isDecrypting && <div>Decrypting results...</div>}
{!isInitialized && <div>Initializing FHEVM...</div>}
```

---

## 🗂️ Demo Application Structure

```
private-rental-matching/
├── app/                              # Next.js 14 App Router
│   ├── components/                   # React Components
│   │   ├── CreateListing.tsx         # Uses useEncrypt hook
│   │   ├── CreateRequest.tsx         # Batch encryption example
│   │   ├── MatchMaker.tsx            # User decryption with EIP-712
│   │   ├── Statistics.tsx            # Public decryption
│   │   └── UserActivity.tsx          # Contract integration
│   ├── config/
│   │   └── contract.ts               # Contract ABI and address
│   ├── providers.tsx                 # FhevmProvider + wagmi setup
│   ├── layout.tsx                    # App layout with providers
│   └── page.tsx                      # Main application page
│
├── contracts/                        # Smart Contracts
│   └── PrivateRentalMatching.sol     # FHE-enabled contract
│
├── scripts/                          # Deployment scripts
│   ├── deploy.ts
│   └── interact.ts
│
├── test/                             # Contract tests
│   └── PrivateRentalMatching.test.ts
│
├── public/                           # Static assets
├── deploy-final/                     # GitHub Pages build
├── hardhat.config.ts                 # Hardhat configuration
├── next.config.js                    # Next.js configuration
├── package.json                      # Dependencies
└── README.md                         # Project documentation
```

---

## 🚀 Running the Demo Locally

### Prerequisites
1. Node.js >= 18.0.0
2. MetaMask installed
3. Sepolia testnet ETH

### Steps

```bash
# Navigate to demo directory
cd D:\zamadapp\dapp122\private-rental-matching

# Install dependencies
npm install

# Start development server
npm run dev

# Visit http://localhost:3000
```

### Or Run from SDK Root

```bash
# From fhevm-react-template root
npm run demo:start
```

---

## 📊 Smart Contract Details

### Deployed Contract
- **Address**: `0x980051585b6DC385159BD53B5C78eb7B91b848E5`
- **Network**: Sepolia Testnet
- **Explorer**: [View on Etherscan](https://sepolia.etherscan.io/address/0x980051585b6DC385159BD53B5C78eb7B91b848E5)

### Key Functions

#### Create Listing
```solidity
function createListing(
    inEuint32 price,
    inEuint8 bedrooms,
    inEuint32 postalCode,
    inEuint8 propertyType
) external returns (uint256)
```

#### Create Request
```solidity
function createRequest(
    inEuint32 maxBudget,
    inEuint8 minBedrooms,
    inEuint32 preferredPostalCode,
    inEuint8 preferredPropertyType
) external returns (uint256)
```

#### Create Match
```solidity
function createMatch(
    uint256 listingId,
    uint256 requestId
) external returns (uint256)
```

#### Confirm Match
```solidity
function confirmMatch(uint256 matchId) external
```

---

## 🎨 User Interface Features

### 1. Wallet Connection
- RainbowKit integration
- Support for MetaMask, WalletConnect, Coinbase Wallet
- Network switching to Sepolia

### 2. Create Listing Form
- Input fields for rent, bedrooms, location, property type
- Real-time encryption before submission
- Transaction confirmation UI

### 3. Create Request Form
- Input fields for budget, bedroom requirements, preferences
- Batch encryption of all fields
- Loading states during encryption

### 4. Match Maker
- Browse available listings/requests
- Create matches between compatible items
- Confirmation workflow

### 5. User Activity Dashboard
- View your listings
- View your requests
- Track match status

### 6. Statistics Display
- Total active listings
- Total active requests
- Platform activity metrics

---

## 🔐 Privacy Features Demonstrated

### Data Encryption
All sensitive data is encrypted before being sent to the blockchain:
- Rental prices never visible to unauthorized parties
- Location information kept private
- User preferences confidential

### Selective Disclosure
Data is only revealed when:
1. Both parties confirm a match
2. User provides EIP-712 signature for decryption
3. Authorized by smart contract logic

### On-Chain Computation
Matching algorithm runs entirely on encrypted data:
- No decryption needed for comparison
- Results computed in encrypted form
- Privacy maintained throughout

---

## 📹 Video Demonstration

See [demo.mp4](./demo.mp4) for a complete walkthrough showing:
- Initial setup and wallet connection
- Creating encrypted listings
- Creating encrypted requests
- Matching process
- Decryption after confirmation

---

## 🔗 Quick Links

| Resource | Link |
|----------|------|
| Live Demo | [https://private-rental-matching.vercel.app/](https://private-rental-matching.vercel.app/) |
| Source Code | [D:\zamadapp\dapp122\private-rental-matching](D:\zamadapp\dapp122\private-rental-matching) |
| Contract on Explorer | [Sepolia Etherscan](https://sepolia.etherscan.io/address/0x980051585b6DC385159BD53B5C78eb7B91b848E5) |
| GitHub Repository | [https://github.com/SchuylerPouros/private-rental-matching](https://github.com/SchuylerPouros/private-rental-matching) |

---

## 💡 Key Takeaways

This demo proves the FHEVM SDK is:

1. ✅ **Production-Ready**: Deployed and running on testnet
2. ✅ **Developer-Friendly**: Easy integration with existing tools
3. ✅ **Type-Safe**: Full TypeScript support
4. ✅ **Performant**: Efficient encryption/decryption
5. ✅ **Privacy-Preserving**: True end-to-end encryption
6. ✅ **Extensible**: Easy to adapt for other use cases

---

**This demo showcases the power of the FHEVM SDK for building privacy-first dApps! 🚀**
