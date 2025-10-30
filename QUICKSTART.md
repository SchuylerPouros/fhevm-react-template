# Quick Start Guide - FHEVM React Template

## 🚀 Get Started in 5 Minutes

This guide will help you get the rental matching React application running quickly.

## Prerequisites Check

Before starting, ensure you have:

```bash
# Check Node.js version (need >= 18.0.0)
node --version

# Check npm version (need >= 9.0.0)
npm --version

# Install MetaMask browser extension
# Get some Sepolia testnet ETH
```

## Quick Start Commands

### Option 1: Run React App Only

```bash
# Navigate to the React app
cd D:\zamadapp\dapp122\fhevm-react-template\examples\rental-matching-react

# Install dependencies
npm install

# Start development server
npm run dev
```

Open http://localhost:3000 in your browser.

### Option 2: Run from Root (All Examples)

```bash
# Navigate to project root
cd D:\zamadapp\dapp122\fhevm-react-template

# Install all dependencies
npm install

# Run the React app
npm run dev --workspace=rental-matching-react
```

## First Time Setup

### 1. Configure MetaMask

1. **Install MetaMask**
   - Download from https://metamask.io

2. **Add Sepolia Network**
   - Network Name: `Sepolia`
   - RPC URL: `https://sepolia.infura.io/v3/YOUR_KEY`
   - Chain ID: `11155111`
   - Currency: `SepoliaETH`

3. **Get Test ETH**
   - Visit https://sepoliafaucet.com/
   - Enter your address
   - Wait for ETH to arrive

### 2. Connect to the App

1. Open http://localhost:3000
2. Click "Connect MetaMask Wallet"
3. Approve the connection
4. You should see your address displayed

### 3. Try Creating a Listing

1. Fill in the "Create Property Listing" form:
   - Monthly Rent: `1500`
   - Bedrooms: `2`
   - Postal Code: `10001`
   - Property Type: `Apartment`

2. Click "Create Encrypted Listing"
3. Confirm the transaction in MetaMask
4. Wait for confirmation
5. See your listing in "Your Activity"

## Project Structure Overview

```
rental-matching-react/
├── src/
│   ├── components/      # React components
│   ├── hooks/          # Custom hooks
│   ├── lib/            # Utilities
│   ├── App.tsx         # Main app
│   └── main.tsx        # Entry point
├── package.json        # Dependencies
└── vite.config.ts      # Vite config
```

## Available Examples

This repository contains three example implementations:

### 1. Next.js Demo (`examples/nextjs-demo/`)
Full-featured Next.js 14 app with FHEVM SDK integration.

```bash
npm run dev:nextjs
```

### 2. React Rental Matching (`examples/rental-matching-react/`)
Modern React app for rental matching (this guide).

```bash
cd examples/rental-matching-react
npm run dev
```

### 3. HTML Rental Matching (`examples/RentalMatching/`)
Simple HTML/JS version for quick deployment.

Open `index.html` in a browser.

## Common Tasks

### Build for Production

```bash
npm run build
npm run preview
```

### Run Linter

```bash
npm run lint
```

### Clean Install

```bash
# Windows PowerShell
Remove-Item -Path node_modules -Recurse -Force
Remove-Item -Path package-lock.json -Force
npm install

# Unix/Mac
rm -rf node_modules package-lock.json
npm install
```

## Troubleshooting

### Port 3000 Already in Use

Edit `vite.config.ts`:
```typescript
server: {
  port: 3001  // Change to any available port
}
```

### "Cannot find module" Error

```bash
# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### MetaMask Not Connecting

1. Refresh the page
2. Make sure MetaMask is unlocked
3. Try disconnecting and reconnecting
4. Check browser console for errors

### Transaction Failing

1. Make sure you're on Sepolia testnet
2. Check you have enough Sepolia ETH
3. Try increasing gas limit in MetaMask
4. Wait a moment and try again

## Smart Contract Information

**Contract Address**: `0xAe4aE413A41b03273Ba7ae927140Ca7a924cBFfE`

**Network**: Sepolia Testnet

**Functions**:
- `createListing()` - Create encrypted property listing
- `createRequest()` - Create encrypted rental request
- `createMatch()` - Match listing with request
- `confirmMatch()` - Confirm a match

**View Functions**:
- `getActiveListingsCount()`
- `getActiveRequestsCount()`
- `getUserListings(address)`
- `getUserRequests(address)`

## Key Features

✅ **Privacy-Preserving** - FHE encryption for sensitive data
✅ **Modern React** - React 18 with TypeScript
✅ **Fast Development** - Vite with HMR
✅ **Type-Safe** - Full TypeScript support
✅ **Responsive** - Works on all devices
✅ **Real-time** - Event-driven updates

## Next Steps

After getting the app running:

1. **Explore the Code**
   - Check out `src/App.tsx` for the main logic
   - Look at `src/hooks/` for custom hooks
   - Review `src/components/` for UI components

2. **Read the Documentation**
   - `README.md` - Project overview
   - `INSTALLATION.md` - Detailed setup
   - `REACT_MIGRATION_SUMMARY.md` - Migration details

3. **Try All Features**
   - Create multiple listings
   - Create rental requests
   - Match listings with requests
   - View statistics and activity

4. **Customize**
   - Modify styles in `src/index.css`
   - Add new components
   - Extend functionality
   - Deploy to production

## Useful Links

| Resource | URL |
|----------|-----|
| **GitHub Repository** | [Your Repo URL] |
| **Contract Explorer** | https://sepolia.etherscan.io/address/0xAe4aE413A41b03273Ba7ae927140Ca7a924cBFfE |
| **Sepolia Faucet** | https://sepoliafaucet.com/ |
| **MetaMask** | https://metamask.io |
| **Vite Docs** | https://vitejs.dev |
| **React Docs** | https://react.dev |

## Getting Help

If you encounter issues:

1. Check this quick start guide
2. Review the troubleshooting section
3. Check browser console for errors
4. Read the detailed documentation
5. Open an issue on GitHub

## Development Tips

### Hot Reload
Changes to files in `src/` will automatically reload the browser.

### TypeScript Errors
TypeScript errors will show in the terminal and browser console.

### Component Development
Create new components in `src/components/` and import them in `App.tsx`.

### Styling
Modify `src/index.css` for global styles or add component-specific styles.

### Testing
Test your changes by:
1. Creating listings
2. Creating requests
3. Creating matches
4. Checking events fire correctly

## Quick Commands Reference

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Clean and reinstall
rm -rf node_modules package-lock.json && npm install
```

## Success Checklist

After following this guide, you should have:

- [x] Node.js and npm installed
- [x] MetaMask extension installed
- [x] Sepolia testnet configured
- [x] Sepolia ETH in wallet
- [x] Dependencies installed
- [x] Dev server running
- [x] App accessible in browser
- [x] Wallet connected to app
- [x] Successfully created a listing

**Congratulations! You're ready to build with FHEVM! 🎉**

---

**Need more help?** Check out the detailed documentation in the repository.
