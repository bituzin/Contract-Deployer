import React from 'react';
import { getPageContainerStyles } from '../../config/styles';

export const PageContainer = ({ theme, title, children, backButton, maxWidth = 720 }) => {
  const styles = getPageContainerStyles(theme);

  // Ensure maxWidth is a CSS value (append 'px' when a number is provided)
  const resolvedMaxWidth = typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth;

  return (
    <div style={{ 
      margin: '60px auto 32px auto',
      maxWidth: resolvedMaxWidth,
      width: '100%'
    }}>
      <div style={styles.inner}>
        <div style={styles.header}>
          <h2 style={styles.title}>{title}</h2>
          {backButton}
        </div>
        {children}
      </div>
    </div>
  );
};
