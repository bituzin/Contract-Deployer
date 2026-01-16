import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import artifactsSimpleStorage from '../../artifacts/contracts/SimpleStorage.sol/SimpleStorage.json';
import artifactsClickCounter from '../../artifacts/contracts/ClickCounter.sol/ClickCounter.json';
import artifactsMessageBoard from '../../artifacts/contracts/MessageBoard.sol/MessageBoard.json';
import artifactsSimpleVoting from '../../artifacts/contracts/SimpleVoting.sol/SimpleVoting.json';
import { useParams } from 'react-router-dom';

export const ContractInteract = ({ theme, isConnected, openModal }) => {
  const { contractName, contractAddress, network } = useParams();

  const [abi, setAbi] = useState([]);
  const [functions, setFunctions] = useState([]);
  const [inputs, setInputs] = useState({});
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState({});
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
      const contract = new ethers.Contract(contractAddress, abi, signer);
      const args = (inputs[fn.name] ? Object.values(inputs[fn.name]) : []);
      let result;
      if (fn.stateMutability === 'view' || fn.stateMutability === 'pure') {
        result = await contract[fn.name](...args);
      } else {
        const tx = await contract[fn.name](...args);
        result = tx.hash ? `Tx sent: ${tx.hash}` : tx;
      }
      setResults(prev => ({ ...prev, [fn.name]: result }));
    } catch (err) {
      setResults(prev => ({ ...prev, [fn.name]: err.message }));
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

  return (
    <div style={{ maxWidth: 720, margin: '60px auto 32px auto' }}>
      <div style={{ background: theme.cardBg + 'E6', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.04)', padding: '28px 32px', color: theme.textPrimary, fontSize: '0.96em', fontFamily: 'Inter, Arial, sans-serif', fontWeight: 500, textAlign: 'left', lineHeight: 1.7 }}>
        <h2 style={{ color: theme.textPrimary, fontWeight: 700, fontSize: '1.2em', margin: 0, marginBottom: 18 }}>
          Contract: {contractName}
        </h2>
        
        <div style={{ marginBottom: 12, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}>
          <div style={{ fontSize: '0.82em', color: theme.textPrimary, fontWeight: 500, background: theme.cardBgDark, padding: '5px 10px', borderRadius: 6, fontFamily: 'monospace', minWidth: 0 }}>
            Network: {network}
          </div>
          <div style={{ fontSize: '0.82em', color: theme.textPrimary, fontWeight: 500, background: theme.cardBgDark, padding: '5px 10px', borderRadius: 6, fontFamily: 'monospace', minWidth: 0 }}>
            Contract Address: {contractAddress}
          </div>
          <div style={{ fontSize: '0.82em', color: theme.textPrimary, fontWeight: 500, background: theme.cardBgDark, padding: '5px 10px', borderRadius: 6, fontFamily: 'monospace', minWidth: 0 }}>
            Deployment date: {new Date().toLocaleString()}
          </div>
        </div>
        <div style={{ marginTop: 24, padding: '20px', background: theme.cardBgDark, borderRadius: 8 }}>
          <div style={{ color: theme.textSecondary, fontSize: '0.92em', textAlign: 'center', marginBottom: 12 }}>
            Available contract functions:
          </div>
          {functions.length > 0 ? (
            <ul style={{ color: theme.textPrimary, fontSize: '0.98em', listStyle: 'none', padding: 0 }}>
              {functions.map((fn, idx) => (
                <li key={idx} style={{ marginBottom: 16, background: theme.cardBg, borderRadius: 6, padding: '12px 14px' }}>
                  <b>{fn.name}</b> (<span style={{ color: theme.textSecondary }}>{fn.stateMutability}</span>)<br />
                  <span style={{ fontSize: '0.92em', color: theme.textSecondary }}>
                    Inputs: {fn.inputs && fn.inputs.length > 0 ? fn.inputs.map(i => i.name + ': ' + i.type).join(', ') : 'none'}<br />
                    Outputs: {fn.outputs && fn.outputs.length > 0 ? fn.outputs.map(o => o.type).join(', ') : 'none'}
                  </span>
                  {fn.inputs && fn.inputs.length > 0 && (
                    <form style={{ marginTop: 8, marginBottom: 8 }} onSubmit={e => { e.preventDefault(); handleCallFunction(fn); }}>
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
                      <button type="submit" disabled={loading[fn.name]} style={{ padding: '4px 14px', borderRadius: 4, background: theme.primary, color: '#fff', border: 'none', fontWeight: 600, cursor: 'pointer', marginLeft: 8 }}>
                        {fn.stateMutability === 'view' || fn.stateMutability === 'pure' ? 'Call' : 'Send'}
                      </button>
                    </form>
                  )}
                  {(!fn.inputs || fn.inputs.length === 0) && (
                    <button onClick={() => handleCallFunction(fn)} disabled={loading[fn.name]} style={{ marginTop: 8, padding: '4px 14px', borderRadius: 4, background: theme.primary, color: '#fff', border: 'none', fontWeight: 600, cursor: 'pointer' }}>
                      {fn.stateMutability === 'view' || fn.stateMutability === 'pure' ? 'Call' : 'Send'}
                    </button>
                  )}
                  {results[fn.name] !== undefined && (
                    <div style={{ marginTop: 8, color: results[fn.name] && results[fn.name].toString().startsWith('Tx sent') ? theme.textPrimary : theme.textSecondary, fontSize: '0.96em', wordBreak: 'break-word' }}>
                      <b>Result:</b> {results[fn.name]?.toString()}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <div style={{ color: theme.textSecondary }}>No ABI or functions found for this contract.</div>
          )}
        </div>
      </div>
    </div>
  );
};
