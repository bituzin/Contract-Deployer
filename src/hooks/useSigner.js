import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

/**
 * Hook to get and manage the current signer from the browser wallet
 */
export const useSigner = (isConnected) => {
  const [signer, setSigner] = useState(null);

  useEffect(() => {
    const getSigner = async () => {
      if (!isConnected || !window.ethereum) {
        setSigner(null);
        return;
      }

      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const newSigner = await provider.getSigner();
        setSigner(newSigner);
      } catch (err) {
        console.error('Error getting signer:', err);
        setSigner(null);
      }
    };

    getSigner();

    // Listen for account changes
    if (window.ethereum) {
      const handleAccountsChanged = () => {
        getSigner();
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);

      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      };
    }
  }, [isConnected]);

  return signer;
};
