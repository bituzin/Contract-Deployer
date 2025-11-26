import React from 'react';
import { ethers } from 'ethers';

export const MessageBoardDetail = ({ theme, isWalletConnected, connectWallet, setPopup }) => {
  const bytecode = "0x6080604052348015600e575f5ffd5b506103ba8061001c5f395ff3fe608060405234801561000f575f5ffd5b506004361061003f575f3560e01c8063256fec881461004357806332970710146100735780636630f88f14610088575b5f5ffd5b600154610056906001600160a01b031681565b6040516001600160a01b0390911681526020015b60405180910390f35b61007b61009d565b60405161006a9190610149565b61009b610096366004610192565b610128565b005b5f80546100a990610245565b80601f01602080910402602001604051908101604052809291908181526020018280546100d590610245565b80156101205780601f106100f757610100808354040283529160200191610120565b820191905f5260205f20905b81548152906001019060200180831161010357829003601f168201915b505050505081565b5f61013382826102c9565b5050600180546001600160a01b03191633179055565b602081525f82518060208401528060208501604085015e5f604082850101526040601f19601f83011684010191505092915050565b600181811c9082168061025957607f821691505b60208210810361027757634e487b7160e01b5f52602260045260245ffd5b50919050565b601f8211156102c457805f5260205f20601f840160051c810160208510156102a25750805b601f840160051c820191505b818110156102c1575f81556001016102ae565b50505b505050565b815167ffffffffffffffff8111156102e3576102e361017e565b6102f7816102f18454610245565b8461027d565b6020601f821160018114610329575f83156103125750848201515b5f19600385901b1c1916600184901b1784556102c1565b5f84815260208120601f198516915b828110156103585787850151825560209485019460019092019101610338565b508482101561037557868401515f19600387901b60f8161c191681555b50505050600190811b0190555056fea264697066735822122081aa54c8ed61172532a488e962737c95dfb429d257ad3221825fb2c89316835664736f6c634300081e0033";

  const sourceCode = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MessageBoard {
    string private lastMessage;
    address private lastSender;

    function sendMessage(string calldata message) public {
        lastMessage = message;
        lastSender = msg.sender;
    }

    function getLastMessage() public view returns (string memory, address) {
        return (lastMessage, lastSender);
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
        setPopup({ visible: true, message: `Contract MessageBoard deployed successfully!`, txHash: tx.hash });
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
        <h2 style={{ color: theme.textPrimary, fontWeight: 700, fontSize: '1.2em', margin: 0 }}>MessageBoard</h2>
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
        MessageBoard is a simple public contract for posting and reading messages. Each new message overwrites the previous one and records the sender's address. This contract is useful for public announcements, feedback, or as a basic communication tool on-chain. All users share the same board, so only the latest message is visible.
        <div style={{ marginTop: 16, marginBottom: 0, fontWeight: 700, color: theme.textSecondary, fontSize: '0.98em' }}>Function:</div>
        <ul style={{ marginTop: 14, marginBottom: 0, paddingLeft: 18 }}>
          <li style={{ color: theme.textSecondary, fontSize: '0.96em', fontWeight: 500 }}>
            <span style={{ background: theme.highlight, color: '#23272e', borderRadius: '8px', fontFamily: 'Fira Mono, Menlo, Monaco, Consolas, monospace', fontSize: '0.96em', padding: '3px 12px', marginRight: 8, display: 'inline-block' }}>setMessage(string message)</span>&nbsp;&ndash;&nbsp;saves a new message and the sender's address. the previous message is replaced. great for simple chat or notifications.<div style={{ height: '24px' }}></div>
          </li>
          <li style={{ color: theme.textSecondary, fontSize: '0.96em', fontWeight: 500 }}>
            <span style={{ background: theme.highlight, color: '#23272e', borderRadius: '8px', fontFamily: 'Fira Mono, Menlo, Monaco, Consolas, monospace', fontSize: '0.96em', padding: '3px 12px', marginRight: 8, display: 'inline-block' }}>getMessage()</span>&nbsp;&ndash;&nbsp;returns the latest message posted to the board.<div style={{ height: '24px' }}></div>
          </li>
          <li style={{ color: theme.textSecondary, fontSize: '0.96em', fontWeight: 500 }}>
            <span style={{ background: theme.highlight, color: '#23272e', borderRadius: '8px', fontFamily: 'Fira Mono, Menlo, Monaco, Consolas, monospace', fontSize: '0.96em', padding: '3px 12px', marginRight: 8, display: 'inline-block' }}>getSender()</span>&nbsp;&ndash;&nbsp;returns the address of the user who posted the last message.<div style={{ height: '24px' }}></div>
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