import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

export function useContractInteractions(contractAddress, abi, provider) {
  const [interactionCount, setInteractionCount] = useState(null);
  useEffect(() => {
    async function fetchInteractions() {
      if (!contractAddress || !abi || !provider) {
        setInteractionCount(null);
        return;
      }
      try {
        const contract = new ethers.Contract(contractAddress, abi, provider);
        // Find the Clicked event ABI
        const eventFragment = contract.interface.getEvent('Clicked');
        const filter = contract.filters.Clicked();
        // Get all Clicked events
        const logs = await provider.getLogs({
          address: contractAddress,
          topics: [eventFragment.topicHash],
          fromBlock: 0,
          toBlock: 'latest',
        });
        setInteractionCount(logs.length);
      } catch (err) {
        setInteractionCount(null);
      }
    }
    fetchInteractions();
  }, [contractAddress, abi, provider]);
  return interactionCount;
}
