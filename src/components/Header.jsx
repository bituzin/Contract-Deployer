import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Header = ({ theme, showHeader, showNav, network, networks, onNetworkChange, isConnected, address, onConnect, onDisconnect }) => {
  const [copied, setCopied] = useState(false);

  const displayAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '';

  const navLinkStyle = {
    textDecoration: 'none',
    color: theme.textPrimary,
    padding: '3px 7px', // less padding
    borderRadius: 8,
    margin: '0 2px', // less margin
    fontWeight: 600,
    fontSize: '0.9em',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    transition: 'background 0.2s, color 0.2s',
    flexShrink: 0,
  };

  const dividerStyle = {
    height: 22,
    margin: '0 3px', // less margin
    display: 'inline-block',
    flexShrink: 0,
  };

  const hexToRgb = (hex) => {
    if (!hex) return null;
    const clean = hex.replace('#', '');
    const bigint = parseInt(clean.length === 3 ? clean.split('').map(c => c + c).join('') : clean, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return { r, g, b };
  };

  const luminance = (r, g, b) => {
    const a = [r, g, b].map((v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
  };

  // choose a subtle divider color depending on card background luminance
  const cardRgb = hexToRgb(theme.cardBg);
  const dividerColor = cardRgb && luminance(cardRgb.r, cardRgb.g, cardRgb.b) > 0.6 ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.12)';

  const location = useLocation();

  const mapRouteToColor = (route) => {
    if (!route) return null;
    if (route === '/' ) return theme.textPrimary;
    if (route === '/deploy') return theme.primary;
    if (route.startsWith('/contract')) return theme.primaryLight;
    if (route === '/bytecodes') return theme.primaryDark;
    if (route === '/how') return theme.highlight;
    if (route === '/my-deployments') return theme.primary;
    // if (route === '/interact') return theme.textSecondary; // Interact tab removed
    return null;
  };

  const getDividerStyle = (targetRoute) => {
    const rc = mapRouteToColor(targetRoute);
    const color = rc || dividerColor;
    return { ...dividerStyle, borderLeft: `1px solid ${color}` };
  };

  // use current route color for all dividers
  const currentDividerColor = mapRouteToColor(location.pathname) || dividerColor;
  const getCurrentDividerStyle = () => ({ ...dividerStyle, borderLeft: `1px solid ${currentDividerColor}` });

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
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <span style={{ color: '#fff', fontWeight: 600, fontSize: '0.95em', letterSpacing: '0.08em', textTransform: 'uppercase', marginRight: 8 }}>Network</span>
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
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {!isConnected ? (
            <button
              style={{
                fontSize: '0.9em',
                padding: '0.45em 1.4em',
                background: theme.primary,
                color: network === 'Celo' ? '#444' : '#fff',
                border: 'none',
                 border: `1px solid ${theme.primary}`,
                 borderRadius: 10,
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
                    border: `1px solid ${theme.primary}`,
                    borderRadius: 10,
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
          zIndex: 1100,
          background: theme.cardBg,
          borderBottom: `1px solid ${theme.highlight}`,
          display: 'flex',
          flexDirection: network === 'Base' ? 'column' : 'row', // pionowo tylko dla Base
          alignItems: network === 'Base' ? 'flex-start' : 'center',
          justifyContent: network === 'Base' ? 'flex-start' : 'center',
          gap: '16px',
          padding: '4px 8vw',
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
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0 }}>
            <Link
              to="/"
              style={{ ...navLinkStyle }}
              onMouseOver={(e) => handleHover(e, true)}
              onMouseOut={(e) => handleHover(e, false)}
            >
              Home
            </Link>
            <span style={getCurrentDividerStyle()}></span>
            <Link
              to="/how"
              style={{ ...navLinkStyle }}
              onMouseOver={(e) => handleHover(e, true)}
              onMouseOut={(e) => handleHover(e, false)}
            >
              How It Works
            </Link>
            <span style={getCurrentDividerStyle()}></span>
          </div>
        ) : (
          <>
            <Link
              to="/"
              style={{ ...navLinkStyle }}
              onMouseOver={(e) => handleHover(e, true)}
              onMouseOut={(e) => handleHover(e, false)}
            >
              Home
            </Link>
            <span style={getCurrentDividerStyle()}></span>
            <Link
              to="/how"
              style={{ ...navLinkStyle }}
              onMouseOver={(e) => handleHover(e, true)}
              onMouseOut={(e) => handleHover(e, false)}
            >
              How It Works
            </Link>
            <span style={getCurrentDividerStyle()}></span>
          </>
        )}
        <Link
          to="/contracts"
          style={{ ...navLinkStyle }}
          onMouseOver={(e) => handleHover(e, true)}
          onMouseOut={(e) => handleHover(e, false)}
        >
          Contracts
        </Link>
        <span style={getCurrentDividerStyle()}></span>
        <Link
          to="/bytecodes"
          style={{ ...navLinkStyle }}
          onMouseOver={(e) => handleHover(e, true)}
          onMouseOut={(e) => handleHover(e, false)}
        >
          Bytecodes
        </Link>
        <span style={getCurrentDividerStyle()}></span>
        <Link
          to="/deploy"
          style={{ ...navLinkStyle }}
          onMouseOver={(e) => handleHover(e, true)}
          onMouseOut={(e) => handleHover(e, false)}
        >
          Deploy
        </Link>
        {/* Verify section only on Base network */}
        {network === 'Base' && <>
          <span style={getCurrentDividerStyle()}></span>
          <Link
            to="/verify"
            style={{ ...navLinkStyle }}
            onMouseOver={(e) => handleHover(e, true)}
            onMouseOut={(e) => handleHover(e, false)}
          >
            Verify
          </Link>
        </>}
        <span style={getCurrentDividerStyle()}></span>
        <Link
          to="/my-deployments"
          style={{ ...navLinkStyle }}
          onMouseOver={(e) => handleHover(e, true)}
          onMouseOut={(e) => handleHover(e, false)}
        >
          My Deployments
        </Link>
        <span style={getCurrentDividerStyle()}></span>
        <Link
          to="/interact"
          style={{ ...navLinkStyle }}
          onMouseOver={(e) => handleHover(e, true)}
          onMouseOut={(e) => handleHover(e, false)}
        >
          Interact
        </Link>
        <span style={getCurrentDividerStyle()}></span>
      </div>
    </>
  );
};