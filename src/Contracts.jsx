import React from 'react';

// Zawiera wszystkie komponenty widoków kontraktów jako named exports

export function AbiContract({ theme }) {
  const [show, setShow] = React.useState(false);
  React.useEffect(() => { const t = setTimeout(() => setShow(true), 500); return () => clearTimeout(t); }, []);
  return (
    <div style={{ maxWidth: 843, margin: '60px auto 32px auto', background: theme.bg, borderRadius: 12, boxShadow: theme.shadow, padding: '28px 32px', textAlign: 'left', fontFamily: 'Inter, Arial, sans-serif', fontWeight: 500, fontSize: '1.08em', color: theme.primary, opacity: show ? 1 : 0, transform: show ? 'translateY(0)' : 'translateY(30px)', transition: 'opacity 0.6s, transform 0.6s' }}>
      <p style={{ color: '#E2B13C', fontWeight: 400, fontSize: '1em', lineHeight: '1.6' }}>
        Wklej tutaj ABI (Application Binary Interface) swojego kontraktu, aby zobaczyć jego metody i zdarzenia.<br /><br />
        To okno służy tylko do podglądu i analizy ABI.
      </p>
    </div>
  );
}

export function HomeContract({ theme }) {
  const [show, setShow] = React.useState(false);
  React.useEffect(() => { const t = setTimeout(() => setShow(true), 500); return () => clearTimeout(t); }, []);
  return (
    <div style={{ maxWidth: 540, margin: '60px auto 32px auto', background: theme.bg, borderRadius: 12, boxShadow: theme.shadow, padding: '28px 32px', textAlign: 'center', fontFamily: 'Inter, Arial, sans-serif', fontWeight: 500, fontSize: '1.12em', letterSpacing: '0.01em', opacity: show ? 1 : 0, transform: show ? 'translateY(0)' : 'translateY(30px)', transition: 'opacity 0.6s, transform 0.6s' }}>
      <span style={{ color: '#E2B13C', fontWeight: 700 }}>
        <span style={{ fontSize: '1.08em', fontWeight: 700, display: 'block', marginBottom: '32px' }}>
          Deploy Your Contract – Fast & Secure!
        </span>
        Welcome to panel for deploying smart contracts on Celo, Base and Optimism blockchain.<br /><br />
        Click "Deploy", connect wallet, choose a network, and deploy ready-to-use contracts with a single click!<br /><br />
        Deploy your own contracts in seconds!
      </span>
      <span style={{ fontSize: '0.74em', fontStyle: 'italic', color: '#E2B13C', marginTop: 28, display: 'block', fontFamily: 'Georgia, Times, Times New Roman, serif' }}>
        Currently 4 contracts available. More coming soon.
      </span>
    </div>
  );
}

export function HowItWorksContract({ theme }) {
  const [show, setShow] = React.useState(false);
  React.useEffect(() => { const t = setTimeout(() => setShow(true), 500); return () => clearTimeout(t); }, []);
  return (
    <div style={{ maxWidth: 843, margin: '60px auto 32px auto', background: theme.bg, borderRadius: 12, boxShadow: theme.shadow, padding: '28px 32px', textAlign: 'left', fontFamily: 'Inter, Arial, sans-serif', fontWeight: 500, fontSize: '1.08em', color: theme.primary, opacity: show ? 1 : 0, transform: show ? 'translateY(0)' : 'translateY(30px)', transition: 'opacity 0.6s, transform 0.6s' }}>
      <h2 style={{ color: '#E2B13C', fontWeight: 700, fontSize: '1.3em', margin: 0, marginBottom: '18px' }}>How It Works</h2>
      <p style={{ color: '#E2B13C', fontWeight: 400, fontSize: '1em', lineHeight: '1.6' }}>
        This deployer allows you to deploy pre-compiled smart contracts to multiple blockchain networks with just a few clicks.
        <br /><br />
        <b>Steps:</b>
        <br />
        1. Connect your wallet (MetaMask or compatible)<br />
        2. Choose a contract from the Contracts menu<br />
        3. Select your target network (Base, Celo, Optimism, or Sepolia)<br />
        4. Click Deploy and confirm the transaction<br />
        5. Your contract will be deployed to the blockchain!
      </p>
    </div>
  );
}

export function MyDeploymentsContract({ theme }) {
  const [show, setShow] = React.useState(false);
  React.useEffect(() => { const t = setTimeout(() => setShow(true), 500); return () => clearTimeout(t); }, []);
  return (
    <div style={{ maxWidth: 843, margin: '60px auto 32px auto', background: theme.bg, borderRadius: 12, boxShadow: theme.shadow, padding: '28px 32px', textAlign: 'left', fontFamily: 'Inter, Arial, sans-serif', fontWeight: 500, fontSize: '1.08em', color: theme.primary, opacity: show ? 1 : 0, transform: show ? 'translateY(0)' : 'translateY(30px)', transition: 'opacity 0.6s, transform 0.6s' }}>
      <h2 style={{ color: '#E2B13C', fontWeight: 700, fontSize: '1.3em', margin: 0, marginBottom: '18px' }}>My Deployments</h2>
      <p style={{ color: '#E2B13C', fontWeight: 400, fontSize: '1em', lineHeight: '1.6' }}>
        Your deployment history will appear here.
        <br /><br />
        This feature is coming soon and will show all contracts you've deployed, including contract addresses, deployment dates, and network information.
      </p>
    </div>
  );
}

