import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import GitHubIcon from '@mui/icons-material/GitHub';
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

const ROLES       = ['Frontend Developer', 'UI / UX Designer', 'React Builder', 'Supabase Developer'];
const MORPH_WORDS = ['개발자', '디자이너', '크리에이터'];

/* ── 타이핑 훅 ── */
function useTypewriter(words, { typingMs = 75, erasingMs = 42, pauseMs = 2000 } = {}) {
  const [text,    setText]    = useState('');
  const [wIdx,    setWIdx]    = useState(0);
  const [erasing, setErasing] = useState(false);

  useEffect(() => {
    const target = words[wIdx % words.length];
    let t;
    if (!erasing) {
      if (text === target) {
        t = setTimeout(() => setErasing(true), pauseMs);
      } else {
        t = setTimeout(() => setText(target.slice(0, text.length + 1)), typingMs + Math.random() * 28);
      }
    } else {
      if (text === '') {
        setWIdx(i => (i + 1) % words.length);
        setErasing(false);
      } else {
        t = setTimeout(() => setText(s => s.slice(0, -1)), erasingMs);
      }
    }
    return () => clearTimeout(t);
  }, [text, wIdx, erasing, words, typingMs, erasingMs, pauseMs]);

  return text;
}

/* ── 텍스트 모핑 훅 ── */
function useMorphText(words, interval = 2600) {
  const [idx,      setIdx]      = useState(0);
  const [entering, setEntering] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setEntering(false), interval);
    return () => clearTimeout(t);
  }, [idx, interval]);

  useEffect(() => {
    if (!entering) {
      const t = setTimeout(() => { setIdx(i => (i + 1) % words.length); setEntering(true); }, 380);
      return () => clearTimeout(t);
    }
  }, [entering, words.length]);

  return { word: words[idx], entering, idx };
}

