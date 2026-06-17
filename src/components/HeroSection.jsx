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

/* ── 상수 ── */
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

const STATS = [
  { value: '5+',   label: '기술 스택'   },
  { value: '100%', label: '설계→배포'  },
  { value: '1인',  label: '풀스택 개발' },
];

/* ── 코드 카드 토큰 색상 ── */
const T = {
  kw:   `${colors.accent}ee`,
  var:  colors.primary,
  key:  colors.primaryLight,
  str:  '#8aae92',
  bool: '#c4956a',
  op:   `${colors.textMuted}bb`,
  cmt:  `${colors.textMuted}66`,
};

const CODE = [
  [{ c:T.kw, v:'const ' }, { c:T.var, v:'김재우' }, { c:T.op, v:' = {' }],
  [{ c:T.op, v:'  ' },     { c:T.key, v:'role'   }, { c:T.op, v:': ' }, { c:T.str,  v:'"Frontend Dev",' }],
  [{ c:T.op, v:'  ' },     { c:T.key, v:'design' }, { c:T.op, v:': ' }, { c:T.bool, v:'true,' }],
  [{ c:T.op, v:'  ' },     { c:T.key, v:'origin' }, { c:T.op, v:': ' }, { c:T.str,  v:'"건축 → 웹",' }],
  [{ c:T.op, v:'  ' },     { c:T.key, v:'goal'   }, { c:T.op, v:': ' }, { c:T.str,  v:'"Design × Dev",' }],
  [{ c:T.op, v:'}' }],
];

/* ── 코드 에디터 카드 ── */
function CodeCard({ show }) {
  return (
    <Box sx={{
      px: { md: 2, lg: 2.5 }, py: { md: 1.6, lg: 2 },
      borderRadius: 2.5,
      border: `1px solid ${colors.primary}22`,
      backgroundColor: `${colors.bgPrimary}f0`,
      backdropFilter: 'blur(16px)',
      boxShadow: `0 12px 40px ${colors.primaryDark}18, inset 0 1px 0 ${colors.accent}30`,
      opacity:    show ? 1 : 0,
      transform:  show ? 'translateY(0) rotate(-1.5deg)' : 'translateY(20px) rotate(-1.5deg)',
      transition: 'opacity 0.7s ease 1300ms, transform 0.7s ease 1300ms',
      minWidth: { md: 190, lg: 220 },
    }}>
      {/* macOS 창 버튼 */}
      <Box sx={{ display: 'flex', gap: 0.7, mb: 1.4 }}>
        {['#ff6059', '#ffbd2e', '#28ca41'].map((c, i) => (
          <Box key={i} sx={{ width: 9, height: 9, borderRadius: '50%', backgroundColor: c, opacity: 0.85 }} />
        ))}
      </Box>
      {/* 파일명 */}
      <Typography sx={{
        fontFamily: 'monospace', fontSize: { md: '0.58rem', lg: '0.62rem' },
        color: colors.textMuted, mb: 1, letterSpacing: 0.5,
      }}>
        portfolio.js
      </Typography>
      {/* 코드 라인 */}
      {CODE.map((line, li) => (
        <Box key={li} sx={{ display: 'flex', fontFamily: 'monospace',
                             fontSize: { md: '0.65rem', lg: '0.7rem' }, lineHeight: 1.9 }}>
          {line.map((tok, ti) => (
            <Box key={ti} component="span" sx={{ color: tok.c }}>{tok.v}</Box>
          ))}
        </Box>
      ))}
    </Box>
  );
}

/* ── 훅: 타이핑 ── */
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

/* ── 훅: 텍스트 모핑 ── */
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

/* ── 훅: rAF 스크롤 ── */
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

