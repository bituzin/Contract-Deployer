import React from 'react';
import { Link } from 'react-router-dom';
import { contracts } from '../config/contracts';

export const ContractsList = ({ theme }) => {
  // Funkcja konwertująca camelCase/PascalCase na kebab-case
  const toKebabCase = (str) => {
    return str
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .toLowerCase();
  };

  return (
    <div style={{ maxWidth: 940, margin: '60px auto 32px auto' }}>
      <div style={{ 
        background: theme.cardBg + 'E6', 
        borderRadius: 12, 
        boxShadow: '0 2px 12px rgba(0,0,0,0.04)', 
        padding: '28px 32px', 
        color: theme.textPrimary, 
        fontSize: '0.96em', 
        fontFamily: 'Inter, Arial, sans-serif', 
        fontWeight: 500, 
        textAlign: 'left', 
        lineHeight: 1.7, 
        minHeight: 320 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
          <h2 style={{ color: theme.textPrimary, fontWeight: 700, fontSize: '1.2em', margin: 0 }}>Available Contracts</h2>
          <button
            style={{
              marginLeft: 18,
              fontSize: '0.86em',
              padding: '3px 10px',
              background: theme.cardBg,
              color: theme.textPrimary,
              border: `1px solid ${theme.primary}`,
              borderRadius: '10px',
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
        <div style={{ 
          fontSize: '0.95em', 
          color: theme.textPrimary, 
          fontFamily: 'Inter, Arial, sans-serif', 
          fontWeight: 500, 
          textAlign: 'left', 
          marginBottom: 28 
        }}>
          Choose a contract to view details.
        </div>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
          gap: '18px' 
        }}>
          {contracts.map((contract) => (
            <Link
              key={contract.name}
              to={`/contract/${toKebabCase(contract.name)}`}
              style={{
                textDecoration: 'none',
                background: `rgba(${theme.primaryRgb},0.08)`,
                borderRadius: 10,
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                border: `2px solid ${theme.primary}`,
                padding: '24px 20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                transition: 'all 0.2s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = `0 4px 20px ${theme.shadow}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)';
              }}
            >
              <div style={{
                fontWeight: 700,
                fontSize: '1.1em',
                color: theme.textPrimary,
                marginBottom: 12,
              }}>
                {contract.name}
              </div>
              <div style={{
                fontSize: '0.92em',
                color: theme.textSecondary,
                lineHeight: 1.5
              }}>
                {contract.description}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
