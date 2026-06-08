import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { colors } from '../theme/theme';

const navItems = [
  { label: 'Home',       path: '/' },
  { label: 'About Me',   path: '/about' },
  { label: 'Projects',   path: '/projects' },
];

export default function NavBar() {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <AppBar position="fixed" elevation={0}>
      <Toolbar sx={{ maxWidth: 1100, width: '100%', mx: 'auto', px: { xs: 2, md: 4 } }}>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            fontWeight: 700,
            color: colors.textPrimary,
            textDecoration: 'none',
            letterSpacing: 1,
          }}
        >
          Portfolio
        </Typography>

        {isMobile ? (
          <>
            <IconButton
              color="inherit"
              onClick={() => setDrawerOpen(true)}
              aria-label="메뉴 열기"
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={() => setDrawerOpen(false)}
              PaperProps={{ sx: { backgroundColor: colors.bgSecondary, minWidth: 200 } }}
            >
              <List>
                {navItems.map(({ label, path }) => (
                  <ListItem key={path} disablePadding>
                    <ListItemButton
                      component={Link}
                      to={path}
                      onClick={() => setDrawerOpen(false)}
                      sx={{
                        color: isActive(path) ? colors.primary : colors.textSecondary,
                        borderLeft: isActive(path) ? `3px solid ${colors.primary}` : '3px solid transparent',
                      }}
                    >
                      <ListItemText primary={label} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Drawer>
          </>
        ) : (
          <nav>
            {navItems.map(({ label, path }) => (
              <Button
                key={path}
                component={Link}
                to={path}
                sx={{
                  color: isActive(path) ? colors.primary : colors.textSecondary,
                  borderBottom: isActive(path) ? `2px solid ${colors.primary}` : '2px solid transparent',
                  borderRadius: 0,
                  mx: 0.5,
                  px: 2,
                  '&:hover': {
                    color: colors.primaryLight,
                    backgroundColor: 'transparent',
                  },
                }}
              >
                {label}
              </Button>
            ))}
          </nav>
        )}
      </Toolbar>
    </AppBar>
  );
}
