# Scripts

Deployment and utility scripts for the FHEVM SDK project.

## Available Scripts

All deployment and interaction scripts are located in the demo application repository for practical demonstration purposes.

### Deployment Scripts

Located in the [demo repository](https://github.com/SchuylerPouros/private-rental-matching/tree/main/scripts):

- **deploy.ts**: Deploy PrivateRentalMatching contract to Sepolia
- **setup-gateway.ts**: Configure Gateway pausers and security
- **interact.ts**: Interact with deployed contract

## Usage

### Deploy Contract

```bash
# From demo repository
cd private-rental-matching
npm run deploy
```

This will:
1. Compile the contract
2. Deploy to Sepolia testnet
3. Verify on Etherscan (optional)
4. Output contract address

Example output:
```
Deploying PrivateRentalMatching to Sepolia...
Contract deployed to: 0x980051585b6DC385159BD53B5C78eb7B91b848E5
Transaction hash: 0x...
Gas used: 2,450,000
```

### Setup Gateway

```bash
npm run setup-gateway
```

Configures:
- Gateway contract address
- KMS node addresses (pausers)
- Co-processor node addresses
- NUM_PAUSERS = n_kms + n_copro

### Interact with Contract

```bash
npm run interact
```

Example interactions:
- Create encrypted listing
- Create encrypted request
- Match listings with requests
- Confirm matches
- Decrypt results

## Script Examples

### Deploy Script

```typescript
// scripts/deploy.ts
import { ethers } from 'hardhat';

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log('Deploying with account:', deployer.address);

  const PrivateRentalMatching = await ethers.getContractFactory('PrivateRentalMatching');
  const contract = await PrivateRentalMatching.deploy(
    process.env.GATEWAY_CONTRACT_ADDRESS
  );

  await contract.waitForDeployment();
  const address = await contract.getAddress();

  console.log('Contract deployed to:', address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

### Interact Script

```typescript
// scripts/interact.ts
import { ethers } from 'hardhat';
import { initFhevm } from '@fhevm/sdk/core';

async function main() {
  // Initialize FHEVM SDK
  const fhevm = await initFhevm({
    network: 'sepolia',
    gatewayUrl: 'https://gateway.zama.ai',
  });

  // Get contract
  const contract = await ethers.getContractAt(
    'PrivateRentalMatching',
    process.env.CONTRACT_ADDRESS
  );

  // Encrypt values
  const price = await fhevm.encrypt(1500, 'euint32');
  const bedrooms = await fhevm.encrypt(2, 'euint8');
  const postalCode = await fhevm.encrypt(10001, 'euint32');
  const propertyType = await fhevm.encrypt(1, 'euint8');

  // Create listing
  const tx = await contract.createListing(
    price.ciphertext,
    bedrooms.ciphertext,
    postalCode.ciphertext,
    propertyType.ciphertext
  );

  await tx.wait();
  console.log('Listing created!');
}

main().catch(console.error);
```

### Gateway Setup Script

```typescript
// scripts/setup-gateway.ts
import { ethers } from 'hardhat';

async function main() {
  const gateway = await ethers.getContractAt(
    'GatewayContract',
    process.env.GATEWAY_CONTRACT_ADDRESS
  );

  // Configure pausers
  const pausers = [
    process.env.PAUSER_ADDRESS_0, // KMS node 1
    process.env.PAUSER_ADDRESS_1, // KMS node 2
    process.env.PAUSER_ADDRESS_2, // Co-processor 1
    process.env.PAUSER_ADDRESS_3, // Co-processor 2
  ];

  for (const pauser of pausers) {
    const tx = await gateway.addPauser(pauser);
    await tx.wait();
    console.log('Added pauser:', pauser);
  }

  console.log('Gateway setup complete!');
}

main().catch(console.error);
```

## Environment Configuration

Create `.env` file:

```env
# Network
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_KEY
PRIVATE_KEY=your_private_key_here

# Gateway
GATEWAY_CONTRACT_ADDRESS=0x33347831500F1e73f102B0d440e6AcF701F577ac
NEXT_PUBLIC_GATEWAY_URL=https://gateway.zama.ai

# Pausers (KMS + Co-processor nodes)
NUM_PAUSERS=4
PAUSER_ADDRESS_0=0x...  # KMS node 1
PAUSER_ADDRESS_1=0x...  # KMS node 2
PAUSER_ADDRESS_2=0x...  # Co-processor 1
PAUSER_ADDRESS_3=0x...  # Co-processor 2

# Deployed Contract
CONTRACT_ADDRESS=0x980051585b6DC385159BD53B5C78eb7B91b848E5
```

## Common Tasks

### Check Balance

```bash
npx hardhat run scripts/check-balance.ts --network sepolia
```

### Verify Contract

```bash
npx hardhat verify --network sepolia CONTRACT_ADDRESS "CONSTRUCTOR_ARG_1"
```

### Generate ABI

```bash
npm run compile
# ABI will be in: artifacts/contracts/YourContract.sol/YourContract.json
```

### Extract ABI

```bash
# Extract just the ABI portion
cat artifacts/contracts/PrivateRentalMatching.sol/PrivateRentalMatching.json | jq '.abi' > abi.json
```

## Hardhat Configuration

```typescript
// hardhat.config.ts
import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.20',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL || '',
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};

export default config;
```

## Learn More

- [Hardhat Documentation](https://hardhat.org/docs)
- [fhEVM Gateway Guide](https://docs.zama.ai/fhevm/gateway)
- [Demo Scripts Source](https://github.com/SchuylerPouros/private-rental-matching/tree/main/scripts)
- [Setup Guide](../SETUP_GUIDE.md)

## Questions?

- Check the [demo repository](https://github.com/SchuylerPouros/private-rental-matching)
- Review [deployment documentation](https://docs.zama.ai/fhevm/guides/deploy)
- Open an issue on [GitHub](https://github.com/SchuylerPouros/fhevm-react-template/issues)
