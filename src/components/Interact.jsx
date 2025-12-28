import React from 'react';

export const Interact = ({ theme }) => {
  return (
    <div style={{ maxWidth: 940, margin: '60px auto 32px auto' }}>
      <div style={{ background: theme.cardBg + 'E6', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.04)', padding: '28px 32px', color: theme.textPrimary, fontSize: '0.96em', fontFamily: 'Inter, Arial, sans-serif', fontWeight: 500, textAlign: 'left', lineHeight: 1.7, maxWidth: 940 }}>
        <h2 style={{ color: theme.textPrimary, fontWeight: 700, fontSize: '1.2em', margin: 0, marginBottom: 24 }}>Interact</h2>
        <div style={{ fontSize: '1em', color: theme.textSecondary }}>
          Here you will be able to interact with your deployed contracts. (Feature coming soon)
        </div>
      </div>
    </div>
  );
};
