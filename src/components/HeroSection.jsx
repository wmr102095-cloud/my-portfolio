import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import DownloadIcon from '@mui/icons-material/Download';
import EmailIcon from '@mui/icons-material/Email';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { colors } from '../theme/theme';

const LINES = [
  '보기 좋아야 쓰고 싶어지고,',
  '쓰고 싶어야 기억에 남습니다.',
  '그런 사이트를 만듭니다.',
];

const TECH_STACK = [
  { icon: '⚛️', name: 'React',    sub: 'Framework',  delay: 0   },
  { icon: '🟢', name: 'Supabase', sub: 'Backend',    delay: 100 },
  { icon: '🎨', name: 'MUI',      sub: 'UI Library', delay: 200 },
  { icon: '⚡', name: 'Vite',     sub: 'Build',      delay: 300 },
  { icon: '🔶', name: 'HTML/CSS', sub: 'Markup',     delay: 400 },
  { icon: '🐙', name: 'GitHub',   sub: 'DevOps',     delay: 500 },
];

const BG_DOTS = [
  { top: '18%', left:  '4%',  size: 6 },
  { top: '72%', left:  '7%',  size: 4 },
  { top: '12%', right: '22%', size: 5 },
  { top: '82%', right: '10%', size: 7 },
  { top: '48%', left:  '1%',  size: 3 },
];

/* ── rAF 스로틀 스크롤 훅 (패럴렉스 공용) ── */
function useScrollY() {
  const [scrollY, setScrollY] = useState(0);
  const rafRef = useRef(null);
  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        setScrollY(window.scrollY);
        rafRef.current = null;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);
  return scrollY;
}

