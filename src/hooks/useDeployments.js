import { useState, useCallback, useEffect } from 'react';

const DEPLOYMENTS_STORAGE_KEY = 'smart_contract_deployments';

export const useDeployments = (address) => {
  const [deployments, setDeployments] = useState([]);

  const loadDeployments = useCallback(() => {
    if (!address) {
      setDeployments([]);
      return;
    }

    try {
      const allDeployments = JSON.parse(localStorage.getItem(DEPLOYMENTS_STORAGE_KEY) || '{}');
      const userDeployments = allDeployments[address.toLowerCase()] || [];
      setDeployments(userDeployments.sort((a, b) => b.timestamp - a.timestamp));
    } catch (err) {
      console.error('Error loading deployments:', err);
      setDeployments([]);
    }
  }, [address]);

  useEffect(() => {
    loadDeployments();
  }, [address, loadDeployments]);

  const addDeployment = useCallback((contractName, contractAddress, network, txHash) => {
    if (!address) return;

    try {
      const allDeployments = JSON.parse(localStorage.getItem(DEPLOYMENTS_STORAGE_KEY) || '{}');
      const userAddr = address.toLowerCase();
      
      if (!allDeployments[userAddr]) {
        allDeployments[userAddr] = [];
      }

      const newDeployment = {
        id: Date.now(),
        contractName,
        contractAddress,
        network,
        txHash,
        timestamp: Date.now(),
        formattedDate: new Date().toLocaleString()
      };

      allDeployments[userAddr].push(newDeployment);
      localStorage.setItem(DEPLOYMENTS_STORAGE_KEY, JSON.stringify(allDeployments));
      
      setDeployments(prev => [newDeployment, ...prev]);
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

  return {
    deployments,
    addDeployment,
    removeDeployment,
    clearDeployments,
    reload: loadDeployments
  };
};
