import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { contracts } from '../config/contracts';

export const BytecodeDetail = ({ theme }) => {
  const { contractName } = useParams();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const toKebabCase = (str) => {
    return str
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .toLowerCase();
  };

  const contract = contracts.find(c => toKebabCase(c.name) === contractName);

  if (!contract) {
    return (
      <div style={{ maxWidth: 720, margin: '60px auto 32px auto' }}>
        <div style={{ background: theme.cardBg + 'E6', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.04)', padding: '28px 32px', color: theme.textPrimary, fontSize: '0.96em', fontFamily: 'Inter, Arial, sans-serif', fontWeight: 500, textAlign: 'center', lineHeight: 1.7 }}>
          <h2 style={{ color: theme.textPrimary, fontWeight: 700, fontSize: '1.2em', margin: 0, marginBottom: 18 }}>Contract not found</h2>
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
              transition: 'background 0.2s'
            }}
            onClick={() => navigate('/bytecodes')}
          >
            Back to Bytecodes
          </button>
        </div>
      </div>
    );
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(contract.bytecode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <div style={{ maxWidth: 720, margin: '60px auto 32px auto' }}>
      <div style={{ background: theme.cardBg + 'E6', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.04)', padding: '28px 32px', color: theme.textPrimary, fontSize: '0.96em', fontFamily: 'Inter, Arial, sans-serif', fontWeight: 500, textAlign: 'left', lineHeight: 1.7, minHeight: 320, maxWidth: 720 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
          <h2 style={{ color: theme.textPrimary, fontWeight: 700, fontSize: '1.2em', margin: 0 }}>{contract.name} Bytecode</h2>
          <button
            style={{
              marginLeft: 18,
              fontSize: '0.86em',
              padding: '3px 10px',
              background: theme.cardBg,
              color: theme.textPrimary,
              border: `1px solid ${theme.primary}`,
              borderRadius: '5px',
              fontWeight: 500,
              cursor: 'pointer',
              boxShadow: `0 1px 4px ${theme.shadow}`,
              transition: 'background 0.2s',
            }}
            onClick={() => navigate('/bytecodes')}
          >
            Back to Bytecodes
          </button>
        </div>
        <p style={{ marginBottom: 24 }}>
          Contract compiled with Hardhat version 3.0.10, Solidity compiler version 0.8.30 with 200 runs optimization.
        </p>
        <div style={{ marginBottom: 32 }}>
          <div style={{ marginTop: '8px', borderRadius: '10px', background: theme.codeBg, boxShadow: '0 2px 12px rgba(0,0,0,0.04)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: theme.codeBg, padding: '8px 18px 8px 18px', borderTopLeftRadius: '10px', borderTopRightRadius: '10px', borderBottom: `1px solid ${theme.highlight}` }}>
              <span style={{ color: '#444', fontSize: '0.86em', fontWeight: 600, letterSpacing: '0.04em' }}>{contract.name} bytecode</span>
              <div>
                <button
                  onClick={handleCopy}
                  style={{
                    background: theme.highlight,
                    color: '#444',
                    border: 'none',
                    fontWeight: 500,
                    fontSize: '0.86em',
                    cursor: 'pointer',
                    marginRight: '10px',
                    padding: '2px 10px',
                    borderRadius: '4px',
                    transition: 'background 0.2s',
                    position: 'relative',
                    minWidth: 48,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {copied ? (
                    <span style={{ fontSize: '0.92em', color: '#444', width: 32, textAlign: 'center' }}>✔</span>
                  ) : <span style={{ width: 32, textAlign: 'center' }}>Copy</span>}
                </button>
              </div>
            </div>
            <pre style={{ background: theme.cardBgDark, color: '#222', fontSize: '0.92em', fontFamily: 'Fira Mono, Menlo, Monaco, Consolas, monospace', padding: '18px 16px', margin: 0, borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px', whiteSpace: 'pre-wrap', wordBreak: 'break-word', overflowWrap: 'anywhere', minHeight: '120px' }}>
              {contract.bytecode}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
