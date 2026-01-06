// Script to deploy DeploymentRegistry contract
// Usage: npx hardhat run scripts/deploy-registry.js --network <network-name>

const hre = require("hardhat");

async function main() {
  console.log("Deploying DeploymentRegistry contract...");

  const DeploymentRegistry = await hre.ethers.getContractFactory("DeploymentRegistry");
  const registry = await DeploymentRegistry.deploy();

  await registry.waitForDeployment();

  const address = await registry.getAddress();

  console.log("✅ DeploymentRegistry deployed to:", address);
  console.log("");
  console.log("⚠️  IMPORTANT: Add this address to src/config/deploymentRegistry.js");
  console.log("");
  console.log(`'${hre.network.name}': '${address}',`);
  console.log("");
  
  // Wait for block confirmations
  if (hre.network.name !== "hardhat" && hre.network.name !== "localhost") {
    console.log("Waiting for block confirmations...");
    await registry.deploymentTransaction().wait(5);
    console.log("✅ Contract confirmed");
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
