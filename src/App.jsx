import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ethers } from "ethers";
import { useAccount, useDisconnect } from "wagmi";
import { useAppKit } from '@reown/appkit/react';
import { useTheme } from "./hooks/useTheme";
import { useDeployments } from "./hooks/useDeployments";
import { useSigner } from "./hooks/useSigner";
import { Header } from "./components/Header";
import { Popup } from "./components/Popup";
import { SimpleStorageDetail } from "./components/contracts/SimpleStorageDetail";
import { ClickCounterDetail } from "./components/contracts/ClickCounterDetail";
import { MessageBoardDetail } from "./components/contracts/MessageBoardDetail";
import { SimpleVotingDetail } from "./components/contracts/SimpleVotingDetail";
import { MyDeployments } from "./components/MyDeployments";
// import { Interact } from "./components/Interact";
import { ContractInteract } from "./components/ContractInteract";
import { ContractsList } from "./components/ContractsList";
import { BytecodesList } from "./components/BytecodesList";
import { BytecodeDetail } from "./components/BytecodeDetail";
import { BackButton } from "./components/common/BackButton";
import { contracts } from "./config/contracts.js";
import { networks, getNetworkParam } from "./config/networks";
import Footer from "./components/Footer";
import { InteractSection } from "./components/InteractSection.jsx";
import { InteractModal } from "./components/InteractModal";
import { InteractPage } from "./components/InteractPage";

