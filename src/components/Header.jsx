import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const Header = ({ theme, showHeader, showNav, network, networks, onNetworkChange, isConnected, address, onConnect, onDisconnect }) => {
  const [copied, setCopied] = useState(false);
  const displayAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '';

  const navLinkStyle = {
    textDecoration: 'none',
    color: theme.textPrimary,
    padding: '6px 14px',
    borderRadius: 8,
    margin: '0 4px',
    fontWeight: 600,
    fontSize: '1em',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    transition: 'background 0.2s, color 0.2s',
    background: 'transparent',
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
    display: 'inline-block',
  };

  const navLinkHoverStyle = {
    background: theme.highlight,
    color: '#222',
  };

  const [hovered, setHovered] = useState(null);

  return (
    <>
      {/* Pasek tytułu i wyboru sieci - oryginalny wygląd */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 32px',
          height: 68,
          boxSizing: 'border-box',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 1200,
          background: theme.gradient,
          fontFamily: 'Inter, Arial, sans-serif',
        }}
      >
        <span
          style={{
            color: '#fff',
            fontFamily: 'Inter, Arial, sans-serif',
            fontWeight: 700,
            fontSize: '1.5em',
            letterSpacing: '0.03em',
            opacity: showHeader ? 1 : 0,
            transition: 'opacity 1s',
          }}
        >
          Contract Deployer
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {networks && (
            <select
              value={network}
              onChange={onNetworkChange}
              style={{
                fontSize: '1em',
                padding: '4px 12px',
                borderRadius: 8,
                border: `1px solid ${theme.highlight}`,
                background: theme.cardBg,
                color: theme.textPrimary,
                fontWeight: 600,
                marginRight: 12,
              }}
            >
              {networks.map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          )}
          {isConnected && address && (
            <span
              style={{
                color: theme.textPrimary,
                background: theme.highlight,
                borderRadius: 8,
                padding: '4px 10px',
                fontWeight: 600,
                cursor: 'pointer',
                marginLeft: 8,
              }}
              onClick={() => {
                navigator.clipboard.writeText(address);
                setCopied(true);
                setTimeout(() => setCopied(false), 1000);
              }}
              title={address}
            >
              {displayAddress} {copied ? '✓' : ''}
            </span>
          )}
          {!isConnected && (
            <button
              style={{
                background: theme.highlight,
                color: '#222',
                border: 'none',
                borderRadius: 8,
                padding: '4px 14px',
                fontWeight: 700,
                cursor: 'pointer',
                marginLeft: 8,
              }}
              onClick={onConnect}
            >
              Connect
            </button>
          )}
          {isConnected && (
            <button
              style={{
                background: 'transparent',
                color: theme.textPrimary,
                border: `1px solid ${theme.highlight}`,
                borderRadius: 8,
                padding: '4px 14px',
                fontWeight: 700,
                cursor: 'pointer',
                marginLeft: 8,
              }}
              onClick={onDisconnect}
            >
              Disconnect
            </button>
          )}
        </div>
      </div>
      {/* Pasek nawigacyjny */}
      <div
        style={{
          width: 'fit-content',
          maxWidth: 'fit-content',
          margin: '0 auto',
          position: 'fixed',
          top: 68,
          left: 0,
          height: network === 'Base' ? '100vh' : undefined,
          display: 'flex',
          flexDirection: network === 'Base' ? 'column' : 'row',
          alignItems: network === 'Base' ? 'flex-start' : 'center',
          justifyContent: network === 'Base' ? 'flex-start' : 'center',
          gap: '8px',
          padding: network === 'Base' ? '24px 32px' : '0 32px',
          zIndex: 1100,
          background: theme.cardBg,
          fontFamily: 'Inter, Arial, sans-serif',
          fontWeight: 500,
          fontSize: '0.98em',
          color: theme.textPrimary,
          boxShadow: `0 2px 8px ${theme.shadow}`,
          opacity: showNav ? 0.92 : 0,
          transform: showNav ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.8s, transform 0.8s',
          pointerEvents: showNav ? 'auto' : 'none',
          minHeight: 44,
        }}
      >
        {['/', '/how', '/contracts', '/bytecodes', '/deploy', '/verify', '/my-deployments', '/interact'].map((path, idx, arr) => {
          const names = ['Home', 'How It Works', 'Contracts', 'Bytecodes', 'Deploy', 'Verify', 'My Deployments', 'Interact'];
          return (
            <React.Fragment key={path}>
              <Link
                to={path}
                style={
                  hovered === idx
                    ? { ...navLinkStyle, ...navLinkHoverStyle }
                    : navLinkStyle
                }
                onMouseEnter={() => setHovered(idx)}
                onMouseLeave={() => setHovered(null)}
              >
                {names[idx]}
              </Link>
              {idx < arr.length - 1 && (
                <span
                  style={{
                    display: 'block',
                    width: '80%',
                    height: 1,
                    background: 'rgba(0,0,0,0.18)',
                    margin: '6px auto',
                  }}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
};