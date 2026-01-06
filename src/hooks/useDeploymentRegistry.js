import { useState, useCallback, useEffect } from 'react';
import { ethers } from 'ethers';
import { DEPLOYMENT_REGISTRY_ADDRESSES, DEPLOYMENT_REGISTRY_ABI } from '../config/deploymentRegistry';

const NETWORK_RPC_URLS = {
  Sepolia: 'https://rpc.sepolia.org',
  Celo: 'https://forno.celo.org',
  Base: 'https://mainnet.base.org',
  Optimism: 'https://mainnet.optimism.io'
};

/**
 * Hook for interacting with DeploymentRegistry contract on-chain
 * This provides persistent, cross-device deployment tracking
 */
export const useDeploymentRegistry = (address, currentNetwork) => {
  const [deployments, setDeployments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetch deployments from all networks where DeploymentRegistry is deployed
   */
  const fetchDeploymentsFromRegistry = useCallback(async () => {
    if (!address) {
      return [];
    }

    setLoading(true);
    setError(null);

    const allDeployments = [];

    await Promise.all(
      Object.entries(NETWORK_RPC_URLS).map(async ([networkName, rpcUrl]) => {
        const registryAddress = DEPLOYMENT_REGISTRY_ADDRESSES[networkName];
        
        // Skip networks where registry is not deployed (address is zero)
        if (!registryAddress || registryAddress === '0x0000000000000000000000000000000000000000') {
          return;
        }

        try {
          const provider = new ethers.JsonRpcProvider(rpcUrl);
          const registryContract = new ethers.Contract(
            registryAddress,
            DEPLOYMENT_REGISTRY_ABI,
            provider
          );

          const userDeployments = await registryContract.getDeployments(address);

          userDeployments.forEach((deployment) => {
            allDeployments.push({
              id: `${deployment.network || networkName}-${deployment.txHash}`,
              contractName: deployment.contractType,
              contractAddress: deployment.contractAddress,
              network: deployment.network || networkName,
              txHash: deployment.txHash,
              timestamp: Number(deployment.timestamp) * 1000, // Convert to milliseconds
              formattedDate: new Date(Number(deployment.timestamp) * 1000).toLocaleString(),
              source: 'registry' // Mark as coming from registry
            });
          });
        } catch (err) {
          console.error(`Error fetching deployments from ${networkName} registry:`, err);
        }
      })
    );

    setLoading(false);
    return allDeployments.sort((a, b) => b.timestamp - a.timestamp);
  }, [address]);

  /**
   * Register a new deployment to the registry on current network
   */
  const registerDeployment = useCallback(async (contractName, contractAddress, network, txHash, signer) => {
    if (!signer || !currentNetwork) {
      throw new Error('Signer and current network are required');
    }

    const registryAddress = DEPLOYMENT_REGISTRY_ADDRESSES[currentNetwork];
    
    if (!registryAddress || registryAddress === '0x0000000000000000000000000000000000000000') {
      console.warn(`DeploymentRegistry not deployed on ${currentNetwork}. Deployment not registered.`);
      return null;
    }

    try {
      const registryContract = new ethers.Contract(
        registryAddress,
        DEPLOYMENT_REGISTRY_ABI,
        signer
      );

      const tx = await registryContract.registerDeployment(
        contractName,
        contractAddress,
        network,
        txHash
      );

      await tx.wait();
      
      // Refresh deployments after registration
      const updatedDeployments = await fetchDeploymentsFromRegistry();
      setDeployments(updatedDeployments);

      return tx;
    } catch (err) {
      console.error('Error registering deployment:', err);
      setError(err.message);
      throw err;
    }
  }, [currentNetwork, fetchDeploymentsFromRegistry]);

  /**
   * Load deployments on mount and when address changes
   */
  useEffect(() => {
    let cancelled = false;

    const loadData = async () => {
      if (!address) {
        setDeployments([]);
        return;
      }

      const data = await fetchDeploymentsFromRegistry();
      if (!cancelled) {
        setDeployments(data);
      }
    };

    loadData();

    return () => {
      cancelled = true;
    };
  }, [address, fetchDeploymentsFromRegistry]);

  const reload = useCallback(async () => {
    const data = await fetchDeploymentsFromRegistry();
    setDeployments(data);
  }, [fetchDeploymentsFromRegistry]);

  return {
    deployments,
    loading,
    error,
    registerDeployment,
    reload
  };
};
