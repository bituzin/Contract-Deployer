
import { useState } from 'react';
import { getExplorerUrl } from '../config/explorers';



export const MyDeployments = ({ theme, deployments, isConnected, openModal, network }) => {
  // Dodany stan do filtrowania po nazwie kontraktu
  const [filteredContractName, setFilteredContractName] = useState(null);
  const formatDate = (timestamp) => {
    const date = timestamp ? new Date(timestamp) : new Date();
    return date.toLocaleString();
  };

  // Filtrowanie tylko dla Optimism
  const selectedNetwork = 'Optimism';
  const filteredDeployments = deployments.filter(
    (deployment) => deployment.network === selectedNetwork && (!filteredContractName || deployment.contractName === filteredContractName)
  );
  
  // Debug logging
  console.log('MyDeployments - Current network:', network);
  console.log('MyDeployments - All deployments:', deployments.length, deployments);
  console.log('MyDeployments - Filtered deployments:', filteredDeployments.length, filteredDeployments);
  const totalFilteredDeployments = filteredDeployments.length;
  const lastDeployment = filteredDeployments[0];
  const lastDeploymentDate = lastDeployment ? formatDate(lastDeployment.timestamp) : '—';
  const lastDeploymentName = lastDeployment ? lastDeployment.contractName : '—';
  // Statystyki na podstawie wszystkich deploymentów na Optimism
  const optimismDeployments = deployments.filter((deployment) => deployment.network === selectedNetwork);
  const contractAggregates = optimismDeployments.reduce((acc, deployment) => {
    const name = deployment.contractName || 'Unknown contract';
    acc[name] = (acc[name] || 0) + 1;
    return acc;
  }, {});
  const contractStats = Object.entries(contractAggregates)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
  const currentNetworkLabel = `Network ${selectedNetwork}`;

  if (!isConnected) {
    return (
      <div style={{ maxWidth: 720, margin: '60px auto 32px auto' }}>
        <div style={{ background: theme.cardBg + 'E6', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.04)', padding: '28px 32px', color: theme.textPrimary, fontSize: '0.96em', fontFamily: 'Inter, Arial, sans-serif', fontWeight: 500, textAlign: 'center', lineHeight: 1.7, minHeight: 320, maxWidth: 720 }}>
          <h2 style={{ color: theme.textPrimary, fontWeight: 700, fontSize: '1.2em', margin: 0, marginBottom: 18 }}>My Deployments</h2>
          <div style={{ marginBottom: 24 }}>
            Connect your wallet to view your deployed contracts.
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
              transition: 'background 0.2s'
            }}
            onMouseOver={e => e.currentTarget.style.background = theme.primaryDark}
            onMouseOut={e => e.currentTarget.style.background = theme.primary}
            onClick={openModal}
          >Connect Wallet</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 940, margin: '60px auto 32px auto' }}>
      <div style={{ background: theme.cardBg + 'E6', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.04)', padding: '28px 32px', color: theme.textPrimary, fontSize: '0.96em', fontFamily: 'Inter, Arial, sans-serif', fontWeight: 500, textAlign: 'left', lineHeight: 1.7, maxWidth: 940 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
          <h2 style={{ color: theme.textPrimary, fontWeight: 700, fontSize: '1.2em', margin: 0 }}>My Deployments</h2>
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
            onClick={() => window.location.href = '/deploy'}
          >
            Back to Deploy
          </button>
        </div>
        
        {totalFilteredDeployments > 0 && (
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontSize: '0.88em', color: theme.textSecondary, fontWeight: 600, marginBottom: 14 }}>Deployment statistics ({currentNetworkLabel})</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px' }}>
              <div style={{ background: `rgba(${theme.primaryRgb},0.08)`, border: `1px solid rgba(${theme.primaryRgb},0.25)`, borderRadius: 10, padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                <span style={{ fontSize: '0.78em', letterSpacing: 0.2, color: theme.textSecondary, fontWeight: 600 }}>Contracts on {network}</span>
                <span style={{ fontSize: '1.6em', fontWeight: 700, color: theme.textPrimary }}>{totalFilteredDeployments}</span>
              </div>
              <div style={{ background: `rgba(${theme.primaryRgb},0.08)`, border: `1px solid rgba(${theme.primaryRgb},0.25)`, borderRadius: 10, padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                <span style={{ fontSize: '0.78em', letterSpacing: 0.2, color: theme.textSecondary, fontWeight: 600 }}>Last deployment date</span>
                <span style={{ fontSize: '1em', fontWeight: 600, color: theme.textPrimary }}>{lastDeploymentDate}</span>
              </div>
              <div style={{ background: `rgba(${theme.primaryRgb},0.08)`, border: `1px solid rgba(${theme.primaryRgb},0.25)`, borderRadius: 10, padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                <span style={{ fontSize: '0.78em', letterSpacing: 0.2, color: theme.textSecondary, fontWeight: 600 }}>Last contract</span>
                <span style={{ fontSize: '1em', fontWeight: 700, color: theme.textPrimary }}>{lastDeploymentName}</span>
              </div>
            </div>
            {contractStats.length > 0 && (
              <div style={{ marginTop: 24 }}>
                {/* Removed 'Contracts on ...' label as requested */}
                <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', flexWrap: 'wrap' }}>
                  {contractStats.map((stat) => (
                    <div
                      key={stat.name}
                      style={{ minWidth: 'auto', maxWidth: 'none', border: `1px solid rgba(${theme.primaryRgb},0.25)`, borderRadius: 8, padding: '8px 18px', background: `rgba(${theme.primaryRgb},0.12)`, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, fontSize: '1em', fontWeight: 600, whiteSpace: 'nowrap', cursor: 'pointer', boxShadow: filteredContractName === stat.name ? `0 0 0 2px ${theme.primary}` : 'none' }}
                      onClick={() => setFilteredContractName(stat.name)}
                      title={`Show only ${stat.name} contracts`}
                    >
                      <span style={{ color: theme.textPrimary }}>{stat.name}</span>
                      <span style={{ color: theme.textPrimary, marginLeft: 10 }}>{stat.count}</span>
                    </div>
                  ))}
                  {filteredContractName && (
                    <button
                      style={{ marginLeft: 16, padding: '6px 16px', borderRadius: 8, border: `1px solid ${theme.primary}`, background: theme.cardBg, color: theme.textPrimary, fontWeight: 600, cursor: 'pointer' }}
                      onClick={() => setFilteredContractName(null)}
                    >Show all</button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
        
        {deployments.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: theme.textSecondary }}>
            <p style={{ fontSize: '1.08em', marginBottom: 16 }}>No deployments yet</p>
            <p style={{ fontSize: '0.92em' }}>Deploy your first contract to see it here!</p>
          </div>
        ) : filteredDeployments.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: theme.textSecondary }}>
            <p style={{ fontSize: '1.08em', marginBottom: 16 }}>No deployments on {network}</p>
            <p style={{ fontSize: '0.92em' }}>Switch networks to view other deployments.</p>
          </div>
        ) : (
          <div>
            {/* Removed 'Showing ... deployments' line as requested */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {filteredDeployments.map((deployment) => {
                const explorerUrl = getExplorerUrl('address', deployment.contractAddress, deployment.network);
                const txUrl = getExplorerUrl('tx', deployment.txHash, deployment.network);
                const fullAddress = deployment.contractAddress;
                const fullTx = deployment.txHash;

                return (
                  <div
                    key={deployment.id}
                    style={{
                      background: `rgba(${theme.primaryRgb},0.08)`,
                      border: `1px solid ${theme.primary}`,
                      borderRadius: '10px',
                      padding: '16px 20px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '1.04em', color: theme.textPrimary, marginBottom: 4 }}>
                          {deployment.contractName}
                        </div>
                        <div style={{ fontSize: '0.88em', color: theme.textSecondary }}>
                          {formatDate(deployment.timestamp)}
                        </div>
                      </div>
                      <div style={{ fontSize: '0.86em', fontWeight: 600, background: theme.highlight, color: '#444', padding: '4px 12px', borderRadius: '6px' }}>
                        {deployment.network}
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div>
                        <div style={{ fontSize: '0.8em', color: theme.textSecondary, marginBottom: 4, fontWeight: 600 }}>Contract Address</div>
                        <div style={{ display: 'flex', alignItems: 'center', background: theme.cardBgDark, padding: '8px 12px', borderRadius: '6px', fontSize: '0.82em', fontFamily: 'monospace' }}>
                          {explorerUrl ? (
                            <a
                              href={explorerUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ color: theme.textPrimary, textDecoration: 'none', wordBreak: 'break-all', flex: 1 }}
                              onMouseOver={e => e.currentTarget.style.textDecoration = 'underline'}
                              onMouseOut={e => e.currentTarget.style.textDecoration = 'none'}
                            >
                              {fullAddress}
                            </a>
                          ) : (
                            <span style={{ color: theme.textPrimary, wordBreak: 'break-all', flex: 1 }}>{fullAddress}</span>
                          )}
                        </div>
                      </div>

                      <div>
                        <div style={{ fontSize: '0.8em', color: theme.textSecondary, marginBottom: 4, fontWeight: 600 }}>Transaction Hash</div>
                        <div style={{ display: 'flex', alignItems: 'center', background: theme.cardBgDark, padding: '8px 12px', borderRadius: '6px', fontSize: '0.82em', fontFamily: 'monospace' }}>
                          {txUrl ? (
                            <a
                              href={txUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ color: theme.textPrimary, textDecoration: 'none', wordBreak: 'break-all', flex: 1 }}
                              onMouseOver={e => e.currentTarget.style.textDecoration = 'underline'}
                              onMouseOut={e => e.currentTarget.style.textDecoration = 'none'}
                            >
                              {fullTx}
                            </a>
                          ) : (
                            <span style={{ color: theme.textPrimary, wordBreak: 'break-all', flex: 1 }}>{fullTx}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Interact button only for Celo network */}
                    {(deployment.network === 'Celo' || deployment.network === 'Sepolia' || deployment.network === 'Optimism' || deployment.network === 'Base') && (
                      <button
                        style={{
                          marginTop: 8,
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
                          minWidth: 'fit-content',
                          maxWidth: 180,
                          whiteSpace: 'nowrap',
                          letterSpacing: '0.01em'
                        }}
                        onMouseOver={e => e.currentTarget.style.background = theme.primaryDark}
                        onMouseOut={e => e.currentTarget.style.background = theme.primary}
                        onClick={() => window.location.href = `/interact/${deployment.contractName}/${deployment.contractAddress}/${deployment.network}`}
                      >Interact with contract</button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
