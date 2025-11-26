import React from 'react';
import { ethers } from 'ethers';

export const SimpleVotingDetail = ({ theme, isWalletConnected, connectWallet, setPopup }) => {
  const bytecode = "0x6080604052348015600e575f5ffd5b5060f38061001b5f395ff3fe6080604052348015600e575f5ffd5b50600436106044575f3560e01c80633c8d0bec14604857806355416e06146061578063847d52d6146069578063fb32aedb146071575b5f5ffd5b604f5f5481565b60405190815260200160405180910390f35b60676077565b005b604f60015481565b6067608d565b60015f5f828254608691906099565b9091555050565b6001805f828254608691905b8082018082111560b757634e487b7160e01b5f52601160045260245ffd5b9291505056fea26469706673582212201a53748d74d7a82011e00c648f970427f5f2a16a963e42bc8d7208522d889f1b64736f6c634300081e0033";

  const sourceCode = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleVoting {
    enum VoteOption { A, B }
    struct Voter {
        bool hasVoted;
        VoteOption vote;
    }
    mapping(address => Voter) public voters;
    uint256 public voteACount;
    uint256 public voteBCount;

    function vote(VoteOption _vote) public {
        require(!voters[msg.sender].hasVoted, "You have already voted.");
        voters[msg.sender].hasVoted = true;
        voters[msg.sender].vote = _vote;
        if (_vote == VoteOption.A) {
            voteACount++;
        } else {
            voteBCount++;
        }
    }

    function getResult() public view returns (uint256, uint256) {
        return (voteACount, voteBCount);
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
        setPopup({ visible: true, message: `Contract SimpleVoting deployed successfully!`, txHash: tx.hash });
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
    <div style={{ maxWidth: 720, margin: '60px auto 32px auto', background: theme.cardBg, borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.04)', padding: '24px 28px', textAlign: 'left', fontFamily: 'Inter, Arial, sans-serif', fontWeight: 500, fontSize: '0.96em', color: theme.textPrimary }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <h2 style={{ color: theme.textPrimary, fontWeight: 700, fontSize: '1.2em', margin: 0 }}>SimpleVoting</h2>
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
      <div style={{ color: theme.textPrimary, fontWeight: 400, fontSize: '0.96em', marginBottom: '16px', maxWidth: '720px', lineHeight: 1.7 }}>
        SimpleVoting is a basic contract for on-chain polls. Users can vote for option A or B, and the contract keeps track of the total votes for each. This contract is ideal for learning about voting mechanisms, consensus, and transparent decision-making on blockchain. All votes are public and anyone can check the results.
        <div style={{ marginTop: 16, marginBottom: 0, fontWeight: 700, color: theme.textSecondary, fontSize: '0.98em' }}>Function:</div>
        <ul style={{ marginTop: 14, marginBottom: 0, paddingLeft: 18 }}>
          <li style={{ color: theme.textSecondary, fontSize: '0.96em', fontWeight: 500 }}>
            <span style={{ background: theme.highlight, color: '#23272e', borderRadius: '8px', fontFamily: 'Fira Mono, Menlo, Monaco, Consolas, monospace', fontSize: '0.96em', padding: '3px 12px', marginRight: 8, display: 'inline-block' }}>voteA()</span>&nbsp;&ndash;&nbsp;casts a vote for option a. each user can vote only once.<div style={{ height: '24px' }}></div>
          </li>
          <li style={{ color: theme.textSecondary, fontSize: '0.96em', fontWeight: 500 }}>
            <span style={{ background: theme.highlight, color: '#23272e', borderRadius: '8px', fontFamily: 'Fira Mono, Menlo, Monaco, Consolas, monospace', fontSize: '0.96em', padding: '3px 12px', marginRight: 8, display: 'inline-block' }}>voteB()</span>&nbsp;&ndash;&nbsp;casts a vote for option b. each user can vote only once.<div style={{ height: '24px' }}></div>
          </li>
          <li style={{ color: theme.textSecondary, fontSize: '0.96em', fontWeight: 500 }}>
            <span style={{ background: theme.highlight, color: '#23272e', borderRadius: '8px', fontFamily: 'Fira Mono, Menlo, Monaco, Consolas, monospace', fontSize: '0.96em', padding: '3px 12px', marginRight: 8, display: 'inline-block' }}>getVotesA()</span>&nbsp;&ndash;&nbsp;returns the total number of votes for option a.<div style={{ height: '24px' }}></div>
          </li>
          <li style={{ color: theme.textSecondary, fontSize: '0.96em', fontWeight: 500 }}>
            <span style={{ background: theme.highlight, color: '#23272e', borderRadius: '8px', fontFamily: 'Fira Mono, Menlo, Monaco, Consolas, monospace', fontSize: '0.96em', padding: '3px 12px', marginRight: 8, display: 'inline-block' }}>getVotesB()</span>&nbsp;&ndash;&nbsp;returns the total number of votes for option b.<div style={{ height: '24px' }}></div>
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
        <pre style={{ background: theme.cardBgDark, color: '#222', fontSize: '0.9em', fontFamily: 'Fira Mono, Menlo, Monaco, Consolas, monospace', padding: '18px 16px', margin: 0, borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px', overflowX: 'auto', minHeight: '160px' }}>
          {sourceCode}
        </pre>
      </div>
    </div>
  );
};