import { useState } from 'react';
import { BackButton } from './common/BackButton';
import { DeploymentCard } from './DeploymentCard';



export const MyDeployments = ({ theme, deployments, isConnected, openModal, network }) => {
  // Stan do filtrowania po nazwie kontraktu (tylko dla Optimism)
  const [filteredContractName, setFilteredContractName] = useState(null);
  const formatDate = (timestamp) => {
    const date = timestamp ? new Date(timestamp) : new Date();
    return date.toLocaleString();
  };

  // Filtrowanie po aktualnie wybranej sieci (z Header)
  const selectedNetwork = network;
  const filteredDeployments = deployments.filter(
    (deployment) => deployment.network === selectedNetwork && (!filteredContractName || deployment.contractName === filteredContractName)
  );
  
  // Debug logging
  console.log('MyDeployments - Current network:', network);
  console.log('MyDeployments - All deployments:', deployments.length, deployments);
  console.log('MyDeployments - Filtered deployments:', filteredDeployments.length, filteredDeployments);
  // const totalFilteredDeployments = filteredDeployments.length;
  // const lastDeployment = filteredDeployments[0];
  // const lastDeploymentDate = lastDeployment ? formatDate(lastDeployment.timestamp) : '—';
  // const lastDeploymentName = lastDeployment ? lastDeployment.contractName : '—';
  // Statystyki na podstawie wszystkich deploymentów na wybranej sieci
  const networkDeployments = deployments.filter((deployment) => deployment.network === selectedNetwork);
  const contractAggregates = networkDeployments.reduce((acc, deployment) => {
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
        <div style={{ background: theme.cardBg + 'E6', border: `1px solid ${theme.primary}`, borderRadius: 10, boxShadow: '0 2px 12px rgba(0,0,0,0.04)', padding: '28px 32px', color: theme.textPrimary, fontSize: '0.96em', fontFamily: 'Inter, Arial, sans-serif', fontWeight: 500, textAlign: 'center', lineHeight: 1.7, minHeight: 320, maxWidth: 720 }}>
          <h2 style={{ color: theme.textPrimary, fontWeight: 700, fontSize: '1.2em', margin: 0, marginBottom: 18 }}>My Deployments</h2>
          <div style={{ marginBottom: 24 }}>
            Connect your wallet to view your deployed contracts.
          </div>
          <button
            style={{
              fontSize: '0.9em',
              padding: '0.45em 1.4em',
              background: theme.primary,
              color: network === 'Celo' ? '#444' : '#fff',
              border: 'none',
              borderRadius: 10,
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: `0 2px 8px ${theme.shadow}`,
              transition: 'background 0.2s',
              minWidth: 120
            }}
            onMouseOver={e => (e.currentTarget.style.background = theme.primaryDark)}
            onMouseOut={e => (e.currentTarget.style.background = theme.primary)}
            onClick={openModal}
          >Connect</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 940, margin: '60px auto 32px auto' }}>
      <div style={{ background: theme.cardBg + 'E6', border: `1px solid ${theme.primary}`, borderRadius: 10, boxShadow: '0 2px 12px rgba(0,0,0,0.04)', padding: '28px 32px', color: theme.textPrimary, fontSize: '0.96em', fontFamily: 'Inter, Arial, sans-serif', fontWeight: 500, textAlign: 'left', lineHeight: 1.7, maxWidth: 940 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
          <h2 style={{ color: theme.textPrimary, fontWeight: 700, fontSize: '1.2em', margin: 0 }}>My Deployments</h2>
          <BackButton theme={theme} to="/deploy">
            Back to Deploy
          </BackButton>
        </div>
        
        {networkDeployments.length > 0 && (
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontSize: '0.88em', color: theme.textSecondary, fontWeight: 600, marginBottom: 14 }}>Deployment statistics ({currentNetworkLabel})</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px' }}>
              <div style={{ background: `rgba(${theme.primaryRgb},0.08)`, border: `1px solid ${theme.primary}`, borderRadius: 10, padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                <span style={{ fontSize: '0.78em', letterSpacing: 0.2, color: theme.textSecondary, fontWeight: 600 }}>Contracts on {network}</span>
                <span style={{ fontSize: '1.6em', fontWeight: 700, color: theme.textPrimary }}>{networkDeployments.length}</span>
              </div>
              <div style={{ background: `rgba(${theme.primaryRgb},0.08)`, border: `1px solid ${theme.primary}`, borderRadius: 10, padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                <span style={{ fontSize: '0.78em', letterSpacing: 0.2, color: theme.textSecondary, fontWeight: 600 }}>Last deployment date</span>
                <span style={{ fontSize: '1em', fontWeight: 600, color: theme.textPrimary }}>{networkDeployments[0] ? formatDate(networkDeployments[0].timestamp) : '—'}</span>
              </div>
              <div style={{ background: `rgba(${theme.primaryRgb},0.08)`, border: `1px solid ${theme.primary}`, borderRadius: 10, padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                <span style={{ fontSize: '0.78em', letterSpacing: 0.2, color: theme.textSecondary, fontWeight: 600 }}>Last contract</span>
                <span style={{ fontSize: '1em', fontWeight: 700, color: theme.textPrimary }}>{networkDeployments[0] ? networkDeployments[0].contractName : '—'}</span>
              </div>
            </div>
            {contractStats.length > 0 && (
              <div style={{ marginTop: 24 }}>
                {/* Filtr po nazwie kontraktu tylko na Optimism */}
                <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', flexWrap: 'wrap' }}>
                  <button
                    style={{ padding: '6px 16px', borderRadius: 10, border: `1px solid ${theme.primary}`, background: !filteredContractName ? theme.primary : theme.cardBg, color: !filteredContractName ? '#fff' : theme.textPrimary, fontWeight: 600, cursor: 'pointer' }}
                    onClick={() => setFilteredContractName(null)}
                  >Show all</button>
                  {contractStats.map((stat) => (
                    <div
                      key={stat.name}
                      style={{ minWidth: 'auto', maxWidth: 'none', border: `1px solid ${theme.primary}`, borderRadius: 10, padding: '8px 18px', background: `rgba(${theme.primaryRgb},0.12)`, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, fontSize: '1em', fontWeight: 600, whiteSpace: 'nowrap', cursor: 'pointer', boxShadow: filteredContractName === stat.name ? `0 0 0 2px ${theme.primary}` : 'none' }}
                      onClick={() => setFilteredContractName(stat.name)}
                      title={`Show only ${stat.name} contracts`}
                    >
                      <span style={{ color: theme.textPrimary }}>{stat.name}</span>
                      <span style={{ color: theme.textPrimary, marginLeft: 10 }}>{stat.count}</span>
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
            {/* Removed 'Showing ... deployments' line as requested */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {filteredDeployments.map((deployment) => (
                <DeploymentCard
                  key={deployment.id}
                  deployment={deployment}
                  theme={theme}
                  network={network}
                  formatDate={formatDate}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
