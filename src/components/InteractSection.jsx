import React from 'react';
import { ContractInteract } from './ContractInteract';

export const InteractSection = ({ theme, isConnected, openModal, network }) => {
  return (
    <div style={{
      maxWidth: 1000,
      margin: '60px auto 32px auto',
      background: theme.cardBg + 'E6',
      borderRadius: 12,
      boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
      border: `1px solid ${theme.primary}`,
      padding: '28px 32px',
      color: theme.textPrimary,
      fontSize: '0.96em',
      fontFamily: 'Inter, Arial, sans-serif',
      fontWeight: 500,
      textAlign: 'left',
      lineHeight: 1.7
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
        <h2 style={{ color: theme.textPrimary, fontWeight: 700, fontSize: '1.2em', margin: 0 }}>Interact</h2>
      </div>
      <ContractInteract theme={theme} isConnected={isConnected} openModal={openModal} network={network} />
    </div>
  );
};
