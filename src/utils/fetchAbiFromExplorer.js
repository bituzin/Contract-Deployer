// Utility to fetch ABI from Etherscan-like APIs
export async function fetchAbiFromExplorer(address, network, apiKey) {
  let url = '';
  let chainId = '';
  if (network === 'Sepolia') {
    url = `https://api-sepolia.etherscan.io/v2/api`;
    chainId = '11155111';
  } else if (network === 'Celo') {
    url = `https://api.celoscan.io/v2/api`;
    chainId = '42220';
  } else if (network === 'Base') {
    url = `https://api.basescan.org/v2/api`;
    chainId = '8453';
  } else if (network === 'Optimism') {
    url = `https://api-optimistic.etherscan.io/v2/api`;
    chainId = '10';
  } else if (network === 'Ethereum' || network === 'Mainnet') {
    url = `https://api.etherscan.io/v2/api`;
    chainId = '1';
  } else {
    throw new Error('Unsupported network');
  }
  const params = new URLSearchParams({
    chainid: chainId,
    action: 'getabi',
    address,
    apikey: apiKey
  });
  const res = await fetch(`${url}?${params.toString()}`);
  const data = await res.json();
  if (data.status === '1' || data.status === 1) {
    try {
      return typeof data.result === 'string' ? JSON.parse(data.result) : data.result;
    } catch (e) {
      throw new Error('Invalid ABI format');
    }
  } else {
    throw new Error(data.result || data.message || 'ABI not found');
  }
}
