// Utility to fetch ABI from Etherscan-like APIs
export async function fetchAbiFromExplorer(address, network, apiKey) {
  const url = 'https://api.etherscan.io/v2/api';
  let chainId = '';
  if (network === 'Sepolia') {
    chainId = '11155111';
  } else if (network === 'Celo') {
    chainId = '42220';
  } else if (network === 'Base') {
    chainId = '8453';
  } else if (network === 'Optimism') {
    chainId = '10';
  } else if (network === 'Ethereum' || network === 'Mainnet') {
    chainId = '1';
  } else {
    throw new Error('Unsupported network');
  }
  const params = new URLSearchParams({
    chainid: chainId,
    module: 'contract',
    action: 'getabi',
    address,
    apikey: apiKey
  });
  const res = await fetch(`${url}?${params.toString()}`);
  let data;
  try {
    data = await res.json();
  } catch (e) {
    const text = await res.text();
    console.error('API response is not JSON:', text);
    throw new Error(`API response is not JSON (status ${res.status}): ${text.slice(0, 200)}`);
  }
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