export function SimpleStorageContract({ isWalletConnected, connectWallet, setPopup, theme }) {
  const [showContract, setShowContract] = React.useState(false);
  React.useEffect(() => { const t = setTimeout(() => setShowContract(true), 500); return () => clearTimeout(t); }, []);
  return (
    <div style={{ maxWidth: 843, margin: '60px auto 32px auto', background: theme.bg, borderRadius: 12, boxShadow: theme.shadow, padding: '28px 32px', textAlign: 'left', fontFamily: 'Inter, Arial, sans-serif', fontWeight: 500, fontSize: '1.08em', color: theme.primary, opacity: showContract ? 1 : 0, transform: showContract ? 'translateY(0)' : 'translateY(30px)', transition: 'opacity 0.6s, transform 0.6s' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
        <h2 style={{ color: theme.primary === '#35D07F' ? '#E2B13C' : '#2563eb', fontWeight: 700, fontSize: '1.3em', margin: 0 }}>SimpleStorage</h2>
      </div>
      <div style={{ color: theme.primary === '#35D07F' ? '#E2B13C' : theme.primary, fontWeight: 400, fontSize: '1.08em', marginBottom: '18px', maxWidth: '843px' }}>
        <b>SimpleStorage is a minimal contract for storing a single integer value on the blockchain.</b>
      </div>
      <div style={{ marginTop: '8px', borderRadius: '10px', background: '#e2e3e6', boxShadow: '0 2px 12px rgba(0,0,0,0.04)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#d3d4d7', padding: '8px 18px 8px 18px', borderTopLeftRadius: '10px', borderTopRightRadius: '10px', borderBottom: '1px solid #bcbec2' }}>
          <span style={{ color: '#444', fontSize: '0.86em', fontWeight: 600, letterSpacing: '0.04em' }}>solidity</span>
        </div>
        <pre style={{ background: '#d3d8e8', color: '#222', fontSize: '1em', fontFamily: 'Fira Mono, Menlo, Monaco, Consolas, monospace', padding: '20px 18px', margin: 0, borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px', overflowX: 'auto', minHeight: '220px' }}>
{`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleStorage {
    uint256 private value;

    function set(uint256 newValue) public {
        value = newValue;
    }

    function get() public view returns (uint256) {
        return value;
    }
}`}
        </pre>
      </div>
    </div>
  );
}

export function ClickCounterContract({ isWalletConnected, connectWallet, setPopup, theme }) {
  const [show, setShow] = React.useState(false);
  React.useEffect(() => { const t = setTimeout(() => setShow(true), 500); return () => clearTimeout(t); }, []);
  return (
    <div style={{ maxWidth: 843, margin: '60px auto 32px auto', background: '#e9eaec', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.04)', padding: '28px 32px', textAlign: 'left', fontFamily: 'Inter, Arial, sans-serif', fontWeight: 500, fontSize: '1.08em', color: '#2563eb', opacity: show ? 1 : 0, transform: show ? 'translateY(0)' : 'translateY(30px)', transition: 'opacity 0.6s, transform 0.6s' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
        <h2 style={{ color: theme.primary === '#35D07F' ? '#E2B13C' : '#2563eb', fontWeight: 700, fontSize: '1.3em', margin: 0 }}>ClickCounter</h2>
      </div>
      <div style={{ marginTop: '8px', borderRadius: '10px', background: '#e2e3e6', boxShadow: '0 2px 12px rgba(0,0,0,0.04)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#d3d4d7', padding: '8px 18px 8px 18px', borderTopLeftRadius: '10px', borderTopRightRadius: '10px', borderBottom: '1px solid #bcbec2' }}>
          <span style={{ color: '#444', fontSize: '0.86em', fontWeight: 600, letterSpacing: '0.04em' }}>solidity</span>
        </div>
        <pre style={{ background: '#d3d8e8', color: '#222', fontSize: '1em', fontFamily: 'Fira Mono, Menlo, Monaco, Consolas, monospace', padding: '20px 18px', margin: 0, borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px', overflowX: 'auto', minHeight: '180px' }}>
{`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ClickCounter {
    uint256 public count;

    function click() public {
        count += 1;
    }

    function getCount() public view returns (uint256) {
        return count;
    }
}`}
        </pre>
      </div>
    </div>
  );
}

export function MessageBoardContract({ isWalletConnected, connectWallet, setPopup, theme }) {
  const [show, setShow] = React.useState(false);
  React.useEffect(() => { const t = setTimeout(() => setShow(true), 500); return () => clearTimeout(t); }, []);
  return (
    <div style={{ maxWidth: 843, margin: '60px auto 32px auto', background: theme.bg, borderRadius: 12, boxShadow: theme.shadow, padding: '28px 32px', textAlign: 'left', fontFamily: 'Inter, Arial, sans-serif', fontWeight: 500, fontSize: '1.08em', color: theme.primary, opacity: show ? 1 : 0, transform: show ? 'translateY(0)' : 'translateY(30px)', transition: 'opacity 0.6s, transform 0.6s' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
        <h2 style={{ color: theme.primary === '#35D07F' ? '#E2B13C' : '#2563eb', fontWeight: 700, fontSize: '1.3em', margin: 0 }}>MessageBoard</h2>
      </div>
      <div style={{ marginTop: '8px', borderRadius: '10px', background: '#e2e3e6', boxShadow: '0 2px 12px rgba(0,0,0,0.04)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#d3d4d7', padding: '8px 18px 8px 18px', borderTopLeftRadius: '10px', borderTopRightRadius: '10px', borderBottom: '1px solid #bcbec2' }}>
          <span style={{ color: '#444', fontSize: '0.86em', fontWeight: 600, letterSpacing: '0.04em' }}>solidity</span>
        </div>
        <pre style={{ background: '#d3d8e8', color: '#222', fontSize: '1em', fontFamily: 'Fira Mono, Menlo, Monaco, Consolas, monospace', padding: '20px 18px', margin: 0, borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px', overflowX: 'auto', minHeight: '180px' }}>
{`// SPDX-License-Identifier: MIT
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
}`}
        </pre>
      </div>
    </div>
  );
}

export function SimpleVotingContract({ isWalletConnected, connectWallet, setPopup, theme }) {
  const [show, setShow] = React.useState(false);
  React.useEffect(() => { const t = setTimeout(() => setShow(true), 500); return () => clearTimeout(t); }, []);
  return (
    <div style={{ maxWidth: 843, margin: '60px auto 32px auto', background: theme.bg, borderRadius: 12, boxShadow: theme.shadow, padding: '28px 32px', textAlign: 'left', fontFamily: 'Inter, Arial, sans-serif', fontWeight: 500, fontSize: '1.08em', color: theme.primary, opacity: show ? 1 : 0, transform: show ? 'translateY(0)' : 'translateY(30px)', transition: 'opacity 0.6s, transform 0.6s' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
        <h2 style={{ color: theme.primary === '#35D07F' ? '#E2B13C' : '#2563eb', fontWeight: 700, fontSize: '1.3em', margin: 0 }}>SimpleVoting</h2>
      </div>
      <div style={{ marginTop: '8px', borderRadius: '10px', background: '#e2e3e6', boxShadow: '0 2px 12px rgba(0,0,0,0.04)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#d3d4d7', padding: '8px 18px 8px 18px', borderTopLeftRadius: '10px', borderTopRightRadius: '10px', borderBottom: '1px solid #bcbec2' }}>
          <span style={{ color: '#444', fontSize: '0.86em', fontWeight: 600, letterSpacing: '0.04em' }}>solidity</span>
        </div>
        <pre style={{ background: '#d3d8e8', color: '#222', fontSize: '1em', fontFamily: 'Fira Mono, Menlo, Monaco, Consolas, monospace', padding: '20px 18px', margin: 0, borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px', overflowX: 'auto', minHeight: '180px' }}>
{`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleVoting {
    enum VoteOption { A, B }
    struct Voter { bool hasVoted; VoteOption vote; }
    mapping(address => Voter) public voters;
    uint256 public voteACount;
    uint256 public voteBCount;

    function vote(VoteOption _vote) public {
        require(!voters[msg.sender].hasVoted, "You have already voted.");
        voters[msg.sender].hasVoted = true;
        voters[msg.sender].vote = _vote;
        if (_vote == VoteOption.A) { voteACount++; } else { voteBCount++; }
    }

    function getResult() public view returns (uint256, uint256) { return (voteACount, voteBCount); }
}`}
        </pre>
      </div>
    </div>
  );
}

export const contractsList = [
  { name: 'SimpleStorage', description: 'Przechowuje liczbę, którą możesz ustawić i odczytać.' },
  { name: 'ClickCounter', description: 'Licznik kliknięć – każdy może zwiększać licznik globalny.' },
  { name: 'MessageBoard', description: 'Tablica wiadomości – każdy może zapisać i odczytać ostatnią wiadomość oraz nadawcę.' },
  { name: 'SimpleVoting', description: 'Głosowanie – każdy może zagłosować na opcję A lub B.' }
];

export default null;
