import React from 'react';
import { Link } from 'react-router-dom';
import { getContractCardStyles } from '../../config/styles';

export const ContractCard = ({ theme, to, title, description, children }) => {
  const cardStyles = getContractCardStyles(theme);

  return (
    <Link
      to={to}
      style={cardStyles}
      onMouseOver={e => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.12)';
      }}
      onMouseOut={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)';
      }}
    >
      <div>
        <div style={{ 
          fontSize: '1.08em', 
          fontWeight: 700, 
          color: theme.textPrimary, 
          marginBottom: 10 
        }}>
          {title}
        </div>
        <div style={{ 
          fontSize: '0.92em', 
          color: theme.textSecondary, 
          lineHeight: 1.5 
        }}>
          {description}
        </div>
      </div>
      {children}
    </Link>
  );
};
