import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const Header = ({ theme, showHeader, showNav, network, networks, onNetworkChange, isConnected, address, onConnect, onDisconnect }) => {
  const [copied, setCopied] = useState(false);

  const displayAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '';

  const navLinkStyle = {
    textDecoration: 'none',
    color: theme.textPrimary,
    padding: '4px 18px',
    borderRadius: 8,
    margin: '0 10px',
    fontWeight: 600,
    fontSize: '0.9em',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    transition: 'background 0.2s, color 0.2s'
  };

  const dividerStyle = {
    borderLeft: `1px solid ${theme.textSecondary}`,
    height: 26,
    margin: '0 12px',
    display: 'inline-block'
  };

  const dropdownLinkStyle = {
    display: 'block',
    padding: '8px 18px',
    color: theme.textPrimary,
    textDecoration: 'none',
    fontWeight: 600,
    fontSize: '0.9em',
    letterSpacing: '0.03em',
    borderRadius: 0,
    transition: 'background 0.2s, color 0.2s'
  };

  const handleCopy = () => {
    if (!address) return;
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  const handleHover = (e, isHover) => {
    e.currentTarget.style.background = isHover ? theme.highlight : 'transparent';
    e.currentTarget.style.color = isHover ? '#222' : theme.textPrimary;
  };

  return (
    <>
      <div
        className="header"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '24px',
          padding: '16px 32px',
          height: 68,
          boxSizing: 'border-box',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 1000,
          background: theme.gradient,
          opacity: 0.92
        }}
      >
        <span
          className="header-title"
          style={{
            color: '#fff',
            fontFamily: 'Inter, Arial, sans-serif',
            fontWeight: 700,
            fontSize: '1.5em',
            letterSpacing: '0.03em',
            opacity: showHeader ? 1 : 0,
            transition: 'opacity 1s'
          }}
        >
          Contract Deployer
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <span style={{ color: '#fff', fontWeight: 600, fontSize: '0.95em', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Network</span>
          <select
            value={network}
            onChange={onNetworkChange}
            style={{
              padding: '6px 18px',
              borderRadius: 8,
              border: 'none',
              fontWeight: 600,
              fontSize: '0.95em',
              background: theme.primaryDark,
              color: '#fff',
              boxShadow: `0 2px 8px ${theme.shadow}`,
              cursor: 'pointer',
              outline: 'none',
              appearance: 'none',
              minWidth: 120
            }}
          >
            {networks.map((n) => (
              <option key={n} value={n} style={{ background: theme.cardBg, color: theme.textPrimary }}>
                {n}
              </option>
            ))}
          </select>
          {!isConnected ? (
            <button
              style={{
                fontSize: '0.9em',
                padding: '0.45em 1.4em',
                background: theme.primary,
                color: network === 'Celo' ? '#444' : '#fff',
                border: 'none',
                borderRadius: 6,
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: `0 2px 8px ${theme.shadow}`,
                transition: 'background 0.2s'
              }}
              onMouseOver={(e) => (e.currentTarget.style.background = theme.primaryDark)}
              onMouseOut={(e) => (e.currentTarget.style.background = theme.primary)}
              onClick={onConnect}
            >
              Connect
            </button>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <button
                onClick={handleCopy}
                style={{
                  padding: '0.38em 1em',
                  background: 'rgba(255,255,255,0.15)',
                  border: '1px solid rgba(255,255,255,0.4)',
                  borderRadius: 24,
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: '0.86em',
                  cursor: 'pointer',
                  minWidth: 120
                }}
                title="Copy address"
              >
                {copied ? 'Copied' : displayAddress}
              </button>
              <button
                style={{
                  fontSize: '0.86em',
                  padding: '0.4em 1em',
                  background: theme.primaryDark,
                  color: '#fff',
                  border: 'none',
                  borderRadius: 6,
                  fontWeight: 600,
                  cursor: 'pointer',
                  boxShadow: `0 2px 8px ${theme.shadow}`,
                  transition: 'background 0.2s'
                }}
                onMouseOver={(e) => (e.currentTarget.style.background = theme.primary)}
                onMouseOut={(e) => (e.currentTarget.style.background = theme.primaryDark)}
                onClick={onDisconnect}
              >
                Disconnect
              </button>
            </div>
          )}
        </div>
      </div>

      <div
        style={{
          width: '100%',
          position: 'fixed',
          top: 68,
          left: 0,
          zIndex: 999,
          background: theme.cardBg,
          borderBottom: `1px solid ${theme.highlight}`,
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '6px 24px',
          fontFamily: 'Inter, Arial, sans-serif',
          fontWeight: 500,
          fontSize: '0.9em',
          color: theme.textPrimary,
          boxShadow: `0 2px 8px ${theme.shadow}`,
          opacity: showNav ? 0.92 : 0,
          transform: showNav ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.8s, transform 0.8s',
          pointerEvents: showNav ? 'auto' : 'none'
        }}
      >
        <Link
          to="/"
          style={{ ...navLinkStyle }}
          onMouseOver={(e) => handleHover(e, true)}
          onMouseOut={(e) => handleHover(e, false)}
        >
          Home
        </Link>
        <span style={dividerStyle}></span>
        <Link
          to="/deploy"
          style={{ ...navLinkStyle }}
          onMouseOver={(e) => handleHover(e, true)}
          onMouseOut={(e) => handleHover(e, false)}
        >
          Deploy
        </Link>
        <span style={dividerStyle}></span>
        <div
          style={{ position: 'relative', display: 'inline-block' }}
          onMouseEnter={(e) => {
            const menu = e.currentTarget.querySelector('.contracts-dropdown');
            if (menu) {
              menu.style.display = 'block';
              setTimeout(() => {
                menu.style.opacity = 1;
              }, 10);
            }
          }}
          onMouseLeave={(e) => {
            const menu = e.currentTarget.querySelector('.contracts-dropdown');
            if (menu) {
              menu.style.opacity = 0;
              setTimeout(() => {
                menu.style.display = 'none';
              }, 400);
            }
          }}
        >
          <span
            style={{
              ...navLinkStyle,
              margin: '0 4px 0 -8px',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => handleHover(e, true)}
            onMouseOut={(e) => handleHover(e, false)}
          >
            Contracts
          </span>
          <span style={dividerStyle}></span>
          <div
            className="contracts-dropdown"
            style={{
              display: 'none',
              position: 'absolute',
              top: '100%',
              left: 0,
              background: theme.cardBg,
              minWidth: 190,
              boxShadow: `0 4px 16px ${theme.shadow}`,
              borderRadius: 10,
              zIndex: 1001,
              padding: '8px 0',
              fontFamily: 'Inter, Arial, sans-serif',
              fontWeight: 500,
              opacity: 0,
              transition: 'opacity 0.4s'
            }}
          >
            <Link
              to="/contract/simple-storage"
              style={{ ...dropdownLinkStyle }}
              onMouseOver={(e) => handleHover(e, true)}
              onMouseOut={(e) => handleHover(e, false)}
            >
              Simple Storage
            </Link>
            <Link
              to="/contract/click-counter"
              style={{ ...dropdownLinkStyle }}
              onMouseOver={(e) => handleHover(e, true)}
              onMouseOut={(e) => handleHover(e, false)}
            >
              Click Counter
            </Link>
            <Link
              to="/contract/message-board"
              style={{ ...dropdownLinkStyle }}
              onMouseOver={(e) => handleHover(e, true)}
              onMouseOut={(e) => handleHover(e, false)}
            >
              Message Board
            </Link>
            <Link
              to="/contract/simple-voting"
              style={{ ...dropdownLinkStyle }}
              onMouseOver={(e) => handleHover(e, true)}
              onMouseOut={(e) => handleHover(e, false)}
            >
              Simple Voting
            </Link>
          </div>
        </div>
        <Link
          to="/bytecodes"
          style={{ ...navLinkStyle }}
          onMouseOver={(e) => handleHover(e, true)}
          onMouseOut={(e) => handleHover(e, false)}
        >
          Bytecodes
        </Link>
        <span style={dividerStyle}></span>
        <Link
          to="/how"
          style={{ ...navLinkStyle }}
          onMouseOver={(e) => handleHover(e, true)}
          onMouseOut={(e) => handleHover(e, false)}
        >
          How It Works
        </Link>
        <span style={dividerStyle}></span>
        <Link
          to="/my-deployments"
          style={{ ...navLinkStyle }}
          onMouseOver={(e) => handleHover(e, true)}
          onMouseOut={(e) => handleHover(e, false)}
        >
          My Deployments
        </Link>
        <Link
          to="/interact"
          style={{ ...navLinkStyle }}
          onMouseOver={(e) => handleHover(e, true)}
          onMouseOut={(e) => handleHover(e, false)}
        >
          Interact
        </Link>
      </div>
    </>
  );
};