function App() {
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();
  const { open } = useAppKit();
  const [showHeader, setShowHeader] = useState(true);
  const [showWelcome, setShowWelcome] = useState(true);
  const [popup, setPopup] = useState({ visible: false, message: "", txHash: null });
  const [network, setNetwork] = useState(() => localStorage.getItem("network") || "Celo");
  const [priceCache, setPriceCache] = useState({});
  const [deployLoading, setDeployLoading] = useState(null);
  const [interactModalVisible, setInteractModalVisible] = useState(false);
  
  // Get signer for on-chain operations
  const signer = useSigner(isConnected);
  
  // Pass signer to useDeployments for on-chain registry support
  const { deployments, addDeployment } = useDeployments(address, network, signer);

  // Wrapper functions to preserve context for WalletConnect/Reown AppKit
  const handleConnect = () => open();
  const handleDisconnect = () => disconnect();

  // Szacowanie fee za deploy kontraktu w dolarach
  async function showDeployFee(bytecode, contractName) {
    // Sprawdź czy portfel jest podłączony przez WalletConnect/Reown
    if (!isConnected) {
      // Wywołaj modal WalletConnect
      handleConnect();
      setPopup({ visible: true, message: "Please connect your wallet first", txHash: null });
      return;
    }
    
    setPopup({ visible: true, message: "Calculating fee...", txHash: null });
    
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const tx = { data: bytecode };
      const gasEstimate = await signer.estimateGas(tx);
      const feeData = await provider.getFeeData();
      const gasPrice = feeData.gasPrice;
      const feeWei = gasEstimate * gasPrice;
      const feeEth = parseFloat(ethers.formatEther(feeWei));
      
      // Pobierz aktualny kurs kryptowaluty w USD
      let coinId = 'ethereum'; // domyślnie ETH
      if (network === 'Celo') {
        coinId = 'celo';
      }
      
      let usdPrice = null;
      
      // Sprawdź cache (5 minut ważności)
      const now = Date.now();
      if (priceCache[coinId] && (now - priceCache[coinId].timestamp < 5 * 60 * 1000)) {
        usdPrice = priceCache[coinId].price;
      } else {
        // Pobierz nową cenę
        try {
          const priceResponse = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd`);
          if (priceResponse.ok) {
            const priceData = await priceResponse.json();
            usdPrice = priceData[coinId]?.usd;
            if (usdPrice) {
              setPriceCache({...priceCache, [coinId]: { price: usdPrice, timestamp: now }});
            }
          }
        } catch (fetchErr) {
          console.error("Failed to fetch price:", fetchErr);
        }
      }
      
        if (!usdPrice || usdPrice === 0) {
          setPopup({
            visible: true,
            message: `Estimated deployment fee for ${contractName}: USD price unavailable.`,
            txHash: null
          });
          return;
        }

        const feeUsd = (feeEth * usdPrice).toFixed(8);

        setPopup({
          visible: true,
          message: `Estimated deployment fee for ${contractName}: $${feeUsd} USD`,
          txHash: null
        });
    } catch (err) {
      setPopup({ visible: true, message: "Could not estimate fee: " + err.message, txHash: null });
    }
  }

  // Zapamiętaj wybraną sieć w localStorage
  React.useEffect(() => {
    localStorage.setItem("network", network);
  }, [network]);
  const [showNav, setShowNav] = useState(true);

  // Użyj hooka do obsługi motywu
  let theme = useTheme(network);
  if (network === 'Celo') {
    theme = {
      ...theme,
      highlight: '#e6d72a',
    };
  }

  // Animacje przy starcie - removed for instant display
  // React.useEffect(() => {
  //   const timer = setTimeout(() => setShowHeader(true), 500);
  //   return () => clearTimeout(timer);
  // }, []);

  // React.useEffect(() => {
  //   if (showHeader) {
  //     const timerNav = setTimeout(() => setShowNav(true), 500);
  //     const timerWelcome = setTimeout(() => setShowWelcome(true), 1000);
  //     return () => {
  //       clearTimeout(timerNav);
  //       clearTimeout(timerWelcome);
  //     };
  //   } else {
  //     setShowNav(false);
  //     setShowWelcome(false);
  //   }
  // }, [showHeader]);

  // Automatyczne przełączanie sieci w portfelu po podłączeniu
  React.useEffect(() => {
    if (isConnected) {
      const networkParam = getNetworkParam(network);
      if (window.ethereum && networkParam) {
        window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: networkParam.chainId }]
        }).catch(err => {
          console.log("Network switch error:", err);
        });
      }
    }
  }, [isConnected, network]);

  // Przełączanie sieci
  async function handleNetworkChange(e) {
    const selected = e.target.value;
    setNetwork(selected);
    
    // Przełącz sieć w portfelu tylko jeśli portfel jest podłączony
    if (isConnected) {
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
  }

  // Deploy contract
  async function deployContract(contractName, bytecode) {
    setDeployLoading(contractName);
    // Sprawdź czy portfel jest podłączony przez WalletConnect/Reown
    if (!isConnected) {
      // Wywołaj modal WalletConnect
      handleConnect();
      setPopup({ visible: true, message: "Please connect your wallet first", txHash: null });
      setDeployLoading(null);
      return;
    }
    if (!window.ethereum) {
      setPopup({ visible: true, message: "Wallet provider not available", txHash: null });
      setDeployLoading(null);
      return;
    }
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const tx = await signer.sendTransaction({ data: bytecode });
      const receipt = await tx.wait();
      if (receipt.contractAddress) {
        addDeployment(contractName, receipt.contractAddress, network, tx.hash);
        setPopup({
          visible: true,
          message: `Contract <b>${contractName}</b> deployed successfully!`,
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
    } finally {
      setDeployLoading(null);
    }
  }

  // Lista kontraktów i bytecodes
  const contractBytecodes = [
    {
      name: 'SimpleStorage',
      bytecode: '0x6080604052348015600e575f5ffd5b5060ba80601a5f395ff3fe6080604052348015600e575f5ffd5b5060043610603a575f3560e01c806309ce9ccb14603e5780633fb5c1cb146057578063f2c9ecd8146068575b5f5ffd5b60455f5481565b60405190815260200160405180910390f35b60666062366004606e565b5f55565b005b5f546045565b5f60208284031215607d575f5ffd5b503591905056fea26469706673582212200cf668aaa1a8919f982a5eb6458914b17b8d63ca0f5c3aac933d33cc0699e59264736f6c634300081e0033'
    },
    {
      name: 'ClickCounter',
      bytecode: '0x6080604052348015600e575f5ffd5b5060c580601a5f395ff3fe6080604052348015600e575f5ffd5b50600436106030575f3560e01c806306661abd1460345780637d55923d14604d575b5f5ffd5b603b5f5481565b60405190815260200160405180910390f35b60536055565b005b60015f5f82825460649190606b565b9091555050565b80820180821115608957634e487b7160e01b5f52601160045260245ffd5b9291505056fea26469706673582212205c59a7297bf9296c81d569fd83247fe0bf9f7d0951f5a677a17656223aaee51864736f6c634300081e0033'
    },
    {
      name: 'MessageBoard',
      bytecode: '0x6080604052348015600e575f5ffd5b506103768061001c5f395ff3fe608060405234801561000f575f5ffd5b506004361061003f575f3560e01c806367e404ce146100435780638ee93cf314610073578063e21f37ce14610088575b5f5ffd5b600154610056906001600160a01b031681565b6040516001600160a01b0390911681526020015b60405180910390f35b61008661008136600461014b565b61009d565b005b6100906100c0565b60405161006a91906101b9565b5f6100a9828483610286565b5050600180546001600160a01b0319163317905550565b5f80546100cc90610202565b80601f01602080910402602001604051908101604052809291908181526020018280546100f890610202565b80156101435780601f1061011a57610100808354040283529160200191610143565b820191905f5260205f20905b81548152906001019060200180831161012657829003601f168201915b505050505081565b5f5f6020838503121561015c575f5ffd5b823567ffffffffffffffff811115610172575f5ffd5b8301601f81018513610182575f5ffd5b803567ffffffffffffffff811115610198575f5ffd5b8560208284010111156101a9575f5ffd5b6020919091019590945092505050565b602081525f82518060208401528060208501604085015e5f604082850101526040601f19601f83011684010191505092915050565b634e487b7160e01b5f52604160045260245ffd5b600181811c9082168061021657607f821691505b60208210810361023457634e487b7160e01b5f52602260045260245ffd5b50919050565b601f82111561028157805f5260205f20601f840160051c8101602085101561025f5750805b601f840160051c820191505b8181101561027e575f815560010161026b565b50505b505050565b67ffffffffffffffff83111561029e5761029e6101ee565b6102b2836102ac8354610202565b8361023a565b5f601f8411600181146102e3575f85156102cc5750838201355b5f19600387901b1c1916600186901b17835561027e565b5f83815260208120601f198516915b8281101561031257868501358255602094850194600190920191016102f2565b508682101561032e575f1960f88860031b161c19848701351681555b505060018560011b018355505050505056fea2646970667358221220369ab01a8ce8b8fae58c1f79d97601fbb8379c718b452681b24bf355af80a20b64736f6c634300081e0033'
    },
    {
      name: 'SimpleVoting',
      bytecode: '0x6080604052348015600e575f5ffd5b5060f38061001b5f395ff3fe6080604052348015600e575f5ffd5b50600436106044575f3560e01c80633c8d0bec14604857806355416e06146061578063847d52d6146069578063fb32aedb146071575b5f5ffd5b604f5f5481565b60405190815260200160405180910390f35b60676077565b005b604f60015481565b6067608d565b60015f5f828254608691906099565b9091555050565b6001805f828254608691905b8082018082111560b757634e487b7160e01b5f52601160045260245ffd5b9291505056fea26469706673582212201a53748d74d7a82011e00c648f970427f5f2a16a963e42bc8d7208522d889f1b64736f6c634300081e0033'
    }
  ];

  // Stan do obsługi ptaszka po kopiowaniu
  const [pressedIndex, setPressedIndex] = useState(null);
  const handleCopy = (bytecode, idx) => {
    navigator.clipboard.writeText(bytecode);
    setPressedIndex(idx);
    setTimeout(() => setPressedIndex(null), 1000);
  };

  React.useEffect(() => {
    window.showInteractModal = () => setInteractModalVisible(true);
  }, []);
  const handleInteractModalClose = () => setInteractModalVisible(false);
  const handleInteractModalSubmit = (address) => {
    setInteractModalVisible(false);
    // You can handle the address here, e.g. navigate to /interact or show ContractInteract
    // Example: navigate(`/interact/contractName/${address}/${network}`);
    setPopup({ visible: true, message: `Entered address: ${address}` });
  };

  return (
    <>
    <Router basename="/">
      {/* Removed transparent background image */}
        {/* Niewidoczny przycisk WalletConnect do programowego wywoływania */}
        <div style={{ display: 'none' }}>
          <appkit-button />
        </div>
        <div className="App" style={{
          minHeight: '100vh',
          transition: 'background 0.3s',
          background: `url('/${network.toLowerCase()}.webp') center center / cover no-repeat fixed, ${network === 'Base' ? '#e6f0fb' : network === 'Celo' ? '#fffbe6' : network === 'Optimism' ? '#fff0f0' : network === 'Sepolia' ? '#f7f3e6' : '#f5f5f5'}`
        }}>
        <Popup 
          visible={popup.visible} 
          message={popup.message} 
          txHash={popup.txHash}
          network={popup.network || network}
          onClose={() => setPopup({ visible: false, message: "", txHash: null, content: null })}
          theme={theme}
        >
          {popup.content}
        </Popup>
        <Header 
          theme={theme}
          showHeader={showHeader}
          showNav={showNav}
          network={network}
          networks={networks}
          onNetworkChange={handleNetworkChange}
          isConnected={isConnected}
          address={address}
          onConnect={handleConnect}
          onDisconnect={handleDisconnect}
        />
        <div style={{ padding: 40, paddingTop: 120 }}>
          <Routes>
            <Route path="/" element={( 
              <div
                style={{
                  maxWidth: 540,
                  margin: '60px auto 32px auto',
                  borderRadius: 16,
                  boxShadow: `0 2px 24px ${theme.shadow}`,
                  padding: '32px 36px',
                  textAlign: 'center',
                  fontFamily: 'Inter, Arial, sans-serif',
                  fontWeight: 500,
                  fontSize: '1.12em',
                  letterSpacing: '0.01em',
                  opacity: showWelcome ? 1 : 0,
                  transform: showWelcome ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'opacity 1s, transform 1s',
                  background: 'rgba(255,255,255,0.82)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  border: '1px solid rgba(0,0,0,0.07)'
                }}
              >
                <span style={{ color: theme.textPrimary, fontWeight: 700 }}>
                  <span style={{ fontSize: '1.08em', fontWeight: 700, display: 'block', marginBottom: '32px' }}>
                    Deploy Your Contract – Fast & Secure!
                  </span>
                  Welcome to panel for deploying smart contracts on 
                  <span style={{ color: '#627EEA', fontWeight: 700, cursor: 'pointer', textDecoration: 'none' }} onClick={() => setNetwork('Sepolia')}> Sepolia</span>, 
                  <span style={{ color: 'rgba(221, 181, 0, 1)', fontWeight: 700, cursor: 'pointer', textDecoration: 'none' }} onClick={() => setNetwork('Celo')}> Celo</span>, 
                  <span style={{ color: '#0052FF', fontWeight: 700, cursor: 'pointer', textDecoration: 'none' }} onClick={() => setNetwork('Base')}> Base</span> and 
                  <span style={{ color: '#FF0420', fontWeight: 700, cursor: 'pointer', textDecoration: 'none' }} onClick={() => setNetwork('Optimism')}> Optimism</span> blockchain.<br />
                  <br />
                  Simple to use:
                  <br />
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontWeight: 600, margin: '12px 0', width: '100%' }}>
                    <div style={{ width: 220, textAlign: 'left', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', margin: '0 auto' }}>
                      <span style={{ whiteSpace: 'nowrap', margin: '2px 0' }}>• Connect</span>
                      <span style={{ whiteSpace: 'nowrap', margin: '2px 0' }}>• Check</span>
                      <span style={{ whiteSpace: 'nowrap', margin: '2px 0' }}>• Read</span>
                      <span style={{ whiteSpace: 'nowrap', margin: '2px 0' }}>• Deploy</span>
                      <span style={{ whiteSpace: 'nowrap', margin: '2px 0' }}>• Interact</span>
                    </div>
                  </div>
                  <br />
                  Deploy your own contract in seconds!
                </span>
                <span style={{ fontSize: '0.74em', fontStyle: 'italic', color: theme.textSecondary, marginTop: 24, display: 'block', fontFamily: 'Georgia, Times, Times New Roman, serif' }}>
                  *first, read <a href="/how" style={{ color: theme.textPrimary, textDecoration: 'underline', fontWeight: 'bold' }}>How it works</a>.
                </span>
                <span style={{ fontSize: '0.74em', fontStyle: 'italic', color: theme.textSecondary, marginTop: 8, display: 'block', fontFamily: 'Georgia, Times, Times New Roman, serif' }}>
                  *currently 4 contracts available, more coming soon.
                </span>
              </div>
            )} />
            
            <Route path="/deploy" element={(
              <div style={{ maxWidth: 940, margin: '60px auto 32px auto' }}>
                <div style={{ background: theme.cardBg + 'E6', border: `1px solid ${theme.primary}`, borderRadius: 10, boxShadow: '0 2px 12px rgba(0,0,0,0.04)', padding: '28px 32px', color: theme.textPrimary, fontSize: '0.96em', fontFamily: 'Inter, Arial, sans-serif', fontWeight: 500, textAlign: 'left', lineHeight: 1.7, minHeight: 320, maxWidth: 940 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
                    <h2 style={{ color: theme.textPrimary, fontWeight: 700, fontSize: '1.2em', margin: 0 }}>Deploy Contract</h2>
                    <BackButton theme={theme} to="/contracts">
                      Back to Contracts
                    </BackButton>
                  </div>
                  <div style={{ fontSize: '0.95em', color: theme.textPrimary, fontFamily: 'Inter, Arial, sans-serif', fontWeight: 500, textAlign: 'left', marginBottom: 18 }}>
                    Deploying your smart contract is simple and fast. Just select the contract and click the <b>Deploy</b> button.<br />
                    If you want to check the estimated network cost, click <b>Fee</b>.<br />
                    <b>Wallet connection required.</b>
                  </div>
                  <div style={{ height: 18 }} />
                  <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '14px', justifyContent: 'flex-start' }}>
                    {contracts.map((contract) => (
                        <div key={contract.name} style={{
                          background: `rgba(${theme.primaryRgb},0.10)`,
                          borderRadius: 10,
                          boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                          border: `1px solid ${theme.primary}`,
                          padding: '22px 28px',
                          minWidth: 270,
                          maxWidth: 340,
                          marginBottom: 12,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}>
                          <div style={{
                            fontWeight: 700,
                            fontSize: '1.08em',
                            color: theme.textPrimary,
                            marginBottom: 12,
                            textAlign: 'center',
                          }}>{contract.name}</div>
                          <div style={{ display: 'flex', flexDirection: 'row', gap: 32, width: '100%', justifyContent: 'center', marginTop: 8 }}>
                            {!isConnected ? (
                              <button
                                style={{
                                  fontSize: '0.96em',
                                  padding: '0.48em 1.32em',
                                  background: theme.primary,
                                  color: network === 'Celo' ? '#444' : '#fff',
                                  border: 'none',
                                  borderRadius: '6px',
                                  fontWeight: 600,
                                  cursor: 'pointer',
                                  boxShadow: `0 2px 8px ${theme.shadow}`,
                                  transition: 'background 0.2s'
                                }}
                                onMouseOver={e => e.currentTarget.style.background = theme.primaryDark}
                                onMouseOut={e => e.currentTarget.style.background = theme.primary}
                                onClick={handleConnect}
                              >Connect</button>
                            ) : (
                              <>
                                <button
                                  style={{
                                    fontSize: '0.96em',
                                    padding: '0.48em 1.32em',
                                    background: theme.primary,
                                    color: network === 'Celo' ? '#444' : '#fff',
                                    border: 'none',
                                    borderRadius: '6px',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    boxShadow: `0 2px 8px ${theme.shadow}`,
                                    transition: 'background 0.2s',
                                    position: 'relative',
                                    minWidth: 90,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                  }}
                                  disabled={deployLoading === contract.name}
                                  onMouseOver={e => e.currentTarget.style.background = theme.primaryDark}
                                  onMouseOut={e => e.currentTarget.style.background = theme.primary}
                                  onClick={() => deployContract(contract.name, contract.bytecode)}
                                >
                                  {deployLoading === contract.name ? (
                                    <span style={{
                                      display: 'inline-block',
                                      width: 22,
                                      height: 22,
                                      border: `3px solid ${theme.primary}`,
                                      borderTop: '3px solid transparent',
                                      borderRadius: '50%',
                                      animation: 'spin 1s linear infinite',
                                      marginRight: 8
                                    }} />
                                  ) : null}
                                  <span style={{ verticalAlign: 'middle' }}>Deploy</span>
                                  <style>{`
                                    @keyframes spin {
                                      0% { transform: rotate(0deg); }
                                      100% { transform: rotate(360deg); }
                                    }
                                  `}</style>
                                </button>
                                <button
                                  style={{
                                    fontSize: '0.96em',
                                    padding: '0.48em 1.32em',
                                    background: theme.primaryDark,
                                    color: network === 'Celo' ? '#444' : '#fff',
                                    border: 'none',
                                    borderRadius: '6px',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    boxShadow: `0 2px 8px ${theme.shadow}`,
                                    transition: 'background 0.2s'
                                  }}
                                  title="Show deployment fee"
                                  onMouseOver={e => e.currentTarget.style.background = theme.primary}
                                  onMouseOut={e => e.currentTarget.style.background = theme.primaryDark}
                                  onClick={() => showDeployFee(contract.bytecode, contract.name)}
                                >Fee</button>
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )} />
            
            <Route path="/contract/simple-storage" element={(
              <SimpleStorageDetail 
                theme={theme}
                setPopup={setPopup}
                isConnected={isConnected}
                openModal={handleConnect}
                network={network}
              />
            )} />
            
            <Route path="/contract/click-counter" element={(
              <ClickCounterDetail 
                theme={theme}
                setPopup={setPopup}
                isConnected={isConnected}
                openModal={handleConnect}
                network={network}
              />
            )} />
            
            <Route path="/contract/message-board" element={(
              <MessageBoardDetail 
                theme={theme}
                setPopup={setPopup}
                isConnected={isConnected}
                openModal={handleConnect}
                network={network}
              />
            )} />
            
            <Route path="/contract/simple-voting" element={(
              <SimpleVotingDetail 
                theme={theme}
                setPopup={setPopup}
                isConnected={isConnected}
                openModal={handleConnect}
                network={network}
              />
            )} />
            
            <Route path="/bytecodes" element={(
              <BytecodesList theme={theme} />
            )} />
            
            <Route path="/bytecode/:contractName" element={(
              <BytecodeDetail theme={theme} />
            )} />
            
            <Route path="/contracts" element={(
              <ContractsList theme={theme} />
            )} />
            
            <Route path="/how" element={( 
              <div style={{ maxWidth: 720, margin: '60px auto 32px auto' }}>
                <div style={{ background: theme.cardBg + 'E6', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.04)', padding: '28px 32px', color: theme.textPrimary, fontSize: '0.96em', fontFamily: 'Inter, Arial, sans-serif', fontWeight: 500, textAlign: 'left', lineHeight: 1.7, minHeight: 320 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
                    <h2 style={{ color: theme.textPrimary, fontWeight: 700, fontSize: '1.2em', margin: 0 }}>How It Works</h2>
                    <BackButton theme={theme} to="/">
                      Back to Home
                    </BackButton>
                  </div>
                  <div>
                    <div style={{ marginBottom: 14 }}><b>Connect Your Wallet</b><br />Use MetaMask or another EVM-compatible wallet to authenticate and sign transactions.</div>
                    <div style={{ marginBottom: 14 }}><b>Choose a Network</b><br />Select the blockchain network (Sepolia, Celo, Base, Optimism) where you want to deploy your contract.</div>
                    <div style={{ marginBottom: 14 }}><b>Select a Contract</b><br />Pick one of the available smart contracts. Each contract is written in Solidity and pre-compiled.</div>
                    <div style={{ marginBottom: 14 }}><b>Deploy with One Click</b><br />When you click "Deploy", the dapp sends the contract's bytecode (compiled from Solidity) to the blockchain. Your wallet will prompt you to confirm the transaction.</div>
                    <div style={{ marginBottom: 0 }}><b>Track and Interact</b><br />After deployment, you receive the contract address and transaction hash. You can interact with your contract directly from the dapp.</div>
                  </div>
                </div>
              </div>
            )} />
            
            <Route path="/my-deployments" element={( 
              <MyDeployments 
                theme={theme}
                deployments={deployments}
                isConnected={isConnected}
                openModal={handleConnect}
                network={network}
                setPopup={setPopup}
              />
            )} />
            <Route path="/interact/:contractName/:contractAddress/:network" element={(
              <ContractInteract 
                theme={theme}
                isConnected={isConnected}
                openModal={handleConnect}
                network={network}
              />
            )} />
            <Route path="/interact" element={(
              <InteractPage theme={theme} network={network} />
            )} />
          </Routes>
        </div>
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
    </Router>
    <Footer network={network} />
    <InteractModal
      theme={theme}
      visible={interactModalVisible}
      onClose={handleInteractModalClose}
      onSubmit={handleInteractModalSubmit}
    />
    </>
  );
}

export default App;