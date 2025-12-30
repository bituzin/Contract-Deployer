import React from 'react';
import { useDeployments } from '../hooks/useDeployments';
import { getExplorerUrl } from '../config/explorers';

export const Interact = ({ theme, address, isConnected, openModal, setPopup, network, deployments: propDeployments }) => {
  const { deployments: hookDeployments } = useDeployments(address);
  const deployments = propDeployments && Array.isArray(propDeployments) ? propDeployments : hookDeployments;

  const formatDate = (timestamp) => {
    const date = timestamp ? new Date(timestamp) : new Date();
    return date.toLocaleString();
  };

  const handleOpenContract = (deployment) => {
    if (!setPopup) return;

    const explorerUrl = getExplorerUrl('address', deployment.contractAddress, deployment.network) || '#';
    const routeMap = {
      'SimpleStorage': '/contract/simple-storage',
      'ClickCounter': '/contract/click-counter',
      'MessageBoard': '/contract/message-board',
      'SimpleVoting': '/contract/simple-voting'
    };

    const contractRoute = routeMap[deployment.contractName] || '#';

    const content = (
      <div>
        <div style={{ fontWeight: 700, marginBottom: 8 }}>{deployment.contractName}</div>
        <div style={{ fontSize: '0.9em', color: theme.textSecondary, marginBottom: 12 }}>{formatDate(deployment.timestamp)}</div>
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: '0.82em', color: theme.textSecondary, marginBottom: 6 }}>Contract address</div>
          <div style={{ fontFamily: 'monospace', background: theme.cardBgDark, padding: '8px 10px', borderRadius: 6 }}>{deployment.contractAddress}</div>
        </div>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
          <a href={contractRoute} style={{ padding: '8px 12px', background: theme.primary, color: '#fff', borderRadius: 8, textDecoration: 'none', fontWeight: 600 }} onClick={() => setPopup({ visible: false, message: '', txHash: null, content: null })}>Open contract page</a>
          <a href={explorerUrl} target="_blank" rel="noopener noreferrer" style={{ padding: '8px 12px', background: theme.cardBgDark, color: theme.textPrimary, borderRadius: 8, textDecoration: 'none', fontWeight: 600 }}>Open in explorer</a>
        </div>
      </div>
    );

    setPopup({ visible: true, message: '', txHash: null, network: deployment.network, content });
  };

  const filteredDeployments = network ? deployments.filter((deployment) => deployment.network === network) : deployments;

  const renderDeploymentCard = (deployment) => {
    const explorerUrl = getExplorerUrl('address', deployment.contractAddress, deployment.network);
    const shortAddress = deployment.contractAddress ? `${deployment.contractAddress.slice(0, 10)}...${deployment.contractAddress.slice(-8)}` : '—';

    return (
      <div
        key={deployment.id}
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
          <div>
            <div 
              style={{ fontWeight: 700, fontSize: '1.04em', color: theme.textPrimary, marginBottom: 4, cursor: 'pointer', textDecoration: 'underline' }}
              onClick={() => handleOpenContract(deployment)}
            >
              {deployment.contractName}
            </div>
            <div style={{ fontSize: '0.88em', color: theme.textSecondary }}>
              {formatDate(deployment.timestamp)}
            </div>
          </div>
          <div style={{ fontSize: '0.86em', fontWeight: 600, background: theme.highlight, color: '#444', padding: '4px 12px', borderRadius: '6px' }}>
            {deployment.network}
          </div>
        </div>

        <div>
          <div style={{ fontSize: '0.8em', color: theme.textSecondary, marginBottom: 4, fontWeight: 600 }}>Adres kontraktu</div>
          <div style={{ display: 'flex', alignItems: 'center', background: theme.cardBgDark, padding: '8px 12px', borderRadius: '6px', fontSize: '0.82em', fontFamily: 'monospace' }}>
            {explorerUrl ? (
              <a
                href={explorerUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: theme.textPrimary, textDecoration: 'none', wordBreak: 'break-all', flex: 1 }}
              >
                {shortAddress}
              </a>
            ) : (
              <span style={{ color: theme.textPrimary, wordBreak: 'break-all', flex: 1 }}>{shortAddress}</span>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (!isConnected) {
    return (
      <div style={{ maxWidth: 720, margin: '60px auto 32px auto' }}>
        <div style={{ background: theme.cardBg + 'E6', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.04)', padding: '28px 32px', color: theme.textPrimary, fontSize: '0.96em', fontFamily: 'Inter, Arial, sans-serif', fontWeight: 500, textAlign: 'center', lineHeight: 1.7, minHeight: 320, maxWidth: 720 }}>
          <h2 style={{ color: theme.textPrimary, fontWeight: 700, fontSize: '1.2em', margin: 0, marginBottom: 18 }}>Interact</h2>
          <div style={{ marginBottom: 24 }}>
            Connect your wallet to view your deployed contracts.
          </div>
          <button
            style={{
              fontSize: '0.96em',
              padding: '0.48em 1.32em',
              background: theme.primary,
              color: theme.textPrimary,
              border: 'none',
              borderRadius: '6px',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: `0 2px 8px ${theme.shadow}`,
              transition: 'background 0.2s'
            }}
            onMouseOver={e => e.currentTarget.style.background = theme.primaryDark}
            onMouseOut={e => e.currentTarget.style.background = theme.primary}
            onClick={openModal}
          >Connect Wallet</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 940, margin: '60px auto 32px auto' }}>
      <div style={{ background: theme.cardBg + 'E6', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.04)', padding: '28px 32px', color: theme.textPrimary, fontSize: '0.96em', fontFamily: 'Inter, Arial, sans-serif', fontWeight: 500, textAlign: 'left', lineHeight: 1.7, maxWidth: 940 }}>
        <h2 style={{ color: theme.textPrimary, fontWeight: 700, fontSize: '1.2em', margin: 0, marginBottom: 24 }}>Interact</h2>

        {deployments.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: theme.textSecondary }}>
            <p style={{ fontSize: '1.08em', marginBottom: 16 }}>No deployments</p>
            <p style={{ fontSize: '0.92em' }}>Deploy your first contract to see it here.</p>
          </div>
        ) : filteredDeployments.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: theme.textSecondary }}>
            <p style={{ fontSize: '1.08em', marginBottom: 16 }}>No deployments on {network}</p>
            <p style={{ fontSize: '0.92em' }}>Switch networks to view other deployments.</p>
          </div>
        ) : (
          <div>
            <div style={{ fontSize: '0.92em', color: theme.textSecondary, marginBottom: 24 }}>
              Deployments on {network || 'all networks'}: <b>{filteredDeployments.length}</b>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {filteredDeployments.map(renderDeploymentCard)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
