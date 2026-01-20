// English descriptions for SimpleVoting functions
const functionDescriptions = {
  voteA: {
    signature: 'voteA()',
    signatureType: 'no parameters',
    description: 'cast a vote for option A.'
  },
  voteB: {
    signature: 'voteB()',
    signatureType: 'no parameters',
    description: 'cast a vote for option B.'
  },
  votesOptionA: {
    signature: 'votesOptionA()',
    signatureType: 'view',
    description: 'returns the current number of votes for option A.'
  },
  votesOptionB: {
    signature: 'votesOptionB()',
    signatureType: 'view',
    description: 'returns the current number of votes for option B.'
  }
};
import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import artifactsSimpleStorage from '../../artifacts/contracts/SimpleStorage.sol/SimpleStorage.json';
import artifactsClickCounter from '../../artifacts/contracts/ClickCounter.sol/ClickCounter.json';
import artifactsMessageBoard from '../../artifacts/contracts/MessageBoard.sol/MessageBoard.json';
import artifactsSimpleVoting from '../../artifacts/contracts/SimpleVoting.sol/SimpleVoting.json';
import { useParams, useNavigate } from 'react-router-dom';
import { getExplorerUrl } from '../config/explorers';

export const ContractInteract = ({ theme, isConnected, openModal, network: selectedNetwork }) => {
  // Dodaj globalny styl podkreślenia linku do tx hash tylko na hover
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `.tx-hash-link:hover { text-decoration: underline !important; }`;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);
  const { contractName, contractAddress, network } = useParams();
  const navigate = useNavigate();
  // Redirect to /my-deployments if network in URL does not match selected network
  useEffect(() => {
    if (selectedNetwork && network && selectedNetwork !== network) {
      navigate('/my-deployments', { replace: true });
    }
  }, [selectedNetwork, network, navigate]);

  const [abi, setAbi] = useState([]);
  const [functions, setFunctions] = useState([]);
  const [inputs, setInputs] = useState({});
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState({});
  
  // Check if any function is currently loading
  const isAnyLoading = Object.values(loading).some(l => l === true);
  
  // Handle input change for function arguments
  const handleInputChange = (fnName, idx, value) => {
    setInputs(prev => ({
      ...prev,
      [fnName]: {
        ...(prev[fnName] || {}),
        [idx]: value
      }
    }));
  };

  // Call contract function
  const handleCallFunction = async (fn) => {
    // Check if wallet is connected first
    if (!isConnected) {
      openModal();
      return;
    }
    
    setLoading(prev => ({ ...prev, [fn.name]: true }));
    setResults(prev => ({ ...prev, [fn.name]: null }));
    try {
      let provider;
      let signer;
      if (window.ethereum) {
        provider = new ethers.BrowserProvider(window.ethereum);
        signer = await provider.getSigner();
      } else {
        setResults(prev => ({ ...prev, [fn.name]: 'No wallet provider.' }));
        setLoading(prev => ({ ...prev, [fn.name]: false }));
        return;
      }

      // Check wallet network matches deployment network
      const walletNetwork = await provider.getNetwork();
      const walletChainName = walletNetwork.chainId === 42220n ? 'Celo' :
                              walletNetwork.chainId === 11155111n ? 'Sepolia' :
                              walletNetwork.chainId === 8453n ? 'Base' :
                              walletNetwork.chainId === 10n ? 'Optimism' :
                              `Chain ${walletNetwork.chainId}`;
      
      console.log('Wallet network:', walletChainName, 'Chain ID:', walletNetwork.chainId.toString());
      console.log('Contract network from URL:', network);
      
      if (walletChainName !== network) {
        setResults(prev => ({ ...prev, [fn.name]: `ERROR: Wallet connected to ${walletChainName}, but contract is deployed on ${network}. Please switch network in your wallet.` }));
        setLoading(prev => ({ ...prev, [fn.name]: false }));
        return;
      }

      // Check if contract exists at address
      const code = await provider.getCode(contractAddress);
      console.log('Contract code at address:', contractAddress);
      console.log('Code length:', code.length, 'Code:', code.substring(0, 100) + '...');
      
      if (code === '0x') {
        setResults(prev => ({ ...prev, [fn.name]: `ERROR: No contract deployed at ${contractAddress} on ${network}. The address exists but has no code. Did you deploy on a different network?` }));
        setLoading(prev => ({ ...prev, [fn.name]: false }));
        return;
      }

      const contract = new ethers.Contract(contractAddress, abi, signer);
      const args = (inputs[fn.name] ? Object.values(inputs[fn.name]) : []);
      
      console.log('Calling function:', fn.name);
      console.log('Function signature:', fn.name + '(' + (fn.inputs || []).map(i => i.type).join(',') + ')');
      console.log('Arguments:', args);
      console.log('ABI for this function:', JSON.stringify(fn, null, 2));
      
      // First, verify the contract has this function by checking the function selector
      const iface = new ethers.Interface(abi);
      const fragment = iface.getFunction(fn.name);
      const selector = fragment.selector;
      console.log('Function selector:', selector);
      
      // Check user balance for state-changing transactions
      if (fn.stateMutability !== 'view' && fn.stateMutability !== 'pure') {
        const balance = await provider.getBalance(await signer.getAddress());
        console.log('User balance:', ethers.formatEther(balance), 'native tokens');
        if (balance === 0n) {
          setResults(prev => ({ ...prev, [fn.name]: 'ERROR: Insufficient balance. You need native tokens to pay for gas.' }));
          setLoading(prev => ({ ...prev, [fn.name]: false }));
          return;
        }
      }
      
      let result;
      if (fn.stateMutability === 'view' || fn.stateMutability === 'pure') {
        result = await contract[fn.name](...args);
      } else {
        // For state-changing functions, try to estimate gas first
        try {
          const gasEstimate = await contract[fn.name].estimateGas(...args);
          console.log('Gas estimate:', gasEstimate.toString());
        } catch (gasErr) {
          console.error('Gas estimation failed:', gasErr);
          
          // Try to call as view function to see if it would work
          try {
            console.log('Attempting static call to see if function exists...');
            await contract[fn.name].staticCall(...args);
            throw new Error(`Gas estimation failed but static call succeeded. This shouldn't happen. ${gasErr.message}`);
          } catch (staticErr) {
            console.error('Static call also failed:', staticErr);
            throw new Error(`Function call failed. The ABI may not match the deployed contract. Original error: ${gasErr.message}`);
          }
        }
        
        const tx = await contract[fn.name](...args);
        result = tx.hash ? `Tx sent: ${tx.hash}` : tx;
      }
      setResults(prev => ({ ...prev, [fn.name]: result }));
    } catch (err) {
      console.error('Contract call error:', err);
      setResults(prev => ({ ...prev, [fn.name]: `ERROR: ${err.message}` }));
    }
    setLoading(prev => ({ ...prev, [fn.name]: false }));
  };

  useEffect(() => {
    let artifact;
    switch (contractName) {
      case 'SimpleStorage':
        artifact = artifactsSimpleStorage;
        break;
      case 'ClickCounter':
        artifact = artifactsClickCounter;
        break;
      case 'MessageBoard':
        artifact = artifactsMessageBoard;
        break;
      case 'SimpleVoting':
        artifact = artifactsSimpleVoting;
        break;
      default:
        artifact = null;
    }
    if (artifact && artifact.abi) {
      setAbi(artifact.abi);
      setFunctions(artifact.abi.filter(f => f.type === 'function'));
    } else {
      setAbi([]);
      setFunctions([]);
    }
  }, [contractName]);

  if (!isConnected) {
    return (
      <div style={{ maxWidth: 720, margin: '60px auto 32px auto' }}>
        <div style={{ background: theme.cardBg + 'E6', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.04)', padding: '28px 32px', color: theme.textPrimary, fontSize: '0.96em', fontFamily: 'Inter, Arial, sans-serif', fontWeight: 500, textAlign: 'center', lineHeight: 1.7, minHeight: 320 }}>
          <h2 style={{ color: theme.textPrimary, fontWeight: 700, fontSize: '1.2em', margin: 0, marginBottom: 18 }}>Contract Interaction</h2>
          <div style={{ marginBottom: 24 }}>
            Connect your wallet to interact with this contract.
          </div>
          <button
            style={{
              fontSize: '0.96em',
              padding: '0.48em 1.32em',
              background: theme.primary,
              color: theme.textPrimary,
              border: 'none',
              borderRadius: '6px',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: `0 2px 8px ${theme.shadow}`,
              transition: 'all 0.2s'
            }}
            onClick={() => openModal()}
          >
            Connect Wallet
          </button>
        </div>
      </div>
    );
  }

  // Podział funkcji na read i write
  const readFunctions = functions.filter(fn => fn.stateMutability === 'view' || fn.stateMutability === 'pure');
  const writeFunctions = functions.filter(fn => fn.stateMutability !== 'view' && fn.stateMutability !== 'pure');

  return (
    <>
      {/* Global loader overlay with blur effect */}
      {isAnyLoading && (
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
      <div style={{ maxWidth: 1100, margin: '60px auto 32px auto' }}>
        <div style={{ background: theme.cardBg + 'E6', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.04)', padding: '28px 32px', color: theme.textPrimary, fontSize: '0.96em', fontFamily: 'Inter, Arial, sans-serif', fontWeight: 500, textAlign: 'left', lineHeight: 1.7 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
          <h2 style={{ color: theme.textPrimary, fontWeight: 700, fontSize: '1.2em', margin: 0 }}>
            Contract: {contractName}
          </h2>
          <button
            style={{
              marginLeft: 18,
              fontSize: '0.86em',
              padding: '3px 10px',
              background: theme.cardBg,
              color: theme.textPrimary,
              border: `1px solid ${theme.primary}`,
              borderRadius: '5px',
              fontWeight: 500,
              cursor: 'pointer',
              boxShadow: `0 1px 4px ${theme.shadow}`,
              transition: 'background 0.2s',
            }}
            onClick={() => window.location.href = '/my-deployments'}
          >
            Back to My Deployments
          </button>
        </div>
        <div style={{ marginBottom: 12, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}>
          <div style={{ fontSize: '0.82em', color: theme.textPrimary, fontWeight: 500, background: theme.cardBgDark, padding: '5px 10px', borderRadius: 6, fontFamily: 'monospace', minWidth: 0 }}>
            Network: {network}
          </div>
          <div style={{ fontSize: '0.82em', color: theme.textPrimary, fontWeight: 500, background: theme.cardBgDark, padding: '5px 10px', borderRadius: 6, fontFamily: 'monospace', minWidth: 0 }}>
            Contract Address: {typeof contractAddress === 'string' && contractAddress.length > 0 ? (
              <a
                href={getExplorerUrl('address', contractAddress, network)}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: theme.textPrimary, textDecoration: 'none', wordBreak: 'break-all', fontSize: '0.82em' }}
                onMouseOver={e => e.currentTarget.style.textDecoration = 'underline'}
                onMouseOut={e => e.currentTarget.style.textDecoration = 'none'}
              >
                {contractAddress}
              </a>
            ) : contractAddress}
          </div>
          <div style={{ fontSize: '0.82em', color: theme.textPrimary, fontWeight: 500, background: theme.cardBgDark, padding: '5px 10px', borderRadius: 6, fontFamily: 'monospace', minWidth: 0 }}>
            Deployment date: {new Date().toLocaleString()}
          </div>
        </div>
        <div style={{ marginTop: 24, padding: '20px', background: theme.cardBgDark, borderRadius: 8 }}>
          {/* usunięto odstęp nad kolumnami */}
          <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div style={{ flex: 1 }}>
              <div style={{ color: theme.textSecondary, fontWeight: 600, marginBottom: 10 }}>Read (view/pure)</div>
              {readFunctions.length > 0 ? (
                <ul style={{ color: theme.textPrimary, fontSize: '0.98em', listStyle: 'none', padding: 0 }}>
                  {readFunctions.map((fn, idx) => (
                    <li key={idx} style={{ marginBottom: 16, background: theme.cardBg, borderRadius: 6, padding: '12px 14px' }}>
                      {functionDescriptions[fn.name] ? (
                        <>
                          <span style={{ fontWeight: 500, color: theme.textPrimary }}>{functionDescriptions[fn.name].signature}</span>
                          <span style={{ color: theme.textSecondary, fontWeight: 400 }}> (</span>
                          <span style={{ color: theme.textPrimary, fontWeight: 500 }}>{functionDescriptions[fn.name].signatureType}</span>
                          <span style={{ color: theme.textSecondary, fontWeight: 400 }}>) – </span>
                            <span style={{ fontSize: '0.92em', color: theme.textSecondary, fontWeight: 400 }}>{functionDescriptions[fn.name].description}</span>
                        </>
                      ) : (
                        <span>
                          <b>{fn.name}</b> <span style={{ color: theme.textSecondary }}>({fn.stateMutability})</span>
                        </span>
                      )}
                      <br />
                      <span style={{ fontSize: '0.92em', color: theme.textSecondary }}>
                        Inputs: {fn.inputs && fn.inputs.length > 0 ? fn.inputs.map(i => i.name + ': ' + i.type).join(', ') : 'none'}<br />
                        Outputs: {fn.outputs && fn.outputs.length > 0 ? fn.outputs.map(o => o.type).join(', ') : 'none'}
                      </span>
                      {fn.inputs && fn.inputs.length > 0 && (
                        <form style={{ marginTop: 18, marginBottom: 8 }} onSubmit={e => { e.preventDefault(); handleCallFunction(fn); }}>
                          {fn.inputs.map((input, i) => (
                            <input
                              key={i}
                              type="text"
                              placeholder={input.name + ' (' + input.type + ')'}
                              value={inputs[fn.name]?.[i] || ''}
                              onChange={e => handleInputChange(fn.name, i, e.target.value)}
                              style={{ marginRight: 8, padding: '4px 8px', borderRadius: 4, border: `1px solid ${theme.primary}`, fontSize: '0.96em' }}
                            />
                          ))}
                          <button type="submit" disabled={loading[fn.name]} style={{ marginTop: 8, padding: '4px 14px', borderRadius: 4, background: theme.primary, color: '#fff', border: 'none', fontWeight: 600, cursor: 'pointer', marginLeft: 8 }}>
                            Call
                          </button>
                        </form>
                      )}
                      {(!fn.inputs || fn.inputs.length === 0) && (
                        <div style={{ marginTop: 18 }}>
                          <button onClick={() => handleCallFunction(fn)} disabled={loading[fn.name]} style={{ padding: '4px 14px', borderRadius: 4, background: theme.primary, color: '#fff', border: 'none', fontWeight: 600, cursor: 'pointer' }}>
                            Call
                          </button>
                        </div>
                      )}
                      {results[fn.name] !== undefined && (
                        <div style={{ 
                          marginTop: 8, 
                          color: results[fn.name] && results[fn.name].toString().includes('ERROR') ? '#d32f2f' : 
                                 results[fn.name] && results[fn.name].toString().startsWith('Tx sent') ? theme.primary : 
                                 theme.textSecondary, 
                          fontSize: '0.96em', 
                          wordBreak: 'break-word',
                          padding: '8px',
                          background: results[fn.name] && results[fn.name].toString().includes('ERROR') ? 'rgba(211, 47, 47, 0.1)' : 'transparent',
                          borderRadius: 4
                        }}>
                          <span style={{ color: results[fn.name] && results[fn.name].toString().includes('ERROR') ? '#d32f2f' : results[fn.name] && results[fn.name].toString().startsWith('Tx sent') ? theme.primary : theme.textSecondary, fontWeight: 600 }}>
                            Result:
                          </span> 
                          {results[fn.name] && results[fn.name].toString().startsWith('Tx sent:') ? (
                            (() => {
                              const hash = results[fn.name].toString().replace('Tx sent: ', '').trim();
                              return (
                                <a
                                  href={getExplorerUrl('tx', hash, network)}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{ color: theme.primary, textDecoration: 'none', wordBreak: 'break-all', fontWeight: 600 }}
                                >
                                  {hash}
                                </a>
                              );
                            })()
                          ) : (
                            <span style={{ color: results[fn.name] && results[fn.name].toString().includes('ERROR') ? '#d32f2f' : results[fn.name] && results[fn.name].toString().startsWith('Tx sent') ? theme.primary : theme.textSecondary }}>
                              {results[fn.name]?.toString()}
                            </span>
                          )}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <div style={{ color: theme.textSecondary }}>No read functions found.</div>
              )}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ color: theme.textSecondary, fontWeight: 600, marginBottom: 10 }}>Write (state-changing)</div>
              {writeFunctions.length > 0 ? (
                <ul style={{ color: theme.textPrimary, fontSize: '0.98em', listStyle: 'none', padding: 0 }}>
                  {writeFunctions.map((fn, idx) => (
                    <li key={idx} style={{ marginBottom: 16, background: theme.cardBg, borderRadius: 6, padding: '12px 14px' }}>
                      {functionDescriptions[fn.name] ? (
                        <>
                          <span style={{ fontWeight: 500, color: theme.textPrimary }}>{functionDescriptions[fn.name].signature}</span>
                          <span style={{ color: theme.textSecondary, fontWeight: 400 }}> (</span>
                          <span style={{ color: theme.textPrimary, fontWeight: 500 }}>{functionDescriptions[fn.name].signatureType}</span>
                          <span style={{ color: theme.textSecondary, fontWeight: 400 }}>) – </span>
                            <span style={{ fontSize: '0.92em', color: theme.textSecondary, fontWeight: 400 }}>{functionDescriptions[fn.name].description}</span>
                        </>
                      ) : (
                        <span>
                          <b>{fn.name}</b> <span style={{ color: theme.textSecondary }}>({fn.stateMutability})</span>
                        </span>
                      )}
                      <br />
                      <span style={{ fontSize: '0.92em', color: theme.textSecondary }}>
                        Inputs: {fn.inputs && fn.inputs.length > 0 ? fn.inputs.map(i => i.name + ': ' + i.type).join(', ') : 'none'}<br />
                        Outputs: {fn.outputs && fn.outputs.length > 0 ? fn.outputs.map(o => o.type).join(', ') : 'none'}
                      </span>
                      {fn.inputs && fn.inputs.length > 0 && (
                        <form style={{ marginTop: 18, marginBottom: 8 }} onSubmit={e => { e.preventDefault(); handleCallFunction(fn); }}>
                          {fn.inputs.map((input, i) => (
                            <input
                              key={i}
                              type="text"
                              placeholder={input.name + ' (' + input.type + ')'}
                              value={inputs[fn.name]?.[i] || ''}
                              onChange={e => handleInputChange(fn.name, i, e.target.value)}
                              style={{ marginRight: 8, padding: '4px 8px', borderRadius: 4, border: `1px solid ${theme.primary}`, fontSize: '0.96em' }}
                            />
                          ))}
                          <button type="submit" disabled={loading[fn.name]} style={{ marginTop: 8, padding: '4px 14px', borderRadius: 4, background: theme.primary, color: '#fff', border: 'none', fontWeight: 600, cursor: 'pointer', marginLeft: 8 }}>
                            Send
                          </button>
                        </form>
                      )}
                      {(!fn.inputs || fn.inputs.length === 0) && (
                        <div style={{ marginTop: 18 }}>
                          <button onClick={() => handleCallFunction(fn)} disabled={loading[fn.name]} style={{ padding: '4px 14px', borderRadius: 4, background: theme.primary, color: '#fff', border: 'none', fontWeight: 600, cursor: 'pointer' }}>
                            Send
                          </button>
                        </div>
                      )}
                      {results[fn.name] !== undefined && (
                        <div style={{ 
                          marginTop: 8, 
                          color: results[fn.name] && results[fn.name].toString().includes('ERROR') ? '#d32f2f' : 
                                 results[fn.name] && results[fn.name].toString().startsWith('Tx sent') ? theme.primary : 
                                 theme.textSecondary, 
                          fontSize: '0.96em', 
                          wordBreak: 'break-word',
                          padding: '8px',
                          background: results[fn.name] && results[fn.name].toString().includes('ERROR') ? 'rgba(211, 47, 47, 0.1)' : 'transparent',
                          borderRadius: 4
                        }}>
                          <span style={{ color: results[fn.name] && results[fn.name].toString().includes('ERROR') ? '#d32f2f' : results[fn.name] && results[fn.name].toString().startsWith('Tx sent') ? theme.primary : theme.textSecondary, fontWeight: 600 }}>
                            Result:
                          </span> 
                          {results[fn.name] && results[fn.name].toString().startsWith('Tx sent:') ? (
                            (() => {
                              const hash = results[fn.name].toString().replace('Tx sent: ', '').trim();
                              return (
                                <a
                                  href={getExplorerUrl('tx', hash, network)}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="tx-hash-link"
                                  style={{ color: theme.primary, textDecoration: 'none', wordBreak: 'break-all', fontWeight: 600 }}
                                >
                                  {hash}
                                </a>
                              );
                            })()
                          ) : (
                            <span style={{ color: results[fn.name] && results[fn.name].toString().includes('ERROR') ? '#d32f2f' : results[fn.name] && results[fn.name].toString().startsWith('Tx sent') ? theme.primary : theme.textSecondary }}>
                              {results[fn.name]?.toString()}
                            </span>
                          )}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <div style={{ color: theme.textSecondary }}>No write functions found.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};
