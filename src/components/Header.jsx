import React from 'react';
import { Link } from 'react-router-dom';

export const Header = ({ theme, showHeader, showNav, network, networks, onNetworkChange }) => {
  return (
    <>
      <div 
        className="header" 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          gap: '28px', 
          padding: '18px 40px', 
          height: 72, 
          boxSizing: 'border-box',
          position: 'fixed', 
          top: 0, 
          left: 0, 
          width: '100%', 
          zIndex: 1000, 
          background: theme.gradient,
          opacity: 0.9
        }}
      >
        <span 
          className="header-title" 
          style={{ 
            color: '#fff', 
            fontFamily: 'Inter, Arial, sans-serif', 
            fontWeight: 700, 
            fontSize: '1.8em', 
            letterSpacing: '0.01em', 
            opacity: showHeader ? 1 : 0, 
            transition: 'opacity 1s' 
          }}
        >
          Contract Deployer
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ color: '#fff', fontWeight: 600, fontSize: '1.08em' }}>Chain</span>
          <select
            value={network}
            onChange={onNetworkChange}
            style={{
              padding: '6px 18px',
              borderRadius: 8,
              border: 'none',
              fontWeight: 600,
              fontSize: '1.08em',
              background: theme.primaryDark,
              color: '#fff',
              boxShadow: `0 2px 8px ${theme.shadow}`,
              cursor: 'pointer',
              outline: 'none',
              appearance: 'none',
              minWidth: 120
            }}
          >
            {networks.map(n => (
              <option 
                key={n} 
                value={n}
                style={{
                  background: theme.cardBg,
                  color: theme.textPrimary
                }}
              >{n}</option>
            ))}
          </select>
        </div>
      </div>

      <div 
        style={{
          width: '100%',
          position: 'fixed',
          top: 72,
          left: 0,
          zIndex: 999,
          background: theme.cardBg,
          borderBottom: `1px solid ${theme.highlight}`,
          display: 'flex',
          alignItems: 'center',
          gap: '18px',
          padding: '5px 28px',
          fontFamily: 'Inter, Arial, sans-serif',
          fontWeight: 500,
          fontSize: '0.98em',
          color: theme.textPrimary,
          boxShadow: `0 2px 8px ${theme.shadow}`,
          opacity: showNav ? 0.9 : 0,
          transform: showNav ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 1s, transform 1s',
          pointerEvents: showNav ? 'auto' : 'none',
        }}
      >
        <Link 
          to="/" 
          style={{ 
            textDecoration: 'none', 
            color: theme.textPrimary, 
            padding: '4px 20px', 
            borderRadius: 6, 
            transition: 'background 0.2s', 
            margin: '0 14px' 
          }}
          onMouseOver={e => e.currentTarget.style.background = theme.highlight}
          onMouseOut={e => e.currentTarget.style.background = 'transparent'}
        >
          Home
        </Link>
        <span style={{ borderLeft: `2px solid ${theme.textPrimary}`, height: 28, margin: '0 18px', display: 'inline-block', verticalAlign: 'middle' }}></span>
        <Link 
          to="/deploy" 
          style={{ 
            textDecoration: 'none', 
            color: theme.textPrimary, 
            padding: '4px 20px', 
            borderRadius: 6, 
            transition: 'background 0.2s', 
            margin: '0 14px' 
          }}
          onMouseOver={e => e.currentTarget.style.background = theme.highlight}
          onMouseOut={e => e.currentTarget.style.background = 'transparent'}
        >
          Deploy
        </Link>
        <span style={{ borderLeft: `2px solid ${theme.textPrimary}`, height: 28, margin: '0 18px', display: 'inline-block', verticalAlign: 'middle' }}></span>
        <div 
          style={{ position: 'relative', display: 'inline-block' }}
          onMouseEnter={e => {
            const menu = e.currentTarget.querySelector('.contracts-dropdown');
            if (menu) {
              menu.style.display = 'block';
              setTimeout(() => { menu.style.opacity = 1; }, 10);
            }
          }}
          onMouseLeave={e => {
            const menu = e.currentTarget.querySelector('.contracts-dropdown');
            if (menu) {
              menu.style.opacity = 0;
              setTimeout(() => { menu.style.display = 'none'; }, 500);
            }
          }}
        >
          <span 
            style={{ 
              textDecoration: 'none', 
              color: theme.textPrimary, 
              padding: '4px 20px', 
              borderRadius: 6, 
              transition: 'background 0.2s', 
              margin: '0 4px 0 -8px', 
              cursor: 'pointer' 
            }}
          >
            Contracts
          </span>
          <span style={{ borderLeft: `2px solid ${theme.textPrimary}`, height: 28, margin: '0 18px', display: 'inline-block', verticalAlign: 'middle' }}></span>
          <div 
            className="contracts-dropdown" 
            style={{
              display: 'none',
              position: 'absolute',
              top: '100%',
              left: 0,
              background: theme.cardBg,
              minWidth: '180px',
              boxShadow: `0 4px 16px ${theme.shadow}`,
              borderRadius: '8px',
              zIndex: 1001,
              padding: '8px 0',
              fontSize: '1em',
              fontFamily: 'Inter, Arial, sans-serif',
              fontWeight: 500,
              opacity: 0,
              transition: 'opacity 0.5s',
            }}
          >
            <Link to="/contract/simple-storage" style={{ display: 'block', padding: '8px 20px', color: theme.textPrimary, textDecoration: 'none', borderRadius: 0, transition: 'background 0.2s', cursor: 'pointer' }} onMouseOver={e => e.currentTarget.style.background=theme.highlight} onMouseOut={e => e.currentTarget.style.background='transparent'}>SimpleStorage</Link>
            <Link to="/contract/click-counter" style={{ display: 'block', padding: '8px 20px', color: theme.textPrimary, textDecoration: 'none', borderRadius: 0, transition: 'background 0.2s', cursor: 'pointer' }} onMouseOver={e => e.currentTarget.style.background=theme.highlight} onMouseOut={e => e.currentTarget.style.background='transparent'}>ClickCounter</Link>
            <Link to="/contract/message-board" style={{ display: 'block', padding: '8px 20px', color: theme.textPrimary, textDecoration: 'none', borderRadius: 0, transition: 'background 0.2s', cursor: 'pointer' }} onMouseOver={e => e.currentTarget.style.background=theme.highlight} onMouseOut={e => e.currentTarget.style.background='transparent'}>MessageBoard</Link>
            <Link to="/contract/simple-voting" style={{ display: 'block', padding: '8px 20px', color: theme.textPrimary, textDecoration: 'none', borderRadius: 0, transition: 'background 0.2s', cursor: 'pointer' }} onMouseOver={e => e.currentTarget.style.background=theme.highlight} onMouseOut={e => e.currentTarget.style.background='transparent'}>SimpleVoting</Link>
          </div>
        </div>
        <Link 
          to="/bytecodes" 
          style={{ 
            textDecoration: 'none', 
            color: theme.textPrimary, 
            padding: '4px 14px', // skrócony padding
            borderRadius: 6, 
            transition: 'background 0.2s', 
            margin: '0 10px' // skrócony margines
          }}
          onMouseOver={e => e.currentTarget.style.background = theme.highlight}
          onMouseOut={e => e.currentTarget.style.background = 'transparent'}
        >
          Bytecodes
        </Link>
        <span style={{ borderLeft: `2px solid ${theme.textPrimary}`, height: 28, margin: '0 18px', display: 'inline-block', verticalAlign: 'middle' }}></span>
        <Link 
          to="/how" 
          style={{ 
            textDecoration: 'none', 
            color: theme.textPrimary, 
            padding: '4px 20px', 
            borderRadius: 6, 
            transition: 'background 0.2s', 
            margin: '0 14px' 
          }}
          onMouseOver={e => e.currentTarget.style.background = theme.highlight}
          onMouseOut={e => e.currentTarget.style.background = 'transparent'}
        >
          How It Works
        </Link>
        <span style={{ borderLeft: `2px solid ${theme.textPrimary}`, height: 28, margin: '0 18px', display: 'inline-block', verticalAlign: 'middle' }}></span>
        <Link 
          to="/my-deployments" 
          style={{ 
            textDecoration: 'none', 
            color: theme.textPrimary, 
            padding: '4px 20px', 
            borderRadius: 6, 
            transition: 'background 0.2s', 
            margin: '0 14px' 
          }}
          onMouseOver={e => e.currentTarget.style.background = theme.highlight}
          onMouseOut={e => e.currentTarget.style.background = 'transparent'}
        >
          My Deployments
        </Link>
        <span style={{ borderLeft: `2px solid ${theme.textPrimary}`, height: 28, margin: '0 18px', display: 'inline-block', verticalAlign: 'middle' }}></span>
      </div>
    </>
  );
};