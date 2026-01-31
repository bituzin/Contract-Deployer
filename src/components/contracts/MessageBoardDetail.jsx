import React from 'react';
import { ethers } from 'ethers';
import { useAccount } from 'wagmi';
import { useDeployments } from '../../hooks/useDeployments';

export const MessageBoardDetail = ({ theme, setPopup, isConnected, openModal, network = 'Celo' }) => {
  const { address } = useAccount();
  const { addDeployment } = useDeployments(address);
  const [copied, setCopied] = React.useState(false);
  const [deployLoading, setDeployLoading] = React.useState(false);
  const bytecode = "0x6080604052348015600e575f5ffd5b506103768061001c5f395ff3fe608060405234801561000f575f5ffd5b506004361061003f575f3560e01c806367e404ce146100435780638ee93cf314610073578063e21f37ce14610088575b5f5ffd5b600154610056906001600160a01b031681565b6040516001600160a01b0390911681526020015b60405180910390f35b61008661008136600461014b565b61009d565b005b6100906100c0565b60405161006a91906101b9565b5f6100a9828483610286565b5050600180546001600160a01b0319163317905550565b5f80546100cc90610202565b80601f01602080910402602001604051908101604052809291908181526020018280546100f890610202565b80156101435780601f1061011a57610100808354040283529160200191610143565b820191905f5260205f20905b81548152906001019060200180831161012657829003601f168201915b505050505081565b5f5f6020838503121561015c575f5ffd5b823567ffffffffffffffff811115610172575f5ffd5b8301601f81018513610182575f5ffd5b803567ffffffffffffffff811115610198575f5ffd5b8560208284010111156101a9575f5ffd5b6020919091019590945092505050565b602081525f82518060208401528060208501604085015e5f604082850101526040601f19601f83011684010191505092915050565b634e487b7160e01b5f52604160045260245ffd5b600181811c9082168061021657607f821691505b60208210810361023457634e487b7160e01b5f52602260045260245ffd5b50919050565b601f82111561028157805f5260205f20601f840160051c8101602085101561025f5750805b601f840160051c820191505b8181101561027e575f815560010161026b565b50505b505050565b67ffffffffffffffff83111561029e5761029e6101ee565b6102b2836102ac8354610202565b8361023a565b5f601f8411600181146102e3575f85156102cc5750838201355b5f19600387901b1c1916600186901b17835561027e565b5f83815260208120601f198516915b8281101561031257868501358255602094850194600190920191016102f2565b508682101561032e575f1960f88860031b161c19848701351681555b505060018560011b018355505050505056fea2646970667358221220369ab01a8ce8b8fae58c1f79d97601fbb8379c718b452681b24bf355af80a20b64736f6c634300081e0033";

  const sourceCode = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

contract MessageBoard {
    string public message;
    address public sender;

    function post(string calldata _message) external {
        message = _message;
        sender = msg.sender;
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
        addDeployment('MessageBoard', receipt.contractAddress, network, tx.hash);
        setPopup({ visible: true, message: `Contract MessageBoard deployed successfully!`, txHash: tx.hash });
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
        <h2 style={{ color: theme.textPrimary, fontWeight: 700, fontSize: '1.2em', margin: 0 }}>
          MessageBoard
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
              marginLeft: '12px',
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
      <div style={{ color: theme.textPrimary, fontWeight: 500, fontSize: '0.96em', fontFamily: 'Inter, Arial, sans-serif', marginBottom: '14px', maxWidth: '1000px', lineHeight: 1.7, textAlign: 'left' }}>
        MessageBoard is a simple public contract for posting and reading messages. Each new message overwrites the previous one and records the sender's address. This contract is useful for public announcements, feedback, or as a basic communication tool on-chain. All users share the same board, so only the latest message is visible.
        <div style={{ marginTop: 16, marginBottom: 0, fontWeight: 700, color: theme.textSecondary, fontSize: '0.98em' }}>Functions:</div>
        <ul style={{ marginTop: 14, marginBottom: 0, paddingLeft: 18 }}>
          <li style={{ color: theme.textSecondary, fontSize: '0.96em', fontWeight: 500 }}>
            <span style={{ background: theme.highlight, color: '#23272e', borderRadius: '8px', fontFamily: 'Fira Mono, Menlo, Monaco, Consolas, monospace', fontSize: '0.96em', padding: '3px 12px', marginRight: 8, display: 'inline-block' }}>post(string _message)</span>&nbsp;&ndash;&nbsp;posts a new message to the board and records your address as the sender.<div style={{ height: '24px' }}></div>
          </li>
          <li style={{ color: theme.textSecondary, fontSize: '0.96em', fontWeight: 500 }}>
            <span style={{ background: theme.highlight, color: '#23272e', borderRadius: '8px', fontFamily: 'Fira Mono, Menlo, Monaco, Consolas, monospace', fontSize: '0.96em', padding: '3px 12px', marginRight: 8, display: 'inline-block' }}>message()</span>&nbsp;&ndash;&nbsp;returns the latest message posted to the board.<div style={{ height: '24px' }}></div>
          </li>
          <li style={{ color: theme.textSecondary, fontSize: '0.96em', fontWeight: 500 }}>
            <span style={{ background: theme.highlight, color: '#23272e', borderRadius: '8px', fontFamily: 'Fira Mono, Menlo, Monaco, Consolas, monospace', fontSize: '0.96em', padding: '3px 12px', marginRight: 8, display: 'inline-block' }}>sender()</span>&nbsp;&ndash;&nbsp;returns the address of the user who posted the last message.<div style={{ height: '24px' }}></div>
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
        <pre style={{ background: theme.cardBgDark, color: '#222', fontSize: '0.9em', fontFamily: 'Fira Mono, Menlo, Monaco, Consolas, monospace', padding: '18px 16px', margin: 0, borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px', overflowX: 'auto', minHeight: '160px' }}>
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