/* ── rAF 스크롤 훅 ── */
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
  const theme     = useTheme();
  const isMobile  = useMediaQuery(theme.breakpoints.down('sm'));   // < 600px
  const isTablet  = useMediaQuery(theme.breakpoints.between('sm', 'md')); // 600–899px
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));     // ≥ 900px

  const [show, setShow] = useState(false);
  const scrollY = useScrollY();

  /* 패럴렉스 — 모바일에서는 비활성화 (성능 + UX) */
  const bgY1   = isDesktop ? scrollY * 0.18  : 0;
  const bgY2   = isDesktop ? scrollY * 0.11  : 0;
  const dotsY  = isDesktop ? scrollY * 0.08  : 0;
  const orbitY = isDesktop ? scrollY * -0.07 : 0;

  const typedRole                                            = useTypewriter(ROLES);
  const { word: morphWord, entering: morphEntering, idx: morphIdx } = useMorphText(MORPH_WORDS, 2600);

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
      {/* ── 배경 링 1 ── */}
      <Box sx={{
        position: 'absolute', top: '-12%', right: '-8%',
        transform: `translate3d(0, ${bgY1}px, 0)`,
        willChange: isDesktop ? 'transform' : 'auto',
        pointerEvents: 'none',
      }}>
        <Box sx={{
          width: { xs: 200, sm: 320, md: 520 }, height: { xs: 200, sm: 320, md: 520 },
          borderRadius: '50%',
          border: `1px solid ${colors.primary}20`,
          animation: 'ringSpinCW 50s linear infinite',
          '@keyframes ringSpinCW': { from: { transform: 'rotate(0deg)' }, to: { transform: 'rotate(360deg)' } },
        }} />
      </Box>

      {/* ── 배경 링 2 ── */}
      <Box sx={{
        position: 'absolute', bottom: '-10%', left: '-6%',
        transform: `translate3d(0, ${bgY2}px, 0)`,
        willChange: isDesktop ? 'transform' : 'auto',
        pointerEvents: 'none',
      }}>
        <Box sx={{
          width: { xs: 140, sm: 240, md: 380 }, height: { xs: 140, sm: 240, md: 380 },
          borderRadius: '50%',
          border: `1px solid ${colors.accent}40`,
          animation: 'ringSpinCCW 38s linear infinite',
          '@keyframes ringSpinCCW': { from: { transform: 'rotate(0deg)' }, to: { transform: 'rotate(-360deg)' } },
        }} />
      </Box>

      {/* ── 배경 도트 (태블릿·데스크톱만) ── */}
      {!isMobile && BG_DOTS.map((d, i) => (
        <Box key={i} sx={{
          position: 'absolute',
          top: d.top, left: d.left, right: d.right,
          transform: `translate3d(0, ${dotsY * (0.6 + i * 0.1)}px, 0)`,
          willChange: isDesktop ? 'transform' : 'auto',
          pointerEvents: 'none',
        }}>
          <Box sx={{
            width: d.size, height: d.size, borderRadius: '50%',
            backgroundColor: colors.primary, opacity: 0.28,
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
        sx={{
          px: { xs: 2.5, sm: 3, md: 4 },
          /* 모바일: 위아래 패딩으로 수직 여백 확보, 데스크톱: 그리드 minHeight로 대체 */
          pt: { xs: 11, sm: 12, md: 0 },
          pb: { xs: 9,  sm: 10, md: 0 },
        }}
      >
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '54% 46%' },
          gap: { xs: 5, sm: 6, md: 4 },
          alignItems: 'center',
          minHeight: { md: '100vh' },
        }}>

          {/* ── 왼쪽: 텍스트 콘텐츠 ── */}
          <Box>

            {/* 오버라인 — 타이핑 롤 */}
            <Typography
              variant="overline"
              sx={{
                color: colors.primary,
                letterSpacing: { xs: 2.5, sm: 4, md: 5 },
                fontSize: { xs: '0.65rem', sm: '0.68rem', md: '0.7rem' },
                fontWeight: 600,
                mb: { xs: 2, sm: 2.5, md: 3 },
                display: 'block',
                minHeight: '1.2em',
                opacity:    show ? 1 : 0,
                transform:  show ? 'translateY(0)' : 'translateY(10px)',
                transition: 'opacity 0.6s ease 0ms, transform 0.6s ease 0ms',
              }}
            >
              {typedRole}
              <Box component="span" sx={{
                display: 'inline-block',
                width: '1.5px', height: '0.9em',
                backgroundColor: colors.primary,
                mx: 0.4, verticalAlign: 'middle',
                animation: 'cursorBlink 1s step-end infinite',
                '@keyframes cursorBlink': { '0%, 100%': { opacity: 1 }, '50%': { opacity: 0 } },
              }} />
              {' · 김재우'}
            </Typography>

            {/* ── 메인 헤드라인: 이름 ── */}
            <Typography
              component="p"
              sx={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize:   { xs: '1.5rem', sm: '1.9rem', md: '2.4rem' },
                fontWeight: 700,
                lineHeight: 1.2,
                color:      colors.textMuted,
                mb: 0,
                opacity:    show ? 1 : 0,
                transform:  show ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.7s ease 120ms, transform 0.7s ease 120ms',
              }}
            >
              안녕하세요,
            </Typography>

            <Typography
              variant="h1"
              sx={{
                fontSize:   { xs: '2.8rem', sm: '3.6rem', md: '4.4rem', lg: '5rem' },
                fontWeight: 800,
                lineHeight: 1.05,
                mb: { xs: 1.5, sm: 2 },
                background: `linear-gradient(135deg, ${colors.textPrimary} 0%, ${colors.primary} 35%, ${colors.accent} 65%, ${colors.primaryDark} 100%)`,
                backgroundSize: '300% 100%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'gradientFlow 5s ease infinite',
                '@keyframes gradientFlow': {
                  '0%':   { backgroundPosition: '0% 50%' },
                  '50%':  { backgroundPosition: '100% 50%' },
                  '100%': { backgroundPosition: '0% 50%' },
                },
                opacity:    show ? 1 : 0,
                transform:  show ? 'translateY(0)' : 'translateY(24px)',
                transition: 'opacity 0.7s ease 280ms, transform 0.7s ease 280ms',
              }}
            >
              김재우입니다.
            </Typography>

            {/* H2 서브 타이틀 */}
            <Typography
              variant="h2"
              sx={{
                fontSize:   { xs: '1.25rem', sm: '1.6rem', md: '2rem', lg: '2.4rem' },
                fontWeight: 700,
                lineHeight: 1.2,
                color:      colors.textMuted,
                mb: { xs: 1.5, md: 2 },
                opacity:    show ? 1 : 0,
                transform:  show ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.7s ease 450ms, transform 0.7s ease 450ms',
              }}
            >
              설계부터 배포까지, 혼자.
            </Typography>

            {/* 역할 모핑 텍스트 */}
            <Box sx={{
              display: 'flex', alignItems: 'center', gap: 0.8,
              mb: { xs: 2, md: 2.5 },
              opacity:    show ? 1 : 0,
              transition: 'opacity 0.6s ease 580ms',
            }}>
              <Box component="span" sx={{
                fontFamily: 'monospace',
                fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                color: colors.accent, opacity: 0.7, fontWeight: 400, userSelect: 'none',
              }}>{'<'}</Box>
              <Box sx={{ display: 'inline-flex', minWidth: { xs: 68, sm: 80, md: 100 } }}>
                {morphWord.split('').map((char, i) => (
                  <Box key={`${morphIdx}-${i}`} component="span" sx={{
                    display: 'inline-block',
                    fontFamily: '"Playfair Display", Georgia, serif',
                    fontSize: { xs: '0.95rem', sm: '1.1rem', md: '1.3rem' },
                    fontWeight: 700, color: colors.primary,
                    animation: morphEntering
                      ? `mIn 0.55s cubic-bezier(0.34,1.56,0.64,1) ${i * 55}ms both`
                      : `mOut 0.28s ease ${i * 22}ms both`,
                    '@keyframes mIn': {
                      from: { opacity: 0, transform: 'translateY(110%)', filter: 'blur(8px)' },
                      to:   { opacity: 1, transform: 'translateY(0)',    filter: 'blur(0)'  },
                    },
                    '@keyframes mOut': {
                      from: { opacity: 1, transform: 'translateY(0)',    filter: 'blur(0)'  },
                      to:   { opacity: 0, transform: 'translateY(-80%)', filter: 'blur(6px)' },
                    },
                  }}>{char}</Box>
                ))}
              </Box>
              <Box component="span" sx={{
                fontFamily: 'monospace',
                fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                color: colors.accent, opacity: 0.7, fontWeight: 400, userSelect: 'none',
              }}>{'/>'}</Box>
            </Box>

            {/* 그라데이션 구분선 */}
            <Box sx={{
              width:      show ? { xs: 40, md: 56 } : 0,
              height:     '2px',
              background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})`,
              mb:         { xs: 2, md: 3 },
              borderRadius: 1,
              transition: 'width 0.6s ease 680ms',
            }} />

            {/* 슬로건 3줄 */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.4, mb: { xs: 3, sm: 3.5, md: 4 } }}>
              {LINES.map((line, lineIdx) => (
                <Box key={lineIdx} sx={{ lineHeight: 1.75 }}>
                  {[...line].map((char, charIdx) => (
                    <Box key={charIdx} component="span" sx={{
                      display: 'inline-block',
                      fontSize:   { xs: '0.95rem', sm: '1.1rem', md: '1.25rem' },
                      fontWeight: 500,
                      color:      colors.textSecondary,
                      fontStyle:  'italic',
                      whiteSpace: 'pre',
                      opacity:    show ? 1 : 0,
                      transform:  show ? 'translateY(0)' : 'translateY(10px)',
                      transition: `opacity 0.42s ease ${700 + lineIdx * 160 + charIdx * 20}ms,
                                   transform 0.42s ease ${700 + lineIdx * 160 + charIdx * 20}ms`,
                    }}>{char}</Box>
                  ))}
                </Box>
              ))}
            </Box>

            {/* 서브텍스트 */}
            <Typography
              variant="body1"
              sx={{
                color:      colors.textMuted,
                fontSize:   { xs: '0.85rem', sm: '0.9rem', md: '0.98rem' },
                lineHeight: { xs: 1.75, md: 1.9 },
                maxWidth:   { xs: '100%', sm: 420 },
                mb:         { xs: 3, sm: 3.5, md: 4 },
                opacity:    show ? 1 : 0,
                transform:  show ? 'translateY(0)' : 'translateY(12px)',
                transition: 'opacity 0.6s ease 1300ms, transform 0.6s ease 1300ms',
              }}
            >
              React · Supabase · MUI로 아름답고 작동하는 웹앱을 직접 설계하고 배포합니다.
              {!isMobile && <><br />건축 공간 설계에서 시작한 디자인 감각을 화면 위에서 이어가고 있습니다.</>}
              {isMobile && ' 건축 공간 설계에서 시작한 디자인 감각을 화면 위에서 이어가고 있습니다.'}
            </Typography>

            {/* ── 모바일·태블릿 기술 스택 칩 (데스크톱 orbit 대체) ── */}
            {!isDesktop && (
              <Box sx={{
                display: 'flex', flexWrap: 'wrap',
                gap: { xs: 0.8, sm: 1 },
                mb: { xs: 3.5, sm: 4 },
              }}>
                {TECH_STACK.map((tech, i) => (
                  <Box key={tech.name} sx={{
                    display: 'flex', alignItems: 'center',
                    gap: { xs: 0.5, sm: 0.7 },
                    px: { xs: 1.3, sm: 1.5 },
                    py: { xs: 0.6, sm: 0.7 },
                    border: `1px solid ${colors.border}`,
                    borderRadius: 20,
                    backgroundColor: `${colors.primary}08`,
                    transition: 'border-color 0.2s, background-color 0.2s',
                    '&:hover': {
                      borderColor: colors.primary,
                      backgroundColor: `${colors.primary}14`,
                    },
                    opacity:    show ? 1 : 0,
                    transform:  show ? 'translateY(0)' : 'translateY(8px)',
                    transition2: `opacity 0.4s ease ${1450 + i * 60}ms, transform 0.4s ease ${1450 + i * 60}ms`,
                    /* transition2는 무효 — 아래 transition으로 처리 */
                    animation: `none`,
                  }}
                    style={{
                      opacity: show ? 1 : 0,
                      transform: show ? 'translateY(0)' : 'translateY(8px)',
                      transition: `opacity 0.4s ease ${1450 + i * 60}ms, transform 0.4s ease ${1450 + i * 60}ms`,
                    }}>
                    <Typography sx={{ fontSize: { xs: '0.9rem', sm: '1rem' }, lineHeight: 1 }}>
                      {tech.icon}
                    </Typography>
                    <Typography sx={{
                      fontSize:   { xs: '0.7rem', sm: '0.75rem' },
                      fontWeight: 600,
                      color:      colors.textPrimary,
                      letterSpacing: 0.2,
                    }}>
                      {tech.name}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}

            {/* ── CTA 버튼 영역 ── */}
            <Box sx={{
              opacity:    show ? 1 : 0,
              transform:  show ? 'translateY(0)' : 'translateY(12px)',
              transition: 'opacity 0.6s ease 1550ms, transform 0.6s ease 1550ms',
            }}>
              {/* 버튼 행 */}
              <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: { xs: 1.5, sm: 2 },
                flexWrap: { sm: 'wrap' },
                mb: { xs: 2, sm: 2.5 },
              }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => scrollTo('projects')}
                  aria-label="프로젝트 섹션으로 이동"
                  sx={{
                    backgroundColor: colors.primaryDark,
                    color: '#f5ede3',
                    px: { xs: 3, sm: 3.5, md: 4.5 },
                    py: { xs: 1.5, sm: 1.5 },
                    /* 터치 타겟 최소 44px */
                    minHeight: { xs: 52, sm: 48, md: 48 },
                    width: { xs: '100%', sm: 'auto' },
                    fontSize: { xs: '0.9rem', sm: '0.9rem' },
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

                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => scrollTo('contact')}
                  aria-label="연락처 섹션으로 이동"
                  sx={{
                    borderColor: `${colors.primary}70`,
                    color: colors.primaryDark,
                    px: { xs: 3, sm: 3.5, md: 4.5 },
                    py: { xs: 1.5, sm: 1.5 },
                    minHeight: { xs: 52, sm: 48, md: 48 },
                    width: { xs: '100%', sm: 'auto' },
                    fontSize: { xs: '0.9rem', sm: '0.9rem' },
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
              </Box>

              {/* 소셜 아이콘 + 이메일 */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 0.75 }, flexWrap: 'wrap' }}>
                <Tooltip title="GitHub 보기" arrow placement="top">
                  <IconButton
                    component="a"
                    href="https://github.com/wmr102095-cloud"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub 프로필 열기"
                    sx={{
                      color: colors.textMuted,
                      width:  { xs: 48, sm: 44 },
                      height: { xs: 48, sm: 44 },
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
                    <GitHubIcon sx={{ fontSize: { xs: '1.2rem', sm: '1.1rem' } }} />
                  </IconButton>
                </Tooltip>

                <Tooltip title="이메일 보내기" arrow placement="top">
                  <IconButton
                    component="a"
                    href="mailto:wmr102095@gmail.com"
                    aria-label="이메일 보내기"
                    sx={{
                      color: colors.textMuted,
                      width:  { xs: 48, sm: 44 },
                      height: { xs: 48, sm: 44 },
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
                    <EmailIcon sx={{ fontSize: { xs: '1.2rem', sm: '1.1rem' } }} />
                  </IconButton>
                </Tooltip>

                <Divider
                  orientation="vertical" flexItem
                  sx={{ borderColor: colors.border, mx: { sm: 0.5 }, my: 0.5, display: { xs: 'none', sm: 'flex' } }}
                />

                <Typography variant="caption" sx={{
                  color: colors.textMuted,
                  fontSize: { sm: '0.72rem', md: '0.75rem' },
                  letterSpacing: 0.3,
                  display: { xs: 'none', sm: 'block' },
                }}>
                  wmr102095@gmail.com
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* ── 오른쪽: 기술 스택 오빗 (데스크톱 전용) ── */}
          {isDesktop && (
            <Box sx={{
              display: 'flex', justifyContent: 'center', alignItems: 'center',
              transform: `translate3d(0, ${orbitY}px, 0)`,
              willChange: 'transform',
            }}>
              <Box sx={{
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                opacity:    show ? 1 : 0,
                transform:  show ? 'scale(1)' : 'scale(0.9)',
                transition: 'opacity 0.8s ease 500ms, transform 0.8s ease 500ms',
              }}>
                <Box sx={{ position: 'relative', width: { md: 340, lg: 380 }, height: { md: 370, lg: 420 } }}>

                  {/* 점선 궤도 */}
                  <Box sx={{
                    position: 'absolute', top: '50%', left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: { md: 270, lg: 310 }, height: { md: 270, lg: 310 },
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
                    position: 'absolute', top: '50%', left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: { md: 110, lg: 130 }, height: { md: 110, lg: 130 },
                    borderRadius: 4,
                    border: `1px solid ${colors.primary}50`,
                    background: `linear-gradient(145deg, ${colors.bgSecondary}, ${colors.bgPrimary})`,
                    boxShadow: `0 8px 32px ${colors.primaryDark}18, inset 0 1px 0 ${colors.accent}40`,
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center', zIndex: 2,
                    animation: 'centerPulse 4s ease-in-out infinite',
                    '@keyframes centerPulse': {
                      '0%, 100%': { boxShadow: `0 8px 32px ${colors.primaryDark}18, inset 0 1px 0 ${colors.accent}40` },
                      '50%':      { boxShadow: `0 12px 40px ${colors.primaryDark}28, inset 0 1px 0 ${colors.accent}60` },
                    },
                  }}>
                    <Typography sx={{ fontSize: { md: '2rem', lg: '2.4rem' }, lineHeight: 1, mb: 0.8 }}>💻</Typography>
                    <Typography sx={{
                      fontSize: '0.62rem', color: colors.textMuted,
                      fontWeight: 700, letterSpacing: 2.5, textTransform: 'uppercase',
                    }}>
                      김재우
                    </Typography>
                  </Box>

                  {/* 오빗 배지 6개 */}
                  {TECH_STACK.map((tech, i) => {
                    const angle  = (i / TECH_STACK.length) * 2 * Math.PI - Math.PI / 2;
                    const radius = isTablet ? 130 : 152;
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;
                    const floatDir = i % 2 === 0 ? -7 : 7;
                    return (
                      <Box key={tech.name} sx={{
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
                      }}>
                        <Box sx={{
                          px: { md: 1.3, lg: 1.6 }, py: { md: 0.7, lg: 0.9 },
                          borderRadius: 2.5,
                          border: `1px solid ${colors.primary}30`,
                          background: `linear-gradient(145deg, ${colors.bgSecondary}, ${colors.bgPrimary})`,
                          boxShadow: `0 4px 16px ${colors.primaryDark}10`,
                          display: 'flex', flexDirection: 'column', alignItems: 'center',
                          gap: 0.25, minWidth: { md: 56, lg: 66 },
                          transition: 'border-color 0.22s, box-shadow 0.25s, transform 0.25s',
                          willChange: 'transform', cursor: 'default',
                          '&:hover': {
                            borderColor: colors.primary,
                            boxShadow: `0 10px 28px ${colors.primaryDark}28, 0 0 0 4px ${colors.primary}14`,
                            transform: 'scale(1.14) translateY(-4px)',
                          },
                        }}>
                          <Typography sx={{ fontSize: { md: '1.1rem', lg: '1.25rem' }, lineHeight: 1 }}>{tech.icon}</Typography>
                          <Typography sx={{ fontSize: { md: '0.58rem', lg: '0.63rem' }, fontWeight: 700, color: colors.textPrimary, letterSpacing: 0.2 }}>
                            {tech.name}
                          </Typography>
                          <Typography sx={{ fontSize: { md: '0.5rem', lg: '0.53rem' }, color: colors.textMuted }}>
                            {tech.sub}
                          </Typography>
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            </Box>
          )}

        </Box>
      </Container>

      {/* ── 스크롤 인디케이터 ── */}
      <Box
        onClick={() => scrollTo('about')}
        role="button"
        aria-label="다음 섹션으로 스크롤"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') scrollTo('about'); }}
        sx={{
          position: 'absolute',
          bottom: { xs: 20, sm: 28 },
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.3,
          cursor: 'pointer', opacity: 0.5, transition: 'opacity 0.2s',
          /* 터치 타겟 확보 */
          p: 1.5,
          '&:hover, &:focus-visible': { opacity: 0.9 },
          animation: 'scrollBounce 2.2s ease-in-out infinite',
          '@keyframes scrollBounce': {
            '0%, 100%': { transform: 'translateX(-50%) translateY(0)'  },
            '50%':      { transform: 'translateX(-50%) translateY(6px)' },
          },
        }}
      >
        <Typography variant="caption" sx={{
          color: colors.textMuted, letterSpacing: { xs: 3, sm: 4 },
          fontSize: { xs: '0.55rem', sm: '0.58rem' }, fontWeight: 600,
        }}>
          SCROLL
        </Typography>
        <KeyboardArrowDownIcon sx={{ fontSize: { xs: '1.1rem', sm: '1.3rem' }, color: colors.textMuted }} />
      </Box>
    </Box>
  );
}
