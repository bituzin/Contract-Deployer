// Common styles configuration for the application

export const getButtonStyles = (theme, variant = 'primary') => {
  const variants = {
    primary: {
      background: theme.primary,
      color: theme.network === 'Celo' ? '#444' : '#fff',
      border: 'none',
    },
    secondary: {
      background: theme.primaryDark,
      color: theme.network === 'Celo' ? '#444' : '#fff',
      border: 'none',
    },
    back: {
      background: theme.cardBg + 'E6',
      color: theme.textPrimary,
      border: `1px solid ${theme.primary}`,
    },
    outline: {
      background: 'transparent',
      color: theme.textPrimary,
      border: `1px solid ${theme.primary}`,
    }
  };

  return {
    fontSize: '0.86em',
    padding: '3px 10px',
    ...variants[variant],
    borderRadius: '10px',
    fontWeight: 500,
    cursor: 'pointer',
    boxShadow: `0 1px 4px ${theme.shadow}`,
    transition: 'background 0.2s',
  };
};

export const getPageContainerStyles = (theme) => ({
  outer: {
    margin: '60px auto 32px auto',
  },
  inner: {
    background: theme.cardBg + 'E6',
    border: `1px solid ${theme.primary}`,
    borderRadius: 10,
    boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
    padding: '28px 32px',
    color: theme.textPrimary,
    fontSize: '0.96em',
    fontFamily: 'Inter, Arial, sans-serif',
    fontWeight: 500,
    textAlign: 'left',
    lineHeight: 1.7,
    minHeight: 320,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  title: {
    color: theme.textPrimary,
    fontWeight: 700,
    fontSize: '1.2em',
    margin: 0,
  }
});

export const getContractCardStyles = (theme) => ({
  background: `rgba(${theme.primaryRgb},0.08)`,
  borderRadius: 10,
  boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
  border: `1px solid ${theme.primary}`,
  padding: '14px 20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  textAlign: 'left',
  transition: 'transform 0.2s, box-shadow 0.2s',
  cursor: 'pointer',
  textDecoration: 'none',
  color: theme.textPrimary,
});
