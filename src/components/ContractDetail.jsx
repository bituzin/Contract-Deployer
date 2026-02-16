import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { contracts } from '../config/contracts';
import { PageContainer } from './common/PageContainer';
import { BackButton } from './common/BackButton';

export const ContractDetail = ({ theme }) => {
  const { contractName } = useParams();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const toKebabCase = (str) => {
    return str
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .toLowerCase();
  };

  const contract = contracts.find(c => toKebabCase(c.name) === contractName);

  // Kod źródłowy SimpleStorage
  const simpleStorageSource = `// SPDX-License-Identifier: MIT\npragma solidity ^0.8.0;\n\ncontract SimpleStorage {\n    uint256 private value;\n\n    event ValueChanged(uint256 newValue);\n\n    function set(uint256 newValue) public {\n        value = newValue;\n        emit ValueChanged(newValue);\n    }\n\n    function get() public view returns (uint256) {\n        return value;\n    }\n}`;

  if (!contract) {
    return (
      <PageContainer
        theme={theme}
        title="Contract not found"
        backButton={
          <BackButton theme={theme} to="/contracts">
            Go to Contracts
          </BackButton>
        }
        maxWidth={720}
      />
    );
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(contract.bytecode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  const handleDeploy = () => {
    navigate('/deploy');
  };

  return (
    <PageContainer
      theme={theme}
      title={
        <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {contract.name}
          <button
            onClick={handleDeploy}
            style={{
              fontSize: '0.75em',
              padding: '1px 10px',
              background: theme.primary,
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              fontWeight: 500,
              cursor: 'pointer',
              marginLeft: 8,
              boxShadow: `0 1px 4px ${theme.shadow}`,
              transition: 'background 0.2s',
              height: 22,
              lineHeight: '20px',
              minWidth: 48
            }}
            onMouseOver={e => e.currentTarget.style.background = theme.primaryDark}
            onMouseOut={e => e.currentTarget.style.background = theme.primary}
          >
            <span style={{ fontSize: '0.85em', letterSpacing: '0.01em' }}>Deploy</span>
          </button>
        </span>
      }
      backButton={
        <BackButton theme={theme} to="/contracts">
          Go to Contracts
        </BackButton>
      }
      maxWidth={720}
    >
      <div style={{ marginBottom: 28 }}>
        <h3 style={{ 
          color: theme.textPrimary, 
          fontWeight: 600, 
          fontSize: '1.1em', 
          marginBottom: 12,
          marginTop: 0 
        }}>
          Description
        </h3>
        <p style={{ 
          color: theme.textPrimary, 
          lineHeight: 1.6,
          marginBottom: 24 
        }}>
          {contract.description}
        </p>
      </div>

      <div style={{ marginBottom: 32 }}>
        <h3 style={{ 
          color: theme.textPrimary, 
          fontWeight: 600, 
          fontSize: '1.1em', 
          marginBottom: 12,
          marginTop: 0 
        }}>
          Contract Source Code
        </h3>
        <div style={{ 
          marginTop: '8px', 
          borderRadius: '10px', 
          background: theme.codeBg, 
          boxShadow: '0 2px 12px rgba(0,0,0,0.07)', 
          position: 'relative', 
          overflow: 'hidden' 
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            background: theme.codeBg, 
            padding: '8px 18px 8px 18px', 
            borderTopLeftRadius: '10px', 
            borderTopRightRadius: '10px', 
            borderBottom: '1px solid #dbe6f7' 
          }}>
            <span style={{ 
              color: '#444', 
              fontSize: '0.86em', 
              fontWeight: 600, 
              letterSpacing: '0.04em' 
            }}>
              {contract.name} source code
            </span>
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
          <pre style={{ 
            background: theme.cardBgDark, 
            color: '#2a3244', 
            fontSize: '0.95em', 
            fontFamily: 'Fira Mono, Menlo, Monaco, Consolas, monospace', 
            padding: '18px 16px', 
            margin: 0, 
            borderBottomLeftRadius: '10px', 
            borderBottomRightRadius: '10px', 
            whiteSpace: 'pre-wrap', 
            wordBreak: 'break-word', 
            overflowWrap: 'anywhere', 
            minHeight: '120px', 
            letterSpacing: '0.01em' 
          }}>
            {contract.name === 'SimpleStorage' ? simpleStorageSource : contract.bytecode}
          </pre>
        </div>
      </div>
    </PageContainer>
  );
};
