import React from 'react';
import { getPageContainerStyles } from '../../config/styles';

export const PageContainer = ({ theme, title, children, backButton, maxWidth = 940 }) => {
  const styles = getPageContainerStyles(theme);

  return (
    <div style={{ ...styles.outer, maxWidth }}>
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
