import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { colors } from '../theme/theme';

// path: 페이지 이동 / scrollId: 홈 내 섹션 스크롤
const NAV_ITEMS = [
  { label: 'Home',     path: '/',         scrollId: null      },
  { label: 'About Me', path: '/about',    scrollId: null      },
  { label: 'Projects', path: '/projects', scrollId: null      },
  { label: 'Contact',  path: null,        scrollId: 'contact' },
];

/* ── 애니메이션 햄버거 아이콘 ─────────────────── */
function HamburgerIcon({ open }) {
  const bar = {
    position: 'absolute',
    left: 0, right: 0,
    height: '2px',
    backgroundColor: colors.textPrimary,
    borderRadius: '1px',
  };
  return (
    <Box sx={{ width: 22, height: 18, position: 'relative', flexShrink: 0 }}>
      {/* 상단 선 */}
      <Box sx={{
        ...bar, top: 0,
        transform:  open ? 'translateY(8px) rotate(45deg)' : 'none',
        transition: 'transform 0.3s ease',
      }} />
      {/* 중간 선 */}
      <Box sx={{
        ...bar, top: '50%', mt: '-1px',
        opacity:    open ? 0 : 1,
        transition: 'opacity 0.2s ease',
      }} />
      {/* 하단 선 */}
      <Box sx={{
        ...bar, bottom: 0,
        transform:  open ? 'translateY(-8px) rotate(-45deg)' : 'none',
        transition: 'transform 0.3s ease',
      }} />
    </Box>
  );
}

/* ── NavBar ──────────────────────────────────── */
export default function NavBar() {
  const location  = useLocation();
  const navigate  = useNavigate();
  const theme     = useTheme();
  const isMobile  = useMediaQuery(theme.breakpoints.down('md'));

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [hidden,     setHidden]     = useState(false);   // 스크롤 다운 시 숨김
  const [progress,   setProgress]   = useState(0);       // 읽기 진행률 (0-100)
  const prevScrollY = useRef(0);

  /* ── 1. 스크롤 이벤트: 헤더 숨김 + 진행률 ── */
  useEffect(() => {
    const onScroll = () => {
      const y    = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;

      // 진행률 바
      setProgress(docH > 0 ? Math.min((y / docH) * 100, 100) : 0);

      // 80px 이상 스크롤 시 방향 감지
      if (y > 80) setHidden(y > prevScrollY.current);
      else        setHidden(false);

      prevScrollY.current = y;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* 라우트 변경 시 드로어 자동 닫기 */
  useEffect(() => { setDrawerOpen(false); }, [location.pathname]);

  /* ── 3. 스무스 스크롤 / 페이지 이동 ── */
  const handleClick = useCallback((item) => {
    setDrawerOpen(false);
    if (item.scrollId) {
      // Contact: 홈이면 스크롤, 다른 페이지면 홈 이동 후 스크롤
      if (location.pathname === '/') {
        document.getElementById(item.scrollId)
          ?.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/', { state: { scrollTo: item.scrollId } });
      }
    } else if (item.path) {
      navigate(item.path);
    }
  }, [location.pathname, navigate]);

  const isActive = (item) =>
    item.path === '/'
      ? location.pathname === '/'
      : item.path
        ? location.pathname.startsWith(item.path)
        : false;

  const shouldHide = hidden && !drawerOpen;

  /* ── 데스크탑 버튼 스타일 ── */
  const desktopBtn = (item) => ({
    color: isActive(item) ? colors.primary : colors.textSecondary,
    borderBottom: isActive(item)
      ? `2px solid ${colors.primary}` : '2px solid transparent',
    borderRadius: 0, mx: 0.5, px: 2,
    transition: 'color 0.2s, border-color 0.2s',
    '&:hover': { color: colors.primaryLight, backgroundColor: 'transparent' },
  });

  /* ── 드로어 항목 스타일 ── */
  const drawerBtn = (item) => ({
    color: isActive(item) ? colors.primary : colors.textSecondary,
    borderLeft: isActive(item)
      ? `3px solid ${colors.primary}` : '3px solid transparent',
    py: 1.5, px: 3,
    transition: 'color 0.2s, border-color 0.2s, background-color 0.2s',
    '&:hover': {
      color: colors.primary,
      backgroundColor: `${colors.primary}08`,
    },
  });

  return (
    <>
      {/* ── 2. 읽기 진행률 바 ─────────────────────── */}
      <Box sx={{
        position:  'fixed',
        top: 0, left: 0,
        zIndex:    theme.zIndex.appBar + 1,
        height:    '3px',
        width:     `${progress}%`,
        background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})`,
        pointerEvents: 'none',
        transition: 'width 0.1s linear',
      }} />

      {/* ── 1. 스크롤 반응 헤더 ─────────────────────── */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          transform:  shouldHide ? 'translateY(-100%)' : 'translateY(0)',
          transition: 'transform 0.32s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <Toolbar sx={{ maxWidth: 1100, width: '100%', mx: 'auto', px: { xs: 2, md: 4 } }}>

          {/* 로고 */}
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              flexGrow: 1, fontWeight: 700,
              color: colors.textPrimary, textDecoration: 'none', letterSpacing: 1,
            }}
          >
            Portfolio
          </Typography>

          {/* ── 4. 모바일 메뉴 ── */}
          {isMobile ? (
            <>
              <IconButton
                onClick={() => setDrawerOpen((p) => !p)}
                aria-label={drawerOpen ? '메뉴 닫기' : '메뉴 열기'}
                disableRipple
                sx={{ p: 1, ml: 1 }}
              >
                <HamburgerIcon open={drawerOpen} />
              </IconButton>

              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                PaperProps={{
                  sx: {
                    backgroundColor: colors.bgSecondary,
                    minWidth: 220,
                    borderLeft: `1px solid ${colors.border}`,
                  },
                }}
              >
                {/* 드로어 헤더 */}
                <Box sx={{
                  px: 3, py: 2.5,
                  borderBottom: `1px solid ${colors.border}`,
                }}>
                  <Typography variant="caption" sx={{
                    color: colors.textMuted, letterSpacing: 4,
                    fontSize: '0.62rem', fontWeight: 600,
                  }}>
                    MENU
                  </Typography>
                </Box>

                {/* 메뉴 항목 */}
                <List disablePadding sx={{ pt: 1 }}>
                  {NAV_ITEMS.map((item) => (
                    <ListItem key={item.label} disablePadding>
                      <ListItemButton
                        onClick={() => handleClick(item)}
                        sx={drawerBtn(item)}
                      >
                        <ListItemText
                          primary={item.label}
                          primaryTypographyProps={{
                            fontWeight: isActive(item) ? 600 : 400,
                            fontSize: '0.95rem',
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Drawer>
            </>
          ) : (
            /* ── 3. 데스크탑 스무스 스크롤 네비게이션 ── */
            <nav>
              {NAV_ITEMS.map((item) => (
                <Button
                  key={item.label}
                  onClick={() => handleClick(item)}
                  sx={desktopBtn(item)}
                >
                  {item.label}
                </Button>
              ))}
            </nav>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}
