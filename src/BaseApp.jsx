import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { AbiContract, HomeContract, HowItWorksContract, MyDeploymentsContract, SimpleStorageContract, ClickCounterContract, MessageBoardContract, SimpleVotingContract, contractsList } from './Contracts.jsx';

export default function BaseApp(props) {
  const {
    theme,
    network,
    setNetwork,
    showHeader = true,
    showNav = true,
    isWalletConnected,
    walletAddress,
    showWelcome = true,
    popup = { visible: false },
    setPopup,
    showDropdown,
    setShowDropdown,
    networks = ['Base','Celo','Optimism','Sepolia'],
    networkParams = {},
    handleNetworkChange = () => {},
    connectWallet = () => {}
  } = props;

  return (
    <div>
      {popup && popup.visible && (
        <div style={{ position: 'fixed', top:0, left:0, width:'100vw', height:'100vh', background: 'rgba(0,0,0,0.12)', zIndex:2000, display:'flex', alignItems:'center', justifyContent:'center' }}>
          <div style={{ background: theme.bg, padding: 28, borderRadius: 12, boxShadow: theme.shadow }}>
            <div style={{ marginBottom: 12 }}>{popup.message}</div>
            <button onClick={() => setPopup({ visible:false, message:'', txHash: null })}>OK</button>
          </div>
        </div>
      )}

      {showHeader && (
        <div className="header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '28px', padding: '18px 40px', position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1000, background: theme.gradient }}>
          <span className="header-title" style={{ color: '#fff', fontFamily: 'Inter, Arial, sans-serif', fontWeight: 700, fontSize: '1.8em' }}>
            Contract Deployer
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ color: '#fff', fontWeight: 600 }}>Chain</span>
            <div style={{ position: 'relative', minWidth: 120 }}>
              <div style={{ padding: '6px 18px', borderRadius: 8, background: theme.primary, color: theme.btnText, cursor: 'pointer' }} onClick={() => setShowDropdown && setShowDropdown(prev => !prev)}>{network}</div>
              {showDropdown && (
                <div style={{ position:'absolute', top:'110%', left:0, background: theme.primary, borderRadius:8, zIndex:1002, minWidth:120 }}>
                  {networks.map(n => (
                    <div key={n} onClick={() => { setNetwork(n); setShowDropdown(false); handleNetworkChange({ target:{ value: n } }); }} style={{ padding:'8px 12px', cursor:'pointer', color: theme.btnText }}>{n}</div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div style={{ padding: 40, paddingTop: 120 }}>
        <Routes>
          <Route path="/" element={<HomeContract theme={theme} />} />
          <Route path="/abi" element={<AbiContract theme={theme} />} />
          <Route path="/how" element={<HowItWorksContract theme={theme} />} />
          <Route path="/my-deployments" element={<MyDeploymentsContract theme={theme} />} />
          <Route path="/deploy" element={
            <div>
              {!isWalletConnected ? (
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontWeight:600, color: '#2563eb' }}>Connect Your Wallet First</div>
                  <button onClick={connectWallet} style={{ marginTop: 12 }}>Connect</button>
                </div>
              ) : (
                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', flexDirection: 'row', marginBottom: 12 }}>
                  {contractsList.map(contract => (
                    <button
                      key={contract.name}
                      className="ibb-btn"
                      style={{ width: 'auto', maxWidth: '100%', boxSizing: 'border-box' }}
                      onClick={() => setPopup && setPopup({ visible:true, message: `Deploy ${contract.name} not implemented in this demo`, txHash: null })}
                    >{contract.name}</button>
                  ))}
                </div>
              )}
            </div>
          } />
          <Route path="/contract/simple-storage" element={<SimpleStorageContract isWalletConnected={isWalletConnected} connectWallet={connectWallet} setPopup={setPopup} theme={theme} />} />
          <Route path="/contract/click-counter" element={<ClickCounterContract isWalletConnected={isWalletConnected} connectWallet={connectWallet} setPopup={setPopup} theme={theme} />} />
          <Route path="/contract/message-board" element={<MessageBoardContract isWalletConnected={isWalletConnected} connectWallet={connectWallet} setPopup={setPopup} theme={theme} />} />
          <Route path="/contract/simple-voting" element={<SimpleVotingContract isWalletConnected={isWalletConnected} connectWallet={connectWallet} setPopup={setPopup} theme={theme} />} />
        </Routes>
      </div>
    </div>
  );
}
