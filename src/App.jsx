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
      bytecode: '0x6080604052348015600e575f5ffd5b506103ba8061001c5f395ff3fe608060405234801561000f575f5ffd5b506004361061003f575f3560e01c8063256fec881461004357806332970710146100735780636630f88f14610088575b5f5ffd5b600154610056906001600160a01b031681565b6040516001600160a01b0390911681526020015b60405180910390f35b61007b61009d565b60405161006a9190610149565b61009b610096366004610192565b610128565b005b5f80546100a990610245565b80601f01602080910402602001604051908101604052809291908181526020018280546100d590610245565b80156101205780601f106100f757610100808354040283529160200191610120565b820191905f5260205f20905b81548152906001019060200180831161010357829003601f168201915b505050505081565b5f61013382826102c9565b5050600180546001600160a01b03191633179055565b602081525f82518060208401528060208501604085015e5f604082850101526040601f19601f83011684010191505092915050565b634e487b7160e01b5f52604160045260245ffd5b5f602082840312156101a2575f5ffd5b813567ffffffffffffffff8111156101b8575f5ffd5b8201601f810184136101c8575f5ffd5b803567ffffffffffffffff8111156101e2576101e261017e565b604051601f8201601f19908116603f0116810167ffffffffffffffff811182821017156102115761021161017e565b604052818152828201602001861015610228575f5ffd5b816020840160208301375f91810160200191909152949350505050565b600181811c9082168061025957607f821691505b60208210810361027757634e487b7160e01b5f52602260045260245ffd5b50919050565b601f8211156102c457805f5260205f20601f840160051c810160208510156102a25750805b601f840160051c820191505b818110156102c1575f81556001016102ae565b50505b505050565b815167ffffffffffffffff8111156102e3576102e361017e565b6102f7816102f18454610245565b8461027d565b6020601f821160018114610329575f83156103125750848201515b5f19600385901b1c1916600184901b1784556102c1565b5f84815260208120601f198516915b828110156103585787850151825560209485019460019092019101610338565b508482101561037557868401515f19600387901b60f8161c191681555b50505050600190811b0190555056fea264697066735822122081aa54c8ed61172532a488e962737c95dfb429d257ad3221825fb2c89316835664736f6c634300081e0033'
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

  return (
    <Router basename="/">
      <div className="App" style={{
        minHeight: '100vh',
        background: theme.background,
        transition: 'background 0.3s'
      }}>
        <Popup 
          visible={popup.visible} 
          message={popup.message} 
          txHash={popup.txHash}
          network={network}
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
            <Route path="/" element={(
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
                  Welcome to panel for deploying smart contracts on 
                  <span style={{ color: '#627EEA', fontWeight: 700 }}> Sepolia</span>, 
                     <span style={{ color: 'rgba(221, 181, 0, 1)', fontWeight: 700 }}> Celo</span>, 
                  <span style={{ color: '#0052FF', fontWeight: 700 }}> Base</span> and 
                  <span style={{ color: '#FF0420', fontWeight: 700 }}> Optimism</span> blockchain.<br />
                  <br />
                  Simple to use:
                  <br />
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontWeight: 600, margin: '16px 0' }}>
                    <span style={{ whiteSpace: 'nowrap', width: 220, textAlign: 'left' }}>1. Connect wallet</span>
                    <span style={{ whiteSpace: 'nowrap', width: 220, textAlign: 'left' }}>2. Deploy on testnet</span>
                    <span style={{ whiteSpace: 'nowrap', width: 220, textAlign: 'left' }}>3. Deploy on mainnet</span>
                    <span style={{ whiteSpace: 'nowrap', width: 220, textAlign: 'left' }}>4. Check Your deployment</span>
                  </div>
                  <br />
                  Deploy your own contract in seconds!
                </span>
                <span style={{ fontSize: '0.74em', fontStyle: 'italic', color: theme.textSecondary, marginTop: 28, display: 'block', fontFamily: 'Georgia, Times, Times New Roman, serif' }}>
                  *currently 4 contracts available, more coming soon.
                </span>
              </div>
            )} />
            
            <Route path="/deploy" element={(
              <div style={{ maxWidth: 720, margin: '60px auto 32px auto' }}>
                <div style={{ background: theme.cardBg, borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.04)', padding: '28px 32px', color: theme.textPrimary, fontSize: '0.96em', fontFamily: 'Inter, Arial, sans-serif', fontWeight: 500, textAlign: 'left', lineHeight: 1.7, minHeight: 320, maxWidth: 720 }}>
                  <h2 style={{ color: theme.textPrimary, fontWeight: 700, fontSize: '1.2em', margin: 0, marginBottom: 18 }}>Deploy Contract</h2>
                  <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '14px', justifyContent: 'flex-start' }}>
                    {!isWalletConnected ? (
                      <div style={{ width: '100%', textAlign: 'left' }}>
                        <div style={{ fontWeight: 600, fontSize: '1.08em', marginBottom: 18, color: theme.textPrimary }}>
                          Connect Your Wallet First
                        </div>
                        <button
                          style={{ 
                            minWidth: '120px', 
                            fontSize: '0.92em', 
                            padding: '0.45em 1em', 
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
                      </div>
                    ) : (
                      contracts.map((contract) => (
                        <button
                          key={contract.name}
                          style={{
                            fontSize: '0.88em',
                            padding: '0.5em 1.2em',
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
                      ))
                    )}
                  </div>
                </div>
              </div>
            )} />
            
            <Route path="/contract/simple-storage" element={(
              <SimpleStorageDetail 
                theme={theme}
                isWalletConnected={isWalletConnected}
                connectWallet={connectWallet}
                setPopup={setPopup}
              />
            )} />
            
            <Route path="/contract/click-counter" element={(
              <ClickCounterDetail 
                theme={theme}
                isWalletConnected={isWalletConnected}
                connectWallet={connectWallet}
                setPopup={setPopup}
              />
            )} />
            
            <Route path="/contract/message-board" element={(
              <MessageBoardDetail 
                theme={theme}
                isWalletConnected={isWalletConnected}
                connectWallet={connectWallet}
                setPopup={setPopup}
              />
            )} />
            
            <Route path="/contract/simple-voting" element={(
              <SimpleVotingDetail 
                theme={theme}
                isWalletConnected={isWalletConnected}
                connectWallet={connectWallet}
                setPopup={setPopup}
              />
            )} />
            
            <Route path="/bytecodes" element={(
              <div style={{ maxWidth: 720, margin: '60px auto 32px auto' }}>
                <div style={{ background: theme.cardBg, borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.04)', padding: '28px 32px', color: theme.textPrimary, fontSize: '0.96em', fontFamily: 'Inter, Arial, sans-serif', fontWeight: 500, textAlign: 'left', lineHeight: 1.7, minHeight: 320, maxWidth: 720 }}>
                  <h2 style={{ color: theme.textPrimary, fontWeight: 700, fontSize: '1.2em', margin: 0, marginBottom: 18 }}>Bytecodes</h2>
                  <p style={{ marginBottom: 24 }}>
                    Contract Deployer uses bytecodes to deploy Your contract. All contracts are compiled with Hardhat version 3.0.10, Solidity compiler version 0.8.30 with 200 runs optimization, with the following bytecodes:
                  </p>
                  {contractBytecodes.map(({ name, bytecode }, idx) => (
                    <div key={name} style={{ marginBottom: 32 }}>
                      <div style={{ marginTop: '8px', borderRadius: '10px', background: theme.codeBg, boxShadow: '0 2px 12px rgba(0,0,0,0.04)', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: theme.codeBg, padding: '8px 18px 8px 18px', borderTopLeftRadius: '10px', borderTopRightRadius: '10px', borderBottom: `1px solid ${theme.highlight}` }}>
                          <span style={{ color: '#444', fontSize: '0.86em', fontWeight: 600, letterSpacing: '0.04em' }}>{name} bytecode</span>
                          <div>
                            <button
                              onClick={() => handleCopy(bytecode, idx)}
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
                              {pressedIndex === idx ? (
                                <span style={{ fontSize: '0.92em', color: '#444', width: 32, textAlign: 'center' }}>✔</span>
                              ) : <span style={{ width: 32, textAlign: 'center' }}>Copy</span>}
                            </button>
                          </div>
                        </div>
                        <pre style={{ background: theme.cardBgDark, color: '#222', fontSize: '0.92em', fontFamily: 'Fira Mono, Menlo, Monaco, Consolas, monospace', padding: '18px 16px', margin: 0, borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px', overflowX: 'auto', minHeight: '120px' }}>
                          {bytecode}
                        </pre>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )} />
            
            <Route path="/how" element={(
              <div style={{ maxWidth: 720, margin: '60px auto 32px auto' }}>
                <div style={{ background: theme.cardBg, borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.04)', padding: '28px 32px', color: theme.textPrimary, fontSize: '0.96em', fontFamily: 'Inter, Arial, sans-serif', fontWeight: 500, textAlign: 'left', lineHeight: 1.7, minHeight: 320 }}>
                <h2 style={{ color: theme.textPrimary, fontWeight: 700, fontSize: '1.2em', margin: 0, marginBottom: 18 }}>How It Works</h2>
                <ol style={{ paddingLeft: 24 }}>
                  <li><b>Connect Your Wallet</b><br />Use MetaMask or another EVM-compatible wallet to authenticate and sign transactions.</li>
                  <li><b>Choose a Network</b><br />Select the blockchain network (Sepolia, Celo, Base, Optimism) where you want to deploy your contract.</li>
                  <li><b>Select a Contract</b><br />Pick one of the available smart contracts. Each contract is written in Solidity and pre-compiled.</li>
                  <li><b>Deploy with One Click</b><br />When you click "Deploy", the dapp sends the contract's bytecode (compiled from Solidity) to the blockchain. Your wallet will prompt you to confirm the transaction.</li>
                  <li><b>Track and Interact</b><br />After deployment, you receive the contract address and transaction hash. You can interact with your contract directly from the dapp.</li>
                </ol>
                <p style={{ fontSize: '0.95em', color: theme.textSecondary, marginTop: 18 }}>
                  For more details, see the documentation or contact support.
                </p>
              </div>
              </div>
            )} />
            
            <Route path="/my-deployments" element={(
              <div style={{ maxWidth: 720, margin: '60px auto 32px auto' }}>
                <div style={{ background: theme.cardBg, borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.04)', padding: '28px 32px', color: theme.textPrimary, fontSize: '0.96em', fontFamily: 'Inter, Arial, sans-serif', fontWeight: 500, textAlign: 'left', lineHeight: 1.7, minHeight: 320, maxWidth: 720 }}>
                  <h2 style={{ color: theme.textPrimary, fontWeight: 700, fontSize: '1.2em', margin: 0, marginBottom: 18 }}>My Deployments</h2>
                  <div>My Deployments page - to be implemented</div>
                </div>
              </div>
            )} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;