import { useState, useCallback, useEffect } from 'react';
import { ethers } from 'ethers';

const DEPLOYMENTS_STORAGE_KEY = 'smart_contract_deployments';

const NETWORK_RPC_URLS = {
  Sepolia: 'https://rpc.sepolia.org',
  Celo: 'https://forno.celo.org',
  Base: 'https://mainnet.base.org',
  Optimism: 'https://mainnet.optimism.io'
};

export const useDeployments = (address) => {
  const [deployments, setDeployments] = useState([]);

  const fetchOnChainDeployments = useCallback(async () => {
    if (!address) return [];

    let normalizedAddress;
    try {
      normalizedAddress = ethers.getAddress(address);
    } catch (err) {
      console.error('Invalid address for deployment history lookup:', err);
      return [];
    }

    const aggregated = [];

    await Promise.all(Object.entries(NETWORK_RPC_URLS).map(async ([networkName, rpcUrl]) => {
      try {
        const provider = new ethers.JsonRpcProvider(rpcUrl);
        const history = await provider.getHistory(normalizedAddress);
        const blockCache = {};

        for (const tx of history) {
          if (tx.to === null && tx.creates) {
            let timestamp = Date.now();
            if (tx.blockNumber != null) {
              if (!blockCache[tx.blockNumber]) {
                const block = await provider.getBlock(tx.blockNumber);
                blockCache[tx.blockNumber] = block?.timestamp ? block.timestamp * 1000 : Date.now();
              }
              timestamp = blockCache[tx.blockNumber];
            }

            aggregated.push({
              id: `${networkName}-${tx.hash}`,
              contractName: 'External Deployment',
              contractAddress: tx.creates,
              network: networkName,
              txHash: tx.hash,
              timestamp,
              formattedDate: new Date(timestamp).toLocaleString()
            });
          }
        }
      } catch (err) {
        console.error(`Error fetching deployments from ${networkName}:`, err);
      }
    }));

    return aggregated;
  }, [address]);

  const loadDeployments = useCallback(async () => {
    if (!address) {
      return [];
    }

    try {
      const allDeployments = JSON.parse(localStorage.getItem(DEPLOYMENTS_STORAGE_KEY) || '{}');
      const userDeployments = allDeployments[address.toLowerCase()] || [];
      const onChainDeployments = await fetchOnChainDeployments();

      const mergedMap = new Map();
      [...onChainDeployments, ...userDeployments].forEach((deployment) => {
        if (!deployment || !deployment.txHash) {
          return;
        }
        const key = `${deployment.network}-${deployment.txHash}`;
        const timestamp = deployment.timestamp || Date.now();
        mergedMap.set(key, {
          ...deployment,
          id: deployment.id || key,
          timestamp,
          formattedDate: deployment.formattedDate || new Date(timestamp).toLocaleString()
        });
      });

      return Array.from(mergedMap.values()).sort((a, b) => b.timestamp - a.timestamp);
    } catch (err) {
      console.error('Error loading deployments:', err);
      return [];
    }
  }, [address, fetchOnChainDeployments]);

  useEffect(() => {
    let cancelled = false;

    const hydrate = async () => {
      if (!address) {
        setDeployments([]);
        return;
      }

      const data = await loadDeployments();
      if (!cancelled) {
        setDeployments(data);
      }
    };

    hydrate();

    return () => {
      cancelled = true;
    };
  }, [address, loadDeployments]);

  const addDeployment = useCallback((contractName, contractAddress, network, txHash) => {
    if (!address) return;

    try {
      const allDeployments = JSON.parse(localStorage.getItem(DEPLOYMENTS_STORAGE_KEY) || '{}');
      const userAddr = address.toLowerCase();
      
      if (!allDeployments[userAddr]) {
        allDeployments[userAddr] = [];
      }

      const timestamp = Date.now();
      const newDeployment = {
        id: `${network}-${txHash}`,
        contractName,
        contractAddress,
        network,
        txHash,
        timestamp,
        formattedDate: new Date(timestamp).toLocaleString()
      };

      allDeployments[userAddr].push(newDeployment);
      localStorage.setItem(DEPLOYMENTS_STORAGE_KEY, JSON.stringify(allDeployments));
      
      setDeployments(prev => {
        const existing = prev.find(d => d.txHash === txHash && d.network === network);
        if (existing) {
          return prev;
        }
        return [newDeployment, ...prev];
      });
    } catch (err) {
      console.error('Error saving deployment:', err);
    }
  }, [address]);

  const removeDeployment = useCallback((deploymentId) => {
    if (!address) return;

    try {
      const allDeployments = JSON.parse(localStorage.getItem(DEPLOYMENTS_STORAGE_KEY) || '{}');
      const userAddr = address.toLowerCase();
      
      if (allDeployments[userAddr]) {
        allDeployments[userAddr] = allDeployments[userAddr].filter(d => d.id !== deploymentId);
        localStorage.setItem(DEPLOYMENTS_STORAGE_KEY, JSON.stringify(allDeployments));
        
        setDeployments(prev => prev.filter(d => d.id !== deploymentId));
      }
    } catch (err) {
      console.error('Error removing deployment:', err);
    }
  }, [address]);

  const clearDeployments = useCallback(() => {
    if (!address) return;

    try {
      const allDeployments = JSON.parse(localStorage.getItem(DEPLOYMENTS_STORAGE_KEY) || '{}');
      delete allDeployments[address.toLowerCase()];
      localStorage.setItem(DEPLOYMENTS_STORAGE_KEY, JSON.stringify(allDeployments));
      setDeployments([]);
    } catch (err) {
      console.error('Error clearing deployments:', err);
    }
  }, [address]);

  const reload = useCallback(async () => {
    if (!address) {
      setDeployments([]);
      return;
    }

    const data = await loadDeployments();
    setDeployments(data);
  }, [address, loadDeployments]);

  return {
    deployments,
    addDeployment,
    removeDeployment,
    clearDeployments,
    reload
  };
};
