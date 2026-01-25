import React, { useState } from 'react';

export const InteractModal = ({ theme, visible, onClose, onSubmit }) => {
  const [address, setAddress] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (address && onSubmit) {
      onSubmit(address);
    }
  };

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(0,0,0,0.45)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        background: theme.cardBg + 'E6',
        borderRadius: 12,
        boxShadow: '0 2px 16px rgba(0,0,0,0.12)',
        padding: '32px 36px',
        minWidth: 340,
        maxWidth: 420,
        textAlign: 'center',
        fontFamily: 'Inter, Arial, sans-serif',
        fontWeight: 500,
        color: theme.textPrimary,
      }}>
        <h2 style={{ fontWeight: 700, fontSize: '1.18em', marginBottom: 18 }}>Enter Contract Address</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={address}
            onChange={e => setAddress(e.target.value)}
            placeholder="0x..."
            style={{
              width: '100%',
              padding: '10px 14px',
              borderRadius: 8,
              border: `1px solid ${theme.primary}`,
              fontSize: '1em',
              marginBottom: 18,
              fontFamily: 'Fira Mono, Menlo, Monaco, Consolas, monospace',
              background: theme.cardBg,
              color: theme.textPrimary,
            }}
            required
            pattern="^0x[a-fA-F0-9]{40}$"
          />
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
            <button
              type="submit"
              style={{
                padding: '8px 24px',
                background: theme.primary,
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                fontWeight: 600,
                fontSize: '1em',
                cursor: 'pointer',
                boxShadow: `0 2px 8px ${theme.shadow}`,
                transition: 'background 0.2s',
              }}
            >Submit</button>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '8px 24px',
                background: theme.primaryDark,
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                fontWeight: 600,
                fontSize: '1em',
                cursor: 'pointer',
                boxShadow: `0 2px 8px ${theme.shadow}`,
                transition: 'background 0.2s',
              }}
            >Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};
