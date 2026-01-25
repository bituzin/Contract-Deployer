import React from 'react';
import { ContractInteract } from './contracts/ContractInteract';

export const InteractSection = ({ theme, isConnected, openModal, network }) => {
  return (
    <div style={{ maxWidth: 940, margin: '60px auto 32px auto' }}>
      <div style={{ background: theme.cardBg + 'E6', border: `1px solid ${theme.primary}`, borderRadius: 10, boxShadow: '0 2px 12px rgba(0,0,0,0.04)', padding: '28px 32px', color: theme.textPrimary, fontSize: '0.96em', fontFamily: 'Inter, Arial, sans-serif', fontWeight: 500, textAlign: 'left', lineHeight: 1.7, maxWidth: 940 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
          <h2 style={{ color: theme.textPrimary, fontWeight: 700, fontSize: '1.2em', margin: 0 }}>Interact</h2>
        </div>
        <ContractInteract theme={theme} isConnected={isConnected} openModal={openModal} network={network} />
      </div>
    </div>
  );
};
