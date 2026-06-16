import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import GitHubIcon from '@mui/icons-material/GitHub';
import { colors } from '../theme/theme';

const LINES = [
  '보기 좋아야 쓰고 싶어지고,',
  '쓰고 싶어야 기억에 남습니다.',
  '그런 사이트를 만듭니다.',
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
        display: 'block',
        pt: { xs: '22vh', md: '28vh' },
        pb: { xs: '10vh', md: '12vh' },
        background: `
          radial-gradient(ellipse at 15% 80%, ${colors.accent}55 0%, transparent 55%),
          radial-gradient(ellipse at 85% 20%, ${colors.primaryDark}18 0%, transparent 50%),
          ${colors.bgPrimary}
        `,
      }}
    >
      <Container maxWidth="md" sx={{ px: { xs: 3, md: 4 } }}>

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
          Frontend Developer & UI Designer
        </Typography>

        {/* 헤드라인 */}
        <Box sx={{ mb: { xs: 5, md: 7 } }}>

          {/* 인사 */}
          <Typography
            variant="h1"
            sx={{
              fontSize:   { xs: '2rem', sm: '2.6rem', md: '3.2rem' },
              fontWeight: 700,
              lineHeight: 1.15,
              color:      colors.textMuted,
              opacity:    show ? 1 : 0,
              transform:  show ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.7s ease 150ms, transform 0.7s ease 150ms',
            }}
          >
            안녕하세요,
          </Typography>

          {/* 이름 */}
          <Typography
            variant="h1"
            sx={{
              fontSize:   { xs: '2.8rem', sm: '3.8rem', md: '5rem' },
              fontWeight: 700,
              lineHeight: 1.05,
              color:      colors.textPrimary,
              mb:         3,
              opacity:    show ? 1 : 0,
              transform:  show ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.7s ease 350ms, transform 0.7s ease 350ms',
            }}
          >
            김재우입니다.
          </Typography>

          {/* 구분선 */}
          <Box
            sx={{
              width:           show ? 48 : 0,
              height:          '2px',
              backgroundColor: colors.primary,
              mb:              3,
              borderRadius:    1,
              transition:      'width 0.6s ease 600ms',
            }}
          />

          {/* 슬로건 3줄 — 순서대로 등장 */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            {LINES.map((line, i) => (
              <Typography
                key={i}
                sx={{
                  fontSize:   { xs: '1.05rem', sm: '1.25rem', md: '1.45rem' },
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
        </Box>

        {/* 서브텍스트 */}
        <Typography
          variant="body1"
          sx={{
            color:      colors.textMuted,
            fontSize:   { xs: '0.95rem', md: '1.05rem' },
            lineHeight: 1.9,
            maxWidth:   400,
            mb:         { xs: 5, md: 7 },
            opacity:    show ? 1 : 0,
            transform:  show ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 0.6s ease 1350ms, transform 0.6s ease 1350ms',
          }}
        >
          React · Supabase · MUI로 아름답고 작동하는 웹앱을<br />
          직접 설계하고 배포합니다. 건축 공간 설계에서 시작한<br />
          디자인 감각을 화면 위에서 이어가고 있습니다.
        </Typography>

        {/* CTA 버튼 */}
        <Box
          sx={{
            display:    'flex',
            gap:        2,
            flexWrap:   'wrap',
            opacity:    show ? 1 : 0,
            transform:  show ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 0.6s ease 1550ms, transform 0.6s ease 1550ms',
          }}
        >
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
              boxShadow: `0 4px 20px ${colors.primaryDark}30`,
              '&:hover': {
                backgroundColor: colors.primary,
                boxShadow: `0 6px 24px ${colors.primaryDark}40`,
              },
            }}
          >
            프로젝트 보기
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() => scrollTo('contact')}
            sx={{
              borderColor: `${colors.primary}80`,
              color: colors.primaryDark,
              px: { xs: 3.5, md: 4.5 },
              py: 1.5,
              fontSize: '0.9rem',
              fontWeight: 600,
              borderRadius: 2,
              letterSpacing: 0.5,
              '&:hover': {
                borderColor: colors.primaryDark,
                backgroundColor: `${colors.primary}12`,
              },
            }}
          >
            연락하기
          </Button>
          <Button
            variant="text"
            size="large"
            component="a"
            href="https://github.com/wmr102095-cloud"
            target="_blank"
            rel="noopener noreferrer"
            startIcon={<GitHubIcon sx={{ fontSize: '1.1rem !important' }} />}
            sx={{
              color: colors.textMuted,
              px: { xs: 2.5, md: 3 },
              py: 1.5,
              fontSize: '0.9rem',
              fontWeight: 600,
              borderRadius: 2,
              letterSpacing: 0.5,
              '&:hover': {
                color: colors.textPrimary,
                backgroundColor: `${colors.primaryDark}10`,
              },
            }}
          >
            GitHub
          </Button>
        </Box>
      </Container>

      {/* 스크롤 인디케이터 */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 36,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 0.8,
          cursor: 'pointer',
          opacity: 0.45,
          transition: 'opacity 0.2s',
          '&:hover': { opacity: 0.75 },
          animation: 'scrollBounce 2.4s ease-in-out infinite',
          '@keyframes scrollBounce': {
            '0%, 100%': { transform: 'translateX(-50%) translateY(0)' },
            '50%':      { transform: 'translateX(-50%) translateY(7px)' },
          },
        }}
        onClick={() => scrollTo('about')}
      >
        <Typography
          variant="caption"
          sx={{ color: colors.textMuted, letterSpacing: 4, fontSize: '0.6rem', fontWeight: 500 }}
        >
          SCROLL
        </Typography>
        <Box
          sx={{
            width: '1px',
            height: 36,
            background: `linear-gradient(to bottom, ${colors.textMuted}, transparent)`,
          }}
        />
      </Box>
    </Box>
  );
}
