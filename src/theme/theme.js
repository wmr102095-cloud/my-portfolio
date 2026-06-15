import { createTheme } from '@mui/material/styles';

export const colors = {
  primary:        '#9f8473',
  primaryLight:   '#b09484',
  primaryDark:    '#6c5d53',
  secondary:      '#6c5d53',
  accent:         '#c7b199',
  bgPrimary:      '#dfd3c3',
  bgSecondary:    '#f0e8de',
  bgOverlay:      'rgba(223, 211, 195, 0.92)',
  textPrimary:    '#1a1412',
  textSecondary:  '#3d2e28',
  textMuted:      '#7a6860',
  border:         'rgba(108, 93, 83, 0.20)',
  borderFocus:    '#9f8473',
  borderAccent:   'rgba(159, 132, 115, 0.35)',
};

const theme = createTheme({
  palette: {
    mode: 'light',
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
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Playfair Display", Georgia, serif',
      color: colors.textPrimary,
      fontWeight: 700,
    },
    h2: {
      fontFamily: '"Playfair Display", Georgia, serif',
      color: colors.textPrimary,
      fontWeight: 700,
    },
    h3: {
      fontFamily: '"Playfair Display", Georgia, serif',
      color: colors.textPrimary,
      fontWeight: 600,
    },
    h4: { color: colors.textSecondary, fontWeight: 600 },
    h5: { color: colors.textSecondary, fontWeight: 500 },
    h6: { color: colors.textSecondary, fontWeight: 500 },
    body1: { color: colors.textPrimary },
    body2: { color: colors.textSecondary },
    caption: { color: colors.textMuted },
    overline: { color: colors.textMuted, letterSpacing: 3 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          backgroundColor: colors.primaryDark,
          color: '#f5ede3',
          '&:hover': { backgroundColor: colors.primary },
          '&:active': { backgroundColor: colors.primaryDark },
        },
        outlinedPrimary: {
          borderColor: colors.border,
          color: colors.textSecondary,
          '&:hover': {
            borderColor: colors.primary,
            backgroundColor: `${colors.primary}15`,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: colors.bgSecondary,
          border: `1px solid ${colors.border}`,
          borderRadius: 12,
          boxShadow: '0 2px 12px rgba(108, 93, 83, 0.08)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: colors.bgOverlay,
          backdropFilter: 'blur(12px)',
          borderBottom: `1px solid ${colors.border}`,
          boxShadow: 'none',
          color: colors.textPrimary,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-input': { color: colors.textPrimary },
          '& .MuiInputLabel-root': { color: colors.textMuted },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: { borderColor: colors.border },
      },
    },
  },
});

export default theme;
