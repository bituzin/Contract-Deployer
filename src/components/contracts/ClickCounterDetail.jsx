import React from 'react';
import { ethers } from 'ethers';

export const ClickCounterDetail = ({ theme, isWalletConnected, connectWallet, setPopup }) => {
  const bytecode = "0x6080604052348015600e575f5ffd5b5060c580601a5f395ff3fe6080604052348015600e575f5ffd5b50600436106030575f3560e01c806306661abd1460345780637d55923d14604d575b5f5ffd5b603b5f5481565b60405190815260200160405180910390f35b60536055565b005b60015f5f82825460649190606b565b9091555050565b80820180821115608957634e487b7160e01b5f52601160045260245ffd5b9291505056fea26469706673582212205c59a7297bf9296c81d569fd83247fe0bf9f7d0951f5a677a17656223aaee51864736f6c634300081e0033";

  const sourceCode = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ClickCounter {
    uint256 public count;

    function click() public {
        count += 1;
    }

    function getCount() public view returns (uint256) {
        return count;
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
        setPopup({ visible: true, message: `Contract ClickCounter deployed successfully!`, txHash: tx.hash });
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
    <div style={{ maxWidth: 843, margin: '60px auto 32px auto', background: theme.cardBg, borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.04)', padding: '28px 32px', textAlign: 'left', fontFamily: 'Inter, Arial, sans-serif', fontWeight: 500, fontSize: '1.08em', color: theme.textPrimary }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
        <h2 style={{ color: theme.textPrimary, fontWeight: 700, fontSize: '1.3em', margin: 0 }}>ClickCounter</h2>
        {!isWalletConnected ? (
          <button
            style={{
              minWidth: '70px',
              fontSize: '0.92em',
              padding: '0.32em 0.8em',
              marginLeft: '12px',
              background: theme.gradient,
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 500,
              cursor: 'pointer',
              boxShadow: `0 2px 8px ${theme.shadow}`,
              transition: 'background 0.2s'
            }}
            onMouseOver={e => e.currentTarget.style.background = theme.gradientHover}
            onMouseOut={e => e.currentTarget.style.background = theme.gradient}
            onClick={connectWallet}
          >Connect</button>
        ) : (
          <button
            style={{
              minWidth: '70px',
              fontSize: '0.92em',
              padding: '0.32em 0.8em',
              marginLeft: '12px',
              background: theme.gradient,
              color: '#fff',
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
      <div style={{ color: theme.textPrimary, fontWeight: 400, fontSize: '1.08em', marginBottom: '18px', maxWidth: '843px' }}>
        <b>ClickCounter is a public contract that tracks the total number of times users have interacted with it. Every call to increment increases the global counter, making it a great example for event tracking, gamification, or simple analytics on-chain. The contract is open to everyone, so the count reflects all user activity.</b>
        <div style={{ marginTop: 18, marginBottom: 0, fontWeight: 700, color: theme.textSecondary, fontSize: '1.04em' }}>Function:</div>
        <ul style={{ marginTop: 16, marginBottom: 0, paddingLeft: 18 }}>
          <li style={{ color: theme.textSecondary, fontSize: '1.04em', fontWeight: 500 }}>
            <span style={{ background: theme.highlight, color: '#23272e', borderRadius: '8px', fontFamily: 'Fira Mono, Menlo, Monaco, Consolas, monospace', fontSize: '1.04em', padding: '3px 14px', marginRight: 8, display: 'inline-block' }}>increment()</span>&nbsp;&ndash;&nbsp;increases the counter by one. anyone can call this function, and each call is recorded in the total count.<div style={{ height: '32px' }}></div>
          </li>
          <li style={{ color: theme.textSecondary, fontSize: '1.04em', fontWeight: 500 }}>
            <span style={{ background: theme.highlight, color: '#23272e', borderRadius: '8px', fontFamily: 'Fira Mono, Menlo, Monaco, Consolas, monospace', fontSize: '1.04em', padding: '3px 14px', marginRight: 8, display: 'inline-block' }}>getCount()</span>&nbsp;&ndash;&nbsp;returns the current value of the counter. this lets anyone see how many times the contract has been used.<div style={{ height: '32px' }}></div>
          </li>
        </ul>
      </div>
      <div style={{ marginTop: '8px', borderRadius: '10px', background: theme.codeBg, boxShadow: '0 2px 12px rgba(0,0,0,0.04)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: theme.codeBg, padding: '8px 18px 8px 18px', borderTopLeftRadius: '10px', borderTopRightRadius: '10px', borderBottom: `1px solid ${theme.highlight}` }}>
          <span style={{ color: '#444', fontSize: '0.86em', fontWeight: 600, letterSpacing: '0.04em' }}>solidity</span>
          <div>
            <button
              onClick={() => navigator.clipboard.writeText(sourceCode)}
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
            >
              Copy
            </button>
          </div>
        </div>
        <pre style={{ background: theme.cardBgDark, color: '#222', fontSize: '1em', fontFamily: 'Fira Mono, Menlo, Monaco, Consolas, monospace', padding: '20px 18px', margin: 0, borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px', overflowX: 'auto', minHeight: '180px' }}>
          {sourceCode}
        </pre>
      </div>
    </div>
  );
};