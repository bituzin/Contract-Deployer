import React, { useState } from 'react';

export const InteractPage = ({ theme, network }) => {
  const [address, setAddress] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{
      maxWidth: 540,
      margin: '80px auto 32px auto',
      background: theme.cardBg + 'E6',
      border: `1px solid ${theme.primary}`,
      borderRadius: 12,
      boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
      padding: '32px 36px',
      textAlign: 'center',
      fontFamily: 'Inter, Arial, sans-serif',
      fontWeight: 500,
      color: theme.textPrimary
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
            outline: 'none',
            boxShadow: 'none',
          }}
          required
          pattern="^0x[a-fA-F0-9]{40}$"
        />
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
      </form>
      {submitted && (
        <div style={{ marginTop: 24, fontSize: '1em', color: theme.primary }}>
          Entered address: {address}
        </div>
      )}
    </div>
  );
};
