import { useState, useEffect } from 'react';
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

export default function HeroSection() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 200);
    return () => clearTimeout(t);
  }, []);

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

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
      {/* ── 배경 장식: 회전 링 ── */}
      <Box sx={{
        position: 'absolute', top: '-12%', right: '-8%',
        width: { xs: 280, md: 520 }, height: { xs: 280, md: 520 },
        borderRadius: '50%',
        border: `1px solid ${colors.primary}20`,
        pointerEvents: 'none',
        animation: 'ringSpinCW 50s linear infinite',
        '@keyframes ringSpinCW': {
          from: { transform: 'rotate(0deg)' },
          to:   { transform: 'rotate(360deg)' },
        },
      }} />
      <Box sx={{
        position: 'absolute', bottom: '-10%', left: '-6%',
        width: { xs: 200, md: 380 }, height: { xs: 200, md: 380 },
        borderRadius: '50%',
        border: `1px solid ${colors.accent}40`,
        pointerEvents: 'none',
        animation: 'ringSpinCCW 38s linear infinite',
        '@keyframes ringSpinCCW': {
          from: { transform: 'rotate(0deg)' },
          to:   { transform: 'rotate(-360deg)' },
        },
      }} />

      {/* ── 배경 장식: 떠다니는 도트 ── */}
      {BG_DOTS.map((d, i) => (
        <Box key={i} sx={{
          position: 'absolute',
          top: d.top, left: d.left, right: d.right,
          width: d.size, height: d.size,
          borderRadius: '50%',
          backgroundColor: colors.primary,
          opacity: 0.28,
          pointerEvents: 'none',
          animation: `dotFloat${i} ${3.2 + i * 0.6}s ease-in-out infinite`,
          [`@keyframes dotFloat${i}`]: {
            '0%, 100%': { transform: 'translateY(0)',   opacity: 0.28 },
            '50%':      { transform: 'translateY(-9px)', opacity: 0.55 },
          },
        }} />
      ))}

      <Container
        maxWidth="lg"
        sx={{ px: { xs: 3, md: 4 }, py: { xs: 14, md: 0 } }}
      >
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '54% 46%' },
          gap: { xs: 6, md: 4 },
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
                letterSpacing: 5,
                fontSize: '0.7rem',
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
                fontSize: { xs: '0.9rem', md: '1rem' },
                lineHeight: 1.9,
                maxWidth: 420,
                mb:       { xs: 5, md: 6 },
                opacity:    show ? 1 : 0,
                transform:  show ? 'translateY(0)' : 'translateY(12px)',
                transition: 'opacity 0.6s ease 1350ms, transform 0.6s ease 1350ms',
              }}
            >
              React · Supabase · MUI로 아름답고 작동하는 웹앱을<br />
              직접 설계하고 배포합니다. 건축 공간 설계에서 시작한<br />
              디자인 감각을 화면 위에서 이어가고 있습니다.
            </Typography>

            {/* ── CTA 버튼 영역 ── */}
            <Box sx={{
              opacity:    show ? 1 : 0,
              transform:  show ? 'translateY(0)' : 'translateY(12px)',
              transition: 'opacity 0.6s ease 1550ms, transform 0.6s ease 1550ms',
            }}>

              {/* 주요 버튼 행 */}
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2.5 }}>

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
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    borderRadius: 2,
                    letterSpacing: 0.5,
                    boxShadow: `0 4px 20px ${colors.primaryDark}35`,
                    transition: 'all 0.22s ease',
                    '&:hover': {
                      backgroundColor: colors.primary,
                      boxShadow: `0 8px 28px ${colors.primaryDark}45`,
                      transform: 'translateY(-2px)',
                    },
                    '&:active': { transform: 'translateY(0)' },
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
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    borderRadius: 2,
                    letterSpacing: 0.5,
                    transition: 'all 0.22s ease',
                    '&:hover': {
                      borderColor: colors.primaryDark,
                      backgroundColor: `${colors.primary}12`,
                      transform: 'translateY(-2px)',
                    },
                    '&:active': { transform: 'translateY(0)' },
                  }}
                >
                  연락하기
                </Button>

                {/* 이력서 다운로드 */}
                <Button
                  variant="text"
                  size="large"
                  component="a"
                  href={`${import.meta.env.BASE_URL}resume.pdf`}
                  download="김재우_이력서.pdf"
                  startIcon={<DownloadIcon sx={{ fontSize: '1rem !important' }} />}
                  sx={{
                    color: colors.textMuted,
                    px: { xs: 2.5, md: 3 },
                    py: 1.5,
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    borderRadius: 2,
                    letterSpacing: 0.5,
                    border: `1px dashed ${colors.primary}40`,
                    transition: 'all 0.22s ease',
                    '&:hover': {
                      color: colors.primaryDark,
                      borderColor: colors.primary,
                      backgroundColor: `${colors.primary}08`,
                      transform: 'translateY(-2px)',
                    },
                    '&:active': { transform: 'translateY(0)' },
                  }}
                >
                  이력서
                </Button>
              </Box>

              {/* 소셜 아이콘 행 */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Tooltip title="GitHub 보기" arrow placement="top">
                  <IconButton
                    component="a"
                    href="https://github.com/wmr102095-cloud"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub 프로필"
                    sx={{
                      color: colors.textMuted,
                      width: 40, height: 40,
                      border: `1px solid ${colors.border}`,
                      borderRadius: 2,
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        color: colors.textPrimary,
                        borderColor: colors.textPrimary,
                        backgroundColor: `${colors.primaryDark}10`,
                        transform: 'translateY(-2px)',
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
                      width: 40, height: 40,
                      border: `1px solid ${colors.border}`,
                      borderRadius: 2,
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        color: '#0077B5',
                        borderColor: '#0077B5',
                        backgroundColor: '#0077B510',
                        transform: 'translateY(-2px)',
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
                      width: 40, height: 40,
                      border: `1px solid ${colors.border}`,
                      borderRadius: 2,
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        color: colors.primary,
                        borderColor: colors.primary,
                        backgroundColor: `${colors.primary}10`,
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    <EmailIcon sx={{ fontSize: '1.1rem' }} />
                  </IconButton>
                </Tooltip>

                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ borderColor: colors.border, mx: 1, my: 0.5 }}
                />

                <Typography
                  variant="caption"
                  sx={{ color: colors.textMuted, fontSize: '0.75rem', letterSpacing: 0.3 }}
                >
                  wmr102095@gmail.com
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* ── 오른쪽: 기술 스택 오빗 비주얼 ── */}
          <Box sx={{
            display:        { xs: 'none', md: 'flex' },
            justifyContent: 'center',
            alignItems:     'center',
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
                      transition: 'border-color 0.2s, box-shadow 0.2s, transform 0.2s',
                      '&:hover': {
                        borderColor: colors.primary,
                        boxShadow: `0 8px 24px ${colors.primaryDark}20`,
                        transform: 'scale(1.1)',
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
