import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Header = ({ theme, showHeader, showNav, network, networks, onNetworkChange, isConnected, address, onConnect, onDisconnect }) => {
  const [copied, setCopied] = useState(false);

  const displayAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '';

  const navLinkStyle = {
    textDecoration: 'none',
    color: theme.textPrimary,
    padding: '3px 7px',
    borderRadius: 8,
    margin: '0 2px',
    fontWeight: 600,
    fontSize: '0.9em',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    transition: 'background 0.2s, color 0.2s',
    flexShrink: 0,
  };
  // ...existing code...
  // --- KONIEC LOGIKI, POCZĄTEK JSX ---
  return (
    <>
      {/* Pasek tytułu i wyboru sieci */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 32px',
          height: 68,
          boxSizing: 'border-box',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 1200,
          background: theme.gradient || theme.cardBg,
          opacity: 0.97,
          borderBottom: `1px solid ${theme.highlight}`,
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
          width: network === 'Base' ? '320px' : '100%',
          maxWidth: network === 'Base' ? '320px' : '100%',
          position: 'fixed',
          top: 68,
          left: 0,
          height: network === 'Base' ? '100vh' : undefined,
          display: 'flex',
          flexDirection: network === 'Base' ? 'column' : 'row',
          alignItems: network === 'Base' ? 'flex-start' : 'center',
          justifyContent: network === 'Base' ? 'flex-start' : 'center',
          gap: '16px',
          padding: network === 'Base' ? '32px 16px' : '4px 8vw',
          zIndex: 1100,
          background: theme.cardBg,
          borderBottom: `1px solid ${theme.highlight}`,
          flexWrap: 'nowrap',
          overflowX: 'hidden',
          whiteSpace: 'normal',
          fontFamily: 'Inter, Arial, sans-serif',
          fontWeight: 500,
          fontSize: '0.9em',
          color: theme.textPrimary,
          boxShadow: `0 2px 8px ${theme.shadow}`,
          opacity: showNav ? 0.92 : 0,
          transform: showNav ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.8s, transform 0.8s',
          pointerEvents: showNav ? 'auto' : 'none',
          minHeight: 44,
        }}
      >
        {network === 'Base' ? (
          <>
            <Link to="/" style={{ ...navLinkStyle }} onMouseOver={e => handleHover(e, true)} onMouseOut={e => handleHover(e, false)}>Home</Link>
            <Link to="/how" style={{ ...navLinkStyle }} onMouseOver={e => handleHover(e, true)} onMouseOut={e => handleHover(e, false)}>How It Works</Link>
            <Link to="/contracts" style={{ ...navLinkStyle }} onMouseOver={e => handleHover(e, true)} onMouseOut={e => handleHover(e, false)}>Contracts</Link>
            <Link to="/bytecodes" style={{ ...navLinkStyle }} onMouseOver={e => handleHover(e, true)} onMouseOut={e => handleHover(e, false)}>Bytecodes</Link>
            <Link to="/deploy" style={{ ...navLinkStyle }} onMouseOver={e => handleHover(e, true)} onMouseOut={e => handleHover(e, false)}>Deploy</Link>
            <Link to="/verify" style={{ ...navLinkStyle }} onMouseOver={e => handleHover(e, true)} onMouseOut={e => handleHover(e, false)}>Verify</Link>
            <Link to="/my-deployments" style={{ ...navLinkStyle }} onMouseOver={e => handleHover(e, true)} onMouseOut={e => handleHover(e, false)}>My Deployments</Link>
            <Link to="/interact" style={{ ...navLinkStyle }} onMouseOver={e => handleHover(e, true)} onMouseOut={e => handleHover(e, false)}>Interact</Link>
          </>
        ) : (
          <>
            <Link to="/" style={{ ...navLinkStyle }} onMouseOver={e => handleHover(e, true)} onMouseOut={e => handleHover(e, false)}>Home</Link>
            <span style={getCurrentDividerStyle()}></span>
            <Link to="/how" style={{ ...navLinkStyle }} onMouseOver={e => handleHover(e, true)} onMouseOut={e => handleHover(e, false)}>How It Works</Link>
            <span style={getCurrentDividerStyle()}></span>
            <Link to="/contracts" style={{ ...navLinkStyle }} onMouseOver={e => handleHover(e, true)} onMouseOut={e => handleHover(e, false)}>Contracts</Link>
            <span style={getCurrentDividerStyle()}></span>
            <Link to="/bytecodes" style={{ ...navLinkStyle }} onMouseOver={e => handleHover(e, true)} onMouseOut={e => handleHover(e, false)}>Bytecodes</Link>
            <span style={getCurrentDividerStyle()}></span>
            <Link to="/deploy" style={{ ...navLinkStyle }} onMouseOver={e => handleHover(e, true)} onMouseOut={e => handleHover(e, false)}>Deploy</Link>
            <span style={getCurrentDividerStyle()}></span>
            <Link to="/verify" style={{ ...navLinkStyle }} onMouseOver={e => handleHover(e, true)} onMouseOut={e => handleHover(e, false)}>Verify</Link>
            <span style={getCurrentDividerStyle()}></span>
            <Link to="/my-deployments" style={{ ...navLinkStyle }} onMouseOver={e => handleHover(e, true)} onMouseOut={e => handleHover(e, false)}>My Deployments</Link>
            <span style={getCurrentDividerStyle()}></span>
            <Link to="/interact" style={{ ...navLinkStyle }} onMouseOver={e => handleHover(e, true)} onMouseOut={e => handleHover(e, false)}>Interact</Link>
          </>
        )}
      </div>
    </>
  );
};