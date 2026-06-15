import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { colors } from '../theme/theme';

const PHRASES = [
  '디자인으로 생각하고,',
  '코드로 만드는,',
  '프로덕트 디자이너입니다.',
];

const TYPE_SPEED   = 65;
const DELETE_SPEED = 35;
const PAUSE_TYPED  = 1800;
const PAUSE_EMPTY  = 320;

export default function HeroSection() {
  const [displayed,    setDisplayed]    = useState('');
  const [phraseIdx,    setPhraseIdx]    = useState(0);
  const [isDeleting,   setIsDeleting]   = useState(false);

  useEffect(() => {
    const target = PHRASES[phraseIdx];
    let id;

    if (!isDeleting) {
      if (displayed.length < target.length) {
        id = setTimeout(
          () => setDisplayed(target.slice(0, displayed.length + 1)),
          TYPE_SPEED,
        );
      } else {
        id = setTimeout(() => setIsDeleting(true), PAUSE_TYPED);
      }
    } else {
      if (displayed.length > 0) {
        id = setTimeout(
          () => setDisplayed(displayed.slice(0, -1)),
          DELETE_SPEED,
        );
      } else {
        setIsDeleting(false);
        id = setTimeout(
          () => setPhraseIdx((i) => (i + 1) % PHRASES.length),
          PAUSE_EMPTY,
        );
      }
    }

    return () => clearTimeout(id);
  }, [displayed, isDeleting, phraseIdx]);

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <Box
      component="section"
      id="hero"
      sx={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: `
          radial-gradient(ellipse at 15% 80%, ${colors.accent}55 0%, transparent 55%),
          radial-gradient(ellipse at 85% 20%, ${colors.primaryDark}18 0%, transparent 50%),
          ${colors.bgPrimary}
        `,
      }}
    >
      <Container maxWidth="md" sx={{ py: { xs: 14, md: 18 }, px: { xs: 3, md: 4 } }}>

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
          }}
        >
          Product Designer
        </Typography>

        {/* 헤드라인 */}
        <Box sx={{ mb: { xs: 5, md: 7 } }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.6rem', sm: '3.4rem', md: '4.5rem' },
              fontWeight: 700,
              lineHeight: 1.12,
              mb: 1.5,
              color: colors.textMuted,
            }}
          >
            안녕하세요,
          </Typography>

          {/* 타이핑 줄 */}
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              minHeight: { xs: '3.2rem', sm: '4.2rem', md: '5.5rem' },
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.6rem', sm: '3.4rem', md: '4.5rem' },
                fontWeight: 700,
                lineHeight: 1.12,
                color: colors.textPrimary,
              }}
            >
              {displayed}
            </Typography>

            {/* 커서 */}
            <Box
              sx={{
                width: { xs: '3px', md: '4px' },
                height:  { xs: '2.6rem', sm: '3.4rem', md: '4.5rem' },
                backgroundColor: colors.primary,
                ml: '6px',
                flexShrink: 0,
                animation: 'cursorBlink 1s step-end infinite',
                '@keyframes cursorBlink': {
                  '0%, 100%': { opacity: 1 },
                  '50%':      { opacity: 0 },
                },
              }}
            />
          </Box>
        </Box>

        {/* 서브텍스트 */}
        <Typography
          variant="body1"
          sx={{
            color: colors.textMuted,
            fontSize: { xs: '1rem', md: '1.1rem' },
            lineHeight: 1.9,
            maxWidth: 440,
            mb: { xs: 5, md: 7 },
          }}
        >
          디자인 감각과 기술적 깊이로<br />
          사용자에게 가치 있는 경험을 만듭니다.
        </Typography>

        {/* CTA 버튼 */}
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
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
