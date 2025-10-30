# Anonymous Rental Matching Platform - React Version

A privacy-preserving decentralized application built with React and FHEVM that enables secure matching between tenants and landlords while protecting the identities of both parties through advanced cryptographic techniques.

## Features

- **Privacy-Protected Matching**: Connect tenants and landlords without revealing personal identities
- **FHE Encryption**: All sensitive data (prices, locations, preferences) encrypted using FHEVM
- **React & TypeScript**: Modern React application with full TypeScript support
- **Ethers.js Integration**: Seamless blockchain interaction
- **Real-time Updates**: Event listeners for instant updates
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **React 18**: Modern React with hooks
- **TypeScript**: Full type safety
- **Vite**: Fast build tool and dev server
- **Ethers.js 6**: Ethereum interaction
- **FHEVM**: Fully Homomorphic Encryption

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm or yarn
- MetaMask wallet
- Sepolia testnet ETH

### Installation

```bash
# From the example directory
cd examples/rental-matching-react

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` to see the application.

### Building for Production

```bash
npm run build
npm run preview
```

## Smart Contract

**Contract Address**: `0xAe4aE413A41b03273Ba7ae927140Ca7a924cBFfE`

The smart contract is deployed on Sepolia testnet and handles:
- Anonymous property listing creation
- Encrypted rental request creation
- Privacy-preserving matching algorithm
- Match confirmation workflow

## How It Works

1. **Connect Wallet**: Connect your MetaMask wallet to the Sepolia testnet
2. **Create Listing**: Landlords can create encrypted property listings
3. **Create Request**: Tenants can create encrypted rental requests
4. **Match Properties**: Create matches between compatible listings and requests
5. **Privacy Protected**: All sensitive data remains encrypted on-chain

## Project Structure

```
rental-matching-react/
├── src/
│   ├── components/        # React components
│   │   ├── WalletInfo.tsx
│   │   ├── CreateListing.tsx
│   │   ├── CreateRequest.tsx
│   │   ├── CreateMatch.tsx
│   │   ├── Statistics.tsx
│   │   ├── UserActivity.tsx
│   │   └── StatusBar.tsx
│   ├── App.tsx           # Main application component
│   ├── main.tsx          # Application entry point
│   ├── index.css         # Global styles
│   └── vite-env.d.ts     # TypeScript declarations
├── index.html            # HTML template
├── vite.config.ts        # Vite configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies and scripts
```

## Key Components

### App.tsx
Main application component that manages:
- Wallet connection
- Contract interactions
- State management
- Event listeners

### CreateListing
Form for landlords to create encrypted property listings with:
- Monthly rent
- Number of bedrooms
- Postal code
- Property type

### CreateRequest
Form for tenants to create encrypted rental requests with:
- Maximum budget
- Minimum bedrooms
- Preferred postal code
- Preferred property type

### CreateMatch
Interface for creating matches between listings and requests

### Statistics
Displays platform statistics:
- Active listings count
- Active requests count
- Connected account
- Network information

### UserActivity
Shows user's personal listings and requests

## Privacy Features

- **Encrypted Data**: All sensitive information encrypted using FHE
- **Zero Personal Data**: No personally identifiable information stored on-chain
- **Anonymous Matching**: Matching happens without revealing private details
- **Selective Disclosure**: Users control what information to reveal

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Environment Configuration

The application connects to Sepolia testnet by default. Make sure you have:
1. MetaMask installed
2. Sepolia testnet configured in MetaMask
3. Some Sepolia ETH for gas fees

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For questions and support:
- Check the main project documentation
- Open an issue on GitHub
- Review the smart contract code

---

**Built with privacy in mind using FHEVM technology**