/* ══════════════════════════════════════════
   Hero 섹션
══════════════════════════════════════════ */
export default function HeroSection() {
  const theme     = useTheme();
  const isMobile  = useMediaQuery(theme.breakpoints.down('sm'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const [show, setShow] = useState(false);
  const scrollY         = useScrollY();
  const spotlightRef    = useRef(null);

  /* 패럴렉스 (모바일 비활성화) */
  const bgY1   = isDesktop ? scrollY * 0.18  : 0;
  const bgY2   = isDesktop ? scrollY * 0.11  : 0;
  const dotsY  = isDesktop ? scrollY * 0.08  : 0;
  const orbitY = isDesktop ? scrollY * -0.07 : 0;

  const typedRole                                            = useTypewriter(ROLES);
  const { word: morphWord, entering: morphEntering, idx: morphIdx } = useMorphText(MORPH_WORDS, 2600);

  const navigate = useNavigate();
  const location = useLocation();

  /* 등장 애니메이션 트리거 */
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 200);
    return () => clearTimeout(t);
  }, []);

  /* 마우스 스포트라이트 — DOM 직접 조작으로 리렌더 없음 */
  useEffect(() => {
    if (!isDesktop) return;
    const move = (e) => {
      if (!spotlightRef.current) return;
      spotlightRef.current.style.left = `${e.clientX - 280}px`;
      spotlightRef.current.style.top  = `${e.clientY - 280}px`;
    };
    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, [isDesktop]);

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
        /* 향상된 배경 — 3중 레이디얼 + 중앙 미광 */
        background: `
          radial-gradient(ellipse at 5%  90%, ${colors.accent}85   0%, transparent 42%),
          radial-gradient(ellipse at 95%  5%, ${colors.primaryDark}32 0%, transparent 44%),
          radial-gradient(ellipse at 55% 50%, ${colors.primary}18   0%, transparent 58%),
          radial-gradient(ellipse at 30% 20%, ${colors.accent}20    0%, transparent 50%),
          ${colors.bgPrimary}
        `,
      }}
    >
      {/* ── 노이즈 텍스처 오버레이 (프리미엄 질감) ── */}
      <Box sx={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.022,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`,
      }} />

      {/* ── 마우스 스포트라이트 (데스크톱) ── */}
      {isDesktop && (
        <Box ref={spotlightRef} sx={{
          position: 'fixed',
          width: 560, height: 560,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${colors.primary}0e 0%, transparent 70%)`,
          pointerEvents: 'none',
          zIndex: 1,
          left: -600, top: -600,
          transition: 'left 0.12s ease-out, top 0.12s ease-out',
          willChange: 'left, top',
        }} />
      )}

      {/* ── 배경 링 1 (가장 뒤, 느린 패럴렉스) ── */}
      <Box sx={{
        position: 'absolute', top: '-12%', right: '-8%',
        transform: `translate3d(0, ${bgY1}px, 0)`,
        willChange: isDesktop ? 'transform' : 'auto',
        pointerEvents: 'none', zIndex: 0,
      }}>
        <Box sx={{
          width: { xs: 200, sm: 320, md: 520 }, height: { xs: 200, sm: 320, md: 520 },
          borderRadius: '50%',
          border: `1px solid ${colors.primary}22`,
          animation: 'ringSpinCW 50s linear infinite',
          '@keyframes ringSpinCW': { from: { transform: 'rotate(0deg)' }, to: { transform: 'rotate(360deg)' } },
        }} />
      </Box>

      {/* ── 배경 링 2 — 내부 소형 링 추가 ── */}
      <Box sx={{
        position: 'absolute', bottom: '-10%', left: '-6%',
        transform: `translate3d(0, ${bgY2}px, 0)`,
        willChange: isDesktop ? 'transform' : 'auto',
        pointerEvents: 'none', zIndex: 0,
      }}>
        <Box sx={{
          width: { xs: 140, sm: 240, md: 380 }, height: { xs: 140, sm: 240, md: 380 },
          borderRadius: '50%',
          border: `1px solid ${colors.accent}45`,
          animation: 'ringSpinCCW 38s linear infinite',
          '@keyframes ringSpinCCW': { from: { transform: 'rotate(0deg)' }, to: { transform: 'rotate(-360deg)' } },
        }}>
          {/* 내부 소형 링 */}
          <Box sx={{
            position: 'absolute', top: '15%', left: '15%', right: '15%', bottom: '15%',
            borderRadius: '50%',
            border: `1px solid ${colors.primary}18`,
          }} />
        </Box>
      </Box>

      {/* ── 부유 도트 (태블릿·데스크톱) ── */}
      {!isMobile && BG_DOTS.map((d, i) => (
        <Box key={i} sx={{
          position: 'absolute',
          top: d.top, left: d.left, right: d.right,
          transform: `translate3d(0, ${dotsY * (0.6 + i * 0.1)}px, 0)`,
          willChange: isDesktop ? 'transform' : 'auto',
          pointerEvents: 'none', zIndex: 0,
        }}>
          <Box sx={{
            width: d.size, height: d.size, borderRadius: '50%',
            backgroundColor: colors.primary, opacity: 0.3,
            animation: `dotFloat${i} ${3.2 + i * 0.6}s ease-in-out infinite`,
            [`@keyframes dotFloat${i}`]: {
              '0%, 100%': { transform: 'translateY(0)',    opacity: 0.3  },
              '50%':      { transform: 'translateY(-9px)', opacity: 0.55 },
            },
          }} />
        </Box>
      ))}

      {/* ─────────────── 메인 콘텐츠 ─────────────── */}
      <Container
        maxWidth="lg"
        sx={{
          px: { xs: 2.5, sm: 3, md: 4 },
          pt: { xs: 11, sm: 12, md: 0 },
          pb: { xs: 9,  sm: 10, md: 0 },
          position: 'relative', zIndex: 2,
        }}
      >
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '54% 46%' },
          gap: { xs: 5, sm: 6, md: 4 },
          alignItems: 'center',
          minHeight: { md: '100vh' },
        }}>

          {/* ══ 왼쪽: 텍스트 ══ */}
          <Box>

            {/* ── 협업 가능 배지 ── */}
            <Box sx={{
              display: 'inline-flex', alignItems: 'center', gap: 0.9,
              px: 1.6, py: 0.55,
              border: `1px solid #5f8c6e45`,
              borderRadius: 20,
              backgroundColor: '#5f8c6e0a',
              mb: { xs: 2, sm: 2.5 },
              opacity:    show ? 1 : 0,
              transition: 'opacity 0.5s ease 80ms',
            }}>
              <Box sx={{
                width: 7, height: 7, borderRadius: '50%',
                backgroundColor: '#5f8c6e',
                boxShadow: '0 0 0 0 #5f8c6e50',
                animation: 'statusPulse 2.5s ease-in-out infinite',
                '@keyframes statusPulse': {
                  '0%':   { boxShadow: '0 0 0 0 #5f8c6e55' },
                  '70%':  { boxShadow: '0 0 0 7px #5f8c6e00' },
                  '100%': { boxShadow: '0 0 0 0 #5f8c6e00' },
                },
              }} />
              <Typography sx={{ fontSize: '0.72rem', color: '#5f8c6e', fontWeight: 600, letterSpacing: 0.5 }}>
                협업 가능
              </Typography>
            </Box>

            {/* ── 오버라인 타이핑 ── */}
            <Typography
              variant="overline"
              sx={{
                color: colors.primary,
                letterSpacing: { xs: 2.5, sm: 4, md: 5 },
                fontSize: { xs: '0.65rem', sm: '0.68rem', md: '0.7rem' },
                fontWeight: 600,
                mb: { xs: 2, sm: 2.5, md: 3 },
                display: 'block', minHeight: '1.2em',
                opacity:    show ? 1 : 0,
                transform:  show ? 'translateY(0)' : 'translateY(10px)',
                transition: 'opacity 0.6s ease 200ms, transform 0.6s ease 200ms',
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

            {/* ── 인사 ── */}
            <Typography component="p" sx={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize:   { xs: '1.5rem', sm: '1.9rem', md: '2.3rem' },
              fontWeight: 700, lineHeight: 1.2,
              color: colors.textMuted,
              opacity:    show ? 1 : 0,
              transform:  show ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.7s ease 320ms, transform 0.7s ease 320ms',
            }}>
              안녕하세요,
            </Typography>

            {/* ── 이름 (그라디언트 + 애니메이션 언더라인) ── */}
            <Box sx={{
              position: 'relative', display: 'inline-block', mb: { xs: 1.5, sm: 2 },
              /* 애니메이션 밑줄 */
              '&::after': {
                content: '""',
                position: 'absolute',
                left: 0, right: 0,
                bottom: { xs: -6, md: -8 },
                height: { xs: '3px', md: '4px' },
                background: `linear-gradient(90deg, ${colors.primary}, ${colors.accent}, ${colors.primaryDark})`,
                backgroundSize: '200% 100%',
                borderRadius: 2,
                opacity:    show ? 1 : 0,
                animation:  show ? 'underlineFlow 3.5s ease infinite' : 'none',
                transition: 'opacity 0.5s ease 850ms',
                '@keyframes underlineFlow': {
                  '0%':   { backgroundPosition: '0% 50%' },
                  '50%':  { backgroundPosition: '100% 50%' },
                  '100%': { backgroundPosition: '0% 50%' },
                },
              },
            }}>
              <Typography variant="h1" sx={{
                fontSize:   { xs: '2.8rem', sm: '3.6rem', md: '4.4rem', lg: '5rem' },
                fontWeight: 800, lineHeight: 1.05,
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
                transition: 'opacity 0.7s ease 450ms, transform 0.7s ease 450ms',
              }}>
                김재우입니다.
              </Typography>
            </Box>

            {/* ── H2 서브타이틀 ── */}
            <Typography variant="h2" sx={{
              fontSize:   { xs: '1.25rem', sm: '1.6rem', md: '2rem', lg: '2.4rem' },
              fontWeight: 700, lineHeight: 1.2,
              color: colors.textMuted,
              mt: { xs: 1.5, sm: 2 },
              mb: { xs: 1.5, md: 2 },
              opacity:    show ? 1 : 0,
              transform:  show ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.7s ease 580ms, transform 0.7s ease 580ms',
            }}>
              공간을 설계하듯, 웹을 만듭니다.
            </Typography>

            {/* ── 역할 모핑 텍스트 ── */}
            <Box sx={{
              display: 'flex', alignItems: 'center', gap: 0.8,
              mb: { xs: 2, md: 2.5 },
              opacity:    show ? 1 : 0,
              transition: 'opacity 0.6s ease 700ms',
            }}>
              <Box component="span" sx={{
                fontFamily: 'monospace', userSelect: 'none',
                fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                color: colors.accent, opacity: 0.7,
              }}>{'<'}</Box>
              <Box sx={{ display: 'inline-flex', minWidth: { xs: 68, sm: 80, md: 100 } }}>
                {morphWord.split('').map((char, i) => (
                  <Box key={`${morphIdx}-${i}`} component="span" sx={{
                    display: 'inline-block',
                    fontFamily: '"Playfair Display", Georgia, serif',
                    fontSize:   { xs: '0.95rem', sm: '1.1rem', md: '1.3rem' },
                    fontWeight: 700, color: colors.primary,
                    animation: morphEntering
                      ? `mIn 0.55s cubic-bezier(0.34,1.56,0.64,1) ${i * 55}ms both`
                      : `mOut 0.28s ease ${i * 22}ms both`,
                    '@keyframes mIn':  { from: { opacity: 0, transform: 'translateY(110%)', filter: 'blur(8px)' }, to: { opacity: 1, transform: 'translateY(0)', filter: 'blur(0)' } },
                    '@keyframes mOut': { from: { opacity: 1, transform: 'translateY(0)',    filter: 'blur(0)'  }, to: { opacity: 0, transform: 'translateY(-80%)', filter: 'blur(6px)' } },
                  }}>{char}</Box>
                ))}
              </Box>
              <Box component="span" sx={{
                fontFamily: 'monospace', userSelect: 'none',
                fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                color: colors.accent, opacity: 0.7,
              }}>{'/>'}</Box>
            </Box>

            {/* ── 그라디언트 구분선 ── */}
            <Box sx={{
              width:      show ? { xs: 40, md: 56 } : 0,
              height:     '2px',
              background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})`,
              mb: { xs: 2, md: 3 }, borderRadius: 1,
              transition: 'width 0.6s ease 780ms',
            }} />

            {/* ── 슬로건 3줄 (장식 따옴표 포함) ── */}
            <Box sx={{ position: 'relative', mb: { xs: 3, sm: 3.5, md: 4 } }}>
              {/* 장식 따옴표 */}
              <Typography sx={{
                position: 'absolute',
                top: { xs: -18, md: -22 }, left: { xs: -6, md: -8 },
                fontSize: { xs: '4rem', md: '5.5rem' },
                fontFamily: '"Playfair Display", serif',
                color: `${colors.primary}14`,
                lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
                opacity: show ? 1 : 0,
                transition: 'opacity 0.5s ease 820ms',
              }}>
                "
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.35 }}>
                {LINES.map((line, lineIdx) => (
                  <Box key={lineIdx} sx={{ lineHeight: 1.7 }}>
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
                        transition: `opacity 0.4s ease ${820 + lineIdx * 155 + charIdx * 19}ms,
                                     transform 0.4s ease ${820 + lineIdx * 155 + charIdx * 19}ms`,
                      }}>{char}</Box>
                    ))}
                  </Box>
                ))}
              </Box>
            </Box>

            {/* ── 서브텍스트 ── */}
            <Typography variant="body1" sx={{
              color: colors.textMuted,
              fontSize:   { xs: '0.85rem', sm: '0.9rem', md: '0.98rem' },
              lineHeight: { xs: 1.75, md: 1.9 },
              maxWidth:   { xs: '100%', sm: 420 },
              mb: { xs: 3, sm: 3.5, md: 4 },
              opacity:    show ? 1 : 0,
              transform:  show ? 'translateY(0)' : 'translateY(12px)',
              transition: 'opacity 0.6s ease 1280ms, transform 0.6s ease 1280ms',
            }}>
              React · Supabase · MUI로 아름답고 작동하는 웹앱을 직접 설계하고 배포합니다.
              {!isMobile && <><br />건축 공간 설계에서 시작한 디자인 감각을 화면 위에서 이어가고 있습니다.</>}
              {isMobile && ' 건축 공간 설계에서 시작한 디자인 감각을 화면 위에서 이어가고 있습니다.'}
            </Typography>

            {/* ── 모바일·태블릿 기술 스택 칩 ── */}
            {!isDesktop && (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.9, mb: { xs: 3.5, sm: 4 } }}>
                {TECH_STACK.map((tech, i) => (
                  <Box key={tech.name}
                    sx={{ display: 'flex', alignItems: 'center', gap: 0.55,
                          px: { xs: 1.3, sm: 1.5 }, py: { xs: 0.6, sm: 0.7 },
                          border: `1px solid ${colors.border}`,
                          borderRadius: 20,
                          backgroundColor: `${colors.primary}08`,
                          transition: 'border-color 0.2s, background-color 0.2s',
                          '&:hover': { borderColor: colors.primary, backgroundColor: `${colors.primary}14` } }}
                    style={{
                      opacity:   show ? 1 : 0,
                      transform: show ? 'translateY(0)' : 'translateY(8px)',
                      transition: `opacity 0.4s ease ${1500 + i * 55}ms, transform 0.4s ease ${1500 + i * 55}ms, border-color 0.2s, background-color 0.2s`,
                    }}>
                    <Typography sx={{ fontSize: { xs: '0.88rem', sm: '1rem' }, lineHeight: 1 }}>{tech.icon}</Typography>
                    <Typography sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' }, fontWeight: 600, color: colors.textPrimary, letterSpacing: 0.2 }}>
                      {tech.name}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}

            {/* ── CTA 버튼 ── */}
            <Box sx={{
              opacity:    show ? 1 : 0,
              transform:  show ? 'translateY(0)' : 'translateY(12px)',
              transition: 'opacity 0.6s ease 1500ms, transform 0.6s ease 1500ms',
            }}>
              <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: { xs: 1.5, sm: 2 },
                flexWrap: { sm: 'wrap' },
                mb: { xs: 2.5, sm: 3 },
              }}>
                <Button
                  variant="contained" size="large"
                  onClick={() => scrollTo('projects')}
                  aria-label="프로젝트 섹션으로 이동"
                  sx={{
                    backgroundColor: colors.primaryDark, color: '#f5ede3',
                    px: { xs: 3, sm: 3.5, md: 4.5 }, py: 1.5,
                    minHeight: { xs: 52, sm: 48 },
                    width: { xs: '100%', sm: 'auto' },
                    fontSize: '0.9rem', fontWeight: 600, borderRadius: 2, letterSpacing: 0.5,
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
                  variant="outlined" size="large"
                  onClick={() => scrollTo('contact')}
                  aria-label="연락처 섹션으로 이동"
                  sx={{
                    borderColor: `${colors.primary}70`, color: colors.primaryDark,
                    px: { xs: 3, sm: 3.5, md: 4.5 }, py: 1.5,
                    minHeight: { xs: 52, sm: 48 },
                    width: { xs: '100%', sm: 'auto' },
                    fontSize: '0.9rem', fontWeight: 600, borderRadius: 2, letterSpacing: 0.5,
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

              {/* ── 통계 수치 ── */}
              <Box sx={{
                display: 'flex', gap: { xs: 3, sm: 4 },
                pb: { xs: 2.5, sm: 3 },
                mb: { xs: 2.5, sm: 3 },
                borderBottom: `1px solid ${colors.border}`,
              }}>
                {STATS.map((s, i) => (
                  <Box key={s.label} style={{
                    opacity:    show ? 1 : 0,
                    transform:  show ? 'translateY(0)' : 'translateY(10px)',
                    transition: `opacity 0.5s ease ${1650 + i * 100}ms, transform 0.5s ease ${1650 + i * 100}ms`,
                  }}>
                    <Typography sx={{
                      fontSize:   { xs: '1.5rem', sm: '1.8rem', md: '2rem' },
                      fontWeight: 800, lineHeight: 1.1,
                      background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}>
                      {s.value}
                    </Typography>
                    <Typography sx={{ fontSize: { xs: '0.68rem', sm: '0.72rem' }, color: colors.textMuted, mt: 0.2 }}>
                      {s.label}
                    </Typography>
                  </Box>
                ))}
              </Box>

              {/* ── 소셜 링크 ── */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 0.75 }, flexWrap: 'wrap' }}>
                <Tooltip title="GitHub 보기" arrow placement="top">
                  <IconButton
                    component="a" href="https://github.com/wmr102095-cloud"
                    target="_blank" rel="noopener noreferrer" aria-label="GitHub 프로필 열기"
                    sx={{
                      color: colors.textMuted,
                      width: { xs: 48, sm: 44 }, height: { xs: 48, sm: 44 },
                      border: `1px solid ${colors.border}`, borderRadius: 2,
                      transition: 'transform 0.22s ease, color 0.2s, border-color 0.2s, box-shadow 0.22s',
                      willChange: 'transform',
                      '&:hover': {
                        color: colors.textPrimary, borderColor: colors.textPrimary,
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
                    component="a" href="mailto:wmr102095@gmail.com"
                    aria-label="이메일 보내기"
                    sx={{
                      color: colors.textMuted,
                      width: { xs: 48, sm: 44 }, height: { xs: 48, sm: 44 },
                      border: `1px solid ${colors.border}`, borderRadius: 2,
                      transition: 'transform 0.22s ease, color 0.2s, border-color 0.2s, box-shadow 0.22s',
                      willChange: 'transform',
                      '&:hover': {
                        color: colors.primary, borderColor: colors.primary,
                        backgroundColor: `${colors.primary}10`,
                        transform: 'translateY(-4px)',
                        boxShadow: `0 8px 20px ${colors.primary}25`,
                      },
                    }}
                  >
                    <EmailIcon sx={{ fontSize: { xs: '1.2rem', sm: '1.1rem' } }} />
                  </IconButton>
                </Tooltip>

                <Divider orientation="vertical" flexItem
                  sx={{ borderColor: colors.border, mx: 0.5, my: 0.5, display: { xs: 'none', sm: 'flex' } }} />

                <Typography variant="caption" sx={{
                  color: colors.textMuted, fontSize: { sm: '0.72rem', md: '0.75rem' },
                  letterSpacing: 0.3, display: { xs: 'none', sm: 'block' },
                }}>
                  wmr102095@gmail.com
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* ══ 오른쪽: 기술 오빗 + 코드 카드 (데스크톱) ══ */}
          {isDesktop && (
            <Box sx={{
              display: 'flex', justifyContent: 'center', alignItems: 'center',
              position: 'relative',
              transform: `translate3d(0, ${orbitY}px, 0)`,
              willChange: 'transform',
            }}>
              {/* 오빗 비주얼 */}
              <Box sx={{
                opacity:    show ? 1 : 0,
                transform:  show ? 'scale(1)' : 'scale(0.9)',
                transition: 'opacity 0.8s ease 600ms, transform 0.8s ease 600ms',
              }}>
                <Box sx={{ position: 'relative', width: { md: 340, lg: 380 }, height: { md: 370, lg: 420 } }}>

                  {/* 점선 궤도 */}
                  <Box sx={{
                    position: 'absolute', top: '50%', left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: { md: 270, lg: 310 }, height: { md: 270, lg: 310 },
                    borderRadius: '50%',
                    border: `1.5px dashed ${colors.primary}2a`,
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
                      '50%':      { boxShadow: `0 16px 48px ${colors.primaryDark}30, inset 0 1px 0 ${colors.accent}60` },
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
                    const radius = 148;
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;
                    return (
                      <Box key={tech.name} sx={{
                        position: 'absolute',
                        top:  `calc(50% + ${y}px)`, left: `calc(50% + ${x}px)`,
                        transform: 'translate(-50%, -50%)',
                        opacity:    show ? 1 : 0,
                        transition: `opacity 0.5s ease ${900 + tech.delay}ms`,
                        animation: `badgeFloat${i} ${3.6 + i * 0.35}s ease-in-out ${tech.delay}ms infinite`,
                        [`@keyframes badgeFloat${i}`]: {
                          '0%, 100%': { marginTop: '0px' },
                          '50%':      { marginTop: `${i % 2 === 0 ? -7 : 7}px` },
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

              {/* ── 코드 에디터 카드 (하단 왼쪽 오버레이) ── */}
              <Box sx={{
                position: 'absolute',
                bottom: { md: '2%', lg: '0%' },
                left:   { md: '-12%', lg: '-18%' },
                zIndex: 10,
              }}>
                <CodeCard show={show} />
              </Box>
            </Box>
          )}

        </Box>
      </Container>

      {/* ── 스크롤 인디케이터 ── */}
      <Box
        onClick={() => scrollTo('about')}
        role="button" aria-label="다음 섹션으로 스크롤" tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') scrollTo('about'); }}
        sx={{
          position: 'absolute',
          bottom: { xs: 20, sm: 28 },
          left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.3,
          cursor: 'pointer', opacity: 0.5,
          p: 1.5, zIndex: 2,
          transition: 'opacity 0.2s',
          '&:hover, &:focus-visible': { opacity: 0.9 },
          animation: 'scrollBounce 2.2s ease-in-out infinite',
          '@keyframes scrollBounce': {
            '0%, 100%': { transform: 'translateX(-50%) translateY(0)'  },
            '50%':      { transform: 'translateX(-50%) translateY(7px)' },
          },
        }}
      >
        <Typography variant="caption" sx={{
          color: colors.textMuted,
          letterSpacing: { xs: 3, sm: 4 },
          fontSize: { xs: '0.55rem', sm: '0.58rem' }, fontWeight: 600,
        }}>
          SCROLL
        </Typography>
        <KeyboardArrowDownIcon sx={{ fontSize: { xs: '1.1rem', sm: '1.3rem' }, color: colors.textMuted }} />
      </Box>
    </Box>
  );
}
