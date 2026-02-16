import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { contracts } from '../config/contracts';
import { PageContainer } from './common/PageContainer';
import { BackButton } from './common/BackButton';

export const BytecodeDetail = ({ theme }) => {
  const { contractName } = useParams();
  const [copied, setCopied] = useState(false);

  const toKebabCase = (str) => {
    return str
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .toLowerCase();
  };

  const contract = contracts.find(c => toKebabCase(c.name) === contractName);

  if (!contract) {
    return (
      <PageContainer
        theme={theme}
        title="Contract not found"
        backButton={
          <BackButton theme={theme} to="/bytecodes">
            Go to Bytecodes
          </BackButton>
        }
        maxWidth={900}
      />
    );
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(contract.bytecode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <PageContainer
      theme={theme}
      title={`${contract.name} Bytecode`}
      backButton={
        <BackButton theme={theme} to="/bytecodes">
          Go to Bytecodes
        </BackButton>
      }
      maxWidth={900}
    >
      <p style={{ marginBottom: 24 }}>
        Contract compiled with Hardhat version 3.0.10, Solidity compiler version 0.8.30 with 200 runs optimization.
      </p>
        <div style={{ marginBottom: 32 }}>
          <div style={{ marginTop: '8px', borderRadius: '10px', background: theme.codeBg, boxShadow: '0 2px 12px rgba(0,0,0,0.07)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: theme.codeBg, padding: '8px 18px 8px 18px', borderTopLeftRadius: '10px', borderTopRightRadius: '10px', borderBottom: '1px solid #dbe6f7' }}>
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
            <pre style={{ background: theme.cardBgDark, color: '#2a3244', fontSize: '0.95em', fontFamily: 'Fira Mono, Menlo, Monaco, Consolas, monospace', padding: '18px 16px', margin: 0, borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px', whiteSpace: 'pre-wrap', wordBreak: 'break-word', overflowWrap: 'anywhere', minHeight: '120px', letterSpacing: '0.01em' }}>
              {contract.bytecode}
            </pre>
          </div>
        </div>
    </PageContainer>
  );
};
