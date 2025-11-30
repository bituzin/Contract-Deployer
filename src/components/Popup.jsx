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
          borderRadius: 14,
          boxShadow: `0 2px 16px ${theme.shadow}`,
          padding: '32px 38px',
          minWidth: 320,
          maxWidth: 420,
          textAlign: 'center',
          fontFamily: 'Inter, Arial, sans-serif',
          fontWeight: 500,
          fontSize: '1.08em',
          color: theme.textPrimary,
          position: 'relative',
        }}
      >
        <div style={{ marginBottom: txHash ? 18 : 28 }}>
          {message}
        </div>
        {txHash && (
          <div style={{ marginBottom: 18 }}>
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
                fontSize: '0.98em' 
              }}
            >
              View transaction on explorer
            </a>
          </div>
        )}
        <button
          style={{ 
            minWidth: '120px', 
            fontSize: '0.98em', 
            padding: '0.5em 1.1em', 
            marginTop: '8px',
            background: theme.gradient,
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: `0 2px 8px ${theme.shadow}`,
            transition: 'background 0.2s'
          }}
          onMouseOver={e => e.currentTarget.style.background = theme.gradientHover}
          onMouseOut={e => e.currentTarget.style.background = theme.gradient}
          onClick={onClose}
        >
          OK
        </button>
      </div>
    </div>
  );
};