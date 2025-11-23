import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ethers } from "ethers";
import { useTheme } from "./hooks/useTheme";
import { Header } from "./components/Header";
import { Popup } from "./components/Popup";
import { SimpleStorageDetail } from "./components/contracts/SimpleStorageDetail";
import { ClickCounterDetail } from "./components/contracts/ClickCounterDetail";
import { MessageBoardDetail } from "./components/contracts/MessageBoardDetail";
import { SimpleVotingDetail } from "./components/contracts/SimpleVotingDetail";
import { contracts } from "./config/contracts";
import { networks, getNetworkParam } from "./config/networks";

function App() {
  const [showHeader, setShowHeader] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [showWelcome, setShowWelcome] = useState(false);
  const [popup, setPopup] = useState({ visible: false, message: "", txHash: null });
  const [network, setNetwork] = useState("Base");
  const [showNav, setShowNav] = useState(false);

  // Użyj hooka do obsługi motywu
  const theme = useTheme(network);

  // Animacje przy starcie
  React.useEffect(() => {
    const timer = setTimeout(() => setShowHeader(true), 500);
    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    if (showHeader) {
      const timerNav = setTimeout(() => setShowNav(true), 500);
      const timerWelcome = setTimeout(() => setShowWelcome(true), 1000);
      return () => {
        clearTimeout(timerNav);
        clearTimeout(timerWelcome);
      };
    } else {
      setShowNav(false);
      setShowWelcome(false);
    }
  }, [showHeader]);

  // Przełączanie sieci
  async function handleNetworkChange(e) {
    const selected = e.target.value;
    setNetwork(selected);
    const networkParam = getNetworkParam(selected);
    if (window.ethereum && networkParam) {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: networkParam.chainId }]
        });
      } catch (err) {
        setPopup({ visible: true, message: `Failed to switch network: ${err.message}`, txHash: null });
      }
    }
  }

  // Połącz portfel
  async function connectWallet() {
    if (!window.ethereum) {
      setPopup({ visible: true, message: "MetaMask required", txHash: null });
      return;
    }
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      if (accounts && accounts.length > 0) {
        setIsWalletConnected(true);
        setWalletAddress(accounts[0]);
      } else {
        setIsWalletConnected(false);
        setWalletAddress("");
      }
    } catch (error) {
      setPopup({ visible: true, message: "Failed to connect wallet: " + error.message, txHash: null });
      setIsWalletConnected(false);
      setWalletAddress("");
    }
  }

  // Deploy contract
  async function deployContract(contractName, bytecode) {
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
        setPopup({
          visible: true,
          message: `Contract ${contractName} deployed successfully!`,
          txHash: tx.hash
        });
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
  }

  return (
    <Router basename="/">
      <div className="App" style={{ minHeight: '100vh', background: theme.background, transition: 'background 0.3s' }}>
        <Popup 
          visible={popup.visible} 
          message={popup.message} 
          txHash={popup.txHash}
          onClose={() => setPopup({ visible: false, message: "", txHash: null })}
          theme={theme}
        />
        
        <Header 
          theme={theme}
          showHeader={showHeader}
          showNav={showNav}
          network={network}
          networks={networks}
          onNetworkChange={handleNetworkChange}
        />

        <div style={{ padding: 40, paddingTop: 120 }}>
          <Routes>
            <Route path="/" element={
              <div
                style={{
                  maxWidth: 540,
                  margin: '60px auto 32px auto',
                  background: theme.cardBg,
                  borderRadius: 12,
                  boxShadow: `0 2px 16px ${theme.shadow}`,
                  padding: '28px 32px',
                  textAlign: 'center',
                  fontFamily: 'Inter, Arial, sans-serif',
                  fontWeight: 500,
                  fontSize: '1.12em',
                  letterSpacing: '0.01em',
                  opacity: showWelcome ? 1 : 0,
                  transform: showWelcome ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'opacity 1s, transform 1s'
                }}
              >
                <span style={{ color: theme.textPrimary, fontWeight: 700 }}>
                  <span style={{ fontSize: '1.08em', fontWeight: 700, display: 'block', marginBottom: '32px' }}>
                    Deploy Your Contract – Fast & Secure!
                  </span>
                  Welcome to panel for deploying smart contracts on Celo, Base and Optimism blockchain.<br />
                  <br />
                  Click "Deploy", connect wallet, choose a network, and deploy ready-to-use contracts with a single click!<br />
                  <br />
                  Deploy your own contracts in seconds!
                </span>
                <span style={{ fontSize: '0.74em', fontStyle: 'italic', color: theme.textSecondary, marginTop: 28, display: 'block', fontFamily: 'Georgia, Times, Times New Roman, serif' }}>
                  Currently 4 contracts available. More coming soon.
                </span>
              </div>
            } />
            
            <Route path="/deploy" element={
              <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: 0 }}>
                {!isWalletConnected ? (
                  <>
                    <div style={{ fontWeight: 600, fontSize: '1.08em', marginBottom: 18, color: theme.textPrimary, textAlign: 'center' }}>
                      Connect Your Wallet First
                    </div>
                    <button
                      style={{ 
                        minWidth: '120px', 
                        fontSize: '0.98em', 
                        padding: '0.5em 1.1em', 
                        marginTop: '18px',
                        background: theme.gradient,
                        color: '#fff',
                        border: 'none',
                        borderRadius: '6px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        boxShadow: `0 2px 8px ${theme.shadow}`,
                        transition: 'background 0.2s'
                      }}
                      onMouseOver={e => e.currentTarget.style.background = theme.gradientHover}
                      onMouseOut={e => e.currentTarget.style.background = theme.gradient}
                      onClick={connectWallet}
                    >
                      Connect
                    </button>
                  </>
                ) : (
                  contracts.map((contract) => (
                    <div key={contract.name} style={{ display: 'flex', alignItems: 'center', marginBottom: 18 }}>
                      <button
                        style={{
                          marginRight: '18px',
                          minWidth: '170px',
                          fontSize: '0.98em',
                          padding: '0.5em 1.1em',
                          textAlign: 'center',
                          display: 'inline-block',
                          background: theme.gradient,
                          color: '#fff',
                          border: 'none',
                          borderRadius: '6px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          boxShadow: `0 2px 8px ${theme.shadow}`,
                          transition: 'background 0.2s'
                        }}
                        onMouseOver={e => e.currentTarget.style.background = theme.gradientHover}
                        onMouseOut={e => e.currentTarget.style.background = theme.gradient}
                        onClick={() => deployContract(contract.name, contract.bytecode)}
                      >
                        {contract.name}
                      </button>
                    </div>
                  ))
                )}
              </div>
            } />
            
            <Route path="/contract/simple-storage" element={
              <SimpleStorageDetail 
                theme={theme}
                isWalletConnected={isWalletConnected}
                connectWallet={connectWallet}
                setPopup={setPopup}
              />
            } />
            
            <Route path="/contract/click-counter" element={
              <ClickCounterDetail 
                theme={theme}
                isWalletConnected={isWalletConnected}
                connectWallet={connectWallet}
                setPopup={setPopup}
              />
            } />
            
            <Route path="/contract/message-board" element={
              <MessageBoardDetail 
                theme={theme}
                isWalletConnected={isWalletConnected}
                connectWallet={connectWallet}
                setPopup={setPopup}
              />
            } />
            
            <Route path="/contract/simple-voting" element={
              <SimpleVotingDetail 
                theme={theme}
                isWalletConnected={isWalletConnected}
                connectWallet={connectWallet}
                setPopup={setPopup}
              />
            } />
            
            <Route path="/how" element={
              <div style={{ color: theme.textPrimary }}>How It Works page - to be implemented</div>
            } />
            
            <Route path="/my-deployments" element={
              <div style={{ color: theme.textPrimary }}>My Deployments page - to be implemented</div>
            } />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;