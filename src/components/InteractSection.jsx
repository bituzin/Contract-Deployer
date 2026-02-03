import React from 'react';
import { ContractInteract } from './ContractInteract';

export const InteractSection = ({ theme, isConnected, openModal, network }) => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      paddingLeft: 340,
      paddingTop: 60,
      marginBottom: 32
    }}>
      <div style={{
        background: theme.cardBg + 'E6',
        border: `1px solid ${theme.primary}`,
        borderRadius: 10,
        boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
        padding: '28px 32px',
        color: theme.textPrimary,
        fontSize: '0.96em',
        fontFamily: 'Inter, Arial, sans-serif',
        fontWeight: 500,
        textAlign: 'left',
        lineHeight: 1.7,
        maxWidth: 1000,
        width: '100%'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
          <h2 style={{ color: theme.textPrimary, fontWeight: 700, fontSize: '1.2em', margin: 0 }}>Interact</h2>
        </div>
        <ContractInteract theme={theme} isConnected={isConnected} openModal={openModal} network={network} />
      </div>
    </div>
  );
};
