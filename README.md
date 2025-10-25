# 🏠 Anonymous Rental Matching Platform

## 🎯 Core Concept

**Privacy-Preserving Tenant-Landlord Matching with Full Identity Protection**

Using Fully Homomorphic Encryption (FHE) technology powered by Zama's fhEVM, this platform enables completely anonymous matching between landlords and tenants. All sensitive information (rental prices, locations, preferences) is encrypted on-chain and only revealed after both parties confirm the match, ensuring true privacy protection for all users.

---

## 🔗 Links

- **Live Demo**: [https://private-rental-matching.vercel.app/](https://private-rental-matching.vercel.app/)
- **GitHub Repository**: [https://github.com/SchuylerPouros/private-rental-matching](https://github.com/SchuylerPouros/private-rental-matching)
- **Demo Video**: [demo.mp4]
- **FHEVM SDK Template**: [https://github.com/SchuylerPouros/fhevm-react-template](https://github.com/SchuylerPouros/fhevm-react-template)

---

## 🏆 Zama Bounty Program Submission

This project is a **complete demonstration** of the universal FHEVM SDK built for the Zama Bounty Program.

> **Note**: The focus is on the **FHEVM SDK** itself. This Next.js application serves as a practical example showcasing how the SDK works in a real-world scenario, not as the primary deliverable.

### SDK Repository
- **FHEVM React Template**: [https://github.com/SchuylerPouros/fhevm-react-template](https://github.com/SchuylerPouros/fhevm-react-template)

### Bounty Requirements Met:
- ✅ **Universal SDK Package** (`fhevm-sdk`): Importable into any dApp
- ✅ **Initialization Utilities**: Easy SDK setup and configuration
- ✅ **Encryption Flow**: Helper functions for input encryption
- ✅ **Decryption Workflows**: `userDecrypt` (EIP-712 signatures) + `publicDecrypt`
- ✅ **Wagmi-like API**: Modular React hooks/adapters with framework-agnostic core
- ✅ **Reusable Components**: Cover various encryption/decryption scenarios
- ✅ **Complete Setup**: Install → Compile → Deploy → Launch from root directory
- ✅ **Clean & Extensible**: Well-structured, documented, and easy to extend

## 🌟 Features

### FHEVM SDK Core Features
- **Universal SDK Package**: Importable into any dApp with modular API structure
- **Encryption Utilities**: Easy-to-use helpers for input encryption
- **Decryption Workflows**: Support for `userDecrypt` (EIP-712) and `publicDecrypt`
- **React Hooks Integration**: Wagmi-like API with custom hooks for common patterns
- **Type-Safe**: Full TypeScript support with comprehensive type definitions

### Application Features
- **Full Privacy Protection**: All sensitive data (prices, locations, preferences) encrypted using FHE
- **Anonymous Matching**: Match properties with requests without revealing private details
- **Secure Confirmation**: Two-party confirmation system for finalized matches
- **Modern Stack**: Built with Next.js 14, TypeScript, Tailwind CSS, and RainbowKit
- **Smart Contract Security**: Comprehensive test suite with 20+ test cases
- **New Gateway API**: Integrated with latest fhEVM Gateway (sIND-CPAD security)

## 🚀 Quick Start

### Prerequisites

- Node.js >= 18.0.0
- npm or yarn
- MetaMask wallet
- Sepolia testnet ETH

### Installation

```bash
# Clone the repository
git clone https://github.com/SchuylerPouros/private-rental-matching.git
cd private-rental-matching

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Configure your .env file with:
# - SEPOLIA_RPC_URL
# - PRIVATE_KEY
# - GATEWAY_CONTRACT_ADDRESS
# - NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID
```

### Development

```bash
# Compile smart contracts
npm run compile

# Run tests
npm run test

# Deploy to Sepolia
npm run deploy

# Start Next.js development server
npm run dev
```

Visit `http://localhost:3000` to see the application.

## 📁 Project Structure

```
private-rental-matching/
├── contracts/              # Solidity smart contracts
│   └── PrivateRentalMatching.sol
├── test/                   # Contract test suite
│   └── PrivateRentalMatching.test.ts
├── scripts/                # Deployment and utility scripts
│   ├── deploy.ts
│   ├── setup-gateway.ts
│   └── interact.ts
├── app/                    # Next.js 14 app directory
│   ├── components/         # React components
│   ├── layout.tsx
│   ├── page.tsx
│   └── providers.tsx
├── public/                 # Static assets
├── deploy-final/           # Production build (for GitHub Pages)
│   ├── _next/              # Next.js static files
│   ├── index.html          # Main entry point
│   ├── 404.html            # 404 page
│   └── .nojekyll           # Disable Jekyll on GitHub Pages
├── hardhat.config.ts       # Hardhat configuration
├── next.config.js          # Next.js configuration
├── package.json            # Dependencies and scripts
├── demo.mp4                # Demo video
└── README.md               # This file
```

## 🔧 Configuration

### Gateway Setup

The platform uses Zama's new Gateway API with enhanced security features:

```bash
# Configure pausers in .env
NUM_PAUSERS=4  # n_kms + n_copro
PAUSER_ADDRESS_0=<kms_node_1>
PAUSER_ADDRESS_1=<kms_node_2>
PAUSER_ADDRESS_2=<copro_node_1>
PAUSER_ADDRESS_3=<copro_node_2>

# Run gateway setup
npm run setup-gateway
```

### Key Changes from Old Gateway

1. **Event-Based Decryption**: KMS responses are now emitted as individual events instead of on-chain aggregation
2. **Input Re-randomization**: Automatic re-randomization for sIND-CPAD security
3. **View Function Migration**: Replaced `check*` functions with `is*` functions that return booleans
4. **Pauser Configuration**: Multiple pauser addresses (NUM_PAUSERS) instead of single PAUSER_ADDRESS

## 💻 Usage

### For Landlords

1. **Connect Wallet**: Click "Connect Wallet" and select MetaMask
2. **Create Listing**: Fill in property details (all encrypted on-chain)
   - Monthly rent
   - Number of bedrooms
   - Postal code
   - Property type (Apartment/House/Studio)
3. **Review Matches**: Browse requests and create matches
4. **Confirm Match**: Confirm matches you're interested in

### For Tenants

1. **Connect Wallet**: Connect your MetaMask wallet
2. **Create Request**: Specify your requirements (all encrypted)
   - Maximum budget
   - Minimum bedrooms
   - Preferred postal code
   - Preferred property type
3. **Browse Listings**: View available properties
4. **Create/Confirm Match**: Match with suitable listings

## 🧪 Testing

The project includes comprehensive tests covering:

```bash
# Run all tests
npm run test

# Run with coverage
npm run test:coverage

# Run specific test file
npx hardhat test test/PrivateRentalMatching.test.ts
```

### Test Coverage

- ✅ Deployment and initialization
- ✅ Property listing creation and management
- ✅ Rental request creation and management
- ✅ Matching logic and authorization
- ✅ Two-party confirmation system
- ✅ Statistics and counters
- ✅ Gateway management
- ✅ Edge cases and error handling

## 📜 Smart Contract API

### Core Functions

#### `createListing(inEuint32 price, inEuint8 bedrooms, inEuint32 postalCode, inEuint8 propertyType)`
Create a new encrypted property listing.

#### `createRequest(inEuint32 maxBudget, inEuint8 minBedrooms, inEuint32 preferredPostalCode, inEuint8 preferredPropertyType)`
Create a new encrypted rental request.

#### `createMatch(uint256 listingId, uint256 requestId)`
Create a match between a listing and request (requires FHE validation).

#### `confirmMatch(uint256 matchId)`
Confirm a match (both parties must confirm).

### View Functions

#### `getActiveListingsCount() → uint256`
Returns the count of active, unmatched listings.

#### `getActiveRequestsCount() → uint256`
Returns the count of active, unmatched requests.

#### `getUserListings(address user) → uint256[]`
Returns all listing IDs for a user.

#### `getUserRequests(address user) → uint256[]`
Returns all request IDs for a user.

#### `getMatchDetails(uint256 matchId) → (details)`
Returns full match information.

## 🔐 Security Features

1. **FHE Encryption**: All sensitive data is encrypted using Fully Homomorphic Encryption
2. **Access Control**: Only authorized parties can view/modify their data
3. **Two-Party Confirmation**: Matches require confirmation from both parties
4. **Gateway Integration**: Secure decryption through Zama's Gateway
5. **Re-randomization**: Automatic input re-randomization for enhanced security

## 🛣️ Roadmap

- [x] Core smart contract with FHE
- [x] Comprehensive test suite
- [x] Next.js frontend with RainbowKit
- [x] Gateway API migration
- [ ] Advanced search filters
- [ ] Messaging system
- [ ] Review and rating system
- [ ] Mobile application
- [ ] Multi-chain support

## 📚 Resources

- [Zama fhEVM Documentation](https://docs.zama.ai/fhevm)
- [Gateway API Guide](https://docs.zama.ai/fhevm/gateway)
- [Next.js Documentation](https://nextjs.org/docs)
- [RainbowKit Documentation](https://www.rainbowkit.com/docs)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Zama** for providing the fhEVM technology
- **OpenZeppelin** for security best practices
- **RainbowKit** for wallet connection UI
- **Next.js** team for the amazing framework

## 📞 Support

For questions and support:
- Open an issue on GitHub
- Join our community Discord
- Check the documentation

## ⚠️ Disclaimer

This is experimental software. Use at your own risk. Always review smart contract code before interacting with it on mainnet.

---

Built with ❤️ for privacy-preserving Web3
