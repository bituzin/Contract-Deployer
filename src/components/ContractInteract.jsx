import React from 'react';
import { useParams } from 'react-router-dom';

export const ContractInteract = ({ theme, isConnected, openModal }) => {
  const { contractName, contractAddress, network } = useParams();

  if (!isConnected) {
    return (
      <div style={{ maxWidth: 720, margin: '60px auto 32px auto' }}>
        <div style={{ background: theme.cardBg + 'E6', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.04)', padding: '28px 32px', color: theme.textPrimary, fontSize: '0.96em', fontFamily: 'Inter, Arial, sans-serif', fontWeight: 500, textAlign: 'center', lineHeight: 1.7, minHeight: 320 }}>
          <h2 style={{ color: theme.textPrimary, fontWeight: 700, fontSize: '1.2em', margin: 0, marginBottom: 18 }}>Contract Interaction</h2>
          <div style={{ marginBottom: 24 }}>
            Connect your wallet to interact with this contract.
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
              transition: 'all 0.2s'
            }}
            onClick={() => openModal()}
          >
            Connect Wallet
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 720, margin: '60px auto 32px auto' }}>
      <div style={{ background: theme.cardBg + 'E6', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.04)', padding: '28px 32px', color: theme.textPrimary, fontSize: '0.96em', fontFamily: 'Inter, Arial, sans-serif', fontWeight: 500, textAlign: 'left', lineHeight: 1.7 }}>
        <h2 style={{ color: theme.textPrimary, fontWeight: 700, fontSize: '1.2em', margin: 0, marginBottom: 18 }}>
          Contract: {contractName}
        </h2>
        
        <div style={{ marginBottom: 12, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}>
          <div style={{ fontSize: '0.82em', color: theme.textPrimary, fontWeight: 500, background: theme.cardBgDark, padding: '5px 10px', borderRadius: 6, fontFamily: 'monospace', minWidth: 0 }}>
            Network: {network}
          </div>
          <div style={{ fontSize: '0.82em', color: theme.textPrimary, fontWeight: 500, background: theme.cardBgDark, padding: '5px 10px', borderRadius: 6, fontFamily: 'monospace', minWidth: 0 }}>
            Contract Address: {contractAddress}
          </div>
          <div style={{ fontSize: '0.82em', color: theme.textPrimary, fontWeight: 500, background: theme.cardBgDark, padding: '5px 10px', borderRadius: 6, fontFamily: 'monospace', minWidth: 0 }}>
            Deployment date: {new Date().toLocaleString()}
          </div>
        </div>
        <div style={{ marginTop: 24, padding: '20px', background: theme.cardBgDark, borderRadius: 8 }}>
          <div style={{ color: theme.textSecondary, fontSize: '0.92em', textAlign: 'center' }}>
            Contract interaction interface coming soon...
          </div>
        </div>
      </div>
    </div>
  );
};
