// Migration script to move existing localStorage deployments to on-chain registry
// Run this in browser console after connecting wallet

async function migrateDeploymentsToRegistry() {
  console.log('🔄 Starting migration of deployments to on-chain registry...');
  
  // Check if wallet is connected
  if (!window.ethereum) {
    console.error('❌ No wallet provider found');
    return;
  }

  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    
    console.log('📋 Connected wallet:', address);

    // Get deployments from localStorage
    const DEPLOYMENTS_STORAGE_KEY = 'smart_contract_deployments';
    const allDeployments = JSON.parse(localStorage.getItem(DEPLOYMENTS_STORAGE_KEY) || '{}');
    const userDeployments = allDeployments[address.toLowerCase()] || [];
    
    if (userDeployments.length === 0) {
      console.log('✅ No deployments to migrate');
      return;
    }

    console.log(`📦 Found ${userDeployments.length} deployments to migrate`);

    // Registry configuration
    const DEPLOYMENT_REGISTRY_ADDRESSES = {
      'Sepolia': '0x0000000000000000000000000000000000000000', // Update with your addresses
      'Celo': '0x0000000000000000000000000000000000000000',
      'Base': '0x0000000000000000000000000000000000000000',
      'Optimism': '0x0000000000000000000000000000000000000000',
    };

    const REGISTRY_ABI = [
      {
        "inputs": [
          {"internalType": "string", "name": "contractType", "type": "string"},
          {"internalType": "address", "name": "contractAddress", "type": "address"},
          {"internalType": "string", "name": "network", "type": "string"},
          {"internalType": "string", "name": "txHash", "type": "string"}
        ],
        "name": "registerDeployment",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ];

    // Get current network
    const network = await provider.getNetwork();
    const chainId = network.chainId;
    
    // Map chainId to network name
    const networkMap = {
      11155111: 'Sepolia',
      42220: 'Celo',
      8453: 'Base',
      10: 'Optimism'
    };
    
    const currentNetwork = networkMap[Number(chainId)];
    if (!currentNetwork) {
      console.error('❌ Unsupported network. Please switch to Sepolia, Celo, Base, or Optimism');
      return;
    }

    console.log('🌐 Current network:', currentNetwork);

    const registryAddress = DEPLOYMENT_REGISTRY_ADDRESSES[currentNetwork];
    if (!registryAddress || registryAddress === '0x0000000000000000000000000000000000000000') {
      console.error(`❌ DeploymentRegistry not configured for ${currentNetwork}`);
      console.log('Please deploy the contract and update DEPLOYMENT_REGISTRY_ADDRESSES in this script');
      return;
    }

    const registry = new ethers.Contract(registryAddress, REGISTRY_ABI, signer);
    
    // Filter deployments for current network
    const deploymentsToMigrate = userDeployments.filter(d => d.network === currentNetwork);
    
    if (deploymentsToMigrate.length === 0) {
      console.log(`⚠️ No deployments found for ${currentNetwork}`);
      console.log('Switch to another network to migrate those deployments');
      return;
    }

    console.log(`📤 Migrating ${deploymentsToMigrate.length} deployments for ${currentNetwork}...`);

    let successCount = 0;
    let errorCount = 0;

    for (const deployment of deploymentsToMigrate) {
      try {
        console.log(`\n⏳ Registering: ${deployment.contractName} at ${deployment.contractAddress.slice(0, 10)}...`);
        
        const tx = await registry.registerDeployment(
          deployment.contractName,
          deployment.contractAddress,
          deployment.network,
          deployment.txHash
        );
        
        console.log(`  📝 Transaction sent: ${tx.hash}`);
        await tx.wait();
        console.log(`  ✅ Confirmed!`);
        
        successCount++;
      } catch (err) {
        console.error(`  ❌ Error:`, err.message);
        errorCount++;
      }
    }

    console.log('\n📊 Migration Summary:');
    console.log(`  ✅ Successful: ${successCount}`);
    console.log(`  ❌ Failed: ${errorCount}`);
    console.log(`  📈 Total: ${deploymentsToMigrate.length}`);
    
    if (successCount > 0) {
      console.log('\n🎉 Migration completed! Your deployments are now on-chain.');
      console.log('Switch to other networks to migrate deployments from those networks.');
    }

  } catch (err) {
    console.error('❌ Migration failed:', err);
  }
}

// Instructions
console.log('=====================================');
console.log('DeploymentRegistry Migration Tool');
console.log('=====================================');
console.log('');
console.log('Before running:');
console.log('1. Update DEPLOYMENT_REGISTRY_ADDRESSES in this script');
console.log('2. Connect your wallet');
console.log('3. Switch to the network you want to migrate');
console.log('');
console.log('To start migration, run:');
console.log('  migrateDeploymentsToRegistry()');
console.log('');
console.log('Note: You need to run this for each network separately');
console.log('=====================================');
