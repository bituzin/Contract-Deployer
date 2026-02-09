
import React from "react";

const TRANSPARENCY = 0.7;
const networkStyles = {
  Celo:    { bg: `rgba(255, 234, 98, ${TRANSPARENCY})`, text: '#2c2900', link: '#8f6702' }, // jak tło fee (highlight)
  Base:    { bg: `rgba(230, 240, 251, ${TRANSPARENCY})`, text: '#003366', link: '#0052ff' },
  Sepolia: { bg: `rgba(247, 243, 230, ${TRANSPARENCY})`, text: '#39295c', link: '#3456b3' }, // fioletowy tekst, fioletowy link
  Optimism:{ bg: `rgba(255, 234, 234, ${TRANSPARENCY})`, text: '#a80000', link: '#ff0420' },
  default: { bg: `rgba(245, 245, 245, ${TRANSPARENCY})`, text: '#333', link: '#0070f3' }
};

const Footer = ({ network = 'Celo', theme }) => {
  const style = networkStyles[network] || networkStyles.default;
  return (
    <footer style={{
      background: 'rgba(255,255,255,0.82)',
      width: 'calc(100% - 200px)',
      marginTop: 0,
      marginLeft: 200,
      padding: '0',
      border: 'none',
      boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
      minHeight: 0,
      position: 'relative',
      left: 0
    }}>
      <div style={{
        maxWidth: 540,
        margin: '0 auto',
        padding: '4px 18px',
        display: 'flex',
        flexWrap: 'nowrap',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        color: style.text,
        fontSize: '0.85em',
        lineHeight: 1.2,
        boxSizing: 'border-box',
        textAlign: 'center',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        minWidth: 0,
        minHeight: 0
      }}>
        <span>© 2026 Contract Deployer</span>
        <span>|</span>
        <a
          href="https://github.com/bituzin/Contract-Deployer"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: style.link, display: 'inline-flex', alignItems: 'center', gap: 4, textDecoration: 'none' }}
          onMouseOver={e => e.currentTarget.style.textDecoration = 'underline'}
          onMouseOut={e => e.currentTarget.style.textDecoration = 'none'}
        >
          <svg height="18" width="18" viewBox="0 0 16 16" fill="currentColor" style={{ verticalAlign: 'middle' }} aria-hidden="true">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.01.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.11.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
          </svg>
          GitHub
        </a>
        <span>|</span>
        <a href="mailto:bituzin2@gmail.com" style={{ color: style.link, textDecoration: 'none' }}
          onMouseOver={e => e.currentTarget.style.textDecoration = 'underline'}
          onMouseOut={e => e.currentTarget.style.textDecoration = 'none'}
        >bituzin2@gmail.com</a>
        <span>|</span>
        <span style={{ color: style.text, fontWeight: 500 }}>MIT License</span>
      </div>
    </footer>
  );
};

export default Footer;
