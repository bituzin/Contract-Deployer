// Utility to fetch contract code from public RPC endpoints
export async function fetchCodeFromRpc(address, network) {
  let rpcUrl;
  switch (network) {
    case 'Sepolia':
      rpcUrl = 'https://rpc.sepolia.org';
      break;
    case 'Celo':
      rpcUrl = 'https://forno.celo.org';
      break;
    case 'Base':
      rpcUrl = 'https://mainnet.base.org';
      break;
    case 'Optimism':
      rpcUrl = 'https://mainnet.optimism.io';
      break;
    case 'Ethereum':
    case 'Mainnet':
      rpcUrl = 'https://rpc.ankr.com/eth';
      break;
    default:
      throw new Error('Unsupported network');
  }
  const body = {
    jsonrpc: '2.0',
    method: 'eth_getCode',
    params: [address, 'latest'],
    id: 1
  };
  const res = await fetch(rpcUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  const data = await res.json();
  if (data && data.result !== undefined) {
    return data.result;
  }
  throw new Error('Could not fetch contract code');
}
