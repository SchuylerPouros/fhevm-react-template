# Smart Contracts

This directory contains example FHE-enabled smart contracts demonstrating the use of Zama's fhEVM.

## Primary Example Contract

The main example smart contract is the **PrivateRentalMatching** contract, which is part of the demo application.

### Contract Details

- **Name**: `PrivateRentalMatching.sol`
- **Address**: `0x980051585b6DC385159BD53B5C78eb7B91b848E5`
- **Network**: Sepolia Testnet
- **Explorer**: [View on Etherscan](https://sepolia.etherscan.io/address/0x980051585b6DC385159BD53B5C78eb7B91b848E5)

### Source Code

The complete contract source code is available in the demo application repository:
- [PrivateRentalMatching.sol](https://github.com/SchuylerPouros/private-rental-matching/blob/main/contracts/PrivateRentalMatching.sol)

### Key Features

The contract demonstrates:

1. **Encrypted Storage**: Store sensitive data (prices, locations) as encrypted values
2. **FHE Computation**: Compare encrypted values without decryption
3. **Access Control**: Only authorized parties can decrypt specific values
4. **Event Emissions**: Emit events for KMS decryption requests

### Contract Functions

```solidity
// Create encrypted property listing
function createListing(
    inEuint32 price,
    inEuint8 bedrooms,
    inEuint32 postalCode,
    inEuint8 propertyType
) external returns (uint256);

// Create encrypted rental request
function createRequest(
    inEuint32 maxBudget,
    inEuint8 minBedrooms,
    inEuint32 preferredPostalCode,
    inEuint8 preferredPropertyType
) external returns (uint256);

// Match listing with request (FHE computation)
function createMatch(
    uint256 listingId,
    uint256 requestId
) external returns (uint256);

// Confirm match (both parties must confirm)
function confirmMatch(uint256 matchId) external;
```

## Compiling Contracts

### Option 1: From Demo Repository

```bash
# Clone demo repository
git clone https://github.com/SchuylerPouros/private-rental-matching.git
cd private-rental-matching

# Install dependencies
npm install

# Compile contracts
npm run compile

# ABI will be generated in artifacts/contracts/
```

### Option 2: From SDK Root

```bash
# From fhevm-react-template root
npm run compile
```

## Deploying Contracts

### Prerequisites

1. Configure `.env` file:
```env
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_KEY
PRIVATE_KEY=your_private_key_here
GATEWAY_CONTRACT_ADDRESS=0x33347831500F1e73f102B0d440e6AcF701F577ac
```

2. Get Sepolia ETH from faucets:
   - https://sepoliafaucet.com/
   - https://www.alchemy.com/faucets/ethereum-sepolia

### Deploy

```bash
# Deploy to Sepolia
npm run deploy

# Output will show:
# Contract deployed to: 0x...
# Transaction hash: 0x...
```

## Testing Contracts

```bash
# Run comprehensive test suite
npm run test

# Run specific test file
npx hardhat test test/PrivateRentalMatching.test.ts

# Run with coverage
npm run test:coverage
```

### Test Coverage

The contract includes tests for:
- ✅ Deployment and initialization
- ✅ Creating encrypted listings
- ✅ Creating encrypted requests
- ✅ FHE matching logic
- ✅ Two-party confirmation
- ✅ Access control
- ✅ Event emissions
- ✅ Edge cases and error handling

## FHE Types Used

The contract uses these Zama FHE types:

- `euint8`: Small integers (0-255) for bedrooms, property type
- `euint32`: Larger integers for prices, postal codes
- `ebool`: Encrypted booleans for match results

## Gateway Integration

The contract integrates with Zama's Gateway for:

1. **Input Re-randomization**: Automatic security enhancement
2. **Decryption Requests**: User-initiated decryption with EIP-712 signatures
3. **Event Emissions**: KMS responses via events instead of on-chain aggregation

## Learn More

- [Zama fhEVM Documentation](https://docs.zama.ai/fhevm)
- [Gateway API Guide](https://docs.zama.ai/fhevm/gateway)
- [Hardhat fhEVM Plugin](https://github.com/zama-ai/hardhat-fhevm)
- [Demo Application](../examples/README.md)

## Example: Simple FHE Contract

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "fhevm/lib/TFHE.sol";
import "fhevm/gateway/GatewayCaller.sol";

contract SimpleCounter {
    euint32 private counter;

    constructor() {
        counter = TFHE.asEuint32(0);
    }

    function incrementBy(inEuint32 calldata value) public {
        euint32 amount = TFHE.asEuint32(value);
        counter = TFHE.add(counter, amount);
    }

    function getCounter() public view returns (euint32) {
        return counter;
    }
}
```

## Questions?

- Check the [demo contract source](https://github.com/SchuylerPouros/private-rental-matching/tree/main/contracts)
- Review [setup guide](../SETUP_GUIDE.md)
- Open an issue on [GitHub](https://github.com/SchuylerPouros/fhevm-react-template/issues)
