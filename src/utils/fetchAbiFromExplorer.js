// Utility to fetch ABI from Etherscan-like APIs
export async function fetchAbiFromExplorer(address, network, apiKey) {
  let url = '';
  let headers = {};
  if (network === 'Sepolia') {
    url = `https://api-sepolia.etherscan.io/api/v2/contracts/${address}/abi`;
    headers = { 'Authorization': `Bearer ${apiKey}` };
  } else if (network === 'Celo') {
    url = `https://api.celoscan.io/api/v2/contracts/${address}/abi`;
    headers = { 'Authorization': `Bearer ${apiKey}` };
  } else if (network === 'Base') {
    url = `https://api.basescan.org/api/v2/contracts/${address}/abi`;
    headers = { 'Authorization': `Bearer ${apiKey}` };
  } else if (network === 'Optimism') {
    url = `https://api-optimistic.etherscan.io/api/v2/contracts/${address}/abi`;
    headers = { 'Authorization': `Bearer ${apiKey}` };
  } else {
    throw new Error('Unsupported network');
  }
  const res = await fetch(url, { headers });
  const data = await res.json();
  if (data.status === '1' || data.status === 1) {
    // v2: ABI is in data.result. If already parsed, return as is, else parse.
    try {
      return typeof data.result === 'string' ? JSON.parse(data.result) : data.result;
    } catch (e) {
      throw new Error('Invalid ABI format');
    }
  } else {
    throw new Error(data.result || data.message || 'ABI not found');
  }
}
