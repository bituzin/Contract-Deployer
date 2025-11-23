export const networks = ["Sepolia", "Celo", "Base", "Optimism"];

export const networkParams = {
  Base: { 
    chainId: "0x2105", // Base Mainnet
    name: "Base"
  },
  Celo: { 
    chainId: "0xa4ec", // Celo Mainnet
    name: "Celo"
  },
  Optimism: { 
    chainId: "0xa", // Optimism Mainnet
    name: "Optimism"
  },
  Sepolia: { 
    chainId: "0xaa36a7", // Sepolia Testnet
    name: "Sepolia"
  }
};

export const getNetworkParam = (network) => {
  return networkParams[network] || networkParams.Base;
};