import React from 'react';

export const Popup = ({ visible, message, txHash, network, onClose, theme }) => {
  if (!visible) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(0,0,0,0.48)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div 
        style={{
          background: theme.cardBg + 'E6', // hex + alpha (90% opacity)
          borderRadius: 12,
          boxShadow: `0 2px 12px ${theme.shadow}`,
          padding: '20px 22px',
          minWidth: 220,
          maxWidth: 320,
          textAlign: 'center',
          fontFamily: 'Inter, Arial, sans-serif',
          fontWeight: 500,
          fontSize: '0.96em',
          color: theme.textPrimary,
          position: 'relative',
        }}
      >
        <div style={{ marginBottom: txHash ? 12 : 18, fontSize: '0.95em' }}>
          <span dangerouslySetInnerHTML={{ __html: message }} />
        </div>
        {txHash && (
          <div style={{ marginBottom: 12 }}>
            <a
              href={
                network === "Base" ? `https://basescan.org/tx/${txHash}` :
                network === "Sepolia" ? `https://sepolia.etherscan.io/tx/${txHash}` :
                network === "Celo" ? `https://celoscan.io/tx/${txHash}` :
                network === "Optimism" ? `https://optimistic.etherscan.io/tx/${txHash}` :
                `#`
              }
              target="_blank"
              rel="noopener noreferrer"
              style={{ 
                color: network === "Celo" ? theme.textPrimary : theme.primary,
                textDecoration: 'underline', 
                fontSize: '0.92em' 
              }}
            >
              View transaction on explorer
            </a>
          </div>
        )}
        <button
          style={{ 
            minWidth: '90px', 
            fontSize: '0.92em', 
            padding: '0.38em 0.8em', 
            marginTop: '6px',
            background: network === 'Celo' ? '#e6d72a' : theme.primary,
            color: network === 'Celo' ? '#222' : '#fff',
            border: 'none',
            borderRadius: '6px',
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: `0 2px 8px ${theme.shadow}`,
            transition: 'background 0.2s'
          }}
          onMouseOver={e => {
            if (network === 'Celo') {
              e.currentTarget.style.background = '#e6d72a';
            } else {
              e.currentTarget.style.background = theme.primaryDark;
            }
          }}
          onMouseOut={e => {
            if (network === 'Celo') {
              e.currentTarget.style.background = '#e6d72a';
            } else {
              e.currentTarget.style.background = theme.primary;
            }
          }}
          onClick={onClose}
        >
          OK
        </button>
      </div>
    </div>
  );
};