export default function HeroSection() {
  const [show, setShow] = useState(false);
  const scrollY  = useScrollY();
  /* 패럴렉스 오프셋 — 각 레이어 깊이에 따라 속도 분리 */
  const bgY1     = scrollY * 0.18;   // 배경 링 1 (가장 뒤)
  const bgY2     = scrollY * 0.11;   // 배경 링 2
  const dotsY    = scrollY * 0.08;   // 배경 도트 (중간층)
  const orbitY   = scrollY * -0.07;  // 오빗 비주얼 (앞으로 튀어나오는 효과)
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 200);
    return () => clearTimeout(t);
  }, []);

  const scrollTo = useCallback((id) => {
    if (location.pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/', { state: { scrollTo: id } });
    }
  }, [location.pathname, navigate]);

  return (
    <Box
      component="section"
      id="hero"
      sx={{
        minHeight: '100vh',
        width: '100%',
        boxSizing: 'border-box',
        position: 'relative',
        overflowX: 'hidden',
        display: 'flex',
        alignItems: 'center',
        background: `
          radial-gradient(ellipse at 8%  88%, ${colors.accent}75   0%, transparent 48%),
          radial-gradient(ellipse at 92%  8%, ${colors.primaryDark}28 0%, transparent 48%),
          radial-gradient(ellipse at 55% 55%, ${colors.primary}14   0%, transparent 60%),
          ${colors.bgPrimary}
        `,
      }}
    >
      {/* ── 배경 장식: 회전 링 (레이어 1 — 가장 뒤, 느린 패럴렉스) ── */}
      <Box sx={{
        position: 'absolute', top: '-12%', right: '-8%',
        transform: `translate3d(0, ${bgY1}px, 0)`,
        willChange: 'transform',
        pointerEvents: 'none',
      }}>
        <Box sx={{
          width: { xs: 280, md: 520 }, height: { xs: 280, md: 520 },
          borderRadius: '50%',
          border: `1px solid ${colors.primary}20`,
          animation: 'ringSpinCW 50s linear infinite',
          '@keyframes ringSpinCW': {
            from: { transform: 'rotate(0deg)' },
            to:   { transform: 'rotate(360deg)' },
          },
        }} />
      </Box>
      {/* ── 배경 장식: 회전 링 (레이어 2 — 조금 더 앞) ── */}
      <Box sx={{
        position: 'absolute', bottom: '-10%', left: '-6%',
        transform: `translate3d(0, ${bgY2}px, 0)`,
        willChange: 'transform',
        pointerEvents: 'none',
      }}>
        <Box sx={{
          width: { xs: 200, md: 380 }, height: { xs: 200, md: 380 },
          borderRadius: '50%',
          border: `1px solid ${colors.accent}40`,
          animation: 'ringSpinCCW 38s linear infinite',
          '@keyframes ringSpinCCW': {
            from: { transform: 'rotate(0deg)' },
            to:   { transform: 'rotate(-360deg)' },
          },
        }} />
      </Box>

      {/* ── 배경 장식: 떠다니는 도트 (레이어 3 — 패럴렉스 + 부유 중첩) ── */}
      {BG_DOTS.map((d, i) => (
        <Box key={i} sx={{
          position: 'absolute',
          top: d.top, left: d.left, right: d.right,
          transform: `translate3d(0, ${dotsY * (0.6 + i * 0.1)}px, 0)`,
          willChange: 'transform',
          pointerEvents: 'none',
        }}>
          <Box sx={{
            width: d.size, height: d.size,
            borderRadius: '50%',
            backgroundColor: colors.primary,
            opacity: 0.28,
            animation: `dotFloat${i} ${3.2 + i * 0.6}s ease-in-out infinite`,
            [`@keyframes dotFloat${i}`]: {
              '0%, 100%': { transform: 'translateY(0)',    opacity: 0.28 },
              '50%':      { transform: 'translateY(-9px)', opacity: 0.55 },
            },
          }} />
        </Box>
      ))}

      <Container
        maxWidth="lg"
        sx={{ px: { xs: 2.5, sm: 3, md: 4 }, py: { xs: 13, sm: 12, md: 0 } }}
      >
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '54% 46%' },
          gap: { xs: 4, sm: 5, md: 4 },
          alignItems: 'center',
          minHeight: { md: '100vh' },
        }}>

          {/* ── 왼쪽: 텍스트 콘텐츠 ── */}
          <Box>
            {/* 오버라인 */}
            <Typography
              variant="overline"
              sx={{
                color: colors.primary,
                letterSpacing: { xs: 3, sm: 5 },
                fontSize: { xs: '0.62rem', sm: '0.7rem' },
                fontWeight: 600,
                mb: 3,
                display: 'block',
                opacity:    show ? 1 : 0,
                transform:  show ? 'translateY(0)' : 'translateY(10px)',
                transition: 'opacity 0.6s ease 0ms, transform 0.6s ease 0ms',
              }}
            >
              Frontend Developer & UI Designer · 김재우
            </Typography>

            {/* 메인 H1 — 그라데이션 텍스트 */}
            <Typography
              variant="h1"
              sx={{
                fontSize:   { xs: '2.2rem', sm: '3rem', md: '3.8rem' },
                fontWeight: 700,
                lineHeight: 1.1,
                mb: 1,
                background: `linear-gradient(135deg, ${colors.textPrimary} 20%, ${colors.primary} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                opacity:    show ? 1 : 0,
                transform:  show ? 'translateY(0)' : 'translateY(24px)',
                transition: 'opacity 0.7s ease 150ms, transform 0.7s ease 150ms',
              }}
            >
              React · Supabase · MUI
            </Typography>

            {/* 서브 H2 */}
            <Typography
              variant="h2"
              sx={{
                fontSize:   { xs: '1.5rem', sm: '2rem', md: '2.6rem' },
                fontWeight: 700,
                lineHeight: 1.15,
                color:      colors.textMuted,
                mb: 3,
                opacity:    show ? 1 : 0,
                transform:  show ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.7s ease 350ms, transform 0.7s ease 350ms',
              }}
            >
              설계부터 배포까지, 혼자.
            </Typography>

            {/* 그라데이션 구분선 */}
            <Box sx={{
              width:      show ? 56 : 0,
              height:     '2px',
              background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})`,
              mb:         3,
              borderRadius: 1,
              transition: 'width 0.6s ease 600ms',
            }} />

            {/* 슬로건 3줄 */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, mb: { xs: 4, md: 5 } }}>
              {LINES.map((line, i) => (
                <Typography
                  key={i}
                  sx={{
                    fontSize:   { xs: '1rem', sm: '1.2rem', md: '1.35rem' },
                    fontWeight: 500,
                    color:      colors.textSecondary,
                    fontStyle:  'italic',
                    lineHeight: 1.85,
                    opacity:    show ? 1 : 0,
                    transform:  show ? 'translateX(0)' : 'translateX(-18px)',
                    transition: `opacity 0.65s ease ${700 + i * 220}ms, transform 0.65s ease ${700 + i * 220}ms`,
                  }}
                >
                  {line}
                </Typography>
              ))}
            </Box>

            {/* 서브텍스트 */}
            <Typography
              variant="body1"
              sx={{
                color:    colors.textMuted,
                fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem' },
                lineHeight: 1.9,
                maxWidth: 420,
                mb:       { xs: 4, sm: 5, md: 6 },
                opacity:    show ? 1 : 0,
                transform:  show ? 'translateY(0)' : 'translateY(12px)',
                transition: 'opacity 0.6s ease 1350ms, transform 0.6s ease 1350ms',
              }}
            >
              React · Supabase · MUI로 아름답고 작동하는 웹앱을 직접 설계하고 배포합니다. 건축 공간 설계에서 시작한 디자인 감각을 화면 위에서 이어가고 있습니다.
            </Typography>

            {/* ── CTA 버튼 영역 ── */}
            <Box sx={{
              opacity:    show ? 1 : 0,
              transform:  show ? 'translateY(0)' : 'translateY(12px)',
              transition: 'opacity 0.6s ease 1550ms, transform 0.6s ease 1550ms',
            }}>

              {/* 주요 버튼 행 */}
              <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: { xs: 1.5, sm: 2 },
                flexWrap: { sm: 'wrap' },
                mb: 2.5,
              }}>

                {/* Primary CTA */}
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => scrollTo('projects')}
                  sx={{
                    backgroundColor: colors.primaryDark,
                    color: '#f5ede3',
                    px: { xs: 3.5, md: 4.5 },
                    py: 1.5,
                    minHeight: { xs: 48, sm: 44 },
                    width: { xs: '100%', sm: 'auto' },
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    borderRadius: 2,
                    letterSpacing: 0.5,
                    boxShadow: `0 4px 20px ${colors.primaryDark}35`,
                    transition: 'transform 0.22s ease, box-shadow 0.22s ease, background-color 0.22s ease',
                    willChange: 'transform',
                    '&:hover': {
                      backgroundColor: colors.primary,
                      boxShadow: `0 14px 36px ${colors.primaryDark}45`,
                      transform: 'translateY(-3px) scale(1.02)',
                    },
                    '&:active': { transform: 'translateY(0) scale(0.99)' },
                  }}
                >
                  프로젝트 보기
                </Button>

                {/* Secondary CTA */}
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => scrollTo('contact')}
                  sx={{
                    borderColor: `${colors.primary}70`,
                    color: colors.primaryDark,
                    px: { xs: 3.5, md: 4.5 },
                    py: 1.5,
                    minHeight: { xs: 48, sm: 44 },
                    width: { xs: '100%', sm: 'auto' },
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    borderRadius: 2,
                    letterSpacing: 0.5,
                    transition: 'transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s, background-color 0.22s',
                    willChange: 'transform',
                    '&:hover': {
                      borderColor: colors.primaryDark,
                      backgroundColor: `${colors.primary}12`,
                      boxShadow: `0 10px 28px ${colors.primaryDark}22`,
                      transform: 'translateY(-3px) scale(1.02)',
                    },
                    '&:active': { transform: 'translateY(0) scale(0.99)' },
                  }}
                >
                  연락하기
                </Button>

                {/* 이력서 다운로드 — 파일 준비 시 활성화 */}
                <Tooltip title="이력서 준비 중입니다" arrow placement="top">
                  <span style={{ width: 'inherit' }}>
                    <Button
                      variant="text"
                      size="large"
                      disabled
                      startIcon={<DownloadIcon sx={{ fontSize: '1rem !important' }} />}
                      sx={{
                        color: `${colors.textMuted}80`,
                        px: { xs: 2.5, md: 3 },
                        py: 1.5,
                        minHeight: { xs: 48, sm: 44 },
                        width: { xs: '100%', sm: 'auto' },
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        borderRadius: 2,
                        letterSpacing: 0.5,
                        border: `1px dashed ${colors.primary}25`,
                        '&.Mui-disabled': {
                          color: `${colors.textMuted}70`,
                          border: `1px dashed ${colors.primary}25`,
                        },
                      }}
                    >
                      이력서
                    </Button>
                  </span>
                </Tooltip>
              </Box>

              {/* 소셜 아이콘 행 */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.75, sm: 0.5 }, flexWrap: 'wrap' }}>
                <Tooltip title="GitHub 보기" arrow placement="top">
                  <IconButton
                    component="a"
                    href="https://github.com/wmr102095-cloud"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub 프로필"
                    sx={{
                      color: colors.textMuted,
                      width: { xs: 44, sm: 40 }, height: { xs: 44, sm: 40 },
                      border: `1px solid ${colors.border}`,
                      borderRadius: 2,
                      transition: 'transform 0.22s ease, color 0.2s, border-color 0.2s, box-shadow 0.22s',
                      willChange: 'transform',
                      '&:hover': {
                        color: colors.textPrimary,
                        borderColor: colors.textPrimary,
                        backgroundColor: `${colors.primaryDark}10`,
                        transform: 'translateY(-4px)',
                        boxShadow: `0 8px 20px ${colors.primaryDark}18`,
                      },
                    }}
                  >
                    <GitHubIcon sx={{ fontSize: '1.1rem' }} />
                  </IconButton>
                </Tooltip>

                <Tooltip title="LinkedIn 보기" arrow placement="top">
                  <IconButton
                    component="a"
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn 프로필"
                    sx={{
                      color: colors.textMuted,
                      width: { xs: 44, sm: 40 }, height: { xs: 44, sm: 40 },
                      border: `1px solid ${colors.border}`,
                      borderRadius: 2,
                      transition: 'transform 0.22s ease, color 0.2s, border-color 0.2s, box-shadow 0.22s',
                      willChange: 'transform',
                      '&:hover': {
                        color: '#0077B5',
                        borderColor: '#0077B5',
                        backgroundColor: '#0077B510',
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 20px #0077B520',
                      },
                    }}
                  >
                    <LinkedInIcon sx={{ fontSize: '1.1rem' }} />
                  </IconButton>
                </Tooltip>

                <Tooltip title="이메일 보내기" arrow placement="top">
                  <IconButton
                    component="a"
                    href="mailto:wmr102095@gmail.com"
                    aria-label="이메일 보내기"
                    sx={{
                      color: colors.textMuted,
                      width: { xs: 44, sm: 40 }, height: { xs: 44, sm: 40 },
                      border: `1px solid ${colors.border}`,
                      borderRadius: 2,
                      transition: 'transform 0.22s ease, color 0.2s, border-color 0.2s, box-shadow 0.22s',
                      willChange: 'transform',
                      '&:hover': {
                        color: colors.primary,
                        borderColor: colors.primary,
                        backgroundColor: `${colors.primary}10`,
                        transform: 'translateY(-4px)',
                        boxShadow: `0 8px 20px ${colors.primary}25`,
                      },
                    }}
                  >
                    <EmailIcon sx={{ fontSize: '1.1rem' }} />
                  </IconButton>
                </Tooltip>

                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ borderColor: colors.border, mx: 1, my: 0.5, display: { xs: 'none', sm: 'flex' } }}
                />

                <Typography
                  variant="caption"
                  sx={{
                    color: colors.textMuted,
                    fontSize: '0.75rem',
                    letterSpacing: 0.3,
                    display: { xs: 'none', sm: 'block' },
                  }}
                >
                  wmr102095@gmail.com
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* ── 오른쪽: 기술 스택 오빗 비주얼 (레이어 4 — 역방향 패럴렉스, 앞으로 나오는 효과) ── */}
          <Box sx={{
            display: { xs: 'none', md: 'flex' },
            justifyContent: 'center',
            alignItems: 'center',
            transform: `translate3d(0, ${orbitY}px, 0)`,
            willChange: 'transform',
          }}>
            <Box sx={{
              display: 'flex', justifyContent: 'center', alignItems: 'center',
              opacity:    show ? 1 : 0,
              transform:  show ? 'scale(1)' : 'scale(0.9)',
              transition: 'opacity 0.8s ease 500ms, transform 0.8s ease 500ms',
            }}>
            <Box sx={{ position: 'relative', width: 380, height: 420 }}>

              {/* 점선 궤도 */}
              <Box sx={{
                position: 'absolute',
                top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 310, height: 310,
                borderRadius: '50%',
                border: `1.5px dashed ${colors.primary}28`,
                pointerEvents: 'none',
                animation: 'orbitRing 70s linear infinite',
                '@keyframes orbitRing': {
                  from: { transform: 'translate(-50%, -50%) rotate(0deg)' },
                  to:   { transform: 'translate(-50%, -50%) rotate(360deg)' },
                },
              }} />

              {/* 중앙 카드 */}
              <Box sx={{
                position: 'absolute',
                top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 130, height: 130,
                borderRadius: 4,
                border: `1px solid ${colors.primary}50`,
                background: `linear-gradient(145deg, ${colors.bgSecondary}, ${colors.bgPrimary})`,
                boxShadow: `0 8px 32px ${colors.primaryDark}18, inset 0 1px 0 ${colors.accent}40`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2,
                animation: 'centerPulse 4s ease-in-out infinite',
                '@keyframes centerPulse': {
                  '0%, 100%': { boxShadow: `0 8px 32px ${colors.primaryDark}18, inset 0 1px 0 ${colors.accent}40` },
                  '50%':      { boxShadow: `0 12px 40px ${colors.primaryDark}28, inset 0 1px 0 ${colors.accent}60` },
                },
              }}>
                <Typography sx={{ fontSize: '2.4rem', lineHeight: 1, mb: 0.8 }}>💻</Typography>
                <Typography sx={{
                  fontSize: '0.62rem', color: colors.textMuted,
                  fontWeight: 700, letterSpacing: 2.5,
                  textTransform: 'uppercase',
                }}>
                  김재우
                </Typography>
              </Box>

              {/* 오빗 기술 배지 6개 */}
              {TECH_STACK.map((tech, i) => {
                const angle  = (i / TECH_STACK.length) * 2 * Math.PI - Math.PI / 2;
                const radius = 152;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                const floatDir = i % 2 === 0 ? -7 : 7;
                return (
                  <Box
                    key={tech.name}
                    sx={{
                      position: 'absolute',
                      top:  `calc(50% + ${y}px)`,
                      left: `calc(50% + ${x}px)`,
                      transform: 'translate(-50%, -50%)',
                      opacity:    show ? 1 : 0,
                      transition: `opacity 0.5s ease ${800 + tech.delay}ms`,
                      animation: `badgeFloat${i} ${3.6 + i * 0.35}s ease-in-out ${tech.delay}ms infinite`,
                      [`@keyframes badgeFloat${i}`]: {
                        '0%, 100%': { marginTop: '0px' },
                        '50%':      { marginTop: `${floatDir}px` },
                      },
                      zIndex: 3,
                    }}
                  >
                    <Box sx={{
                      px: 1.6, py: 0.9,
                      borderRadius: 2.5,
                      border: `1px solid ${colors.primary}30`,
                      background: `linear-gradient(145deg, ${colors.bgSecondary}, ${colors.bgPrimary})`,
                      boxShadow: `0 4px 16px ${colors.primaryDark}10`,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 0.25,
                      minWidth: 66,
                      transition: 'border-color 0.22s, box-shadow 0.25s, transform 0.25s',
                      willChange: 'transform',
                      '&:hover': {
                        borderColor: colors.primary,
                        boxShadow: `0 10px 28px ${colors.primaryDark}28, 0 0 0 4px ${colors.primary}14`,
                        transform: 'scale(1.14) translateY(-4px)',
                      },
                      cursor: 'default',
                    }}>
                      <Typography sx={{ fontSize: '1.25rem', lineHeight: 1 }}>{tech.icon}</Typography>
                      <Typography sx={{
                        fontSize: '0.63rem', fontWeight: 700,
                        color: colors.textPrimary, letterSpacing: 0.2,
                      }}>
                        {tech.name}
                      </Typography>
                      <Typography sx={{ fontSize: '0.53rem', color: colors.textMuted }}>
                        {tech.sub}
                      </Typography>
                    </Box>
                  </Box>
                );
              })}
            </Box>
            </Box>
          </Box>

        </Box>
      </Container>

      {/* ── 스크롤 인디케이터 ── */}
      <Box
        onClick={() => scrollTo('about')}
        sx={{
          position: 'absolute',
          bottom: 28,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 0.3,
          cursor: 'pointer',
          opacity: 0.5,
          transition: 'opacity 0.2s',
          '&:hover': { opacity: 0.9 },
          animation: 'scrollBounce 2.2s ease-in-out infinite',
          '@keyframes scrollBounce': {
            '0%, 100%': { transform: 'translateX(-50%) translateY(0)'  },
            '50%':      { transform: 'translateX(-50%) translateY(6px)' },
          },
        }}
      >
        <Typography variant="caption" sx={{
          color: colors.textMuted, letterSpacing: 4,
          fontSize: '0.58rem', fontWeight: 600,
        }}>
          SCROLL
        </Typography>
        <KeyboardArrowDownIcon sx={{ fontSize: '1.3rem', color: colors.textMuted }} />
      </Box>
    </Box>
  );
}
