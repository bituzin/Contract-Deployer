import { useState, useCallback, useEffect } from 'react';
import { ethers } from 'ethers';
import { useDeploymentRegistry } from './useDeploymentRegistry';

const DEPLOYMENTS_STORAGE_KEY = 'smart_contract_deployments';
const USE_REGISTRY = false; // Set to true to use on-chain registry as primary source

const NETWORK_RPC_URLS = {
  Sepolia: 'https://rpc.sepolia.org',
  Celo: 'https://forno.celo.org',
  Base: 'https://mainnet.base.org',
  Optimism: 'https://mainnet.optimism.io'
};

export const useDeployments = (address, currentNetwork, signer) => {
  const [deployments, setDeployments] = useState([]);
  
  // Use registry hook
  const { 
    deployments: registryDeployments, 
    loading: registryLoading,
    registerDeployment: registryRegister,
    reload: registryReload
  } = useDeploymentRegistry(address, currentNetwork);



  const loadDeployments = useCallback(async () => {
    if (!address) {
      return [];
    }

    try {
      // If using registry, prioritize registry data
      if (USE_REGISTRY && registryDeployments.length > 0) {
        return registryDeployments;
      }

      // Fallback to localStorage only
      const allDeployments = JSON.parse(localStorage.getItem(DEPLOYMENTS_STORAGE_KEY) || '{}');
      const userDeployments = allDeployments[address.toLowerCase()] || [];
      // Usunięto fetchOnChainDeployments i onChainDeployments
      return userDeployments.sort((a, b) => b.timestamp - a.timestamp);
    } catch (error) {
      console.error('Error loading deployments:', error);
      return [];
    }
  }, [address, registryDeployments]);

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

  const addDeployment = useCallback(async (contractName, contractAddress, network, txHash) => {
    if (!address) return;

    try {
      // If using registry, register on-chain first
      if (USE_REGISTRY && signer) {
        try {
          await registryRegister(contractName, contractAddress, network, txHash, signer);
          console.log('Deployment registered on-chain');
        } catch (error) {
          console.warn('Failed to register on-chain, falling back to localStorage:', error);
        }
      }

      // Always save to localStorage as backup
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
        formattedDate: new Date(timestamp).toLocaleString(),
        source: USE_REGISTRY ? 'registry' : 'localStorage'
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
    } catch (error) {
      console.error('Error saving deployment:', error);
    }
  }, [address, signer, registryRegister]);

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
    } catch (error) {
      console.error('Error removing deployment:', error);
    }
  }, [address]);

  const clearDeployments = useCallback(() => {
    if (!address) return;

    try {
      const allDeployments = JSON.parse(localStorage.getItem(DEPLOYMENTS_STORAGE_KEY) || '{}');
      delete allDeployments[address.toLowerCase()];
      localStorage.setItem(DEPLOYMENTS_STORAGE_KEY, JSON.stringify(allDeployments));
      setDeployments([]);
    } catch (error) {
      console.error('Error clearing deployments:', error);
    }
  }, [address]);

  const reload = useCallback(async () => {
    if (!address) {
      setDeployments([]);
      return;
    }

    // Reload from registry if using it
    if (USE_REGISTRY) {
      await registryReload();
    }

    const data = await loadDeployments();
    setDeployments(data);
  }, [address, loadDeployments, registryReload]);

  return {
    deployments,
    addDeployment,
    removeDeployment,
    clearDeployments,
    reload,
    loading: registryLoading,
    useRegistry: USE_REGISTRY
  };
};
