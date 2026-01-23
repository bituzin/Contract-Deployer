// Utility to shorten Ethereum addresses
export function shortenAddress(address) {
  if (!address || typeof address !== 'string') return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}
