export const networkThemes = {
  Base: {
    primary: '#0052FF',
    primaryLight: '#3D7FFF',
    primaryDark: '#0039CC',
    gradient: 'linear-gradient(90deg, #0052FF 0%, #3D7FFF 100%)',
    gradientHover: 'linear-gradient(90deg, #0039CC 0%, #0052FF 100%)',
    background: '#10151c',
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
    primary: '#35D07F',
    primaryLight: '#5DE9A3',
    primaryDark: '#2AB56F',
    gradient: 'linear-gradient(90deg, #35D07F 0%, #5DE9A3 100%)',
    gradientHover: 'linear-gradient(90deg, #2AB56F 0%, #35D07F 100%)',
    background: '#0a1410',
    cardBg: '#e8f5ed',
    cardBgDark: '#d0ebe0',
    textPrimary: '#2AB56F',
    textSecondary: '#5a7866',
    codeBg: '#c8e6d7',
    codeBgDark: '#d0ebe0',
    highlight: '#b8ddc9',
    shadow: 'rgba(53,208,127,0.10)',
    shadowHover: 'rgba(53,208,127,0.18)',
    name: 'Celo'
  },
  Optimism: {
    primary: '#FF0420',
    primaryLight: '#FF3A4E',
    primaryDark: '#CC0319',
    gradient: 'linear-gradient(90deg, #FF0420 0%, #FF3A4E 100%)',
    gradientHover: 'linear-gradient(90deg, #CC0319 0%, #FF0420 100%)',
    background: '#1a0a0d',
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
    background: '#0d1118',
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