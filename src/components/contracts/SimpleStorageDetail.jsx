import React from 'react';
import { BackButton } from '../common/BackButton';
import { ethers } from 'ethers';
import { useAccount } from 'wagmi';
import { useDeployments } from '../../hooks/useDeployments';

export const SimpleStorageDetail = ({ theme, setPopup, isConnected, openModal, network = 'Celo' }) => {
  const { address } = useAccount();
  const { addDeployment } = useDeployments(address);
  const [copied, setCopied] = React.useState(false);
  const [deployLoading, setDeployLoading] = React.useState(false);
  const bytecode = "0x6080604052348015600e575f5ffd5b5060ba80601a5f395ff3fe6080604052348015600e575f5ffd5b5060043610603a575f3560e01c806309ce9ccb14603e5780633fb5c1cb146057578063f2c9ecd8146068575b5f5ffd5b60455f5481565b60405190815260200160405180910390f35b60666062366004606e565b5f55565b005b5f546045565b5f60208284031215607d575f5ffd5b503591905056fea26469706673582212200cf668aaa1a8919f982a5eb6458914b17b8d63ca0f5c3aac933d33cc0699e59264736f6c634300081e0033";

  const sourceCode = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleStorage {
    uint256 private value;

    function set(uint256 newValue) public {
        value = newValue;
    }

    function get() public view returns (uint256) {
        return value;
    }
}`;

  const handleDeploy = async () => {
    setDeployLoading(true);
    if (!window.ethereum) {
      setPopup({ visible: true, message: "MetaMask or other wallet required", txHash: null });
      setDeployLoading(false);
      return;
    }
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const tx = await signer.sendTransaction({ data: bytecode });
      const receipt = await tx.wait();
      setDeployLoading(false);
      if (receipt.contractAddress) {
        addDeployment('SimpleStorage', receipt.contractAddress, network, tx.hash);
        setPopup({ visible: true, message: `Contract SimpleStorage deployed successfully!`, txHash: tx.hash });
      } else {
        setPopup({ visible: true, message: "Could not get deployed contract address.", txHash: null });
      }
    } catch (err) {
      setDeployLoading(false);
      if (err && err.message && (err.message.includes('user rejected') || err.message.includes('denied'))) {
        setPopup({ visible: true, message: "Transaction aborted by user", txHash: null });
      } else {
        setPopup({ visible: true, message: "Deploy error: " + err.message, txHash: null });
      }
    }
  };

  return (
    <div style={{ maxWidth: 1000, margin: '60px auto 32px auto', background: theme.cardBg + 'E6', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.04)', padding: '24px 28px', textAlign: 'left', fontFamily: 'Inter, Arial, sans-serif', fontWeight: 500, fontSize: '0.96em', color: theme.textPrimary }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <h2 style={{ color: theme.textPrimary, fontWeight: 700, fontSize: '1.2em', margin: 0 }}>
              SimpleStorage
            </h2>
            {!isConnected ? (
              <button
                style={{
                  minWidth: '70px',
                  fontSize: '0.92em',
                  padding: '0.32em 0.8em',
                  background: theme.gradient,
                  color: theme.network === 'celo' ? '#444' : '#fff',
                  border: `1px solid ${theme.primary}`,
                  borderRadius: '10px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  boxShadow: `0 2px 8px ${theme.shadow}`,
                  transition: 'background 0.2s'
                }}
                onMouseOver={e => e.currentTarget.style.background = theme.gradientHover}
                onMouseOut={e => e.currentTarget.style.background = theme.gradient}
                onClick={openModal}
              >Connect</button>
            ) : (
              <button
                style={{
                  minWidth: '70px',
                  fontSize: '0.92em',
                  padding: '0.32em 0.8em',
                  background: theme.gradient,
                  color: theme.network === 'celo' ? '#444' : '#fff',
                  border: `1px solid ${theme.primary}`,
                  borderRadius: '10px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  boxShadow: `0 2px 8px ${theme.shadow}`,
                  transition: 'background 0.2s'
                }}
                onMouseOver={e => e.currentTarget.style.background = theme.gradientHover}
                onMouseOut={e => e.currentTarget.style.background = theme.gradient}
                onClick={handleDeploy}
              >Deploy</button>
            )}
          </div>
          <BackButton theme={theme} to="/contracts">Go to Contracts</BackButton>
        </div>
        <div style={{ color: theme.textPrimary, fontWeight: 500, fontSize: '0.96em', fontFamily: 'Inter, Arial, sans-serif', marginBottom: '14px', maxWidth: '1000px', lineHeight: 1.7, textAlign: 'left' }}>
        SimpleStorage is a minimal contract for storing a single integer value on the blockchain. It is perfect for learning, testing, and demonstrating how persistent storage works in smart contracts. Anyone can update the value, and anyone can read it at any time. There are no restrictions or access controls, making it ideal for public demos and tutorials.
        <div style={{ marginTop: 16, marginBottom: 0, fontWeight: 700, color: theme.textSecondary, fontSize: '0.98em' }}>Function:</div>
        <ul style={{ marginTop: 14, marginBottom: 0, paddingLeft: 18 }}>
          <li style={{ color: theme.textSecondary, fontSize: '0.96em', fontWeight: 500 }}>
            <span style={{ background: theme.highlight, color: '#23272e', borderRadius: '8px', fontFamily: 'Fira Mono, Menlo, Monaco, Consolas, monospace', fontSize: '0.96em', padding: '3px 12px', marginRight: 8, display: 'inline-block' }}>set(uint256 newValue)</span>&nbsp;&ndash;&nbsp;allows anyone to set a new integer value. the previous value is overwritten. useful for storing simple data or as a base for more complex contracts.<div style={{ height: '24px' }}></div>
          </li>
          <li style={{ color: theme.textSecondary, fontSize: '0.96em', fontWeight: 500 }}>
            <span style={{ background: theme.highlight, color: '#23272e', borderRadius: '8px', fontFamily: 'Fira Mono, Menlo, Monaco, Consolas, monospace', fontSize: '0.96em', padding: '3px 12px', marginRight: 8, display: 'inline-block' }}>get()</span>&nbsp;&ndash;&nbsp;returns the current stored value. anyone can call this to read the latest number saved in the contract.<div style={{ height: '24px' }}></div>
          </li>
        </ul>
      </div>
      <div style={{ marginTop: '8px', borderRadius: '10px', background: theme.codeBg, boxShadow: '0 2px 12px rgba(0,0,0,0.04)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: theme.codeBg, padding: '8px 18px 8px 18px', borderTopLeftRadius: '10px', borderTopRightRadius: '10px', borderBottom: '1px solid #dbe6f7' }}>
          <span style={{ color: '#444', fontSize: '0.86em', fontWeight: 600, letterSpacing: '0.04em' }}>solidity</span>
          <div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(sourceCode);
                setCopied(true);
                setTimeout(() => setCopied(false), 1000);
              }}
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
        <pre style={{ background: theme.cardBgDark, color: '#222', fontSize: '0.9em', fontFamily: 'Fira Mono, Menlo, Monaco, Consolas, monospace', padding: '18px 16px', margin: 0, borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px', overflowX: 'auto', minHeight: '200px' }}>
          {sourceCode}
        </pre>
      </div>
      {deployLoading && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column'
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            border: `4px solid ${theme.primary}`,
            borderTop: '4px solid transparent',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
          <div style={{
            marginTop: '20px',
            color: '#fff',
            fontSize: '1.1em',
            fontWeight: 600,
            textShadow: '0 2px 4px rgba(0,0,0,0.5)'
          }}>
            Processing transaction...
          </div>
        </div>
      )}
    </div>
  );
};