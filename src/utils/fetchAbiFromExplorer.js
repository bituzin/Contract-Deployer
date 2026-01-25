// Utility to fetch ABI from Etherscan-like APIs
export async function fetchAbiFromExplorer(address, network, apiKey) {
  let url = '';
  if (network === 'Sepolia') {
    url = `https://api-sepolia.etherscan.io/api?module=contract&action=getabi&address=${address}&apikey=${apiKey}`;
  } else if (network === 'Celo') {
    url = `https://api.celoscan.io/api?module=contract&action=getabi&address=${address}&apikey=${apiKey}`;
  } else if (network === 'Base') {
    url = `https://api.basescan.org/api?module=contract&action=getabi&address=${address}&apikey=${apiKey}`;
  } else if (network === 'Optimism') {
    url = `https://api-optimistic.etherscan.io/api?module=contract&action=getabi&address=${address}&apikey=${apiKey}`;
  } else {
    throw new Error('Unsupported network');
  }
  const res = await fetch(url);
  const data = await res.json();
  if (data.status === '1') {
    return JSON.parse(data.result);
  } else {
    throw new Error(data.result || 'ABI not found');
  }
}
