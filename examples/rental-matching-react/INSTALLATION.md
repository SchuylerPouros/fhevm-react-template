# Installation Guide for Rental Matching React App

## Method 1: Standalone Installation (Recommended for Development)

If you want to run the React app independently without the workspace setup:

### Step 1: Navigate to the Project

```bash
cd D:\fhevm-react-template\examples\rental-matching-react
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Start Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Step 4: Build for Production

```bash
npm run build
npm run preview
```

## Method 2: Workspace Installation (For Full Project)

If you want to install all packages including the SDK:

### Step 1: Navigate to Root Directory

```bash
cd D:\fhevm-react-template
```

### Step 2: Install All Workspace Dependencies

```bash
npm install
```

This will install dependencies for all packages in the workspace.

### Step 3: Run the React App

```bash
# Option 1: Using workspace command
npm run dev --workspace=rental-matching-react

# Option 2: Navigate to the app directory
cd examples/rental-matching-react
npm run dev
```

## Troubleshooting

### Issue: "EUNSUPPORTEDPROTOCOL workspace:*"

This error occurs when npm doesn't support workspace protocol. Solutions:

1. **Update npm to latest version:**
   ```bash
   npm install -g npm@latest
   ```

2. **Or modify package.json:**
   Remove the `@fhevm/sdk` dependency if you're not using it, or change `workspace:*` to a specific version.

### Issue: "Cannot find module '@fhevm/sdk'"

The current implementation doesn't require @fhevm/sdk. If you see this error:

1. Check that you've removed the dependency from package.json
2. Clear node_modules and reinstall:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

### Issue: Port 3000 already in use

Change the port in `vite.config.ts`:

```typescript
export default defineConfig({
  // ...
  server: {
    port: 3001, // Change to any available port
  },
});
```

## Prerequisites

Before installing, ensure you have:

- **Node.js**: >= 18.0.0
- **npm**: >= 9.0.0
- **MetaMask**: Browser extension installed
- **Sepolia ETH**: For testing transactions

Check your versions:

```bash
node --version
npm --version
```

## Environment Setup

### 1. MetaMask Configuration

1. Install MetaMask browser extension
2. Create or import a wallet
3. Add Sepolia testnet:
   - Network Name: Sepolia
   - RPC URL: https://sepolia.infura.io/v3/YOUR_KEY
   - Chain ID: 11155111
   - Currency Symbol: SepoliaETH

### 2. Get Test ETH

Get Sepolia testnet ETH from faucets:
- https://sepoliafaucet.com/
- https://sepolia-faucet.pk910.de/

### 3. Environment Variables (Optional)

Create a `.env` file in the project root:

```bash
VITE_CONTRACT_ADDRESS=0xAe4aE413A41b03273Ba7ae927140Ca7a924cBFfE
VITE_GATEWAY_URL=https://gateway.zama.ai
VITE_NETWORK=sepolia
```

## Verification

After installation, verify everything works:

1. **Start the dev server:**
   ```bash
   npm run dev
   ```

2. **Check the console output:**
   - Should see "VITE vX.X.X ready in XXXms"
   - Should show "Local: http://localhost:3000/"

3. **Open in browser:**
   - Navigate to http://localhost:3000
   - Should see the "Anonymous Rental Matching" interface

4. **Connect MetaMask:**
   - Click "Connect MetaMask Wallet"
   - Approve the connection
   - Should see your address displayed

5. **Test functionality:**
   - Try creating a listing
   - Try creating a request
   - Check that transactions work

## Project Scripts

Available npm scripts:

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Next Steps

After successful installation:

1. **Read the README.md** for project overview
2. **Explore the code** in `src/` directory
3. **Try the features** - create listings, requests, matches
4. **Customize** the app for your needs
5. **Deploy** to production when ready

## Support

If you encounter issues:

1. Check this installation guide
2. Review the main project README
3. Check the browser console for errors
4. Verify MetaMask is properly configured
5. Ensure you have Sepolia testnet ETH

## Common Commands Summary

```bash
# Install dependencies
npm install

# Start development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Clean install
rm -rf node_modules package-lock.json && npm install
```

---

**Ready to build privacy-preserving dApps with FHEVM!**
