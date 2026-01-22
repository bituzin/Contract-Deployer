import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { getExplorerUrl } from '../config/explorers';

export const DeploymentCard = ({ deployment, theme, network, formatDate }) => {
  const [interactionCount, setInteractionCount] = useState(null);

  useEffect(() => {
    async function fetchInteractions() {
      if (deployment.contractName !== 'ClickCounter' || !window.ethereum) {
        setInteractionCount(null);
        return;
      }
      
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const artifact = await import('../../artifacts/contracts/ClickCounter.sol/ClickCounter.json');
        const abi = artifact.abi;
        
        const contract = new ethers.Contract(deployment.contractAddress, abi, provider);
        const eventFragment = contract.interface.getEvent('Clicked');
        
        const logs = await provider.getLogs({
          address: deployment.contractAddress,
          topics: [eventFragment.topicHash],
          fromBlock: 0,
          toBlock: 'latest',
        });
        
        setInteractionCount(logs.length);
      } catch {
        setInteractionCount(null);
      }
    }
    
    fetchInteractions();
  }, [deployment.contractAddress, deployment.contractName]);

  const explorerUrl = getExplorerUrl('address', deployment.contractAddress, deployment.network);
  const txUrl = getExplorerUrl('tx', deployment.txHash, deployment.network);
  const fullAddress = deployment.contractAddress;
  const fullTx = deployment.txHash;
  const shortTx = fullTx ? `${fullTx.slice(0, 6)}...${fullTx.slice(-4)}` : '';

  return (
    <div
      style={{
        background: `rgba(${theme.primaryRgb},0.08)`,
        border: `1px solid ${theme.primary}`,
        borderRadius: '10px',
        padding: '16px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontWeight: 700, fontSize: '1.04em', color: theme.textPrimary }}>{deployment.contractName}</span>
        <span style={{ fontSize: '0.88em', color: theme.textSecondary }}>{formatDate(deployment.timestamp)}</span>
      </div>
      
      {deployment.contractName === 'ClickCounter' && (
        <div style={{ fontSize: '0.92em', color: theme.textSecondary, margin: '2px 0 6px 0', fontWeight: 600 }}>
          Interactions with contract: {interactionCount !== null ? interactionCount : 'Loading...'}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <div>
          <div style={{ fontSize: '0.8em', color: theme.textSecondary, marginBottom: 4, fontWeight: 600 }}>Contract Address</div>
          <div style={{ display: 'flex', alignItems: 'center', background: theme.cardBgDark, padding: '8px 12px', borderRadius: '10px', fontSize: '0.82em', fontFamily: 'monospace', border: `1px solid ${theme.primary}` }}>
            {explorerUrl ? (
              <a
                href={explorerUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: theme.textPrimary, textDecoration: 'none', wordBreak: 'break-all', flex: 1 }}
                onMouseOver={e => e.currentTarget.style.textDecoration = 'underline'}
                onMouseOut={e => e.currentTarget.style.textDecoration = 'none'}
              >
                {fullAddress}
              </a>
            ) : (
              <span style={{ color: theme.textPrimary, wordBreak: 'break-all', flex: 1 }}>{fullAddress}</span>
            )}
          </div>
        </div>

        <div>
          <div style={{ fontSize: '0.8em', color: theme.textSecondary, marginBottom: 4, fontWeight: 600 }}>Transaction Hash</div>
          <div style={{ display: 'flex', alignItems: 'center', background: theme.cardBgDark, padding: '8px 12px', borderRadius: '10px', fontSize: '0.82em', fontFamily: 'monospace', border: `1px solid ${theme.primary}` }}>
            {txUrl ? (
              <a
                href={txUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: theme.textPrimary, textDecoration: 'none', wordBreak: 'break-all', flex: 1 }}
                onMouseOver={e => e.currentTarget.style.textDecoration = 'underline'}
                onMouseOut={e => e.currentTarget.style.textDecoration = 'none'}
              >
                {shortTx}
              </a>
            ) : (
              <span style={{ color: theme.textPrimary, wordBreak: 'break-all', flex: 1 }}>{shortTx}</span>
            )}
          </div>
        </div>
      </div>

      {(deployment.network === 'Celo' || deployment.network === 'Sepolia' || deployment.network === 'Optimism' || deployment.network === 'Base') && (
        <button
          style={{
            marginTop: 8,
            fontSize: '0.96em',
            padding: '0.48em 1.32em',
            background: theme.primary,
            color: network === 'Celo' ? '#444' : '#fff',
            border: `1px solid ${theme.primary}`,
            borderRadius: '10px',
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: `0 2px 8px ${theme.shadow}`,
            transition: 'background 0.2s',
            minWidth: 'fit-content',
            maxWidth: 180,
            whiteSpace: 'nowrap',
            letterSpacing: '0.01em'
          }}
          onMouseOver={e => e.currentTarget.style.background = theme.primaryDark}
          onMouseOut={e => e.currentTarget.style.background = theme.primary}
          onClick={() => window.location.href = `/interact/${deployment.contractName}/${deployment.contractAddress}/${deployment.network}`}
        >Interact with contract</button>
      )}
    </div>
  );
};
