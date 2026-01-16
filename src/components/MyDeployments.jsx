import { getExplorerUrl } from '../config/explorers';

// Popup logic copied from Interact.jsx
function handleOpenContract(deployment, theme, setPopup) {
  if (!setPopup) return;
  const explorerUrl = getExplorerUrl('address', deployment.contractAddress, deployment.network) || '#';
  const contractRoute = `/interact/${deployment.contractName}/${deployment.contractAddress}/${deployment.network}`;
  const formatDate = (timestamp) => {
    const date = timestamp ? new Date(timestamp) : new Date();
    return date.toLocaleString();
  };
  const content = (
    <div>
      <div style={{ fontWeight: 700, marginBottom: 8 }}>{deployment.contractName}</div>
      <div style={{ fontSize: '0.9em', color: theme.textSecondary, marginBottom: 12 }}>{formatDate(deployment.timestamp)}</div>
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: '0.82em', color: theme.textSecondary, marginBottom: 6 }}>Contract address</div>
        <div style={{ fontFamily: 'monospace', background: theme.cardBgDark, padding: '8px 10px', borderRadius: 6 }}>{deployment.contractAddress}</div>
      </div>
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
        <a href={contractRoute} style={{ padding: '8px 12px', background: theme.primary, color: '#fff', borderRadius: 8, textDecoration: 'none', fontWeight: 600 }} onClick={() => setPopup({ visible: false, message: '', txHash: null, content: null })}>Interact</a>
        <a href={explorerUrl} target="_blank" rel="noopener noreferrer" style={{ padding: '8px 12px', background: theme.cardBgDark, color: theme.textPrimary, borderRadius: 8, textDecoration: 'none', fontWeight: 600 }}>Open in explorer</a>
      </div>
    </div>
  );
  setPopup({ visible: true, message: '', txHash: null, network: deployment.network, content });
}

export const MyDeployments = ({ theme, deployments, isConnected, openModal, network, setPopup }) => {
  const formatDate = (timestamp) => {
    const date = timestamp ? new Date(timestamp) : new Date();
    return date.toLocaleString();
  };

  const filteredDeployments = network ? deployments.filter((deployment) => deployment.network === network) : deployments;
  const totalDeployments = deployments.length;
  const totalFilteredDeployments = filteredDeployments.length;
  const lastDeployment = deployments[0];
  const lastDeploymentDate = lastDeployment ? formatDate(lastDeployment.timestamp) : '—';
  const lastDeploymentName = lastDeployment ? lastDeployment.contractName : '—';
  const contractAggregates = deployments.reduce((acc, deployment) => {
    const name = deployment.contractName || 'Unknown contract';
    if (!acc[name]) {
      acc[name] = { total: 0, perNetwork: {} };
    }
    acc[name].total += 1;
    const networkKey = deployment.network || 'Other network';
    acc[name].perNetwork[networkKey] = (acc[name].perNetwork[networkKey] || 0) + 1;
    return acc;
  }, {});
  const contractStats = Object.entries(contractAggregates)
    .map(([name, data]) => ({
      name,
      total: data.total,
      currentNetworkCount: network ? (data.perNetwork[network] || 0) : data.total
    }))
    .sort((a, b) => b.total - a.total);
  const currentNetworkLabel = network ? `Network ${network}` : 'All networks';

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
        <h2 style={{ color: theme.textPrimary, fontWeight: 700, fontSize: '1.2em', margin: 0, marginBottom: 24 }}>My Deployments</h2>
        
        {totalDeployments > 0 && (
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontSize: '0.88em', color: theme.textSecondary, fontWeight: 600, marginBottom: 14 }}>Deployment statistics</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px' }}>
              <div style={{ background: `rgba(${theme.primaryRgb},0.08)`, border: `1px solid rgba(${theme.primaryRgb},0.25)`, borderRadius: 10, padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                <span style={{ fontSize: '0.78em', letterSpacing: 0.2, color: theme.textSecondary, fontWeight: 600 }}>All contracts</span>
                <span style={{ fontSize: '1.6em', fontWeight: 700, color: theme.textPrimary }}>{totalDeployments}</span>
              </div>
              <div style={{ background: `rgba(${theme.primaryRgb},0.08)`, border: `1px solid rgba(${theme.primaryRgb},0.25)`, borderRadius: 10, padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                <span style={{ fontSize: '0.78em', letterSpacing: 0.2, color: theme.textSecondary, fontWeight: 600 }}>{currentNetworkLabel}</span>
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
                <div style={{ fontSize: '0.82em', color: theme.textSecondary, fontWeight: 600, marginBottom: 12 }}>Individual contracts</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px' }}>
                  {contractStats.map((stat) => (
                    <div key={stat.name} style={{ border: `1px solid rgba(${theme.primaryRgb},0.25)`, borderRadius: 8, padding: '12px 14px', background: `rgba(${theme.primaryRgb},0.08)`, display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <div style={{ fontWeight: 600, color: theme.textPrimary }}>{stat.name}</div>
                      <div style={{ fontSize: '0.82em', color: theme.textSecondary }}>All: <b style={{ color: theme.textPrimary }}>{stat.total}</b></div>
                      <div style={{ fontSize: '0.82em', color: theme.textSecondary }}>{`${currentNetworkLabel}: `}<b style={{ color: theme.textPrimary }}>{stat.currentNetworkCount}</b></div>
                    </div>
                  ))}
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
            <div style={{ fontSize: '0.92em', color: theme.textSecondary, marginBottom: 24 }}>
              Showing {network} deployments: <b>{filteredDeployments.length}</b>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {filteredDeployments.map((deployment) => {
                const explorerUrl = getExplorerUrl('address', deployment.contractAddress, deployment.network);
                const txUrl = getExplorerUrl('tx', deployment.txHash, deployment.network);
                const shortAddress = `${deployment.contractAddress.slice(0, 10)}...${deployment.contractAddress.slice(-8)}`;
                const shortTx = `${deployment.txHash.slice(0, 10)}...${deployment.txHash.slice(-8)}`;

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
                            >
                              {shortAddress}
                            </a>
                          ) : (
                            <span style={{ color: theme.textPrimary, wordBreak: 'break-all', flex: 1 }}>{shortAddress}</span>
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
                            >
                              {shortTx}
                            </a>
                          ) : (
                            <span style={{ color: theme.textPrimary, wordBreak: 'break-all', flex: 1 }}>{shortTx}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Interact button only for Celo network */}
                    {(deployment.network === 'Celo' || deployment.network === 'Sepolia' || deployment.network === 'Optimism' || deployment.network === 'Base') && (
                      <button
                        style={{
                          marginTop: 10,
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
                        onClick={() => handleOpenContract(deployment, theme, setPopup)}
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
