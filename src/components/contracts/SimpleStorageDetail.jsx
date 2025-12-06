import React from 'react';
import { ethers } from 'ethers';

export const SimpleStorageDetail = ({ theme, setPopup, isConnected, openModal }) => {
    const [copied, setCopied] = React.useState(false);
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
    if (!window.ethereum) {
      setPopup({ visible: true, message: "MetaMask or other wallet required", txHash: null });
      return;
    }
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const tx = await signer.sendTransaction({ data: bytecode });
      const receipt = await tx.wait();
      if (receipt.contractAddress) {
        setPopup({ visible: true, message: `Contract SimpleStorage deployed successfully!`, txHash: tx.hash });
      } else {
        setPopup({ visible: true, message: "Could not get deployed contract address.", txHash: null });
      }
    } catch (err) {
      if (err && err.message && (err.message.includes('user rejected') || err.message.includes('denied'))) {
        setPopup({ visible: true, message: "Transaction aborted by user", txHash: null });
      } else {
        setPopup({ visible: true, message: "Deploy error: " + err.message, txHash: null });
      }
    }
  };

  return (
    <div style={{ maxWidth: 720, margin: '60px auto 32px auto', background: theme.cardBg + 'E6', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.04)', padding: '24px 28px', textAlign: 'left', fontFamily: 'Inter, Arial, sans-serif', fontWeight: 500, fontSize: '0.96em', color: theme.textPrimary }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <h2 style={{ color: theme.textPrimary, fontWeight: 700, fontSize: '1.2em', margin: 0 }}>
          SimpleStorage
        </h2>
        {!isConnected ? (
          <button
            style={{
              minWidth: '70px',
              fontSize: '0.92em',
              padding: '0.32em 0.8em',
              marginLeft: '12px',
              background: theme.gradient,
              color: theme.network === 'celo' ? '#444' : '#fff',
              border: 'none',
              borderRadius: '6px',
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
              marginLeft: '12px',
              background: theme.gradient,
              color: theme.network === 'celo' ? '#444' : '#fff',
              border: 'none',
              borderRadius: '6px',
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
      <div style={{ color: theme.textPrimary, fontWeight: 400, fontSize: '0.96em', marginBottom: '16px', maxWidth: '720px', lineHeight: 1.7 }}>
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
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: theme.codeBg, padding: '8px 18px 8px 18px', borderTopLeftRadius: '10px', borderTopRightRadius: '10px', borderBottom: `1px solid ${theme.highlight}` }}>
          <span style={{ color: '#444', fontSize: '0.86em', fontWeight: 600, letterSpacing: '0.04em' }}>solidity</span>
          <div>
            <button
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
                transition: 'background 0.2s'
              }}
            onClick={() => {
              navigator.clipboard.writeText(sourceCode);
              setCopied(true);
              setTimeout(() => setCopied(false), 1000);
            }}
          >
            {copied ? (
              <span style={{ fontSize: '0.92em', color: '#444', width: 32, textAlign: 'center', display: 'inline-block' }}>✔</span>
            ) : <span style={{ width: 32, textAlign: 'center', display: 'inline-block' }}>Copy</span>}
          </button>
          </div>
        </div>
        <pre style={{ background: theme.cardBgDark, color: '#222', fontSize: '0.9em', fontFamily: 'Fira Mono, Menlo, Monaco, Consolas, monospace', padding: '18px 16px', margin: 0, borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px', overflowX: 'auto', minHeight: '200px' }}>
          {sourceCode}
        </pre>
      </div>
    </div>
  );
};