export const explorers = {
  Sepolia: {
    name: 'Etherscan',
    txUrl: 'https://sepolia.etherscan.io/tx/',
    addressUrl: 'https://sepolia.etherscan.io/address/'
  },
  Celo: {
    name: 'Celoscan',
    txUrl: 'https://celoscan.io/tx/',
    addressUrl: 'https://celoscan.io/address/'
  },
  Base: {
    name: 'BaseScan',
    txUrl: 'https://basescan.org/tx/',
    addressUrl: 'https://basescan.org/address/'
  },
  Optimism: {
    name: 'Optimism Etherscan',
    txUrl: 'https://optimistic.etherscan.io/tx/',
    addressUrl: 'https://optimistic.etherscan.io/address/'
  }
};

export const getExplorerUrl = (type, value, network) => {
  const explorer = explorers[network];
  if (!explorer) return null;
  
  if (type === 'tx') {
    return explorer.txUrl + value;
  } else if (type === 'address') {
    return explorer.addressUrl + value;
  }
  return null;
};
