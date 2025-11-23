export const networkThemes = {
  Base: {
    primary: '#0052FF',
    primaryLight: '#3D7FFF',
    primaryDark: '#0039CC',
    gradient: 'linear-gradient(90deg, #0052FF 0%, #3D7FFF 100%)',
    gradientHover: 'linear-gradient(90deg, #0039CC 0%, #0052FF 100%)',
    background: '#cfd4db',
    cardBg: '#e9eaec',
    cardBgDark: '#d3d8e8',
    textPrimary: '#2563eb',
    textSecondary: '#6b7280',
    codeBg: '#d3d4d7',
    codeBgDark: '#d3d8e8',
    highlight: '#c7cbe0',
    shadow: 'rgba(0,82,255,0.10)',
    shadowHover: 'rgba(0,82,255,0.18)',
    name: 'Base'
  },
  Celo: {
    primary: '#F4BB44',
    primaryLight: '#F7C961',
    primaryDark: '#D9A02D',
    gradient: 'linear-gradient(90deg, #F4BB44 0%, #F7C961 100%)',
    gradientHover: 'linear-gradient(90deg, #D9A02D 0%, #F4BB44 100%)',
    background: '#F5EED9',
    cardBg: '#FEFBF1',
    cardBgDark: '#F9EDCA',
    textPrimary: '#B8861F',
    textSecondary: '#8A6B29',
    codeBg: '#F3E5B8',
    codeBgDark: '#F9EDCA',
    highlight: '#F7D88A',
    shadow: 'rgba(244,187,68,0.12)',
    shadowHover: 'rgba(244,187,68,0.20)',
    name: 'Celo'
  },
  Optimism: {
    primary: '#FF0420',
    primaryLight: '#FF3A4E',
    primaryDark: '#CC0319',
    gradient: 'linear-gradient(90deg, #FF0420 0%, #FF3A4E 100%)',
    gradientHover: 'linear-gradient(90deg, #CC0319 0%, #FF0420 100%)',
    background: '#e6d4d8',
    cardBg: '#ffe8ea',
    cardBgDark: '#ffd0d5',
    textPrimary: '#CC0319',
    textSecondary: '#8a5a5f',
    codeBg: '#ffc8ce',
    codeBgDark: '#ffd0d5',
    highlight: '#ffb8c0',
    shadow: 'rgba(255,4,32,0.10)',
    shadowHover: 'rgba(255,4,32,0.18)',
    name: 'Optimism'
  },
  Sepolia: {
    primary: '#627EEA',
    primaryLight: '#8FA5FF',
    primaryDark: '#4E63C9',
    gradient: 'linear-gradient(90deg, #627EEA 0%, #8FA5FF 100%)',
    gradientHover: 'linear-gradient(90deg, #4E63C9 0%, #627EEA 100%)',
    background: '#d8dae6',
    cardBg: '#e8eaf5',
    cardBgDark: '#d5d9f0',
    textPrimary: '#4E63C9',
    textSecondary: '#5a6078',
    codeBg: '#d0d5ed',
    codeBgDark: '#d5d9f0',
    highlight: '#c0c7e8',
    shadow: 'rgba(98,126,234,0.10)',
    shadowHover: 'rgba(98,126,234,0.18)',
    name: 'Sepolia'
  }
};

export const getTheme = (network) => {
  return networkThemes[network] || networkThemes.Base;
};