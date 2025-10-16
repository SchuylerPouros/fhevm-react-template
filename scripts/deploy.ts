import { ethers } from 'hardhat';

async function main() {
  console.log('🚀 Starting deployment...\n');

  const [deployer] = await ethers.getSigners();
  console.log('📝 Deploying with account:', deployer.address);

  const balance = await ethers.provider.getBalance(deployer.address);
  console.log('💰 Account balance:', ethers.formatEther(balance), 'ETH\n');

  // Gateway and pauser configuration
  const pauserAddresses = [
    process.env.PAUSER_ADDRESS_0 || deployer.address,
    process.env.PAUSER_ADDRESS_1 || deployer.address,
    process.env.PAUSER_ADDRESS_2 || deployer.address,
    process.env.PAUSER_ADDRESS_3 || deployer.address,
  ];

  const kmsGeneration = process.env.KMS_GENERATION || 1;

  console.log('⚙️  Configuration:');
  console.log('   Pausers:', pauserAddresses);
  console.log('   KMS Generation:', kmsGeneration);
  console.log('');

  // Deploy PrivateRentalMatching contract
  console.log('📦 Deploying PrivateRentalMatching...');
  const PrivateRentalMatching = await ethers.getContractFactory('PrivateRentalMatching');
  const contract = await PrivateRentalMatching.deploy(pauserAddresses, kmsGeneration);

  await contract.waitForDeployment();
  const address = await contract.getAddress();

  console.log('✅ PrivateRentalMatching deployed to:', address);
  console.log('');

  // Display contract info
  console.log('📋 Contract Information:');
  console.log('   Address:', address);
  console.log('   Deployer:', deployer.address);
  console.log('   Transaction:', contract.deploymentTransaction()?.hash);
  console.log('');

  // Save deployment info
  console.log('💾 Save this address to your .env file:');
  console.log(`   NEXT_PUBLIC_CONTRACT_ADDRESS=${address}`);
  console.log('');

  console.log('🎉 Deployment complete!');
  console.log('');
  console.log('📝 Next steps:');
  console.log('   1. Update .env with contract address');
  console.log('   2. Verify on Etherscan (optional):');
  console.log(`      npx hardhat verify --network sepolia ${address} "[${pauserAddresses}]" ${kmsGeneration}`);
  console.log('   3. Start your frontend:');
  console.log('      cd examples/nextjs-demo && npm run dev');
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('❌ Deployment failed:', error);
    process.exit(1);
  });
