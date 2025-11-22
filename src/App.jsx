import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import BaseApp from './apps/BaseApp.jsx';
import CeloApp from './apps/CeloApp.jsx';
import Header from './components/Header.jsx';

export default function App() {
  const [network, setNetwork] = useState('Base');
  const [showDropdown, setShowDropdown] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [popup, setPopup] = useState({ visible: false, message: '', txHash: null });

  const networks = ['Base', 'Celo', 'Optimism', 'Sepolia'];

  const themes = {
    Base: {
      primary: '#2563eb',
      bg: '#ffffff',
      shadow: '0 6px 18px rgba(37,99,235,0.12)',
      gradient: 'linear-gradient(90deg,#2563eb 0%, #1e40af 100%)',
      btnText: '#ffffff',
      codeBg: '#e6eefc'
    },
    Celo: {
        primary: '#444444',
        accent: '#2D3A29',
        bg: '#ffffff',
        shadow: '0 6px 18px rgba(255,249,58,0.12)',
        gradient: 'linear-gradient(90deg,#FFF93A 0%, #FFF93A 100%)',
      btnText: '#2D3A29',
      codeBg: '#fff4dd'
    }
  };

  const theme = themes[network] || themes.Base;

  useEffect(() => {
    // initialization
  }, []);

  async function connectWallet() {
    if (!window.ethereum) {
      setPopup({ visible: true, message: 'MetaMask required', txHash: null });
      return;
    }
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      if (accounts && accounts.length > 0) {
        setIsWalletConnected(true);
        setWalletAddress(accounts[0]);
      }
    } catch (err) {
      setPopup({ visible: true, message: 'Failed to connect wallet: ' + (err.message || err), txHash: null });
    }
  }

  function handleNetworkChange(val) {
    const selected = val && val.target ? val.target.value : val;
    if (selected) setNetwork(selected);
  }

  const commonProps = {
    theme,
    network,
    setNetwork,
    showHeader: false,
    showNav: true,
    isWalletConnected,
    walletAddress,
    showWelcome: true,
    popup,
    setPopup,
    showDropdown,
    setShowDropdown,
    networks,
    networkParams: {},
    handleNetworkChange,
    connectWallet
  };
  return (
    <Router>
      <Header theme={theme} network={network} setNetwork={setNetwork} showDropdown={showDropdown} setShowDropdown={setShowDropdown} networks={networks} handleNetworkChange={handleNetworkChange} />

      {/* Spacer so page content sits below fixed header */}
      <div style={{ height: 112 }} />

      {network === 'Celo' ? <CeloApp {...commonProps} /> : <BaseApp {...commonProps} />}
    </Router>
  );
}