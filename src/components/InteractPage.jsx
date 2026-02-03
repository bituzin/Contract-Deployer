import React, { useState, useEffect } from 'react';
import { fetchAbiFromExplorer } from '../utils/fetchAbiFromExplorer';
import { fetchCodeFromRpc } from '../utils/fetchCodeFromRpc';

export const InteractPage = ({ theme, network }) => {
  const [address, setAddress] = useState('');
    // Clear address input when network changes
    useEffect(() => {
      setAddress('');
      setSubmitted(false);
      setAbi(null);
      setAbiError(null);
    }, [network]);
  const [submitted, setSubmitted] = useState(false);
  const [abi, setAbi] = useState(null);
  const [abiError, setAbiError] = useState(null);
  const [loadingAbi, setLoadingAbi] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    setAbi(null);
    setAbiError(null);
    setLoadingAbi(true);
    try {
      // Najpierw sprawdź, czy pod adresem jest kod kontraktu
      const code = await fetchCodeFromRpc(address, network);
      if (!code || code === '0x' || code === '0x0') {
        setAbiError('No contract deployed at this address on ' + network + '.');
        setLoadingAbi(false);
        return;
      }
      const apiKey = import.meta.env.VITE_EXPLORER_API_KEY;
      const abiResult = await fetchAbiFromExplorer(address, network, apiKey);
      setAbi(abiResult);
    } catch (err) {
      setAbiError(err.message);
    } finally {
      setLoadingAbi(false);
    }
  };

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
        maxWidth: 540,
        width: '100%',
        border: `1px solid ${theme.primary}`,
        borderRadius: 10,
        boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
        padding: '28px 32px',
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
      {loadingAbi && (
        <div style={{ marginTop: 24, fontSize: '1em', color: theme.textSecondary }}>
          Fetching ABI from explorer...
        </div>
      )}
      {abiError && (
        <div style={{ marginTop: 24, fontSize: '1em', color: 'red' }}>
          {abiError}
        </div>
      )}
      {abi && (
        <div style={{ marginTop: 24, textAlign: 'left' }}>
          <div style={{ fontWeight: 700, marginBottom: 8, color: theme.primary }}>Contract Functions:</div>
          <ul style={{ fontSize: '0.98em', color: theme.textPrimary, paddingLeft: 18 }}>
            {abi.filter(f => f.type === 'function').map((fn, idx) => (
              <li key={idx} style={{ marginBottom: 6 }}>
                <span style={{ fontFamily: 'Fira Mono, monospace', color: theme.textSecondary }}>
                  {fn.name}({fn.inputs.map(i => i.type).join(', ')})
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
      </div>
    </div>
  );
};
