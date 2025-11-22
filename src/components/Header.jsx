import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header({ theme, network, setNetwork, showDropdown, setShowDropdown, networks, handleNetworkChange }) {
  const [navOpen, setNavOpen] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <div style={{ background: theme.gradient, position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1100 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '28px', padding: '14px 40px' }}>
        <span style={{ color: network === 'Celo' ? theme.accent : '#fff', fontFamily: 'Inter, Arial, sans-serif', fontWeight: 700, fontSize: '1.6em' }}>Contract Deployer</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ color: network === 'Celo' ? theme.accent : '#fff', fontWeight: 600 }}>Chain</span>
            <div style={{ position: 'relative' }}>
              <div onClick={() => setShowDropdown(prev => !prev)} style={{ padding: '6px 14px', borderRadius: 8, background: network === 'Celo' ? '#FFE000' : theme.primary, color: network === 'Celo' ? '#2D3A29' : theme.btnText, cursor: 'pointer', fontWeight: 700 }}>{network}</div>
              {showDropdown && (
                <div style={{ position: 'absolute', top: '110%', left: 0, background: network === 'Celo' ? '#FFE000' : theme.primary, borderRadius: 8, boxShadow: theme.shadow, zIndex: 1200 }}>
                  {networks.map((n, idx) => (
                    <div
                      key={n}
                      onClick={() => { setNetwork(n); setShowDropdown(false); handleNetworkChange({ target: { value: n } }); }}
                      onMouseEnter={() => setHoveredIdx(idx)}
                      onMouseLeave={() => setHoveredIdx(null)}
                      style={{
                        padding: '8px 16px',
                        cursor: 'pointer',
                        color: network === 'Celo' ? '#2D3A29' : theme.btnText,
                        fontWeight: n === network ? 700 : 600,
                        background: hoveredIdx === idx
                          ? (network === 'Celo' ? '#FFF04A' : '#4b7cf3')
                          : 'transparent',
                        transition: 'background 0.15s',
                      }}
                    >{n}</div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '18px', padding: '8px 28px', background: theme.bg, borderBottom: `1px solid ${theme.codeBg}`, paddingTop: 8 }}>
        <Link to="/" style={{ color: network === 'Celo' ? '#444444' : theme.primary, textDecoration: 'none', padding: '6px 12px', fontWeight: 700, fontSize: '1.1em', fontFamily: 'Inter, Arial, sans-serif' }}
          onMouseOver={e => e.currentTarget.style.background = network === 'Celo' ? '#FFF9A3' : '#e6eefc'}
          onMouseOut={e => e.currentTarget.style.background = 'transparent'}>Home</Link>
        <span style={{ borderLeft: `2px solid ${theme.primary}`, height: 28, margin: '0 12px', display: 'inline-block', verticalAlign: 'middle' }}></span>
        <Link to="/deploy" style={{ color: network === 'Celo' ? '#444444' : theme.primary, textDecoration: 'none', padding: '6px 12px', fontWeight: 700, fontSize: '1.1em', fontFamily: 'Inter, Arial, sans-serif' }}
          onMouseOver={e => e.currentTarget.style.background = network === 'Celo' ? '#FFF9A3' : '#e6eefc'}
          onMouseOut={e => e.currentTarget.style.background = 'transparent'}>Deploy</Link>
        <span style={{ borderLeft: `2px solid ${theme.primary}`, height: 28, margin: '0 12px', display: 'inline-block', verticalAlign: 'middle' }}></span>
        <div style={{ position: 'relative' }} onMouseEnter={() => setNavOpen(true)} onMouseLeave={() => setNavOpen(false)}>
          <span style={{ color: network === 'Celo' ? '#444444' : theme.primary, fontWeight: 700, fontSize: '1.1em', fontFamily: 'Inter, Arial, sans-serif', padding: '6px 12px', cursor: 'pointer' }}
            onMouseOver={e => e.currentTarget.style.background = network === 'Celo' ? '#FFF9A3' : '#e6eefc'}
            onMouseOut={e => e.currentTarget.style.background = 'transparent'}>Contracts</span>
          {navOpen && (
            <div style={{ position: 'absolute', top: '110%', left: 0, background: theme.bg, boxShadow: theme.shadow, borderRadius: 8, zIndex: 1200 }}>
              <Link to="/contract/simple-storage"
                style={{ display: 'block', padding: '8px 16px', color: theme.primary, textDecoration: 'none', fontWeight: 700, fontSize: '1em', fontFamily: 'Inter, Arial, sans-serif' }}
                onMouseOver={e => e.currentTarget.style.background = network === 'Celo' ? '#FFF9A3' : '#e6eefc'}
                onMouseOut={e => e.currentTarget.style.background = 'transparent'}
              >SimpleStorage</Link>
              <Link to="/contract/click-counter"
                style={{ display: 'block', padding: '8px 16px', color: theme.primary, textDecoration: 'none', fontWeight: 700, fontSize: '1em', fontFamily: 'Inter, Arial, sans-serif' }}
                onMouseOver={e => e.currentTarget.style.background = network === 'Celo' ? '#FFF9A3' : '#e6eefc'}
                onMouseOut={e => e.currentTarget.style.background = 'transparent'}
              >ClickCounter</Link>
              <Link to="/contract/message-board"
                style={{ display: 'block', padding: '8px 16px', color: theme.primary, textDecoration: 'none', fontWeight: 700, fontSize: '1em', fontFamily: 'Inter, Arial, sans-serif' }}
                onMouseOver={e => e.currentTarget.style.background = network === 'Celo' ? '#FFF9A3' : '#e6eefc'}
                onMouseOut={e => e.currentTarget.style.background = 'transparent'}
              >MessageBoard</Link>
              <Link to="/contract/simple-voting"
                style={{ display: 'block', padding: '8px 16px', color: theme.primary, textDecoration: 'none', fontWeight: 700, fontSize: '1em', fontFamily: 'Inter, Arial, sans-serif' }}
                onMouseOver={e => e.currentTarget.style.background = network === 'Celo' ? '#FFF9A3' : '#e6eefc'}
                onMouseOut={e => e.currentTarget.style.background = 'transparent'}
              >SimpleVoting</Link>
            </div>
          )}
        </div>
        <span style={{ borderLeft: `2px solid ${theme.primary}`, height: 28, margin: '0 12px', display: 'inline-block', verticalAlign: 'middle' }}></span>
        <Link to="/abi" style={{ color: network === 'Celo' ? '#444444' : theme.primary, textDecoration: 'none', padding: '6px 12px', fontWeight: 700, fontSize: '1.1em', fontFamily: 'Inter, Arial, sans-serif' }}
          onMouseOver={e => e.currentTarget.style.background = network === 'Celo' ? '#FFF9A3' : '#e6eefc'}
          onMouseOut={e => e.currentTarget.style.background = 'transparent'}>ABI</Link>
        <span style={{ borderLeft: `2px solid ${theme.primary}`, height: 28, margin: '0 12px', display: 'inline-block', verticalAlign: 'middle' }}></span>
        <Link to="/how" style={{ color: network === 'Celo' ? '#444444' : theme.primary, textDecoration: 'none', padding: '6px 12px', fontWeight: 700, fontSize: '1.1em', fontFamily: 'Inter, Arial, sans-serif' }}
          onMouseOver={e => e.currentTarget.style.background = network === 'Celo' ? '#FFF9A3' : '#e6eefc'}
          onMouseOut={e => e.currentTarget.style.background = 'transparent'}>How It Works</Link>
        <span style={{ borderLeft: `2px solid ${theme.primary}`, height: 28, margin: '0 12px', display: 'inline-block', verticalAlign: 'middle' }}></span>
        <Link to="/my-deployments" style={{ color: network === 'Celo' ? '#444444' : theme.primary, textDecoration: 'none', padding: '6px 12px', fontWeight: 700, fontSize: '1.1em', fontFamily: 'Inter, Arial, sans-serif' }}
          onMouseOver={e => e.currentTarget.style.background = network === 'Celo' ? '#FFF9A3' : '#e6eefc'}
          onMouseOut={e => e.currentTarget.style.background = 'transparent'}>My Deployments</Link>
      </div>
    </div>
  );
}
