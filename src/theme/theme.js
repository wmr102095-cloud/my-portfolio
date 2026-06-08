import { createTheme } from '@mui/material/styles';

// 컬러 팔레트 디자인 시스템.md 에서 추출한 CSS 변수 기반 MUI 테마
export const colors = {
  primary:        '#1A6EFF',
  primaryLight:   '#5599FF',
  primaryDark:    '#0A3D99',
  secondary:      '#E878B0',
  accent:         '#FF4D9E',
  bgPrimary:      '#000000',
  bgSecondary:    '#0D0D0D',
  bgOverlay:      'rgba(10, 10, 16, 0.85)',
  textPrimary:    '#FFFFFF',
  textSecondary:  '#CCCCCC',
  textMuted:      '#888888',
  border:         'rgba(255, 255, 255, 0.15)',
  borderFocus:    '#1A6EFF',
  borderAccent:   'rgba(232, 120, 176, 0.40)',
};

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main:  colors.primary,
      light: colors.primaryLight,
      dark:  colors.primaryDark,
    },
    secondary: {
      main: colors.secondary,
    },
    background: {
      default: colors.bgPrimary,
      paper:   colors.bgSecondary,
    },
    text: {
      primary:   colors.textPrimary,
      secondary: colors.textSecondary,
      disabled:  colors.textMuted,
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { color: colors.textPrimary, fontWeight: 700 },
    h2: { color: colors.textPrimary, fontWeight: 700 },
    h3: { color: colors.textPrimary, fontWeight: 600 },
    h4: { color: colors.textSecondary, fontWeight: 600 },
    h5: { color: colors.textSecondary, fontWeight: 500 },
    h6: { color: colors.textSecondary, fontWeight: 500 },
    body1: { color: colors.textPrimary },
    body2: { color: colors.textSecondary },
    caption: { color: colors.textMuted },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          backgroundColor: colors.primary,
          '&:hover': { backgroundColor: colors.primaryLight },
          '&:active': { backgroundColor: colors.primaryDark },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: colors.bgSecondary,
          border: `1px solid ${colors.border}`,
          borderRadius: 12,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: colors.bgOverlay,
          backdropFilter: 'blur(12px)',
          borderBottom: `1px solid ${colors.border}`,
        },
      },
    },
  },
});

export default theme;
